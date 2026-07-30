"use client";

import React, { useState, useEffect, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CustomCountrySelect } from "@/components/ui/CustomCountrySelect";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export function ChatMailForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [detectedCode, setDetectedCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDetecting, setIsDetecting] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();

  // IP Location Detection
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsDetecting(true);
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error(`API Fetch Failed with status: ${res.status}`);
        const apiData = await res.json();
        if (apiData.country_code) {
          setDetectedCode(apiData.country_code);
          setSelectedCountry(apiData.country_code);
        }
      } catch (error) {
        console.warn("Location detection failed.", error);
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, []);

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
            <span className={`${floatingLabelClass} text-[10px]`}>Full Name *</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px]`}
              placeholder="Alexander Knight"
            />
          </label>
          <div className="ml-2 mt-0.5">
            <FormError message={errors.fullName} />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>Email Address *</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleTextChange}
              className={`${inputClass} pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px]`}
              placeholder="alex@example.com"
            />
          </label>
          <div className="ml-2 mt-0.5">
            <FormError message={errors.email} />
          </div>
        </div>

        {/* Phone Number with IP Detection */}
        <div className="flex flex-col gap-1">
          <label className="relative block">
            <span className={`${floatingLabelClass} text-[10px]`}>Phone Number *</span>
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
              <p className="text-[9px] italic text-slate-500 animate-pulse">Detecting dialing code...</p>
            ) : (
              <>
                {!userInteracted && detectedCode && (
                  <p className="text-[9px] font-medium text-emerald-500/80">
                    We automatically detected your location. If this is incorrect, please change it.
                  </p>
                )}
                {userInteracted && detectedCode && selectedCountry === detectedCode && (
                  <p className="text-[9px] font-medium text-emerald-500/80">Location confirmed successfully!</p>
                )}
                {userInteracted && detectedCode && selectedCountry !== detectedCode && (
                  <p className="text-[9px] font-medium text-amber-500/90">
                    Note: The selected dialing code differs from your detected location. Please check.
                  </p>
                )}
              </>
            )}
            <FormError message={errors.phone} />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="relative block">
            <span className={`${fieldLabelClass} text-[10px]`}>Message *</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => {
                handleTextChange(e);
                handleInput(e);
              }}
              className={`${inputClass} auto-resize-textarea min-h-22.5 md:min-h-20 w-full resize-none pt-6 pb-2.5 md:pt-5 md:pb-2 text-[13px] transition-all focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
              placeholder="Type Your Message And Hit Enter..."
            />
            <span className="ml-1 mt-0.5 block text-[9px] font-medium text-slate-500 leading-relaxed">
              * Box will expand automatically as you type.
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
          Start Chat
        </Button>
      </div>
    </form>
  );
}
