// src/components/Destinations/DestinationsClientWrapper.tsx
"use client";

import { useTranslations } from "next-intl";
import { useFetchDestinationPreviews } from "@/hooks/destinations/useFetchDestinationPreviews";
import { DestinationExplorer } from "./DestinationExplorer";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

export function DestinationsClientWrapper() {
  const { data, isLoading, error, refetch } = useFetchDestinationPreviews();
  const tApi = useTranslations("Common.Api");

  if (isLoading) {
    return (
      <section className="bg-lanka-dark py-12 md:py-20 xl:py-20">
        <ApiCallLoader text={tApi("loadingDestinations")} fullScreen={false} /> 
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="bg-lanka-dark py-12 md:py-20 xl:py-20">
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={true}
          onRetry={refetch}
        />
      </section>
    );
  }

  return <DestinationExplorer destinations={data} />;
}