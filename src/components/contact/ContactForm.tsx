"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type FormProps = {
  title: string;
  tourOptions: string[];
};

export default function ContactForm({ title, tourOptions }: FormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [tourType, setTourType] = useState("");

  // Validation Hook
  const { errors, validate, setErrors } = useValidationForm();

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

  // Form Submit Handler
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

          {/* Phone */}
          <div>
            <label className="relative block">
              <span className={floatingLabelClass}>Phone Number *</span>
              <PhoneInput
                international
                defaultCountry="LK"
                value={formData.phone}
                onChange={(value) => {
                  setFormData({ ...formData, phone: value || "" });
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                className={`${inputClass} focus-within:border-gold/60! focus-within:bg-white/[0.07]! pt-5 flex items-center gap-3 [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-white/15 [&_.PhoneInputCountry]:pr-3 [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountryIcon]:w-6 [&_.PhoneInputCountryIcon]:h-4 [&_.PhoneInputCountryIcon]:shadow-none [&_.PhoneInputCountryIcon--border]:border-none [&_.PhoneInputCountrySelectArrow]:text-gold! [&_.PhoneInputCountrySelectArrow]:border-gold! [&_.PhoneInputCountrySelectArrow]:opacity-100! [&_.PhoneInputCountrySelectArrow]:ml-3! [&_.PhoneInputCountrySelectArrow]:w-1.75! [&_.PhoneInputCountrySelectArrow]:h-1.75! [&_.PhoneInputCountrySelectArrow]:border-b-2! [&_.PhoneInputCountrySelectArrow]:border-r-2!`}
                numberInputProps={{
                  className:
                    "w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-slate-400 p-0 text-sm ml-1",
                  placeholder: "+94 77 123 4567",
                }}
              />
            </label>
            <div className="ml-2">
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
