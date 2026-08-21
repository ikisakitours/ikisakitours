import React from "react";

export default function SectionBadge({ badge }: { badge: string }) {
  return (
    <div className="mb-6 inline-flex items-center gap-3 md:gap-4">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="h-px w-6 bg-linear-to-l from-gold/50 to-transparent sm:w-10 md:w-16" />
        <div className="h-1 w-1 rotate-45 bg-gold shadow-[0_0_8px_rgba(197,160,89,0.8)] md:h-1.5 md:w-1.5" />
      </div>

      <span className="text-tiny md:text-caption font-black uppercase tracking-[0.3em] text-gold/90 md:tracking-[0.4em]">
        {badge}
      </span>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="h-1 w-1 rotate-45 bg-gold shadow-[0_0_8px_rgba(197,160,89,0.8)] md:h-1.5 md:w-1.5" />
        <div className="h-px w-6 bg-linear-to-r from-gold/50 to-transparent sm:w-10 md:w-16" />
      </div>
    </div>
  );
}
