"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import { floatingLabelClass, inputClass, fieldLabelClass } from "@/components/contact/formStyles";

type FormProps = {
  title: string;
  tourOptions: string[];
};

export default function ContactForm({ title, tourOptions }: FormProps) {
  const [tourType, setTourType] = useState("");

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="lg:col-span-2">
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <h2 className="premium-serif mb-8 text-2xl text-white">{title}</h2>
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" noValidate>
          <label className="relative block">
            <span className={floatingLabelClass}>Full Name *</span>
            <input type="text" className={`${inputClass} pt-5`} placeholder="Alexander Knight" />
          </label>

          <label className="relative block">
            <span className={floatingLabelClass}>Email Address *</span>
            <input type="email" className={`${inputClass} pt-5`} placeholder="alex@example.com" />
          </label>

          <label className="relative block">
            <span className={floatingLabelClass}>Phone Number</span>
            <input type="tel" className={`${inputClass} pt-5`} placeholder="+94 77 123 4567" />
          </label>

          <div className="relative">
            <span className={floatingLabelClass}>Tour Interest</span>
            <CustomSelect value={tourType} onChange={setTourType} options={tourOptions} />
          </div>

          <label className="relative block md:col-span-2">
            <span className={floatingLabelClass}>Subject *</span>
            <input type="text" className={`${inputClass} pt-5`} placeholder="What is this about?" />
          </label>

          <label className="relative block md:col-span-2">
            <span className={fieldLabelClass}>Message</span>
            <textarea
              className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none pt-5 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
              placeholder="Tell us about your travel plans, questions, or any special requirements..."
              onInput={handleInput}
            />
            <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
              * Box will expand automatically as you type.
            </span>
          </label>

          <div className="md:col-span-2 pt-4">
            <Button variant="inquire" className="w-full justify-center">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
