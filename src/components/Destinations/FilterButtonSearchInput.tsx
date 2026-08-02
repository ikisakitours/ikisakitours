import React from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Filter } from "lucide-react";

type FilterButtonSearchInputProps = {
  query: string;
  setQuery: (val: string) => void;
  category: string;
  filteredCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  initialCount: number;
  setIsFilterOpen: (isOpen: boolean) => void;
};

export default function FilterButtonSearchInput({
  query,
  setQuery,
  category,
  filteredCount,
  setVisibleCount,
  initialCount,
  setIsFilterOpen,
}: FilterButtonSearchInputProps) {
  return (
    <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24 space-y-8">
    <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="relative flex shrink-0 justify-start">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
          >
            <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
            <span className="transition-colors duration-300 group-hover:text-black sm:hidden">Filter Regions</span>
            <span className="hidden transition-colors duration-300 group-hover:text-black sm:block">
              Filter Regions
            </span>

            {category !== "all" && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                1
              </span>
            )}
          </button>
        </div>

        {/* Search Input */}
        <SearchInput
          value={query}
          onChange={(val) => {
            setQuery(val);
            setVisibleCount(initialCount);
          }}
          placeholder="Search destinations "
          count={filteredCount}
          itemLabel="Destination"
          className="lg:w-96  md:w-72"
        />
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
