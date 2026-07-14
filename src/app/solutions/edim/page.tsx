import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { StatCard } from "@/components/sections/StatCard";
import { SpecTable } from "@/components/sections/SpecTable";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/content/media";
import { edim } from "@/content/products/edim";

export const metadata: Metadata = {
  title: "EDIM: Nuclear Predictive Analytics",
  description:
    "EDIM is a physics-based framework that identifies and corrects calculational bias, improving predictive accuracy for nuclear operations.",
};

export default function EdimPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <Link
        href="/solutions"
        className="text-ink-muted hover:text-primary inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        <ArrowLeft aria-hidden size={14} />
        Back to Solutions
      </Link>

      {/* Header */}
      <h1 className="text-ink mt-8 text-4xl font-bold md:text-5xl">
        {edim.name}
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg leading-relaxed">
        {edim.tagline}
      </p>

      {/* Use-case blocks — alternating image sides */}
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          eyebrow="The problem"
          heading="Prediction accuracy has stalled"
          body="Core monitoring and predictive modeling methods have plateaued, and current approaches to tracking values like thermal margins and eigenvalues often diverge from what plants actually measure. Left unaddressed, that gap drives operational inefficiency, poor fuel utilization, and greater regulatory scrutiny, all while raising real questions about safety and economic viability."
          image={media.nuclear}
          imageSide="right"
        />
        <FeatureRow
          eyebrow="The solution"
          heading="A physics-based framework for correcting bias"
          body="EDIM applies a mathematically rigorous inference analysis to identify and correct the sources of calculational bias in predictive models, avoiding the overfitting, underfitting, and error compensation that limit existing methods. The result is a prediction that reliably tracks measured plant data instead of drifting from it."
          bullets={[
            "Identifies and corrects calculational bias at its source",
            "Avoids overfitting, underfitting, and error compensation",
            "Keeps predictions aligned with real-time operational data",
          ]}
          image={media.operations}
          imageSide="left"
        />
        <FeatureRow
          eyebrow="The benefits"
          heading="What accurate prediction is worth"
          body="Closing the gap between predicted and measured performance gives operators earlier warning of degraded conditions, from instrumentation drift to operational anomalies, and greater confidence in the margins they operate with. Correcting for calculational bias is estimated to save $200M–$500M per plant over its operational lifetime by mitigating power derates and cycle inefficiencies."
          image={media.dataCenter}
          imageSide="right"
        />
      </div>

      {/* Stat band */}
      <Reveal as="section" className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-24">
        {edim.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </Reveal>

      {/* Core Specifications */}
      <section className="mt-16 md:mt-24">
        <h2 className="text-ink text-2xl font-bold">Core Specifications</h2>
        <div className="mt-6">
          <SpecTable
            caption="EDIM core specifications"
            rows={edim.specifications}
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-line mt-16 flex flex-wrap items-center justify-between gap-6 border p-8 md:mt-24">
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
