// src/hooks/destinations/useFetchDestinationPreviews.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import type { DestinationPreview } from "@/services/destinations/types";

export function useFetchDestinationPreviews() {
  const [data, setData] = useState<DestinationPreview[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchDestinationServices.getDestinationPreviews();
      console.log("🗺️ [ALL DESTINATIONS LOADED]:", response);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load destination previews");
      }
      console.error("❌ [DESTINATIONS PREVIEW ERROR]:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadPreviewData = async () => {
      await fetchPreviews();
    };

    loadPreviewData();
  }, [fetchPreviews]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchPreviews,
  };
}