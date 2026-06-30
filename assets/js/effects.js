/* Interactive layer (vanilla, no build):
   - Hero name rendered as a Canvas2D particle field that scatters away from the
     cursor and springs back (the signature interaction).
   - GSAP entrance for the rest of the hero + IntersectionObserver scroll reveals.
   - Magnetic buttons + cursor-glow cards.
   Everything degrades gracefully: content is visible by default, and if a lib or
   the canvas is unavailable the page is still fully readable. */
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

    let W = 0, H = 0, dpr = 1, particles = [], raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function palette(t) { // 0..1 across width: indigo -> violet -> pink
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
      particles = targets.map((t, i) => {
        const old = particles[i];
        return {
          x: old ? old.x : Math.random() * W, y: old ? old.y : Math.random() * H,
          tx: t[0], ty: t[1], vx: 0, vy: 0, col: palette(t[0] / W),
        };
      });
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'lighter';
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

    if (finePointer) {
      window.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      }, { passive: true });
      window.addEventListener('pointerout', () => { mouse.x = mouse.y = -9999; }, { passive: true });
    }
    window.addEventListener('resize', () => { build(); if (reduce) drawStatic(); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { build(); if (reduce) drawStatic(); });

    build();
    document.documentElement.classList.add('fx-ready');
    if (reduce) drawStatic(); else { cancelAnimationFrame(raf); frame(); }
    return { rebuild: () => { build(); if (reduce) drawStatic(); } };
  }

  /* ---------------- 1b. Procedural 3D object (hero, right side) ---------------- */
  function init3D() {
    if (reduce || isMobile || !has('THREE')) return;
    const canvas = document.getElementById('hero3d');
    if (!canvas) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch (e) { return; }
    if (!renderer.getContext()) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.4;

    const uniforms = {
      uTime: { value: 0 }, uAmp: { value: 0.3 },
      uA: { value: new THREE.Color(0x2f33e8) }, uB: { value: new THREE.Color(0xb45cff) },
    };
    const SNOISE = `
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
        i=mod(i,289.0);
        vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
        vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }`;
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true,
      vertexShader: `${SNOISE}
        uniform float uTime; uniform float uAmp;
        varying vec3 vNormal; varying vec3 vView; varying float vN;
        void main(){
          float n = snoise(position*1.3 + vec3(0.0,0.0,uTime*0.28));
          float n2 = snoise(position*2.8 - uTime*0.16);
          float disp = n*0.72 + n2*0.28;
          vec3 pos = position + normal*disp*uAmp;
          vNormal = normalize(normalMatrix*normal);
          vec4 mv = modelViewMatrix*vec4(pos,1.0);
          vView = -mv.xyz; vN = disp;
          gl_Position = projectionMatrix*mv;
        }`,
      fragmentShader: `
        uniform vec3 uA; uniform vec3 uB;
        varying vec3 vNormal; varying vec3 vView; varying float vN;
        void main(){
          vec3 N=normalize(vNormal); vec3 V=normalize(vView);
          float fres=pow(1.0-max(dot(N,V),0.0),2.2);
          vec3 col=mix(uA,uB,clamp(vN*0.6+0.5,0.0,1.0));
          col+=fres*vec3(0.55,0.62,1.0)*1.35;
          gl_FragColor=vec4(col, 0.94);
        }`,
    });
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 6), mat);
    scene.add(mesh);

    function resize() {
      const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const ptr = { x: 0, y: 0 };
    if (finePointer) window.addEventListener('pointermove', (e) => {
      ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    let running = true, last = 0;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(loop); });
    const start = performance.now();
    function loop(now) {
      if (!running) return;
      requestAnimationFrame(loop);
      if (now - last < 32) return; last = now;
      const t = (now - start) / 1000;
      uniforms.uTime.value = t;
      mesh.rotation.y += 0.0035;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, ptr.y * 0.5, 0.05);
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -ptr.x * 0.4, 0.05);
      renderer.render(scene, camera);
    }
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
      .from('.hero-links a', { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .from('.scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  /* ---------------- 3. Scroll reveals (IntersectionObserver) ---------------- */
  let built = false, revealObs = null;
  const REVEAL_SEL = '.about-intro p, .focus-item, .build-card, .card, .timeline-item, .strength-list li, .toolkit, .edu-item, .contact-links a';
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
    document.querySelectorAll('.hero-links a, .contact-links a, #lang-toggle').forEach((btn) => {
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

  /* ---------------- boot ---------------- */
  let pc = null;
  function boot() { init3D(); glowCards(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('langapplied', () => {
    if (!pc) pc = initParticles(); else pc.rebuild();
    animateHero();
    setupScroll();
    magnetize();
    built = true;
  });
})();
