(() => {
  'use strict';
  const KEY = 'theme';
  function apply() {
    const dark = localStorage.getItem(KEY) === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    const btn = document.getElementById('sharedThemeToggleBtn');
    const icon = document.getElementById('sharedThemeIcon');
    if (icon) icon.textContent = dark ? '☀' : '☾';
    if (btn) {
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('title', dark ? '라이트 모드' : '다크 모드');
    }
  }
  function init() {
    apply();
    const btn = document.getElementById('sharedThemeToggleBtn');
    if (!btn || btn.dataset.themeBound === 'true') return;
    btn.dataset.themeBound = 'true';
    btn.addEventListener('click', () => {
      localStorage.setItem(KEY, document.documentElement.classList.contains('dark') ? 'light' : 'dark');
      apply();
    });
  }
  window.initSharedTheme = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
