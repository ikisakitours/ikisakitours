// src/hooks/Booking/usePackageDetails.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";
import { PackageDetails } from "@/services/Booking/packageDetails/types";

interface TourState {
  key: string; 
  slug: string;
  tour: PackageDetails | null;
  error: string | null;
  isNotFound: boolean;
}

export function usePackageDetails(slug: string) {
  const locale = useLocale();

  const [state, setState] = useState<TourState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${slug}:${locale}:${reloadCount}`;

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    packageDetailsService
      .getPackageBySlug(slug, locale, controller.signal)
      .then((data) => {
        setState({ key: requestKey, slug, tour: data, error: null, isNotFound: false });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        if (err instanceof Error && err.message === "NOT_FOUND") {
          setState({ key: requestKey, slug, tour: null, error: null, isNotFound: true });
        } else {
          console.error("Error fetching package details:", err);
          setState({
            key: requestKey,
            slug,
            tour: null,
            error: "Unable to load tour details at this moment.",
            isNotFound: false,
          });
        }
      });

    return () => controller.abort();
  }, [slug, locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = slug ? !isCurrent : false;
  const tour = state && state.slug === slug ? state.tour : null;
  const error = isCurrent ? state.error : null;
  const isNotFound = isCurrent ? state.isNotFound : false;

  return { tour, isLoading, error, isNotFound, refetch };
}