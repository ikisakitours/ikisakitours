import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { useSearchParams } from "next/navigation";

export function useRecoveryForm(tAuth: (key: string) => string) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromWhere = searchParams?.get("from");
  const backLabel = fromWhere === "profile?tab=security" ? tAuth("Links.backToProfile") : tAuth("Links.backToSignIn");

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

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Valid Email for recovery:", email);
      router.push("/password-change");
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({ ...prev, form: "Recovery request failed" }));
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
