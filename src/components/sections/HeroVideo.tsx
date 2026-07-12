"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

type HeroVideoProps = {
  src: string;
  poster: string;
  alt: string;
};

// Autoplaying muted loop for the hero. Under prefers-reduced-motion it renders
// the poster still image only — no motion for sensitive users. Fill-positioned;
// parent must be `relative` with a fixed aspect/size.
export function HeroVideo({ src, poster, alt }: HeroVideoProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="-scale-x-100 object-cover"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full -scale-x-100 object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
