"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StatsProps {
  data: { label: string; value: string }[];
}

export default function StatsSection({ data }: StatsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [data]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-transparent overflow-hidden font-sans">
      {/* Header with Navigation Buttons on Top Right */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">Overview</span>
          <h2 className="premium-serif text-xl sm:text-2xl text-white font-light">Key Statistics</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-white/10 bg-[#0a0a0a] text-white transition-all duration-300 ${
              canScrollLeft ? "hover:border-gold/50 hover:text-gold cursor-pointer" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-white/10 bg-[#0a0a0a] text-white transition-all duration-300 ${
              canScrollRight ? "hover:border-gold/50 hover:text-gold cursor-pointer" : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Container with exact fractional card widths: Mobile 1.33, MD 2.33, LG 3.33, 2XL 4.33 */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {data.map((stat, index) => (
          <div
            key={index}
            className="group relative shrink-0 snap-start 
              w-[calc(75%-12px)] 
              md:w-[calc(42.85%-12px)] 
              lg:w-[calc(30%-12px)] 
              2xl:w-[calc(23%-12px)] 
              rounded-2xl p-5 bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl transition-all duration-300 hover:border-gold/30 hover:bg-[#121212] flex flex-col justify-between"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Index Number */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-mono tracking-widest text-white/30 group-hover:text-gold transition-colors">
                #{String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-gold transition-colors" />
            </div>

            {/* Value & Label */}
            <div className="space-y-1">
              <h3 className="premium-serif text-2xl sm:text-3xl text-white font-light tracking-tight group-hover:text-gold transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-200 transition-colors duration-300 line-clamp-1 font-sans">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
