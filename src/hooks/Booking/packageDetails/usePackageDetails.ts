// src/hooks/Booking/usePackageDetails.ts

import { useState, useEffect, useCallback } from "react";
import { packageDetailsService } from "@/services/Booking/packageDetails/packageDetailsService";
import { PackageDetails } from "@/services/Booking/packageDetails/types";

export function usePackageDetails(slug: string) {
  const [tour, setTour] = useState<PackageDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const fetchTour = useCallback(async () => {
    if (!slug) {
      setTimeout(() => setIsLoading(false), 0);
      return;
    }

    setTimeout(() => {
      setIsLoading(true);
      setError(null);
      setIsNotFound(false);
    }, 0);

    try {
      const data = await packageDetailsService.getPackageBySlug(slug);
      setTour(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "NOT_FOUND") {
        setIsNotFound(true);
      } else {
        console.error("Error fetching package details:", err);
        setError("Unable to load tour details at this moment.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTour();
    }, 0);
    return () => clearTimeout(timerId);
  }, [fetchTour]);

  return { tour, isLoading, error, isNotFound, refetch: fetchTour };
}
