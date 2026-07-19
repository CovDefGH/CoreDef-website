import Link from "next/link";
import Image from "next/image";
import { Atom, Radio } from "lucide-react";
import { CTALink } from "@/components/ui/CTALink";
import { Reveal } from "@/components/motion/Reveal";
import { MotionCard } from "@/components/motion/MotionCard";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { media } from "@/content/media";

// FR-HOME-3 — EDIM featured first per PRD §7 product priority.
const CAPABILITIES = [
  {
    icon: Atom,
    heading: "Nuclear Analytics",
    image: media.edimCover,
    description:
      "EDIM is a physics-based methodology for data assimilation that identifies, corrects, and traces discrepancies between calculational and measured observations, improving prediction accuracy and operational efficiency.",
    linkLabel: "Explore EDIM",
    href: "/solutions/edim",
  },
  {
    icon: Radio,
    heading: "Secure Communications",
    image: media.enadoxCover,
    description:
      "ENADOX is a data-centric transformative layer that embeds redundancy into the data itself, enabling resilient, self-healing communications across autonomous systems and contested environments.",
    linkLabel: "Explore ENADOX",
    href: "/solutions/enadox",
  },
];

// FR-HOME-6 — critical infrastructure visual strip.
const INFRASTRUCTURE = [
  { image: media.homeEnergy, caption: "Energy" },
  { image: media.homeDefense, caption: "Defense" },
  { image: media.homeFinance, caption: "Finance" },
  { image: media.homeAi, caption: "AI" },
];

export default function Home() {
  return (
    <>
      {/* Hero — FR-HOME-1/2. Full-bleed video, transparent nav overlaid (see
          NavBar), text on a directional gradient scrim: darkest left, where
          the copy sits, fading lighter to the right so the footage reads. */}
      <section className="relative -mt-[calc(4rem_+_env(safe-area-inset-top))] min-h-dvh overflow-hidden">
        <HeroVideo
          src={media.heroVideo.src}
          poster={media.heroVideo.poster}
          alt="Nuclear power plant operations footage."
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,10,25,.72) 0%, rgba(5,10,25,.55) 40%, rgba(5,10,25,.18) 100%)",
          }}
        />
        <div className="from-ink/50 absolute inset-0 bg-gradient-to-t to-transparent" />

        <div className="relative mx-auto flex min-h-dvh max-w-6xl items-center px-4 pt-[calc(4rem_+_env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)] md:px-6">
          <div className="max-w-2xl">
            {/* Sized with vmin (= min(vw, vh)) so the hero compresses on short
                viewports (small laptops, resized windows) the same way it
                already did on narrow ones — one fluid scale, no breakpoint
                that only accounts for width. */}
            <h1 className="text-[clamp(1.5rem,7vmin,3rem)] leading-[1.05] font-semibold text-white md:font-bold">
              Precision analytics
              <br />
              for critical infrastructure.
              <span className="text-accent mt-[clamp(0.5rem,2vmin,1rem)] block text-[clamp(1.125rem,5vmin,2.25rem)]">
                Resilient communications
                <br />
                for contested environments.
              </span>
            </h1>

            <p className="mt-[clamp(1.25rem,4.5vmin,2.25rem)] max-w-[60ch] text-justify text-[clamp(0.8rem,2.4vmin,1.125rem)] leading-snug text-white/85">
              Core Defenses builds EDIM, a physics-based data assimilation
              platform for nuclear operations, and ENADOX, a self-healing data
              protection layer for secure communications in contested and
              degraded environments.
            </p>

            <div className="mt-[clamp(1.5rem,5vmin,2.75rem)] flex flex-wrap gap-[clamp(0.5rem,2vmin,0.75rem)]">
              <CTALink href="/solutions" compact>
                Explore Solutions
              </CTALink>
              <CTALink href="/contact" variant="ghost" compact>
                Contact Us
              </CTALink>
            </div>

            <p className="mt-[clamp(1rem,3.5vmin,2rem)] text-[clamp(0.6rem,1.8vmin,0.75rem)] tracking-widest text-white/60 uppercase">
              Energy &middot; Defense &middot; Finance &middot; AI
            </p>
          </div>
        </div>
      </section>

      {/* Core Capabilities — FR-HOME-3 (EDIM first) */}
      <Reveal as="section" className="border-line bg-surface border-y">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-ink text-3xl font-bold">Core Capabilities</h2>
          <p className="text-ink-muted mt-3 max-w-2xl text-justify">
            Two platforms: EDIM for predictive analytics, ENADOX for secure
            communications in degraded conditions.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map(
              ({ icon: Icon, heading, image, description, linkLabel, href }) => (
                <MotionCard
                  key={heading}
                  className="border-line hover:border-accent border bg-white p-8 transition-colors"
                >
                  <div className="border-line relative mb-6 aspect-[16/9] overflow-hidden border">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="bg-surface border-line inline-flex border p-3">
                    <Icon aria-hidden size={22} className="text-primary" />
                  </span>
                  <h3 className="text-ink mt-5 text-xl font-bold">{heading}</h3>
                  <p className="text-ink-muted mt-3 text-justify text-sm leading-relaxed">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="text-primary hover:text-ink mt-5 inline-block text-sm font-medium transition-colors"
                  >
                    {linkLabel} →
                  </Link>
                </MotionCard>
              ),
            )}
          </div>
        </div>
      </Reveal>

      {/* Critical infrastructure strip — FR-HOME-6 */}
      <Reveal
        as="section"
        className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
      >
        <h2 className="text-ink text-3xl font-bold">Where we operate</h2>
        <p className="text-ink-muted mt-3 max-w-2xl text-justify">
          We build for sectors that depend on accurate data and secure
          operations: energy, defense, finance, and AI.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFRASTRUCTURE.map(({ image, caption }) => (
            <li
              key={caption}
              className="border-line relative aspect-[4/5] overflow-hidden border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-ink/70 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4">
                <p className="text-sm font-semibold text-white">{caption}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Outbound paths — FR-HOME-8 */}
      <Reveal as="section" className="border-line border-b">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-6">
          <div>
            <h2 className="text-ink text-2xl font-bold">
              Industries we serve.
            </h2>
            <p className="text-ink-muted mt-2 text-justify text-sm">
              Energy, nuclear, defense, government, utilities, manufacturing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTALink href="/industries" variant="secondary">
              Industries
            </CTALink>
            <CTALink href="/careers" variant="secondary">
              Careers
            </CTALink>
          </div>
        </div>
      </Reveal>
    </>
  );
}
