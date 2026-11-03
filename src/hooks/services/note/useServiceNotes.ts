// src/hooks/services/note/useServiceNotes.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { serviceNotesService } from "@/services/services/note/serviceNotesService";
import type { ServiceNoteItem } from "@/services/services/note/types";

interface ServiceNotesState {
  key: string;
  data: ServiceNoteItem[] | null;
  error: string | null;
}

export function useServiceNotes(serviceType: string = "custom") {
  const locale = useLocale();

  const [state, setState] = useState<ServiceNotesState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${serviceType}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    serviceNotesService
      .getServiceNotes(serviceType, locale, controller.signal)
      .then((response) => {
        console.log(`📝 [SERVICE NOTES LOADED - ${locale}]:`, response);
        setState({ key: requestKey, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error("❌ [SERVICE NOTES FETCH ERROR]:", err);
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load service notes",
        });
      });

    return () => controller.abort();
  }, [serviceType, locale, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state?.data ?? null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}