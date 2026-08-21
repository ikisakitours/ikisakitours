"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FiClock } from "react-icons/fi";

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  isLoading?: boolean;
}

export default function CustomTimePicker({ value, onChange, isLoading = false }: CustomTimePickerProps) {
  const t = useTranslations("SharedForm.TimePicker");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const is12HourFormat =
    new Intl.DateTimeFormat(locale, { timeStyle: "short" }).resolvedOptions().hourCycle === "h11" ||
    new Intl.DateTimeFormat(locale, { timeStyle: "short" }).resolvedOptions().hourCycle === "h12";

  const parseTime = (val: string) => {
    if (!val) return { h: "12", m: "00", p: is12HourFormat ? "AM" : "" };

    const [timePart, periodPart] = val.split(" ");
    const [h, m] = timePart.split(":");
    return {
      h: h || "12",
      m: m || "00",
      p: periodPart || (is12HourFormat ? "AM" : ""),
    };
  };

  const { h: initialHour, m: initialMinute, p: initialPeriod } = parseTime(value);

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  const hoursLength = is12HourFormat ? 12 : 24;
  const hours = Array.from({ length: hoursLength }, (_, i) => {
    const hourVal = is12HourFormat ? i + 1 : i;
    return String(hourVal).padStart(2, "0");
  });

  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
  const periods = ["AM", "PM"];

  const handleTimeChange = (h: string, m: string, p: string) => {
    setSelectedHour(h);
    setSelectedMinute(m);

    if (is12HourFormat) setSelectedPeriod(p);

    const formattedTime = is12HourFormat ? `${h}:${m} ${p}` : `${h}:${m}`;
    onChange(formattedTime);
  };

  return (
    <div className="relative">
      {/* Trigger Field */}
      <div
        tabIndex={0}
        onClick={() => {
          if (isLoading) return;
          setIsOpen(!isOpen);
        }}
        className={`w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-body-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center ${
          isOpen ? "border-gold/60! bg-white/[0.07]!" : ""
        }${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={value ? "text-white" : "text-slate-500"}>{value ? value : t("selectTime")}</span>
        <FiClock className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-500" />
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}

      {/* Dropdown Box */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 sm:left-0 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 p-5 w-full sm:w-72 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 px-2">
            <span
              className={`text-caption text-center font-bold text-slate-500 uppercase tracking-widest ${is12HourFormat ? "w-1/3" : "w-1/2"}`}
            >
              {t("hours")}
            </span>
            <span
              className={`text-caption text-center font-bold text-slate-500 uppercase tracking-widest ${is12HourFormat ? "w-1/3" : "w-1/2"}`}
            >
              {t("minutes")}
            </span>
            {is12HourFormat && (
              <span className="text-caption w-1/3 text-center font-bold text-slate-500 uppercase tracking-widest">
                {t("ampm")}
              </span>
            )}
          </div>

          <div className="flex gap-1 h-48">
            {/* Hours Column */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-col gap-1">
              {hours.map((h) => (
                <div
                  key={`h-${h}`}
                  onClick={() => handleTimeChange(h, selectedMinute, selectedPeriod)}
                  className={`py-2 text-center rounded-xl text-body-sm font-bold cursor-pointer transition-all ${
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
                  className={`py-2 text-center rounded-xl text-body-sm font-bold cursor-pointer transition-all ${
                    selectedMinute === m
                      ? "bg-gold text-black"
                      : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* AM/PM Column (Only renders if language is 12-hour format) */}
            {is12HourFormat && (
              <>
                {/* Divider */}
                <div className="flex items-center justify-center text-slate-500 font-bold px-1"> </div>

                <div className="flex-1 flex flex-col gap-1">
                  {periods.map((p) => (
                    <div
                      key={`p-${p}`}
                      onClick={() => handleTimeChange(selectedHour, selectedMinute, p)}
                      className={`py-2 text-center rounded-xl text-body-sm font-bold cursor-pointer transition-all ${
                        selectedPeriod === p
                          ? "bg-gold text-black"
                          : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
