"use client";
import { type FormEvent, useState } from "react";
import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { TravelerPicker } from "@/components/ui/TravelerPicker";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
//Icons
import { Check, Info, Zap, Banknote, CalendarDays } from "lucide-react";

type TourType = {
  title: string;
  price: number;
  discount?: number | string;
  likes: number;
};

type TravelerOptionType = {
  type: string;
  label: string;
  ageRange: string;
};

type BookingWidgetProps = {
  tour: TourType;
  options: TravelerOptionType[];
  assurances: readonly string[];
};
const bookingAssurances = [Zap, Banknote, CalendarDays];
export function BookingWidget({ tour, options, assurances }: BookingWidgetProps) {
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });
  const [journeyDate, setJourneyDate] = useState("");

  // Traveler Logic
  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;

      const current = prev[type] || 0;
      const next = current + actualDelta;

      if (next < 0) return prev;

      return { ...prev, [type]: next };
    });
  };
  // Validation Hook
  const { errors, validate, setErrors } = useValidationForm();

  // Form Submit Handler
  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      date: journeyDate,
      counts: travelerCounts,
    });
    if (isValid) {
      console.log("Form is valid, proceed to  API call");
    }
  };

  return (
    <aside className="mt-12 w-full md:mx-auto md:max-w-105 xl:mx-0 xl:mt-0 xl:w-1/3 xl:max-w-none">
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar space-y-4 pb-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Love this tour?</span>

          <div className="flex items-center gap-3">
            <LikeButton
              initialLikes={tour.likes}
              className="group glass-card flex h-10 w-auto items-center justify-center gap-2.5 rounded-full border border-white/5 px-4 transition-all hover:border-gold/30"
            />
            <div className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all hover:border-gold/30">
              <ShareButton title={tour.title} text="Check out this tour" url="/booking-page" />
            </div>
          </div>
        </div>
        <form className="glass-card rounded-4xl p-6 shadow-2xl" onSubmit={handleBookingSubmit}>
          {/* Header */}
          <div className="mb-6 border-b border-white/10 pb-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">MapMate Rate</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tighter text-white">${tour.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">/ Per Person</span>
                </div>
              </div>
              {Number(tour.discount) > 0 && (
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold">
                  Save {tour.discount}%
                </span>
              )}
            </div>

            <div className="relative mt-3 p-3 sm:p-4 rounded-xl border border-gold/20 bg-gold/5 overflow-hidden">
              <div
                className="absolute -inset-0.5 rounded-[13px] animate-spin-slow opacity-80"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, #c5a059 20deg, #f1d592 60deg, #c5a059 100deg, transparent 180deg)",
                }}
              />

              <div className="absolute inset-0.5 rounded-xl bg-[#0a0a0a]" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <h4 className="text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-widest text-gold">
                  ✨ Group discount applies
                </h4>
                <p className="text-[11px] sm:text-[12px] md:text-[13px] font-medium text-slate-400 italic leading-tight text-center">
                  Price per person decreases for larger groups.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
                Journey Date
              </label>
              <CustomDatePicker
                value={journeyDate}
                onChange={(d) => {
                  setJourneyDate(d);
                  if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                }}
              />

              <div className="ml-2">
                <FormError message={errors.date} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
                Travelers
              </label>
              <TravelerPicker
                options={options.map((opt) => ({ type: opt.type, label: opt.label, ageRange: opt.ageRange }))}
                counts={travelerCounts}
                onChange={(type, delta) => {
                  handleTravelerChange(type, delta);
                  if (errors.travelers) setErrors((prev) => ({ ...prev, travelers: "" }));
                }}
              />
              <div className="ml-2">
                <FormError message={errors.travelers} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" variant="auth" className="w-full">
            Check Availability
          </Button>

          {/* Assurances */}
          <div className="space-y-3 border-t border-white/5 pt-4 mt-4">
            {assurances.map((assurance, idx) => {
              const Icon = bookingAssurances[idx] || Check;
              return (
                <p
                  key={assurance}
                  className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />

                  {assurance}
                </p>
              );
            })}
            <div className="rounded-xl border border-gold/10 bg-gold/5 p-3 mt-4">
              <p className="flex items-center justify-center text-center text-[9px] font-medium uppercase leading-relaxed tracking-[0.15em] text-slate-300">
                <Info className="mr-1.5 h-3.5 w-3.5 shrink-0 text-gold opacity-70" />
                <span>Price may vary based on custom selections.</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
