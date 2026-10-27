// src/hooks/auth/useAuthGateway.ts
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // 🌟 අලුතින් එකතු කළා
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useAuthGateway() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);
  const toast = useToast();
  const tToast = useTranslations("ValidationErrors.ToastMessages.SocialLogin");
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "SocialLoginFailed") {
      toast.error("social-error", tToast("error"));

      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams, toast, tToast]);

  const handleSocialLogin = async (provider: "google" | "apple") => {
    const toastId = toast.loading(provider === "google" ? tToast("googleLoading") : tToast("appleLoading"));

    try {
      setLoadingProvider(provider);
      console.log(`Redirecting to ${provider} authentication...`);

      authService.socialLogin(provider);
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error(`${provider} login error:`, error);
      setLoadingProvider(null);
    }
  };

  return {
    handleSocialLogin,
    loadingProvider,
  };
}
