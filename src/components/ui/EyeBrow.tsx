import React from "react";

type EyeBrowProps = {
  eyebrow: string;
  className?: string;
};

export default function EyeBrow({ eyebrow, className = "" }: EyeBrowProps) {
  return (
    <div className={`mb-6 flex w-full max-w-full items-center justify-center gap-3 md:gap-5 3xl:gap-8 ${className}`}>
      {/* =========================================
          1. LEFT ROYAL CREST (Scales up to 4K/3xl)
          ========================================= */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3 3xl:gap-4">
        {/* Double Line Effect */}
        <div className="flex flex-col gap-0.75 3xl:gap-1">
          <div className="h-px w-10 bg-linear-to-l from-gold/80 to-transparent sm:w-16 md:w-24 lg:w-32 3xl:w-40" />
          <div className="ml-auto h-px w-6 bg-linear-to-l from-gold/40 to-transparent sm:w-10 md:w-16 lg:w-20 3xl:w-24" />
        </div>

        {/* Nested Diamond */}
        <div className="relative flex h-3 w-3 items-center justify-center rotate-45 border border-gold/40 sm:h-4 sm:w-4 3xl:h-5 3xl:w-5">
          <div className="h-1.5 w-1.5 bg-gold shadow-[0_0_12px_rgba(197,160,89,1)] sm:h-2 sm:w-2 3xl:h-2.5 3xl:w-2.5" />
        </div>

        {/* Tiny Golden Dot Accent */}
        <div className="h-1 w-1 rounded-full bg-gold/70 3xl:h-1.5 3xl:w-1.5" />
      </div>

      {/* =========================================
          2. HERO TYPOGRAPHY (Uses globals.css rules)
          ========================================= */}
      <span className="shrink text-center text-caption font-black uppercase tracking-[0.25em] text-gold/95 md:tracking-[0.4em] 3xl:tracking-[0.5em]">
        {eyebrow}
      </span>

      {/* =========================================
          3. RIGHT ROYAL CREST (Scales up to 4K/3xl)
          ========================================= */}
      <div className="flex shrink-0 items-center gap-2 md:gap-3 3xl:gap-4">
        {/* Tiny Golden Dot Accent */}
        <div className="h-1 w-1 rounded-full bg-gold/70 3xl:h-1.5 3xl:w-1.5" />

        {/* Nested Diamond */}
        <div className="relative flex h-3 w-3 items-center justify-center rotate-45 border border-gold/40 sm:h-4 sm:w-4 3xl:h-5 3xl:w-5">
          <div className="h-1.5 w-1.5 bg-gold shadow-[0_0_12px_rgba(197,160,89,1)] sm:h-2 sm:w-2 3xl:h-2.5 3xl:w-2.5" />
        </div>

        {/* Double Line Effect (Mirrored) */}
        <div className="flex flex-col gap-0.75 3xl:gap-1">
          <div className="h-px w-10 bg-linear-to-r from-gold/80 to-transparent sm:w-16 md:w-24 lg:w-32 3xl:w-40" />
          <div className="mr-auto h-px w-6 bg-linear-to-r from-gold/40 to-transparent sm:w-10 md:w-16 lg:w-20 3xl:w-24" />
        </div>
      </div>
    </div>
  );
}
