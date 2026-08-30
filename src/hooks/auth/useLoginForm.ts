// src/hooks/auth/useLoginForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const toast = useToast();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });

    if (!isValid) return;

    const toastId = toast.loading("Logging in");
    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      const [response] = await Promise.all([
        authService.login({ email, password, staySignedIn }),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      loginUser(response.user);

      toast.success(toastId, "Login successful! Welcome back.", 2000);

      console.log("Login valid and submitted!", response);
      console.log("Login valid and submitted!", { email, password, staySignedIn });

      setTimeout(() => {
        router.push("/");
      }, 2200);
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
    staySignedIn,
    setStaySignedIn,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  };
}
