# Revision Pass — Client Feedback (2026-07-17)

## 1. Hero overlap fix

`src/app/page.tsx` — code change, no copy change. Hero wrapper `<div>` className:

Before:

```
"relative mx-auto flex min-h-dvh max-w-6xl items-center px-4 pb-[env(safe-area-inset-bottom)] md:px-6"
```

After:

```
"relative mx-auto flex min-h-dvh max-w-6xl items-center px-4 pt-[calc(4rem_+_env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)] md:px-6"
```

## 2. Solutions page layout

`src/app/solutions/page.tsx` — ENADOX CTA wrapper className:

Before: `"mt-6"`
After: `"mt-6 md:flex md:justify-end"`

## 3. Global page rebuild

`src/app/global/page.tsx` — structural rebuild, not a sentence-level copy edit. See file diff.

## 4. Careers page copy

`src/app/careers/page.tsx`

Before:

> "We hire engineers who hold the same bar we hold for our systems, the kind that fail safely because someone refused to cut the corner. If you want your work measured in consequences, not sprints, every open role is listed below."

After:

> "Core Defenses builds data analytics and secure communications systems for critical infrastructure. We're looking for engineers who want to solve hard technical problems at the leading edge of engineering and communications technology. Every open role is listed below."

## 5. AI-sounding copy removed

### `src/app/about/page.tsx`

**Precision value:**
Before: "We treat uncertainty as a quantity to be measured and reduced, not a margin to be padded. Better inputs make better decisions."
After: "We measure uncertainty and work to reduce it, rather than padding estimates with margin. Better inputs produce better predictions."

**Transparency value:**
Before: "Our methods are auditable and our assumptions explicit. Operators and regulators should understand why a result holds."
After: "Our methods are auditable and our assumptions explicit, so operators and regulators can verify why a result holds."

**Reliability value:**
Before: "Systems that matter must work when conditions are worst. We engineer for the degraded case, not the demonstration."
After: "We design for the worst operating conditions, not the demo. Systems have to keep working when conditions degrade."

**Section heading + body ("Rigor before rhetoric"):**
Before heading: "Rigor before rhetoric"
After heading: "Engineering discipline"
Before body: "We are a team of engineers solving hard problems in domains where the physics are unforgiving. Our approach favors measurement over assumption, disciplined analysis over intuition, and results that hold up to independent scrutiny."
After body: "We are engineers solving problems in domains with strict physical constraints, where an error carries a real-world cost."

**"Where failure is physical" body:**
Before: "Critical infrastructure does not tolerate approximation. A conservative guess costs capacity; an optimistic one costs far more. We build for the environments where the stakes are measured in reliability and safety, and we design our systems to earn the trust that those environments demand."
After: "Critical infrastructure does not tolerate approximation. An inaccurate model costs capacity, safety margin, or worse. We build systems for environments where reliability and safety are requirements, not features."

**"Analytics, backed by secure communications" body:**
Before: "EDIM applies a physics-based framework to nuclear predictive models, identifying and correcting calculational bias so predictions track real plant data instead of drifting from it. ENADOX delivers secure communications for denied and degraded environments, keeping mission critical operations connected when conventional links cannot be relied upon. Together they reflect a single posture: precise insight, dependable connection."
After: "EDIM applies a physics-based framework to nuclear predictive models, identifying and correcting calculational bias so predictions track real plant data. ENADOX delivers secure communications for denied and degraded environments, keeping operations connected when standard links fail."

**Closing line:**
Before: "If you build for the environments others avoid, we should talk."
After: "We're hiring engineers to build these systems."

### `src/app/page.tsx`

**"Core Capabilities" intro:**
Before: "Two platforms, one posture: understand the system precisely, and keep it connected when conditions degrade."
After: "Two platforms: EDIM for predictive analytics, ENADOX for secure communications in degraded conditions."

**"Where we operate" intro:**
Before: "Systems that cannot fail quietly. We build for the sectors that carry physical consequence."
After: "We build for sectors where failure has physical consequences: nuclear, energy, defense, and industrial operations."

### `src/app/industries/page.tsx`

**Intro paragraph:**
Before: "The systems that power, defend, and sustain modern life are also the most targeted. A single compromised data point or intercepted channel can cascade into outages, safety events, or mission failure. Core Defenses equips operators across the highest-consequence sectors with verifiable intelligence and assured communications built for adversarial conditions."
After: "Energy, nuclear, defense, and industrial operators depend on accurate data and secure communications. A compromised data point or an intercepted channel can cause an outage, a safety incident, or mission failure. Core Defenses builds verifiable analytics and secure communications for these sectors."

