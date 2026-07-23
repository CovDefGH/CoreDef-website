"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { Pointer } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTALink } from "@/components/ui/CTALink";

gsap.registerPlugin(ScrollTrigger);

// 200 frames extracted natively at 24fps from the 4K source clip, downsampled
// to 1920x1080 — decoding the full native 4K frame set held ~1.3GB of bitmap
// data in memory at once, over iOS Safari's per-tab budget and the likely
// cause of the "A problem repeatedly occurred" crash loop on iPhone.
const FRAME_START = 75;
const FRAME_COUNT = 115;
const FRAME_W = 1920;
const FRAME_H = 1080;
// First N frames load eagerly (covers the dwell + early-scrub range); the rest
// load on browser idle time so they don't compete with the eager ones for
// bandwidth/decode time on initial page load.
const EAGER_FRAMES = 24;
const frameSrc = (i: number) =>
  `/immersive/hero/frame-${i.toString().padStart(3, "0")}.jpg`;

// Cancellable idle scheduling — returns a canceller so unmount can stop
// pending decodes instead of letting them keep firing (and retaining
// decoded images) after the component's gone.
const scheduleIdle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
};

export function HeroScrollScene() {
  preload(frameSrc(FRAME_START), { as: "image" });

  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  // Independent fallback asset — if frame-075.jpg itself fails to load, the
  // canvas's first frame fails the same way, so the fallback must not share
  // that single point of failure. Falls back to a separately-hosted poster.
  const [fallbackSrc, setFallbackSrc] = useState(frameSrc(FRAME_START));

  /* useEffect (not useLayoutEffect) — runs after paint so DOM measurements
     are stable and the CSS sticky layout is already committed. */
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!root || !canvas || !content) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = FRAME_W;
    canvas.height = FRAME_H;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const frameObj = { frame: FRAME_START };

    let lastDrawn = -1;
    const render = (frameValue: number) => {
      // Remove console.log for clean output
      const clamped = Math.min(Math.max(frameValue, FRAME_START), FRAME_COUNT);
      // Skip redundant redraws — onUpdate can fire without the frame value
      // having meaningfully changed.
      if (Math.abs(clamped - lastDrawn) < 0.001) {
        return;
      }

      const lower = Math.floor(clamped);
      const upper = Math.min(lower + 1, FRAME_COUNT);
      const frac = clamped - lower;

      // Bail without marking drawn if the frame isn't loaded yet — lets a
      // later retry (see loadFrame's decode callback) actually redraw once
      // it's ready, instead of the dedup guard silently swallowing it.
      const lowerImg = images[lower - 1];
      if (!(lowerImg?.complete && lowerImg.naturalHeight !== 0)) {
        return;
      }
      lastDrawn = clamped;

      ctx.globalAlpha = 1;
      ctx.drawImage(lowerImg, 0, 0, canvas.width, canvas.height);
      
      // Removed sub-frame cross-fade interpolation: At 24fps native, 
      // frame pacing is tight enough that hard cuts look buttery smooth,
      // and it cuts our GPU canvas drawing operations in exactly half, 
      // instantly eliminating the "laggy" scroll feeling.
    };

    const loadFrame = (i: number) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      // Fallback for browsers where img.decode() might fail or isn't supported.
      img.onload = () => {
        render(frameObj.frame);
      };
      img.decode().then(() => {
        render(frameObj.frame);
      }).catch((e) => {
        console.warn(`[Hero] Frame ${i} decode failed`, e);
      });
      images[i - 1] = img;
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      // Static hero: draw first frame once it loads, no scrub, no fade.
      loadFrame(FRAME_START);
      return;
    }

    for (let i = FRAME_START; i <= FRAME_START + EAGER_FRAMES; i++) loadFrame(i);
    // Track cancellers so unmounting stops not-yet-fired idle loads instead
    // of letting them keep decoding (and retaining) frames after the fact.
    const idleCancels: Array<() => void> = [];
    for (let i = FRAME_START + EAGER_FRAMES + 1; i <= FRAME_COUNT; i++) {
      idleCancels.push(scheduleIdle(() => loadFrame(i)));
    }

    render(FRAME_START);

    /* No GSAP pin — the stage div uses CSS `position: sticky; top: 0`
       (the same reliable pattern the chapter sections use). GSAP only
       handles the scroll-scrubbed text/video animations. */
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: timeline,
      });

      // 0 -> 0.02 is a tiny dead zone to prevent accidental micro-scrolls.
      // Hero copy starts fading almost immediately after scroll begins.
      timeline.to(content, { yPercent: -12, opacity: 0, duration: 0.22 }, 0.02);

      // Image sequence begins just after the copy starts fading, and scrubs
      // across the rest of the hero's scroll range.
      timeline.to(
        frameObj,
        {
          frame: FRAME_COUNT,
          onUpdate: () => render(frameObj.frame),
          duration: 0.97,
        },
        0.03,
      );
      timeline.to(canvas, { scale: 1.13, xPercent: -5, yPercent: -2, duration: 0.97 }, 0.03);
    }, root);

    return () => {
      idleCancels.forEach((cancel) => cancel());
      context.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="immersive-hero"
    >
      {/* CSS sticky pin — reliable across all browsers, no GSAP spacer issues */}
      <div
        className="sticky top-0 h-screen overflow-hidden bg-[#09111d]"
      >
        <Image
          src={fallbackSrc}
          alt="Hero background"
          fill
          priority
          onError={() => setFallbackSrc("/hero-poster.jpg")}
          className="object-cover object-[58%_45%] will-change-[transform] transform-gpu"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_45%] will-change-[transform] transform-gpu"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,28,.73)_0%,rgba(5,18,28,.38)_43%,rgba(5,18,28,.04)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,18,28,.38)_0%,transparent_52%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent md:hidden" />

        <div ref={contentRef} className="relative z-10 mx-auto flex h-screen max-w-[1440px] flex-col px-4 pt-[calc(clamp(2rem,10vh,16rem)_+_env(safe-area-inset-top))] pb-[calc(clamp(10rem,15vh,16rem)_+_env(safe-area-inset-bottom))] md:px-8 will-change-[transform,opacity]">
          <div className="mt-auto max-w-3xl">
            <h1
              className="mt-5 max-w-5xl text-[clamp(2rem,5vmin,6rem)] leading-[1.05] font-semibold tracking-[-.02em] text-white md:font-bold"
            >
              Precision analytics <br className="hidden md:block" /> for critical infrastructure.

            </h1>
            <p
              className="mt-7 max-w-2xl text-[clamp(1rem,2vmin,1.5rem)] leading-relaxed text-white/82 text-justify"
            >
              Core Defenses builds EDIM, a physics-based data assimilation platform for nuclear operations, and ENADOX, a self-healing data protection layer for secure communications in contested and degraded environments.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTALink href="/solutions">Explore Solutions</CTALink>
              <CTALink href="/contact" variant="ghost">
                Contact Us
              </CTALink>
            </div>
          </div>

          <a
            href="#edim"
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo("#edim", { duration: 1.5, offset: 0 });
            }}
            className="group absolute right-4 bottom-[8rem] hidden items-center gap-3 text-xs tracking-[.18em] text-white/70 uppercase transition-colors hover:text-white md:right-8 md:flex"
          >
            Scroll to enter
            <div className="relative flex h-10 w-6 items-center justify-center overflow-hidden">
              <Pointer
                size={18}
                strokeWidth={1.5}
                className="animate-swipe-up text-white"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
