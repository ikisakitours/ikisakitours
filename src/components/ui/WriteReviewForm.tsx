"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";
import { useWriteReviewForm } from "@/hooks/testimonials/useWriteReviewForm";

export function WriteReviewForm() {
  const tForm = useTranslations("Testimonials.FormHero");
  const tLabels = useTranslations("SharedForm.Labels");
  const tPlaceholders = useTranslations("SharedForm.Placeholders");
  const tSharedForm = useTranslations("SharedForm");

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const {
    fullName,
    setFullName,
    email,
    setEmail,
    rating,
    setRating,
    experience,
    setExperience,
    isLoading,
    errors,
    setErrors,
    handleSubmit,
  } = useWriteReviewForm();

  return (
    <div className="group relative overflow-hidden rounded-4xl border border-white/5 bg-linear-to-br from-surface/90 to-lanka-black px-4 pt-8 pb-10 sm:px-6 sm:pt-12 sm:pb-12 md:px-8 md:pt-16 md:pb-16 lg:px-10 lg:pb-20 xl:pb-24 2xl:pb-28 3xl:px-12 3xl:pt-20 3xl:pb-32 -mt-1">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[2rem_2rem]" />
      <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[3.5rem] font-bold leading-none tracking-tighter text-white/3 min-[400px]:text-[4.2rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] 2xl:text-[15rem] 3xl:text-[19rem]">
        {tForm("watermark")}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 3xl:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-caption font-bold uppercase tracking-widest text-gold">{tForm("badge")}</span>
          </div>

          <h3 className="text-3xl sm:text-3xl lg:text-5xl font-light leading-tight text-white tracking-tight mb-4">
            {tForm("title1")}
            <span className="premium-serif italic text-gold drop-shadow-[0_2px_10px_rgba(197,160,89,0.3)]">
              {tForm("titleHighlight")}
            </span>
            {tForm("title2")}
          </h3>

          <p className="text-body font-light leading-relaxed text-white/70 max-w-xl">{tForm("description")}</p>
        </div>

        <div className="w-full group relative overflow-hidden bg-transparent md:rounded-4xl md:border border-white/5 md:bg-linear-to-br from-surface/90 to-lanka-black pt-4 pb-10 sm:pt-6 sm:pb-12 md:px-8 md:pt-8 md:pb-16 lg:px-10 lg:pb-20 xl:pb-24 2xl:pb-28 3xl:px-12 3xl:pt-20 3xl:pb-32 -mt-1">
          <form onSubmit={handleSubmit} className="w-full space-y-8 md:space-y-10 3xl:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="mb-2 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
                  {tLabels("fullName")}
                </label>
                <input
                  type="text"
                  value={fullName}
                  disabled={isLoading}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder={tPlaceholders("fullName")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm text-white transition-all hover:bg-white/10 focus:border-gold/50 focus:bg-white/10 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <div className="ml-2">
                  <FormError message={errors.fullName} />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
                  {tLabels("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  placeholder={tPlaceholders("email")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm text-white transition-all hover:bg-white/10 focus:border-gold/50 focus:bg-white/10 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <div className="ml-2">
                  <FormError message={errors.email} />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center gap-1 border-y border-white/5 py-10 3xl:py-14 my-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full w-1/2 mx-auto pointer-events-none" />
              <label className="mb-4 block text-caption font-bold uppercase tracking-[0.4em] text-gold opacity-90 relative z-10">
                {tForm("ratingLabel")}
              </label>
              <div className="flex justify-center gap-4 text-2xl text-slate-600 3xl:gap-8 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => {
                      if (isLoading) return;
                      setRating(star);
                      setErrors((prev) => ({ ...prev, rating: "" }));
                    }}
                    className={`h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300 3xl:h-12 3xl:w-12 ${
                      isLoading
                        ? "opacity-60 cursor-not-allowed"
                        : "cursor-pointer hover:scale-125 hover:text-gold/50 hover:drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                    } ${rating >= star ? "fill-gold text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.4)]" : ""}`}
                  />
                ))}
              </div>
              <div className="mt-2 relative z-10">
                <FormError message={errors.rating} />
              </div>
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <label className="mb-2 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
                {tForm("experienceLabel")}
              </label>
              <textarea
                value={experience}
                disabled={isLoading}
                onInput={handleInput}
                onChange={(e) => {
                  setExperience(e.target.value);
                  setErrors((prev) => ({ ...prev, experience: "" }));
                }}
                placeholder={tForm("experiencePlaceholder")}
                className="auto-resize-textarea min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm italic leading-relaxed text-white transition-all hover:bg-white/10 focus:border-gold/50 focus:bg-white/10 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <span className="block mt-2 text-caption font-medium text-slate-500 leading-relaxed">
                {tSharedForm("Messages.autoExpand")}
              </span>
              <div className=" relative z-10">
                <FormError message={errors.experience} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center pt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-80 py-5 text-caption! tracking-[0.3em] shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-all duration-300 3xl:py-8"
              >
                {isLoading ? tSharedForm("ButtonsLoading.submitting") : tSharedForm("Buttons.submitBtn")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}