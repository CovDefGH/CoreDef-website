import type { Metadata } from "next";
import { Mail, MapPin, ExternalLink, Briefcase } from "lucide-react";
import { CTALink } from "@/components/ui/CTALink";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Core Defenses team by email, find our operations location, and explore careers.",
};

export default function ContactPage() {
  const { email, address, mapEmbedUrl, mapPlaceUrl } = site;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-ink text-4xl font-bold md:text-5xl">Contact</h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg">
        Reach the Core Defenses team. Tell us about your program or inquiry and
        we&apos;ll route it to the right group.
      </p>

      <Reveal as="section" className="mt-14 max-w-3xl">
        <h2 className="text-ink text-2xl font-bold md:text-3xl">
          About Core Defenses
        </h2>
        <p className="text-ink-muted mt-6 text-justify text-lg leading-relaxed">
          At Core Defenses, we are a technology-driven small business
          specializing in advanced analytics, artificial intelligence, and
          cybersecurity solutions for high-reliability industries, including
          nuclear energy. Our mission is to bridge the gap between
          calculational modeling and real-world decision-making by delivering
          scalable, explainable, and regulatory-compliant technologies. With
          expertise in physics-based modeling, uncertainty quantification, and
          AI/ML-driven predictive intelligence, we develop cutting-edge
          software solutions that enhance operational safety, performance, and
          security.
        </p>
        <p className="text-ink-muted mt-6 text-justify text-lg leading-relaxed">
          We believe our products embody our commitment to the goal of energy
          resilience—the strategic approach to anticipate, absorb, adapt to,
          and rapidly recover from severe disruptions. Since our founding, we
          have raised over $5M to develop our products, using a combination of
          non-dilutive grants, pilot projects, and revenue from our extensive
          network of customers and collaborators including national
          laboratories, nuclear fuel vendors, and federal agencies. We are
          also advised by a team of business and technical experts from
          industry and academia, who facilitate our breakthroughs and expand
          our outreach into the broader energy sector.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {/* Contact card */}
        <Reveal className="border-line flex flex-col border">
          <div className="border-line border-b p-6">
            <div className="flex items-start gap-4">
              <span className="bg-surface border-line inline-flex border p-3">
                <Mail aria-hidden size={20} className="text-primary" />
              </span>
              <div>
                <h2 className="text-ink text-sm font-semibold">Email</h2>
                <a
                  href={`mailto:${email}`}
                  className="text-primary hover:text-ink mt-1 inline-block text-lg font-medium transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          <div className="border-line border-b p-6">
            <div className="flex items-start gap-4">
              <span className="bg-surface border-line inline-flex border p-3">
                <MapPin aria-hidden size={20} className="text-primary" />
              </span>
              <div>
                <h2 className="text-ink text-sm font-semibold">
                  Operations Location
                </h2>
                <address className="text-ink-muted mt-1 text-sm not-italic">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.city}
                </address>
                <a
                  href={mapPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-ink mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink aria-hidden size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-surface flex items-start gap-4 p-6">
            <span className="border-line inline-flex border bg-white p-3">
              <Briefcase aria-hidden size={20} className="text-primary" />
            </span>
            <div>
              <h2 className="text-ink text-sm font-semibold">
                Looking to join?
              </h2>
              <p className="text-ink-muted mt-1 text-sm">
                We&apos;re hiring across engineering.
              </p>
              <div className="mt-3">
                <CTALink href="/careers" variant="secondary">
                  View Careers
                </CTALink>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Map embed */}
        <Reveal className="border-line min-h-[360px] border">
          <iframe
            title={`Map showing Core Defenses operations location at ${address.line1}, ${address.city}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[360px] w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
