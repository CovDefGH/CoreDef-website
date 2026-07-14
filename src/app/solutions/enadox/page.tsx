import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { SpecTable } from "@/components/sections/SpecTable";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/content/media";
import { enadox } from "@/content/products/enadox";

export const metadata: Metadata = {
  title: "ENADOX: Secure Communications",
  description:
    "ENADOX enables resilient, secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments.",
};

export default function EnadoxPage() {
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
      <Reveal as="section" className="mt-8 max-w-3xl">
        <h1 className="text-ink text-4xl font-bold md:text-5xl">
          {enadox.name}
        </h1>
        <p className="text-ink-muted mt-5 text-lg leading-relaxed">
          {enadox.tagline}
        </p>
      </Reveal>

      {/* Use cases */}
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          eyebrow="Self-healing redundancy"
          heading="Redundancy built into the data itself"
          body="ENADOX enables secure communication between platforms by transforming the data they exchange, with self-healing built in. One sensor's data can be embedded within another, so if a sensor fails, the original can be reconstructed. It is a kind of inbuilt redundancy that keeps information available even as sources drop."
          bullets={[
            "Secure data exchange across otherwise separate platforms",
            "Cross-source embedding for reconstruction when a sensor fails",
            "Redundancy that lives in the data, not just the network",
          ]}
          image={media.dataCenter}
          imageSide="right"
        />

        <FeatureRow
          eyebrow="Contested environments"
          heading="Secure communication where links are denied"
          body="ENADOX supports secure communication in both open and denied environments, with proven military use cases. It carries traffic over software-defined radio, sustains communication in DDIL conditions, and coordinates drone-swarm navigation where conventional links break down."
          bullets={[
            "Software-defined radio (SDR) links",
            "Communication in denied, degraded, intermittent, and limited-bandwidth (DDIL) environments",
            "Drone-swarm navigation in denied environments",
          ]}
          image={media.comms}
          imageSide="left"
        />

        <FeatureRow
          eyebrow="Resilient by design"
          heading="Mission continuity as conditions degrade"
          body="Critical operations cannot pause when the environment turns hostile. ENADOX is resilient by design, keeping mission critical operations connected as bandwidth narrows and links come and go, so teams stay coordinated when it matters most."
          image={media.operations}
          imageSide="right"
        />
      </div>

      {/* Specifications */}
      <Reveal as="section" className="mt-16 md:mt-24">
        <h2 className="text-ink text-2xl font-bold md:text-3xl">At a glance</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
          <dl className="space-y-6">
            {enadox.stats.map(({ label, value, description }) => (
              <div key={label} className="border-line border p-6">
                <dt className="text-ink-muted text-sm">{label}</dt>
                <dd className="text-ink mt-2 text-2xl font-bold">{value}</dd>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </dl>
          <SpecTable
            caption="ENADOX specifications"
            rows={enadox.specifications}
          />
        </div>
      </Reveal>

      {/* Closing CTA */}
      <Reveal as="section" className="mt-16 md:mt-24">
        <div className="border-line border p-8 md:p-12">
          <h2 className="text-ink text-2xl font-bold md:text-3xl">
            Talk through your mission requirements
          </h2>
          <p className="text-ink-muted mt-4 max-w-2xl leading-relaxed">
            Tell us about the environments you operate in and the platforms you
            need to keep connected. Our team will walk you through how ENADOX
            fits.
          </p>
          <div className="mt-8">
            <CTALink href="/contact">Contact the ENADOX Team</CTALink>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
