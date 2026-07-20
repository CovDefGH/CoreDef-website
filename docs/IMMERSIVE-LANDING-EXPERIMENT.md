# Immersive Landing Experiment

**Status:** concept and technical blueprint. No production-page implementation is included in this phase.

**Branch:** `feature-immersive-landing`  
**Scope:** a new experimental homepage experience. Existing product pages, product claims, and production homepage are not changed until the blueprint is approved.

## 1. Creative direction

### North star: the engineering field film

The landing page should feel like a controlled, observational film about real systems: infrastructure at first light, measurement in operation, resilient networks in difficult conditions, and a company operating at global scale. It earns confidence through clear visual evidence and deliberate pacing, not spectacle.

The experience borrows only high-level interaction principles from the supplied Dribbble reference: a clear progression, generous visual pacing, and section-to-section continuity. It must not reproduce its layout, color palette, illustration style, dashboard motifs, or brand language.

### Brand translation

| Element        | Direction                                                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tone           | Measured, factual, and technically literate. No hype, startup language, or unexplained claims.                                                                                                                                    |
| Palette        | Near-black/slate cinematic canvas for the storytelling layer; existing Electric Blue and Sentinel Cyan only as restrained data/interaction markers. White or cool-slate reading surfaces return for dense copy and accessibility. |
| Type           | Existing Helvetica/Inter system. Large, compact editorial statements; ordinary case; short technical supporting copy.                                                                                                             |
| Shape          | Sharp geometry, thin rules, engineering labels, coordinate-like annotations. No rounded “SaaS” cards.                                                                                                                             |
| Image language | Photoreal infrastructure, authentic materials, natural light, restrained overlays modeled after documentary graphics and engineering drawings.                                                                                    |
| Motion         | Slow camera travel, exact transitions, simple reveals. Movement explains scale, process, or continuity; it never decorates.                                                                                                       |

### Guardrails

- Do not imply reactor safety, classified defense capability, or unverified ENADOX cryptographic claims.
- EDIM remains a physics-based approach to identifying and correcting calculational bias and aligning predictive models with operational data.
- ENADOX remains secure communications with built-in redundancy for DDIL environments; do not visualize or disclose proprietary implementation detail.
- No holograms, neon grids, cyberpunk cityscapes, floating dashboards, generic “AI brain” imagery, explosions, or tactical-action framing.
- Support reduced motion with meaningful still imagery, full content, and ordinary scroll behavior.

## 2. Storyboard

The first release has six chapters plus a closing contact transition. Each visual chapter is one viewport minimum on desktop, while mobile uses the same content with shorter sticky windows and fewer sequence frames.

| Chapter         | Narrative job                                                                             | Visual beat                                                                                                                    | Copy direction                                                                                                   | Primary action         |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 01 — Establish  | Establish scale and operating context.                                                    | Sunrise approach through a real commercial nuclear station; foreground infrastructure creates parallax.                        | “Engineering for systems that cannot afford assumption.” Supporting sentence identifies EDIM and ENADOX plainly. | Explore solutions      |
| 02 — Observe    | Turn scale into measurable detail.                                                        | Camera passes from exterior plant geometry into a restrained, practical modeling/analysis scene.                               | “EDIM corrects calculational bias in predictive models.”                                                         | Explore EDIM           |
| 03 — Decide     | Explain EDIM’s scientific function without product theatrics.                             | A physical engineering drawing, field data traces, and model comparison resolve into one legible analytical frame.             | “Physics-based inference, aligned with operational data.”                                                        | Read the EDIM overview |
| 04 — Connect    | Shift from analytics to communication under constraint.                                   | Fiber termination, radio mast, industrial network hardware, and a satellite ground-station silhouette transition as one route. | “ENADOX maintains communication when individual channels degrade.”                                               | Explore ENADOX         |
| 05 — Operate    | Place both platforms in the sectors they serve.                                           | Full-screen industry environments: nuclear, energy, defense, and industrial operations.                                        | “Built for environments where the system has physical consequences.”                                             | View industries        |
| 06 — Coordinate | Show global reach without making claims about current footprint beyond the existing site. | A dim, physical globe with sparse route arcs landing on infrastructure-like points; no live telemetry fiction.                 | “Headquartered in Lexington, Kentucky. Built for operations across regions and networks.”                        | Global operations      |
| 07 — Continue   | Return to a readable, light contact/careers conclusion.                                   | The final globe frame settles into the current crisp information architecture.                                                 | Contact, careers, and location information.                                                                      | Contact us / Careers   |

