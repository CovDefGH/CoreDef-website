import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Accepted for API compatibility; CSS scroll-timeline reveals don't use it. */
  delay?: number;
  as?: "div" | "section" | "li";
  id?: string;
};

// Scroll reveal via a native CSS scroll-driven animation (see `.cd-reveal` in
// globals.css). Content is VISIBLE BY DEFAULT and animates as a pure
// enhancement — so it never ships blank in headless/SEO renderers or without
// JS, and it's automatically disabled under prefers-reduced-motion. No JS,
// no client boundary. (Hover micro-interactions still use motion.dev via
// MotionCard.)
export function Reveal({
  children,
  className,
  as: Tag = "div",
  id,
}: RevealProps) {
  return (
    <Tag id={id} className={className ? `cd-reveal ${className}` : "cd-reveal"}>
      {children}
    </Tag>
  );
}
