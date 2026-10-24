const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface DeleteAccountPayload {
  deleteMethod: "password" | "text";
  value: string;
}

export const profileService = {
  updateDetails: async (data: Record<string, string>) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update details");
    return res.json();
  },

  uploadAvatar: async (avatarBlob: Blob, signature: string) => {
    const formData = new FormData();

    formData.append("avatar", avatarBlob, "profile-pic.webp");
    formData.append("avatarSignature", signature);

    const res = await fetch(`${API_URL}/auth/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) throw new Error("Avatar upload failed");
    return res.json();
  },

  updateSecurity: async (data: Record<string, string>) => {
    const res = await fetch(`${API_URL}/profile/security`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Security update failed");
    return res.json();
  },

  // Delete Account
  deleteAccount: async (payload: DeleteAccountPayload) => {
    const res = await fetch(`${API_URL}/profile/account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to delete account");
    return res.json();
  },
};
