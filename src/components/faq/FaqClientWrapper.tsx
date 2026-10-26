"use client";

import { useTranslations } from "next-intl";
import { useFetchFaqs } from "@/hooks/faqs/useFetchFaqs";
import FaqBody from "./FaqBody";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

export function FaqClientWrapper() {
  const { data, isLoading, error, refetch } = useFetchFaqs();
  const tApi = useTranslations("Common.Api");

  if (isLoading) {
    return (
      <section className="bg-lanka-dark py-12 md:py-20 xl:py-20 min-h-[50vh] flex items-center justify-center">
        <ApiCallLoader text={tApi("loadingFaqs")} fullScreen={false} />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="bg-lanka-dark py-12 md:py-20 xl:py-20 min-h-[50vh] flex items-center justify-center">
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={false}
          onRetry={refetch}
        />
      </section>
    );
  }

  return <FaqBody faqs={data} />;
}
