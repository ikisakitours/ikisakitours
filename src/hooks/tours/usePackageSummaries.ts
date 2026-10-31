//hooks/tours/usePackageSummaries.ts

import { useState, useEffect, useCallback } from "react";
import { packageSummaryService } from "@/services/tours/packageSummaryService";
import { PackageSummary } from "@/services/tours/types";

export function usePackageSummaries(type: "oneday" | "multiday", limit: number = 50) {
  const [packages, setPackages] = useState<PackageSummary[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaries = useCallback(
    async (page: number = 1) => {
      setTimeout(() => {
        setIsLoading(true);
        setError(null);
      }, 0);

      try {
        const result = await packageSummaryService.getSummaries(type, page, limit);

        setPackages(result.data || []);
        setTotalCount(result.totalCount);
        setHasMore(result.hasMore);
      } catch (err) {
        console.error(`Error fetching ${type} packages:`, err);
        setError(`Unable to load ${type} packages at this moment.`);
      } finally {
        setIsLoading(false);
      }
    },
    [type, limit],
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchSummaries(1);
    }, 0);
    return () => clearTimeout(timerId);
  }, [fetchSummaries]);

  return { packages, totalCount, hasMore, isLoading, error, refetch: () => fetchSummaries(1) };
}
