"use client";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuth();

  if (isHydrated && user && user.hasAccess === false) {
    return <AccessRestricted />;
  }

  return <>{children}</>;
}