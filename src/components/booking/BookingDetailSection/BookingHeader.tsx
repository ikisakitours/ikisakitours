import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShieldCheck } from "lucide-react";
import RatingStars from "./RatingStars";

type BookingHeaderProps = {
  tour: {
    location: string;
    title: string;
    titleEmphasis: string;
    rating: string | number;
    reviewCount: number;
    provider: string;
  };
};

export default function BookingHeader({ tour }: BookingHeaderProps) {
  return (
    <section id="header" className="mb-8 md:mb-12">
      <SectionLabel>{tour.location}</SectionLabel>

      <h1 className="premium-serif mb-6 text-3xl leading-[1.1] text-white sm:text-4xl md:text-6xl">
        {tour.title} <br className="hidden sm:block" />
        <span className="gold-gradient-text font-light italic">{tour.titleEmphasis}</span>
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-4 border-b border-white/10 pb-8 md:gap-x-6">
        <div className="flex items-center gap-2">
          <RatingStars rating={tour.rating} className="text-sm md:text-base" />
          <span className="ml-1 text-sm font-bold tracking-widest text-white">{tour.rating}</span>
          <span className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gold/50">
            ({tour.reviewCount} reviews)
          </span>
        </div>

        <div className="hidden h-4 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold/70" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            Provider: <strong className="text-white">{tour.provider}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
