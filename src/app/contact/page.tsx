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
      <p className="text-primary text-sm font-medium">Get in Touch</p>
      <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">Contact</h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg">
        Reach the Core Defenses team. Tell us about your program or inquiry and
        we&apos;ll route it to the right group.
      </p>

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
