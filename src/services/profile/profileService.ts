const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const profileService = {
  updateDetails: async (data: Record<string, string>) => {
    const res = await fetch(`${API_URL}/profile/details`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update details");
    return res.json();
  },

  uploadAvatar: async (imageBase64: string) => {
    const res = await fetch(`${API_URL}/profile/avatar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: imageBase64 }),
    });
    if (!res.ok) throw new Error("Avatar upload failed");
    return res.json();
  },

  updateSecurity: async (data: Record<string, string>) => {
    const res = await fetch(`${API_URL}/profile/security`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Security update failed");
    return res.json();
  },
};