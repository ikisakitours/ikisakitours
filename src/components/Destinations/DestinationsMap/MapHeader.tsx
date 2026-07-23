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
    <div className="mb-4 flex flex-col gap-3 sm:gap-4">
      {/* Title Section */}
      <div className="w-full pr-10 sm:pr-12">
        <div className="mb-2 flex items-center gap-2 text-gold">
          <MapPin className="h-4 w-4 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Interactive Sri Lanka Map</span>
        </div>
        <h2 className="premium-serif text-2xl italic md:text-3xl transition-colors duration-300 text-white">
          Explore Destinations Geographically
        </h2>
      </div>

      {/* Controls Section WITH SEARCH */}
      <div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-2 sm:mt-0 z-20">
        <div className="w-full sm:w-auto relative z-30">
          <SearchInput
            value={query}
            onChange={(val: string) => setQuery(val)}
            placeholder="Search destinations..."
            count={filteredCount}
            itemLabel="Destination"
            className="w-full sm:w-64 lg:w-96"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto shrink-0">
          <span className="text-[9px] sm:text-[10px] font-medium tracking-widest text-slate-400 text-right">
            Click a place to view details
          </span>

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
        </div>
      </div>
    </div>
  );
}
