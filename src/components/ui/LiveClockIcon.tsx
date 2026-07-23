"use client";
import { useEffect, useState } from "react";

export function LiveClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = setTimeout(() => setTime(new Date()), 0);
    const intervalTimer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const seconds = time ? time.getSeconds() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const hours = time ? time.getHours() % 12 : 0;

  const secondDeg = time ? seconds * 6 : 0;
  const minuteDeg = time ? minutes * 6 + seconds * 0.1 : 0;
  const hourDeg = time ? hours * 30 + minutes * 0.5 : 0;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]`}
    >
      {/* Outer Watch Bezel / Ring */}
      <circle cx="12" cy="12" r="10" className="opacity-80" />

      <circle cx="12" cy="4" r="0.75" fill="currentColor" className="opacity-60" />
      <circle cx="20" cy="12" r="0.75" fill="currentColor" className="opacity-60" />
      <circle cx="12" cy="20" r="0.75" fill="currentColor" className="opacity-60" />
      <circle cx="4" cy="12" r="0.75" fill="currentColor" className="opacity-60" />

      <line
        x1="12"
        y1="12"
        x2="12"
        y2="7.5"
        strokeWidth="2.5"
        style={{
          transform: `rotate(${hourDeg}deg)`,
          transformOrigin: "12px 12px",
          transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
        }}
      />

      <line
        x1="12"
        y1="12"
        x2="12"
        y2="5.5"
        strokeWidth="1.75"
        style={{
          transform: `rotate(${minuteDeg}deg)`,
          transformOrigin: "12px 12px",
          transition: "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
        }}
      />
      <line
        x1="12"
        y1="13.5"
        x2="12"
        y2="4"
        strokeWidth="1"
        className="text-gold"
        style={{
          transform: `rotate(${secondDeg}deg)`,
          transformOrigin: "12px 12px",
        }}
      />

      <circle cx="12" cy="12" r="1.25" fill="currentColor" className="text-gold" />
    </svg>
  );
}
