import React from "react";
import { useTranslations } from "next-intl";

type StoryBannerProps = {
  tour: {
    lead: string;
  };
};
export default function StoryBanner({ tour }: StoryBannerProps) {
  const t = useTranslations("Booking.StoryBanner");
  return (
    <section className="relative my-10 flex flex-col items-center gap-6 text-center md:my-16 md:flex-row md:items-start md:gap-10 md:text-left">
      <div className="relative max-w-3xl pt-2">
        <span className="premium-serif absolute -top-1 left-1/2 z-0 -translate-x-1/2 select-none text-[140px] leading-none text-white/3 md:-left-8 md:translate-x-0 md:-top-2 md:text-[170px]">
          ✧
        </span>

        <div className="relative z-10">
          <h2 className="premium-serif mb-4 text-2xl tracking-wide text-white md:text-4xl leading-tight">
            <span className="bg-linear-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent drop-shadow-sm">
              {t("title")}
            </span>
          </h2>

          <p className="text-body-sm font-light leading-[1.8] tracking-widest text-slate-300/90 md:text-[15px]">
            {tour.lead}
          </p>
        </div>
      </div>
    </section>
  );
}
