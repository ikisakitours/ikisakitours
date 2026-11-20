"use client";
import React, { useState, useEffect } from "react";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { AccessRestricted } from "@/components/access/AccessRestricted";
import { useRouter } from "@/lib/i18nNavigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export function ProfileAccessGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const tProfile = useTranslations("ProfilePage");

  // 1. Synchronously parse cached userData at Frame 0
  const [authState, setAuthState] = useState<"loading" | "authenticated" | "unauthenticated" | "suspended">(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("userData");
        if (!raw) return "unauthenticated";
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.hasAccess === "boolean" && !parsed.hasAccess) {
          return "suspended";
        }
        if (parsed && (parsed.email || parsed.id)) {
          return "authenticated";
        }
      } catch {
        return "unauthenticated";
      }
    }
    return "loading";
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      try {
        const raw = localStorage.getItem("userData");
        if (!raw) {
          setAuthState("unauthenticated");
          return;
        }
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.hasAccess === "boolean" && !parsed.hasAccess) {
          setAuthState("suspended");
        } else if (parsed && (parsed.email || parsed.id)) {
          setAuthState("authenticated");
        } else {
          setAuthState("unauthenticated");
        }
      } catch {
        setAuthState("unauthenticated");
      }
    });
  }, []);

  // Sync if user state updates from AuthContext (e.g. fresh login or suspension update)
  useEffect(() => {
    if (user) {
      queueMicrotask(() => {
        if (typeof user.hasAccess === "boolean" && !user.hasAccess) {
          setAuthState("suspended");
        } else {
          setAuthState("authenticated");
        }
      });
    }
  }, [user]);

  // 2. Client Hydration / Pre-mount state (Never render children!)
  if (!mounted || authState === "loading") {
    return <ApiCallLoader fullScreen={true} text={tProfile("loading")} />;
  }

  // 3. Suspended Customer: Immediately lock onto Access Restricted Screen (Zero Private Data Mount)
  if (authState === "suspended") {
    return <AccessRestricted />;
  }

  // 4. Unauthenticated: Strictly render ONLY AuthRequiredModal
  if (authState === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <AuthRequiredModal
          isOpen={true}
          onClose={() => router.push("/")}
          translationPath="ValidationErrors.AuthRequired.Profile"
        />
      </div>
    );
  }

  // 5. Authenticated & Active: Render ProfileDashboard safely
  return <>{children}</>;
}

export default ProfileAccessGate;
