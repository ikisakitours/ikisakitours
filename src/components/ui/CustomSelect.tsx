"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: readonly string[];
  icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  icon,
  className = "",
  placeholder = "Select option",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border border-white/10 bg-white/3 py-3 pr-4 text-sm outline-none transition-all hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center ${
          icon ? "pl-11" : "px-4"
        }${className}`}
      >
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}

        <span className={value ? "text-white" : "text-slate-500"}>{value || placeholder}</span>

        <FiChevronDown
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
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer text-sm font-bold transition-colors ${
                value === opt ? "bg-gold text-black" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
