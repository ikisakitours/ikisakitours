"use client";

import { useState, useEffect, useCallback } from "react";
import { faqService } from "@/services/faqs/faqService";
import type { Faq } from "@/services/faqs/types";

export function useFetchFaqs() {
  const [data, setData] = useState<Faq[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await faqService.getFaqs();
      console.log("❓ [ALL FAQS LOADED]:", response);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load FAQs");
      }
      console.error("❌ [FAQS FETCH ERROR]:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadFaqsData = async () => {
      await fetchFaqs();
    };

    loadFaqsData();
  }, [fetchFaqs]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchFaqs,
  };
}
