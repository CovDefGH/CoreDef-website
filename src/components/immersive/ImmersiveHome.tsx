"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";
import { HeroScrollScene } from "@/components/immersive/HeroScrollScene";
import { media } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  id: string;
  index: string;
  label: string;
  title: string;
  copy: string;
  image: { src: string; alt: string };
  href: string;
  action: string;
  align?: "left" | "right";
};

const gridItems = [
  { image: media.nuclear, caption: "Nuclear" },
  { image: media.energy, caption: "Energy" },
  { image: media.comms, caption: "Communications" },
  { image: media.dataCenter, caption: "Industrial" },
];

const chapters: Chapter[] = [
  {
    id: "edim",
    index: "01",
    label: "Nuclear Analytics",
    title: "Improving the Best Estimate.",
    copy: "EDIM is a physics-based framework that identifies and corrects calculational bias. It reduces prediction error and keeps predictive models aligned with real-time operational data.",
    image: media.operations,
    href: "/solutions/edim",
    action: "Explore EDIM",
  },
  {
    id: "enadox",
    index: "02",
    label: "Secure Communications",
    title: "Redundancy built into the data itself.",
    copy: "ENADOX provides secure communication across denied, degraded, intermittent, and low-bandwidth (DDIL) environments.",
    image: media.comms,
    href: "/solutions/enadox",
    action: "Explore ENADOX",
    align: "right",
  },
  {
    id: "industries",
    index: "03",
    label: "Where we operate",
    title: "Sectors where failure has physical consequences.",
    copy: "We build for nuclear, energy, defense, and industrial operations—environments where accuracy, continuity, and disciplined engineering matter.",
    image: media.energy,
    href: "/industries",
    action: "View industries",
  },
];

const industries = ["Nuclear", "Energy", "Defense", "Industrial"];

export function ImmersiveHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* useEffect (not useLayoutEffect) — the hero's ScrollTrigger.pin() inserts
     a spacer div that changes the document height. If we measure before the
     hero pin is committed to layout the chapter trigger positions are wrong
     and copy stays invisible. useEffect fires after paint, so the hero
     spacer is settled and measurements are correct. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) return;

      const chapterEls =
        gsap.utils.toArray<HTMLElement>(".immersive-chapter");
      chapterEls.forEach((chapter) => {
        const image = chapter.querySelector(".immersive-chapter-image");
        const copy = chapter.querySelector(".immersive-copy");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.06 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        const decor = chapter.querySelector(".chapter-decor");
        if (decor) {
          gsap.to(decor, {
            rotation: 120,
            yPercent: -150,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        /* Copy reveal: use triggered stagger instead of scrub for snappier feel */
        if (copy && copy.children.length > 0) {
          gsap.from(copy.children, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.15,
            immediateRender: false,
            scrollTrigger: {
              trigger: chapter,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Grid cards reveal (skiper104 style)
      const gridCards = gsap.utils.toArray<HTMLElement>(".grid-card-reveal");
      if (gridCards.length) {
        gsap.fromTo(
          gridCards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".grid-cards-container",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image reveal (skiper71 style)
      const imageReveals = gsap.utils.toArray<HTMLElement>(".image-reveal-container");
      imageReveals.forEach((container) => {
        gsap.fromTo(
          container,
          { clipPath: "inset(15% 10% 15% 10%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              end: "center 60%",
              scrub: 1,
            },
          }
        );
      });

      /* Re-measure after all triggers exist so pin offsets are accurate. */
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="immersive-page bg-[#09111d] text-white">
      <HeroScrollScene />

      <section className="border-y border-white/15 bg-[#0d1724]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-6 md:py-14">
          <p className="max-w-2xl text-lg leading-relaxed text-white/82 md:text-2xl">
            Two platforms: EDIM for predictive analytics, ENADOX for secure communications in degraded conditions.
          </p>
          <p className="font-mono text-[.66rem] leading-relaxed tracking-[.12em] text-[#7bc8ff] uppercase">
            Defense • Nuclear • Energy • Industrial Operations
          </p>
        </div>
      </section>

      {chapters.map((chapter) => (
        <section id={chapter.id} key={chapter.id} className="immersive-chapter">
          <div className="immersive-chapter-sticky">
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="100vw"
              className="immersive-chapter-image object-cover will-change-[transform]"
            />
            <div className="absolute inset-0 bg-[#07101a]/45" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,.84)_0%,rgba(4,10,18,.36)_55%,rgba(4,10,18,.58)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#040a12] to-transparent" />

            {/* Decorative GSAP-style shape (technical/nuclear artifact) */}
            <div className="chapter-decor absolute top-[25%] left-[60%] h-64 w-64 opacity-[0.04] pointer-events-none mix-blend-screen md:left-[75%] will-change-[transform]">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#7bc8ff] w-full h-full">
                <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(30 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(90 50 50)" />
                <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(150 50 50)" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
                <circle cx="50" cy="50" r="8" strokeDasharray="2 2" />
              </svg>
            </div>

            <div
              className={`relative mx-auto flex h-full max-w-6xl items-end px-4 py-16 md:px-6 md:py-24 ${chapter.align === "right" ? "md:justify-end" : ""}`}
            >
              <div className="immersive-copy max-w-2xl will-change-[transform,opacity]">
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
                  <span className="text-[#7bc8ff]">{chapter.index}</span>
                  <span>{chapter.label}</span>
                </p>
                <h2 className="mt-6 text-[clamp(3rem,6.5vw,6rem)] leading-[0.92] font-semibold tracking-[-.045em] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#7bc8ff]/40">
                  {chapter.title}
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl font-light">
                  {chapter.copy}
                </p>
                <Link
                  href={chapter.href}
                  className="group mt-8 inline-flex items-center gap-3 border-b border-[#7bc8ff] pb-2 text-sm font-medium text-white transition-colors hover:border-white"
                >
                  {chapter.action}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="border-y border-white/15 bg-[#eaf0f5] text-[#0c1723]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.2fr_.8fr] md:px-6 md:py-28">
          <div>
            <p className="immersive-kicker text-[#0052ff]">Core Capabilities</p>
            <h2 className="mt-5 max-w-3xl text-4xl leading-[.98] font-semibold tracking-[-.045em] md:text-6xl">
              Zero-Trust Architecture & Low-Latency Operations.
            </h2>
          </div>
          <div className="border-l border-[#0c1723]/15 pl-6 md:pt-14">
            <p className="text-base leading-relaxed text-[#405063]">
              Every channel authenticated, every payload verified. Response times measured in single-digit milliseconds.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#0c1723]/15 pt-6 font-mono text-[.7rem] tracking-[.12em] uppercase">
              {industries.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-[#09111d] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-16 max-w-2xl">
            <p className="immersive-kicker">Global Operations</p>
            <h2 className="mt-5 text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[.94] font-semibold tracking-[-.05em] text-white">
              Industries we serve.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              Energy, nuclear, defense, government, utilities, manufacturing. Headquarters in Lexington, KY. Expansion planned across the Americas, EMEA, and APAC.
            </p>
          </div>

          <div className="grid-cards-container grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {gridItems.map((item) => (
              <div
                key={item.caption}
                className="grid-card-reveal group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0d1724] will-change-[transform,opacity]"
              >
                <div className="image-reveal-container absolute inset-0 will-change-[transform]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 will-change-[transform] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a12]/90 via-[#040a12]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                      {item.caption}
                    </h3>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            <CTALink href="/contact">Contact us</CTALink>
            <CTALink href="/careers" variant="ghost">
              Join the team
            </CTALink>
          </div>
        </div>
      </section>
    </div>
  );
}
