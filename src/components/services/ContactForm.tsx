"use client";

import React, { useState } from "react";
import { floatingLabelClass, inputClass, fieldLabelClass } from "./formStyles";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";
import { LocationDetectionFeedback } from "@/components/ui/LocationDetectionFeedback";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";
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

  const [selectedCountry, setSelectedCountry] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);

  const { data: locationData, isDetecting } = useUserLocation();
  const detectedCode = locationData?.country_code || "";

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
                    "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-body-sm! ml-2",
                  placeholder: tForm("Placeholders.phone"),
                }}
              />
            </label>

            <div className="ml-2 mt-1">
              <LocationDetectionFeedback
                isDetecting={isDetecting}
                userInteracted={userInteracted}
                detectedCode={detectedCode}
                selectedCode={selectedCountry}
                messages={{
                  detecting: tErr("PhoneDetection.detecting"),
                  autoDetected: tErr("PhoneDetection.autoDetected"),
                  confirmed: tErr("PhoneDetection.confirmed"),
                  mismatch: tErr("PhoneDetection.mismatch"),
                }}
              />
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
            <span className="mt-1 block text-caption font-medium text-slate-500 leading-relaxed">
              {tForm("Messages.autoExpand")}
            </span>
          </label>
          <div className="ml-2">
            <FormError message={errors.specialRequests} />
          </div>
        </div>

        <div className="mx-auto max-w-xs">
          <Button type="submit" variant="explore" className="[&_span]:text-caption! w-full justify-center">
            {tForm("Buttons.checkAvailability")}
          </Button>

          <div className="mt-8 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-5 gap-y-3">
            {assuranceBadges.map((badge, index) => {
              const Icon = badgeIcons[index] || ShieldCheck;
              return (
                <span
                  key={badge}
                  className="flex items-center gap-2 whitespace-nowrap text-caption font-bold uppercase tracking-widest text-slate-500"
                >
                  <Icon className="h-4 w-4 text-gold 3xl:h-5 3xl:w-5" />
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
