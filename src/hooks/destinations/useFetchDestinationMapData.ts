// src/hooks/destinations/useFetchDestinationMapData.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationMapData } from "@/services/destinations/types";

export function useFetchDestinationMapData() {
  const [data, setData] = useState<DestinationMapData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMapData = useCallback(async () => {
    try {
      const response = await fetchDestinationServices.getDestinationMapData();
      console.log("🌍 [ALL MAP DATA LOADED]:", response);
      setData(response);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load map data");
      }
      console.error("❌ [MAP DATA ERROR]:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchMapData();
    };
    loadData();
  }, [fetchMapData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchMapData,
  };
}