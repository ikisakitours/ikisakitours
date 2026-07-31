import { LoadingImage } from "@/components/ui/LoadingImage";
import type { Testimonial } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/RatingStars";
//Icons
import { CalendarCheck, CircleCheck, Crown, Quote } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:bg-white/4 hover:shadow-2xl sm:p-10">
      <div className="mb-6 flex items-start justify-between sm:mb-8">
        <Quote className="h-7 w-7 text-gold/30 sm:h-8 sm:w-8" fill="currentColor" />
        <span className="rounded border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-500 sm:text-[10px]">
          {testimonial.language}
        </span>
      </div>

      <RatingStars rating={testimonial.rating ?? 5} className="mb-6 flex gap-1" starClassName="h-3.5 w-3.5 text-gold" />

      <p className="mb-8 grow text-base font-normal italic leading-relaxed text-white sm:mb-10 sm:text-lg">
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
            <h2 className="truncate text-[11px] font-bold uppercase tracking-widest text-white sm:text-xs">
              {testimonial.name}
            </h2>

            <div className="flex flex-wrap items-center gap-1.5">
              <Badge kind="verified" />
              {testimonial.vip ? <Badge kind="vip" /> : null}
            </div>

            <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-gold/60 sm:text-[10px]">
              <CalendarCheck className="h-3 w-3 opacity-80" />
              <span>{testimonial.date}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Badge({ kind }: { kind: "verified" | "vip" }) {
  if (kind === "verified") {
    return (
      <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5">
        <CircleCheck className="h-2 w-2 text-emerald-400" fill="currentColor" />
        <span className="text-[7px] font-black uppercase tracking-widest text-emerald-400">Verified</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 shadow-sm">
      <Crown className="h-2 w-2 text-gold" fill="currentColor" />
      <span className="text-[7px] font-black uppercase tracking-widest text-gold">VIP Member</span>
    </span>
  );
}
