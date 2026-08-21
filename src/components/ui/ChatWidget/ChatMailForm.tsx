"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { LocationDetectionFeedback } from "@/components/ui/LocationDetectionFeedback";
import { useChatMailForm } from "@/hooks/ChatWidget/useChatMailForm";

export function ChatMailForm() {
  const t = useTranslations("ChatWidget.MailForm");
  const tPhone = useTranslations("ValidationErrors.PhoneDetection");
  const tFrom = useTranslations("SharedForm");

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  //  Hook
  const {
    formData,
    selectedCountry,
    setSelectedCountry,
    userInteracted,
    setUserInteracted,
    hideMessage,
    setHideMessage,
    isLoading,
    errors,
    detectedCode,
    isDetecting,
    handleTextChange,
    handlePhoneChange,
    handleSubmit,
  } = useChatMailForm();
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-fade-in-up min-h-95 flex flex-col justify-between"
      noValidate
    >
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>{t("fullNameLabel")}</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              disabled={isLoading}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px] disabled:opacity-60 disabled:cursor-not-allowed`}
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
              disabled={isLoading}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px] disabled:opacity-60 disabled:cursor-not-allowed`}
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
              disabled={isLoading}
              onCountryChange={(country) => {
                if (country) {
                  setSelectedCountry(country);
                  setUserInteracted(true);
                  setHideMessage(false);
                }
              }}
              onChange={handlePhoneChange}
              countrySelectComponent={CustomCountrySelect}
              className={`${inputClass} focus-within:border-gold/60 focus-within:bg-white/[0.07] pt-6 pb-2.5 md:pt-5 md:pb-2 flex items-center [&_.PhoneInputCountry]:bg-transparent! [&_.PhoneInputCountry]:hover:bg-transparent!`}
              numberInputProps={{
                className:
                  "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-[13px] ml-2 disabled:opacity-60 disabled:cursor-not-allowed",
                placeholder: "+94 77 123 4567",
                onInput: () => setHideMessage(true),
              }}
            />
          </label>

          {/* IP Detection Feedbacks */}
          <div className="ml-2 mt-0.5">
            {!hideMessage && (
              <LocationDetectionFeedback
                isDetecting={isDetecting}
                userInteracted={userInteracted}
                detectedCode={detectedCode}
                selectedCode={selectedCountry}
                textClassName="text-[9px]"
                messages={{
                  detecting: tPhone("detecting"),
                  autoDetected: tPhone("autoDetected"),
                  confirmed: tPhone("confirmed"),
                  mismatch: tPhone("mismatch"),
                }}
              />
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
              disabled={isLoading}
              onChange={(e) => {
                handleTextChange(e);
                handleInput(e);
              }}
              className={`${inputClass} auto-resize-textarea min-h-22.5 md:min-h-20 w-full resize-none pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px] transition-all focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed`}
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
          disabled={isLoading}
          className="w-full md:w-full justify-center py-2.5 md:py-4 text-sm rounded-xl"
        >
          <Send size={15} className="mr-2" />
          {isLoading ? tFrom("ButtonsLoading.sending") : tFrom("Buttons.startChat")}
        </Button>
      </div>
    </form>
  );
}