### Responsive storyboard rules

- Desktop: a chapter gets a 180–260vh scroll runway, with the sequence pinned for the visual middle 60–70%.
- Mobile: preserve chapter order and copy, use a 115–150vh runway, and substitute 12–24 optimized keyframes where continuous scrubbing would tax memory or battery.
- Reading never sits over visually busy footage. Each text block gets a directional scrim or moves into a dedicated quiet region of the footage.
- The current site’s content is the source of truth. Copy can be shortened for pacing but not broadened into new capability claims.

## 3. Scroll choreography

### Global sequence

1. **0–64px:** transparent navigation overlays the hero with no layout shift.
2. **64–96px:** navigation crossfades to a fixed, low-opacity surface with `backdrop-filter`, a 1px rule, and no shadow.
3. **Within every chapter:** a pinned visual sequence maps scroll progress to a normalized frame index. Typography enters after the eye has found the image; it leaves before the chapter cut.
4. **Chapter handoff:** outgoing footage darkens or masks along a structural line; the next chapter begins from a visually compatible composition rather than a hard jump.
5. **Reading moments:** detailed product facts live in normal-flow sections immediately after their cinematic reveal, so users can stop and read without fighting a sticky interaction.

### Per-chapter timing

| Chapter    | Scroll phases                                                                              | Motion details                                                                            |
| ---------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Establish  | 0–20% title fade; 20–78% aerial scrub; 78–100% crossfade to schematic plane                | 1.00–1.03 scale only; no rapid zooming.                                                   |
| Observe    | 0–25% context label; 25–75% approach to engineering detail; 75–100% data plane reveal      | One thin-line annotation draw, then held static.                                          |
| Decide     | 0–25% headline; 25–70% model/data alignment; 70–100% text moves to a light reading surface | Graph marks animate once, never loop.                                                     |
| Connect    | 0–30% channel context; 30–80% physical route continuity; 80–100% split-path resolution     | Route lines use 1px strokes, low contrast, no pulse effects.                              |
| Operate    | Four 25% industry states                                                                   | Cross-dissolve and lateral parallax only; one state fully settles before the next begins. |
| Coordinate | 0–70% globe turn and route reveal; 70–100% settle to contact transition                    | Camera remains almost static; paths draw once and remain quiet.                           |

### Reduced-motion and keyboard behavior

- If `prefers-reduced-motion: reduce` is active, render the chapter poster, show all chapter copy in normal document flow, and disable pinned scroll intervals and non-essential path drawing.
- Tab order follows source order. Sticky canvases are decorative (`aria-hidden`) and never receive focus.
- Visible controls retain the existing focus outline. A “Skip story” link lands on the first normal-flow product summary.

## 4. Required video sequences

All generated clips are source material, not web delivery files. Generate at 4K when possible; web exports come from a separately approved frame extraction and compression pipeline.

