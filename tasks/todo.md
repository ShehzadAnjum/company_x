# Veloce AI — Lead-Generation Plan

_Owner: Shehzad (behind the scenes) · Public face: Hamza · Last updated: 2026-06-28_

## Locked decisions
- **Market:** Pakistan-first → expand (Gulf/global later).
- **Motion:** Hybrid — land a done-for-you AI-FTE deployment, grow into recurring product.
- **What we sell:** A generic, clean-room product **we own** (e.g. "AI Complaints Officer").
  Built on personal time, off-job, self-initiated. **Nando's is NEVER named.**
- **Proof asset:** an **owned "DemoEats" sandbox** (fictional brand, synthetic data) — not the
  Nando's instance. No Nando's data/config/branding ever ships in the sellable product.
- **Public face:** **Hamza** (independent of Nando's) fronts LinkedIn, outreach, demos.
  Shehzad operates behind the scenes; personal LinkedIn is off-limits.
- **Team / budget:** Shehzad + Hamza · <$500/mo · organic-heavy + light retargeting.

## Beachhead ICP
Multi-branch consumer businesses in Pakistan with high complaint/CX volume (F&B, retail,
telco, e-commerce). Buyer = Ops / CX / Brand manager.

## Pricing direction (anchor to a salary, not software)
One-time setup/deployment fee + monthly per-agent retainer ("the FTE's salary"). Numbers TBD.

## Stage A — Plug the leaks (Week 1–2)
- [x] Replace `mailto:` with a real **contact form** — built `site/contact.html` (Web3Forms, no backend); all CTAs repointed.
- [x] Add **"Book a 20-min demo"** (Calendly) CTA — on `contact.html`.
- [x] Install **analytics + LinkedIn/Meta pixel** scaffolding — in `site/assets/app.js`, dormant until IDs added.
- [x] **CONFIG:** Web3Forms key ✅ · Calendly `sanjum77/30min` ✅ · GA4 `G-25RHDFV0C7` ✅ (Meta/LinkedIn pixels deferred to Stage C ads).
- [x] Neutralize the **lab 404 links** — 20 dead `reports/*.md` links in `lab.html` repointed to `contact.html`; microcopy now "Enquire about this →".

### Config — ✅ all done & deployed live (2026-06-28)
Web3Forms key, Calendly (`sanjum77/30min`), and GA4 (`G-25RHDFV0C7`) all wired; site deployed to
**veloce-ai.com/contact** and verified (GA confirmed in Realtime). Meta/LinkedIn pixels deferred to Stage C ads.

### Email routing (Cloudflare) — ✅ done 2026-06-28
- `sales@ / info@ / *@veloce-ai.com` → **Email Worker** `veloce-email-fanout` → **3 verified inboxes**:
  sanjum77, 0hamza.shehzad0, veloce.sh @gmail.com. (ER allows only 1 dest/rule → Worker fans out; see `lessons.md`.)
- Calendly account email switched to `info@veloce-ai.com` so booking alerts reach the whole team.
- [ ] Calendly **availability** shows all-day instead of 9am–7pm Mon–Sat PKT — user fixing in the Calendly dashboard.

## Stage B — Build owned proof (Week 2–3)
- [ ] Build the **"DemoEats" demo** of the AI Complaints Officer on synthetic data (owned, shareable).
- [ ] Record **demo video(s)** of the agent actually running.
- [ ] **Readiness scorecard** lead magnet — "Which of your roles can an AI run 24/7?" (captures + qualifies).

## Stage C — Turn on demand (Week 3+)
- [~] **Hamza-fronted LinkedIn** + Veloce **company page** — build-in-public, 3×/week.
  - [x] LinkedIn **personal profile** `/in/veloce-ai` set up (name, headline, symbol-free banner, Founder role).
  - [x] **Kits + brand assets** built (FB + LinkedIn): `marketing/*-kit.md`, banners, concentric avatar. [[social-presence]]
  - [ ] Paste LinkedIn **About** (`marketing/linkedin-kit.md` §D); upload FB cover + new avatar.
  - [ ] Create **Company Page** `/company/veloce-ai` once new-account gate clears (verify @veloce-ai.com email + connections).
  - [ ] Stand up the **Facebook page** from `marketing/facebook-launch-kit.md`.
- [ ] **Cold outbound** (email + LinkedIn) to 50–100 beachhead accounts — off Shehzad's network.
- [ ] **Referrals / warm** intros.
- [ ] **SEO product pages** (long game).
- [ ] **Light retargeting** (~$150–250/mo) on site visitors.

## Pre-public-launch flags
- [ ] Keep sellable codebase a **clean rebuild** — zero Nando's data/config/branding.
- [ ] (Optional insurance) one-line written record that Shehzad owns the software, Nando's licensed.
- [ ] Rotate committed secrets in source repos (MASTER_REPORT §6) before any public spotlight.
