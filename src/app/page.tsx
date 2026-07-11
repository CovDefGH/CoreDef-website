import Link from "next/link";
import { ShieldCheck, Timer, Globe2, Atom, Radio } from "lucide-react";
import { CTALink } from "@/components/ui/CTALink";
import { TerminalPanel } from "@/components/sections/TerminalPanel";

const TERMINAL_LINES = [
  "[00:00:01] sentinel.core — link established",
  "[00:00:02] ingest: 4 telemetry channels nominal",
  "[00:00:04] edim.margin — uncertainty bands recomputed",
  "[00:00:05] enadox.mesh — 12/12 nodes reachable",
  "[00:00:07] integrity check … PASS",
  "[00:00:09] compliance stream … PASS",
  "[00:00:11] watch state: OPTIMAL",
];

// FR-HOME-3 — EDIM featured first per PRD §7 product priority.
const CAPABILITIES = [
  {
    icon: Atom,
    heading: "Nuclear Analytics",
    description:
      "EDIM narrows nuclear data uncertainty to reduce the penalty on thermal margin — recovering power output, fuel cycle length, and operational flexibility that conservatism leaves on the table.",
    linkLabel: "Detail Specs",
    href: "/solutions/edim",
  },
  {
    icon: Radio,
    heading: "OT/ICS Safeguards",
    description:
      "ENADOX keeps mission-critical operations connected across denied, degraded, intermittent, and limited-bandwidth environments — with redundancy built into the data itself.",
    linkLabel: "View Protocol",
    href: "/solutions/enadox",
  },
];

const TRUST_SIGNALS = [
  {
    icon: ShieldCheck,
    heading: "Zero-Trust Architecture",
    description: "Every channel authenticated, every payload verified.",
  },
  {
    icon: Timer,
    heading: "Low-Latency Operations",
    description: "Engineered for decisions measured in milliseconds.",
  },
  {
    icon: Globe2,
    heading: "Global Deployment",
    description: "Operations hubs across four regions. See Global.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — FR-HOME-1/2 */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="text-primary flex items-center gap-2 text-sm font-medium">
            <span
              aria-hidden
              className="bg-accent inline-block size-1.5 animate-pulse rounded-full"
            />
            System Status: Optimal
          </p>
          <h1 className="text-ink mt-5 text-4xl font-bold md:text-5xl">
            Precision analytics for critical infrastructure.
            <span className="text-primary block">
              Resilient comms for contested environments.
            </span>
          </h1>
          <p className="text-ink-muted mt-6 max-w-xl text-lg">
            Core Defenses builds for environments where failure has physical
            consequences — nuclear, energy, defense, and industrial operations.
            Expertise first, products second: EDIM and ENADOX.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTALink href="/solutions">Explore Solutions</CTALink>
            <CTALink href="/solutions/enadox" variant="secondary">
              View Telemetry
            </CTALink>
          </div>
        </div>
        <TerminalPanel
          title="Live Stream"
          lines={TERMINAL_LINES}
          ariaSummary="Illustrative operations terminal showing simulated system checks passing with an optimal watch state."
        />
      </section>

      {/* Core Capabilities — FR-HOME-3 */}
      <section className="border-line bg-surface border-y">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-ink text-3xl font-bold">Core Capabilities</h2>
          <p className="text-ink-muted mt-3 max-w-2xl">
            Two platforms, one posture: understand the system precisely, and
            keep it connected when conditions degrade.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map(
              ({ icon: Icon, heading, description, linkLabel, href }) => (
                <div
                  key={heading}
                  className="border-line hover:border-accent border bg-white p-8 transition-colors"
                >
                  <span className="bg-surface border-line inline-flex border p-3">
                    <Icon aria-hidden size={22} className="text-primary" />
                  </span>
                  <h3 className="text-ink mt-5 text-xl font-bold">{heading}</h3>
                  <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="text-primary hover:text-ink mt-5 inline-block text-sm font-medium transition-colors"
                  >
                    {linkLabel} →
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Trust row — FR-HOME-4 */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <ul className="grid gap-8 md:grid-cols-3">
          {TRUST_SIGNALS.map(({ icon: Icon, heading, description }) => (
            <li key={heading} className="flex items-start gap-4">
              <Icon
                aria-hidden
                size={22}
                className="text-primary mt-0.5 shrink-0"
              />
              <div>
                <h2 className="text-ink text-base font-semibold">{heading}</h2>
                <p className="text-ink-muted mt-1 text-sm">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Outbound paths — FR-HOME-5 */}
      <section className="border-line border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-6">
          <div>
            <h2 className="text-ink text-2xl font-bold">
              Built for your sector.
            </h2>
            <p className="text-ink-muted mt-2 text-sm">
              Energy, nuclear, defense, government, utilities, manufacturing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTALink href="/industries" variant="secondary">
              Industries
            </CTALink>
            <CTALink href="/global" variant="secondary">
              Global Operations
            </CTALink>
            <CTALink href="/careers" variant="secondary">
              Careers
            </CTALink>
          </div>
        </div>
      </section>
    </>
  );
}
