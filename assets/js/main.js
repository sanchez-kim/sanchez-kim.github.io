document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
});
// Scroll-reveal + kinetic motion are owned by effects.js (GSAP/ScrollTrigger).
// Content is visible by default (CSS), so it stays readable if effects don't load.

// Click-to-copy (e.g. the email — no mailto, since people use their own mail client).
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  const text = btn.getAttribute('data-copy');
  if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
  const hint = btn.querySelector('.copy-hint');
  if (!hint) return;
  const ko = document.documentElement.lang === 'ko';
  hint.textContent = ko ? '복사됨' : 'Copied';
  btn.classList.add('copied');
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { hint.textContent = ko ? '복사' : 'Copy'; btn.classList.remove('copied'); }, 1600);
});
