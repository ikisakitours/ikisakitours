const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const newsletterService = {
  subscribe: async (email: string) => {
    const res = await fetch(`${API_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("Newsletter subscription failed");
    return res.json();
  },
};