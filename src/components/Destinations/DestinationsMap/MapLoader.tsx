"use client";

import { motion } from "framer-motion";

type PremiumMapLoaderProps = {
  loadingText?: string;
};

export default function MapLoader({ loadingText = "Please wait loading map" }: PremiumMapLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading map"
      className="relative flex h-137.5 w-full flex-col items-center justify-center overflow-hidden rounded-4xl border border-white/5 bg-[#0a0a0a]"
    >
      {/* Background Watermark */}
      <div className="pointer-events-none absolute bottom-8 right-8 select-none whitespace-nowrap text-6xl font-bold leading-none tracking-tighter text-white/5 md:text-8xl">
        MapMate
      </div>

      {/* Animated Compass / Spinner */}
      <div className="relative flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
        <motion.svg
          className="absolute h-full w-full text-gold/30"
          viewBox="0 0 50 50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="25" cy="25" r="23" fill="none" strokeWidth="0.5" stroke="currentColor" strokeDasharray="100 44" />
        </motion.svg>
        <motion.svg
          className="absolute h-full w-full text-gold/80"
          viewBox="0 0 50 50"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="25"
            cy="25"
            r="17"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            strokeDasharray="30 76"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.svg
          className="absolute h-full w-full text-gold"
          viewBox="0 0 50 50"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="25"
            cy="25"
            r="11"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            strokeDasharray="15 54"
            strokeLinecap="round"
          />
        </motion.svg>
        <div className="absolute h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gold" />
      </div>

      {/* Loading Text with Animated Dots */}
      <div className="z-10 mt-6 flex items-center text-xs font-bold uppercase tracking-[0.25em] text-gold/80 md:text-sm">
        <span>{loadingText}</span>
        <span className="ml-1 -mt-2 flex w-8 justify-start text-gold text-2xl md:text-3xl leading-none">
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>
            .
          </motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>
            .
          </motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>
            .
          </motion.span>
          <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>
            .
          </motion.span>
        </span>
      </div>
    </div>
  );
}
