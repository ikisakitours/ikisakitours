import type { ServicePricingContent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const servicePricingService = {
  getServicePricing: async (
    serviceType: string = "custom",
    lang: string = "en",
    signal?: AbortSignal,
  ): Promise<ServicePricingContent> => {
    const res = await fetch(
      `${API_URL}/service-pricing/client/${serviceType}?lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      },
    );
    if (!res.ok) throw new Error("Failed to fetch service pricing content");
    return res.json();
  },
};