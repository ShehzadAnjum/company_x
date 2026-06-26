# Company X — AI-Native Autonomous Workforce (Showcase Portal)

> **Working brand: "Aevum — The Restless Workforce."**
> *Proposal only — rename freely.* Alternates considered: **Perpetua**, **ZeroFTE**,
> **Cognautics**, **Restless AI**, **Sentient Labs**. "Aevum" (Latin *aevum*, "an age /
> the eternal") was chosen because it carries both halves of the pitch: **perpetual,
> 24/7 work** and a **long lineage across the AI evolution**. Until a name is locked,
> treat "Company X" / "Aevum" as placeholders.

This repository is the **public showcase website / portal** for the company and its
product portfolio. The site itself is **not built yet** — this repo currently holds the
company vision (this file) and the deep **portfolio reports** in `reports/` that the site
will be built from. See `reports/PORTFOLIO.md` for the catalog.

---

## 1. What the company is

A **highly professional, futuristic, AI-native** company that equips corporates and
industries with **autonomous FTEs** (Full-Time-Equivalents) and AI agents that work
**24/7, restlessly**, to:

- **Cut headcount cost** — one autonomous agent does the repetitive, always-on work of a
  human seat (or several), without salaries, shifts, sick days, or attrition.
- **Deliver machine-grade perfection** — consistent, auditable, tireless execution.
- **Scale instantly** — spin up another "employee" in minutes, not months.

The differentiator is not "we added a chatbot." It is **AI-native from the ground up**,
backed by a **long history of AI evolution and early adoption** — we have tracked and
adopted every meaningful wave of AI as it emerged, and we build products that are
designed around autonomous agents rather than retrofitted with them.

## 2. Positioning & core narrative

- **Tagline candidates:** *"Hire the machine."* · *"The workforce that never sleeps."* ·
  *"Autonomous FTEs for the always-on enterprise."*
- **Promise:** Replace or augment a role with a **Digital FTE** — an AI worker that owns a
  job end-to-end (intake → reason → act → report), 24/7, with human-in-the-loop
  guardrails where it matters.
- **Proof of heritage:** early-adopter track record across the AI evolution; a portfolio
  of real, shipped systems (see `reports/`) spanning enterprise ops, security, CX,
  fintech, vision, edtech, and trading.
- **Counter-positioning:** not a feature bolted onto SaaS; an **agent-first operating
  layer** that plugs into the channels businesses already use (Email, WhatsApp, voice,
  dashboards, ERPs).

## 3. The "Autonomous FTE" framing (use consistently)

Every product on the showcase should be expressed as **a role it replaces or augments**,
with the same shape:

> **The AI _[role]_** — works 24/7, **replaces ~N hours / one seat of** _[function]_,
> with **[guardrail / human-in-the-loop]** control.

Examples drawn from the portfolio (see per-project reports): AI Complaints Officer
(`cms`), AI Back-Office Employee (`hackaton-0-fte`), AI Recruiter (`hr-agent`), AI Cost
Controller (`opera-nova`), AI SOC/Phishing Analyst (`phishing-scanner`), AI Security
Guard (`vision-alert`), AI Finance Clerk (`hamdan-ent`), AI Community Manager
(`social-scrapper`), AI Voice Sales Rep (`travel-insurance-voice-agent`).

## 4. What this repo is (and will become)

- **Now:** vision (`CLAUDE.md`) + portfolio analysis (`reports/`).
- **Next (intended):** the showcase website/portal — a futuristic, tech, AI-native landing
  experience with a page per flagship product, each told in the Autonomous-FTE frame, with
  live demo hooks. Design language: glass/neon, "AI spectrum" (cyan→violet→magenta),
  command-bar hero — consistent with the reference kit in `/home/anjum/dev/cms/marketing/`.
- The **`reports/` folder is the source of truth** for the catalog. Keep it updated as
  products evolve; the website renders from it.

## 5. Working conventions (rules for this repo)

- **Smallest viable diff.** Don't refactor or restructure unrelated things.
- **Honesty rule (load-bearing).** **Never present roadmap AI as shipped.** Each product
  report explicitly separates *What's built today* from *Planned / AI gap*. The marketing
  must do the same — label aspirational metrics as **targets**, and only demo what is real.
  This mirrors the honest AI note in the `cms` marketing kit and is non-negotiable for a
  company whose entire pitch is credibility about AI.
- **Lead with the demo that works.** For each product, the showcase headline and live demo
  must map to verified functionality in its report, not its roadmap.
- **No secrets in the repo.** Use `.env` + docs; never hardcode tokens/keys.
- **Source of truth:** `reports/PORTFOLIO.md` (index + matrix), `reports/MASTER_REPORT.md`
  (narrative + strategy), `reports/projects/<slug>.md` (per-product deep dive).

## 6. Portfolio at a glance

The catalog spans ~20+ projects examined from `/home/anjum/dev`, tiered as **Flagship /
Secondary / Incubate / Park**, each scored on **AI-native** and **FTE-fit**. Read
`reports/PORTFOLIO.md` first; it links to every per-project report. The flagships (most
proven + most on-theme) anchor the showcase; incubate-tier products are honest works in
progress with a clear AI upgrade path.

## 7. Status & next steps

- [x] Company vision & positioning captured (this file).
- [x] Deep per-project portfolio reports generated (`reports/`).
- [ ] Lock company name & brand identity.
- [ ] Choose flagship lineup for the showcase site.
- [ ] Build the website framework + per-product pages (futuristic AI-native design).
- [ ] Wire live demo hooks for the flagships.