## Verification

- `tsc --noEmit` — clean
- `eslint` on all touched files — clean
- `npm run build` — 13/13 static pages, no errors
- Manual check in browser: hero at 1280×500 and 375×812 (no overlap), Solutions
  button alignment, Global page sections, Careers/About copy

---

# Iteration 2 — AMS-Style Writing Pass (2026-07-17)

Content-only rewrite. Reference: ams-corp.com writing style (facts, no adjectives,
no philosophy). No layout/design changes.

## `src/app/layout.tsx`

Before: "Advanced data analytics for critical infrastructure, backed by secure communications for mission critical operations. Home of EDIM and ENADOX."
After: "Data analytics and secure communications for nuclear, energy, defense, and industrial operations. Home of EDIM and ENADOX."

## `src/app/page.tsx`

**Hero paragraph:**
Before: "From advanced analytics to resilient communications, Core Defenses delivers technologies that help organizations make better decisions, protect critical operations, and stay connected under the most demanding conditions."
After: "Core Defenses builds EDIM, a predictive analytics platform for nuclear plants, and ENADOX, a secure communications platform for defense and industrial operations."

**Nuclear Analytics capability:**
Before: "EDIM is a physics-based framework that identifies and corrects calculational bias in predictive models, reducing prediction error and aligning results with real-time operational data for safer, more reliable decisions."
After: "EDIM is a physics-based framework that identifies and corrects calculational bias in predictive models. It reduces prediction error and keeps results aligned with real-time plant data."

**Secure Communications capability:**
Before: "ENADOX delivers resilient, secure communication across denied, degraded, intermittent, and low-bandwidth environments, with redundancy built into the data itself."
After: "ENADOX provides secure communication across denied, degraded, intermittent, and low-bandwidth (DDIL) environments. Redundancy is built into the data itself."

**Trust signal — Low-Latency Operations:**
Before: "Engineered for decisions measured in milliseconds."
After: "Response times measured in single-digit milliseconds."

**Trust signal — Global Deployment:**
Before heading: "Global Deployment" / body: "Operations hubs across four regions. See Global." _(inaccurate — only 1 hub exists)_
After heading: "Global Operations" / body: "Headquarters in Lexington, KY. Expansion planned across the Americas, EMEA, and APAC."

**"Built for your sector" heading:**
Before: "Built for your sector."
After: "Industries we serve."

## `src/app/solutions/page.tsx`

Before: "Data analytics for critical infrastructure, backed by secure communications for mission critical operations."
After: "EDIM provides predictive analytics for nuclear operations. ENADOX provides secure communications for defense and industrial operations."

## `src/app/solutions/edim/page.tsx`

**"Improving the Best Estimate" body:**
Before: "State-of-the-art predictive modeling paradigms used to track core observables such as thermal margins and eigenvalues are inadequate for modern operational demands in a competitive energy market. These result in operational inefficiencies, suboptimal fuel utilization, and increased regulatory scrutiny."
After: "Predictive models used to track thermal margins and eigenvalues often carry calculational bias. This bias causes operational inefficiencies, suboptimal fuel utilization, and increased regulatory scrutiny."

**"Patented Physics-Based Methodology" body:**
Before: "EDIM applies a mathematically rigorous inference analysis to identify and correct the sources of calculational bias in predictive models, avoiding issues such as overfitting, underfitting, and error compensation that plague existing methods. The result is a prediction that reliably tracks measured plant data instead of drifting from it."
After: "EDIM applies an inference analysis to identify and correct the sources of calculational bias in predictive models. It avoids overfitting, underfitting, and error compensation. Predictions track measured plant data rather than drifting from it."

**"$200M–$500M" body:**
Before: "These efficiencies come from reducing power derates, improving operational margins, and mitigating cycle inefficiencies, giving operators earlier warning of degraded conditions and greater confidence in the margins they operate with."
After: "These savings come from reduced power derates, improved operational margins, and fewer cycle inefficiencies. Operators get earlier warning of degraded conditions and more accurate operating margins."

## `src/app/solutions/enadox/page.tsx`

**Meta description:**
Before: "ENADOX enables resilient, secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments."
After: "ENADOX enables secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments."

