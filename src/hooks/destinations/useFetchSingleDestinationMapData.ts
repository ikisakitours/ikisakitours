// src/hooks/destinations/useFetchSingleDestinationMapData.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationMapData } from "@/services/destinations/types";

export function useFetchSingleDestinationMapData(slug: string) {
  const [data, setData] = useState<DestinationMapData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleMapData = useCallback(async () => {
    try {
      const response = await fetchDestinationServices.getSingleDestinationMapData(slug);
      console.log(`📌 [SINGLE MAP DATA LOADED - ${slug}]:`, response);
      setData(response);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load single map data");
      }
      console.error("❌ [SINGLE MAP DATA ERROR]:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const loadData = async () => {
      await fetchSingleMapData();
    };
    loadData();
  }, [fetchSingleMapData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchSingleMapData,
  };
}