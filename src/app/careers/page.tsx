import type { Metadata } from "next";
import { ArrowUpRight, Cpu, Radio, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineer the shield. Core Defenses hires engineers for analytics, secure communications, and critical-infrastructure systems. Apply now.",
};

// FR-CAR-2 engineering-impact cards; at least one quantified claim (< 5ms).
const IMPACT = [
  {
    icon: Cpu,
    heading: "Analytics at the margin",
    body: "Build the uncertainty engine behind EDIM — where a fraction of recovered thermal margin is worth hundreds of millions per reactor.",
  },
  {
    icon: Radio,
    heading: "Comms that don't drop",
    body: "Engineer ENADOX for denied and degraded environments, targeting resilient links measured in single-digit milliseconds.",
    metric: "< 5ms",
    metricLabel: "Global latency target",
  },
  {
    icon: ShieldCheck,
    heading: "Zero-trust by default",
    body: "Every system we ship assumes a contested network. Security is the design constraint, not a later audit.",
  },
];

export default function CareersPage() {
  const { applyFormUrl, careersUrl } = site;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Hero — FR-CAR-1 */}
      <div className="max-w-3xl">
        <p className="text-primary flex items-center gap-2 text-sm font-medium">
          <span
            aria-hidden
            className="bg-accent inline-block size-1.5 animate-pulse rounded-full motion-reduce:animate-none"
          />
          Mission Active
        </p>
        <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
          Engineer the Shield
        </h1>
        <p className="text-ink-muted mt-5 text-lg">
          We hire engineers who hold the same bar we hold for our systems — the
          kind that fail safely because someone refused to cut the corner. If
          you want your work measured in consequences, not sprints, apply.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={applyFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            Apply Now
            <ArrowUpRight aria-hidden size={16} />
          </a>
          <a
            href={careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-line hover:border-accent text-ink inline-flex items-center gap-2 border bg-white px-5 py-2.5 text-sm font-medium transition-colors"
          >
            View All Open Roles
            <ArrowUpRight aria-hidden size={16} />
          </a>
        </div>
      </div>

      {/* Engineering impact — FR-CAR-2 */}
      <section className="reveal mt-20">
        <h2 className="text-ink text-3xl font-bold">Engineering Impact</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {IMPACT.map(({ icon: Icon, heading, body, metric, metricLabel }) => (
            <div
              key={heading}
              className="border-line hover:border-accent flex flex-col border bg-white p-6 transition-colors"
            >
              <span className="bg-surface border-line inline-flex w-fit border p-3">
                <Icon aria-hidden size={20} className="text-primary" />
              </span>
              <h3 className="text-ink mt-5 text-lg font-bold">{heading}</h3>
              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {body}
              </p>
              {metric && (
                <p className="text-ink mt-auto pt-5 font-mono text-2xl font-bold">
                  {metric}
                  <span className="text-ink-muted block text-xs font-normal">
                    {metricLabel}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="reveal border-line bg-surface mt-16 flex flex-wrap items-center justify-between gap-6 border p-8">
        <div className="max-w-xl">
          <h2 className="text-ink text-2xl font-bold">
            Don&apos;t see your role listed?
          </h2>
          <p className="text-ink-muted mt-2 text-sm">
            We move fast for the right engineer. Send your application and tell
            us what you&apos;d build — we read every one.
          </p>
        </div>
        <a
          href={applyFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Fill Out Our Application
          <ArrowUpRight aria-hidden size={16} />
        </a>
      </section>
    </div>
  );
}
