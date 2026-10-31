import { ReviewType } from "./types"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const reviewService = {
  getReviewsByPackageId: async (packageId: string): Promise<ReviewType[]> => {
    const res = await fetch(`${API_URL}/comments/package-reviews/${packageId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return res.json();
  },
};