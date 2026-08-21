"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

interface LanguageSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: readonly LanguageOption[];
  icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  isLoading?: boolean;
}

export default function LanguageSelect({
  value,
  onChange,
  options,
  icon,
  className = "",
  placeholder = "Select language",
  isLoading = false,
}: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOpt = options.find((o) => o.name === value);

  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        tabIndex={0}
        onClick={() => {
          if (isLoading) return;
          setIsOpen(!isOpen);
        }}
        className={`w-full rounded-xl border border-white/10 bg-white/3 py-3 pr-4 text-body-sm outline-none transition-all hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center ${
          icon ? "pl-11" : "px-4"
        } ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`}
      >
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}

        <span className={value ? "text-white" : "text-slate-500"}>
          {selectedOpt ? (
            <span className="flex items-center gap-2">
              <span className="text-body-sm">{selectedOpt.flag}</span>
              <span>{selectedOpt.name}</span>
            </span>
          ) : (
            placeholder
          )}
        </span>

        <FiChevronDown
          strokeWidth={3}
          className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          {options.map((opt) => (
            <div
              key={opt.code}
              onClick={() => {
                onChange(opt.name);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-body-sm transition-colors ${
                value === opt.name
                  ? "bg-white/5 border-l-2 border-gold"
                  : "border-l-2 border-transparent hover:bg-white/[0.07]"
              }`}
            >
              <span className="text-body-lead">{opt.flag}</span>
              <div className="flex flex-col">
                <span className={`font-bold ${value === opt.name ? "text-gold" : "text-slate-200"}`}>{opt.name}</span>
                <span className="text-caption text-slate-500 font-medium">{opt.nativeName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
