"use client";

import React, { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";

export function ChatMailForm() {
  const t = useTranslations("ChatWidget.MailForm");
  const tPhone = useTranslations("ValidationErrors.PhoneDetection");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);
  const { data: locationData, isDetecting } = useUserLocation();
  const { errors, validate, setErrors } = useValidationForm();

  // IP Location Detection
const detectedCode = locationData?.country_code || "";
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-fade-in-up min-h-95 flex flex-col justify-between"
      noValidate
    >
      <div className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>{t("fullNameLabel")}</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px]`}
              placeholder={t("fullNamePlaceholder")}
            />
          </label>
          <div className="ml-2 mt-0.5">
            <FormError message={errors.fullName} />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>{t("emailLabel")}</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px]`}
              placeholder={t("emailPlaceholder")}
            />
          </label>
          <div className="ml-2 mt-0.5">
            <FormError message={errors.email} />
          </div>
        </div>

        {/* Phone Number with IP Detection */}
        <div className="flex flex-col gap-1">
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>{t("phoneLabel")}</span>
            <PhoneInput
              key={detectedCode || "default-key"}
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
              className={`${inputClass} focus-within:border-gold/60 focus-within:bg-white/[0.07] pt-6 pb-2.5 md:pt-5 md:pb-2 flex items-center [&_.PhoneInputCountry]:bg-transparent! [&_.PhoneInputCountry]:hover:bg-transparent!`}
              numberInputProps={{
                className:
                  "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-[13px] ml-2",
                placeholder: "+94 77 123 4567",
              }}
            />
          </label>

          {/* IP Detection Feedbacks */}
          <div className="ml-2 mt-0.5">
            {isDetecting ? (
              <p className="text-[9px] italic text-slate-500 animate-pulse">{tPhone("detecting")}</p>
            ) : (
              <>
                {!userInteracted && detectedCode && (
                  <p className="text-[9px] font-medium text-emerald-500/80">{tPhone("autoDetected")}</p>
                )}
                {userInteracted && detectedCode && selectedCountry === detectedCode && (
                  <p className="text-[9px] font-medium text-emerald-500/80">{tPhone("confirmed")}</p>
                )}
                {userInteracted && detectedCode && selectedCountry !== detectedCode && (
                  <p className="text-[9px] font-medium text-amber-500/90">{tPhone("mismatch")}</p>
                )}
              </>
            )}
            <FormError message={errors.phone} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="relative block">
            <span className={`${fieldLabelClass} text-[10px]`}>{t("messageLabel")}</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => {
                handleTextChange(e);
                handleInput(e);
              }}
              className={`${inputClass} auto-resize-textarea min-h-22.5 md:min-h-20 w-full resize-none pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px] transition-all focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
              placeholder={t("messagePlaceholder")}
            />
            <span className="ml-1 mt-0.5 block text-[9px] font-medium text-slate-500 leading-relaxed">
              {t("messageNote")}
            </span>
          </label>
          <div className="ml-2 mt-0.5">
            <FormError message={errors.message} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="inquire"
          className="w-full md:w-full justify-center py-2.5 md:py-4 text-sm rounded-xl"
        >
          <Send size={15} className="mr-2" />
          {t("submitButton")}
        </Button>
      </div>
    </form>
  );
}
