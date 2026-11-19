const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const authService = {
  socialLogin: (provider: "google" | "facebook" | "instagram", redirectPath: string = "/") => {
    window.location.href = `${API_URL}/social-auth/${provider}?state=${encodeURIComponent(redirectPath)}`;
  },

  // Login data send to backend
  login: async (data: Record<string, string | boolean>) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  // Get one specific user data
  getCurrentUser: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) {
      let errorData: Record<string, unknown> = {};
      try {
        errorData = await res.json();
      } catch {
        /* empty response */
      }
      const message =
        (typeof errorData.message === "string" && errorData.message) ||
        (typeof errorData.error === "string" && errorData.error) ||
        `Failed to fetch user (${res.status})`;
      const err = new Error(message) as Error & {
        status?: number;
        error?: unknown;
        data?: unknown;
      };
      err.status = res.status;
      err.error = errorData.error || errorData.code;
      err.data = errorData;
      throw err;
    }
    return res.json();
  },

  signup: async (data: Record<string, string | boolean>) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

recoverPassword: async (email: string) => {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Recovery request failed");
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
  if (!res.ok) throw new Error("Password reset failed");
  return res.json();
},

  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    return res.json();
  },
};
