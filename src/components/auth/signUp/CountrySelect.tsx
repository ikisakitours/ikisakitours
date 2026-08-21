/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { FormError } from "@/components/ui/FormError";
import { ALL_COUNTRIES } from "@/data/auth";
import { useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";
import { LocationDetectionFeedback } from "@/components/ui/LocationDetectionFeedback";

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
  disabled?: boolean;
}

export function CountrySelect({
  countryName,
  setCountryName,
  error,
  clearError,
  inputClass,
  showIcon = true,
  customLabel,
  disabled = false,
}: CountrySelectProps) {
  const tValidate = useTranslations("ValidationErrors");
  const tForm = useTranslations("SharedForm");

  const [countriesList, setCountriesList] = useState(ALL_COUNTRIES);
  const [countryCode, setCountryCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [detectedCode, setDetectedCode] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: locationData, isDetecting } = useUserLocation();

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
    if (locationData?.country_code && locationData?.country_name) {
      const timer = setTimeout(() => {
        setCountriesList((prev) => {
          if (!prev.some((c) => c.code === locationData.country_code)) {
            const updatedList = [...prev, { code: locationData.country_code, name: locationData.country_name }];
            return updatedList.sort((a, b) => a.name.localeCompare(b.name));
          }
          return prev;
        });

        if (detectedCode !== locationData.country_code) {
          setDetectedCode(locationData.country_code);
        }

        if (!userInteracted) {
          if (countryCode !== locationData.country_code) {
            setCountryCode(locationData.country_code);
          }
          if (countryName !== locationData.country_name) {
            setCountryName(locationData.country_name);
          }
        }
      }, 0); // Queues state updates to the next tick

      return () => clearTimeout(timer);
    }
  }, [locationData, userInteracted, detectedCode, countryCode, countryName, setCountryName]);

  const filteredCountries = countriesList.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="block space-y-2 w-full" ref={dropdownRef}>
      {customLabel ? (
        customLabel
      ) : (
        <span className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold">
          {tForm("Labels.country")}
        </span>
      )}

      <div
        className={`group relative block w-full ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => {
          if (disabled) return;
          setIsDropdownOpen(!isDropdownOpen);
          if (isDropdownOpen) setSearchQuery("");
        }}
      >
        {showIcon && (
          <span className="absolute left-5 inset-y-0 flex items-center pointer-events-none">
            <Globe className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-600 transition-colors group-focus-within:text-gold" />
          </span>
        )}

        <div className={`${inputClass} ${showIcon ? "pl-12" : ""} pr-10 flex items-center min-h-12 3xl:min-h-15`}>
          {countryName ? (
            <div className="flex items-center gap-3">
              {countryCode && (
                <img
                  src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                  alt={countryName}
                  className="w-5 h-auto object-cover shadow-sm"
                />
              )}
              <span className="text-white text-body-sm">{countryName}</span>
            </div>
          ) : (
            <span className="text-slate-500 text-body-sm">{tForm("Placeholders.selectCountry")}</span>
          )}
        </div>
        <ChevronDown
        strokeWidth={3}
          className={`absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-500 transition-all duration-300 group-hover:text-gold ${isDropdownOpen ? "rotate-180 text-gold" : ""}`}
        />

        {isDropdownOpen && !disabled && (
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-body-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-colors"
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
                    <img
                      src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                      alt={c.name}
                      className="w-5 h-auto object-cover shadow-sm"
                    />

                    <span className="text-body-sm">{c.name}</span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-body-sm text-slate-500">{tValidate("noCountries")}</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ml-2 mt-2">
        <LocationDetectionFeedback
          isDetecting={isDetecting}
          userInteracted={userInteracted}
          detectedCode={detectedCode}
          selectedCode={countryCode}
          messages={{
            detecting: tValidate("LocationDetection.detecting"),
            autoDetected: tValidate("LocationDetection.autoDetected"),
            fallback: tValidate("LocationDetection.fallback"),
            confirmed: tValidate("LocationDetection.confirmed"),
            mismatch: tValidate("LocationDetection.mismatch"),
            success: tValidate("LocationDetection.success"),
          }}
        />
        <FormError message={error} />
      </div>
    </div>
  );
}
