"use client";

import React, { useState, useEffect } from "react";
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export default function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const t = useTranslations("SharedForm.DatePicker");
  const [isOpen, setIsOpen] = useState(false);

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!value) {
      onChange(getTodayFormatted());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const [currentDate, setCurrentDate] = useState<Date>(() => parseDate(value || getTodayFormatted()));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, () => null);

  // Get localized months and days from JSON
  const months = t.raw("months") as string[];
  const fullMonths = t.raw("fullMonths") as string[];
  const weekDays = t.raw("days") as string[];

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return t("selectDate");
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${year}-${fullMonths[monthIndex]}-${day}`;
    }
    return dateStr;
  };

  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center ${
          isOpen ? "border-gold/60! bg-white/[0.07]!" : ""
        }`}
      >
        <span className={value ? "text-white" : "text-slate-500"}>{formatDisplayDate(value)}</span>
        <FiCalendar className="w-4 h-4 text-slate-500" />
      </div>

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 sm:left-0 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 p-5 w-full sm:w-80 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-5 gap-2">
            {/* Month Select */}
            <div className="relative w-full">
              <select
                value={currentDate.getMonth()}
                onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value, 10), 1))}
                className="w-full rounded-xl border border-white/10 bg-white/3 pl-3 pr-8 py-2 text-sm text-white outline-none transition-all hover:border-white/20 focus:border-gold/60 cursor-pointer appearance-none"
              >
                {months.map((m, i) => (
                  <option key={m} value={i} className="bg-[#0a0a0a]">
                    {m}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Year Select */}
            <div className="relative w-full">
              <select
                value={currentDate.getFullYear()}
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value, 10), currentDate.getMonth(), 1))}
                className="w-full rounded-xl border border-white/10 bg-white/3 pl-3 pr-8 py-2 text-sm text-white outline-none transition-all hover:border-white/20 focus:border-gold/60 cursor-pointer appearance-none"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#0a0a0a]">
                    {y}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-3 text-center">
            {weekDays.map((d) => (
              <div key={d} className="text-[10px] font-bold text-slate-500 uppercase">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {daysArray.map((d) => {
              const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const isSelected = value === formattedDate;
              return (
                <div
                  key={d}
                  onClick={() => {
                    onChange(formattedDate);
                    setIsOpen(false);
                  }}
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold cursor-pointer transition-all 
                    ${isSelected ? "bg-gold text-black" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"}`}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
