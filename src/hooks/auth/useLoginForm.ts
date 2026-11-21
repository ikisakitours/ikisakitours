// src/hooks/auth/useLoginForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { useSearchParams } from "next/navigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { getCookieConsentStatus } from "@/utils/cookiesHandle";
import { cookieService } from "@/services/cookies/cookieService";
import { getSafeRedirect } from "@/utils/redirect";

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
  const [isTwoFactorStep, setIsTwoFactorStep] = useState(false);
  const [formTicket, setFormTicket] = useState<string | null>(null);
  const [formEmail, setFormEmail] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSuspendedInfo, setFormSuspendedInfo] = useState<{ isSuspended: boolean; refId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tAuth = useTranslations("Auth");
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Login");
  const toast = useToast();
  const { loginUser, updateUser } = useAuth();

  // Social Login 2FA Challenge redirect support: /login?step=2fa_challenge&ticket=...&email=...&ref=...
  const stepParam = searchParams?.get("step");
  const urlTicket = searchParams?.get("ticket");
  const urlEmail = searchParams?.get("email");
  const urlRef = searchParams?.get("ref");

  const effectiveTicket = formTicket || urlTicket || "";
  const isSocialChallenge = stepParam === "2fa_challenge" && Boolean(urlTicket);
  const inTwoFactorChallenge = isTwoFactorStep || isSocialChallenge;
  const challengeEmail = formEmail || urlEmail || email;

  const handleTotpChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
    setTotpCode(digitsOnly);
    if (errorMessage) setErrorMessage(null);
  };

  const handleBackToCredentials = () => {
    setIsTwoFactorStep(false);
    setFormTicket(null);
    setFormEmail(null);
    setTotpCode("");
    setErrorMessage(null);
    if (searchParams?.get("step") === "2fa_challenge") {
      router.replace("/login");
    }
  };

  // 1. Derived: Social Login redirect with suspension (?error=ACCOUNT_SUSPENDED&ref=...)
  const errorParam = searchParams?.get("error");
  const refParam = searchParams?.get("ref") || urlRef;
  const suspendedInfo =
    formSuspendedInfo ||
    (errorParam === "ACCOUNT_SUSPENDED"
      ? { isSuspended: true, refId: refParam || undefined }
      : null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFormSuspendedInfo(null);

    // ─── Case 1: Strict Dual-Barrier Zero-Trust 2FA Challenge Submission ───
    if (inTwoFactorChallenge) {
      if (!totpCode || totpCode.trim().length < 6) {
        setErrorMessage(tAuth("TwoFactor.codeRequired"));
        return;
      }

      const toastId = toast.loading(tToast("loading"));
      try {
        setIsLoading(true);

        // Call unified ticket verification endpoint
        const verifyRes = await authService.verify2FAChallenge({
          ticket: effectiveTicket,
          totpCode: totpCode.trim(),
          staySignedIn,
        });

        await loginUser();
        
        // Sync authenticated user in AuthContext
        if (verifyRes?.user) {
          updateUser(verifyRes.user);
        } else {
          await loginUser();
        }

        // Sync guest cookie preferences
        try {
          const consentStatus = getCookieConsentStatus();
          if (consentStatus && verifyRes) {
            const isAccepted = consentStatus === "accepted";
            const guestPreferences = {
              performance: isAccepted,
              functional: isAccepted,
              targeting: isAccepted,
            };

            const userId = (verifyRes.user as { id?: string })?.id || (verifyRes as { id?: string }).id;
            if (userId) {
              await cookieService.saveConsent(String(userId), guestPreferences);
            }
          }
        } catch (cookieError) {
          console.error("⚠️ Failed to sync cookie preferences on 2FA login:", cookieError);
        }

        toast.success(toastId, tToast("success"), 2000);
        setFormTicket(null);
        setIsTwoFactorStep(false);

        setTimeout(() => {
          router.push(getSafeRedirect("/"));
        }, 1500);
      } catch (error: unknown) {
        console.error("2FA Challenge error:", error);
        const err = error as { message?: string };
        toast.error(toastId, tAuth("TwoFactor.invalidCode"));
        setErrorMessage(err?.message || tAuth("TwoFactor.invalidCode"));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // ─── Case 2: Normal Email / Password Login ───
    const isValid = validate({ email, password });
    if (!isValid) return;

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);

      const loginPayload: Record<string, string | boolean | undefined> = {
        email,
        password,
        staySignedIn,
      };

      const [response] = await Promise.all([
        authService.login(loginPayload) as Promise<LoginResponse>,
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      // Check if backend challenges for 2FA ({ requiresTwoFactor: true, ticket: "..." })
      if (response && response.requiresTwoFactor === true) {
        const ticket = (response.ticket as string) || (response.twoFactorTicket as string) || "";
        setFormTicket(ticket);
        if (response.email) setFormEmail(String(response.email));
        setIsTwoFactorStep(true);
        setIsLoading(false);
        toast.dismiss(toastId);
        return;
      }

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
            // console.log("✅ Guest cookie preferences successfully synced on login!");
          }
        }
      } catch (cookieError) {
        console.error("⚠️ Failed to sync cookie preferences on login:", cookieError);
      }
      toast.success(toastId, tToast("success"), 2000);

      // console.log("Login valid and submitted!", response);

      setTimeout(() => {
        router.push(getSafeRedirect("/"));
      }, 2200);
    } catch (error: unknown) {
      console.error("Login error:", error);
      const err = error as {
        status?: number;
        error?: string;
        message?: string;
        requiresTwoFactor?: boolean;
        ticket?: string;
        data?: {
          error?: string;
          message?: string;
          ticket?: string;
          requiresTwoFactor?: boolean;
          user?: { customerReferenceId?: string; referenceId?: string };
        };
        response?: {
          status?: number;
          data?: {
            error?: string;
            message?: string;
            ticket?: string;
            requiresTwoFactor?: boolean;
            user?: { customerReferenceId?: string; referenceId?: string };
          };
        };
      };

      const status = err?.status || err?.response?.status;
      const errorCode = err?.error || err?.data?.error || err?.response?.data?.error;
      const userData = err?.data?.user || err?.response?.data?.user;
      const refId = userData?.customerReferenceId || userData?.referenceId;
      const requiresTwoFactor = Boolean(
        err?.requiresTwoFactor ||
        (err?.data && (err.data as Record<string, unknown>).requiresTwoFactor) ||
        errorCode === "TWO_FACTOR_REQUIRED"
      );

      // Case 0: 2FA required on account
      if (requiresTwoFactor) {
        const ticket = (err?.data?.ticket as string) || (err?.ticket as string) || "";
        if (ticket) setFormTicket(ticket);
        setIsTwoFactorStep(true);
        toast.dismiss(toastId);
        return;
      }

      // Case A: Account is Suspended
      if (status === 403 || errorCode === "ACCOUNT_SUSPENDED") {
        toast.error(toastId, tAuth("Suspension.account_suspended_title"));
        setFormSuspendedInfo({
          isSuspended: true,
          refId: refId || undefined,
        });
        return;
      }

      // Case B: Social Login Account used in Email/Password form
      if (errorCode === "SOCIAL_ACCOUNT_LOGIN_REQUIRED") {
        toast.error(toastId, tAuth("Suspension.social_login_required"));
        setErrorMessage(tAuth("Suspension.social_login_required"));
        return;
      }

      // Case D: Standard Invalid Credentials
      toast.error(toastId, tToast("error"));
      setErrorMessage(err?.message || (tToast("error") as string) || "Invalid email or password.");
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
    isTwoFactorStep: inTwoFactorChallenge,
    totpCode,
    challengeEmail,
    handleTotpChange,
    handleBackToCredentials,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
    suspendedInfo,
    setSuspendedInfo: setFormSuspendedInfo,
    errorMessage,
    setErrorMessage,
  };
}
