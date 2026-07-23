"use client";

import { usePathname } from "next/navigation";
import GradualBlur from "./GradualBlur";

export function GlobalHomepageBlur() {
  const pathname = usePathname();

  // Only render on the homepage
  if (pathname !== "/") return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      <div className="sticky top-0 left-0 flex h-screen w-full flex-col justify-end">
        <GradualBlur
          position="bottom"
          target="parent"
          height="6rem"
          strength={2}
          divCount={5}
          exponential={false}
          zIndex={5}
          opacity={1}
        />
      </div>
    </div>
  );
}
