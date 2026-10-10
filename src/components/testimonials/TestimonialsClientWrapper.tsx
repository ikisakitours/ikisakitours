"use client";
import { useTranslations } from "next-intl";
import { useReviews } from "@/hooks/testimonials/useFetchReviews";
import { TestimonialHero } from "./TestimonialHero";
import { TestimonialExplorer } from "./TestimonialExplorer";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
export function TestimonialsClientWrapper() {
  const { data, isLoading, error, refetch } = useReviews();
  const t = useTranslations("Common.Api");

  if (isLoading) {
    return <ApiCallLoader text={t("loadingReviews")} fullScreen={true} />;
  }

  if (error) {
    return (
      <ApiCallError
        message={t("contentLoadError")}
        title={t("failedToLoad")}
        watermark={t("errorWatermark")}
        buttonText={t("tryAgain")}
        fullScreen={true}
        onRetry={refetch}
      />
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-lanka-dark">
      <TestimonialHero totalComments={data.totalComments} averageRating={data.averageRating} />

      <TestimonialExplorer comments={data.comments} />
    </main>
  );
}
