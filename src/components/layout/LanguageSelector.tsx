"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { languages } from "@/data/Languages-CurrencyData";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [baseLang, setBaseLang] = useState("EN");
  const [search, setSearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCurrencyChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newCurrency = customEvent.detail;
      const matchedLang = languages.find((l) => l.currency === newCurrency);
      if (matchedLang) {
        setBaseLang(matchedLang.code);
      }
    };
    window.addEventListener("currencyChanged", handleCurrencyChange);
    return () => window.removeEventListener("currencyChanged", handleCurrencyChange);
  }, []);

  // Search Filter
  const filteredLanguages = useMemo(() => {
    const q = search.toLowerCase();
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q),
    );
  }, [search]);

  const currentLang = languages.find((l) => l.code === baseLang) || languages[0];

  return (
    <div className="relative flex items-center z-70" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-1.5 rounded-full border pl-3.5 pr-2.5 py-1.75 transition-all duration-300 focus:outline-none ${
          isOpen ? "bg-gold/10 border-gold/50" : "bg-white/5 border-white/10 hover:border-gold/30 hover:bg-gold/5"
        }`}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="text-[13px] font-bold text-white transition-colors group-hover:text-gold">
          {currentLang.code}
        </span>
        <span className="text-[12px] font-bold text-gold/90">({currentLang.name})</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:text-gold ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-[#0a0a0a] border border-gold/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold opacity-0 transition-all duration-200 group-hover:opacity-100 shadow-2xl z-50 hidden md:block">
          Click to change language
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-3 w-80 origin-top-right overflow-hidden rounded-xl border border-gold/20 bg-lanka-black/95 backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Language</p>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search language (e.g. Sinhala, FR)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-[#050505] py-2 pl-9 pr-3 text-[13px] text-white placeholder:text-slate-600 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => {
              const isSelected = baseLang === lang.code;
              return (
                <button
                  key={lang.code}
                  ref={isSelected ? selectedItemRef : null}
                  onClick={() => {
                    setBaseLang(lang.code);
                    setIsOpen(false);
                    setSearch("");
                    window.dispatchEvent(new CustomEvent("languageChanged", { detail: lang.currency }));
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gold/10 ${
                    isSelected ? "bg-white/5 border-l-2 border-gold" : "border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span
                        className={`text-[13px] ${isSelected ? "font-bold text-gold" : "font-medium text-slate-200"}`}
                      >
                        {lang.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">{lang.nativeName}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-[12px] font-bold ${isSelected ? "text-gold" : "text-slate-400"}`}>
                      {lang.code}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-4 text-center text-sm text-slate-500">No language found</div>
          )}
        </div>
      </div>
    </div>
  );
}
