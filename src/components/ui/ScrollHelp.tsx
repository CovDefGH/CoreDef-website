"use client";

import { useState, useEffect, useRef } from "react";
import { Mouse, X, ChevronsDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

export function ScrollHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
    <div className="fixed left-6 bottom-6 z-50 flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-64 overflow-hidden rounded-none border border-[#7bc8ff]/20 bg-[#040a12]/95 p-px shadow-[0_0_40px_rgba(123,200,255,0.05)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#7bc8ff]/10 bg-[#07101a]/50 px-4 py-2.5">
              <span className="immersive-kicker text-[#7bc8ff]/70 text-[0.65rem] tracking-[0.2em]">NAVIGATION</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#7bc8ff]/50 transition-colors hover:text-[#7bc8ff]"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-[#7bc8ff]/[0.02]">
              {/* Technical scroll indicator */}
              <div className="relative flex h-14 w-8 justify-center rounded-full border border-[#7bc8ff]/40 bg-[#040a12]">
                <m.div
                  animate={{ y: [0, 16], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
                  className="absolute top-2 h-2 w-1.5 rounded-full bg-[#7bc8ff] shadow-[0_0_8px_#7bc8ff]"
                />
              </div>
              
              <p className="mt-6 text-xs tracking-wider text-slate-400 uppercase font-mono">
                Initiate Scroll <br /> to proceed
              </p>
              
              <div className="mt-4 text-[#7bc8ff]/40">
                <m.div
                  animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
        className={`group relative flex h-10 w-10 items-center justify-center border transition-all duration-500 overflow-hidden ${
          isOpen 
            ? "border-[#7bc8ff] bg-[#7bc8ff]/10 text-[#7bc8ff] shadow-[0_0_15px_rgba(123,200,255,0.2)]" 
            : "border-white/10 bg-[#040a12]/80 text-white/50 hover:border-[#7bc8ff]/40 hover:text-[#7bc8ff] backdrop-blur-md"
        }`}
      >
        {/* Corner accents for the button */}
        <div className="absolute top-0 left-0 h-1 w-1 border-t border-l border-current opacity-50"></div>
        <div className="absolute top-0 right-0 h-1 w-1 border-t border-r border-current opacity-50"></div>
        <div className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-current opacity-50"></div>
        <div className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-current opacity-50"></div>
        
        <Mouse size={16} strokeWidth={1.5} className={`transition-transform duration-500 ${isOpen ? "scale-90" : "group-hover:scale-110"}`} />
      </button>
    </div>
  );
}
