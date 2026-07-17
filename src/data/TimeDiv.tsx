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
    <div className="relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-gold/20 bg-lanka-black/60 p-4 backdrop-blur-md min-h-25">
      {/* Watermark */}
      <div className="pointer-events-none absolute right-3 bottom-4 select-none text-7xl font-black uppercase text-gold/10">
        MAPMATE
      </div>

      {/* Left Section: LK */}
      <div className="flex items-center">
        <span className="text-3xl font-bold text-foreground">LK</span>
      </div>

      {/* Right Section: Time, Date and Location */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-gold text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-lg">
          <FaClock className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
          <span>Sri Lanka Time</span>
        </div>

        <div className="text-xl font-bold text-foreground whitespace-nowrap min-h-7">
          {time ? `${formatDate(time)} | ${formatTime(time)}` : "Loading..."}
        </div>

        {/* Location */}
        <div className="text-xs text-foreground/50 mt-1">Colombo (GMT +05:30)</div>
      </div>
    </div>
  );
}
