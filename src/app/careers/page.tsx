import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Cpu, Radio, ShieldCheck } from "lucide-react";
import { jobs } from "@/content/careers";
import { media } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { JobBoard } from "./JobBoard";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Engineer the shield. Core Defenses hires engineers for analytics, secure communications, and critical-infrastructure systems. All open roles listed — apply now.",
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
  const applyUrl = jobs[0].applyUrl;

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
          you want your work measured in consequences, not sprints, every open
          role is listed below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            Apply Now
            <ArrowUpRight aria-hidden size={16} />
          </a>
          <a
            href="#open-roles"
            className="border-line hover:border-accent text-ink inline-flex items-center gap-2 border bg-white px-5 py-2.5 text-sm font-medium transition-colors"
          >
            View Open Roles
          </a>
        </div>
      </div>

      {/* Engineering impact — FR-CAR-2 */}
      <Reveal as="section" className="mt-20">
        <h2 className="text-ink text-3xl font-bold">Engineering Impact</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {IMPACT.map(({ icon: Icon, heading, body, metric, metricLabel }) => (
            <MotionCard
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
            </MotionCard>
          ))}
        </div>

        <div className="border-line mt-6 border">
          <Image
            src={media.team.src}
            alt={media.team.alt}
            width={1600}
            height={600}
            className="h-64 w-full object-cover md:h-80"
          />
        </div>
      </Reveal>

      {/* Open roles — inline, filterable (US-10) */}
      <Reveal as="section" id="open-roles" className="mt-20 scroll-mt-24">
        <h2 className="text-ink text-3xl font-bold">Open Roles</h2>
        <p className="text-ink-muted mt-3 max-w-2xl">
          Every current opening, listed here. Filter by department, then apply
          directly.
        </p>
        <JobBoard />
      </Reveal>

      {/* Recruitment CTA */}
      <Reveal
        as="section"
        className="border-line bg-surface mt-16 flex flex-wrap items-center justify-between gap-6 border p-8"
      >
        <div className="max-w-xl">
          <h2 className="text-ink text-2xl font-bold">
            Don&apos;t see your role?
          </h2>
          <p className="text-ink-muted mt-2 text-sm">
            We move fast for the right engineer. Send your application and tell
            us what you&apos;d build — we read every one.
          </p>
          <a
            href="#open-roles"
            className="text-ink-muted hover:text-accent mt-3 inline-block text-xs underline underline-offset-4"
          >
            View all open roles
          </a>
        </div>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary bg-primary hover:border-ink hover:bg-ink inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Fill Out Our Application
          <ArrowUpRight aria-hidden size={16} />
        </a>
      </Reveal>
    </div>
  );
}
