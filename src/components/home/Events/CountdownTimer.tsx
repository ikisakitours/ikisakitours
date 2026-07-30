"use client";

import { useState, useEffect } from "react";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 text-center max-w-sm mx-auto">
      {timeItems.map((item, idx) => {
        const formattedValue = String(item.value).padStart(2, "0");

        return (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl border border-gold/30 bg-black/90 p-2.5 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-gold hover:scale-105 group"
          >
            {/* Subtle top gold accent line */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#c5a059] to-transparent" />

            {/* Static Box without any animation */}
            <div className="relative h-8 flex items-center justify-center overflow-hidden my-1 rounded bg-zinc-950/80 border border-gold/10">
              <span className="block text-lg sm:text-xl font-black tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {formattedValue}
              </span>
            </div>

            <span className="block text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#c5a059] group-hover:text-gold transition-colors">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}