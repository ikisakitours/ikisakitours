// src/hooks/profile/useSecuritySettingsForm.ts

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { usePasswordStrength, type TransientMsgType } from "@/hooks/usePasswordStrength";
import { useTranslations } from "next-intl";
import { profileService, type DeleteAccountPayload } from "@/services/profile/profileService";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

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

  const toast = useToast();
  const tToastDelete = useTranslations("ValidationErrors.ToastMessages.DeleteAccount");
  const tErr = useTranslations("ValidationErrors.ServerErrors");
  const tEr = useTranslations("ValidationErrors");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const [confirmText, setConfirmText] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const { user } = useAuth();
  const isSocialAuth = Boolean(user?.provider && user.provider !== "local");
  const [deleteMethod, setDeleteMethod] = useState<"password" | "text">(
    isSocialAuth ? "text" : "password" 
  );
  useEffect(() => {
    if (isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDeleteModalOpen]);

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
      console.log("Security Updated!", { currentPassword, newPassword });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrors((prev) => ({ ...prev, form: tErr("updateFailed") }));
      console.error("Security Updated error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 Updated handleDeleteAccount to support both methods
  const handleDeleteAccount = async () => {
    if (deleteMethod === "password" && !deletePassword) {
      setErrors((prev) => ({ ...prev, deletePassword: tError("passwordRequired") }));
      return;
    }

    if (deleteMethod === "text" && confirmText !== "DELETE") {
      setErrors((prev) => ({ ...prev, deletePassword: tEr("deleteConfirmationMatch") }));
      return;
    }

    const toastId = toast.loading(tToastDelete("loading"));
    try {
      setIsDeleting(true);
      setErrors((prev) => ({ ...prev, deletePassword: "", form: "" }));

      const payload: DeleteAccountPayload = {
        deleteMethod,
        value: deleteMethod === "password" ? deletePassword : confirmText,
      };

      await profileService.deleteAccount(payload);
      toast.success(toastId, tToastDelete("success"), 2000);
      localStorage.removeItem("userData");
      window.location.href = "/signup";
    } catch (error) {
      toast.error(toastId, tToastDelete("error"));
      console.error("Delete account error:", error);
      const errorMessage = deleteMethod === "password" ? tErr("deleteFailed") : tEr("deleteGeneralFailed");

      setErrors((prev) => ({ ...prev, deletePassword: errorMessage }));
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isSocialAuth, 
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
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deletePassword,
    setDeletePassword,
    deleteMethod, // 🌟 Return to Component
    setDeleteMethod, // 🌟 Return to Component
    confirmText, // 🌟 Return to Component
    setConfirmText, // 🌟 Return to Component
    isDeleting,
    handleDeleteAccount,
    showDeletePassword,
    setShowDeletePassword,
  };
}
