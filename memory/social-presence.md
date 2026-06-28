---
name: social-presence
description: Veloce-AI social channels (LinkedIn + Facebook) — state, owned assets, kits, and the banner/avatar design rules.
metadata:
  type: reference
---

Durable facts for the Veloce-AI social presence. GTM context: [[lead-gen-strategy]]. Brand: [[brand-identity]].

**Kits (paste-ready copy):** `marketing/facebook-launch-kit.md` · `marketing/linkedin-kit.md` — page setup,
About/Story, services, launch posts, link-in-bio. No fake social proof (honesty rule).

**Owned image assets** (all in `site/assets/`, generated from the locked wordmark + symbol):
- `facebook-cover.png` (820×312) + `@2x` — FB cover, **symbol-free**.
- `linkedin-banner.png` (1584×396) — LinkedIn personal-profile banner, **symbol-free**, bottom-left kept clear for avatar.
- `linkedin-company-cover.png` (1128×191) — LinkedIn Company-Page cover, **symbol-free**.
- `veloce-avatar.png` (1000×1000) + `veloce-avatar-circle.png` — profile photo: concentric neon ring + centred V, full-bleed for circular crop.

**Design rules (load-bearing for circular platforms):**
- **Banners use the wordmark only — no V symbol.** The avatar already shows the V badge; repeating it stacks a
  second V over the avatar (the original bug). Source wordmark `veloce-wordmark.png` has a stray symbol sliver at
  x:0–17,y:0–62 — clear it before use.
- **Avatar must be concentric + full-bleed.** The 176px brand favicon/app-icon had a dark margin + off-centre ring,
  so platform circle-crop showed two misaligned circles. Rebuilt avatar fixes it; upload with crop zoom at default.

**LinkedIn — current state (2026-06-28):**
- **Personal profile** `linkedin.com/in/veloce-ai` exists: name "Veloce AI", headline "Autonomous Intelligence.
  Always On.", location Karachi, symbol-free banner uploaded, Experience = *Founder · Veloce AI* (free-text/unlinked).
  ~1 connection. **About section still empty** — paste from `linkedin-kit.md` §D.
- **Company Page** (`/company/veloce-ai`) **not yet creatable** — blocked by LinkedIn's new-account gate
  ("Feature not available… wait a day"). Path is correct (For Business ▸ Create a Company Page); unblock by aging the
  account + profile strength ≥ Intermediate + a few connections + a verified **@veloce-ai.com** email (Gmail rejected).
  Per [[lead-gen-strategy]] the Company Page (Hamza-fronted) is the intended brand home, not the personal profile.

**Facebook:** not yet created. Kit + symbol-free cover + avatar ready to upload.
