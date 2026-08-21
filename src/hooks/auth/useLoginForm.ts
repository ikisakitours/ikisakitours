// src/hooks/auth/useLoginForm.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { useRouter } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({ email, password });

    if (!isValid) return;

    try {
      setIsLoading(true);
     const response =  await authService.login({ email, password });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login valid and submitted!", response);
      console.log("Login valid and submitted!", { email, password });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({ ...prev, form: "Authentication failed" }));
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
