---
name: worklog-and-todo
description: What's done on company_x, key decisions, and the open TODO list.
metadata:
  type: project
---

**Done (as of 2026-06-27):**
- Examined **25** dev projects from source; wrote `reports/` (PORTFOLIO.md, MASTER_REPORT.md,
  25 per-project dossiers). See [[portfolio-catalog]].
- Wrote the company vision and proposed the **Aevum** brand. See [[identity-and-positioning]].
- Built the showcase `site/` (landing + 5 flagship dossiers + lab page), then **redesigned** it
  onto the CMS enterprise "AI spectrum" design system; verified in-browser (Playwright, no
  errors). See [[showcase-site]].
- Created a **private** GitHub repo `ShehzadAnjum/company_x`; pushed twice (initial, then
  redesign `51ded84`). Added **Hamza** as a Write collaborator (invite pending). See [[repo-and-access]].
- Ran the **context-hygiene** skill: slimmed `CLAUDE.md` to signal-only and moved detail into
  this `memory/` store.
- **Locked the brand to Veloce-AI** and rebranded `site/` (AEVUM→Veloce-AI, `hello@veloce-ai.com`);
  integrated the official brand kit `resources/veloce_ai_brand_sheet/`. See [[brand-identity]].
- Merged Hamza's **PurpleDelight** PR #1, then rebuilt the homepage hero into a bespoke
  brand/interaction layer (steel robot + binary transmission waves + firework cursor + Infinity-
  Concept section + split-flap clock). See [[showcase-site]].
- **Deployed live to veloce-ai.com** via Cloudflare Pages (project `veloce-ai`, `wrangler` direct
  upload); creds in gitignored `.env`. See [[deployment]].

**Open TODO / next:**
- [x] **Brand name locked → Veloce-AI** (2026-06-27); site rebranded + deployed.
- [ ] Align homepage **type to the brand sheet** (Sora/Orbitron/Exo 2) and decide whether to keep
      trial **Unigeo64** (license it) or swap a free lookalike. [[brand-identity]]
- [ ] Port `products/*` + `lab.html` off the old neon kit onto the Veloce look. [[showcase-site]]
- [ ] Lab dossier `.md` links **404 in production** (reports/ kept private) — neutralise or render. [[deployment]]
- [ ] **Rotate the Cloudflare/R2 creds** in `.env` (shared in plaintext chat).
- [x] **Decided 2026-06-27:** `main` left **open / direct pushes**. Branch protection (and
      rulesets) require **GitHub Pro** for a private repo — the free plan returns 403. Revisit
      if upgrading to Pro or splitting a public site-only repo. [[repo-and-access]]
- [ ] Optional: split a **public** repo containing only `site/` for hosting (GitHub Pages /
      Vercel), keeping `reports/` private. (Lab dossier links would 404 without `reports/`.)
- [ ] Optional: promote a field-ready product (e.g. My Personal Examiner, HR Agent) to a full
      flagship-style product page.
- [ ] Replace the `mailto:hello@veloce-ai.com` CTAs with a real **contact form**.
- [ ] Before any **public** launch: rotate the committed secrets flagged in the analyzed source
      repos (MASTER_REPORT §6) — they live in those projects, not in this repo.
