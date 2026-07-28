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

  return (
    <div className="grid grid-cols-4 gap-1.5 text-center max-w-xs mx-auto">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden rounded-xl border border-gold/20 bg-black/80 px-2 py-2 backdrop-blur-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-black"
        >
          {/* Subtle top gold accent line */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#c5a059] to-transparent " />

          <span className="block text-sm font-black tracking-tight text-white md:text-base">
            {String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-[0.15em] text-[#c5a059]">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
