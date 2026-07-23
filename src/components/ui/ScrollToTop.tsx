"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 800px
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, offset: 0 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`border-line text-ink/60 hover:text-ink hover:border-accent fixed right-6 bottom-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
