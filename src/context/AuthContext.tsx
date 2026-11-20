"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth/authService";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  customerReferenceId?: string;
  referenceId?: string;
  hasAccess?: boolean;
  isVerified?: boolean;
  isVip?: boolean;
  avatarUrl?: string | null;
  avatarSignature?: string | null;
  provider?: string | null;
  providerId?: string | null;
  isTwoFactorEnabled?: boolean;
  twoFactorEnabled?: boolean;
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
  // 1. Synchronously initialize user from localStorage (Zero delay)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("userData");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  // 2. Synchronously initialize hydration state
  const [isHydrated, setIsHydrated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("userData"));
    }
    return false;
  });

  const pathname = usePathname();

  // 3. Helper to set user, localStorage, AND sync Edge Cookie
  const setAuthenticatedUser = useCallback((userData: User | null) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
        // Sync cookie so Edge proxy.ts recognizes authenticated session
        document.cookie = "customer_token=true; path=/; max-age=2592000; SameSite=Lax";
      } else {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("customer_token");
        document.cookie = "customer_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();
      const userData = response.user ? response.user : response;

      if (userData && (userData.id || userData.email)) {
        setAuthenticatedUser(userData);
      }
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string; error?: string; data?: { error?: string } };
      const isSuspended =
        err?.status === 403 ||
        err?.message?.toLowerCase().includes("suspended") ||
        err?.error === "ACCOUNT_SUSPENDED" ||
        err?.data?.error === "ACCOUNT_SUSPENDED";

      if (isSuspended) {
        let baseUser: User | null = null;
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("userData");
          if (saved) {
            try {
              baseUser = JSON.parse(saved);
            } catch {
              /* ignore */
            }
          }
        }
        setAuthenticatedUser(
          baseUser
            ? { ...baseUser, hasAccess: false }
            : ({ id: "", firstname: "", lastname: "", email: "", country: "", hasAccess: false } as User)
        );
      } else if (err?.status === 401) {
        setAuthenticatedUser(null);
      } else {
        console.error("Session verification error:", error);
      }
    }
  }, [setAuthenticatedUser]);

  // 4. Background re-validation (Silent verification with /api/auth/me)
  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
    const raw = typeof window !== "undefined" ? localStorage.getItem("userData") : null;
    if (!raw) return;

    authService
      .getCurrentUser()
      .then((freshUser) => {
        const userData = freshUser?.user ? freshUser.user : freshUser;
        if (userData && (userData.id || userData.email)) {
          setAuthenticatedUser(userData);
        }
      })
      .catch((err) => {
        if (err?.status === 403 || err?.error === "ACCOUNT_SUSPENDED") {
          let baseUser: User | null = null;
          try {
            baseUser = JSON.parse(raw);
          } catch {
            /* ignore */
          }
          if (baseUser) {
            setAuthenticatedUser({ ...baseUser, hasAccess: false });
          }
        } else if (err?.status === 401) {
          setAuthenticatedUser(null);
        }
      });
  }, [setAuthenticatedUser]);

  // Window focus listener to re-verify user access in background when returning to tab
  useEffect(() => {
    const handleFocus = () => {
      fetchUser();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchUser]);

  // Route change sync to re-verify access whenever user navigates to a new page
  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        fetchUser();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, fetchUser, isHydrated]);

  const loginUser = async () => {
    await fetchUser();
  };

  const logoutUser = () => {
    setAuthenticatedUser(null);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(newUser));
      }
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isHydrated, loginUser, logoutUser, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
