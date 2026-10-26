// src/hooks/auth/useAuthGateway.ts
import { useState } from "react";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useAuthGateway() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);
  const toast = useToast();
  const tToast = useTranslations("ValidationErrors.ToastMessages.SocialLogin");

  const handleSocialLogin = async (provider: "google" | "apple") => {
    const toastId = toast.loading(
      provider === "google" ? tToast("googleLoading") : tToast("appleLoading")
    );

    try {
      setLoadingProvider(provider);
      console.log(`Redirecting to ${provider} authentication...`);
      
      // සර්විස් එක හරහා රීඩිරෙක්ට් කිරීම
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