"use client";

import { useState, useEffect, useRef } from "react";
import { HelpCircle, X, ChevronsDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

export function ScrollHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && window.scrollY > 300) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/10 px-4 py-3">
              <span className="immersive-kicker text-[0.65rem] tracking-[0.2em] text-white/90">
                NAVIGATION
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center p-8 text-center">
              {/* Technical scroll indicator */}
              <div className="relative flex h-14 w-8 justify-center rounded-full border border-white/40 bg-black/10 shadow-inner">
                <m.div
                  animate={{ y: [16, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "circInOut",
                  }}
                  className="absolute top-2 h-2 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
              </div>

              <p className="mt-6 font-mono text-xs tracking-wider text-white/90 uppercase">
                Initiate Scroll <br /> to proceed
              </p>

              <div className="mt-4 text-white/50">
                <m.div
                  animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronsDown size={18} strokeWidth={1.5} />
                </m.div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Help"
        className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
          isOpen
            ? "border-[#0052ff] bg-[#0052ff] text-white shadow-md shadow-blue-900/20"
            : "border-white/20 bg-white/10 text-white/80 backdrop-blur-md hover:border-white/40 hover:bg-white/20 hover:text-white"
        }`}
      >
        <HelpCircle
          size={18}
          className={`transition-transform duration-500 ${isOpen ? "scale-90 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
        />
        <X
          size={18}
          className={`absolute transition-transform duration-500 ${isOpen ? "scale-100 rotate-0 opacity-100" : "scale-90 -rotate-90 opacity-0"}`}
        />
      </button>
    </div>
  );
}
