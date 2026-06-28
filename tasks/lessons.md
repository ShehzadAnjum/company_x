# Lessons — company_x

Patterns learned from corrections during work. Newest first. (Per workspace rule: update after any user correction.)

## 2026-06-28

### To "see" a user's logged-in web page from WSL, drive Chrome via DevTools Protocol — not pyautogui
**Pattern:** Asked to view the user's LinkedIn, pyautogui/screen-capture is useless on WSL — `DISPLAY=:0` is WSLg's
*Linux* display, which can't see the Windows desktop where the real browser runs. WebFetch also fails (LinkedIn
returns HTTP 999 anti-bot to non-logged-in requests).
**How to apply:** Launch `google-chrome --remote-debugging-port=9222 --user-data-dir=<dir>` (headed → shows on the
Windows desktop via WSLg); user logs in manually; capture the tab over CDP (`Page.captureScreenshot`). Newer Chrome
rejects the WebSocket on an origin check → connect with `websocket.create_connection(url, suppress_origin=True)`.
Reusable script: `scratchpad/cdp_shot.py`.

### Brand circular-platform rule: avatar carries the symbol, banners use the wordmark only
**Pattern:** Two self-inflicted brand bugs. (1) The profile banner reused the full lockup (with the V symbol); on
LinkedIn the V symbol stacked directly over the V avatar → a "double-V." (2) The avatar used the 176px brand
favicon, whose neon ring had a dark margin + was off-centre, so the platform's circular crop showed two
non-concentric circles.
**How to apply:** For any circular-avatar platform, make the **banner symbol-free** (wordmark + tagline only) and the
**avatar concentric + full-bleed** (design reaches the circle edge, centred). Upload avatars with the crop zoom at
default. See [[social-presence]].

### LinkedIn Company Pages are gated for new accounts
**Pattern:** Creating a Company Page (For Business ▸ Create a Company Page) failed with "Feature not available… wait
at least one day." Not user error — LinkedIn blocks Page creation from brand-new/under-built profiles.
**How to apply:** Before retrying, satisfy *all* gates: account age (up to ~7 days), profile strength ≥ Intermediate,
several connections, and a **verified corporate email** (a `@veloce-ai.com` address — Gmail/Outlook are rejected for
workplace verification). Don't link an Experience role to a look-alike Page in the dropdown; enter the company as
free text until the real Page exists.

### Cloudflare Email Routing forwards to ONE destination per rule
**Pattern:** Two addresses in a rule's `forward.value` array is accepted by the API (success, `synced:true`)
but the mail **edge rejects every inbound** with `550 5.1.1 Address does not exist`. Working single-destination
mail broke the instant a 2nd address was added.
**Why:** ER maps one pattern → one destination by design; multi-address fan-out isn't supported in a plain rule.
**How to apply:** To deliver to multiple inboxes, route the rule to an **Email Worker** that calls
`message.forward()` once per address (wrap each in try/catch so one unverified/failing inbox can't block the
rest). Each destination must be a verified ER destination first. See `workers/email-fanout/` + [[deployment]].

### Read the actual error before forming a theory
**Pattern:** I blamed the email bounce on DNS negative-caching and told the user to "wait." The DSN's
`Remote-MTA: route2.mx.cloudflare.net` proved the mail reached Cloudflare — disproving the theory. The user's
offhand "it worked then broke" was the real clue (a config change, not DNS).
**How to apply:** Parse the full error / DSN / log first and let the evidence pick the hypothesis. Treat
"it used to work" as a strong signal that something *we* changed is the cause — check recent changes first.

### Cache-bust versioned assets whenever their content changes
**Pattern:** Edited `app.js` but left its `?v=42` query unchanged → returning browsers (incl. the user's) ran
the stale cached file, so GA looked "not active."
**How to apply:** Bump the `?v=` (or content hash) on any versioned asset you change, then redeploy.

### GA4 "Data collection isn't active" ≠ broken
**Pattern:** That banner only means GA hasn't processed a first hit; it lags for hours. **Realtime** is the
source of truth. Ad blockers / Brave block GA entirely — verify in clean incognito with extensions off.

### The employer-IP constraint shapes the entire go-to-market
**Pattern:** The flagship (ComplaintHub, deployed at the user's current employer) was built on own time/off-job
and gifted — so it's ownable — but it can **never be named** in marketing, and the employer must not learn of
the venture.
**How to apply:** Sell a clean-room rebuild (no client data/branding); proof = an **owned "DemoEats" demo**, not
the real deployment; **Hamza is the public face**, Shehzad stays behind the scenes; use off-network channels.
See [[lead-gen-strategy]].
