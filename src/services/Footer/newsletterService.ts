// src/services/Footer/newsletterService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const newsletterService = {
  subscribe: async (email: string, userId?: string) => {
    const res = await fetch(`${API_URL}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Newsletter subscription failed");
    }

    return data;
  },
};
