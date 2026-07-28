import React from "react";
import { CheckCircle2 } from "lucide-react";

interface EventAboutProps {
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  perks: string[];
}

export function EventAbout({ aboutTitle, aboutText1, aboutText2, perks }: EventAboutProps) {
  return (
    <div className="mt-12 space-y-6 text-slate-300 font-light leading-relaxed">
      <h3 className="premium-serif text-2xl text-white font-normal">{aboutTitle}</h3>
      <p>{aboutText1}</p>
      <p>{aboutText2}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        {perks.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-surface/50 border border-white/5 p-4 rounded-2xl transition-colors hover:border-gold/30 hover:bg-surface/80"
          >
            <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
            <span className="text-sm text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}