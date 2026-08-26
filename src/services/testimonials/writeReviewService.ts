const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const writeReviewService = {
  submitReview: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Review submission failed");
    return res.json();
  },
};