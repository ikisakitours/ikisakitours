"use client";

import React, { useState, useEffect } from "react";
import { floatingLabelClass, inputClass, fieldLabelClass } from "./formStyles";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";

import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";

//Icons
import { UserRound, ShieldCheck, CreditCard, Headset } from "lucide-react";

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

const badgeIcons = [ShieldCheck, CreditCard, Headset];

export function ContactForm({ data, setData, errors, setErrors }: ContactFieldsProps) {
  const tForm = useTranslations("SharedForm");
  const tErr = useTranslations("ValidationErrors");
  const tServices = useTranslations("Services");

  const assuranceBadges = tServices.raw("AssuranceBadges") as string[];

  const [detectedCode, setDetectedCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDetecting, setIsDetecting] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsDetecting(true);
        const res = await fetch("https://ipapi.co/json/");

        if (!res.ok) {
          throw new Error(`API Fetch Failed with status: ${res.status}`);
        }

        const apiData = await res.json();

        if (apiData.country_code) {
          setDetectedCode(apiData.country_code);
          setSelectedCountry(apiData.country_code);
        }
      } catch (error) {
        console.warn("Location detection failed in Contact Form (API Limit maybe).", error);
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
              <span className={floatingLabelClass}>{tForm("Labels.fullName")}</span>
              <input
                className={`${inputClass} pt-5`}
                value={data.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder={tForm("Placeholders.fullName")}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.fullName} />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.email")}</span>
              <input
                type="email"
                className={`${inputClass} pt-5`}
                placeholder={tForm("Placeholders.email")}
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.email} />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.whatsapp")}</span>
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
                countrySelectComponent={CustomCountrySelect}
                className={`${inputClass} focus-within:border-gold/60 focus-within:bg-white/[0.07] pt-5 flex items-center [&_.PhoneInputCountry]:bg-transparent! [&_.PhoneInputCountry]:hover:bg-transparent!`}
                numberInputProps={{
                  className:
                    "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-sm ml-2",
                  placeholder: tForm("Placeholders.phone"),
                }}
              />
            </label>

            <div className="ml-2 mt-1">
              {isDetecting ? (
                <p className="text-[10px] italic text-slate-500 animate-pulse">{tErr("PhoneDetection.detecting")}</p>
              ) : (
                <>
                  {!userInteracted && detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                      {tErr("PhoneDetection.autoDetected")}
                    </p>
                  )}

                  {userInteracted && detectedCode && selectedCountry === detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-emerald-500/80">
                      {tErr("PhoneDetection.confirmed")}
                    </p>
                  )}

                  {userInteracted && detectedCode && selectedCountry !== detectedCode && (
                    <p className="text-[10px] font-medium leading-relaxed text-amber-500/90">
                      {tErr("PhoneDetection.mismatch")}
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
            <span className={fieldLabelClass}>{tForm("Labels.specialRequests")}</span>
            <textarea
              className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none p-4 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
              placeholder={tForm("Placeholders.specialRequests")}
              onInput={handleInput}
              value={data.specialRequests}
              onChange={(e) => updateField("specialRequests", e.target.value)}
            />
            <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
              {tForm("Messages.autoExpand")}
            </span>
          </label>
          <div className="ml-2">
            <FormError message={errors.specialRequests} />
          </div>
        </div>

        <div className="mx-auto max-w-xs">
          <Button type="submit" variant="explore" className="w-full justify-center">
            {tForm("Buttons.checkAvailability")}
          </Button>

          <div className="mt-8 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-5 gap-y-3">
            {assuranceBadges.map((badge, index) => {
              const Icon = badgeIcons[index] || ShieldCheck;
              return (
                <span
                  key={badge}
                  className="flex items-center gap-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-slate-500"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {badge}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
