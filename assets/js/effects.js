/* Interactive layer (vanilla, no build):
   - Hero name as a Canvas2D particle field that scatters from the cursor.
   - Generative flow-field art (Canvas2D) that the cursor swirls in real time.
   - GSAP hero entrance + IntersectionObserver scroll reveals.
   - Magnetic buttons, cursor-glow cards, liquid image distortion, kinetic marquee.
   Everything degrades gracefully: content is visible by default. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const has = (g) => typeof window[g] !== 'undefined';
  document.documentElement.classList.add('js');
  if (has('gsap')) gsap.ticker.lagSmoothing(0);

  /* ---------------- 1. Interactive particle name ---------------- */
  function initParticles() {
    const wrap = document.querySelector('.hero-fx');
    const h1 = document.querySelector('.hero-name');
    const canvas = wrap && wrap.querySelector('canvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    let W = 0, H = 0, dpr = 1, particles = [];
    const mouse = { x: -9999, y: -9999 };

    function palette(t) {
      const a = [120, 135, 255], b = [165, 110, 250], c = [250, 120, 200];
      let r, g, bl;
      if (t < 0.5) { const k = t / 0.5; r = a[0] + (b[0] - a[0]) * k; g = a[1] + (b[1] - a[1]) * k; bl = a[2] + (b[2] - a[2]) * k; }
      else { const k = (t - 0.5) / 0.5; r = b[0] + (c[0] - b[0]) * k; g = b[1] + (c[1] - b[1]) * k; bl = b[2] + (c[2] - b[2]) * k; }
      return `rgb(${r | 0},${g | 0},${bl | 0})`;
    }
    function build() {
      const rect = wrap.getBoundingClientRect();
      W = Math.max(1, rect.width); H = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      const text = (h1.getAttribute('aria-label') || h1.textContent || '').trim();
      if (!text) return;
      const oc = document.createElement('canvas');
      oc.width = W * dpr; oc.height = H * dpr;
      const o = oc.getContext('2d');
      o.scale(dpr, dpr);
      let fs = Math.min(H * 0.86, (W * 1.85) / Math.max(text.length, 1));
      fs = Math.max(fs, 22);
      o.fillStyle = '#fff'; o.textAlign = 'left'; o.textBaseline = 'middle';
      o.font = `800 ${fs}px Inter, 'Pretendard Variable', Pretendard, sans-serif`;
      o.fillText(text, 2, H / 2);
      const data = o.getImageData(0, 0, oc.width, oc.height).data;
      const step = Math.max(3, Math.round(2.6 * dpr));
      const targets = [];
      for (let y = 0; y < oc.height; y += step) {
        for (let x = 0; x < oc.width; x += step) {
          if (data[(y * oc.width + x) * 4 + 3] > 128) targets.push([x / dpr, y / dpr]);
        }
      }
      particles = targets.map((tg, i) => {
        const old = particles[i];
        return { x: old ? old.x : Math.random() * W, y: old ? old.y : Math.random() * H, tx: tg[0], ty: tg[1], vx: 0, vy: 0, col: palette(tg[0] / W) };
      });
    }
    function frame() {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save(); ctx.scale(dpr, dpr); ctx.globalCompositeOperation = 'lighter';
      const R = 76, R2 = R * R;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let ax = (p.tx - p.x) * 0.04, ay = (p.ty - p.y) * 0.04;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) { const d = Math.sqrt(d2) || 1, f = (R - d) / R * 5.0; ax += (dx / d) * f; ay += (dy / d) * f; }
        p.vx = (p.vx + ax) * 0.85; p.vy = (p.vy + ay) * 0.85;
        p.x += p.vx; p.y += p.vy;
        ctx.globalAlpha = 0.9; ctx.fillStyle = p.col;
        ctx.fillRect(p.x - 0.9, p.y - 0.9, 1.8, 1.8);
      }
      ctx.restore();
    }
    function drawStatic() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save(); ctx.scale(dpr, dpr); ctx.globalCompositeOperation = 'lighter';
      particles.forEach((p) => { ctx.globalAlpha = 0.9; ctx.fillStyle = p.col; ctx.fillRect(p.tx - 0.9, p.ty - 0.9, 1.8, 1.8); });
      ctx.restore();
    }
    let raf = 0;
    if (finePointer) {
      window.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
      window.addEventListener('pointerout', () => { mouse.x = mouse.y = -9999; }, { passive: true });
    }
    window.addEventListener('resize', () => { build(); if (reduce) drawStatic(); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { build(); if (reduce) drawStatic(); });
    build();
    document.documentElement.classList.add('fx-ready');
    if (reduce) drawStatic(); else { cancelAnimationFrame(raf); frame(); }
    return { rebuild: () => { build(); if (reduce) drawStatic(); } };
  }

  /* ---------------- 1b. Generative flow-field art (hero, right side) ---------------- */
  function initGenArt() {
    const canvas = document.getElementById('hero3d');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = 1, H = 1, dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    const N = isMobile ? 360 : 820;
    let parts = [];
    const pal = ['rgba(120,135,255,', 'rgba(165,110,250,', 'rgba(250,120,200,'];
    function hash(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
    function vnoise(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
    }
    function spawn(p) { p.x = Math.random() * W; p.y = Math.random() * H; p.life = 20 + Math.random() * 130; p.c = pal[(Math.random() * pal.length) | 0]; }
    function build() {
      W = canvas.clientWidth || 1; H = canvas.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#06060a'; ctx.fillRect(0, 0, W, H);
      parts = []; for (let i = 0; i < N; i++) { const p = {}; spawn(p); parts.push(p); }
    }
    let t = 0;
    function step() {
      t += 0.0032;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(6,6,10,0.055)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      const sc = 0.006;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const ang = vnoise(p.x * sc + t, p.y * sc - t) * Math.PI * 4;
        let vx = Math.cos(ang), vy = Math.sin(ang);
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 150) { const f = (150 - d) / 150; vx += (-dy / (d || 1)) * f * 2.4; vy += (dx / (d || 1)) * f * 2.4; }
        const px = p.x, py = p.y;
        p.x += vx * 1.2; p.y += vy * 1.2; p.life--;
        ctx.strokeStyle = p.c + '0.5)'; ctx.lineWidth = 1.1;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(p.x, p.y); ctx.stroke();
        if (p.life <= 0 || p.x < 0 || p.x > W || p.y < 0 || p.y > H) spawn(p);
      }
    }
    build();
    if (finePointer) window.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    window.addEventListener('pointerout', () => { mouse.x = mouse.y = -9999; }, { passive: true });
    window.addEventListener('resize', build, { passive: true });
    if (reduce) { for (let i = 0; i < 260; i++) step(); return; }
    let running = true, last = 0;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(loop); });
    function loop(now) { if (!running) return; requestAnimationFrame(loop); if (now - last < 24) return; last = now; step(); }
    requestAnimationFrame(loop);
  }

  /* ---------------- 2. Hero entrance (everything except the particle name) ---------------- */
  let heroAnimated = false;
  function animateHero() {
    if (reduce || !has('gsap') || heroAnimated) return;
    heroAnimated = true;
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-photo', { opacity: 0, scale: 0.85, duration: 0.6 })
      .from('.hero-role', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.hero-fx', { opacity: 0, duration: 0.8 }, '-=0.2')
      .from('.hero-tagline', { opacity: 0, y: 18, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  /* ---------------- 3. Scroll reveals (IntersectionObserver) ---------------- */
  let built = false, revealObs = null;
  const REVEAL_SEL = '.about-intro p, .focus-item, .build-card, .card, .timeline-item, .strength-list li, .toolkit, .edu-item, .contact-item';
  const targetsIn = (sec) => [sec.querySelector('h2'), ...sec.querySelectorAll(REVEAL_SEL)].filter(Boolean);
  function setupScroll() {
    if (reduce || !has('gsap')) return;
    if (revealObs) revealObs.disconnect();
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        revealObs.unobserve(e.target);
        gsap.to(targetsIn(e.target), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05 });
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.section').forEach((sec) => {
      const targets = targetsIn(sec);
      if (!targets.length) return;
      const r = sec.getBoundingClientRect();
      if (built && r.top < window.innerHeight && r.bottom > 0) { gsap.set(targets, { opacity: 1, y: 0 }); return; }
      gsap.set(targets, { opacity: 0, y: 26 });
      revealObs.observe(sec);
    });
  }

  /* ---------------- 4. Magnetic buttons ---------------- */
  function magnetize() {
    if (reduce || !finePointer || !has('gsap')) return;
    document.querySelectorAll('.hero-cta, #lang-toggle').forEach((btn) => {
      if (btn.dataset.mag) return; btn.dataset.mag = '1';
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
    });
  }

  /* ---------------- 5. Cursor-glow cards ---------------- */
  function glowCards() {
    if (!finePointer) return;
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.build-card, .card, .focus-item');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------------- 5b. Liquid image distortion on card hover (SVG filter) ---------------- */
  let dist = null;
  function setupDistort() {
    if (reduce || !finePointer) return;
    const filter = document.getElementById('liquid');
    if (!filter) return;
    if (!dist) {
      dist = { turb: filter.querySelector('feTurbulence'), disp: filter.querySelector('feDisplacementMap'), active: 0, target: 0, raf: 0, phase: 0 };
      dist.loop = function loop() {
        dist.raf = requestAnimationFrame(dist.loop);
        dist.active += (dist.target - dist.active) * 0.12;
        if (dist.active < 0.01 && dist.target === 0) { dist.active = 0; dist.disp.setAttribute('scale', '0'); cancelAnimationFrame(dist.raf); dist.raf = 0; return; }
        dist.phase += 0.012;
        const bf = 0.010 + Math.sin(dist.phase) * 0.004;
        dist.turb.setAttribute('baseFrequency', `${bf.toFixed(4)} ${(bf * 1.3).toFixed(4)}`);
        dist.disp.setAttribute('scale', (dist.active * 8).toFixed(1));
      };
    }
    document.querySelectorAll('.build-card').forEach((card) => {
      if (card.dataset.dist) return; card.dataset.dist = '1';
      const img = card.querySelector('.card-media img');
      if (!img) return;
      card.addEventListener('pointerenter', () => { img.style.filter = 'url(#liquid)'; dist.target = 1; if (!dist.raf) dist.loop(); });
      card.addEventListener('pointerleave', () => { dist.target = 0; if (!dist.raf) dist.loop(); setTimeout(() => { if (dist.target === 0) img.style.filter = ''; }, 500); });
    });
  }

  /* ---------------- 6. Kinetic marquee (scroll-velocity reactive) ---------------- */
  const MARQUEE = ['Generative AI', 'Local LLMs', 'AI Agents', 'Multimodal', '3D & WebGL', 'Indie Hacker', 'Always Building'];
  function initMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const make = () => MARQUEE.map((w, i) => `<span class="mword${i % 2 ? ' outline' : ''}">${w}</span><span class="sep">✦</span>`).join('');
    track.innerHTML = make() + make();
    if (reduce) return;
    let x = 0, lastY = window.scrollY || 0, vel = 0;
    function loop() {
      requestAnimationFrame(loop);
      const y = window.scrollY || 0;
      vel = y - lastY; lastY = y;
      x -= 0.6 + Math.min(Math.abs(vel) * 0.5, 36);
      const half = track.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translateX(${x}px) skewX(${Math.max(-10, Math.min(10, -vel * 0.35))}deg)`;
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- boot ---------------- */
  let pc = null;
  function boot() { initGenArt(); initMarquee(); glowCards(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('langapplied', () => {
    if (!pc) pc = initParticles(); else pc.rebuild();
    animateHero();
    setupScroll();
    magnetize();
    setupDistort();
    built = true;
  });
})();
