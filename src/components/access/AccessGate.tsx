"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuth();

  // 1. Synchronously check cached userData before hydration completes
  const [isCachedSuspended, setIsCachedSuspended] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("userData");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.hasAccess === false;
        }
      } catch {
        /* ignore */
      }
    }
    return false;
  });

  useEffect(() => {
    if (user && user.hasAccess === false) {
      setIsCachedSuspended(true);
    } else if (user && user.hasAccess === true) {
      setIsCachedSuspended(false);
    }
  }, [user]);

  // 2. HARD LOCKOUT: If user is suspended (either cached or in live state), render ONLY AccessRestricted
  if (isCachedSuspended || (isHydrated && user && user.hasAccess === false)) {
    return <AccessRestricted />;
  }

  // 3. ZERO-FLASH GUARD: While hydrating, do NOT leak {children} if there is an active user session being verified
  if (!isHydrated) {
    // If a saved session exists, show a luxury dark loader matching the brand instead of flashing children
    const hasSession = typeof window !== "undefined" && !!localStorage.getItem("userData");
    if (hasSession) {
      return (
        <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      );
    }
  }

  return <>{children}</>;
}

export default AccessGate;

