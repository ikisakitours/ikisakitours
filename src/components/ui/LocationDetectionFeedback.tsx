"use client";

import React from "react";
// අදාළ අවස්ථාවන්ට ගැළපෙන Premium Icons ටික Import කරගන්නවා
import { Loader2, MapPin, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export interface LocationDetectionFeedbackProps {
  isDetecting: boolean;
  userInteracted: boolean;
  detectedCode: string | null | undefined;
  selectedCode: string | null | undefined;
  messages: {
    detecting: string;
    autoDetected: string;
    confirmed: string;
    mismatch: string;
    fallback?: string;
    success?: string;
  };
  textClassName?: string;
}

export function LocationDetectionFeedback({
  isDetecting,
  userInteracted,
  detectedCode,
  selectedCode,
  messages,
  textClassName = "text-tiny",
}: LocationDetectionFeedbackProps) {
  // 1. Detecting State (Spinning Gold Icon)
  if (isDetecting) {
    return (
      <div className="inline-flex items-start gap-1.5 mt-1.5 animate-pulse">
        <Loader2 className="h-3.5 w-3.5 shrink-0 text-gold animate-spin-slow mt-0.5" />
        <p className={`${textClassName} italic tracking-wide text-slate-400 leading-relaxed`}>{messages.detecting}</p>
      </div>
    );
  }

  return (
    <>
      {/* 2. Auto Detected (Emerald Map Pin with Glow) */}
      {!userInteracted && detectedCode && (
        <div className="inline-flex items-start gap-1.5 mt-1.5 animate-fade-in-up">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5 drop-shadow-[0_0_5px_rgba(52,211,153,0.35)]" />
          <p className={`${textClassName} font-medium tracking-wide text-emerald-400/90 leading-relaxed`}>
            {messages.autoDetected}
          </p>
        </div>
      )}

      {/* 3. Fallback (Subtle Slate Info Icon) */}
      {!userInteracted && !detectedCode && messages.fallback && (
        <div className="inline-flex items-start gap-1.5 mt-1.5 animate-fade-in-up">
          <Info className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
          <p className={`${textClassName} font-medium tracking-wide text-slate-400 leading-relaxed`}>
            {messages.fallback}
          </p>
        </div>
      )}

      {/* 4. Confirmed Success (Emerald CheckCircle with Glow) */}
      {userInteracted && detectedCode && selectedCode === detectedCode && (
        <div className="inline-flex items-start gap-1.5 mt-1.5 animate-fade-in-up">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5 drop-shadow-[0_0_5px_rgba(52,211,153,0.35)]" />
          <p className={`${textClassName} font-medium tracking-wide text-emerald-400/90 leading-relaxed`}>
            {messages.confirmed}
          </p>
        </div>
      )}

      {/* 5. Mismatch Warning (Amber AlertTriangle with Glow) */}
      {userInteracted && detectedCode && selectedCode !== detectedCode && (
        <div className="inline-flex items-start gap-1.5 mt-1.5 animate-fade-in-up">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5 drop-shadow-[0_0_5px_rgba(251,191,36,0.4)]" />
          <p className={`${textClassName} font-medium tracking-wide text-amber-400/90 leading-relaxed`}>
            {messages.mismatch}
          </p>
        </div>
      )}

      {/* 6. General Success (Emerald CheckCircle with Glow) */}
      {userInteracted && !detectedCode && messages.success && (
        <div className="inline-flex items-start gap-1.5 mt-1.5 animate-fade-in-up">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5 drop-shadow-[0_0_5px_rgba(52,211,153,0.35)]" />
          <p className={`${textClassName} font-medium tracking-wide text-emerald-400/90 leading-relaxed`}>
            {messages.success}
          </p>
        </div>
      )}
    </>
  );
}
