# Software Requirements Specification (SRS)

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0

---

## 1. Introduction

### 1.1 Purpose

Defines the functional and non-functional requirements for the Core Defenses website, sufficient for
an engineering team to implement without further product clarification.

### 1.2 Scope

Marketing/corporate website only (see PRD §6 for in/out of scope). No authenticated application logic
is in scope beyond a placeholder "Secure Login" entry point.

### 1.3 Definitions

- **OT/ICS** — Operational Technology / Industrial Control Systems
- **DDIL** — Denied, Degraded, Intermittent, Limited-bandwidth (communications environments)
- **IA** — Information Architecture

## 2. Overall Description

### 2.1 Product Perspective

A statically-generated / server-rendered marketing site built on Next.js, deployed to Vercel, with no
required backend database for v1 (form submissions route to an email/CRM endpoint; no persisted user
data).

### 2.2 User Classes

See PRD §5 (Personas). All users are anonymous, unauthenticated visitors.

### 2.3 Operating Environment

Modern evergreen browsers (Chrome, Safari, Firefox, Edge — last 2 versions), desktop and mobile.
Must degrade gracefully without JavaScript for core content (progressive enhancement for animation only).

## 3. Functional Requirements

### 3.1 Global Navigation (FR-NAV)

- FR-NAV-1: Persistent top navigation bar with brand mark, primary links (Mission, Solutions, Defense
  Tech, Global, Careers), and a "Secure Login" action, fixed on scroll.
- FR-NAV-2: Active route is visually indicated (underline + color per design system).
- FR-NAV-3: Below `md` breakpoint, primary links collapse into a mobile menu triggered by a hamburger icon.
- FR-NAV-4: Navigation must be fully keyboard-navigable and screen-reader labeled.

### 3.2 Homepage / Mission (FR-HOME)

- FR-HOME-1: Hero section states system status, headline mission statement, supporting copy, and two
  CTAs (primary: "Explore Solutions"; secondary: "View Telemetry" or equivalent).
- FR-HOME-2: A live-style data/terminal panel is present for visual credibility; content is static/
  simulated, not a live backend feed, unless a real telemetry source is explicitly scoped later.
- FR-HOME-3: "Core Capabilities" section presents at minimum OT/ICS Safeguards and Nuclear Analytics
  as capability cards, each with a supporting visual and a "detail" link.
- FR-HOME-4: A three-item trust-signal row (e.g., Zero-Trust Architecture, Microsecond/Low Latency,
  Global Deployment) sits below capabilities.
- FR-HOME-5: Homepage links out to Industries, Careers, Locations, and both product pages.

### 3.3 Product Pages — EDIM (FR-EDIM)

- FR-EDIM-1: Page includes a category eyebrow label ("Endpoint/Nuclear Data Analytics Module" —
  confirm final naming with product team), H1, and supporting description under body-lg style.
- FR-EDIM-2: A primary visual/bento panel presents an illustrative system topology or architecture
  diagram.
- FR-EDIM-3: At least two quantified stat cards (e.g., latency, resource footprint) with label,
  value, and one-line explanation.
- FR-EDIM-4: A "Core Specifications" table presents deployment model, compatibility, data residency,
  and integration API options in a label/value row layout with zebra striping.
- FR-EDIM-5: Page ends with a contact/CTA path relevant to EDIM (route to Contact page pre-filtered
  to "Business" or "Government" category where feasible).
- FR-EDIM-6: All copy avoids reactor-specific safety claims; frames value in terms of uncertainty
  reduction, thermal margin, and operational efficiency (per PRD §2).

### 3.4 Product Pages — ENADOX (FR-ENADOX)

- FR-ENADOX-1: Page includes eyebrow label ("Enterprise Telemetry" or product-accurate equivalent),
  H1 ("ENADOX System"), and supporting description.
- FR-ENADOX-2: A primary "Live Integrity Stream" panel presents illustrative telemetry visualization
  (static/simulated data).
- FR-ENADOX-3: A system-status card communicates current operational state (e.g., "Optimal") with
  supporting one-line justification.
- FR-ENADOX-4: A "Core Metrics" panel presents encryption standard, throughput, and latency as
  label/value rows.
- FR-ENADOX-5: Two header-level actions are present ("View Logs" secondary, "Initialize Sequence" or
  equivalent primary) — both may route to Contact/demo-request flows rather than live functionality.
- FR-ENADOX-6: Copy avoids disclosing sensitive implementation architecture; frames capabilities at
  the level of mission outcome (resilience in denied environments, cross-domain communication, etc.).

### 3.5 Industries (FR-IND)

- FR-IND-1: A single Industries page presents Energy, Nuclear, Defense, Industrial, Government,
  Utilities, Critical Infrastructure, and Manufacturing as distinct sections or cards.
- FR-IND-2: Each industry entry includes a short description of the relevant risk/value proposition
  and links to the most relevant product (EDIM or ENADOX) where applicable.

### 3.6 Careers (FR-CAR)

- FR-CAR-1: Hero section states mission framing ("Engineer the Shield" or equivalent) with two CTAs
  (View Open Missions, Our Engineering Culture).
