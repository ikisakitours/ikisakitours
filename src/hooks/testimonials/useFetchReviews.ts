"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchReviewsServices } from "@/services/testimonials/fetchReviewsServices";
import type { ReviewsResponse } from "@/services/testimonials/types";

export function useReviews() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchReviewsServices.getReviews();
      console.log("Full Backend Reviews Response Object:", response);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load reviews");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchReviews();
    };

    loadData();
  }, [fetchReviews]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchReviews,
  };
}