**"Redundancy built into the data itself" body:**
Before: "ENADOX enables secure communication between platforms by transforming the data they exchange, with self-healing built in. One sensor's data can be embedded within another, so if a sensor fails, the original can be reconstructed. It is a kind of inbuilt redundancy that keeps information available even as sources drop."
After: "ENADOX enables secure communication between platforms by transforming the data they exchange. Self-healing is built in: one sensor's data can be embedded within another, so if a sensor fails, the original can be reconstructed."

**"Secure communication where links are denied" body:**
Before: "ENADOX supports secure communication in both open and denied environments, with proven military use cases. It carries traffic over software-defined radio, sustains communication in DDIL conditions, and coordinates drone-swarm navigation where conventional links break down."
After: "ENADOX supports secure communication in open and denied environments. It carries traffic over software-defined radio, sustains communication in DDIL conditions, and coordinates drone-swarm navigation."

**"Mission continuity as conditions degrade" body:**
Before: "Critical operations cannot pause when the environment turns hostile. ENADOX is resilient by design, keeping mission critical operations connected as bandwidth narrows and links come and go, so teams stay coordinated when it matters most."
After: "ENADOX keeps operations connected as bandwidth narrows and links become intermittent. Communication continues as individual links fail or degrade."

## `src/content/products/edim.ts`

**Tagline:**
Before: "EDIM is a physics-based framework that identifies and corrects calculational bias, reducing prediction error and keeping predictive models aligned with real-time operational data for safer, more reliable decisions."
After: "EDIM is a physics-based framework that identifies and corrects calculational bias. It reduces prediction error and keeps predictive models aligned with real-time operational data."

**Prediction Method stat:**
Before: "A mathematically rigorous and information-theoretic methodology that systematically identifies and corrects calculational biases, improving predictive accuracy while avoiding issues such as overfitting, underfitting, and error compensation."
After: "An information-theoretic methodology that identifies and corrects calculational biases. It improves predictive accuracy while avoiding overfitting, underfitting, and error compensation."

## `src/content/products/enadox.ts`

Before: "Secure communication for open and denied environments. ENADOX moves data between platforms with inbuilt redundancy: when one channel degrades, the mission keeps moving."
After: "Secure communication for open and denied environments. ENADOX moves data between platforms with built-in redundancy: when one channel degrades, another maintains the connection."

## `src/content/industries.ts`

**Energy:**
Before: "Generation and transmission operators face escalating threats to grid reliability and regulatory scrutiny over operational data integrity. EDIM delivers verifiable insight across distributed energy assets."
After: "Generation and transmission operators need accurate operational data for grid reliability and regulatory compliance. EDIM analyzes plant data across distributed energy assets."

**Nuclear:**
Before: "Nuclear facilities operate under the highest safety and compliance burdens, where a single data discrepancy carries outsized consequence. EDIM provides auditable analytics and defensible records across plant operations."
After: "Nuclear facilities operate under strict safety and compliance requirements. EDIM provides auditable analytics and documented records across plant operations."

**Defense:**
Before: "Defense programs demand assured communications and resilience against contested, adversarial environments. ENADOX hardens command and coordination channels end to end."
After: "Defense programs require secure communications in contested environments. ENADOX secures command and coordination channels end to end."

**Industrial:**
Before: "Industrial operators need continuous visibility into complex process environments to prevent downtime and safety incidents. EDIM turns raw operational telemetry into trusted, actionable intelligence."
After: "Industrial operators need visibility into process data to reduce downtime and prevent safety incidents. EDIM converts operational telemetry into usable analytics."

**Government:**
Before: "Public-sector agencies must safeguard sensitive information and inter-agency coordination against sophisticated interference. ENADOX secures mission communications while meeting stringent assurance requirements."
After: "Public-sector agencies need to protect sensitive information and coordinate securely across agencies. ENADOX secures communications and meets government assurance requirements."

**Utilities:**
Before: "Water, gas, and electric utilities manage sprawling infrastructure where data blind spots translate directly into service risk. EDIM consolidates asset intelligence for confident operational decisions."
After: "Water, gas, and electric utilities manage large, distributed infrastructure. EDIM consolidates asset data to support operational decisions."

**Critical Infrastructure:**
Before: "Critical infrastructure is a primary target for state and non-state actors seeking to disrupt essential services. ENADOX protects the coordination and communications layer these systems depend on."
After: "Critical infrastructure operators depend on secure coordination and communications to keep essential services running. ENADOX protects that communications layer."

