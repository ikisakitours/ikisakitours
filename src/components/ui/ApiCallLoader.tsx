"use client";

import React from "react";

interface BrandLoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export function ApiCallLoader({ text = "Loading...", fullScreen = true }: BrandLoaderProps) {
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
        <span className="premium-serif whitespace-nowrap text-[12vw] font-black text-gold">
          IKISAKI
        </span>
      </div>

      {/* 2. Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Luxury Triple-Ring Spinner */}
        <div className="relative h-16 w-16">
          {/* Outer slow ring */}
          <div className="absolute inset-0 rounded-full border-t-2 border-gold/20 animate-spin-slow"></div>
          {/* Middle fast glowing ring */}
          <div className="absolute inset-2 rounded-full border-r-2 border-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] animate-spin"></div>
          {/* Inner reverse slow ring */}
          <div 
            className="absolute inset-4 rounded-full border-b-2 border-gold-light animate-spin-slow" 
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>

        {/* 3. Loading Text with Pulse Effect */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-tiny font-bold uppercase tracking-[0.3em] text-gold/80 animate-pulse">
            {text}
          </span>
          {/* Small decorative line */}
          <div className="h-px w-12 bg-linear-to-r from-transparent via-gold/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}