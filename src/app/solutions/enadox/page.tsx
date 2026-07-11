import type { Metadata } from "next";
import { CTALink } from "@/components/ui/CTALink";
import { enadox } from "@/content/products/enadox";

export const metadata: Metadata = {
  title: "ENADOX — Secure Communications",
  description:
    "ENADOX enables resilient, secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments.",
};

// Static illustrative waveform for the Live Integrity Stream (FR-ENADOX-2).
const WAVE =
  "M0 70 C 40 55, 60 30, 100 38 S 160 80, 200 62 S 260 20, 300 34 S 360 76, 400 58 S 460 28, 500 40 S 560 66, 600 48";

export default function EnadoxPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Header with actions — FR-ENADOX-1/5 */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-primary flex items-center gap-2 text-sm font-medium">
            <span
              aria-hidden
              className="bg-accent inline-block size-1.5 rounded-full"
            />
            {enadox.eyebrow}
          </p>
          <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
            ENADOX System
          </h1>
          <p className="text-ink-muted mt-5 max-w-2xl text-lg">
            {enadox.tagline}
          </p>
        </div>
        {/* Both actions route to contact — no live functionality implied */}
        <div className="flex gap-3">
          <CTALink href="/contact" variant="secondary">
            View Logs
          </CTALink>
          <CTALink href="/contact">Initialize Sequence</CTALink>
        </div>
      </div>

      {/* Bento — FR-ENADOX-2/3/4, collapses below md (NFR-RESP-2) */}
      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <figure className="border-line bg-ink border p-6 md:col-span-8">
          <figcaption className="flex items-baseline justify-between">
            <span className="text-accent font-mono text-xs font-medium tracking-widest uppercase">
              Live Integrity Stream
            </span>
            <span className="font-mono text-xs text-white/40">
              ILLUSTRATIVE DATA
            </span>
          </figcaption>
          <svg
            viewBox="0 0 600 100"
            role="img"
            aria-label="Illustrative signal-integrity waveform holding steady within operating bounds."
            className="mt-6 h-auto w-full"
          >
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="600"
                y2={y}
                stroke="rgba(255,255,255,0.08)"
              />
            ))}
            <path
              d={WAVE}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
            />
          </svg>
          <p className="mt-4 font-mono text-xs text-white/60">
            channel integrity: nominal · packet recovery: passive · mesh: 12/12
          </p>
        </figure>

        <div className="grid gap-6 md:col-span-4">
          {/* System Status card — FR-ENADOX-3 */}
          <div className="border-line border bg-white p-6">
            <p className="text-ink-muted text-sm">System Status</p>
            <p className="text-ink mt-2 flex items-center gap-2.5 text-3xl font-bold">
              <span
                aria-hidden
                className="bg-accent inline-block size-2.5 animate-pulse rounded-full"
              />
              Optimal
            </p>
            <p className="text-ink-muted mt-3 text-sm">
              All communication channels operating with full redundancy
              available.
            </p>
          </div>
          {/* Core Metrics — FR-ENADOX-4 */}
          <div className="border-line border bg-white p-6">
            <h2 className="text-ink text-sm font-semibold">Core Metrics</h2>
            <dl className="mt-4 space-y-3">
              {enadox.specifications.map(({ label, value }) => (
                <div
                  key={label}
                  className="border-line flex items-baseline justify-between gap-4 border-b pb-3 last:border-0"
                >
                  <dt className="text-ink-muted text-sm">{label}</dt>
                  <dd className="text-ink text-right font-mono text-sm font-medium">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Mission envelope stats */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        {enadox.stats.map(({ label, value, description }) => (
          <div key={label} className="border-line border p-6">
            <p className="text-ink-muted text-sm">{label}</p>
            <p className="text-ink mt-2 font-mono text-2xl font-bold">
              {value}
            </p>
            <p className="text-ink-muted mt-3 text-sm">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
