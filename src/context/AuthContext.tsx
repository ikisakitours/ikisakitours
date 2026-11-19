"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authService } from "@/services/auth/authService";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  hasAccess?: boolean;
  isVerified?: boolean;
  isVip?: boolean;
  avatarUrl?: string | null;
  avatarSignature?: string | null;
  provider?: string | null;
  providerId?: string | null;
}

interface AuthContextType {
  user: User | null;
  loginUser: () => Promise<void>;
  logoutUser: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
  fetchUser: () => Promise<void>;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();
      const userData = response.user ? response.user : response;
      // console.log("Raw API Response:", response);

      if (userData && (userData.id || userData.email)) {
        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        // console.log("Fetch Data Success!", userData);
      }
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string; error?: string; data?: { error?: string } };
      // If backend reports ACCOUNT_SUSPENDED (403), keep user info but set hasAccess: false
      const isSuspended =
        err?.status === 403 ||
        err?.message?.toLowerCase().includes("suspended") ||
        err?.error === "ACCOUNT_SUSPENDED" ||
        err?.data?.error === "ACCOUNT_SUSPENDED";

      if (isSuspended) {
        let suspendedUser: User | null = null;
        const saved = localStorage.getItem("userData");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            parsed.hasAccess = false;
            suspendedUser = parsed;
            localStorage.setItem("userData", JSON.stringify(parsed));
          } catch {
            /* ignore JSON parse error */
          }
        }
        setUser((prev) => (prev ? { ...prev, hasAccess: false } : suspendedUser));
      } else {
        console.error("No active session", error);
        setUser(null);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // 1) localStorage restore
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem("userData");
        if (saved) setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("userData");
      }
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUser();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchUser]);

  const loginUser = async () => {
    await fetchUser();
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem("userData", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isHydrated,loginUser, logoutUser, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
