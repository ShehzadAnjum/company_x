/* AEVUM — interaction layer. Vanilla JS, no deps. */
(function () {
  'use strict';

  /* ---- nav scroll state ------------------------------------------------ */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ----------------------------------------------------- */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? '' : 'flex';
      links.style.cssText += open ? '' :
        'position:fixed;top:60px;left:0;right:0;flex-direction:column;background:rgba(6,8,11,.97);padding:24px 28px;gap:20px;border-bottom:1px solid var(--line);backdrop-filter:blur(16px);';
    });
  }

  /* ---- reveal on scroll ------------------------------------------------ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---- count-up -------------------------------------------------------- */
  const cu = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseFloat(el.dataset.to);
      const suffix = el.dataset.suffix || '';
      const dec = (el.dataset.dec | 0);
      let t0 = null;
      const dur = 1400;
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cu.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-to]').forEach((el) => cu.observe(el));

  /* ---- 24/7 shift clock (the restless workforce never clocks out) ------ */
  const clocks = document.querySelectorAll('[data-clock]');
  if (clocks.length) {
    const tick = () => {
      const d = new Date();
      const t = [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, '0')).join(':');
      clocks.forEach((c) => (c.textContent = t));
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---- hero command-bar typewriter ------------------------------------- */
  const typeEl = document.querySelector('[data-type]');
  if (typeEl) {
    const phrases = JSON.parse(typeEl.dataset.type);
    let pi = 0, ci = 0, deleting = false;
    const run = () => {
      const word = phrases[pi];
      typeEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(run, 46); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(run, 1700); }
      else if (deleting && ci > 0) { ci--; setTimeout(run, 24); }
      else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(run, 320); }
    };
    run();
  }

  /* ---- lab category filter --------------------------------------------- */
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
      // hide a category heading when it has no visible cards
      cats.forEach((h) => {
        const grid = h.nextElementSibling;
        const any = grid && grid.querySelectorAll('.lab-card:not(.hide)').length > 0;
        h.style.display = any ? '' : 'none';
        if (grid) grid.style.display = any ? '' : 'none';
      });
    }));
  }

  /* ---- staged console log (hero) --------------------------------------- */
  const logRows = document.querySelectorAll('.console-log .log-row');
  if (logRows.length) {
    const reveal = () => logRows.forEach((r, i) => setTimeout(() => r.classList.add('in'), 600 + i * 520));
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { reveal(); obs.disconnect(); } });
    }, { threshold: 0.4 });
    obs.observe(logRows[0].closest('.console'));
  }
})();
