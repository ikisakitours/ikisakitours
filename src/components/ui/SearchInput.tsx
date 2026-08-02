import React from "react";
//Icon
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  count?: number;
  itemLabel?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  count,
  itemLabel = "Result",
  className = "",
}: SearchInputProps) {
  return (
    <label className={`group relative w-full ${className}`}>
      <span className="sr-only">{placeholder}</span>

      {/* Glow Effect එක */}
      <span className="absolute inset-0 bg-gold/20 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />

      <span className="relative flex items-center">
        <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/40 transition-colors group-focus-within:text-gold" />

        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/3 pl-5 pr-28 py-4 text-sm text-white backdrop-blur-md transition-all duration-300 placeholder:text-gray-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 [&::-webkit-search-cancel-button]:appearance-none"
        />

        {/* Count Badge එක */}
        {count !== undefined && (
          <span className="absolute right-4 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-400">
            {count} {itemLabel}
            {count === 1 ? "" : "s"}
          </span>
        )}
      </span>
    </label>
  );
}
