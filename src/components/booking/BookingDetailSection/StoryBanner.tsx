import React from "react";
import { useTranslations } from "next-intl";
//Icons
import { WandSparkles } from "lucide-react";
type StoryBannerProps = {
  tour: {
    lead: string;
  };
};
export default function StoryBanner({ tour }: StoryBannerProps) {
  const t = useTranslations("Booking.StoryBanner");
  return (
    <section className="mb-8 rounded-r-xl border-l-[3px] border-gold bg-gold/5 p-4 sm:p-6 md:mb-14 md:rounded-r-3xl md:border-l-4 md:p-8">
      <h2 className="premium-serif mb-3 flex items-center gap-3 text-lg text-white sm:text-xl md:text-2xl">
        <WandSparkles className="h-5 w-5 shrink-0 text-gold" />
        <span>{t("title")}</span>
      </h2>
      <p className="text-[12px] font-light italic leading-relaxed tracking-wide text-slate-400 md:text-sm">
        {tour.lead}
      </p>
    </section>
  );
}
