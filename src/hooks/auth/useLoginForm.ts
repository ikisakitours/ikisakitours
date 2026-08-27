// src/hooks/auth/useLoginForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });

    if (!isValid) return;

    const toastId = toast.loading("Logging in");
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(toastId, "Login successful! Welcome back.");

      console.log("Login valid and submitted!", response);
      console.log("Login valid and submitted!", { email, password });

      setTimeout(() => {
        router.push("/");
      }, 3500);
    } catch (error) {
      toast.error(toastId, "Invalid email or password. Please try again.");
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
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  };
}
