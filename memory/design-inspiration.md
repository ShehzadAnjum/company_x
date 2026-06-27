---
name: design-inspiration
description: Live design research of 16 top AI/agentic sites (2026) + the warm-paper "v2" token proposal applied in site/index-v2.html.
metadata:
  type: reference
---

Browsed 16 leading AI sites live via Playwright (hero screenshots + computed fonts/colors).
Source artifacts were in the session scratchpad (`research/*.png`, `tokens.json`); the durable
conclusions live here. Applied as two separate variants (the live [[showcase-site]] is untouched):
- **v2 — warm paper** (Anthropic/Sierra/Cognition camp): `site/index-v2.html` + `assets/styles-v2.css`.
- **v3 — deep black** (Linear/Luma camp): `site/index-v3.html` + `assets/styles-v3.css` — near-black
  `#0A0B0D`, monochrome elevation, one iris accent `#7C86FF`, restrained aurora (no neon orbs).
Both reuse `app.js` and the same class hooks; same copy/structure, different skin.

## Sites studied
Agentic / AI-worker: Sierra · Cognition (Devin) · Decagon · Lindy · Artisan · Cresta · 11x.
Labs: Anthropic · OpenAI · Mistral · Perplexity. Benchmarks: Linear · Vercel · Runway · ElevenLabs · Luma.

## What the premium tier actually does in 2026
- **Warm paper, not cold neon.** Backgrounds are bone/cream `#FAF8F3`-ish with near-black warm
  ink and ONE restrained accent: Anthropic `#FAF9F5`, Mistral `#FBFBF8`, Lindy `#FCF9F8`,
  Artisan `#FBF9F7`, Cognition `#F7F6F5`, Sierra/Perplexity cream. Counter-camp = cinematic deep
  black (Linear `#08090A`, Luma, Runway, 11x). **Our current site is the neon look they left.**
- **Type = big + light + tight.** Display headings 52–152px, weight 400–500 (NOT bold), heavy
  negative tracking (−1.3 to −6.84px). Custom grotesque is the top-tier tell (Anthropic Sans,
  OpenAI Sans, Sierra gtAmerica, 11x ES Allianz, Luma Graphik); tier below uses Inter/Geist/Manrope.
- **Serif + grotesque + mono trio.** Refined serif for gravitas (Anthropic Serif, Cognition Bureau
  Serif, Luma PP Editorial); mono for every eyebrow/label/datum (Berkeley, JetBrains, Geist Mono).
- **Show the agent working.** Sierra/Lindy/Decagon/Cresta embed a live agent artifact in the hero
  (chat thread, booking widget) — proof, not promise. Maps directly to our honesty rule.
- **Blueprint structure** (Cognition): corner ticks, numbered sections `01/02`, mono labels, hairlines.
  Closest analog to Aevum — a ready-made way to render "what runs today vs roadmap gap".
- **One accent on CTAs.** Agentic blue dominates: Decagon, Lindy `#2A66FF`, Cresta `#205AE3`,
  Cognition `#2200FF`.

## The "v2" token proposal (warm-paper editorial-blueprint) — applied in styles-v2.css
Palette: paper `#FAF8F3` · surface `#FFFFFF` · sunk `#F2EFE9` · ink `#181712` / `#56524A` / `#8B867B`
· hairline `rgba(24,23,18,.10/.16)`. Brand accent **cobalt `#2A4DFF`**; status stays two-tone —
**live emerald `#0E7A52`**, **roadmap amber `#B4530A`** (keeps the honesty system legible on light).
Type: display **Inter Tight** (big/light/tight), serif accent **Fraunces** italic, body **Inter**,
labels **JetBrains Mono**. Scale: hero `clamp(2.8rem,6.5vw,5.4rem)` w500 ls −.03em; H2 ~3rem w500;
mono eyebrow .72rem ls .18em uppercase. Dropped: void bg, floating orbs, the 4-stop neon gradient.

## Verdict for Aevum
Warm paper + near-black ink + one cobalt accent + grotesque-sans/serif/mono + Cognition-style
blueprint = the credible-but-futuristic sweet spot that avoids the vaporware-neon trap. The
numbered/ticked structure turns the honesty rule into a design feature. See [[identity-and-positioning]].
