/* Veloce AI — interaction layer (AI-spectrum build). Vanilla JS, no deps. */
(function () {
  'use strict';

  /* ---- reveal on scroll (staggered, CMS-style) ------------------------- */
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = ((i % 4) * 70) + 'ms';
    io.observe(el);
  });

  /* ---- nav brand fades in on scroll (the hero's big logo owns the top) -- */
  /* Progressive header: glass pill appears on the first bit of scroll, then
     shortens with scroll distance so the logo + CTA draw toward the centre.
     The pill width is EASED every frame (rAF lerp) toward the scroll target,
     so every movement glides smoothly instead of snapping per scroll event. */
  const NAV_START = 18, NAV_RANGE = 460;
  let navTarget = 0, navCur = 0, navRAF = null;
  const setTarget = () => {
    const y = window.scrollY;
    document.body.classList.toggle('scrolled', y > NAV_START);
    navTarget = Math.min(1, Math.max(0, (y - NAV_START) / NAV_RANGE));
  };
  const tick = () => {
    navCur += (navTarget - navCur) * 0.12;                  // ease toward target
    if (Math.abs(navTarget - navCur) < 0.0005) navCur = navTarget;
    const maxW = Math.min(window.innerWidth * 0.92, 1500);  // first-scroll pill (a little shortened)
    const minW = Math.min(660, maxW);                       // fully converged pill
    document.documentElement.style.setProperty('--navw', (maxW - (maxW - minW) * navCur) + 'px');
    navRAF = (navCur !== navTarget) ? requestAnimationFrame(tick) : null;
  };
  const onNavScroll = () => { setTarget(); if (!navRAF) navRAF = requestAnimationFrame(tick); };
  setTarget(); navCur = navTarget; tick();
  window.addEventListener('scroll', onNavScroll, { passive: true });
  window.addEventListener('resize', onNavScroll, { passive: true });

  /* ---- mobile menu ----------------------------------------------------- */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      if (open) { links.style.cssText = ''; return; }
      links.style.cssText =
        'display:flex;position:fixed;top:58px;left:0;right:0;flex-direction:column;align-items:flex-start;gap:1.1rem;background:rgba(5,6,15,.97);padding:1.4rem 4vw;border-bottom:1px solid var(--line);backdrop-filter:blur(16px);';
    });
  }

  /* ---- time-of-day greeting -------------------------------------------- */
  const greet = document.querySelector('[data-greet]');
  if (greet) {
    const h = new Date().getHours();
    const label = h < 12 ? 'Good morning'
      : h < 17 ? 'Good afternoon'
      : h < 21 ? 'Good evening'
      : 'Working late';
    const b = greet.querySelector('b');
    if (b) b.textContent = label;   // leave the inline SVG sun untouched
  }

  /* ---- 24/7 shift clock (+ split-flap board for [data-flap]) ----------- */
  const clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    const renderFlap = (el, t) => {
      if (el.childElementCount !== t.length) {        // build cards once
        el.textContent = '';
        for (const ch of t) {
          const s = document.createElement('span');
          s.className = ch === ':' ? 'flap flap-sep' : 'flap';
          s.textContent = ch; el.appendChild(s);
        }
        el._prev = t; return;
      }
      const prev = el._prev || '';
      Array.prototype.forEach.call(el.children, (s, i) => {
        if (t[i] === prev[i]) return;
        s.textContent = t[i];
        if (!s.classList.contains('flap-sep')) {       // re-trigger flip
          s.classList.remove('flip'); void s.offsetWidth; s.classList.add('flip');
        }
      });
      el._prev = t;
    };
    const tick = () => {
      const d = new Date();
      const t = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
      clocks.forEach((c) => { if (c.hasAttribute('data-flap')) renderFlap(c, t); else c.textContent = t; });
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---- count-up -------------------------------------------------------- */
  const cu = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = parseFloat(el.dataset.to), suf = el.dataset.suffix || '', dec = (el.dataset.dec | 0);
      let t0 = null; const dur = 1400;
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); cu.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-to]').forEach((el) => cu.observe(el));

  /* ---- command-bar typing --------------------------------------------- */
  const typed = document.querySelector('.cmdbar .typed');
  if (typed && typed.dataset.type) {
    const phrases = JSON.parse(typed.dataset.type);
    typed.insertBefore(document.createTextNode(''), typed.firstChild);
    let p = 0, i = 0, dir = 1;
    const tick = () => {
      const txt = phrases[p];
      i += dir;
      typed.firstChild.nodeValue = txt.slice(0, i);
      if (i === txt.length) { dir = -1; setTimeout(tick, 1900); return; }
      if (i === 0) { dir = 1; p = (p + 1) % phrases.length; }
      setTimeout(tick, dir > 0 ? 45 : 22);
    };
    setTimeout(tick, 1100);
  }

  /* ---- circle brand cursor: a ring + centre dot that follows the pointer and
     grows over interactive elements. Calm by design — the old trailing dots and
     16-spark firework burst were removed for a more premium feel (review #6). -- */
  (function cursorFX() {
    if (!document.body.classList.contains('fx')) return;
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (!fine) return;
    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    let tx = innerWidth / 2, ty = innerHeight / 2;   // target (true pointer)
    let rx = tx, ry = ty;                             // ring position (eased)
    let started = false, inside = true;
    const ease = calm ? 1 : 0.22;                    // gentle follow, no trailing FX

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!started) { started = true; document.body.classList.add('fx-ready'); }
    }, { passive: true });

    const raf = () => {
      rx += (tx - rx) * ease; ry += (ty - ry) * ease;
      ring.style.opacity = (inside && started) ? '1' : '0';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // grow + fill the ring over clickable things
    const interactive = 'a, button, .btn, .chip, [role="button"], input, textarea, select';
    document.addEventListener('mouseover', (e) => { if (e.target.closest(interactive)) ring.classList.add('is-active'); });
    document.addEventListener('mouseout',  (e) => { if (e.target.closest(interactive)) ring.classList.remove('is-active'); });
    document.addEventListener('mouseleave', () => { inside = false; document.body.classList.remove('fx-ready'); });
    document.addEventListener('mouseenter', () => { inside = true; if (started) document.body.classList.add('fx-ready'); });
  })();

  /* ---- hero robot follows the cursor (head tilt + pupils) -------------- */
  (function robotFollow() {
    const bot = document.querySelector('[data-robot]');
    if (!bot || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (calm) return;   // reduced-motion: the robot stays still

    let tx = 0, ty = 0, rx = 0, ry = 0;   // target vs eased, range ~[-1,1]
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    window.addEventListener('mousemove', (e) => {
      const r = bot.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.42;
      tx = clamp((e.clientX - cx) / (innerWidth * 0.5));
      ty = clamp((e.clientY - cy) / (innerHeight * 0.5));
    }, { passive: true });

    const ease = calm ? 1 : 0.12;   // calm: snap, no trailing
    const raf = () => {
      rx += (tx - rx) * ease; ry += (ty - ry) * ease;
      bot.style.setProperty('--rx', rx.toFixed(3));
      bot.style.setProperty('--ry', ry.toFixed(3));
      bot.style.setProperty('--rxabs', Math.abs(rx).toFixed(3));
      bot.style.setProperty('--ryabs', Math.abs(ry).toFixed(3));
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  })();

  /* ---- binary "transmission" waves emitted leftward from the robot ------ */
  (function binaryWaves() {
    const host = document.querySelector('[data-binwaves]');
    if (!host) return;
    // the first waves are plain line arcs near the robot
    const LINES = 3, LDUR = 8;                        // LDUR matches the lineWave CSS duration
    for (let i = 0; i < LINES; i++) {
      const ln = document.createElement('div'); ln.className = 'line-wave';
      ln.style.animationDelay = (i * LDUR / LINES).toFixed(2) + 's';
      host.appendChild(ln);
    }
    const WAVES = 4, CHARS = 9, DUR = 26;            // thinned for a calmer hero (review #6)
    const all = [];
    for (let w = 0; w < WAVES; w++) {
      const delay = (w * DUR / WAVES).toFixed(2) + 's';
      for (let c = 0; c < CHARS; c++) {
        const rad = (94 + (c / (CHARS - 1)) * 172) * Math.PI / 180;   // 94°..266° = left arc
        const s = document.createElement('span');
        s.className = 'bin';
        s.textContent = Math.random() < 0.5 ? '0' : '1';
        s.style.setProperty('--dx', Math.cos(rad).toFixed(4));
        s.style.setProperty('--dy', Math.sin(rad).toFixed(4));
        s.style.animationDelay = delay;
        host.appendChild(s); all.push(s);
      }
    }
    // (the per-character 0/1 flicker was removed for a calmer hero — review #6)
    void all;
  })();

  /* ---- analytics & pixels (Stage A) ----------------------------------- *
   * Fill in your real IDs to activate. Left blank = nothing loads, no error.
   * GA4: Google Analytics "Measurement ID" (G-XXXXXXXXXX)
   * metaPixel: Meta/Facebook Pixel ID (numeric)
   * linkedIn: LinkedIn Insight Tag partner ID (numeric)                    */
  var VELOCE_ANALYTICS = { ga4: 'G-25RHDFV0C7', metaPixel: '', linkedIn: '' };
  (function (cfg) {
    if (cfg.ga4) {
      var g = document.createElement('script'); g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.ga4;
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', cfg.ga4);
    }
    if (cfg.metaPixel) {
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', cfg.metaPixel); window.fbq('track', 'PageView');
    }
    if (cfg.linkedIn) {
      window._linkedin_partner_id = cfg.linkedIn;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(cfg.linkedIn);
      var l = document.createElement('script'); l.async = true; l.type = 'text/javascript';
      l.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      document.head.appendChild(l);
    }
  })(VELOCE_ANALYTICS);

  /* ---- lab category filter -------------------------------------------- */
  const chips = document.querySelectorAll('.lab-filters .chip');
  if (chips.length) {
    const cards = document.querySelectorAll('.lab-card');
    const cats = document.querySelectorAll('.lab-cat');
    chips.forEach((chip) => chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const show = f === 'all' || (card.dataset.cat || '').split(' ').includes(f);
        card.classList.toggle('hide', !show);
      });
      cats.forEach((h) => {
        const grid = h.nextElementSibling;
        const any = grid && grid.querySelectorAll('.lab-card:not(.hide)').length > 0;
        h.style.display = any ? '' : 'none';
        if (grid) grid.style.display = any ? '' : 'none';
      });
    }));
  }
})();
