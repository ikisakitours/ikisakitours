"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationMapData } from "@/services/destinations/types";

interface SingleMapDataState {
  key: string;
  slug: string;
  data: DestinationMapData | null;
  error: string | null;
}

export function useFetchSingleDestinationMapData(slug: string) {
  const locale = useLocale();

  const [state, setState] = useState<SingleMapDataState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${slug}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    fetchDestinationServices
      .getSingleDestinationMapData(slug, locale, controller.signal)
      .then((response) => {
        console.log(`📌 [SINGLE MAP DATA LOADED - ${slug} | ${locale}]:`, response);
        setState({ key: requestKey, slug, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("❌ [SINGLE MAP DATA ERROR]:", err);
        setState({
          key: requestKey,
          slug,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load single map data",
        });
      });

    return () => controller.abort();
  }, [slug, locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state && state.slug === slug ? state.data : null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}