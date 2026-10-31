// src/hooks/Booking/packageSummaryReview/usePackageReviewSummary.ts
import { useState, useEffect, useCallback } from "react";
import { reviewSummaryService } from "@/services/Booking/packageSummaryReview/ReviewSummaryService";
import { PackageReviewSummaryType } from "@/services/Booking/packageSummaryReview/types";

export function usePackageReviewSummary(packageId?: string) {
  const [summary, setSummary] = useState<PackageReviewSummaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!packageId) {
      setTimeout(() => setIsLoading(false), 0);
      return;
    }

    setTimeout(() => {
      setIsLoading(true);
      setError(null);
    }, 0);

    try {
      const data = await reviewSummaryService.getSummaryByPackageId(packageId);
      setSummary(data);
    } catch (err) {
      console.error("Error fetching review summary:", err);
      setError("Unable to load reviews summary at this moment.");
    } finally {
      setIsLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchSummary();
    }, 0);

    return () => clearTimeout(timerId);
  }, [fetchSummary]);

  return { summary, isLoading, error, refetch: fetchSummary };
}
