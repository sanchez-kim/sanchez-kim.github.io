/* Interactive layer: WebGL reactive background, smooth scroll, kinetic hero,
   scroll-triggered reveals, magnetic buttons, cursor-glow cards.
   Every feature is feature-detected and wrapped so a missing CDN lib or a
   reduced-motion preference degrades gracefully without breaking the page. */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const has = (g) => typeof window[g] !== 'undefined';

  document.documentElement.classList.add('js');

  /* ---------------- 1. WebGL reactive background ---------------- */
  function initWebGL() {
    if (reduce || isMobile || !has('THREE')) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' }); }
    catch (e) { return; }
    if (!renderer.getContext()) return;

    const canvas = renderer.domElement;
    canvas.id = 'bg-webgl';
    Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', zIndex: '-1', display: 'block' });
    document.body.prepend(canvas);
    document.documentElement.classList.add('has-webgl');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
        precision highp float;
        uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_scroll;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
        float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<3;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
        void main(){
          vec2 uv = gl_FragCoord.xy/u_res.xy;
          float ar = u_res.x/u_res.y;
          vec2 p = vec2(uv.x*ar, uv.y);
          float t = u_time*0.04;
          vec2 q = p*1.5 + vec2(0.0, -u_scroll*0.00035);
          float n = fbm(q + fbm(q + vec2(t, t*0.6)));
          vec2 m = vec2(u_mouse.x*ar, u_mouse.y);
          float d = distance(p, m);
          float glow = smoothstep(0.55, 0.0, d);
          vec3 base = vec3(0.022,0.022,0.031);
          vec3 indigo = vec3(0.43,0.48,1.0);
          vec3 pink = vec3(0.62,0.42,0.95);
          float field = smoothstep(0.35,0.95,n);
          vec3 col = base;
          col += indigo*field*0.17;
          col += pink*pow(field,2.0)*0.06;
          col += indigo*glow*0.12;
          col *= 1.0 - 0.45*distance(uv,vec2(0.5));
          gl_FragColor = vec4(col,1.0);
        }`,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.u_res.value.set(w * dpr, h * dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const target = new THREE.Vector2(0.5, 0.5);
    if (finePointer) {
      window.addEventListener('pointermove', (e) => {
        target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      }, { passive: true });
    }
    window.addEventListener('scroll', () => { uniforms.u_scroll.value = window.scrollY || 0; }, { passive: true });

    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(loop); });
    const start = performance.now();
    function loop(now) {
      if (!running) return;
      uniforms.u_time.value = (now - start) / 1000;
      uniforms.u_mouse.value.lerp(target, 0.05);
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- 2. Lenis smooth scroll ---------------- */
  function initLenis() {
    if (reduce || !has('Lenis')) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 });
    if (has('ScrollTrigger') && has('gsap')) {
      // Drive Lenis from GSAP's ticker (single source of truth) and sync ScrollTrigger.
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    // anchor links through Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) { const el = document.querySelector(id); if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -70 }); } }
      });
    });
  }

  /* ---------------- 3. Kinetic hero ---------------- */
  function splitName() {
    const el = document.querySelector('.hero-name');
    if (!el || el.dataset.split) return el;
    const text = el.textContent.trim();
    el.dataset.split = '1';
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split('').map((ch) =>
      ch === ' ' ? '<span class="kchar">&nbsp;</span>'
      : `<span class="kchar" aria-hidden="true">${ch}</span>`).join('');
    return el;
  }
  function animateHero() {
    if (reduce || !has('gsap')) return;
    const chars = document.querySelectorAll('.hero-name .kchar');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-photo', { opacity: 0, scale: 0.85, duration: 0.6 })
      .from('.hero-role', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from(chars, { yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.035 }, '-=0.2')
      .from('.hero-tagline', { opacity: 0, y: 18, duration: 0.6 }, '-=0.3')
      .from('.hero-links a', { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .from('.scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  /* ---------------- 4. Scroll reveals (IntersectionObserver — robust) ---------------- */
  let built = false;
  let revealObs = null;
  const REVEAL_SEL = '.about-intro, .about-points li, .focus-item, .build-card, .card, .timeline-item, .skill-group, .edu-item, .contact-links a';
  function targetsIn(sec) { return [sec.querySelector('h2'), ...sec.querySelectorAll(REVEAL_SEL)].filter(Boolean); }
  function setupScroll() {
    if (reduce || !has('gsap')) return; // content stays visible (CSS) when motion is off / gsap missing
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

  /* ---------------- 5. Magnetic buttons ---------------- */
  function magnetize() {
    if (reduce || !finePointer || !has('gsap')) return;
    document.querySelectorAll('.hero-links a, .contact-links a, #lang-toggle').forEach((btn) => {
      if (btn.dataset.mag) return; btn.dataset.mag = '1';
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.4, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
    });
  }

  /* ---------------- 6. Cursor-glow on cards ---------------- */
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

  /* ---------------- boot ---------------- */
  function boot() { initWebGL(); initLenis(); glowCards(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // (re)bind text + scroll animations after i18n renders / language toggles
  window.addEventListener('langapplied', () => {
    splitName();
    if (!built) { animateHero(); }
    setupScroll();
    magnetize();
    built = true;
  });
})();
