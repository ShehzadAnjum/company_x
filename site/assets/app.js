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
  const onNavScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 150);
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

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

  /* ---- circle cursor + spotlight (PurpleDelight / Purple2) ------------- */
  (function cursorFX() {
    if (!document.body.classList.contains('fx')) return;
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (!fine) return;   // reduce-motion keeps the cursor, just drops the trail

    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    const glow = document.createElement('div'); glow.className = 'cursor-glow';
    document.body.append(glow, ring);

    // glow tracks the pointer 1:1; the ring eases behind for a trailing feel
    let tx = innerWidth / 2, ty = innerHeight / 2;   // target (true pointer)
    let rx = tx, ry = ty;                             // ring position (lerped)
    let started = false;

    let lastTX = tx, lastTY = ty;
    const move = (x, y) => {
      tx = x; ty = y;
      glow.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      if (!started) { started = true; document.body.classList.add('fx-ready'); }
      if (calm) return;
      const dx = x - lastTX, dy = y - lastTY;
      if (dx * dx + dy * dy > 520) {   // every ~23px, drop a faint half-circle
        const t = document.createElement('div'); t.className = 'cursor-trail';
        t.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 900);
        lastTX = x; lastTY = y;
      }
    };
    window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY), { passive: true });

    // two-stage easing => initial delay + smooth follow (higher = faster chase)
    const e1 = calm ? 1 : 0.075;
    const e2 = calm ? 1 : 0.075;
    let mx = tx, my = ty, inside = true, armed = true;

    // star/firework burst when the ring finally reaches the cursor
    const burst = (x, y) => {
      const flash = document.createElement('div'); flash.className = 'cursor-burst';
      flash.style.setProperty('--bx', x + 'px'); flash.style.setProperty('--by', y + 'px');
      document.body.appendChild(flash); setTimeout(() => flash.remove(), 560);
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2) * (i / 16) + Math.random() * 0.5;
        const d = 16 + Math.random() * 30;
        const s = document.createElement('div'); s.className = 'cursor-spark';
        s.style.setProperty('--x0', x + 'px'); s.style.setProperty('--y0', y + 'px');
        s.style.setProperty('--x1', (x + Math.cos(a) * d) + 'px');
        s.style.setProperty('--y1', (y + Math.sin(a) * d) + 'px');
        document.body.appendChild(s); setTimeout(() => s.remove(), 680);
      }
    };

    const raf = () => {
      mx += (tx - mx) * e1; my += (ty - my) * e1;
      rx += (mx - rx) * e2; ry += (my - ry) * e2;
      const dist = Math.hypot(tx - rx, ty - ry);
      if (armed && started && inside && dist < 9) { burst(tx, ty); armed = false; }  // caught it -> burst
      else if (!armed && dist > 70) { armed = true; }                                // moved away -> re-arm
      const k = Math.max(0, Math.min(1, (dist - 5) / 55));
      const op = (inside && started && armed) ? (0.12 + 0.75 * k) : 0;   // hidden after the burst
      ring.style.opacity = op.toFixed(2);
      ring.style.borderStyle = k < 0.5 ? 'dashed' : 'solid';
      const sc = 1 + (1 - k) * 0.35;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) scale(' + sc.toFixed(3) + ')';
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // grow + fill the ring over clickable things
    const interactive = 'a, button, .btn, .chip, [role="button"], input, textarea, select';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) ring.classList.remove('is-active');
    });

    // fade everything out when the pointer leaves the window
    document.addEventListener('mouseleave', () => { inside = false; document.body.classList.remove('fx-ready'); });
    document.addEventListener('mouseenter', () => { inside = true; if (started) document.body.classList.add('fx-ready'); });
  })();

  /* ---- hero robot follows the cursor (head tilt + pupils) -------------- */
  (function robotFollow() {
    const bot = document.querySelector('[data-robot]');
    if (!bot || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const calm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

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
    const WAVES = 9, CHARS = 13, DUR = 26;           // DUR matches the binWave CSS duration
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
    if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
      setInterval(() => { for (const s of all) if (Math.random() < 0.4) s.textContent = Math.random() < 0.5 ? '0' : '1'; }, 1400);
    }
  })();

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
