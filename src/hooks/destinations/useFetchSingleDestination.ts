// src/hooks/destinations/useFetchSingleDestination.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationFull } from "@/services/destinations/types";

export function useFetchSingleDestination(slug: string) {
  const [data, setData] = useState<DestinationFull | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDestination = useCallback(async () => {
    try {
      const response = await fetchDestinationServices.getDestinationBySlug(slug);
      console.log(`📍 [SINGLE DESTINATION LOADED - ${slug}]:`, response);
      setData(response);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load destination");
      }
      console.error("❌ [SINGLE DESTINATION ERROR]:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const handleRefetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchDestination();
  }, [fetchDestination]);

  useEffect(() => {
    const loadData = async () => {
      await fetchDestination();
    };

    loadData();
  }, [fetchDestination]);

  return {
    data,
    isLoading,
    error,
    refetch: handleRefetch,
  };
}