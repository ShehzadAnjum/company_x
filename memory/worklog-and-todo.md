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

**Done (2026-06-28) — lead-gen launch:**
- Wrote the **GTM / lead-generation plan** (`MARKETING_PLAN.md` + [[lead-gen-strategy]]): hybrid motion,
  Pakistan beachhead (AI Complaints Officer wedge), Hamza as public face, owned-demo proof, <$500/mo budget.
- **Stage A shipped live to veloce-ai.com:** built `site/contact.html` (Web3Forms lead form + Calendly demo
  booking), wired **GA4** (`G-25RHDFV0C7`, confirmed in Realtime) into `app.js`, repointed all dead `mailto:`
  CTAs, neutralised the lab `reports/*.md` 404s → `contact.html`; cache-busted assets to `?v=43`.
- **Cloudflare Email Routing** on veloce-ai.com: `sales@ / info@ / *@veloce-ai.com` → **Email Worker**
  `veloce-email-fanout` → 3 verified inboxes (sanjum77, 0hamza.shehzad0, veloce.sh @gmail.com).
  Learned ER = one dest/rule (see [[deployment]] + `tasks/lessons.md` + `workers/email-fanout/`).
- Calendly account email → `info@veloce-ai.com` so booking alerts fan out to the whole team.

**Done (2026-06-28) — social presence kickoff:**
- Wrote **Facebook + LinkedIn launch kits** (`marketing/facebook-launch-kit.md`, `marketing/linkedin-kit.md`):
  page setup, About/Story, services, punchlines, launch posts, link-in-bio. No fake social proof (honesty rule).
- Generated **owned brand banners** from the locked wordmark — all **symbol-free** so they don't duplicate the V
  avatar: `facebook-cover.png`(+@2x), `linkedin-banner.png`, `linkedin-company-cover.png`; rebuilt a **concentric
  full-bleed avatar** `veloce-avatar.png` (fixes the misaligned-circles profile photo). See [[social-presence]].
- Stood up the **LinkedIn personal profile** `/in/veloce-ai` (name "Veloce AI", tagline headline, Karachi, banner
  uploaded, Experience *Founder · Veloce AI*). Committed kits+banners `b8618a7`.
- Drove the user's **logged-in** LinkedIn from WSL via Chrome DevTools Protocol to screenshot the real page
  (pyautogui/WSLg can't see the Windows desktop) — see `tasks/lessons.md`.

**Open TODO / next:**
- [ ] **Social:** upload FB cover + new avatar; paste LinkedIn **About** (`linkedin-kit.md` §D); create the
      **LinkedIn Company Page** once the new-account gate clears (verify a @veloce-ai.com email + a few connections). [[social-presence]]
- [ ] **Stage B — build the owned "DemoEats" demo** (proof asset on synthetic data; never the real deployment). [[lead-gen-strategy]]
- [ ] Calendly: fix event **availability** (showing all-day instead of 9am–7pm Mon–Sat PKT) — user-side dashboard fix in progress.
- [x] **Brand name locked → Veloce-AI** (2026-06-27); site rebranded + deployed.
- [ ] Align homepage **type to the brand sheet** (Sora/Orbitron/Exo 2) and decide whether to keep
      trial **Unigeo64** (license it) or swap a free lookalike. [[brand-identity]]
- [ ] Port `products/*` + `lab.html` off the old neon kit onto the Veloce look. [[showcase-site]]
- [x] Lab dossier `.md` links **404** — **done 2026-06-28**: 20 links repointed to `contact.html`. [[deployment]]
- [ ] **Rotate the Cloudflare/R2 creds** in `.env` (shared in plaintext chat).
- [x] **Decided 2026-06-27:** `main` left **open / direct pushes**. Branch protection (and
      rulesets) require **GitHub Pro** for a private repo — the free plan returns 403. Revisit
      if upgrading to Pro or splitting a public site-only repo. [[repo-and-access]]
- [ ] Optional: split a **public** repo containing only `site/` for hosting (GitHub Pages /
      Vercel), keeping `reports/` private. (Lab dossier links would 404 without `reports/`.)
- [ ] Optional: promote a field-ready product (e.g. My Personal Examiner, HR Agent) to a full
      flagship-style product page.
- [x] Replace `mailto:` CTAs with a real **contact form** — **done 2026-06-28** (`site/contact.html`).
- [ ] Before any **public** launch: rotate the committed secrets flagged in the analyzed source
      repos (MASTER_REPORT §6) — they live in those projects, not in this repo.
