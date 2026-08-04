"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
//Icons
import { Plus, Minus, Users, ChevronDown } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07]";

interface TravelerOption {
  type: string;
  label: string;
  pluralLabel?: string;
  ageRange: string;
}

interface TravelerPickerProps {
  options: TravelerOption[];
  counts: Record<string, number>;
  onChange: (type: string, delta: number) => void;
}

export function TravelerPicker({ options, counts, onChange }: TravelerPickerProps) {
  const t = useTranslations("SharedForm.TravelerPicker");
  const [isOpen, setIsOpen] = useState(false);

  const activeSelections = options
    .filter((opt) => (counts[opt.type] || 0) > 0)
    .map((opt) => {
      const count = counts[opt.type] || 0;
      if (opt.type === "couple") {
        const coupleCount = (counts[opt.type] || 0) / 2;
        return `${coupleCount} ${coupleCount > 1 ? t("couples") : t("couple")}`;
      }
      const labelToShow = count > 1 && opt.pluralLabel ? opt.pluralLabel : opt.label;
      return `${count} ${labelToShow}`;
    });

  const totalTravelers = Object.values(counts).reduce((a, b) => a + b, 0);

  const triggerLabel = totalTravelers === 0 ? t("zeroTravelers") : activeSelections.join(", ");
  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={`${inputClass} cursor-pointer flex justify-between items-center pl-11 ${
          isOpen ? "border-gold/60! bg-white/[0.07]!" : ""
        }`}
      >
        <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <span className="text-white font-medium truncate pr-4">{triggerLabel}</span>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full p-2 rounded-2xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col">
            {options.map((option, index) => (
              <div
                key={option.type}
                className={`flex items-center justify-between p-4 ${
                  index !== options.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div>
                  <div className="text-[15px] font-bold text-white">{option.label}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{option.ageRange}</div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onChange(option.type, -1)}
                    disabled={(counts[option.type] || 0) === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="text-sm font-bold w-4 text-center text-white">{counts[option.type] || 0}</span>

                  <button
                    type="button"
                    onClick={() => onChange(option.type, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
