import React from "react";
import { Compass, Info } from "lucide-react";
import { Destination } from "@/data/destinationData";

type Props = {
  name: string;
  guide: Destination["guide"];
};

export default function SidebarWidget({ name, guide }: Props) {
  return (
    <aside className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-32">
      <div className="glass-card rounded-4xl border border-white/5 p-6 md:p-8">
        {/* Guide Header */}
        <div className="mb-8 flex flex-col items-center justify-center rounded-2xl bg-white/5 py-6 text-center">
          <Compass className="mb-3 h-8 w-8 text-gold" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-white">Destination Guide</h3>
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Helpful info for your next vacation.
          </p>
        </div>

        {/* Details List */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-xs font-medium text-slate-400">Best Time to Visit</span>
            <span className="text-right text-xs font-bold text-white">{guide.bestTime}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-xs font-medium text-slate-400">Climate</span>
            <span className="text-right text-xs font-bold text-white">{guide.climate}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-xs font-medium text-slate-400">Primary Languages</span>
            <span className="text-right text-xs font-bold text-white">{guide.languages}</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-xs font-medium text-slate-400">Local Currency</span>
            <span className="text-right text-xs font-bold text-white">{guide.currency}</span>
          </div>
        </div>
      </div>

      {/* Info / Warning Box */}
      <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
        <p className="text-xs leading-relaxed text-slate-300">
          We create personalized custom itineraries traversing {name}. Contact us to start tailoring your dream holiday.
        </p>
      </div>
    </aside>
  );
}