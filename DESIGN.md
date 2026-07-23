---
name: Core Defenses
description: Data analytics and secure communications for nuclear, energy, defense, and industrial operations.
colors:
  primary: "#0052ff"
  primary-dark: "#0040cc"
  accent: "#00d1ff"
  ink: "#0f172a"
  ink-muted: "#475569"
  surface: "#f8fafc"
  line: "#e2e8f0"
  bg: "#ffffff"
typography:
  display:
    fontFamily: "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 7vmin, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  2xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Core Defenses

## 1. Overview

**Creative North Star: "The Well-Lit Laboratory"**

Core Defenses reads like the interface of a precision instrument, not a startup's marketing site.
The original brief called for a dark, stealth-ops mood in the register of Palantir or Anduril; the
team deliberately rejected that in favor of a bright, high-contrast surface built for extended
technical reading. The audience is security analysts and infrastructure engineers evaluating whether
EDIM and ENADOX are credible for a nuclear plant, a defense program, or a utility grid — not consumers
being sold excitement. Every element earns its place functionally: a well-lit lab bench, not a movie
set.

The system explicitly rejects AI-marketing visual and verbal clichés: gradient text, glassmorphism,
hero-metric templates, tiny uppercase eyebrows above every section, drop-shadow "lift" cards, and
copy that sounds inspirational rather than factual. It also rejects the dark stealth-ops aesthetic
considered and abandoned in the original brief.

**Key Characteristics:**

- Sharp corners everywhere (0-radius) — rigidity and precision over friendliness
- Depth via 1px border-color shift, never a shadow
- Electric Blue + Sentinel Cyan on a white/cool-slate surface, not navy-and-black
- Copy is factual, short-sentence, engineer-written — no philosophy, no flowery adjectives
- Motion is restrained and functional: scroll reveals, hover micro-interactions, nothing choreographed

## 2. Colors

A light, high-contrast palette: white and cool-slate surfaces carry the reading experience, with
Electric Blue reserved for action and Sentinel Cyan for data/interactive accents.

### Primary

- **Electric Blue** (`#0052ff`): primary actions (buttons, active nav state, links) and critical
  status. Darkens to **Electric Blue Dark** (`#0040cc`) on hover — never a tint, always a deeper
  shade of the same hue.

### Secondary

- **Sentinel Cyan** (`#00d1ff`): data visualization, the hero's secondary headline, hover border
  states, and interactive highlights. Used sparingly — it marks "this is live/interactive/data," not
  decoration.

### Tertiary

- **Deep Slate** (`#0f172a`): high-contrast body text (`ink`) and structural elements (logo wordmark,
  headings).

### Neutral

- **Cool Slate** (`#f8fafc`): surface layering — alternating section backgrounds (`bg-surface`) that
  separate content bands without a border or shadow.
- **Slate Line** (`#e2e8f0`): the single border color used for every outline, card edge, and divider
  in the system.
- **White** (`#ffffff`): base page background and card fill.
- **Ink Muted** (`#475569`): secondary/body-muted text, held to ≥4.5:1 contrast on both white and
  surface backgrounds (NFR-A11Y-3).

### Named Rules

**The One Accent Rule.** Electric Blue is the only saturated color used for interactive commitment
(buttons, active states). Sentinel Cyan is a highlight, never a CTA fill. Nothing else in the palette
competes for attention.

## 3. Typography

**Display Font:** Helvetica Neue (with Helvetica, Arial, ui-sans-serif fallback)
**Body Font:** Inter (variable, `next/font`)

**Character:** A geometric-adjacent display face paired with a humanist body face — Helvetica reads
as neutral and technical for headings; Inter carries long-form body copy at high readability. Both
sit on the same `-0.02em` heading letter-spacing for a tightened, engineered feel without crowding.

### Hierarchy

- **Display** (700, `clamp(1.5rem, 7vmin, 3rem)`, 1.05 line-height): hero H1 only. Sized off `vmin`
  (the smaller of viewport width/height) so it compresses proportionally on short viewports instead
  of overflowing under the nav — not a fixed-breakpoint jump.
- **Headline** (700, 1.875–3rem, 1.2): page H1s and major section H2s.
- **Title** (700, 1.25–1.5rem, 1.3): card headings, component titles.
- **Body** (400, 1rem, 1.6): paragraph copy, capped conceptually at 65–75ch via `max-w-2xl`/`max-w-3xl`
  containers.
- **Label** (500, 0.75rem, 0.1em tracking, uppercase): tags, status badges, department filters.

