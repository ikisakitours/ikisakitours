import type { ReviewsResponse } from "@/services/testimonials/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Testimonial data send to backend
export const writeReviewService = {
  submitReview: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Review submission failed");
    return res.json();
  },

  
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
