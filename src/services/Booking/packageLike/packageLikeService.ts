// src/services/Booking/packageLike/packageLikeService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const packageLikeService = {
  checkLike: async (packageId: string, userId: string) => {
    const response = await fetch(`${API_URL}/addpackages/${packageId}/like?userId=${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to check like status");
    return response.json();
  },

  toggleLike: async (packageId: string, userId: string) => {
    const response = await fetch(`${API_URL}/addpackages/${packageId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error("Failed to toggle package like");
    return response.json();
  },
};