| ID  | Sequence                       | Target duration | Camera language                                                                   | Frame use                      |
| --- | ------------------------------ | --------------: | --------------------------------------------------------------------------------- | ------------------------------ |
| V01 | Nuclear station at sunrise     |          12–16s | Stabilized aerial dolly, gradual descent, layered depth                           | 288–384 source frames at 24fps |
| V02 | Engineering observation        |          10–12s | Slow lateral slider through a real industrial analysis environment                | 240–288 frames                 |
| V03 | EDIM analytical transition     |           8–10s | Locked-off macro movement across physical drawings, instruments, and data display | 192–240 frames                 |
| V04 | Resilient communications route |          10–12s | Smooth connected travel across fiber, radio, and ground-station infrastructure    | 240–288 frames                 |
| V05 | Industry environments          |  4 clips × 6–8s | Minimal dolly or locked-off motion per environment                                | 144–192 frames per clip        |
| V06 | Global operations globe        |           8–10s | Slow orbital move around a practical, dark globe model                            | 192–240 frames                 |

## 5. Google Flow / Veo prompts

### Shared generation specification

Apply this instruction to every prompt: **Ultra-photorealistic cinematic video, 16:9 landscape, 3840×2160 4K UHD preferred (1920×1080 minimum), 24fps. Design for conversion to sequential PNG/WebP frames used by scroll-controlled playback. Maintain frame-to-frame consistency. Use smooth, stabilized camera movement, physically accurate materials and scale, natural lighting, restrained color, generous negative space for web typography, and no on-screen text or logos. Avoid futuristic architecture, sci-fi, holograms, cyberpunk, neon, lens flares, shaky camera, FPV movement, spinning, explosions, aggressive action, unrealistic clouds, cartoon rendering, stock-footage staging, repetitive framing, or AI artifacts.**

### V01 — Nuclear station at sunrise

> A modern commercial nuclear power station at sunrise. Begin with a wide aerial establishing shot. The camera performs a slow, perfectly stabilized drone dolly toward the facility and gradually descends with constant, unhurried forward movement. Reveal physically accurate cooling towers, containment buildings, substations, transmission lines, turbine halls, transformers, industrial piping, and service infrastructure. Compose rich foreground, midground, and background depth with natural parallax; do not aim directly at a single cooling tower. Morning fog, natural steam, soft low-angle sunlight, realistic volumetric atmosphere, muted industrial slate and concrete colors. Leave clean negative space in the upper-left third for typography. The station is credible, orderly, and operational; no people are the focal point.

### V02 — Engineering observation

> Inside a real high-reliability industrial engineering environment adjacent to critical infrastructure. A slow, stabilized lateral camera move passes a stainless work surface, printed engineering drawings, calibrated instruments, cable trays, and an out-of-focus control-room window looking toward industrial plant structures. The scene is practical and restrained: hard materials, paper, measurement tools, physically plausible monitors showing non-branded neutral line plots without readable text, and daylight balanced with soft task lighting. The camera movement is less than one meter across the scene, with shallow but stable depth of field and quiet negative space at right for web typography. No futuristic UI, no glowing screens, no laboratory stereotypes.

### V03 — EDIM analytical transition

> A controlled macro cinematic study of engineering analysis. Start close on an architecturally precise printed process diagram and pencil annotations, then make a very slow slider move to a calibrated instrument and a practical desktop display with an abstract, non-branded line plot settling into alignment with a second trace. The data is subtle and physically believable, not holographic; there are no readable numbers, brand marks, or impossible visual effects. Cool daylight, matte paper, brushed metal, dark graphite surfaces, measured focus changes, and a stable camera. Reserve the left half of the composition as quiet negative space for copy. The emotional tone is verification and precision, never spectacle.

### V04 — Resilient communications route

> A single continuous visual journey through physical communications infrastructure in a remote industrial setting at early blue hour. Begin at a fiber termination panel with realistic connectors, transition through a sheltered radio mast and directional antenna, then end with a satellite ground-station silhouette beyond a utility substation. The camera moves slowly and continuously along a coherent route, with each physical connection naturally motivated by framing and depth. Materials are weathered but maintained: cable jackets, galvanized steel, ceramic insulators, concrete, and real earth. Use restrained blue-gray ambient light with warm practical lights. Keep the right third quiet for typography. No flashing packets, no digital overlays, no military action, no cyberpunk aesthetic.

