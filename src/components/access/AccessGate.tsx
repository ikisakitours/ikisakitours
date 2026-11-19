"use client";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuth();

  // 1. Reactive check from auth context
  if (isHydrated && user && user.hasAccess === false) {
    return <AccessRestricted />;
  }

  // 2. Early client-side check to prevent any flash before hydration completes
  let isEarlyRestricted = false;
  if (typeof window !== "undefined" && !isHydrated) {
    try {
      const saved = localStorage.getItem("userData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.hasAccess === false) {
          isEarlyRestricted = true;
        }
      }
    } catch {
      /* ignore */
    }
  }

  if (isEarlyRestricted) {
    return <AccessRestricted />;
  }

  return <>{children}</>;
}
