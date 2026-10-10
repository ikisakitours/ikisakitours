// src/hooks/blogs/useFetchBlogPreviews.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPreview } from "@/services/blogs/types";

export function useFetchBlogPreviews() {
  const [data, setData] = useState<BlogPreview[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchBlogServices.getBlogPreviews();
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load blog previews");
      }
      console.error(err);
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
