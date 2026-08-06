import React from "react";
import { Link } from "@/i18nNavigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

//Icons
import { Clock, ArrowRight, Star } from "lucide-react";

export type RecommendationType = {
  categoryLabel: string;
  origin: string;
  title: string;
  subtitle: string;
  duration: string;
  rating: string;
  price: string;
  image: string;
  slug: string;
};

export default function RecommendationCard({ item }: { item: RecommendationType }) {
  const t = useTranslations("Booking.Related");

  return (
    <Link
      href={`/booking/${item.slug}`}
      className="glass-card group block min-w-[85vw] snap-center overflow-hidden rounded-4xl border border-white/5 transition-all duration-700 hover:border-gold/40 sm:min-w-[45vw] xl:min-w-0"
    >
      <div className="relative h-44 overflow-hidden">
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-gold/40 bg-black/80 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold backdrop-blur-md">
            {item.categoryLabel}
          </span>
        </div>
        <Image
          src={item.image}
          alt={`${item.title} ${item.subtitle}`}
          fill
          sizes="(min-width: 1280px) 380px, 85vw"
          className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold">{item.origin}</div>
        <h3 className="premium-serif mb-3 text-xl font-bold leading-tight text-white">
          {item.title} <br />
          <span className="text-lg font-light italic">{item.subtitle}</span>
        </h3>
        <div className="mb-6 flex items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3 w-3 text-gold" />
            {item.duration}
          </span>

          <span className="group relative flex shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:border-gold px-4 py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{t("details")}</span>
            {/* Shine effect */}
            <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

            <ArrowRight className="ml-2 h-3 w-3 relative z-10 transition-colors duration-300 group-hover:text-white" />
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex items-center gap-2">
            <Star className="h-3 w-3 text-gold" fill="currentColor" />
            <span className="text-sm font-bold tracking-widest text-white">{item.rating}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{t("startingFrom")}</span>
            <span className="text-xl font-bold tracking-tighter text-gold leading-none">{item.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
