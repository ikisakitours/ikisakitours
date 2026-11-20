import { parseApiError } from "@/utils/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface DeleteAccountPayload {
  deleteMethod: "password" | "text";
  value: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
  avatarUrl?: string | null;
  oldAvatarUrl?: string | null;
  [key: string]: unknown;
}

export const profileService = {
  // Upload customer avatar file to Cloudflare R2
  uploadAvatar: async (file: File | Blob): Promise<string> => {
    const fileToSend = file instanceof File ? file : new File([file], "avatar.webp", { type: "image/webp" });
    const formData = new FormData();
    formData.append("images", fileToSend);
    formData.append("folder", "users");

    const res = await fetch(`${API_URL}/uploads/batch`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      await parseApiError(res, "Failed to upload avatar image");
    }

    const data: { urls: string[] } = await res.json();
    if (!data.urls || data.urls.length === 0) {
      throw new Error("No image URL returned from upload server");
    }
    return data.urls[0];
  },

  // Update profile with oldAvatarUrl for Cloudflare R2 cleanup
  updateProfile: async (payload: UpdateProfilePayload) => {
    const normalizedPayload = {
      ...payload,
      ...(payload.firstName && !payload.firstname ? { firstname: payload.firstName } : {}),
      ...(payload.lastName && !payload.lastname ? { lastname: payload.lastName } : {}),
    };

    let res = await fetch(`${API_URL}/auth/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(normalizedPayload),
    });

    // Fallback to /auth/me if /auth/profile is not found
    if (res.status === 404) {
      res = await fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(normalizedPayload),
      });
    }

    if (!res.ok) {
      await parseApiError(res, "Failed to update profile");
    }

    return await res.json();
  },

  // Backwards compatibility alias
  updateDetails: async (data: Record<string, string>) => {
    return profileService.updateProfile(data);
  },

 updateSecurity: async (data: { email: string; currentPassword: string; newPassword: string }) => {
  const res = await fetch(`${API_URL}/auth/update-password`, {
    method: "POST", // ← change to PATCH/PUT if your backend route uses that
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) await parseApiError(res, "Security update failed");
  return res.json();
},

  // Delete Account
  deleteAccount: async (payload: DeleteAccountPayload) => {
    const res = await fetch(`${API_URL}/auth/me`, { 
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) await parseApiError(res, "Failed to delete account");
    return res.json();
  },
};
