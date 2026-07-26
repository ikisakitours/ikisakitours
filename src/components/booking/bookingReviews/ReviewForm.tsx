import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { CountrySelect } from "@/components/auth/signUp/CountrySelect";
//Icons
import { UploadCloud, ArrowLeft, Star, Trash2 } from "lucide-react";

const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  const target = e.currentTarget;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

export function ReviewForm({ onBack }: { onBack: () => void }) {
  // Form States
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Validation Hook
  const { errors, validate, setErrors } = useValidationForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (images.length + filesArray.length > 5) {
        setErrors((prev) => ({ ...prev, images: "Maximum 5 photos allowed" }));
        return;
      }

      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      const hasLargeFile = filesArray.some((file) => file.size > MAX_SIZE);

      if (hasLargeFile) {
        setErrors((prev) => ({ ...prev, images: "Each photo must be less than 5MB" }));
        return;
      }

      setErrors((prev) => ({ ...prev, images: "" }));
      const newImages = [...images, ...filesArray];
      setImages(newImages);
      setPreviews(newImages.map((file) => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
    if (newImages.length <= 5) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate({
      fullName: fullName,
      country: country,
      rating: rating,
      experience: experience,
      images: images,
    });

    if (isValid) {
      console.log("Form is valid! Submitting...", { fullName, country, rating, experience, images });
    }
  };
  return (
    <div className="animate-fade-in-up mx-auto max-w-2xl 3xl:max-w-4xl">
      <div className="mb-8 flex justify-end">
        <Button
          variant="tag"
          onClick={onBack}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 pt-2.25 pb-1.75 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 md:px-5 md:pt-2.25 md:pb-1.75 3xl:px-6 3xl:pt-2.5 3xl:pb-2"
        >
          <ArrowLeft
            strokeWidth={2}
            className="h-2.5 w-2.5 text-gold transition-transform duration-300 group-hover:-translate-x-1 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5 3xl:h-4 3xl:w-4"
          />

          <span className="text-[9px] font-bold uppercase leading-none tracking-[0.2em] text-slate-400 transition-colors group-hover:text-white md:text-[10px] lg:text-[11px] 3xl:text-[12px]">
            Back to Reviews
          </span>
        </Button>
      </div>

      <div className="glass-card rounded-4xl border border-white/10 p-6 shadow-2xl md:rounded-[2.5rem] md:p-12 3xl:rounded-[3rem] 3xl:p-20">
        <div className="mb-10 text-center">
          <h3 className="premium-serif mb-2 text-2xl italic text-white md:text-4xl 3xl:text-6xl">
            Share Your MapMate Story
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 3xl:text-sm">
            How was your journey with us?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 3xl:space-y-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="ml-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white transition-colors focus:border-gold/50 focus:outline-none 3xl:text-lg 3xl:py-6"
              />
              <FormError message={errors.fullName} />
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

          {/* Star Rating input */}
          <div className="flex flex-col gap-1">
            <div className="rounded-2xl border border-white/5 bg-white/5 py-8 text-center shadow-inner 3xl:py-12">
              <label className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-gold opacity-80 3xl:text-xs">
                Your Rating
              </label>

              <div className="flex justify-center gap-2 text-2xl text-slate-600 3xl:text-4xl 3xl:gap-8">
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

            <div className="ml-2">
              <FormError message={errors.rating} />
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="ml-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-gold 3xl:text-xs">
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
              className="auto-resize-textarea min-h-30 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[14px] italic leading-relaxed text-white transition-colors focus:border-gold/50 focus:outline-none md:text-[15px] 3xl:text-xl 3xl:py-6"
            ></textarea>
            <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
              * Box will expand automatically as you type.
            </span>
            <div className="ml-2">
              <FormError message={errors.experience} />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="flex flex-col gap-1">
            <div
              className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors 3xl:p-12 ${
                errors.images ? "border-red-500/50 hover:border-red-500" : "border-white/10 hover:border-gold/30"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
              />
              <div>
                <UploadCloud
                  className={`mx-auto mb-3 h-8 w-8 transition-colors 3xl:h-12 3xl:w-12 ${
                    errors.images ? "text-red-400" : "text-slate-500 group-hover:text-gold"
                  }`}
                />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white md:text-xs 3xl:text-sm">
                  Upload Safari Photos
                </p>
                <p className="mt-2 text-[9px] text-slate-500 3xl:text-xs">PNG, JPG or WEBP (Max 5 photos)</p>
              </div>
            </div>

            <div className="ml-2">
              <FormError message={errors.images} />
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mt-2">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
                  >
                    <Image src={preview} alt="preview" fill className="object-cover" />
                    <div className="absolute -bottom-px -left-px -right-px h-8 flex items-center justify-center border-t border-white/10 bg-black/60 backdrop-blur-md rounded-b-xl">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="flex h-full w-full items-center justify-center group/btn"
                      >
                        <Trash2 className="h-3 w-3 text-white/70 transition-colors group-hover/btn:text-red-400 md:h-4 md:w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6" />
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
            className="w-full py-5 text-[11px] tracking-[0.3em] shadow-xl shadow-gold/10 3xl:text-sm 3xl:py-8"
          >
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
}
