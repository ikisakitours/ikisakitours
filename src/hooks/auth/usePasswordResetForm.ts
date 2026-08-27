import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { usePasswordStrength, type TransientMsgType } from "@/hooks/usePasswordStrength";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { authService } from "@/services/auth/authService";
import { useToast } from "@/context/ToastContext";

const otpLength = 6;

export function usePasswordResetForm(tError: (key: string) => string) {
  const [otp, setOtp] = useState(() => Array.from({ length: otpLength }, () => ""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { errors, validate, setErrors } = useValidationForm();
  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<TransientMsgType[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const toast = useToast();
  const handleOtpChange = (index: number, value: string) => {
    const nextDigit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = nextDigit;
    setOtp(nextOtp);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }

    if (nextDigit && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmChange = (val: string) => {
    setConfirmPassword(val);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    setLocalConfirmError("");

    if (val === "") {
      setTransientConfirmSuccess([]);
      return;
    }

    if (val === password) {
      setTransientConfirmSuccess([{ id: "confirm-reset", msg: tError("passwordsMatch") || "Secure match confirmed" }]);
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
    if (!validate({ otp, password, confirmPassword })) return;

    const toastId = toast.loading("Resetting password");

    try {
      setIsLoading(true);
      await authService.resetPassword({ otp, password, confirmPassword });
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(toastId, "Password reset successful! Redirecting...");

      console.log("Password Reset Valid & Submitted!", { otp, password });

      // Form Clear
      setOtp(Array.from({ length: otpLength }, () => ""));
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      console.error("Password reset error:", error);

      toast.error(toastId, "Password reset failed. Invalid OTP or expired.");

      setErrors((prev) => ({ ...prev, form: tErr("resetFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    otp,
    password,
    setPassword,
    confirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    otpRefs,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
    handleOtpChange,
    handleOtpKeyDown,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
  };
}
