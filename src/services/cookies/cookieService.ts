// src/services/cookies/cookieService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const cookieService = {
  getConsent: async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/cookies/consent/${userId}`);
      if (!res.ok) return null;
      const data = await res.json();
      console.log("🔍 Backend Cookie Response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching cookie consent:", error);
      return null;
    }
  },

  saveConsent: async (userId: string, preferences: { performance: boolean; functional: boolean; targeting: boolean }) => {
    const payload = {
      userId: userId,
      preferences: {
        strictlyNecessary: true, 
        performance: preferences.performance,
        functional: preferences.functional,
        targetingAndMarketing: preferences.targeting, 
      },
    };

    const res = await fetch(`${API_URL}/cookies/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save cookie consent to backend");
    return res.json();
  },
};