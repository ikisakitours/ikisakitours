"use client";

import React from "react";
import { MapPin, Sun, Moon } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";

type MapHeaderProps = {
  query: string;
  setQuery: (val: string) => void;
  filteredCount: number;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
};

export default function MapHeader({ query, setQuery, filteredCount, isDarkMode, setIsDarkMode }: MapHeaderProps) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:gap-4">
      {/* Title Section */}
      <div className="w-full pr-0 sm:pr-12 overflow-hidden">
        <div className="mb-2 flex items-center gap-2 text-gold">
          <MapPin className="h-4 w-4 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Interactive Sri Lanka Map</span>
        </div>
        <h2 className="premium-serif text-[5vw] sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl italic transition-colors duration-300 text-white whitespace-nowrap pb-2">
          Explore Destinations Geographically
        </h2>
      </div>

      {/* Controls Section WITH SEARCH */}
      <div className="flex w-full flex-col xl:flex-row justify-between items-start xl:items-end gap-5 xl:gap-4 mt-2 sm:mt-0 z-20">
        {/* Search Field */}
        <div className="w-full xl:w-auto relative z-30">
          <SearchInput
            value={query}
            onChange={(val: string) => setQuery(val)}
            placeholder="Search destinations..."
            count={filteredCount}
            itemLabel="Destination"
            className="w-full xl:w-96"
          />
        </div>

        <div className="flex w-full xl:w-auto items-center justify-end gap-3 sm:gap-4 shrink-0 pt-1 xl:pt-0">
          <div className="relative flex items-center shrink-0">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ outline: "none", boxShadow: "none", WebkitTapHighlightColor: "transparent" }}
              className={`flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border px-3 py-1.5 sm:px-3.5 text-[10px] sm:text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent] ${
                isDarkMode
                  ? "border-white/10 bg-white/5 text-gold hover:bg-white/10"
                  : "border-gold/60 bg-lanka-black text-gold hover:bg-black hover:border-gold"
              }`}
              title="Toggle Map Theme"
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{isDarkMode ? "Light Map" : "Dark Map"}</span>
            </button>

            <span className="absolute -bottom-5 right-1 sm:right-2 whitespace-nowrap text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-slate-400">
              Set your map mood
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
