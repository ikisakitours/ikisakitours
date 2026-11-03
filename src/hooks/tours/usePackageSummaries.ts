// hooks/tours/usePackageSummaries.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { packageSummaryService } from "@/services/tours/packageSummaryService";
import { PackageSummary } from "@/services/tours/types";

interface SummariesState {
  key: string; 
  type: "oneday" | "multiday";
  packages: PackageSummary[];
  totalCount: number;
  hasMore: boolean;
  error: string | null;
}

export function usePackageSummaries(type: "oneday" | "multiday", limit: number = 50) {
  const locale = useLocale(); // "en" | "ja" ...

  const [state, setState] = useState<SummariesState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${type}:${limit}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    packageSummaryService
      .getSummaries(type, 1, limit, locale, controller.signal)
      .then((result) => {
        setState({
          key: requestKey,
          type,
          packages: result.data || [],
          totalCount: result.totalCount,
          hasMore: result.hasMore,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(`Error fetching ${type} packages:`, err);
        setState({
          key: requestKey,
          type,
          packages: [],
          totalCount: 0,
          hasMore: false,
          error: `Unable to load ${type} packages at this moment.`,
        });
      });

    return () => controller.abort();
  }, [type, limit, locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const sameType = state?.type === type;
  const packages = sameType && state ? state.packages : [];
  const totalCount = sameType && state ? state.totalCount : 0;
  const hasMore = sameType && state ? state.hasMore : false;
  const error = isCurrent ? state.error : null;

  return { packages, totalCount, hasMore, isLoading, error, refetch };
}