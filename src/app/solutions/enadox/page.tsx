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
    "ENADOX enables secure communication across platforms in denied, degraded, intermittent, and limited-bandwidth environments.",
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
          heading="Redundancy built into the data itself"
          body="ENADOX solves the problem of inherently insecure and fragile OT assets on the shopfloor that is a patchwork of legacy and modern equipment. It retrofits them with self-healing capabilities with the singular objective of maintaining system uptime during contingencies."
          bullets={[
            "ENADOX devices merge seamlessly into existing architecture and communication protocols by self-healing at the process data level.",
            "Software plugins integrate into existing SCADA, SIEM, and HMI interfaces to alert operators to data falsification.",
          ]}
          image={media.dataCenter}
          imageSide="right"
        />

        <FeatureRow
          heading="Secure communication where links are denied"
          body="ENADOX augments communication systems with covert communication capabilities that maintain secure contact in adversarial, open, as well as denied, disrupted, intermittent, and limited environments."
          bullets={[
            "In adversarial settings, retrofitted systems can autonomously retask to transmit sensitive information embedded within a seemingly benign artificial layer—for example, drone imagery communicated through temperature sensors or pilot audio transmitted through IMU measurements.",
            "ENADOX transforms data at the source to protect communications from inspection and interception across open channels, including applications such as WhatsApp or Signal on unlocked devices and unencrypted radio communications.",
          ]}
          image={media.comms}
          imageSide="left"
        />

        <FeatureRow
          heading="Mission continuity as conditions degrade"
          body="ENADOX keeps operations connected as bandwidth narrows and links become intermittent. Communication continues as individual links fail or degrade."
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
            rows={enadox.specifications ?? []}
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
