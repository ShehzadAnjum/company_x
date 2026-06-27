/* AEVUM — interaction layer (AI-spectrum build). Vanilla JS, no deps. */
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

  /* ---- 24/7 shift clock ------------------------------------------------ */
  const clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    const tick = () => {
      const d = new Date();
      const t = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
      clocks.forEach((c) => (c.textContent = t));
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
    if (!fine || calm) return;

    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    const glow = document.createElement('div'); glow.className = 'cursor-glow';
    document.body.append(glow, ring);

    // glow tracks the pointer 1:1; the ring eases behind for a trailing feel
    let tx = innerWidth / 2, ty = innerHeight / 2;   // target (true pointer)
    let rx = tx, ry = ty;                             // ring position (lerped)
    let started = false;

    const move = (x, y) => {
      tx = x; ty = y;
      glow.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      if (!started) { started = true; document.body.classList.add('fx-ready'); }
    };
    window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY), { passive: true });

    const raf = () => {
      rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
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
    document.addEventListener('mouseleave', () => document.body.classList.remove('fx-ready'));
    document.addEventListener('mouseenter', () => { if (started) document.body.classList.add('fx-ready'); });
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
