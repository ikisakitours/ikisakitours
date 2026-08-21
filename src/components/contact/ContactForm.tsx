"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";
import { LocationDetectionFeedback } from "@/components/ui/LocationDetectionFeedback";

export default function ContactForm() {
  const tPage = useTranslations("ContactPage.Form");
  const tForm = useTranslations("SharedForm");
  const tErr = useTranslations("ValidationErrors");

  const INQUIRY_OPTIONS = tPage.raw("inquiryOptions") as string[];
  const tourOptions = tPage.raw("tourOptions") as string[];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [inquiryType, setInquiryType] = useState("");
  const [tourType, setTourType] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const { data: locationData, isDetecting } = useUserLocation();

  const detectedCode = locationData?.country_code || "";

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

    const validationPayload: Record<string, string> = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      inquiryType: inquiryType,
      subject: formData.subject,
      message: formData.message,
    };

    // Note: Assuming "Tour Inquiry & Availability" or equivalent index logic.
    // We check if it's the first option or strictly string match.
    if (inquiryType === INQUIRY_OPTIONS[0]) {
      validationPayload.tourInterest = tourType;
    }

    const isValid = validate(validationPayload);

    if (isValid) {
      console.log("Form is valid, proceed to API call", { ...formData, tourType });
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="premium-serif mb-8 text-2xl text-white">{tPage("title")}</h2>

        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
          {/* Full Name */}
          <div>
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.fullName")} *</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder={tForm("Placeholders.fullName")}
              />
            </label>
            <div className="ml-2 mt-1">
              <FormError message={errors.fullName} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.email")} *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder={tForm("Placeholders.email")}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.email} />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.phone")}</span>
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

          {/* Inquiry Options */}
          <div className="relative">
            <span className={floatingLabelClass}>{tForm("Labels.inquiryType")}</span>
            <CustomSelect
              value={inquiryType}
              onChange={(val) => {
                setInquiryType(val);
                setErrors((prev) => ({ ...prev, inquiryType: "" }));
                if (val !== INQUIRY_OPTIONS[0]) {
                  setTourType("");
                }
              }}
              options={INQUIRY_OPTIONS}
              className={`${inputClass} pt-5`}
              placeholder={tForm("Placeholders.inquiryType")}
            />
            <div className="ml-2">
              <FormError message={errors.inquiryType} />
            </div>
          </div>

          {/* Tour Interest */}
          {inquiryType === INQUIRY_OPTIONS[0] && (
            <div className="relative">
              <span className={floatingLabelClass}>{tForm("Labels.tourInterest")}</span>
              <CustomSelect
                value={tourType}
                onChange={(val) => {
                  setTourType(val);
                  setErrors((prev) => ({ ...prev, tourInterest: "" }));
                }}
                options={tourOptions}
                className={`${inputClass} pt-5`}
                placeholder={tForm("Placeholders.tourInterest")}
              />

              <div className="ml-2">
                <FormError message={errors.tourInterest} />
              </div>
            </div>
          )}

          {/* Subject */}
          <div className="md:col-span-2">
            <label className="relative block">
              <span className={floatingLabelClass}>{tForm("Labels.subject")}</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleTextChange}
                className={`${inputClass} pt-5`}
                placeholder={tForm("Placeholders.subject")}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.subject} />
            </div>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="relative block">
              <span className={fieldLabelClass}>{tForm("Labels.message")}</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => {
                  handleTextChange(e);
                  handleInput(e);
                }}
                className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none pt-5 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
                placeholder={tForm("Placeholders.message")}
              />
              <span className="mt-1 block text-caption font-medium text-slate-500 leading-relaxed">
                {tForm("Messages.autoExpand")}
              </span>
            </label>
            <div className="ml-2">
              <FormError message={errors.message} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4 flex justify-end">
            <Button type="submit" variant="inquire" className="text-caption! w-full md:justify-center!">
              {tForm("Buttons.sendMessage")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
