// src/hooks/blogs/useFetchBlogPreviews.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPreview } from "@/services/blogs/types";

interface PreviewsState {
  key: string; 
  data: BlogPreview[] | null;
  error: string | null;
}

export function useFetchBlogPreviews() {
  const locale = useLocale(); 

  const [state, setState] = useState<PreviewsState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    fetchBlogServices
      .getBlogPreviews(locale, controller.signal)
      .then((response) => {
        console.log(`📚 [ALL BLOGS LOADED - ${locale}]:`, response);
        setState({ key: requestKey, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load blog previews",
        });
      });

    return () => controller.abort();
  }, [locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state?.data ?? null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}