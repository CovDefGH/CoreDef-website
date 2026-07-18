"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 40;

export function HeroScrollScene() {
  preload("/immersive/hero/frame-001.jpg", { as: "image" });
  
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* useEffect (not useLayoutEffect) — runs after paint so DOM measurements
     are stable and the CSS sticky layout is already committed. */
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!root || !canvas || !content) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-res canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    // Preload image sequence
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/immersive/hero/frame-${i.toString().padStart(3, "0")}.jpg`;
      images.push(img);
    }

    const render = (frameIndex: number) => {
      // 1-indexed frames mapped from 1 to FRAME_COUNT
      const img = images[frameIndex - 1];
      if (img && img.complete) {
        if (img.naturalHeight !== 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      } else if (img) {
        img.onload = () => {
          if (img.naturalHeight !== 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
    };

    // Draw initial frame
    render(1);

    const frameObj = { frame: 1 };

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
          scrub: true,
        },
      });

      // Scrub the image sequence
      timeline.to(
        frameObj,
        {
          frame: FRAME_COUNT,
          snap: "frame",
          onUpdate: () => render(frameObj.frame),
        },
        0
      );

      // Scale and move the canvas
      timeline
        .to(canvas, { scale: 1.13, xPercent: -5, yPercent: -2 }, 0)
        .to(content, { yPercent: -12, opacity: 0 }, 0.3);

    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="immersive-hero"
    >
      {/* CSS sticky pin — reliable across all browsers, no GSAP spacer issues */}
      <div
        className="sticky top-0 h-dvh overflow-hidden bg-[#dcebf1]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_45%] will-change-[transform]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,28,.73)_0%,rgba(5,18,28,.38)_43%,rgba(5,18,28,.04)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,28,.38)_0%,transparent_52%)]" />

        <div ref={contentRef} className="relative mx-auto flex h-dvh max-w-6xl items-end px-4 pt-[calc(8rem_+_env(safe-area-inset-top))] pb-12 md:px-6 md:pb-16 will-change-[transform,opacity]">
          <div className="max-w-3xl">
            <p className="immersive-kicker">Core Defenses</p>
            <h1
              className="mt-5 max-w-4xl text-[clamp(2rem,5vmin,3.5rem)] leading-[1.05] font-semibold tracking-[-.02em] text-white md:font-bold"
            >
              Precision analytics <br className="hidden md:block" /> for critical infrastructure.
              <span className="block text-[#7bc8ff] mt-2 text-[clamp(1.5rem,4vmin,2.75rem)]">
                Resilient communications <br className="hidden md:block" /> for contested environments.
              </span>
            </h1>
            <p
              className="mt-7 max-w-xl text-base leading-relaxed text-white/82 md:text-lg"
            >
              Core Defenses builds EDIM, a predictive analytics platform for nuclear plants, and ENADOX, a secure communications platform for defense and industrial operations.
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