### V05a — Nuclear industry

> A stable, early-morning exterior of a commercial nuclear plant service corridor: containment architecture in the distance, pipe racks and safety railings in foreground, soft steam from cooling structures, and slowly changing natural light. A near-imperceptible lateral dolly creates depth. Accurate scale, quiet operations, no dramatic weather, no people posing for camera. Leave negative space at top-left.

### V05b — Energy industry

> A real electrical transmission substation at golden hour, seen from a grounded elevated perspective. Transformer geometry, busbars, insulators, lattice structures, and outgoing transmission lines create layered depth. The camera advances slowly along a service road with smooth stabilized motion. No sparks, failures, or speculative technology. Muted materials and clear negative space on the left.

### V05c — Defense communications industry

> A professional, non-combat field communications site in a remote open landscape. Show a weatherproof equipment shelter, a modest antenna mast, secured cable runs, and a distant relay point. Use an observational documentary camera that moves a few feet laterally at sunrise. No weapons, personnel, military insignia, tactical action, classified interfaces, or surveillance drama. Grounded, maintained, and credible.

### V05d — Industrial operations

> A modern industrial process facility with pumps, pipework, valves, catwalks, and electrical conduit. The camera makes a slow, stabilized push through a clean service aisle, framing repeating engineered geometry and realistic materials. Soft work lights blend with daylight from high windows. No smoke, danger, worker hero shots, or futuristic machinery. Preserve a calm central negative space for heading text.

### V06 — Global operations

> A photographic practical globe model in a dark, quiet engineering studio. The camera performs a slow, near-static orbital move around the globe as a few extremely subtle, thin, matte connection paths become visible between generalized regions. The paths are not neon and do not pulse; they resemble precision ink or fine technical wire. In the background, very soft silhouettes of infrastructure maps and a neutral desk surface suggest coordination without displaying live data. Deep charcoal, slate, and a small restrained electric-blue accent. Leave the left third clean for typography. No digital planet, no sci-fi interface, no space vista.

## 6. Technical implementation plan

### Architecture

The existing Next.js 15 App Router application already has Motion and a reduced-motion-aware animation convention. The experiment should extend that foundation rather than add Lenis, GSAP, or a second animation runtime prematurely.

1. Add an isolated homepage composition under `src/components/immersive/`; keep product data in `src/content/` and reuse the existing `NavBar`, `CTALink`, and typography tokens where appropriate.
2. Implement a client-only `ScrollSequence` primitive that accepts a manifest of responsive sources, poster, frame count, and start/end scroll range.
3. Decode and draw image sequences into one `<canvas>` per active chapter. Request frames only near the current target index; prefetch a small forward/backward window; release decoded `ImageBitmap`s on chapter exit.
4. Use `IntersectionObserver` to activate at most the current and next sequence. Use `requestAnimationFrame` to coalesce scroll updates and avoid React state updates on every scroll event.
5. Keep semantic headings, content, actions, and fallback imagery in server-rendered HTML. Canvas footage is progressive enhancement only.
6. Use CSS scroll-linked animation only for simple opacity/mask transitions; fall back to ordinary visible content where unsupported.

### Delivery and performance budget

| Concern       | Plan                                                                                                                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source master | 4K ProRes/H.264 archive outside the web bundle.                                                                                                                                                      |
| Web frames    | WebP/AVIF where browser support is validated; fixed dimensions with an explicit aspect ratio to eliminate CLS.                                                                                       |
| Initial load  | Hero poster plus a limited first-frame runway only; never preload all sequences.                                                                                                                     |
| Frame count   | Begin with 48–96 responsive web frames per chapter after perceptual testing, not hundreds by default. Interpolate visual smoothness with carefully selected source timing before increasing payload. |
| Canvas        | One canvas sized to device pixel ratio with an upper DPR cap; reuse it per chapter where feasible.                                                                                                   |
| Mobile        | Posters or short keyframe sets first; reduce decoded-frame cache and disable sequences under memory/network heuristics.                                                                              |
| Metrics       | Budget and track LCP, CLS, INP, JS transfer, image transfer, decoded image memory, and dropped-frame rate.                                                                                           |