- FR-CAR-2: "Engineering Impact" section presents 3–4 culture/engineering-values cards, at least one
  with a supporting photograph and at least one with a quantified metric (e.g., latency target).
- FR-CAR-3: "Active Missions" (job listings) section lists open roles with title, location, employment
  type, and an "Apply Now" action per row; supports a filter control.
- FR-CAR-4: Job listing data must be structured so new roles can be added via a data file/CMS entry
  without a code change (see `TECHNICAL-DESIGN.md` §Content Model).

### 3.7 Locations / Global (FR-LOC)

- FR-LOC-1: Page presents a "Global Strategy & Operations Hubs" hero and an interactive/illustrative
  map showing office nodes.
- FR-LOC-2: Below the map, each office is presented as a card: city, region tag (HQ/EMEA/APAC/etc.),
  description, 1–2 specialty tags, and an active-status indicator.
- FR-LOC-3: A "Global Defense Compliance" panel lists certifications (ISO 27001, SOC2 Type II, NIST
  CSF, FedRAMP High) as chips, paired with a terminal-style compliance-check visual.
- FR-LOC-4: The location data model must support adding a new office/hub without page-level redesign
  (data-driven cards, not hand-authored markup per office).

### 3.8 Contact / Secure Communications (FR-CONTACT)

- FR-CONTACT-1: Page presents a "Transmission Details" form with fields: Operative ID/Name (display
  label may be renamed to something more standard for production, e.g. "Full Name"), Secure Return
  Address (email), Clearance Level/Category (select: General Inquiry, Business, Government,
  Partnerships, Careers), and a message/payload textarea.
- FR-CONTACT-2: Form submission is validated client-side (required fields, email format) using Zod +
  React Hook Form, and shows a clear success/error state after submission.
- FR-CONTACT-3: A PGP Public Key panel is presented for parties needing encrypted correspondence, with
  a "Download Key" action.
- FR-CONTACT-4: A "Command Nodes" summary presents 1–2 primary contact hub locations (may mirror a
  subset of the Locations page).
- FR-CONTACT-5: All category selections route to the correct internal distribution list on the
  backend (see `TECHNICAL-DESIGN.md` §Form Handling).

### 3.9 Footer (FR-FOOT)

- FR-FOOT-1: Present on every page. Contains brand mark, copyright line, and three link groups:
  Legal (Privacy Policy, Terms of Service), Compliance (ISO 27001, SOC2 Compliance), Operations
  (Threat Intel, Contact Support).
- FR-FOOT-2: All footer links must resolve to real pages or be removed before launch — no dead links
  in production.

## 4. Non-Functional Requirements

### 4.1 Performance

- NFR-PERF-1: Lighthouse Performance score ≥ 95 on Home, EDIM, ENADOX (mobile and desktop).
- NFR-PERF-2: Largest Contentful Paint < 2.5s on 4G mid-tier device simulation.
- NFR-PERF-3: All non-critical imagery lazy-loaded; hero imagery preloaded.
- NFR-PERF-4: Route-level code splitting; no product page ships another product's JS bundle.

### 4.2 Accessibility

- NFR-A11Y-1: WCAG 2.1 AA conformance across all pages.
- NFR-A11Y-2: Full keyboard operability, visible focus states matching design system's interactive
  depth pattern (border-color shift, not shadow).
- NFR-A11Y-3: Minimum 4.5:1 text contrast against surface colors (already encoded in `DESIGN.md`
  color tokens).
- NFR-A11Y-4: All data visualizations have a text-equivalent summary for screen readers (charts are
  illustrative, not the sole information source).

### 4.3 SEO

- NFR-SEO-1: Semantic HTML landmarks (`header`, `nav`, `main`, `footer`, heading hierarchy starting
  at one `h1` per page).
- NFR-SEO-2: Per-page metadata (title, description), OpenGraph and Twitter Card tags.
- NFR-SEO-3: Schema.org Organization + WebSite structured data on Home; Product structured data on
  EDIM/ENADOX where applicable.

### 4.4 Security

- NFR-SEC-1: All form input sanitized and validated server-side, not just client-side.
- NFR-SEC-2: No secrets or API keys exposed in client bundles.
- NFR-SEC-3: Standard security headers (CSP, X-Frame-Options, Referrer-Policy) configured at the
  hosting/edge layer.

### 4.5 Responsiveness

- NFR-RESP-1: Mobile-first implementation; verified at 375px, 768px, 1024px, 1440px, 1920px widths.
- NFR-RESP-2: Bento-grid layouts (EDIM, ENADOX) collapse to single-column stacks below `md`.

### 4.6 Browser/Device Support

- NFR-COMPAT-1: Last 2 major versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome
  current versions.

## 5. External Interface Requirements

- Contact form submission integrates with an email-delivery or CRM webhook (provider TBD — see
  `TECHNICAL-DESIGN.md` §Integrations).
- Map component (Locations page) may use a static illustrative map in v1 or integrate a mapping
  provider (e.g., Mapbox) in a later phase — see `ROADMAP.md`.

## 6. Constraints

- No nuclear-safety-specific or classified-adjacent technical claims may appear in any public copy.
- No visual asset may resemble copyrighted third-party branding (including reference site
  covertdefenses.com) beyond structural inspiration.
