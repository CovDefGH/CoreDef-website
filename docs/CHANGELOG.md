# Changelog

All notable changes to the Core Defenses website project will be documented in this file.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Initial documentation set: PRD, SRS, Technical Design, User Stories, UX Notes, Test Plan, Roadmap.
- Design system definition (`DESIGN.md`) — "High-Performance Engineering," light theme, Space Grotesk
  typography, Electric Blue / Sentinel Cyan / Deep Slate palette.
- High-fidelity prototypes:
  - Home / Mission page
  - EDIM product detail page
  - ENADOX product detail page
  - Global / Locations page
  - Secure Communications / Contact page
  - Careers page

### Known Issues / Deviations from Original Brief

- Prototype theme is light; original brief specified a dark navy/charcoal theme. See
  `docs/UX-NOTES.md` §1 (Design System Decision Record) — unresolved, pending stakeholder decision.
- Nav label inconsistency: prototype uses "Defense Tech," brief implies "About." Unresolved — see
  `docs/UX-NOTES.md` §4.
- Footer link groupings differ slightly between product pages (EDIM/ENADOX) and other pages
  (Global/Careers). Needs standardization — see `docs/UX-NOTES.md` §6.8/§9.
- Icon system inconsistency: prototypes use Google Material Symbols; brief specifies Lucide Icons.
  Unresolved — see `docs/TECHNICAL-DESIGN.md` §10.
- All "live" data panels (System Topology, Live Integrity Stream, Compliance Stream) are currently
  static/illustrative, not connected to real backend data. Must be explicitly confirmed as illustrative
  in production copy, or scoped as a real integration in a later phase.
- Placeholder imagery is served from an external Google-hosted CDN URL in the prototypes; must be
  replaced with owned, optimized assets before launch.

### Not Yet Started

- Industries page (no prototype yet; spec exists in `docs/UX-NOTES.md` §6.7).
- About page (no prototype or copy yet).
- Products/Solutions overview page (no prototype yet).
- Real contact form backend integration (CRM/email provider not yet selected).
- Real mapping integration for Locations page.

---

## Versioning Note

This project has not yet been tagged with a release version. The first tagged release should occur at
the end of Phase 5 in `docs/ROADMAP.md`, once the Release Sign-off Checklist in `docs/TEST-PLAN.md`
§10 passes in full. Until then, all work is tracked under `[Unreleased]`.
