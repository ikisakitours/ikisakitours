// src/hooks/legal/useLegalDocument.ts (හෝ useAllLegalDocuments.ts)
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { legalDocsService } from "@/services/legal/legalDocsService";
import type { LegalDocumentContent } from "@/services/legal/types";

interface AllLegalState {
  key: string;
  docs: LegalDocumentContent[];
  error: string | null;
}

export function useAllLegalDocuments() {
  const locale = useLocale();
  const [state, setState] = useState<AllLegalState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    legalDocsService
      .getAllLegalDocuments(locale, controller.signal)
      .then((response) => {
        setState({ key: requestKey, docs: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({
          key: requestKey,
          docs: [],
          error: err instanceof Error ? err.message : "Failed to load legal documents",
        });
      });

    return () => controller.abort();
  }, [locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const docs = state?.docs ?? [];
  const error = isCurrent ? state.error : null;

  return { docs, isLoading, error, refetch };
}