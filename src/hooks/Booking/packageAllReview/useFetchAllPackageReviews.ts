//hooks/Booking/useFetchAllPackageReviews.ts
import { useState, useEffect, useCallback } from "react";
import { reviewService } from "@/services/Booking/packageAllReview/FetchReviewService";
import { ReviewType } from "@/services/Booking/packageAllReview/types"; 

export function usePackageReviews(packageId?: string) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!packageId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await reviewService.getReviewsByPackageId(packageId);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Unable to load reviews at this moment.");
    } finally {
      setIsLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchReviews();
    }, 0);

    return () => clearTimeout(timerId);
  }, [fetchReviews]);

  return { reviews, isLoading, error, refetch: fetchReviews };
}
