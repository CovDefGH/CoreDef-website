import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CTALink } from "@/components/ui/CTALink";
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
      <p className="text-ink-muted mt-5 max-w-2xl text-justify text-lg leading-relaxed">
        {edim.tagline}
      </p>

      {/* Use-case blocks — alternating image sides */}
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          heading="Improving the Best Estimate"
          body="Predictive models used to track thermal margins and eigenvalues are often biased due to their inherent assumptions and have uncertainties that can be traced back to nuclear data. This often leads to overly conservative thermal margins leading to operational inefficiencies, suboptimal fuel utilization, and increased regulatory scrutiny. EDIM substantially improves the economics of a reactor by systematically accounting for these sources of bias and uncertainties in a manner consistent with the physics of the reactor."
          image={media.edimSupport1}
          imageSide="right"
        />
        <FeatureRow
          heading="A Patented Physics-Based Methodology to Correct Bias"
          body="EDIM applies information-theoretic tools to analyze, identify and correct the sources of calculational bias in predictive models. The mathematical rigor of information theory allows EDIM to solve the phenomena of underfitting, overfitting, and error compensation often encountered in extant methods. EDIM operates within established NRC-licensed methodologies, ensuring that our innovations are not only technically superior but also commercially viable and regulatory-compliant."
          image={media.controlRoom}
          imageSide="left"
        />
        <FeatureRow
          heading="$200M–$500M in Recovered Operational Efficiencies"
          body="Current mitigation strategies for eigenvalue and thermal margin biases often involve detuning core designs, requiring the addition of 4–12 extra fuel bundles per cycle. A 1% reduction in reactor power output due to thermal margin bias or eigenvalue uncertainties results in millions of dollars in lost annual revenue per reactor. Applying EDIM results in substantial cost savings for nuclear utilities by mitigating power derates and cycle inefficiencies."
          image={media.edimSupport2}
          imageSide="right"
        />
      </div>

      {/* Closing CTA */}
      <section className="border-line mt-16 flex flex-wrap items-center justify-between gap-6 border p-8 md:mt-24">
        <div>
          <h2 className="text-ink text-xl font-bold">
            Evaluate EDIM for your program.
          </h2>
          <p className="text-ink-muted mt-1 text-justify text-sm">
            Business and government inquiries route directly to the EDIM team.
          </p>
        </div>
        <CTALink href="/contact">Contact the EDIM Team</CTALink>
      </section>
    </div>
  );
}
