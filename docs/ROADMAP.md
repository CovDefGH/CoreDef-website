# Development Roadmap

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## Phase 0 — Foundations (complete except legal/compliance sign-off)

- [x] Design system tokens defined (`DESIGN.md`).
- [x] High-fidelity HTML prototypes for: Home/Mission, EDIM, ENADOX, Global/Locations, Contact/Secure
      Communications, Careers.
- [x] Product bootstrap prompt and initial documentation set (this `docs/` folder).
- [x] Resolve Open Decisions from `TECHNICAL-DESIGN.md` §10 (icon system, theme direction, Secure Login
      scope, live-data scope) — see CHANGELOG "Decided" entry (2026-07-12). CRM/email provider still open.
- [ ] Legal/compliance review of EDIM and ENADOX public messaging.
- [ ] Confirm real certification status (ISO 27001, SOC2, NIST CSF, FedRAMP) before it appears live —
      currently shown as target posture, flagged in CHANGELOG Phase 2c.

**Exit criteria:** all Open Decisions resolved and documented; stakeholders sign off on light-vs-dark
theme direction. — **Met** (light theme confirmed).

## Phase 1 — Engineering Setup (complete)

- [x] Scaffold Next.js 15 App Router project per `TECHNICAL-DESIGN.md` folder structure.
- [x] Design tokens in `src/styles/tokens.css` (Tailwind v4 `@theme` — supersedes the planned
      `tailwind.config.ts`).
- [x] Stand up shared layout (NavBar, Footer) as real components.
- [x] Configure ESLint, Prettier, TypeScript strict mode, CI pipeline (GitHub Actions).
- [x] Set up Vercel project; deployed to production.

**Exit criteria:** an empty-but-structured app deploys to a preview URL with working nav/footer shell. — **Met.**

## Phase 2 — Core Pages (complete)

- [x] Build Home/Mission from prototype (video hero, capability sections).
- [x] Build Solutions overview page.
- [x] Port EDIM page into real components + content model (`content/products/edim.ts`).
- [x] Port ENADOX page into real components + content model (`content/products/enadox.ts`).
- [x] Standardize the footer component.

**Exit criteria:** Home, Solutions, EDIM, and ENADOX pass functional tests in `TEST-PLAN.md` §4. — Built
and manually verified in-browser; formal `TEST-PLAN.md` §4 pass not yet run.

## Phase 3 — Company & Trust Pages (content complete; contact backend outstanding)

- [x] Build Industries page (`content/industries.ts`, 8 sectors).
- [x] Build About page.
- [x] Port Global/Locations page into real components + data-driven office hub model
      (`content/locations.ts`).
- [x] Port Careers page into real components + data-driven job listing model (`content/careers.ts`,
      inline `JobBoard` with department filter).
- [ ] Contact page: real form validation + backend submission handler. Currently email/map only —
      no "Transmission Details" form yet (FR-CONTACT-1/2/5). **Deferred — not currently prioritized.**

**Exit criteria:** all site sections navigable end-to-end; contact form successfully routes a test
submission per category. — Navigation: met. Contact-form backend: **not started, deferred.**

## Phase 4 — Compliance, Performance, Accessibility Hardening

- [ ] Full WCAG 2.1 AA audit and remediation (`TEST-PLAN.md` §6).
- [ ] Lighthouse CI integrated into pipeline; tune until all pages ≥ 95 across categories.
- [ ] Replace all placeholder/CDN-hosted imagery with owned, optimized assets.
- [ ] Add structured data (Schema.org Organization, WebSite, Product where applicable).
- [ ] Configure security headers (CSP, X-Frame-Options, Referrer-Policy) at the edge.

**Exit criteria:** Release Sign-off Checklist in `TEST-PLAN.md` §10 passes in full.

## Phase 5 — Launch

- [ ] Final legal/content accuracy sign-off (`TEST-PLAN.md` §5).
- [ ] DNS/domain cutover.
- [ ] Post-launch monitoring (uptime, Core Web Vitals via real-user monitoring).
- [ ] Confirm analytics is privacy-respecting and correctly firing on key pages.

## Phase 6 — Post-Launch / Future Expansion (not yet scoped in detail)

- [ ] Evaluate real telemetry integration for "live stream" panels (currently illustrative) if product
      teams want a genuinely live status feed.
- [ ] Evaluate real interactive mapping provider for Locations page (currently illustrative/static).
- [ ] Evaluate authenticated "Secure Login" portal if a real customer-facing product surface is
      commissioned — this is a substantial scope increase and should be its own PRD, not an add-on to
      the marketing site.
- [ ] Localization, if international markets require it.
- [ ] Case studies / news-and-insights section, if content strategy calls for ongoing publishing.

---

## Sequencing Notes

- Phase 2 (EDIM/ENADOX) can proceed in parallel with Phase 3 (Industries/About/Careers/Global) once
  Phase 1's shared layout and token pipeline are in place — they don't share page-specific logic beyond
  the common component inventory in `UX-NOTES.md` §7.
- The Contact form's backend integration (Phase 3) is the one hard dependency for a real launch — every
  other page can go live as content-only, but Contact must have a working, tested submission path
  before Phase 5.
