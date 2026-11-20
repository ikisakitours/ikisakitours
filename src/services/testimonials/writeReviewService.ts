import { parseApiError } from "@/utils/apiError";

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

    if (!res.ok) await parseApiError(res, "Review submission failed");
    return res.json();
  },
};
