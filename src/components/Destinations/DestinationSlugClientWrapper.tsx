// src/components/Destinations/DestinationSlug/DestinationSlugClientWrapper.tsx
"use client";

import { useTranslations } from "next-intl";
import { useFetchSingleDestination } from "@/hooks/destinations/useFetchSingleDestination";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
import DestinationsBody from "@/components/Destinations/DestinationSlug/DestinationsBody";
import { Hero } from "@/components/ui/Hero";

type Props = {
  slug: string;
};

export function DestinationSlugClientWrapper({ slug }: Props) {
  const { data: dest, isLoading, error, refetch } = useFetchSingleDestination(slug);
  const tApi = useTranslations("Common.Api");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-lanka-dark">
        <ApiCallLoader text={tApi("loadingDestination")} fullScreen={true} />
      </main>
    );
  }

  if (error || !dest) {
    return (
      <main className="min-h-screen bg-lanka-dark">
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={true}
          onRetry={refetch}
        />
      </main>
    );
  }

  return (
    <>
      <Hero
        image={dest.images?.[0] || "/images/default-destination.jpg"}
        altText={dest.title}
        eyebrow="DESTINATION GUIDE"
        title={dest.title}
        accent=""
        strapline={dest.summary}
      />
      <DestinationsBody dest={dest} />
    </>
  );
}