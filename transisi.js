// ── Transisi Halaman ──────────────────────────────────────────
// Intercept semua link internal, mainkan animasi fade-out
// sebelum pindah ke halaman tujuan.

(function () {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');

    // Abaikan: anchor (#), link external, target baru, atau javascript:
    if (!href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('javascript') ||
        link.target === '_blank') return;

    e.preventDefault();
    document.body.classList.add('keluar');

    setTimeout(function () {
      window.location.href = href;
    }, 140);
  });
})();

// ── Hamburger Menu Toggle (Mobile) ────────────────────────────
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  function setMenu(buka) {
    var isOpen = buka !== undefined ? buka : !nav.classList.contains('menu-buka');
    if (isOpen) {
      nav.classList.add('menu-buka');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Tutup menu');
    } else {
      nav.classList.remove('menu-buka');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Buka menu');
    }
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setMenu();
  });

  // Tutup jika klik di luar area .nav
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      setMenu(false);
    }
  });

  // Tutup jika tekan tombol Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
    }
  });

  // Reset menu jika ukuran layar kembali ke desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && nav.classList.contains('menu-buka')) {
      setMenu(false);
    }
  });
})();

// ── Tombol Kembali Ke Atas (Back to Top) ─────────────────────
(function () {
  var btn = document.getElementById('btn-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'btn-top';
    btn.className = 'kembali-ke-atas';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('tampil');
    } else {
      btn.classList.remove('tampil');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── Mode Gelap / Terang (Dark Mode) ───────────────────────────
(function () {
  function getTheme() {
    var saved = localStorage.getItem('bhineka-tema');
    if (saved) return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function setTheme(t) {
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('bhineka-tema', t);
  }

  setTheme(getTheme());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.tema-toggle');
    if (!btn) return;
    e.stopPropagation();
    var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
