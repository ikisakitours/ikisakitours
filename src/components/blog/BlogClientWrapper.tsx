// src/components/blog/BlogClientWrapper.tsx
"use client";

import { useTranslations } from "next-intl";
import { useFetchBlogPreviews } from "@/hooks/blogs/useFetchBlogPreviews";
import { BlogExplorer } from "./BlogExplorer";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

export function BlogClientWrapper() {
  const { data, isLoading, error, refetch } = useFetchBlogPreviews();
  const tApi = useTranslations("Common.Api");

  if (isLoading) {
    return (
      <section className="bg-lanka-dark py-12 md:py-20 xl:py-20">
        <ApiCallLoader text={tApi("loadingJournals")} fullScreen={false} />
      </section>
    );
  }

  if (error) {
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

  if (!data) return null;

  return <BlogExplorer posts={data} />;
}
