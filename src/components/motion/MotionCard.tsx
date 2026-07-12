"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

// Micro-interaction: subtle lift on hover (transform only — no layout shift,
// pairs with the border-color shift already on cards). No-op under
// prefers-reduced-motion. Content is always visible (no entrance gating).
export function MotionCard({ children, className }: MotionCardProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </m.div>
  );
}
