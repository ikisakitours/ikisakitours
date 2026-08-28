const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const authService = {
  socialLogin: (provider: "google" | "apple") => {
    window.location.href = `${API_URL}/auth/${provider}`;
  },

  login: async (data: Record<string, string | boolean>) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  signup: async (data: Record<string, string | boolean>) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

  recoverPassword: async (email: string) => {
    const res = await fetch(`${API_URL}/auth/recovery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Recovery request failed");
    return res.json();
  },

  resetPassword: async (data: { otp: string | string[]; password?: string; confirmPassword?: string }) => {
    const payload = { ...data, otp: Array.isArray(data.otp) ? data.otp.join("") : data.otp };

    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Password reset failed");
    return res.json();
  },
};
