"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationFull } from "@/services/destinations/types";

interface DestState {
  key: string;
  slug: string;
  data: DestinationFull | null;
  error: string | null;
}

export function useFetchSingleDestination(slug: string) {
  const locale = useLocale();

  const [state, setState] = useState<DestState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${slug}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    fetchDestinationServices
      .getDestinationBySlug(slug, locale, controller.signal)
      .then((response) => {
        console.log(`📍 [SINGLE DESTINATION LOADED - ${slug} | ${locale}]:`, response);
        setState({ key: requestKey, slug, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("❌ [SINGLE DESTINATION ERROR]:", err);
        setState({
          key: requestKey,
          slug,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load destination",
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