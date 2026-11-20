"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  // During SSR and initial Client Frame 0 hydration, render children so Server and Client HTML match 100%
  if (!mounted) {
    return <>{children}</>;
  }

  // Once mounted on client, if user is suspended, render AccessRestricted screen
  if (user && user.hasAccess === false) {
    return <AccessRestricted />;
  }

  return <>{children}</>;
}

export default AccessGate;

