import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { CTALink } from "@/components/ui/CTALink";
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
      <h1 className="text-ink mt-8 text-4xl font-bold md:text-5xl">
        {enadox.name}
      </h1>
      <p className="text-ink-muted mt-5 text-justify text-lg leading-relaxed">
        {enadox.tagline}
      </p>

      {/* Use cases */}
      <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <FeatureRow
          heading="Redundancy built into the data itself"
          body="ENADOX solves the problem of inherently insecure and fragile OT assets on the shopfloor that is a patchwork of legacy and modern equipment. It retrofits them with self-healing capabilities with the singular objective of maintaining system uptime during contingencies. ENADOX devices merge seamlessly into existing architecture and communication protocols by self-healing at the process data level, and software plugins integrate into existing SCADA, SIEM, and HMI interfaces to alert operators to data falsification."
          image={media.enadoxSupport2}
          imageSide="right"
        />

        <FeatureRow
          heading="Secure communication where links are denied"
          body="ENADOX augments communication systems with covert communication capabilities that maintain secure contact in adversarial, open, as well as denied, disrupted, intermittent, and limited environments. In adversarial settings, retrofitted systems can autonomously retask to transmit sensitive information embedded within a seemingly benign artificial layer—for example, drone imagery communicated through temperature sensors or pilot audio transmitted through IMU measurements. ENADOX transforms data at the source to protect communications from inspection and interception across open channels, including applications such as WhatsApp or Signal on unlocked devices and unencrypted radio communications."
          image={media.enadoxSupport1}
          imageSide="left"
        />

        <FeatureRow
          heading="Mission continuity as conditions degrade"
          body="ENADOX keeps operations connected as bandwidth narrows and links become intermittent. Communication continues as individual links fail or degrade."
          image={media.comms}
          imageSide="right"
        />
      </div>

      {/* Closing CTA */}
      <section className="border-line mt-16 flex flex-wrap items-center justify-between gap-6 border p-8 md:mt-24">
        <div>
          <h2 className="text-ink text-xl font-bold">
            Talk through your mission requirements
          </h2>
          <p className="text-ink-muted mt-1 max-w-2xl text-justify text-sm">
            Tell us about the environments you operate in and the platforms
            you need to keep connected. Our team will walk you through how
            ENADOX fits.
          </p>
        </div>
        <CTALink href="/contact">Contact the ENADOX Team</CTALink>
      </section>
    </div>
  );
}
