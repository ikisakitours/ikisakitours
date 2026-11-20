"use client";
import React, { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuth();

  // Reactive check: Once client-side hydration completes, if user has hasAccess === false, show restriction screen
  if (isHydrated && user && user.hasAccess === false) {
    return <AccessRestricted />;
  }

  return <>{children}</>;
}

export default AccessGate;

