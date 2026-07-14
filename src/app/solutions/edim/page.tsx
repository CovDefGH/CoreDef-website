import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { StatCard } from "@/components/sections/StatCard";
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
          heading="Improving the Best Estimate"
          body="State-of-the-art predictive modeling paradigms used to track core observables such as thermal margins and eigenvalues are inadequate for modern operational demands in a competitive energy market. These result in operational inefficiencies, suboptimal fuel utilization, and increased regulatory scrutiny."
          image={media.nuclear}
          imageSide="right"
        />
        <FeatureRow
          heading="A Patented Physics-Based Methodology to Correct Bias"
          body="EDIM applies a mathematically rigorous inference analysis to identify and correct the sources of calculational bias in predictive models, avoiding issues such as overfitting, underfitting, and error compensation that plague existing methods. The result is a prediction that reliably tracks measured plant data instead of drifting from it."
          bullets={[
            "Identifies and corrects calculational bias at its source",
            "Avoids overfitting, underfitting, and error compensation",
            "Keeps predictions aligned with real-time operational data",
          ]}
          image={media.operations}
          imageSide="left"
        />
        <FeatureRow
          heading="$200M–$500M in Recovered Operational Efficiencies"
          body="These efficiencies come from reducing power derates, improving operational margins, and mitigating cycle inefficiencies, giving operators earlier warning of degraded conditions and greater confidence in the margins they operate with."
          image={media.dataCenter}
          imageSide="right"
        />
      </div>

      {/* Stat band */}
      <Reveal as="section" className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-24">
        {edim.stats.map((stat) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </Reveal>

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
