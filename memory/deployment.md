---
name: deployment
description: Production hosting — domain veloce-ai.com on Cloudflare Pages, brand locked to "Veloce AI", reports/ kept private.
metadata:
  type: reference
---

**Brand is locked: "Veloce AI"** (was the AEVUM placeholder). Domain **veloce-ai.com**, registered
on Cloudflare. Email **hello@veloce-ai.com**. The site ([[showcase-site]]) was rebranded across
`site/` on 2026-06-27 (AEVUM→Veloce AI; logo renders `Veloce` + the `AI` badge).

**Live homepage = Hamza's "PurpleDelight" skin** (merged from PR #1, 2026-06-27): the original
layout recoloured deep-violet (Sora type, purple accent) + a custom cursor-ring/spotlight glow
(`body class="fx"`, `assets/purpledelight.css` over `styles.css`, cursorFX in `app.js`). Swap the
single `purpledelight.css` link in `index.html` to change skins (alts: `mystyle-ideal.css`,
`orangefishsea.css`; remove the line for the plain dark theme). The earlier deep-black and
warm-paper directions are kept as noindex alternates: `index-v3.html` (`styles-v3.css`) and
`index-v2.html` (`styles-v2.css`). See [[design-inspiration]].

**Hosting: Cloudflare Pages, Git-connected** to `ShehzadAnjum/company_x` (private repo → needs the
Cloudflare GitHub app installed with access). Production branch **main**; pushing to main triggers
a deploy. Build settings:
- Framework preset: **None** · Build command: **(empty)** · **Build output directory: `site`** · Root: `/`
- Custom domain **veloce-ai.com** added in the Pages project (DNS auto-managed since the zone is on CF).

**`reports/` is intentionally NOT published** — output dir is `site`, so the 25 internal strategy
dossiers + `MASTER_REPORT.md` stay private. Consequence: `lab.html`'s per-product "open dossier"
links (`../reports/projects/*.md`) **404 in production** — open follow-up (neutralize those links,
or render the dossiers into `site/`). Product pages + the Lab grid itself work fine.

**Follow-up:** `products/*.html` + `lab.html` still use the original neon kit (`styles.css`), so
clicking into an inner page jumps from deep-black to the old theme. Port them to the v3 palette to
make the whole site coherent.
