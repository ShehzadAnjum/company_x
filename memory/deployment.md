---
name: deployment
description: Production hosting — domain veloce-ai.com on Cloudflare Pages, brand locked to "Veloce AI", reports/ kept private.
metadata:
  type: reference
---

**Brand is locked: "Veloce AI"** (was the AEVUM placeholder). Domain **veloce-ai.com**, registered
on Cloudflare. Email **hello@veloce-ai.com**. The site ([[showcase-site]]) was rebranded across
`site/` on 2026-06-27 (AEVUM→Veloce AI; logo renders `Veloce` + the `AI` badge).

**Live homepage = the v3 deep-black theme.** `site/index.html` now serves the v3 variant
(`assets/styles-v3.css`); the warm-paper alternate stays at `site/index-v2.html` (noindex).
See [[design-inspiration]] for the two variants.

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
