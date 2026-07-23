"use client";

import React, { useState, useEffect } from "react";
import { LiveClockIcon } from "@/components/ui/LiveClockIcon";

//Icons
// import { FaHourglass } from "react-icons/fa";

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
      {/* Watermark: MAPMATE - Perfectly Centered */}
      <div className="pointer-events-none absolute inset-0 z-0 grid h-full w-full place-items-center overflow-hidden">
        <span className="whitespace-nowrap text-[3.9rem]  min-[340px]:max-[365px]:text-[3.5rem] min-[540px]:text-[5.5rem] sm:text-[4rem] md:text-[3.5rem]  lg:text-[5rem] xl:text-[3.8rem] 2xl:text-[4.5rem] 3xl:text-[5.5rem] font-black uppercase leading-none text-gold/10">
          MAPMATE
        </span>
      </div>
      {/* Top Left Watermark: LK */}
      <div className="pointer-events-none absolute top-2 left-4 flex items-center gap-2 select-none">
        <span className="text-xl 2xl:text-[1.25rem] 3xl:text-[1.6rem] font-black uppercase text-gold/20">LK</span>
        <span className="text-xl opacity-20 lg:hidden">🇱🇰</span>
      </div>

      {/* Top Right Floating Live Clock Badge */}
      <div className="absolute top-1 right-1 z-10 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-gold/40 bg-linear-to-br from-gold/20 via-gold/5 to-black/60 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold/60">
        <LiveClockIcon className="h-7 w-7 sm:h-7.5 sm:w-7.5 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Icon and Title */}
        <div className="flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-gold text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-lg 3xl:text-[1.325rem]">
          {/* <FaHourglass className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 3xl:h-5 3xl:w-5" /> */}
          {/* <LiveClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-4.5 lg:w-4.5 3xl:h-6 3xl:w-6" />    */}
          <span>Island Chronicle</span>
        </div>

        {/* Time and Date */}
        <div className="text-xl min-[340px]:max-[365px]:text-[1.1rem] md:text-[1.15rem] 3xl:text-[1.6rem] font-bold text-foreground whitespace-nowrap mt-1">
          {time ? `${formatDate(time)} | ${formatTime(time)}` : "Loading..."}
        </div>

        {/* Location */}
        <div className="text-xs 2xl:text-[0.85rem] 3xl:text-[1.1rem] text-foreground/50 mt-1">Colombo (GMT +05:30)</div>
      </div>
    </div>
  );
}
