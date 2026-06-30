document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
});
// Scroll-reveal + kinetic motion are owned by effects.js (GSAP/ScrollTrigger).
// Content is visible by default (CSS), so it stays readable if effects don't load.
