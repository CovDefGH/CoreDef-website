# Product Requirements Document (PRD)

**Project:** Core Defenses Corporate Website
**Status:** Draft v1.0
**Owner:** Product / Design / Engineering (cross-functional)

---

## 1. Purpose

Core Defenses needs a website that functions as its primary credibility instrument with three buyer
types — enterprise security leaders, government/defense procurement officers, and critical
infrastructure operators (energy, nuclear, utilities). The site is the first artifact a prospective
customer, partner, regulator, or recruit will evaluate before any human conversation happens. It must
establish, in under 10 seconds of scanning, that Core Defenses is an engineering-first organization
capable of operating in environments where failure has physical, not just financial, consequences.

This is explicitly **not** a marketing landing page. It is a multi-section corporate site with product
depth, careers infrastructure, a locations/global-operations presence, and enterprise-grade contact
routing.

## 2. Background & Context

Core Defenses operates across two flagship platforms:

- **EDIM** — a nuclear data analytics platform. Public-facing messaging emphasizes uncertainty
  reduction, thermal margin optimization, reactor engineering simulation, and operational efficiency —
  not reactor internals or safety-critical implementation detail.
- **ENADOX** — a secure communications platform for denied, degraded, intermittent, and
  limited-bandwidth (DDIL) environments, covering military and industrial communication, resilient
  networking, and software-defined radio use cases. Messaging emphasizes mission outcomes, not
  implementation.

The company's positioning must avoid reading as either a "nuclear company" or a "cyber company" in
isolation. The unifying narrative is: **advanced data analytics for critical infrastructure, backed by
secure communications for mission-critical operations.**

Reference inspiration for structure and professional tone: covertdefenses.com (structure/navigation
only — not visual design, which must be original).

## 3. Goals

| Goal                                                            | Success looks like                                                                                                            |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Establish enterprise/government-grade credibility on first view | Hero + mission statement communicate mission-critical stakes before any product pitch                                         |
| Communicate expertise before products                           | Homepage leads with capability narrative, not a feature list                                                                  |
| Give each product a dedicated, decision-maker-friendly page     | EDIM and ENADOX each have Overview → Capabilities → Use Cases/Applications → Benefits → Technology → Industries → Contact CTA |
| Support recruiting at the same bar as product marketing         | Careers section on par with Covert Defenses in structure: mission, benefits, open roles, culture                              |
| Make global presence and future expansion legible               | Locations page with interactive map, expansion-friendly data model                                                            |
| Route enterprise inquiries correctly                            | Contact page segments Business / Government / Partnerships / Careers / General                                                |
| Meet enterprise technical bar                                   | Lighthouse 95+, WCAG-compliant, mobile-first, sub-second perceived load                                                       |

## 4. Non-Goals

- This is not an e-commerce or self-serve signup product; there is no checkout flow.
- No customer portal, dashboard, or authenticated product experience — "Secure Login" in the nav is a
  placeholder affordance to signal enterprise seriousness, not a scoped deliverable in this phase.
- No real telemetry, live data streams, or production system integration — all "live" data
  visualizations (system topology, latency charts, compliance streams) are illustrative UI, not
  connected to real backend systems.
- No sensitive implementation detail for either product is to be disclosed anywhere on the public site.

## 5. Target Audience / Personas

1. **Enterprise Security Decision-Maker** — CISO or VP Security at a utility, manufacturer, or
   industrial operator evaluating OT/ICS protection vendors. Wants proof of engineering rigor and
   compliance posture fast.
2. **Government / Defense Procurement Contact** — evaluating a contractor for critical infrastructure
   or secure-communications work. Needs to see compliance certifications, government-appropriate
   language, and a credible careers/locations footprint (signals of a real, stable organization).
3. **Nuclear / Energy Sector Engineer or Program Manager** — technically literate but not a nuclear
   physicist by default; needs EDIM's value explained in terms of uncertainty and margin, not jargon.
4. **Prospective Employee (Engineer)** — evaluating whether the engineering culture matches their
   bar. Cares about the Careers section's specificity and tone.
5. **Partner / Channel Contact** — evaluating a co-sell or integration relationship; needs a
   Partnerships inquiry path.

## 6. Scope

### 6.1 In-scope pages

Home (Mission) · Products overview · EDIM product page · ENADOX product page · Industries · About ·
Careers · Locations (Global) · Contact.

### 6.2 Out of scope (this phase)

Blog/news, customer case study pages, investor relations, authenticated customer portal, localization
beyond English.

## 7. Requirements Summary

Detailed functional requirements live in `SRS.md`. At the PRD level, the site must:

- Communicate company mission and dual focus (analytics + secure comms) on the homepage above the fold.
- Present EDIM and ENADOX with equal visual weight but EDIM featured first per product priority.
- Provide industry-specific framing (Energy, Nuclear, Defense, Industrial, Government, Utilities,
  Critical Infrastructure, Manufacturing) without a dedicated deep page per industry in v1 (a shared
  Industries page with per-industry sections is sufficient).
- Support a Careers section with open positions, culture, benefits, and an application CTA.
- Support a Locations section with an interactive map and a data model that scales to new offices
  without a redesign.
- Support an enterprise-style Contact page with inquiry categorization and a PGP-key affordance for
  secure-communications-appropriate correspondence.

## 8. Success Metrics

- Qualitative: stakeholder review confirms the site reads as "government contractor / defense
  engineering," not "startup" or "AI-generated."
- Lighthouse Performance/Accessibility/Best Practices/SEO ≥ 95 on Home, EDIM, and ENADOX.
- Zero critical WCAG 2.1 AA violations (see `TEST-PLAN.md`).
- Time-to-first-meaningful-paint appropriate for a content-heavy corporate site (see performance
  budget in `TECHNICAL-DESIGN.md`).

## 9. Risks & Open Questions

| Risk                                                                                       | Mitigation                                                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Messaging drifts into nuclear-safety-specific claims that create regulatory/legal exposure | Product copy for EDIM stays at the level of "uncertainty reduction / margin / analytics," reviewed by legal before launch |
| ENADOX messaging inadvertently discloses sensitive capability detail                       | Copy stays at mission-outcome level; no architecture specifics beyond what's already public-safe                          |
| "Secure Login" button implies a live product that doesn't exist yet                        | Treated as a placeholder; either disable, link to a "request access" flow, or scope a real portal in a later phase        |
| Design system pivoted from dark to light theme mid-project                                 | Documented as a decision in `UX-NOTES.md`; confirm with stakeholders before final launch                                  |

## 10. Dependencies

- Brand assets (logo lockups, approved imagery) — not yet finalized, referenced as placeholders in
  current prototypes.
- Legal/compliance sign-off on nuclear and secure-comms messaging.
- Real compliance certification status (ISO 27001, SOC2, FedRAMP, NIST CSF) — footer and Locations page
  reference these; must be confirmed accurate before launch, not aspirational.
