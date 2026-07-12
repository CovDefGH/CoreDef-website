import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { media } from "@/content/media";
import { hubs } from "@/content/locations";

export const metadata: Metadata = {
  title: "Global Operations",
  description:
    "Core Defenses global strategy and operations hubs, regional coverage, and compliance posture across a worldwide deployment footprint.",
};

const certifications = [
  "ISO 27001",
  "SOC 2 Type II",
  "NIST CSF",
  "FedRAMP High",
];

export default function GlobalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Header */}
      <p className="text-primary flex items-center gap-2 text-sm font-medium">
        <span
          aria-hidden
          className="bg-accent inline-block size-1.5 rounded-full"
        />
        Worldwide Footprint
      </p>
      <h1 className="text-ink mt-4 text-4xl font-bold md:text-5xl">
        Global Strategy & Operations Hubs
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg leading-relaxed">
        Our headquarters anchors nuclear data analytics and secure
        communications engineering, with a planned regional footprint built to
        support critical-infrastructure operators across the Americas, EMEA, and
        APAC.
      </p>

      {/* Banner */}
      <div className="border-line relative mt-12 aspect-[21/9] overflow-hidden border">
        <Image
          src={media.operations.src}
          alt={media.operations.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover"
          priority
        />
      </div>

      {/* Operations hub cards */}
      <Reveal
        as="section"
        className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-4"
      >
        {hubs.map((hub) => {
          const isActive = hub.status === "ACTIVE";
          return (
            <MotionCard
              key={hub.id}
              className="border-line hover:border-accent flex h-full flex-col border bg-white p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-ink text-lg font-bold">
                  {hub.city}, {hub.country}
                </h3>
                <span className="text-ink-muted border-line shrink-0 border px-2 py-0.5 text-xs font-medium">
                  {hub.regionTag}
                </span>
              </div>

              <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                {hub.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {hub.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="text-ink-muted border-line border px-2 py-0.5 text-xs"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-2 pt-6">
                <span
                  aria-hidden
                  className={`inline-block size-2 rounded-full motion-reduce:animate-none ${
                    isActive ? "bg-accent animate-pulse" : "bg-ink-muted/40"
                  }`}
                />
                <span
                  className={`text-xs font-medium tracking-wide ${
                    isActive ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {hub.status}
                </span>
              </div>
            </MotionCard>
          );
        })}
      </Reveal>

      {/* Global Compliance */}
      <Reveal as="section" className="border-line mt-16 border p-8 md:mt-24">
        <h2 className="text-ink text-2xl font-bold">Global Compliance</h2>
        <p className="text-ink-muted mt-3 max-w-2xl text-sm leading-relaxed">
          We align our security program to recognized frameworks and pursue
          formal attestations in step with customer and regulatory requirements.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <li
              key={cert}
              className="text-ink border-line flex items-center gap-2 border px-3 py-1.5 text-sm font-medium"
            >
              {cert}
              <span className="text-ink-muted text-xs font-normal">Target</span>
            </li>
          ))}
        </ul>
        <p className="text-ink-muted mt-6 text-xs">
          Compliance posture — status confirmed with each engagement. Framework
          alignment reflects our target posture, not a claim of held
          certification.
        </p>
      </Reveal>
    </div>
  );
}
