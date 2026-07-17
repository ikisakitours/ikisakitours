"use client";

import React, { useState } from "react";
import { FiClock } from "react-icons/fi";

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export default function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const parseTime = (val: string) => {
    if (!val) return { h: "12", m: "00", p: "AM" };
    
    const [timePart, periodPart] = val.split(" ");
    const [h, m] = timePart.split(":");
    return { 
      h: h || "12", 
      m: m || "00", 
      p: periodPart || "AM" 
    };
  };

  const { h: initialHour, m: initialMinute, p: initialPeriod } = parseTime(value);

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  // Hours (01 - 12), Minutes (00, 05... 55), සහ Periods (AM, PM)
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const periods = ["AM", "PM"];

  const handleTimeChange = (h: string, m: string, p: string) => {
    setSelectedHour(h);
    setSelectedMinute(m);
    setSelectedPeriod(p);
    onChange(`${h}:${m} ${p}`);
  };

  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center"
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {value ? value : "Select time"}
        </span>
        <FiClock className="w-4 h-4 text-slate-500" />
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

      {/* Dropdown Box */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 sm:left-0 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 p-5 w-full sm:w-72 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-3 px-2">
            <span className="text-[10px] w-1/3 text-center font-bold text-slate-500 uppercase tracking-widest">Hours</span>
            <span className="text-[10px] w-1/3 text-center font-bold text-slate-500 uppercase tracking-widest">Minutes</span>
            <span className="text-[10px] w-1/3 text-center font-bold text-slate-500 uppercase tracking-widest">AM/PM</span>
          </div>
          
          <div className="flex gap-1 h-48">
            {/* Hours Column */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-col gap-1">
              {hours.map((h) => (
                <div
                  key={`h-${h}`}
                  onClick={() => handleTimeChange(h, selectedMinute, selectedPeriod)}
                  className={`py-2 text-center rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    selectedHour === h ? "bg-gold text-black" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center text-slate-500 font-bold px-1">:</div>

            {/* Minutes Column */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-col gap-1">
              {minutes.map((m) => (
                <div
                  key={`m-${m}`}
                  onClick={() => handleTimeChange(selectedHour, m, selectedPeriod)}
                  className={`py-2 text-center rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    selectedMinute === m ? "bg-gold text-black" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center text-slate-500 font-bold px-1"> </div>

            {/* AM/PM Column */}
            <div className="flex-1 flex flex-col gap-1">
              {periods.map((p) => (
                <div
                  key={`p-${p}`}
                  onClick={() => handleTimeChange(selectedHour, selectedMinute, p)}
                  className={`py-2 text-center rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    selectedPeriod === p ? "bg-gold text-black" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}