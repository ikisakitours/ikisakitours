import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  attractions: string[];
};

export default function HighlightsAttractionsSection({ attractions }: Props) {
    const t = useTranslations("Destinations.Slug");
  return (
    <section className="glass-card rounded-4xl border border-white/5 p-6 md:p-10">
      <h2 className="premium-serif mb-8 text-[22px] md:text-[28px] italic text-white ">
       {t("highlights")}
      </h2>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {attractions.map((attraction, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span className="text-sm font-light text-slate-300 transition-colors hover:text-white md:text-[15px]">
              {attraction}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}