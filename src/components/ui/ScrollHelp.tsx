"use client";

import { useState, useEffect, useRef } from "react";
import { HelpCircle, X, Mouse, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
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

  // Close automatically after user scrolls significantly
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
    <div className="fixed left-6 bottom-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 w-64 overflow-hidden rounded-2xl bg-[#09111d]/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h3 className="text-sm font-semibold text-white">How to navigate</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <div className="relative flex h-16 w-10 items-center justify-center rounded-full border-2 border-slate-300">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 h-3 w-1.5 rounded-full bg-[#0052ff]"
                />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-300">
                Scroll down to explore <br /> the immersive experience
              </p>
              
              <div className="mt-4 flex gap-1 text-[#0052ff]">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Help"
        className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
          isOpen 
            ? "bg-[#0052ff] border-[#0052ff] text-white shadow-md shadow-blue-900/20" 
            : "bg-white/10 backdrop-blur-md border-white/20 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/40"
        }`}
      >
        <HelpCircle size={18} />
      </button>
    </div>
  );
}
