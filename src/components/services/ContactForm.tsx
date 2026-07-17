import React from "react";
import { assuranceBadges } from "@/data/privateVehicle";
import { floatingLabelClass, inputClass, fieldLabelClass } from "./privateVehicle/formStyles";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";

//Icons
import { UserRound } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export type ContactData = {
  fullName: string;
  email: string;
  whatsapp: string;
  specialRequests: string;
};

type ContactFieldsProps = {
  data: ContactData;
  setData: React.Dispatch<React.SetStateAction<ContactData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function ContactForm({ data, setData, errors, setErrors }: ContactFieldsProps) {
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

          <div className="flex flex-col gap-1">
            <label className="relative block">
              <span className={floatingLabelClass}>WhatsApp Number</span>
              <input
                type="tel"
                className={`${inputClass} pt-5`}
                placeholder="+94 77 123 4567"
                value={data.whatsapp}
                onChange={(e) => updateField("whatsapp", e.target.value)}
              />
            </label>
            <div className="ml-2">
              <FormError message={errors.whatsapp} />
            </div>
          </div>
        </div>

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
