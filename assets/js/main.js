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

/* ---------------------------------------------------------------------------
   Lightbox for project card images.
   Cards are re-rendered on every language toggle (i18n.js renderLists), so the
   open handler is delegated on document instead of bound per card.
--------------------------------------------------------------------------- */
const LIGHTBOX_ID = 'lightbox';
let lbReturnFocus = null;

function escHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function closeLightbox() {
  const lb = document.getElementById(LIGHTBOX_ID);
  if (!lb) return;
  document.removeEventListener('keydown', onLightboxKeydown);
  lb.remove();
  document.body.classList.remove('lightbox-open');
  if (lbReturnFocus && document.contains(lbReturnFocus)) lbReturnFocus.focus();
  lbReturnFocus = null;
}

function onLightboxKeydown(e) {
  if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); closeLightbox(); }
}

function openLightbox(media) {
  const img = media.querySelector('img');
  if (!img) return;
  closeLightbox();
  const ko = document.documentElement.lang === 'ko';
  const card = media.closest('.build-card');
  const titleEl = card && card.querySelector('.build-head h3');
  const caption = (titleEl ? titleEl.textContent : img.getAttribute('alt') || '').trim();
  const lb = document.createElement('div');
  lb.id = LIGHTBOX_ID;
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  if (caption) lb.setAttribute('aria-label', caption);
  lb.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="${ko ? '닫기' : 'Close'}">
      <span aria-hidden="true">×</span>
    </button>
    <figure class="lightbox-figure">
      <img src="${escHtml(img.currentSrc || img.src)}" alt="${escHtml(caption)}">
      ${caption ? `<figcaption>${escHtml(caption)}</figcaption>` : ''}
    </figure>`;
  document.body.appendChild(lb);
  document.body.classList.add('lightbox-open');
  lbReturnFocus = media;
  document.addEventListener('keydown', onLightboxKeydown);
  const closeBtn = lb.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

document.addEventListener('click', (e) => {
  const lb = e.target.closest('.lightbox');
  if (lb) {
    // Close on the backdrop, the caption, or the close button — but not on the image itself.
    if (!e.target.closest('.lightbox-figure img')) closeLightbox();
    return;
  }
  const media = e.target.closest('.card-media');
  if (!media || !media.querySelector('img')) return;
  e.preventDefault();
  e.stopPropagation(); // never let the click fall through to the card / its .build-link
  openLightbox(media);
});

// Keyboard activation for the media, which carries role="button" when it has an image.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
  const media = e.target.closest && e.target.closest('.card-media[role="button"]');
  if (!media || !media.querySelector('img')) return;
  e.preventDefault();
  openLightbox(media);
});
