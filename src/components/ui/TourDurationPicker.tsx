"use client";

import React from "react";
import { Plus, Minus, Timer } from "lucide-react";
import { useTranslations } from "next-intl";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07]";

interface TourDurationPickerProps {
  days: number;
  onChange: (delta: number) => void;
  className?: string;
  isLoading?: boolean;
}

export function TourDurationPicker({ days, onChange, className = "", isLoading = false }: TourDurationPickerProps) {
  const t = useTranslations("SharedForm.DurationPicker");

  return (
    <div className={`relative ${className}`}>
      <div
        tabIndex={-1}
        className={`${inputClass} py-2! relative flex items-center pl-11 focus-within:border-gold! focus-within:bg-white/[0.07]! ${
          isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
      >
        <div
          onClick={() => {
            if (isLoading) return;
            onChange(1);
          }}
          className="flex items-center gap-3 grow cursor-pointer select-none"
        >
          <Timer className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 md:h-5 md:w-5 text-slate-500 pointer-events-none" />
          <span
            className={days === 0 ? "text-slate-500 font-medium text-body-sm" : "text-white font-medium text-body-sm"}
          >
            {days === 0 ? t("selectDuration") : `${days} ${days === 1 ? t("day") : t("days")}`}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-5 ml-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(-1);
            }}
            disabled={days <= 0 || isLoading}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20 disabled:cursor-not-allowed"
          >
            <Minus strokeWidth={3} className="h-3 w-3" />
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              onChange(1);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-gold hover:text-black hover:border-gold"
          >
            <Plus strokeWidth={3} className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
