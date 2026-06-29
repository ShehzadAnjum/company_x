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

**Hosting: Cloudflare Pages — project `veloce-ai`** (account `0d312dcb…`), **deployed via
`wrangler` direct upload** of the `site/` dir (NOT Git-connected):
`npx wrangler@4 pages deploy site --project-name veloce-ai --branch main`.
- Live at **https://veloce-ai.pages.dev**. Custom domain **veloce-ai.com** attached to the project;
  DNS = **apex CNAME `veloce-ai.com` → `veloce-ai.pages.dev` (proxied)**, zone `8275b4c1…` (active).
- Creds in `.env` (gitignored): `CLOUDFLARE_API_TOKEN` is **account-scoped** — works on the Pages/
  account API but **fails `/user/tokens/verify` by design** (no User scope), so don't treat that 401
  as "invalid". `CLOUDFLARE_ACCOUNT_ID` + R2 S3 keys also in `.env`.
- Re-deploy after changes: same `wrangler pages deploy site …` command (env loaded from `.env`).
- Pages auto-redirects `*.html` → clean URLs (308); links still work.

**Email Routing (Cloudflare, enabled 2026-06-28):** `veloce-ai.com` now has CF Email Routing on
(MX → `route1/2/3.mx.cloudflare.net`, SPF TXT auto-added). Verified destinations: **sanjum77@gmail.com**
(account email, auto-verified) + **0hamza.shehzad0@gmail.com** (Hamza, verified 2026-06-28). Rules:
explicit **sales@** and **info@** plus a **catch-all** (`*@veloce-ai.com`) — **all route to the Email Worker
`veloce-email-fanout`**, which `message.forward()`s (per-inbox try/catch) to sanjum77@gmail.com + 0hamza.shehzad0@gmail.com +
veloce.sh@gmail.com (the 3rd verified 2026-06-28; until a dest verifies its forward fails silently, others unaffected).
Worker source: `workers/email-fanout/` (deploy: `cd workers/email-fanout && npx wrangler@4 deploy`); edit the
`TEAM` array to change recipients (new addresses must be verified destinations first).
⚠️ **Why the Worker:** Cloudflare ER maps each rule to ONE destination — a 2-address `forward.value` array is
accepted by the API but the mail edge **rejects it** (`550 5.1.1 Address does not exist`); this bit us 2026-06-28
(worked single-dest, broke when Hamza was added as a 2nd value). Fan-out MUST go through a Worker. Edit rules
via API (`/zones/<id>/email/routing/rules` + `…/rules/catch_all`); a forward dest must be verified first (err 2054). Managed with
the account `CLOUDFLARE_API_TOKEN` in `.env`.

**`reports/` is intentionally NOT published** — output dir is `site`, so the 25 internal strategy
dossiers + `MASTER_REPORT.md` stay private. Consequence: `lab.html`'s per-product "open dossier"
links (`../reports/projects/*.md`) **404 in production** — open follow-up (neutralize those links,
or render the dossiers into `site/`). Product pages + the Lab grid itself work fine.

**Follow-up:** `products/*.html` + `lab.html` still use the original neon kit (`styles.css`), so
clicking into an inner page jumps from deep-black to the old theme. Port them to the v3 palette to
make the whole site coherent.
