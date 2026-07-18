"use client";

import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

export default function TimeDiv() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = setTimeout(() => setTime(new Date()), 0);

    const intervalTimer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="relative flex w-full items-center rounded-2xl border border-gold/20 bg-lanka-black/60 p-4 backdrop-blur-md min-h-25 overflow-hidden">
      {/* Watermark: MAPMATE */}
      <div className="pointer-events-none absolute right-3 bottom-4 select-none text-7xl font-black uppercase text-gold/10">
        MAPMATE
      </div>
      {/* Top Left Watermark: LK */}
      <div className="pointer-events-none absolute top-2 left-4 flex items-center gap-2 select-none">
        <span className="text-xl font-black uppercase text-gold/20">LK</span>
        <span className="text-xl opacity-20 lg:hidden">🇱🇰</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-gold text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-lg">
          <FaClock className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
          <span>Sri Lanka Time</span>
        </div>

        {/* Time and Date */}
        <div className="text-xl font-bold text-foreground whitespace-nowrap mt-1">
          {time ? `${formatDate(time)} | ${formatTime(time)}` : "Loading..."}
        </div>

        {/* Location */}
        <div className="text-xs text-foreground/50 mt-1">Colombo (GMT +05:30)</div>
      </div>
    </div>
  );
}
