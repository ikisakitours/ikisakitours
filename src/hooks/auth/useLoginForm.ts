// src/hooks/auth/useLoginForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { getCookieConsentStatus } from "@/utils/cookiesHandle";
import { cookieService } from "@/services/cookies/cookieService";
interface LoginResponse {
  id?: string;
  user?: {
    id: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}
export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Login");
  const toast = useToast();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });

    if (!isValid) return;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      const [response] = await Promise.all([
        authService.login({ email, password, staySignedIn }) as Promise<LoginResponse>,
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
      await loginUser();

      try {
        const consentStatus = getCookieConsentStatus();
        if (consentStatus && response) {
          const isAccepted = consentStatus === "accepted";
          const guestPreferences = {
            performance: isAccepted,
            functional: isAccepted,
            targeting: isAccepted,
          };

          const userId = response.id || response.user?.id;

          if (userId) {
            await cookieService.saveConsent(userId, guestPreferences);
            console.log("✅ Guest cookie preferences successfully synced on login!");
          }
        }
      } catch (cookieError) {
        console.error("⚠️ Failed to sync cookie preferences on login:", cookieError);
      }
      toast.success(toastId, tToast("success"), 2000);

      console.log("Login valid and submitted!", response);

      setTimeout(() => {
        router.push("/");
      }, 2200);
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Login error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("registrationFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    staySignedIn,
    setStaySignedIn,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  };
}
