"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { faqService } from "@/services/faqs/faqService";
import type { Faq } from "@/services/faqs/types";

interface FaqsState {
  key: string;
  data: Faq[] | null;
  error: string | null;
}

export function useFetchFaqs() {
  const locale = useLocale();

  const [state, setState] = useState<FaqsState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    faqService
      .getFaqs(locale, controller.signal)
      .then((response) => {
        console.log(`❓ [ALL FAQS LOADED - ${locale}]:`, response);
        setState({ key: requestKey, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("❌ [FAQS FETCH ERROR]:", err);
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load FAQs",
        });
      });

    return () => controller.abort();
  }, [locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state?.data ?? null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}