### Navigation behavior

The navigation will reserve its existing height from first paint. A single passive scroll listener toggles a data attribute after 72px with a small hysteresis band, allowing opacity, border, and blur to transition without changing layout. It must have a solid accessible mobile state regardless of scroll position.

### Test strategy

- Unit-test frame-index calculation, range clamping, preload-window selection, and reduced-motion fallback.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` for every implementation slice.
- Add Playwright or equivalent browser checks for keyboard order, skip link behavior, no-JS content visibility, reduced motion, viewport resizing, and a mobile memory/performance smoke test.
- Audit the deployed preview with Lighthouse on desktop and mobile after real frames arrive; synthetic placeholder images cannot prove the final performance budget.

## 7. Asset checklist

### Visual masters

- [ ] V01–V06 approved 4K source clips, with rights/usage confirmation and prompt/version records.
- [ ] A 16:9 key poster for every chapter and a separately art-directed mobile crop.
- [ ] Extracted responsive frame sequences and a per-sequence manifest (dimensions, count, bytes, frame mapping, poster, alt/fallback description).
- [ ] High-quality stills for reduced-motion and no-JS paths.
- [ ] Optional authentic technical artifacts: verified engineering diagrams, abstracted and legally cleared operational charts, or studio-created equivalents.

### Brand and content

- [ ] Legal/product approval for all final EDIM and ENADOX statements.
- [ ] Approved chapter headlines and short descriptions.
- [ ] Confirmed global-operations wording; do not portray offices or operations not supported by the company.
- [ ] Logo variants for light and dark footage, with minimum clear-space guidance.

### Engineering

- [ ] Frame manifest generator and image optimization script.
- [ ] Performance budgets per route and device class.
- [ ] Analytics events for story completion and solution CTA use, subject to the site’s privacy policy.
- [ ] Accessibility test matrix for keyboard, screen reader, reduced motion, contrast, and zoom.

## 8. Development roadmap

### Phase 0 — approval gate

Review this blueprint with product, brand, and legal. Lock the factual claims, approve the chapter order, and choose the visual masters before code begins.

### Phase 1 — static narrative prototype

Build the new homepage composition with existing still assets or neutral placeholders. Validate hierarchy, content order, mobile layout, navigation behavior, focus flow, and reduced-motion fallback. No image-sequence engine yet.

### Phase 2 — sequence engine proof of concept

Implement one production-shaped chapter (V01) behind an experiment flag. Measure real browser memory, scroll latency, and loading behavior on modern desktop and mid-range mobile hardware. Establish the final frame budget from measurements.

### Phase 3 — chapter integration

Add EDIM, ENADOX, industries, and global chapters one at a time. Each chapter must arrive with its poster, responsive frames, manifest, fallback copy, and performance measurement.

### Phase 4 — hardening

Complete visual QA at breakpoints, keyboard/screen-reader QA, reduced-motion QA, browser compatibility, Lighthouse testing using production-like assets, and content/legal sign-off.

### Phase 5 — experiment release decision

Deploy as a controlled preview or route-level experiment. Compare engagement with the existing homepage without replacing it. Production replacement happens only after accessibility, performance, and content criteria are met.

## Decisions needed before implementation

1. Approve the dark cinematic storytelling layer paired with light reading surfaces, or require the full experience to remain light.
2. Confirm whether V05 should represent all four industries in the first release or launch with nuclear and energy only.
3. Provide/approve the final generated source clips and confirm their commercial usage rights.
4. Approve the experiment release model: a private preview route, an A/B test, or a staged homepage replacement after validation.
