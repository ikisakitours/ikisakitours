"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { useRouter, usePathname } from "@/lib/i18nNavigation";
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

  // 2. Initialize as false on both server and client to guarantee zero hydration mismatch
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const lastFocusCheckRef = useRef<number>(0);

  // 3. Helper to set user, localStorage, AND sync Edge Cookie
  const setAuthenticatedUser = useCallback((userData: User | null) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
        if (userData.hasAccess === false) {
          document.cookie = "customer_suspended=true; path=/; max-age=2592000; SameSite=Lax";
        } else {
          document.cookie = "customer_suspended=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        }
        // Sync cookie so Edge proxy.ts recognizes authenticated session
        document.cookie = "customer_token=true; path=/; max-age=2592000; SameSite=Lax";
      } else {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.removeItem("customer_token");
        document.cookie = "customer_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
        document.cookie = "customer_suspended=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();

      // If backend returned 403 / hasAccess: false
      if (response && response.hasAccess === false) {
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
            : ({ id: "", firstname: "", lastname: "", email: "", country: "", hasAccess: false } as User),
        );
        return;
      }

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
            : ({ id: "", firstname: "", lastname: "", email: "", country: "", hasAccess: false } as User),
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
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.hasAccess === false) {
          document.cookie = "customer_suspended=true; path=/; max-age=2592000; SameSite=Lax";
        }
      } catch {
        /* ignore */
      }
    }
    if (!raw) return;
    console.log("🔄 [AuthCheck - Page Load/Refresh] Checking user session with /api/auth/me...");

    authService
      .getCurrentUser()
      .then((freshUser) => {
        if (freshUser && freshUser.hasAccess === false) {
          let baseUser: User | null = null;
          try {
            baseUser = JSON.parse(raw);
          } catch {
            /* ignore */
          }
          if (baseUser) {
            setAuthenticatedUser({ ...baseUser, hasAccess: false });
          }
          return;
        }

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

  // Window focus & tab visibility listener to re-verify user access in background
  useEffect(() => {
    const handleTabReturn = () => {
      // Tab එක hidden නම් (වෙන tab එකක ඉන්නවා නම්) run කරන්න එපා
      if (document.visibilityState === "hidden") return;

      // User log වෙලා නැත්නම් request යවන්න එපා
      if (!user) {
        console.log("⏭️ [AuthCheck - Tab Focus] Skipped (User not logged in)");
        return;
      }

      // තත්පර 60ක throttle check එක
      const now = Date.now();
      const remainingSec = Math.ceil((60_000 - (now - lastFocusCheckRef.current)) / 1000);
      if (now - lastFocusCheckRef.current < 60_000) {
        console.log(`⏳ [AuthCheck - Tab Focus] Throttled! Wait ${remainingSec}s before next request.`);
        return;
      }

      lastFocusCheckRef.current = now;
      console.log("👀 [AuthCheck - Tab Focus] 60s passed! Sending /api/auth/me request...");
      fetchUser();
    };

    window.addEventListener("focus", handleTabReturn);
    document.addEventListener("visibilitychange", handleTabReturn);
    return () => {
      window.removeEventListener("focus", handleTabReturn);
      document.removeEventListener("visibilitychange", handleTabReturn);
    };
  }, [fetchUser, user]);

  // Real-time Route Protection Redirect & URL Lock
  useEffect(() => {
    if (!isHydrated) return;
    // 1. If user is SUSPENDED and not already on /access-restricted, force redirect:
    if (user && user.hasAccess === false) {
      if (!pathname.includes("/access-restricted")) {
        router.replace("/access-restricted");
      }
    }
    // 2. If user is ACTIVE and tries to visit /access-restricted, return to profile:
    if (user && user.hasAccess === true) {
      if (pathname.includes("/access-restricted")) {
        router.replace("/profile");
      }
    }
  }, [user, isHydrated, pathname, router]);

  // Route change sync to re-verify access whenever user navigates to a new page
  const isLoggedIn = Boolean(user);
  const hasAccess = user?.hasAccess;
  const prevPathnameRef = useRef<string>(pathname);

  // Route change sync to re-verify access whenever user navigates to a new page
  useEffect(() => {
    if (!isHydrated || !isLoggedIn || hasAccess === false) return;

    // Initial page load/refresh එකේදී pathname වෙනස් වෙලා නැති නිසා skip කරන්න
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;

    const timer = setTimeout(() => {
      console.log(`🧭 [AuthCheck - Route Change] Navigated to "${pathname}" -> Sending /api/auth/me request...`);
      fetchUser();
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, fetchUser, isHydrated, isLoggedIn, hasAccess]);

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
