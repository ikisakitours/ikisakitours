import React from "react";

export default function SectionBadge({ badge }: { badge: string }) {
  return (
    <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 3xl:px-6 3xl:py-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold 3xl:text-xs">{badge}</span>
    </div>
  );
}
