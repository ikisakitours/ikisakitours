"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { legalDocsService } from "@/services/legal/legalDocsService";
import type { LegalDocumentContent } from "@/services/legal/types";

interface LegalState {
  key: string;
  data: LegalDocumentContent | null;
  error: string | null;
}

export function useLegalDocument(id: string = "terms") {
  const locale = useLocale();

  const [state, setState] = useState<LegalState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${id}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    legalDocsService
      .getLegalDocument(id, locale, controller.signal)
      .then((response) => {
        console.log(`📜 [LEGAL DOC LOADED - ${id} / ${locale}]:`, response);
        setState({ key: requestKey, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load legal document",
        });
      });

    return () => controller.abort();
  }, [id, locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state?.data ?? null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}