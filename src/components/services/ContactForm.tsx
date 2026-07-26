import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { assuranceBadges } from "@/data/privateVehicle";
import { floatingLabelClass, inputClass, fieldLabelClass } from "./formStyles";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";

// Phone Input Imports
import PhoneInput, { Country, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Icons
import { UserRound, Globe, ChevronDown, Search } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export type ContactData = {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

type ContactFieldsProps = {
  data: ContactData;
  setData: React.Dispatch<React.SetStateAction<ContactData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

// ==========================================
// Custom Searchable Country Select Component
// ==========================================
type CustomCountrySelectProps = {
  value?: Country;
  onChange: (value?: Country) => void;
  options: { value?: Country; label: string }[];
};

const CustomCountrySelect = ({ value, onChange, options }: CustomCountrySelectProps) => {
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

  const filteredOptions = options.filter((option) =>
    option.value !== undefined && option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative flex items-center shrink-0 pr-3 border-r border-white/15" ref={dropdownRef}>
      <div
        className="flex items-center cursor-pointer gap-2 px-1 py-1 rounded-md hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption && selectedOption.value ? (
          <Image
            src={`https://flagcdn.com/w20/${selectedOption.value.toLowerCase()}.png`}
            alt={selectedOption.label}
            width={20}
            height={15}
            unoptimized
            className="w-5 h-auto object-cover shadow-sm"
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
          {/* Search Input එක */}
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

          {/* List එක */}
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
                    <Image
                      src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                      alt={option.label}
                      width={20}
                      height={15}
                      unoptimized
                      className="w-5 h-auto object-cover shadow-sm"
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


// ==========================================
// Main Contact Form Component
// ==========================================
export function ContactForm({ data, setData, errors, setErrors }: ContactFieldsProps) {
  const [detectedCode, setDetectedCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDetecting, setIsDetecting] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsDetecting(true);
        const res = await fetch("https://ipapi.co/json/");
        const apiData = await res.json();
        
        if (apiData.country_code) {
          setDetectedCode(apiData.country_code);
          setSelectedCountry(apiData.country_code);
        }
      } catch (error) {
        console.error("Location detection failed", error);
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, []);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const updateField = (field: keyof ContactData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute right-0 top-0 opacity-10">
        <UserRound className="h-24 w-24 text-gold" />
      </div>

      <div className="relative">
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>Full Name</span>
              <input
                className={`${inputClass} pt-5`}
                value={data.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Alexander Knight"
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.fullName} />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>Email Address</span>
              <input
                type="email"
                className={`${inputClass} pt-5`}
                placeholder="alex@example.com"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.email} />
            </div>
          </div>

          {/* Phone Number (Searchable Custom Dropdown Included) */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>WhatsApp Number *</span>
              <PhoneInput
                international
                defaultCountry={(detectedCode as Country) || "LK"} 
                value={data.phone}
                onCountryChange={(country) => {
                  if (country) setSelectedCountry(country);
                  setUserInteracted(true);
                }}
                onChange={(value) => {
                  updateField("phone", value || "");
                  setUserInteracted(true);
                }}
                // Custom Select Component එක ලබා දීම
                countrySelectComponent={CustomCountrySelect}
                className={`${inputClass} focus-within:border-gold/60 focus-within:bg-white/[0.07] pt-5 flex items-center`}
                numberInputProps={{
                  className:
                    "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-sm ml-2",
                  placeholder: "+94 77 123 4567",
                }}
              />
            </label>
            
            {/* Auto-detect Messages Logic */}
            <div className="ml-2 mt-1">
              {isDetecting ? (
                <p className="text-[10px] italic text-slate-500 animate-pulse">Detecting dialing code...</p>
              ) : (
                <>
                  {!userInteracted && detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                      We automatically detected your location. If this is incorrect, please change it.
                    </p>
                  )}

                  {userInteracted && detectedCode && selectedCountry === detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                      Location confirmed successfully!
                    </p>
                  )}

                  {userInteracted && detectedCode && selectedCountry !== detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-amber-500/90">
                      Note: The selected dialing code differs from your detected location. Please check.
                    </p>
                  )}
                </>
              )}
              <FormError message={errors.phone} />
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="flex flex-col gap-1 mb-8">
          <label className="block group">
            <span className={fieldLabelClass}>Special Requests</span>
            <textarea
              className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none p-4 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
              placeholder="Flight number, luggage notes, child seats, or route preferences"
              onInput={handleInput}
              value={data.specialRequests}
              onChange={(e) => updateField("specialRequests", e.target.value)}
            />
            <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
              * Box will expand automatically as you type.
            </span>
          </label>
          <div className="ml-2">
            <FormError message={errors.specialRequests} />
          </div>
        </div>

        <div className="mx-auto max-w-xs">
          <Button type="submit" variant="explore" className="w-full justify-center">
            Check Availability
          </Button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {assuranceBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-slate-500"
              >
                <FaCircleCheck className="h-3 w-3 text-gold" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}