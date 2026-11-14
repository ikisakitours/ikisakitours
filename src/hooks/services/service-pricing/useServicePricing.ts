"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { servicePricingService } from "@/services/services/service-pricing/servicePricingService";
import type { ServicePricingContent } from "@/services/services/service-pricing/types";

interface PricingState {
  key: string;
  data: ServicePricingContent | null;
  error: string | null;
}

export function useServicePricing(serviceType: string = "custom") {
  const locale = useLocale();

  const [state, setState] = useState<PricingState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${serviceType}:${locale}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    servicePricingService
      .getServicePricing(serviceType, locale, controller.signal)
      .then((response) => {
        console.log(`🏷️ [SERVICE PRICING LOADED - ${serviceType} / ${locale}]:`, response);
        setState({ key: requestKey, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load service pricing",
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