**Manufacturing:**
Before: "Connected manufacturing lines generate vast operational data that must be trusted to drive throughput and quality. EDIM ensures that intelligence is accurate, traceable, and ready for action."
After: "Connected manufacturing lines generate operational data used to manage throughput and quality. EDIM verifies that data is accurate and traceable."

## `src/components/layout/Footer.tsx`

Before: "Delivering mission-critical analytics and resilient communications for organizations operating in the world's most demanding environments."
After: "Data analytics and secure communications for nuclear, energy, defense, and industrial operations."

## `src/app/careers/page.tsx`

**Meta description:**
Before: "Engineer the shield. Core Defenses hires engineers for analytics, secure communications, and critical infrastructure systems. All open roles listed. Apply now."
After: "Core Defenses hires engineers for analytics, secure communications, and critical infrastructure systems. All open roles listed."

**H1:**
Before: "Engineer the Shield"
After: "Careers"

**Hero paragraph:**
Before: "Core Defenses builds data analytics and secure communications systems for critical infrastructure. We're looking for engineers who want to solve hard technical problems at the leading edge of engineering and communications technology. Every open role is listed below."
After: "Core Defenses builds data analytics and secure communications systems for nuclear, defense, and industrial operations. We're looking for engineers to work on physics-based modeling, secure communications, and embedded systems alongside our engineering team. Every open role is listed below."

**Impact card — heading + body:**
Before: "Bias correction at scale" / "Build the inference engine behind EDIM, where correcting a single source of calculational bias is worth hundreds of millions across a plant's lifetime."
After: "Bias correction at scale" (unchanged) / "Build the inference engine behind EDIM. A single corrected source of calculational bias can save a plant $200M–$500M over its lifetime."

**Impact card — heading + body:**
Before: "Comms that don't drop" / "Engineer ENADOX for denied and degraded environments, targeting resilient links measured in single-digit milliseconds."
After: "Secure communications engineering" / "Engineer ENADOX for denied and degraded environments. Design communication links with response times in single-digit milliseconds."

**Recruitment CTA body:**
Before: "We move fast for the right engineer. Send your application and tell us what you'd build. We read every one."
After: "Send your application and tell us what you'd like to build. We review every application."

## `src/app/about/page.tsx`

**Meta description:**
Before: "Core Defenses is an engineering-first organization building advanced data analytics and secure communications for critical infrastructure."
After: "Core Defenses builds data analytics and secure communications systems for nuclear, energy, defense, and industrial operations."

**Hero paragraph:**
Before: "Core Defenses is an engineering-first organization building for critical infrastructure: nuclear, energy, defense, and industrial environments where failure carries physical, not merely financial, consequences. Our work pairs advanced data analytics with secure communications so that mission critical operations stay informed and connected under real-world conditions."
After: "Core Defenses builds data analytics and secure communications systems for nuclear, energy, defense, and industrial operations. These are environments where failure has physical consequences, not just financial ones."

**FeatureRow heading ("Engineering discipline" → "Methodology"), last bullet:**
Before: "Depth in the domains we serve, not breadth for its own sake"
After: "Deep experience in nuclear, defense, and industrial systems"

**FeatureRow heading + body ("Where failure is physical" → "High-Consequence Environments"):**
Before: "Critical infrastructure does not tolerate approximation. An inaccurate model costs capacity, safety margin, or worse. We build systems for environments where reliability and safety are requirements, not features."
After: "Nuclear and industrial operators require accurate models to maintain safety margins and operating capacity. Core Defenses builds systems to meet those safety and reliability requirements."

**Values section heading:**
Before: "What we hold to"
After: "How we work"

**Precision value:**
Before: "We measure uncertainty and work to reduce it, rather than padding estimates with margin. Better inputs produce better predictions."
After: "Uncertainty in our models is quantified and reduced through validated methods, not covered with added margin."

**Transparency value:**
Before: "Our methods are auditable and our assumptions explicit, so operators and regulators can verify why a result holds."
After: "Our methods are documented and our assumptions stated explicitly. Operators and regulators can verify how a result was produced."

**Reliability value:**
Before: "We design for the worst operating conditions, not the demo. Systems have to keep working when conditions degrade."
After: "Systems are tested against worst-case operating conditions, including degraded sensor input and loss of individual communication links."

## Verification (Iteration 2)

- `tsc --noEmit` — clean
- `eslint src` — clean
- `npm run build` — 13/13 static pages, no errors
- Manual browser check: Home, About, Careers pages render updated copy correctly
