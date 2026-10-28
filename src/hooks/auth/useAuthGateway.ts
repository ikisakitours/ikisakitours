import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export type SocialProviderType =
  | "google"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "x"
  | "apple"
  | "linkedin"
  | "snapchat";

export function useAuthGateway() {
  //temporary code under development
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [devProviderName, setDevProviderName] = useState("");

  const [loadingProvider, setLoadingProvider] = useState<SocialProviderType | null>(null);
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

  // const handleSocialLogin = async (provider: "google" | "facebook" | "instagram") => {
  //   const loadingMsg =
  //     provider === "google"
  //       ? tToast("googleLoading")
  //       : provider === "facebook"
  //         ? tToast("facebookLoading")
  //         : tToast("instagramLoading");

  //   const toastId = toast.loading(loadingMsg);
  //   try {
  //     setLoadingProvider(provider);
  //     console.log(`Redirecting to ${provider} authentication...`);
  //     authService.socialLogin(provider);
  //   } catch (error) {
  //     toast.error(toastId, tToast("error"));
  //     console.error(`${provider} login error:`, error);
  //     setLoadingProvider(null);
  //   }
  // };

  //temporary code under development
  const handleSocialLogin = async (provider: SocialProviderType) => {
    // not show under development model for google
    if (provider !== "google") {
      setDevProviderName(provider);
      setIsDevModalOpen(true);
      return;
    }

    const loadingMsg = tToast("googleLoading");
    const toastId = toast.loading(loadingMsg);

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
    //temporary code under development
    isDevModalOpen,
    setIsDevModalOpen,
    devProviderName,
  };
}
