import React from "react";
import RecommendationCard, { RecommendationType } from "./RelatedBookingSections/RecommendationCard";
import InsightCard, { InsightType } from "./RelatedBookingSections/InsightCard";
import { useTranslations } from "next-intl";

type RelatedBookingSectionsProps = {
  recommendations: RecommendationType[];
  insights: InsightType[];
};

export default function RelatedBookingSections({ recommendations, insights }: RelatedBookingSectionsProps) {
  const t = useTranslations("Booking.Related");

  return (
    <>
      <section id="recommendations" className="border-t border-white/5 py-12 md:py-20 xl:py-20 2xl:py-32 3xl:py-40">
        <h2 className="premium-serif mb-8 px-4 text-center text-2xl italic text-white md:mb-10 md:px-0 md:text-left md:text-3xl">
          {t("youMightLike")}
        </h2>
        <div className="flex flex-col gap-6 px-4 md:gap-8 md:px-0 2xl:grid 2xl:grid-cols-3 3xl:grid-cols-4">
          {recommendations.slice(0, 4).map((item) => (
            <RecommendationCard key={`${item.title}-${item.subtitle}`} item={item} />
          ))}
        </div>
      </section>

      <section id="insights" className="border-t border-white/5 pt-12 md:pt-20 xl:pt-20 2xl:pt-32 3xl:pt-40">
        <h2 className="premium-serif mb-8 px-4 text-center text-2xl italic text-white md:mb-10 md:px-0 md:text-left md:text-3xl">
          {t("exploreInsights")}
        </h2>
        <div className="flex flex-col gap-6 px-4 md:gap-8 md:px-0 2xl:grid 2xl:grid-cols-3 3xl:grid-cols-4">
          {insights.slice(0, 4).map((item) => (
            <InsightCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}