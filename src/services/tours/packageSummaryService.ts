//services/tours/packageSummaryService.ts


import { PaginatedPackageSummary } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const packageSummaryService = {
  getSummaries: async (
    type: "oneday" | "multiday",
    page: number = 1,
    limit: number = 5
  ): Promise<PaginatedPackageSummary> => {
    const res = await fetch(`${API_URL}/addpackages/${type}?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${type} package summaries`);
    }
    return res.json();
  },
};