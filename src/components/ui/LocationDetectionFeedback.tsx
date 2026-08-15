"use client";

import React from "react";

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
  textClassName = "text-[10px]",
}: LocationDetectionFeedbackProps) {
  if (isDetecting) {
    return <p className={`${textClassName} italic text-slate-500 animate-pulse`}>{messages.detecting}</p>;
  }

  return (
    <>
      {!userInteracted && detectedCode && (
        <p className={`${textClassName} font-medium leading-relaxed text-emerald-500/80`}>{messages.autoDetected}</p>
      )}

      {!userInteracted && !detectedCode && messages.fallback && (
        <p className={`${textClassName} font-medium leading-relaxed text-slate-400`}>{messages.fallback}</p>
      )}

      {userInteracted && detectedCode && selectedCode === detectedCode && (
        <p className={`${textClassName} font-medium leading-relaxed text-emerald-500/80`}>{messages.confirmed}</p>
      )}

      {userInteracted && detectedCode && selectedCode !== detectedCode && (
        <p className={`${textClassName} font-medium leading-relaxed text-amber-500/90`}>{messages.mismatch}</p>
      )}

      {userInteracted && !detectedCode && messages.success && (
        <p className={`${textClassName} font-medium leading-relaxed text-emerald-500/80`}>{messages.success}</p>
      )}
    </>
  );
}
