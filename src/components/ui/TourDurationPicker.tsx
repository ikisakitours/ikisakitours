"use client";

import React from "react";
import { Plus, Minus, Timer } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07]";

interface TourDurationPickerProps {
  days: number;
  onChange: (delta: number) => void;
  className?: string;
}

export function TourDurationPicker({ days, onChange, className = "" }: TourDurationPickerProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        tabIndex={-1}
        className={`${inputClass} py-2! relative flex items-center pl-11 focus-within:border-gold/60! focus-within:bg-white/[0.07]!`}
      >
        <div onClick={() => onChange(1)} className="flex items-center gap-3 grow cursor-pointer select-none">
          <Timer className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
          <span className={days === 0 ? "text-slate-500 font-medium" : "text-white font-medium"}>
            {days === 0 ? "Select duration" : `${days} ${days === 1 ? "Day" : "Days"}`}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-5 ml-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(-1);
            }}
            disabled={days <= 0}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20 disabled:cursor-not-allowed"
          >
            <Minus className="h-3 w-3" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(1);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
