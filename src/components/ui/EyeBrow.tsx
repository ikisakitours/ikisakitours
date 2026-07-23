import React from "react";
type EyeBrowProps = {
  eyebrow: string;
};
export default function EyeBrow({ eyebrow }: EyeBrowProps) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
    </div>
  );
}
