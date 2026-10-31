// src/services/Booking/packageSummaryReview/ReviewSummaryService.ts
import { PackageReviewSummaryType } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const reviewSummaryService = {
  getSummaryByPackageId: async (packageId: string): Promise<PackageReviewSummaryType> => {
    const res = await fetch(`${API_URL}/comments/package-reviews/${packageId}/summary`);
    if (!res.ok) {
      throw new Error("Failed to fetch review summary");
    }
    return res.json();
  },
};