### Named Rules

**The No-Flourish Rule.** No italics, no serif accents, no display-font body copy. One display face,
one body face, nothing decorative layered on top.

## 4. Elevation

The system is flat by default and never uses `box-shadow` for depth (NFR-A11Y-2) — an explicit,
documented decision (`tokens.css`: "elevation = outline, not shadow"). Depth is communicated two ways:
a static 1px border (`--color-line`) that shifts to Sentinel Cyan or Electric Blue on hover/active,
and — on interactive cards only (`MotionCard`) — a subtle `-4px` `translateY` lift on hover, built
from `transform`, never from shadow. Both are no-ops under `prefers-reduced-motion: reduce`.

### Named Rules

**The No-Shadow Rule.** `box-shadow` is prohibited as a depth cue anywhere in the system. Focus rings
use a 2px solid outline (`:focus-visible`), not a shadow-based glow. If a component currently uses a
shadow for elevation or focus, that is a bug against this spec, not a style choice.

## 5. Components

### Buttons (`CTALink`)

- **Shape:** sharp corners, 0-radius, always.
- **Primary:** Electric Blue fill, white text, border in the same blue; hover darkens fill+border to
  Electric Blue Dark. Padding scales fluidly via `clamp()` in the hero (compact variant) or fixed
  `14px 28px` elsewhere.
- **Secondary:** white fill, `ink` text, `line`-colored border; hover shifts border to Sentinel Cyan.
- **Ghost:** for use over dark hero imagery only — `white/10` fill with `backdrop-blur-sm` and a
  `white/40` border, brightening on hover. This is the one deliberate, purposeful use of
  glassmorphism in the system — never applied to cards or nav.

### Cards (`MotionCard`, `StatCard`)

- **Corner Style:** 0-radius.
- **Background:** white, or `surface` when nested on a white section for contrast.
- **Shadow Strategy:** none, ever — see Elevation.
- **Border:** 1px `line`, shifting to `accent` on hover.
- **Hover motion:** `-4px` translateY lift (spring, no bounce-overshoot feel), reduced-motion no-op.
- **Internal Padding:** 24px (`p-6`) standard, 32px (`p-8`) for feature-level cards.

### Navigation (`NavBar`)

- Fixed, full-bleed header. On the home hero only, starts fully transparent (logo/links in white,
  brightness-inverted mark) and crossfades to solid `bg-white/95` + `line` border + `backdrop-blur-md`
  once scrolled past ~64px — blur and opacity alone carry the separation from the page; no shadow.
- Active link state: 2px bottom border in Electric Blue (solid) or Sentinel Cyan (over dark hero).
- Mobile: full-width drawer, always solid white, same link treatment stacked vertically.

### Hero (`HeroVideo` + fluid hero block)

- Full-bleed looping video (static poster under reduced motion) with a directional dark scrim, just
  legible enough for white text. All hero typography, spacing, and button padding are sized via
  `clamp(min, Nvmin, max)` so the whole composition compresses together on short viewports rather than
  any one element overflowing.

## 6. Do's and Don'ts

### Do:

- **Do** keep every corner at 0-radius (`--radius-none`) — cards, buttons, images, badges.
- **Do** use a 1px `--color-line` border and a color shift (never a shadow) to communicate hover/focus/active depth.
- **Do** size hero-scale type and spacing with `vmin`-based `clamp()` so short viewports compress proportionally instead of overflowing or requiring a new breakpoint.
- **Do** write copy the way ams-corp.com does: short sentences, real technical facts, no adjectives that don't carry meaning.
- **Do** gate every animation on `prefers-reduced-motion: no-preference`, with content visible-by-default so nothing ships blank.

### Don't:

- **Don't** use `box-shadow` as a depth/elevation cue anywhere in the system, including the nav.
- **Don't** write "mission-critical", "cutting-edge", "world-class", "redefining", or other flowery/AI-marketing adjectives — flagged and removed from this site's copy already.
- **Don't** write philosophy-voiced copy ("we believe…", "our philosophy…") or contrast-aphorisms ("measurement over assumption") — state the fact directly instead.
- **Don't** add gradient text, glassmorphism-as-default, hero-metric templates, or uppercase eyebrow labels above every section — none of these appear in the system today; keep it that way.
- **Don't** patch short-viewport overlap with a fixed arbitrary top-padding value — use the nav-height-derived offset (`calc(4rem + env(safe-area-inset-top))`) plus `vmin`-scaled hero content, both already in place.
