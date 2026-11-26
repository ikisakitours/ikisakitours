const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
}

async function parseErrorResponse(res: Response, fallbackMessage: string): Promise<never> {
  let errorData: Record<string, unknown> = {};
  try {
    errorData = await res.json();
  } catch {
    /* empty response */
  }
  const message =
    (typeof errorData.message === "string" && errorData.message) ||
    (typeof errorData.error === "string" && errorData.error) ||
    `${fallbackMessage} (${res.status})`;
  const err = new Error(message) as Error & {
    status?: number;
    error?: unknown;
    data?: Record<string, unknown>;
    response?: { status: number; data: Record<string, unknown> };
    requiresTwoFactor?: boolean;
  };
  err.status = res.status;
  err.error = errorData.error || errorData.code;
  err.data = errorData;
  err.requiresTwoFactor = Boolean(errorData.requiresTwoFactor);
  err.response = { status: res.status, data: errorData };
  throw err;
}

export const authService = {
  socialLogin: (provider: "google" | "facebook" | "instagram", redirectPath: string = "/") => {
    window.location.href = `${API_URL}/social-auth/${provider}?state=${encodeURIComponent(redirectPath)}`;
  },

  // Login data send to backend (supports 2FA totpCode)
  login: async (data: Record<string, string | boolean | undefined>) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) await parseErrorResponse(res, "Login failed");
    return res.json();
  },

  // 1. Generate 2FA secret and QR code
  generate2FA: async (): Promise<{ success: boolean; secret?: string; qrCodeDataUrl?: string; qrCode?: string; qrCodeUrl?: string; message?: string }> => {
    const res = await fetch(`${API_URL}/auth/2fa/generate`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    if (!res.ok) await parseErrorResponse(res, "Failed to generate 2FA");
    return await res.json();
  },

  // 2. Enable 2FA with 6-digit verification code
  enable2FA: async (totpCode: string): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_URL}/auth/2fa/enable`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify({ totpCode }),
    });
    if (!res.ok) await parseErrorResponse(res, "Failed to activate 2FA");
    return await res.json();
  },

  // 3. Disable 2FA
  disable2FA: async (payload: { currentPassword?: string; totpCode?: string }): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(`${API_URL}/auth/2fa/disable`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) await parseErrorResponse(res, "Failed to disable 2FA");
    return await res.json();
  },

  // 4. Verify 2FA challenge with unified ticket (Social & Password Login)
  verify2FAChallenge: async (payload: { ticket: string; totpCode: string; staySignedIn?: boolean }): Promise<{ success: boolean; user?: Record<string, unknown>; [key: string]: unknown }> => {
    const res = await fetch(`${API_URL}/auth/2fa/verify-challenge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) await parseErrorResponse(res, "Failed to verify 2FA code");
    return await res.json();
  },

  // Get one specific user data
  getCurrentUser: async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: getAuthHeaders(),
        credentials: "include",
      });
      if (res.status === 403) {
        return { hasAccess: false };
      }
      if (!res.ok) await parseErrorResponse(res, "Failed to fetch user");
      return res.json();
    } catch (err: unknown) {
      const error = err as { status?: number };
      if (error?.status === 403) {
        return { hasAccess: false };
      }
      throw err;
    }
  },

  signup: async (data: Record<string, string | boolean>) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) await parseErrorResponse(res, "Signup failed");
    return res.json();
  },

  recoverPassword: async (email: string) => {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    if (!res.ok) await parseErrorResponse(res, "Recovery request failed");
    return res.json();
  },

  resetPassword: async (data: { email: string; otp: string | string[]; newPassword: string }) => {
    const payload = {
      email: data.email,
      otp: Array.isArray(data.otp) ? data.otp.join("") : data.otp,
      newPassword: data.newPassword,
    };

    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) await parseErrorResponse(res, "Password reset failed");
    return res.json();
  },

  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) await parseErrorResponse(res, "Logout failed");
    return res.json();
  },
};
