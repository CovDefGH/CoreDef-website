# Test Plan

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## 1. Objectives

Validate that the site meets the functional requirements in `SRS.md`, the acceptance criteria in
`USER-STORIES.md`, and the performance/accessibility bar defined in `PRD.md` §8 before each release.

## 2. Scope

Covers: functional testing of all pages/components, cross-browser/device testing, accessibility audit,
performance audit, SEO validation, and form-submission integration testing. Excludes: load/stress
testing (not applicable — static/marketing site with low-volume form traffic) and penetration testing
(recommended as a separate, security-team-owned exercise given the brand's security positioning, but
out of scope for this plan).

## 3. Test Types & Ownership

| Type                                                  | Owner                | Cadence                                  |
| ----------------------------------------------------- | -------------------- | ---------------------------------------- |
| Unit tests (utils, Zod schemas)                       | Engineering          | Per PR (CI-gated)                        |
| Component tests                                       | Engineering          | Per PR (CI-gated)                        |
| Visual regression                                     | Engineering / Design | Per PR against staging deploy            |
| Accessibility audit (automated)                       | Engineering          | Per PR (CI-gated, axe-core)              |
| Accessibility audit (manual)                          | Design/QA            | Per release                              |
| Cross-browser/device                                  | QA                   | Per release                              |
| Performance (Lighthouse CI)                           | Engineering          | Per PR (CI-gated)                        |
| Content/copy accuracy (nuclear & secure-comms claims) | Legal/Product        | Per release, mandatory before any launch |
| Form integration (end-to-end submission → routing)    | QA                   | Per release                              |

## 4. Functional Test Matrix (by page)

### Home

- [ ] Hero renders above fold at 1440px, 1920px without scroll.
- [ ] Both hero CTAs navigate to correct destinations.
- [ ] Capability card links resolve (no 404s).
- [ ] Trust-signal row renders 3 items, stacks correctly < `md`.
- [ ] Nav "active state" correctly highlights Home only when on `/`.

### EDIM / ENADOX

- [ ] Eyebrow chip, H1, and description render with correct copy (no lorem ipsum in production build).
- [ ] Stat cards / metrics render correct label + value + description triples.
- [ ] Specification/metrics table renders all rows; zebra striping alternates correctly.
- [ ] Bento grid collapses to single column < `md` without losing any card.
- [ ] Illustrative visuals have `alt` text or `aria-label` describing content (not decorative-only).
- [ ] All CTAs on the page route to a real, working destination (no dead "Initialize Sequence" button
      in production unless intentionally scoped as a demo-request flow).

### Contact

- [ ] All required fields show validation errors when submitted empty.
- [ ] Email field rejects malformed addresses.
- [ ] Category selection persists through submission and routes to the correct recipient/tag
      (test each of General/Business/Government/Partnerships/Careers).
- [ ] Successful submission shows a clear confirmation state; failure shows a clear, non-technical
      error state.
- [ ] PGP key "Download Key" produces a valid, non-corrupted key file.
- [ ] Server-side re-validation rejects payloads that bypass client validation (e.g., direct API call
      with invalid email).

### Careers

- [ ] Job listings render from the content data model; adding a test entry appears without code change.
- [ ] Filter control correctly narrows results by its stated dimension(s).
- [ ] Each "Apply Now" action links to a working application destination.
- [ ] Page remains meaningful with zero open listings (empty state exists, not a blank section).

### Global / Locations

- [ ] All office hub cards render required fields (city, region tag, description, specialty tags,
      status).
- [ ] Status indicator color/state matches underlying data (Active vs. Planned).
- [ ] Map (illustrative or live) renders all node pins matching the hub card list — no orphaned pins
      or missing cards.
- [ ] Compliance chips reflect actual, current certification status (legal sign-off required — see
      §5).

### Industries

- [ ] All eight listed industries render with description and correct product cross-link.

### Global (all pages)

- [ ] Footer renders consistently (post §UX-NOTES §9 standardization) with no dead links.
- [ ] Every page has a unique, accurate `<title>` and meta description.
- [ ] No page ships another product's JS bundle (verify via bundle analyzer per route).

## 5. Content Accuracy Gate (mandatory, non-engineering)

Before any production release, Legal/Product must confirm:

- [ ] EDIM copy contains no reactor-safety-specific or classified-adjacent claims.
- [ ] ENADOX copy discloses no sensitive implementation/architecture detail.
- [ ] All compliance certifications listed (ISO 27001, SOC2 Type II, NIST CSF, FedRAMP High) reflect
      actual current status, not aspirational status.
- [ ] Office locations listed are real, current operating locations.

## 6. Accessibility Test Checklist (WCAG 2.1 AA)

- [ ] Automated axe-core scan returns zero critical/serious violations per page.
- [ ] Full keyboard traversal (Tab/Shift+Tab/Enter/Space) reaches every interactive element in a
      logical order.
- [ ] Visible focus indicator present on every focusable element (border-color shift per design
      system, not browser default only).
- [ ] Screen reader (NVDA + VoiceOver spot-check) announces nav landmarks, headings in order, form
      labels, and error messages correctly.
- [ ] Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text/UI components, verified against
      actual rendered colors (not just token values).
- [ ] All illustrative charts/diagrams have a text alternative conveying their communicated meaning.
- [ ] Motion/animation respects `prefers-reduced-motion`.

## 7. Performance Test Checklist

- [ ] Lighthouse CI run on Home, EDIM, ENADOX (mobile + desktop) scores ≥ 95 across Performance,
      Accessibility, Best Practices, SEO.
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms on simulated mid-tier mobile.
- [ ] JS bundle per route < 150KB gzipped (per `TECHNICAL-DESIGN.md` §9 budget).
- [ ] All images served via `next/image` with correct responsive `sizes`.

## 8. Cross-Browser / Device Matrix

| Browser/Device                              | Priority            |
| ------------------------------------------- | ------------------- |
| Chrome (desktop, latest)                    | P0                  |
| Safari (macOS, latest)                      | P0                  |
| Safari (iOS, latest)                        | P0                  |
| Chrome (Android, latest)                    | P0                  |
| Firefox (desktop, latest)                   | P1                  |
| Edge (desktop, latest)                      | P1                  |
| Viewport widths: 375, 768, 1024, 1440, 1920 | P0 across all above |

## 9. Regression Strategy

- Visual regression snapshots captured per PR against the previous staging deploy for all page
  templates listed in §4.
- Any intentional visual change requires an explicit snapshot-update approval in PR review, not a
  silent accept.

## 10. Release Sign-off Checklist

- [ ] All P0 functional tests pass.
- [ ] Content Accuracy Gate (§5) signed off by Legal/Product.
- [ ] Accessibility checklist (§6) passes with zero critical issues.
- [ ] Performance checklist (§7) meets budget.
- [ ] No open P0/P1 bugs in the release tracker.
