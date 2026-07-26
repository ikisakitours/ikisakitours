"use client";

import { type FormEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import PhoneInput, { Country, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
//Icons
import { Globe, ChevronDown, Search } from "lucide-react";

type FormProps = {
  title: string;
  tourOptions: string[];
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

  const filteredOptions = options.filter(
    (option) => option.value !== undefined && option.label.toLowerCase().includes(searchQuery.toLowerCase()),
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
// Main Form Component
// ==========================================
export default function ContactForm({ title, tourOptions }: FormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [tourType, setTourType] = useState("");

  // Phone Auto-detect States
  const [detectedCode, setDetectedCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDetecting, setIsDetecting] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();

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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      tourInterest: tourType,
      subject: formData.subject,
      message: formData.message,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call", { ...formData, tourType });
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="premium-serif mb-8 text-2xl text-white">{title}</h2>

        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
          {/* Full Name */}
          <div>
            <label className="relative block">
              <span className={floatingLabelClass}>Full Name *</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder="Alexander Knight"
              />
            </label>
            <div className="ml-2 mt-1">
              <FormError message={errors.fullName} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="relative block">
              <span className={floatingLabelClass}>Email Address *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder="alex@example.com"
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.email} />
            </div>
          </div>

          {/* Phone Number (with Custom Country Select and Detect Messages) */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>Phone Number *</span>
              <PhoneInput
                international
                defaultCountry={(detectedCode as Country) || "LK"}
                value={formData.phone}
                onCountryChange={(country) => {
                  if (country) setSelectedCountry(country);
                  setUserInteracted(true);
                }}
                onChange={(value) => {
                  setFormData({ ...formData, phone: value || "" });
                  setErrors((prev) => ({ ...prev, phone: "" }));
                  setUserInteracted(true);
                }}
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

          {/* Tour Interest */}
          <div className="relative">
            <span className={floatingLabelClass}>Tour Interest *</span>
            <CustomSelect
              value={tourType}
              onChange={(val) => {
                setTourType(val);
                setErrors((prev) => ({ ...prev, tourInterest: "" }));
              }}
              options={tourOptions}
              className={`${inputClass} pt-5`}
              placeholder="Select Tour Interest"
            />
            <div className="ml-2">
              <FormError message={errors.tourInterest} />
            </div>
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="relative block">
              <span className={floatingLabelClass}>Subject *</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder="What is this about?"
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.subject} />
            </div>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="relative block">
              <span className={fieldLabelClass}>Message *</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => {
                  handleTextChange(e);
                  handleInput(e);
                }}
                className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none pt-5 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
                placeholder="Tell us about your travel plans, questions, or any special requirements..."
              />
              <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
                * Box will expand automatically as you type.
              </span>
            </label>
            <div className="ml-2">
              <FormError message={errors.message} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <Button type="submit" variant="inquire" className="w-full justify-center">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
