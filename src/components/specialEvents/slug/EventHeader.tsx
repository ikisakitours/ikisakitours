"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

interface EventHeaderProps {
  badge: string;
  titlePart1: string;
  titleAccent: string;
  description: string;
}

export function EventHeader({ badge, titlePart1, titleAccent, description }: EventHeaderProps) {
  const router = useRouter();

  return (
    <>
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:text-gold-light bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="max-w-4xl mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{badge}</span>
        </div>

        <h1 className="premium-serif text-4xl font-light leading-[1.15] text-white sm:text-5xl md:text-6xl mb-6">
          {titlePart1} <span className="gold-gradient-text italic">{titleAccent}</span>
        </h1>

        <p className="text-base font-light leading-relaxed text-slate-300 md:text-lg">{description}</p>
      </div>
    </>
  );
}
