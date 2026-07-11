import type { Metadata } from "next";
import { CTALink } from "@/components/ui/CTALink";
import { StatCard } from "@/components/sections/StatCard";
import { SpecTable } from "@/components/sections/SpecTable";
import { edim } from "@/content/products/edim";

export const metadata: Metadata = {
  title: "EDIM — Nuclear Data Analytics",
  description:
    "EDIM reduces nuclear data uncertainty to recover thermal margin — improving reactor economics through better prediction, not conservatism.",
};

// Illustrative topology at business level only (FR-EDIM-2, FR-EDIM-6):
// generic data-flow stages, no reactor internals.
const TOPOLOGY_STAGES = [
  { id: "sources", label: "Nuclear Data Libraries" },
  { id: "engine", label: "Uncertainty Engine" },
  { id: "margin", label: "Margin Analytics" },
  { id: "ops", label: "Operations Planning" },
];

export default function EdimPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-primary flex items-center gap-2 text-sm font-medium">
        <span
          aria-hidden
          className="bg-accent inline-block size-1.5 rounded-full"
        />
        {edim.eyebrow}
      </p>
      <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
        {edim.name}
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg">{edim.tagline}</p>

      {/* Bento — FR-EDIM-2/3, collapses below md (NFR-RESP-2) */}
      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <figure className="border-line bg-surface border p-6 md:col-span-8">
          <figcaption className="flex items-baseline justify-between">
            <span className="text-ink text-sm font-semibold">
              System Topology
            </span>
            <span className="text-ink-muted font-mono text-xs">
              ILLUSTRATIVE
            </span>
          </figcaption>
          <svg
            viewBox="0 0 640 220"
            role="img"
            aria-label="Illustrative data flow: nuclear data libraries feed the uncertainty engine, which drives margin analytics and operations planning."
            className="mt-4 h-auto w-full"
          >
            {TOPOLOGY_STAGES.map(({ label }, i) => (
              <g key={label}>
                <rect
                  x={16 + i * 156}
                  y={86}
                  width={136}
                  height={48}
                  fill="white"
                  stroke="var(--color-line)"
                />
                <text
                  x={84 + i * 156}
                  y={114}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--color-ink)"
                >
                  {label}
                </text>
                {i < TOPOLOGY_STAGES.length - 1 && (
                  <path
                    d={`M ${152 + i * 156} 110 h 20`}
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    markerEnd="none"
                  />
                )}
              </g>
            ))}
            <path
              d="M 16 40 h 608 M 16 180 h 608"
              stroke="var(--color-line)"
              strokeDasharray="4 6"
            />
            <text x="16" y="30" fontSize="10" fill="var(--color-ink-muted)">
              UNCERTAINTY BAND — BEFORE
            </text>
            <text x="16" y="200" fontSize="10" fill="var(--color-ink-muted)">
              UNCERTAINTY BAND — AFTER
            </text>
          </svg>
        </figure>
        <div className="grid gap-6 md:col-span-4">
          {edim.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Core Specifications — FR-EDIM-4 */}
      <section className="mt-16">
        <h2 className="text-ink text-2xl font-bold">Core Specifications</h2>
        <div className="mt-6">
          <SpecTable
            caption="EDIM core specifications"
            rows={edim.specifications}
          />
        </div>
      </section>

      {/* CTA — FR-EDIM-5 */}
      <section className="border-line mt-16 flex flex-wrap items-center justify-between gap-6 border p-8">
        <div>
          <h2 className="text-ink text-xl font-bold">
            Evaluate EDIM for your program.
          </h2>
          <p className="text-ink-muted mt-1 text-sm">
            Business and government inquiries route directly to the EDIM team.
          </p>
        </div>
        <CTALink href="/contact">Contact the EDIM Team</CTALink>
      </section>
    </div>
  );
}
