/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Country, getCountryCallingCode } from "react-phone-number-input";
import { Globe, ChevronDown, Search } from "lucide-react";

export type CustomCountrySelectProps = {
  value?: Country;
  onChange: (value?: Country) => void;
  options: { value?: Country; label: string }[];
};

export const CustomCountrySelect = ({ value, onChange, options }: CustomCountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option) => option.value !== undefined && option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative flex items-center shrink-0 pr-3 border-r border-white/15" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer gap-2 bg-transparent hover:bg-transparent transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption && selectedOption.value ? (
          <img
            src={`https://flagcdn.com/w20/${selectedOption.value.toLowerCase()}.png`}
            alt={selectedOption.label}
            className="w-5 h-auto object-cover shadow-sm"
            style={{ height: "auto" }}
          />
        ) : (
          <Globe className="w-5 h-5 text-slate-400" />
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-3 w-72 max-h-80 overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-2xl z-50 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 border-b border-white/5 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          <div className="overflow-y-auto p-2 custom-scrollbar flex-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value || "intl"}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer hover:bg-gold/10 ${
                    value === option.value ? "bg-gold/20 text-gold" : "text-slate-200"
                  }`}
                >
                  {option.value ? (
                    <img
                      src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                      alt={option.label}
                      className="w-5 h-auto object-cover shadow-sm"
                      style={{ height: "auto" }}
                    />
                  ) : (
                    <Globe className="w-6 h-6 text-slate-400 shrink-0" />
                  )}
                  <span className="text-sm truncate flex-1">{option.label}</span>
                  {option.value && (
                    <span className="text-xs font-medium text-slate-400 shrink-0">
                      +{getCountryCallingCode(option.value)}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-6 text-center text-sm text-slate-500">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
