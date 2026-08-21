import { useState, useRef, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { usePasswordStrength, type TransientMsgType } from "@/hooks/usePasswordStrength";
import { profileService } from "@/services/profile/profileService";

export function useSecuritySettingsForm(tError: (key: string) => string) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { errors, validate, setErrors } = useValidationForm();
  const { transientSuccessMsgs, localError, handlePasswordChange, handlePasswordBlur } = usePasswordStrength();

  const [transientConfirmSuccess, setTransientConfirmSuccess] = useState<TransientMsgType[]>([]);
  const [localConfirmError, setLocalConfirmError] = useState("");
  const confirmTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCurrentChange = (val: string) => {
    setCurrentPassword(val);
    if (errors.currentPassword) {
      setErrors((prev) => ({ ...prev, currentPassword: "" }));
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

    if (val === newPassword) {
      setTransientConfirmSuccess([
        { id: "confirm-match", isStrong: false, msg: tError("passwordsMatch") || "Secure match confirmed" },
      ]);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setTransientConfirmSuccess([]), 3000);
    } else {
      setTransientConfirmSuccess([]);
    }
  };

  const handleConfirmBlur = () => {
    if (confirmPassword !== "" && confirmPassword !== newPassword) {
      setLocalConfirmError(tError("passwordsDoNotMatch"));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate({ currentPassword, password: newPassword, confirmPassword })) return;

    try {
      setIsLoading(true);
      await profileService.updateSecurity({ currentPassword, newPassword, confirmPassword });
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Security Updated!", { currentPassword, newPassword });
    } catch {
      setErrors((prev) => ({ ...prev, form: "Update failed" }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    transientSuccessMsgs,
    localError,
    handleCurrentChange,
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
