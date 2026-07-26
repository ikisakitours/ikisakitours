"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "@/components/auth/signUp/CountrySelect";

export function WriteReviewForm() {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  // Validation Hook
  const { errors, validate, setErrors } = useValidationForm();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate({
      fullName: fullName,
      country: country,
      rating: rating,
      experience: experience,
    });

    if (isValid) {
      console.log("Form is valid! Submitting...", { fullName, country, rating, experience });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-4xl border border-white/5 bg-linear-to-br from-surface/90 to-lanka-black px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-12 md:px-8 md:pt-8 md:pb-16 lg:px-10 lg:pt-10 lg:pb-20 xl:pb-24 2xl:pb-28 3xl:px-12 3xl:pt-12 3xl:pb-32 -mt-1 ">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[2rem_2rem]" />
      <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gold/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[3.5rem] font-bold leading-none tracking-tighter text-white/3 
                       min-[400px]:text-[4.2rem]
                       sm:text-[6rem] 
                       md:text-[8rem] 
                       lg:text-[10rem] 
                       xl:text-[13rem] 
                       2xl:text-[15rem] 
                       3xl:text-[19rem]"
      >
        JOURNEYS
      </div>
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left Side: Image & Text*/}
        <div className="relative flex min-h-75 w-full flex-col justify-end rounded-3xl lg:min-h-full lg:w-5/12">
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-black transform-gpu mask-[-webkit-radial-gradient(white,black)]">
            <Image
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop"
              alt="Safari Experience"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,1)]" />

          <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl border border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] mix-blend-overlay" />

          <div className="relative z-30 p-8 3xl:p-12">
            <div className="mb-4 inline-block rounded-full border border-gold/20 bg-gold/10 px-3 py-1 backdrop-blur-md">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                Share Your Story
              </span>
            </div>
            <h3 className="mb-4 text-3xl font-light leading-tight text-white 3xl:text-4xl">
              Inspire the next <br />
              <span className="premium-serif italic text-gold">Generation</span> of explorers.
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/70 3xl:text-base">
              Your feedback is the compass that guides our future journeys. Tell us about the moments that took your
              breath away.
            </p>
          </div>
        </div>

        {/*Right Side: The Form*/}
        <div className="w-full py-4 lg:w-7/12 lg:py-8 lg:pr-8 3xl:py-12">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 3xl:space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1 ml-2 text-[10px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="e.g. Marco Rossi"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6 3xl:text-lg"
                />
                <div className="ml-2">
                  <FormError message={errors.fullName} />
                </div>
              </div>
              <div className="flex flex-col">
                <CountrySelect
                  countryName={country}
                  setCountryName={(val) => {
                    setCountry(val);
                    setErrors((prev) => ({ ...prev, country: "" }));
                  }}
                  error={errors.country}
                  clearError={() => setErrors((prev) => ({ ...prev, country: "" }))}
                  inputClass="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white transition-colors group-hover:border-gold/50 focus:border-gold/50 focus:outline-none 3xl:py-6"
                  showIcon={false}
                  customLabel={
                    <label className="mb-1 ml-2 block text-[10px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                      Country
                    </label>
                  }
                />
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col gap-1">
              <div className="rounded-2xl border border-white/5 bg-white/5 py-8 text-center shadow-inner 3xl:py-12">
                <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-gold opacity-80 3xl:text-xs">
                  Your Rating
                </label>
                <div className="flex justify-center gap-2 text-2xl text-slate-600 3xl:gap-8 3xl:text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => {
                        setRating(star);
                        setErrors((prev) => ({ ...prev, rating: "" }));
                      }}
                      className={`h-6 w-6 cursor-pointer transition-all duration-300 hover:scale-125 3xl:h-12 3xl:w-12 ${
                        rating >= star ? "fill-gold text-gold" : "hover:text-gold/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <FormError message={errors.rating} />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-2 text-[10px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                Your Experience
              </label>
              <textarea
                value={experience}
                onInput={handleInput}
                onChange={(e) => {
                  setExperience(e.target.value);
                  setErrors((prev) => ({ ...prev, experience: "" }));
                }}
                placeholder="Tell other travelers about your safari..."
                className="auto-resize-textarea min-h-30 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[14px] italic leading-relaxed text-white transition-colors focus:border-gold/50 focus:outline-none md:text-[15px] 3xl:py-6 3xl:text-xl"
              />
              <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
                * Box will expand automatically as you type.
              </span>
              <div className="ml-2">
                <FormError message={errors.experience} />
              </div>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-full py-5 text-[11px] tracking-[0.3em] shadow-xl shadow-gold/10 3xl:py-8 3xl:text-sm"
            >
              Submit Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
