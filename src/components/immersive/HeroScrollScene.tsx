"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_START_SECONDS = 4;
const VIDEO_END_SECONDS = 16;

export function HeroScrollScene() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  /* On mount, check if the video is already playable (cached / fast network).
     The onCanPlay JSX handler only fires for events AFTER hydration; if the
     browser loaded the video before React mounted, the event is missed. */
  useEffect(() => {
    const video = videoRef.current;
    if (
      video &&
      video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVideoReady(true);
    }
  }, []);

  /* useEffect (not useLayoutEffect) — runs after paint so DOM measurements
     are stable and the CSS sticky layout is already committed. */
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!root || !video || !content) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    /* No GSAP pin — the stage div uses CSS `position: sticky; top: 0`
       (the same reliable pattern the chapter sections use). GSAP only
       handles the scroll-scrubbed text/video animations. */
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      timeline
        .to(video, { scale: 1.13, xPercent: -5, yPercent: -2 }, 0)
        .to(content, { yPercent: -12, opacity: 0 }, 0.3);

      const scrubVideo = () => {
        const duration = Math.min(
          video.duration || VIDEO_END_SECONDS,
          VIDEO_END_SECONDS,
        );
        const from = Math.min(VIDEO_START_SECONDS, duration);
        const to = Math.max(from, duration);

        video.currentTime = from;
        gsap.to(video, {
          currentTime: to,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
          },
        });
      };

      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        scrubVideo();
      } else {
        video.addEventListener("loadedmetadata", scrubVideo, { once: true });
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative -mt-[calc(4rem_+_env(safe-area-inset-top))] h-[120vh]"
    >
      {/* CSS sticky pin — reliable across all browsers, no GSAP spacer issues */}
      <div
        className="sticky top-0 h-dvh overflow-hidden bg-[#dcebf1]"
      >
        <Image
          src="/immersive/hero/hero-v2.jpg"
          alt="Nuclear power plant cooling towers releasing steam against a blue sky."
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => {
            if (
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              setVideoReady(true);
            }
          }}
          className={`absolute inset-0 h-full w-full object-cover object-[58%_45%] transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/immersive/hero/watts-bar-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,28,.73)_0%,rgba(5,18,28,.38)_43%,rgba(5,18,28,.04)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,28,.38)_0%,transparent_52%)]" />

        <div ref={contentRef} className="relative mx-auto flex h-dvh max-w-6xl items-end px-4 pt-[calc(8rem_+_env(safe-area-inset-top))] pb-12 md:px-6 md:pb-16">
          <div className="max-w-3xl">
            <p className="immersive-kicker">Core Defenses</p>
            <h1
              className="mt-5 max-w-3xl text-[clamp(2.7rem,7.5vw,6.5rem)] leading-[.92] font-semibold tracking-[-.055em] text-white"
            >
              Software built for the real world.
            </h1>
            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-white/82 md:text-lg"
            >
              We build predictive tools and secure networks for critical infrastructure.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTALink href="/solutions">Explore solutions</CTALink>
              <CTALink href="/contact" variant="ghost">
                Contact us
              </CTALink>
            </div>
          </div>

          <a
            href="#edim"
            className="group absolute right-4 bottom-6 hidden items-center gap-3 text-xs tracking-[.18em] text-white/70 uppercase hover:text-white md:right-6 md:flex"
          >
            Scroll to enter
            <ArrowDown
              size={15}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
