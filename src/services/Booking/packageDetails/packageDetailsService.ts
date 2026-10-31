// src/services/Booking/packageDetailsService.ts

import { PackageDetails } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const packageDetailsService = {
  getPackageBySlug: async (slug: string): Promise<PackageDetails> => {
    const res = await fetch(`${API_URL}/addpackages/${slug}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("NOT_FOUND");
      }
      throw new Error("Failed to fetch package details");
    }
    
    return res.json();
  },
};