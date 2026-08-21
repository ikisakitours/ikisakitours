"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className={`inline-flex items-center gap-1.5 mt-1.5 animate-fade-in-up ${className}`}>
      {/* Vercel/Linear Alert Red (#E5484D) with matching color drop-shadow */}
      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#E5484D] drop-shadow-[0_0_5px_rgba(229,72,77,0.35)]" />

      <p className="relative bottom-[-0.5px] text-caption font-medium tracking-wide text-[#E5484D]/90 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
