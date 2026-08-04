"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FormError } from "@/components/ui/FormError";
import { ALL_COUNTRIES } from "@/data/auth";
import { useTranslations } from "next-intl";
//Icons
import { Globe, ChevronDown, Search } from "lucide-react";

interface CountrySelectProps {
  countryName: string;
  setCountryName: (name: string) => void;
  error?: string;
  clearError?: () => void;
  inputClass: string;
  showIcon?: boolean;
  customLabel?: React.ReactNode;
}

export function CountrySelect({
  countryName,
  setCountryName,
  error,
  clearError,
  inputClass,
  showIcon = true,
  customLabel,
}: CountrySelectProps) {
  const tValidate = useTranslations("ValidationErrors");
  const tForm = useTranslations("SharedForm");

  const [countriesList, setCountriesList] = useState(ALL_COUNTRIES);
  const [countryCode, setCountryCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);

  const [detectedCode, setDetectedCode] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsDetecting(true);
        const res = await fetch("https://ipapi.co/json/");

        if (!res.ok) {
          throw new Error(`API Fetch Failed with status: ${res.status}`);
        }

        const data = await res.json();

        if (data.country_name && data.country_code) {
          setCountriesList((prev) => {
            if (!prev.some((c) => c.code === data.country_code)) {
              const updatedList = [...prev, { code: data.country_code, name: data.country_name }];
              return updatedList.sort((a, b) => a.name.localeCompare(b.name));
            }
            return prev;
          });

          setDetectedCode(data.country_code);
          setCountryCode(data.country_code);
          setCountryName(data.country_name);
        }
      } catch (error) {
        console.warn("Location detection failed (API Limit maybe). User needs to select manually.", error);
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, [setCountryName]);

  const filteredCountries = countriesList.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="block space-y-2 w-full" ref={dropdownRef}>
      {customLabel ? (
        customLabel
      ) : (
        <span className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
          {tForm("Labels.country")}
        </span>
      )}

      <div
        className="group relative block cursor-pointer w-full"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          if (isDropdownOpen) setSearchQuery("");
        }}
      >
        {showIcon && (
          <Globe className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-hover:text-gold" />
        )}

        <div className={`${inputClass} ${showIcon ? "pl-12" : ""} pr-10 flex items-center min-h-12 3xl:min-h-15`}>
          {countryName ? (
            <div className="flex items-center gap-3">
              {countryCode && (
                <Image
                  src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                  alt={countryName}
                  width={20}
                  height={15}
                  unoptimized
                  className="w-5 h-auto object-cover shadow-sm"
                />
              )}
              <span className="text-white text-sm 3xl:text-lg">{countryName}</span>
            </div>
          ) : (
            <span className="text-slate-500 text-sm 3xl:text-lg">{tForm("Placeholders.selectCountry")}</span>
          )}
        </div>
        <ChevronDown
          className={`absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-500 transition-all duration-300 group-hover:text-gold ${isDropdownOpen ? "rotate-180 text-gold" : ""}`}
        />

        {isDropdownOpen && (
          <div
            className="absolute left-0 top-full mt-2 w-full max-h-72 overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-2xl z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-white/5 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder={tForm("Placeholders.searchCountry")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-y-auto p-2 custom-scrollbar flex-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <div
                    key={c.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountryCode(c.code);
                      setCountryName(c.name);
                      setIsDropdownOpen(false);
                      setSearchQuery("");
                      setUserInteracted(true);
                      if (clearError) clearError();
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-gold/10 ${countryCode === c.code ? "bg-gold/20 text-gold" : "text-slate-200"}`}
                  >
                    <Image
                      src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                      alt={c.name}
                      width={20}
                      height={15}
                      unoptimized
                      className="w-5 h-auto object-cover shadow-sm"
                    />
                    <span className="text-sm">{c.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm text-slate-500">{tValidate("noCountries")}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ml-2 mt-2">
        {isDetecting ? (
          <p className="text-[10px] italic text-slate-500 animate-pulse">{tValidate("LocationDetection.detecting")}</p>
        ) : (
          <>
            {!userInteracted && detectedCode && (
              <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                {tValidate("LocationDetection.autoDetected")}
              </p>
            )}

            {!userInteracted && !detectedCode && (
              <p className="text-[10px] font-medium leading-relaxed text-slate-400">
                {tValidate("LocationDetection.fallback")}
              </p>
            )}

            {userInteracted && detectedCode && countryCode === detectedCode && (
              <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                {tValidate("LocationDetection.confirmed")}
              </p>
            )}

            {userInteracted && detectedCode && countryCode !== detectedCode && (
              <p className="text-[10px] font-medium leading-relaxed text-amber-500/90">
                {tValidate("LocationDetection.mismatch")}
              </p>
            )}

            {userInteracted && !detectedCode && (
              <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                {tValidate("LocationDetection.success")}
              </p>
            )}
          </>
        )}
        <FormError message={error} />
      </div>
    </div>
  );
}
