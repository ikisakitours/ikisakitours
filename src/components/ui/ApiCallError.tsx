"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ApiCallErrorProps {
  message?: string;
  fullScreen?: boolean;
  onRetry?: () => void;
}

export function ApiCallError({
  message = "Oops! Something went wrong.",
  fullScreen = true,
  onRetry,
}: ApiCallErrorProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-lanka-dark px-4 ${
        fullScreen ? "min-h-screen" : "h-full w-full py-20"
      }`}
      role="alert"
    >
      {/* 1. Background Watermark Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none opacity-[0.02]">
        <span className="premium-serif whitespace-nowrap text-[12vw] font-black text-red-900/30">ERROR</span>
      </div>

      {/* 2. Foreground Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Error Icon Box */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>

        {/* Error Text */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-body font-bold uppercase tracking-[0.2em] text-red-400">Failed to Load</h3>
          <p className="max-w-md text-sm text-slate-400">{message}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="group mt-4 flex items-center gap-2 rounded-full border border-gold/30 bg-[#0a0a0a] px-6 py-2.5 text-tiny font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
