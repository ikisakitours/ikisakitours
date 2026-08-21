import { LoadingImage } from "@/components/ui/LoadingImage";
import type { Testimonial } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/RatingStars";
//Icons
import { BsPatchCheck } from "react-icons/bs";
import { CalendarCheck, Crown, Quote } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:bg-[#141414] hover:shadow-2xl sm:p-10">
      <div className="mb-6 flex items-start justify-between sm:mb-8">
        <Quote className="h-7 w-7 text-gold/30 sm:h-8 sm:w-8" fill="currentColor" />
        <span className="rounded border border-white/10 px-3 py-1 text-micro font-bold uppercase tracking-widest text-slate-500">
          {testimonial.language}
        </span>
      </div>

      <RatingStars rating={testimonial.rating ?? 5} className="mb-6 flex gap-1" starClassName="h-3.5 w-3.5 text-gold" />

      <p className="mb-8 grow text-body font-normal italic leading-relaxed text-white sm:mb-10">
        &quot;{testimonial.quote}&quot;
      </p>

      <div className="flex w-full items-center gap-4 border-t border-white/5 pt-6">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-white/5 shadow-lg sm:h-14 sm:w-14">
          <span className="text-xs font-bold uppercase text-gold sm:text-sm">{testimonial.initials}</span>
          {testimonial.avatar && typeof testimonial.avatar === "string" && testimonial.avatar.trim() !== "" && (
            <LoadingImage
              src={testimonial.avatar}
              alt={`${testimonial.name} profile photo`}
              fill
              sizes="(max-width: 640px) 48px, 56px"
              className="object-cover grayscale"
              wrapperClassName="!absolute inset-0 z-10 w-full h-full"
              isSmall={true}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-caption font-bold uppercase tracking-widest text-white">
                {testimonial.name}
              </h2>

              <BsPatchCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              {testimonial.vip && <Crown className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />}
            </div>

            <div className="flex items-center gap-2 text-tiny font-medium uppercase tracking-[0.2em] text-gold/60">
              <CalendarCheck className="h-3 w-3 opacity-80" />
              <span>{testimonial.date}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
