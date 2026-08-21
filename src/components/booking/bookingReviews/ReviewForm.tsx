"use client";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "@/components/auth/signUp/CountrySelect";
import { UploadCloud, ArrowLeft, Star, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReviewForm } from "@/hooks/Booking/usePackageReviewForm";

const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  const target = e.currentTarget;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

export function ReviewForm({ onBack }: { onBack: () => void }) {
  const t = useTranslations("Booking.ReviewForm");
  const tForms = useTranslations("SharedForm");

  //  Hook
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
    previews,
    handleImageChange,
    removeImage,
    isLoading,
    errors,
    setErrors,
    handleSubmit,
  } = useReviewForm();
  return (
    <div className="animate-fade-in-up mx-auto max-w-2xl 3xl:max-w-4xl">
      <div className="mb-8 flex justify-end">
        <Button
          variant="tag"
          onClick={onBack}
          disabled={isLoading}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 pt-2.25 pb-1.75 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 md:px-5 md:pt-2.25 md:pb-1.75 3xl:px-6 3xl:pt-2.5 3xl:pb-2"
        >
          <ArrowLeft
            strokeWidth={2}
            className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:-translate-x-1 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 3xl:h-4 3xl:w-4"
          />
          <span className="text-tiny font-bold uppercase leading-none tracking-[0.2em] text-slate-400 transition-colors group-hover:text-white">
            {t("backToReviews")}
          </span>
        </Button>
      </div>
      <div className="glass-card rounded-4xl border border-white/10 p-6 shadow-2xl md:rounded-[2.5rem] md:p-12 3xl:rounded-[3rem] 3xl:p-20">
        <div className="mb-10 text-center">
          <h3 className="premium-serif mb-2 text-[25px] italic text-white md:text-[29px]">{t("title")}</h3>
          <p className="text-caption uppercase tracking-widest text-slate-400 3xl:text-sm">{t("subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 3xl:space-y-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="ml-2 mb-1 text-caption font-bold uppercase tracking-widest text-gold">
                {tForms("Labels.fullName")}
              </label>
              <input
                type="text"
                value={fullName}
                disabled={isLoading}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                placeholder={tForms("Placeholders.fullName")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6"
              />
              <div className="ml-2">
                <FormError message={errors.fullName} />
              </div>
            </div>

            {/* email */}
            <div className="flex flex-col">
              <label className="ml-2 mb-1 text-caption font-bold uppercase tracking-widest text-gold">
                {tForms("Labels.email")}
              </label>
              <input
                type="email"
                value={email}
                disabled={isLoading}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder={tForms("Placeholders.email")}
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
                disabled={isLoading}
                setCountryName={(val) => {
                  setCountry(val);
                  setErrors((prev) => ({ ...prev, country: "" }));
                }}
                error={errors.country}
                clearError={() => setErrors((prev) => ({ ...prev, country: "" }))}
                inputClass="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm! text-white transition-colors group-hover:border-gold/50 focus:border-gold/50 focus:outline-none 3xl:py-6"
                showIcon={false}
                customLabel={
                  <label className="mb-1 ml-2 block text-caption font-bold uppercase tracking-widest text-gold 3xl:text-xs">
                    {tForms("Labels.country")}
                  </label>
                }
              />
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1">
            <div className="rounded-2xl border border-white/5 bg-white/5 py-8 text-center shadow-inner 3xl:py-12">
              <label className="mb-4 block text-caption font-bold uppercase tracking-[0.4em] text-gold opacity-80 3xl:text-xs">
                {t("ratingLabel")}
              </label>
              <div className="flex justify-center gap-2 text-2xl text-slate-600 3xl:text-4xl 3xl:gap-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => {
                      if (isLoading) return;
                      setRating(star);
                      setErrors((prev) => ({ ...prev, rating: "" }));
                    }}
                    className={`h-6 w-6 transition-all duration-300 3xl:h-12 3xl:w-12 ${
                      isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:scale-125 hover:text-gold/50"
                    } ${rating >= star ? "fill-gold text-gold" : ""}`}
                  />
                ))}
              </div>
            </div>
            <div className="ml-2">
              <FormError message={errors.rating} />
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-col ">
            <label className="ml-2 mb-1 text-caption font-bold uppercase tracking-widest text-gold 3xl:text-xs">
              {t("experienceLabel")}
            </label>
            <textarea
              value={experience}
              disabled={isLoading}
              onInput={handleInput}
              onChange={(e) => {
                setExperience(e.target.value);
                setErrors((prev) => ({ ...prev, experience: "" }));
              }}
              placeholder={t("experiencePlaceholder")}
              className="auto-resize-textarea min-h-30 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-body-sm italic leading-relaxed text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:py-6"
            ></textarea>
            <span className="mt-1 block text-caption font-medium text-slate-500 leading-relaxed">
              {tForms("Messages.autoExpand")}
            </span>
            <div className="ml-2">
              <FormError message={errors.experience} />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1">
            <div
              className={`group relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors 3xl:p-12 ${
                errors.images ? "border-red-500/50 hover:border-red-500" : "border-white/10 hover:border-gold/30"
              } ${isLoading ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={isLoading}
                onChange={handleImageChange}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
              />
              <div>
                <UploadCloud
                  className={`mx-auto mb-3 h-8 w-8 transition-colors 3xl:h-12 3xl:w-12 ${errors.images ? "text-red-400" : "text-slate-500 group-hover:text-gold"}`}
                />
                <p className="text-caption font-bold uppercase tracking-widest text-white">{t("uploadTitle")}</p>
                <p className="mt-2 text-tiny text-slate-500">{t("uploadSubtitle")}</p>
              </div>
            </div>
            <div className="ml-2">
              <FormError message={errors.images} />
            </div>
            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-2">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5 ${
                      isLoading ? "opacity-60" : ""
                    }`}
                  >
                    <Image src={preview} alt="preview" fill className="object-cover" />
                    <div className="absolute -bottom-px -left-px -right-px h-8 flex items-center justify-center border-t border-white/10 bg-black/60 backdrop-blur-md rounded-b-xl">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => removeImage(index)}
                        className="flex h-full w-full items-center justify-center group/btn"
                      >
                        <Trash2 className="h-4 w-4 text-white/70 transition-colors group-hover/btn:text-red-400 md:h-4.5 md:w-4.5 lg:h-5.5 lg:w-5.5 3xl:h-6 3xl:w-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="block w-full md:w-auto md:ml-auto md:px-16 py-5 text-caption! tracking-[0.3em] shadow-xl shadow-gold/10 3xl:py-8"
          >
            {isLoading ? tForms("ButtonsLoading.submitting") : tForms("Buttons.submitBtn")}
          </Button>
        </form>
      </div>
    </div>
  );
}
