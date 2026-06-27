---
name: showcase-site
description: The site/ showcase — structure, the adopted CMS design system, run command, and rebrand tokens.
metadata:
  type: project
---

**The site (`site/`) is built and verified** (Playwright render, no console errors). Static
HTML/CSS/JS, **no build step**. Rebranded to **Veloce-AI** and deployed — see [[deployment]] · [[brand-identity]].
The live `index.html` = Hamza's **PurpleDelight** skin (`purpledelight.css` over `styles.css`),
rebuilt into a bespoke hero (left column = brand masthead, right column = robot):
- **Masthead:** the **main logo** `assets/veloce-logo.png` (infinity symbol + VELOCE-AI wordmark —
  cropped from `veloce-lockup.png` to drop the baked tagline) with the **phonetic line beside it on
  the right** — red **"veh-LOH-cheh"** + "the Italian way of saying Fast, Swift, Efficient" in the
  **Caveat** handwriting font; a **yellow Ferrari** SVG drives out and "prints" it on an 11s loop
  (stays, repeats). The separate **tagline image** `veloce-tagline.png` sits below the logo.
- **Greeting:** time-of-day **"Good morning"** (half-sun SVG) pinned to the hero's **top-right corner**.
- **Robot:** cursor-following **metallic-steel** bot, lower-right, emitting **binary transmission waves**
  (line arcs → faint 0/1 digits spreading left). A **sea-green follower ring** chases the pointer
  (`app.js` cursorFX two-stage ease `e1=e2=0.075`) and bursts like a firework on catch.
- **Nav:** the **"Veloce AI" wordmark is always shown at the far left**; the small infinity logo
  **slides in on scroll** and pushes the wordmark right (`body.scrolled` toggled in `app.js` at >150px).
- Also: **"Infinity Concept"** brand-icon section, **F·T·E** styled term, final-CTA infinity watermark.
  Background shifted deep-violet → **indigo** (`--void*` in `purpledelight.css`).
`index-v3.html` (deep-black) and `index-v2.html` (warm paper) are noindex alternates. `products/*.html`
+ `lab.html` still use the original neon kit — porting them is open. Variants: [[design-inspiration]].

**Gotchas (load-bearing):**
1. **`.reveal.in{ transform:none }`** (`styles.css`) **wipes any positioning transform** on a `.reveal`
   element once it fades in. To place an element with `transform:translate(...)` (e.g. the robot via
   `.hero-bot`), it must **NOT carry the `reveal` class** — otherwise it snaps back after load. This
   burned ~6 "move the robot" iterations before it was found.
2. **`?v=N` cache-bust** — every `assets/*.css|js|png` link in `index.html` carries `?v=N`; **bump N on
   every asset edit** (one `sed` over the file) or the browser serves stale files (currently **v38**).
3. **Unigeo64 is a trial font** (`assets/fonts/`) — digits render as watermark glyphs, so it's used
   **only on letter-only text** (hero headline + greeting); numbers use Space Grotesk / Plus Jakarta Sans.
4. **Caveat** (Google Fonts) is the handwriting face for the phonetic line; loaded in the `<head>` link.
- `index.html` — landing: hero with an AI command bar + live fleet shift-log, thesis pillars,
  the **Watch → Reason → Act → Report** pipeline, the 5-unit fleet grid (+ a "20 more in the
  lab" card), the platform stack (Live/Roadmap tags), the honesty band, count-up stats, CTA.
- `products/*.html` — 5 flagship dossiers: `complainthub`, `personal-ai-employee`,
  `aria-assistant`, `operanova`, `vision-alert`. Each splits **Running today** (cyan card) vs
  **On the roadmap** (amber card) with an explicit honesty note + a "replaces" band + demo steps.
- `lab.html` — the 20 non-flagship products in 3 tiers (field-ready / in the lab / platform),
  filter chips, AI/FTE meter bars; each card links to its `../reports/projects/<slug>.md` dossier.
- `assets/styles.css` + `assets/app.js` — shared design system + JS (reveal, typing, clock, filter).

**Base design system** (`styles.css`, still the look on `products/*` + `lab.html`; ported from the
CMS enterprise "AI spectrum" kit `/home/anjum/dev/cms/marketing/`): Space Grotesk / Inter /
JetBrains Mono; void background + floating orbs + masked grid; **glass** gradient-bordered cards;
reveal-on-scroll. LIVE/ROADMAP honesty encoded as **cyan = live, amber = roadmap, cyan-glow =
production**. The homepage overrides most of this via `purpledelight.css` (deep-violet palette,
Plus Jakarta Sans + Unigeo64 + Space Grotesk, the brand/interaction layer above).

**Run:** from the repo **root** → `python3 -m http.server 8055` →
http://localhost:8055/site/index.html. Serve from root (not `site/`) so the lab's `../reports/`
dossier links resolve.

**Rebrand to Veloce-AI is done** (AEVUM→Veloce-AI, `hello@veloce-ai.com`). Design tokens are CSS
custom properties at the top of `styles.css` (base) and `purpledelight.css` (homepage skin).
Brand context: [[identity-and-positioning]] · [[brand-identity]].
