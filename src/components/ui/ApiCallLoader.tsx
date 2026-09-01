// src/components/ui/ApiCallLoader.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ApiCallLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export function ApiCallLoader({ text = "Loading", fullScreen = true }: ApiCallLoaderProps) {
  const baseText = text.replace(/\.+$/, "");

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-lanka-dark ${
        fullScreen ? "min-h-screen" : "h-full w-full py-20"
      }`}
      role="status"
      aria-live="polite"
    >
      {/* 1. Background Watermark Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none opacity-[0.03]">
        <span className="premium-serif whitespace-nowrap text-[12vw] font-black text-gold">IKISAKI</span>
      </div>

      {/* 2. Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Luxury Concentric SVG Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <motion.svg
            className="absolute h-full w-full text-gold/30"
            viewBox="0 0 50 50"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="25"
              cy="25"
              r="23"
              fill="none"
              strokeWidth="0.5"
              stroke="currentColor"
              strokeDasharray="100 44"
            />
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

          <div className="absolute h-1.5 w-1.5 rounded-full bg-gold" />
        </div>

        {/* 3. Loading Text with Pulse Effect & Animated Dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center text-tiny font-bold uppercase tracking-[0.3em] text-gold/80 animate-pulse">
            <span>{baseText}</span>
            <span className="flex w-6 justify-start tracking-normal">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
              >
                .
              </motion.span>
            </span>
          </div>

          {/* Small decorative line */}
          <div className="h-px w-16 bg-linear-to-r from-transparent via-gold/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
