import { useState, useRef, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { usePasswordStrength, type TransientMsgType } from "@/hooks/usePasswordStrength";
import { useRouter } from "@/lib/i18nNavigation";
import { authService } from "@/services/auth/authService";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";

export function useSignupForm(tError: (key: string) => string) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryName, setCountryName] = useState("");
  const [terms, setTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<TransientMsgType[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const toast = useToast();

  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    setLocalConfirmError("");

    if (val === "") {
      setTransientConfirmSuccess([]);
      return;
    }

    if (val === password) {
      setTransientConfirmSuccess([{ id: "confirm-match", msg: tError("passwordsMatch") || "Secure match confirmed" }]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 3000);
    } else {
      setTransientConfirmSuccess([]);
    }
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== "" && confirmPassword !== password) {
      setLocalConfirmError(tError("passwordsDoNotMatch"));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationPayload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      countryName,
      terms,
    };

    const isValid = validate(validationPayload);
    if (!isValid) return;

    const apiPayload = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      country: countryName,
      terms: terms,
    };

    const toastId = toast.loading("Registering account");
    try {
      setIsLoading(true);

      const [response] = await Promise.all([
        authService.signup(apiPayload),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);

      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login valid and submitted!", response);
      toast.success(toastId, "Registration successful! Redirecting", 2000);

      console.log("Signup Valid & Submitted!", { firstName, lastName, email, country: countryName });

      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } catch (error) {
      toast.error(toastId, "Registration failed. Please try again.");

      console.error("Signup error:", error);
      setErrors((prev) => ({ ...prev, form: tErr("registrationFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    countryName,
    setCountryName,
    terms,
    setTerms,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
  };
}
