// src/services/Booking/packageDetails/packageDetailsService.ts
import { PackageDetails } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const packageDetailsService = {
  getPackageBySlug: async (
    slug: string,
    lang: string = "en", 
    signal?: AbortSignal, 
  ): Promise<PackageDetails> => {
    const res = await fetch(`${API_URL}/addpackages/${slug}?lang=${encodeURIComponent(lang)}`, { signal });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("NOT_FOUND");
      }
      throw new Error("Failed to fetch package details");
    }

    return res.json();
  },
};