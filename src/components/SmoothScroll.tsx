"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import React from "react";

// Next's App Router swaps page content in place on client-side navigation —
// it never reloads, so Lenis (which owns the actual scroll position) keeps
// whatever position it had on the previous route instead of resetting.
// Without this, the first click on a nav link fights Next's own
// scroll-to-top against Lenis's stale position (visible as a flicker that
// then snaps back), and only "sticks" on a second click/interaction.
function ResetScrollOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

// Drives Lenis from GSAP's own ticker instead of Lenis's independent rAF loop
// (autoRaf: false below), so ScrollTrigger reads scroll position on the exact
// same frame Lenis updates it — no drift/lag between the two.
function GsapTicker() {
  const lastHapticScrollRef = React.useRef(0);

  const lenis = useLenis(({ scroll }) => {
    // Fire a very light haptic tick every 400px of scroll.
    // (Note: navigator.vibrate is supported on Android, but disabled by Apple on iOS Safari)
    if (Math.abs(scroll - lastHapticScrollRef.current) > 400) {
      lastHapticScrollRef.current = scroll;
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(2);
      }
    }
  });

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, autoRaf: false }}
    >
      <GsapTicker />
      <ResetScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}
