"use client";
import React from "react";
import RecommendationCard from "./RelatedBookingSections/RecommendationCard";
import InsightCard from "./RelatedBookingSections/InsightCard";
import { useTranslations } from "next-intl";
import { useRelatedPackages } from "@/hooks/Booking/related/useRelatedPackages";
import { useRelatedInsights } from "@/hooks/Booking/related/useRelatedInsights";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

type RelatedBookingSectionsProps = {
  currentSlug: string;
  tourType: "multi" | "one";
  category?: string;
  origin?: string;
  price?: number;
};

export default function RelatedBookingSections({
  currentSlug,
  tourType,
  category,
  origin,
  price,
}: RelatedBookingSectionsProps) {
  const t = useTranslations("Booking.Related");
  const tApi = useTranslations("Common.Api");

  const {
    recommendations,
    isLoading: recLoading,
    error: recError,
    refetch: refetchRec,
  } = useRelatedPackages(tourType, { slug: currentSlug, category, origin, price });

  const { insights, isLoading: insightLoading, error: insightError, refetch: refetchInsights } = useRelatedInsights();
  const rec4 = recommendations.slice(0, 4);
  const rec3 = recommendations.slice(0, 3);

  const insight4 = insights.slice(0, 4);
  const insight3 = insights.slice(0, 3);
  return (
    <>
      {/* ================= Recommendations ================= */}
      {recLoading && (
        <section id="recommendations" className="border-t border-white/5 py-12 md:py-20 xl:py-20 2xl:py-32 3xl:py-40">
          <div className="relative flex min-h-75 w-full items-center justify-center overflow-hidden rounded-4xl">
            <ApiCallLoader text={tApi("loadingRelatedTours")} fullScreen={false} />
          </div>
        </section>
      )}

      {!recLoading && recError && (
        <section id="recommendations" className="border-t border-white/5 py-12 md:py-20 xl:py-20 2xl:py-32 3xl:py-40">
          <ApiCallError
            message={tApi("contentLoadError")}
            title={tApi("failedToLoad")}
            watermark={tApi("errorWatermark")}
            buttonText={tApi("tryAgain")}
            fullScreen={false}
            onRetry={refetchRec}
          />
        </section>
      )}

      {!recLoading && !recError && recommendations.length > 0 && (
        <section id="recommendations" className="border-t border-white/5 py-12 md:py-20 xl:py-20 2xl:py-32 3xl:py-40">
          <h2 className="premium-serif mb-8 px-4 text-center text-3xl italic text-white md:mb-10 md:px-0 md:text-left ">
            {t("youMightLike")}
          </h2>

          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-15 2xl:hidden 3xl:grid 3xl:grid-cols-4 md:px-0">
            {rec4.map((item) => (
              <RecommendationCard key={`rec-4-${item.slug}`} item={item} />
            ))}
          </div>

          <div className="hidden 2xl:grid 2xl:grid-cols-3 2xl:gap-8 3xl:hidden md:px-0">
            {rec3.map((item) => (
              <RecommendationCard key={`rec-3-${item.slug}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ================= Insights ================= */}
      {insightLoading && (
        <section id="insights" className="border-t border-white/5 pt-12 md:pt-20 xl:pt-20 2xl:pt-32 3xl:pt-40">
          <div className="relative flex min-h-75 w-full items-center justify-center overflow-hidden rounded-4xl">
            <ApiCallLoader text={tApi("loadingInsights")} fullScreen={false} />
          </div>
        </section>
      )}

      {!insightLoading && insightError && (
        <section id="insights" className="border-t border-white/5 pt-12 md:pt-20 xl:pt-20 2xl:pt-32 3xl:pt-40">
          <ApiCallError
            message={tApi("contentLoadError")}
            title={tApi("failedToLoad")}
            watermark={tApi("errorWatermark")}
            buttonText={tApi("tryAgain")}
            fullScreen={false}
            onRetry={refetchInsights}
          />
        </section>
      )}

      {!insightLoading && !insightError && insights.length > 0 && (
        <section id="insights" className="border-t border-white/5 pt-12 md:pt-20 xl:pt-20 2xl:pt-32 3xl:pt-40">
          <h2 className="premium-serif mb-8 px-4 text-center text-3xl italic text-white md:mb-10 md:px-0 md:text-left ">
            {t("exploreInsights")}
          </h2>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-12 lg:gap-15 2xl:hidden 3xl:grid 3xl:grid-cols-4 md:px-0">
            {insight4.map((item) => (
              <InsightCard key={`insight-4-${item.slug}`} item={item} />
            ))}
          </div>

          <div className="hidden 2xl:grid 2xl:grid-cols-3 2xl:gap-8 3xl:hidden md:px-0">
            {insight3.map((item) => (
              <InsightCard key={`insight-3-${item.slug}`} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
