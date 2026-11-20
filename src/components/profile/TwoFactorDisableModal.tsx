"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth/authService";
import { ShieldAlert, X } from "lucide-react";

interface TwoFactorDisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isSocialAuth?: boolean;
}

const inputClass =
  "disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-body-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-red-500/50";

export function TwoFactorDisableModal({
  isOpen,
  onClose,
  onSuccess,
  isSocialAuth,
}: TwoFactorDisableModalProps) {
  const t = useTranslations("ProfilePage");
  const tToast = useTranslations("ValidationErrors.ToastMessages");
  const toast = useToast();
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock background scrolling across all devices (mobile, tablet, desktop)
  React.useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDisable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSocialAuth && !currentPassword && !totpCode) {
      setError(t("SecurityPanel.TwoFactorDisable.confirmPrompt"));
      return;
    }
    if (isSocialAuth && (!totpCode || totpCode.length < 6)) {
      setError(t("SecurityPanel.TwoFactorSetup.invalidCode"));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const toastId = toast.loading(tToast("TwoFactor.disabling"));
    try {
      await authService.disable2FA({
        ...(currentPassword ? { currentPassword } : {}),
        ...(totpCode ? { totpCode } : {}),
      });
      toast.success(toastId, tToast("TwoFactor.disabled"), 3000);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error("Failed to disable 2FA:", err);
      const errorObj = err as { message?: string };
      const errMsg = errorObj?.message || t("SecurityPanel.TwoFactorDisable.disableFailed");
      setError(errMsg);
      toast.error(toastId, errMsg, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative glass-card w-full max-w-sm sm:max-w-md my-auto rounded-3xl p-5 sm:p-6 border border-red-500/30 bg-[#0a0a0a] shadow-2xl space-y-4 animate-fade-in-up">
        {/* Top-Left Shield Alert Icon */}
        <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400 shadow-md shadow-red-500/10">
          <ShieldAlert className="h-4 w-4" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close"
          disabled={isSubmitting}
          onClick={onClose}
          className="absolute top-4 right-4 group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 z-10 cursor-pointer"
        >
          <X className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-red-400" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-1">
          <h3 className="text-body font-bold text-white">
            {t("SecurityPanel.TwoFactorDisable.modalTitle")}
          </h3>
          <p className="text-tiny text-slate-300 leading-normal max-w-xs mx-auto">
            {t("SecurityPanel.TwoFactorDisable.modalDesc")}
          </p>
        </div>

        <form onSubmit={handleDisable} className="space-y-3.5">
          {/* Hidden username field for accessibility and password manager compliance */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={user?.email || ""}
            readOnly
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
          {!isSocialAuth && (
            <label className="block space-y-1.5">
              <span className="block text-tiny font-bold uppercase tracking-[0.2em] text-gold">
                {t("SecurityPanel.TwoFactorDisable.passwordLabel")}
              </span>
              <input
                type="password"
                value={currentPassword}
                disabled={isSubmitting}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder={t("SecurityPanel.TwoFactorDisable.passwordPlaceholder")}
                className={inputClass}
                autoComplete="current-password"
              />
            </label>
          )}

          <label className="block space-y-1.5">
            <span className="block text-tiny font-bold uppercase tracking-[0.2em] text-gold text-center">
              {t("SecurityPanel.TwoFactorDisable.codeLabel")}
            </span>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={totpCode}
              disabled={isSubmitting}
              onChange={(e) => {
                setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                if (error) setError(null);
              }}
              placeholder={t("SecurityPanel.TwoFactorDisable.codePlaceholder")}
              className="w-44 sm:w-48 mx-auto block text-center tracking-[0.35em] font-mono font-bold py-2 px-3 rounded-xl bg-white/[0.05] border border-white/20 text-white text-lg outline-none focus:bg-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all placeholder:text-slate-600"
            />
          </label>

          {error && (
            <div className="p-2.5 text-xs text-red-300 bg-red-950/40 border border-red-500/30 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Actions: ONLY Confirm Button (Cancel removed) */}
          <div className="pt-1.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl border border-red-500/40 bg-red-500/20 text-red-300 text-caption font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 disabled:opacity-50 cursor-pointer text-center"
            >
              {isSubmitting
                ? t("SecurityPanel.TwoFactorDisable.disablingBtn")
                : t("SecurityPanel.TwoFactorDisable.disableBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
