import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { useSearchParams } from "next/navigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useRecoveryForm(tAuth: (key: string) => string) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromWhere = searchParams?.get("from");
  const backLabel = fromWhere === "profile?tab=security" ? tAuth("Links.backToProfile") : tAuth("Links.backToSignIn");
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const toast = useToast();

  const handleBackClick = () => {
    if (fromWhere === "profile") {
      router.push("/profile?tab=security");
    } else {
      router.back();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate({ email })) return;

    const toastId = toast.loading("Sending recovery instructions");
    try {
      setIsLoading(true);
      await authService.recoverPassword(email);
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(toastId, "Recovery email sent successfully!");

      console.log("Valid Email for recovery:", email);
      router.push("/password-change");
    } catch (error) {
      console.error("Recovery error:", error);

      toast.error(toastId, "Recovery failed. Email not found.");

      setErrors((prev) => ({ ...prev, form: tErr("recoveryFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    errors,
    setErrors,
    isLoading,
    backLabel,
    handleBackClick,
    handleSubmit,
  };
}
