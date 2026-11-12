import { useState, useRef, type FormEvent} from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { usePasswordStrength, type TransientMsgType } from "@/hooks/usePasswordStrength";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { authService } from "@/services/auth/authService";
import { useToast } from "@/context/ToastContext";

const otpLength = 6;

// Numbers only,
const cleanOtp = (value: string) => value.replace(/\D/g, "");

export function usePasswordResetForm(tError: (key: string) => string) {
  const [otp, setOtp] = useState(() => Array.from({ length: otpLength }, () => ""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRef = useRef<HTMLInputElement | null>(null);
  const [isOtpFocused, setIsOtpFocused] = useState(false);  const { errors, validate, setErrors } = useValidationForm();
  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<TransientMsgType[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tToast = useTranslations("ValidationErrors.ToastMessages.PasswordReset");
  const toast = useToast();

  const handleOtpInputChange = (value: string) => {
    const cleaned = cleanOtp(value).slice(0, otpLength);
    setOtp(Array.from({ length: otpLength }, (_, i) => cleaned[i] ?? ""));

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  const moveOtpCaretToEnd = () => {
    const el = otpInputRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.setSelectionRange(el.value.length, el.value.length));
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

    const email = sessionStorage.getItem("reset_email");
    if (!email) {
      router.push("/login");
      return;
    }

    const toastId = toast.loading(tToast("loading"));
    try {
      setIsLoading(true);
      await authService.resetPassword({ email, otp, newPassword: password });

      toast.success(toastId, tToast("success"), 2000);
      sessionStorage.removeItem("reset_email");

      // Form Clear
      setOtp(Array.from({ length: otpLength }, () => ""));
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      console.error("Password reset error:", error);

      toast.error(toastId, tToast("error"));

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
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handlePasswordChange,
    handlePasswordBlur,
    transientConfirmSuccess,
    localConfirmError,
       otpInputRef,
    isOtpFocused,
    setIsOtpFocused,
    handleOtpInputChange,
    moveOtpCaretToEnd,
    handleConfirmChange,
    handleConfirmBlur,
    isLoading,
    handleSubmit,
  };
}
