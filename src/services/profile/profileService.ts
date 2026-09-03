const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const profileService = {
  updateDetails: async (data: Record<string, string>) => {
    const res = await fetch(`${API_URL}/profile/details`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
       credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update details");
    return res.json();
  },

 uploadAvatar: async (avatarBlob: Blob) => {
    const formData = new FormData();
    // 'avatar' යන්න Backend එකෙන් බලාපොරොත්තු වන field name එකයි.
    // 'profile-pic.jpg' ලෙස නමක් ලබා දීම backend එකට ෆයිල් එක හඳුනාගැනීමට පහසු කරයි.
    formData.append("avatar", avatarBlob, "profile-pic.jpg");

    // ඔබේ අලුත් endpoint එකට අනුව URL එක යාවත්කාලීන කර ඇත
    const res = await fetch(`${API_URL}/auth/me/avatar`, {
      method: "PATCH",
      // ⚠️ වැදගත්: FormData යවද්දී Content-Type header එක manually දාන්න එපා!
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
  deleteAccount: async (password: string) => {
    const res = await fetch(`${API_URL}/profile/account`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error("Failed to delete account");
    return res.json();
  },
};