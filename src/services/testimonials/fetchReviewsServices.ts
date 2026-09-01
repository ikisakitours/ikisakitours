import type { ReviewsResponse } from "@/services/testimonials/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchReviewsServices = {
  // Get all Testimonial data
  getReviews: async (): Promise<ReviewsResponse> => {
    const res = await fetch(`${API_URL}/comments`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },
};
