"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "@/components/auth/signUp/CountrySelect";
import { useTranslations } from "next-intl";
import { useWriteReviewForm } from "@/hooks/testimonials/useWriteReviewForm";
import { LoadingImage } from "@/components/ui/LoadingImage";

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

  // Hook
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    country,
    setCountry,
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
    <div className="group relative overflow-hidden rounded-4xl border border-white/5 bg-linear-to-br from-surface/90 to-lanka-black px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-12 md:px-8 md:pt-8 md:pb-16 lg:px-10 lg:pt-10 lg:pb-20 xl:pb-24 2xl:pb-28 3xl:px-12 3xl:pt-12 3xl:pb-32 -mt-1 ">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[2rem_2rem]" />
      <div className="pointer-events-none absolute -right-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gold/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[3.5rem] font-bold leading-none tracking-tighter text-white/3 
                       min-[400px]:text-[4.2rem]
                       sm:text-[6rem] 
                       md:text-[8rem] 
                       lg:text-[10rem] 
                       xl:text-[13rem] 
                       2xl:text-[15rem] 
                       3xl:text-[19rem]"
      >
        {tForm("watermark")}
      </div>
      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
        {/* MOBILE & TABLET LAYOUT */}
        <div className="flex lg:hidden w-full flex-col rounded-2xl overflow-hidden border border-white/15 bg-black/50 backdrop-blur-xl p-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-gold/30">
              <LoadingImage
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop"
                alt="Safari Experience"
                fill
                sizes="100px"
                wrapperClassName="w-full h-full"
                className="object-cover"
              />
            </div>
            {/* Title and Badge */}
            <div className="flex flex-col">
              <div className="mb-1 inline-block rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 w-max">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{tForm("badge")}</span>
              </div>
              <h3 className="text-2xl sm:text-2xl font-light leading-tight text-white">
                {tForm("title1")} <span className="premium-serif italic text-gold">{tForm("titleHighlight")}</span>
              </h3>
            </div>
          </div>
          <p className="mt-3 text-body-sm font-light leading-relaxed text-white/70">{tForm("description")}</p>
        </div>

        {/*  DESKTOP LAYOUT */}
        <div className="hidden lg:flex relative w-lg/12 lg:w-5/12 flex-col rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card">
          <div className="relative h-85 w-full overflow-hidden bg-black">
            <LoadingImage
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop"
              alt="Safari Experience"
              fill
              sizes="50vw"
              wrapperClassName="w-full h-full"
              className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
          </div>

          <div className="relative z-30 p-8 3xl:p-10 flex flex-col justify-between">
            <div className="mb-4 inline-block rounded-full border border-gold/20 bg-gold/10 px-3.5 py-1 w-max">
              <span className="text-caption font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                {tForm("badge")}
              </span>
            </div>
            <h3 className="mb-3 text-2xl sm:text-3xl font-light leading-tight text-white 3xl:text-4xl">
              {tForm("title1")} <br />
              <span className="premium-serif italic text-gold">{tForm("titleHighlight")}</span> {tForm("title2")}
            </h3>
            <p className="text-body-sm font-light leading-relaxed text-white/70">{tForm("description")}</p>
          </div>
        </div>

        <div className="w-full py-4 lg:w-7/12 lg:py-8 lg:pr-8 3xl:py-12">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 3xl:space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="mb-1 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <div className="ml-2">
                  <FormError message={errors.fullName} />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <div className="ml-2">
                  <FormError message={errors.email} />
                </div>
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <CountrySelect
                  countryName={country}
                  setCountryName={(val) => {
                    setCountry(val);
                    setErrors((prev) => ({ ...prev, country: "" }));
                  }}
                  error={errors.country}
                  disabled={isLoading}
                  clearError={() => setErrors((prev) => ({ ...prev, country: "" }))}
                  inputClass="disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm! text-white transition-colors group-hover:border-gold/50 focus:border-gold/50 focus:outline-none 3xl:py-6"
                  showIcon={false}
                  customLabel={
                    <label className="mb-1 ml-2 block text-caption font-bold uppercase tracking-widest text-gold">
                      {tLabels("country")}
                    </label>
                  }
                />
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-1">
              <div className="rounded-2xl border border-white/5 bg-white/5 py-8 text-center shadow-inner 3xl:py-12">
                <label className="mb-4 block text-caption font-bold uppercase tracking-[0.4em] text-gold opacity-80">
                  {tForm("ratingLabel")}
                </label>
                <div className="flex justify-center gap-2 text-2xl text-slate-600 3xl:gap-8 3xl:text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => {
                        if (isLoading) return;
                        setRating(star);
                        setErrors((prev) => ({ ...prev, rating: "" }));
                      }}
                      className={`h-6 w-6 transition-all duration-300 3xl:h-12 3xl:w-12 ${
                        isLoading
                          ? "opacity-60 cursor-not-allowed"
                          : "cursor-pointer hover:scale-125 hover:text-gold/50"
                      } ${rating >= star ? "fill-gold text-gold" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <FormError message={errors.rating} />
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <label className="mb-1 ml-2 text-caption font-bold uppercase tracking-widest text-gold">
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
                className="auto-resize-textarea min-h-30 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm italic leading-relaxed text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <span className="mt-1 block text-caption font-medium text-slate-500 leading-relaxed">
                {tSharedForm("Messages.autoExpand")}
              </span>
              <div className="ml-2">
                <FormError message={errors.experience} />
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full md:w-80 py-5 text-caption! tracking-[0.3em] shadow-xl shadow-gold/10 3xl:py-8"
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
