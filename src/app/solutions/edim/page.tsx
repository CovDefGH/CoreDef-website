import type { Metadata } from "next";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { StatCard } from "@/components/sections/StatCard";
import { SpecTable } from "@/components/sections/SpecTable";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/content/media";
import { edim } from "@/content/products/edim";

export const metadata: Metadata = {
  title: "EDIM — Nuclear Data Analytics",
  description:
    "EDIM reduces nuclear data uncertainty to recover thermal margin — improving reactor economics through better prediction, not conservatism.",
};

export default function EdimPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Header */}
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
      <p className="text-ink-muted mt-5 max-w-2xl text-lg leading-relaxed">
        {edim.tagline}
      </p>

      {/* Use-case blocks — alternating image sides */}
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          eyebrow="The problem"
          heading="The thermal margin problem"
          body="Nuclear data carries a lot of uncertainty. That uncertainty propagates through simulation and widens the uncertainty band on predicted thermal margin. To stay on the safe side of that widened band, operators must run conservatively — leaving real capability on the table."
          image={media.nuclear}
          imageSide="right"
        />
        <FeatureRow
          eyebrow="The approach"
          heading="How EDIM narrows uncertainty"
          body="EDIM identifies and narrows the underlying nuclear-data uncertainty, which reduces the uncertainty penalty carried through to predicted thermal margin. The result is a better prediction of true capability rather than stacked worst-case conservatism."
          bullets={[
            "Best-estimate-plus-uncertainty methods in place of layered margins",
            "Uncertainty quantified across the full fuel cycle",
            "Integrates with standard nuclear data libraries and simulation toolchains",
          ]}
          image={media.operations}
          imageSide="left"
        />
        <FeatureRow
          eyebrow="The outcome"
          heading="What recovered margin is worth"
          body="Recovered margin translates into higher allowable power output, longer fuel cycles, and more flexible operation. Across a reactor's lifetime, that improvement in reactor economics is estimated at roughly $300M–$500M per reactor."
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
