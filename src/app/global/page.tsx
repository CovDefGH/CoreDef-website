import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { StatCard } from "@/components/sections/StatCard";
import { FeatureRow } from "@/components/sections/FeatureRow";
import { media } from "@/content/media";
import { hubs } from "@/content/locations";

export const metadata: Metadata = {
  title: "Global Operations",
  description:
    "Core Defenses operations hubs and regional coverage across a worldwide deployment footprint.",
};

const REGIONS = ["Americas", "EMEA", "APAC"];

export default function GlobalPage() {
  const active = hubs.filter((hub) => hub.status === "ACTIVE");
  const planned = hubs.filter((hub) => hub.status === "PLANNED");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      {/* Header */}
      <h1 className="text-ink text-4xl font-bold md:text-5xl">
        Global Operations
      </h1>
      <p className="text-ink-muted mt-5 max-w-2xl text-lg leading-relaxed">
        Our headquarters anchors nuclear data analytics and secure
        communications engineering, with a regional footprint planned to
        support critical infrastructure operators across the Americas, EMEA,
        and APAC.
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

      {/* Footprint at a glance */}
      <Reveal
        as="section"
        className="mt-16 grid gap-6 sm:grid-cols-3 md:mt-24"
      >
        <StatCard
          label="Active Hubs"
          value={String(active.length)}
          description="Operations hub live today."
        />
        <StatCard
          label="Target Regions"
          value={String(REGIONS.length)}
          description={REGIONS.join(", ")}
        />
        <StatCard
          label="Coverage"
          value="24/7"
          description="Zero-trust operations, monitored around the clock."
        />
      </Reveal>

      {/* Headquarters spotlight */}
      <div className="mt-16 space-y-16 md:mt-24">
        {active.map((hub) => (
          <FeatureRow
            key={hub.id}
            heading={`${hub.city}, ${hub.country} — Headquarters`}
            body={hub.description}
            bullets={hub.specialties}
            image={media.dataCenter}
            imageSide="right"
          />
        ))}
      </div>

      {/* Planned hubs */}
      {planned.length > 0 && (
        <Reveal as="section" className="mt-16 md:mt-24">
          <h2 className="text-ink text-2xl font-bold md:text-3xl">
            Planned expansion
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planned.map((hub) => (
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
                    className="bg-ink-muted/40 inline-block size-2 rounded-full"
                  />
                  <span className="text-ink-muted text-xs font-medium tracking-wide">
                    {hub.status}
                  </span>
                </div>
              </MotionCard>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
