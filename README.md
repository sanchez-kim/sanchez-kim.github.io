# sanchez-kim.github.io

Personal single-page portfolio / résumé for Taehyung Kim (AI Engineer), bilingual KO/EN.

Static site — plain HTML, CSS, and vanilla JS. No build step, no dependencies. Served by GitHub Pages from the repo root (`.nojekyll` disables Jekyll processing).

## Structure
- `index.html` — markup and section landmarks
- `assets/css/style.css` — design system (gradient + glassmorphism, responsive)
- `assets/js/i18n.js` — bilingual content dictionary + language toggle
- `assets/js/main.js` — footer year + scroll-reveal
- `assets/img/profile.png` — hero photo

## Local preview
```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```
