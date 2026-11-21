"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/auth/authService";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Copy, Check, X, RefreshCw } from "lucide-react";

interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TwoFactorSetupModal({ isOpen, onClose, onSuccess }: TwoFactorSetupModalProps) {
  const t = useTranslations("ProfilePage");
  const tToast = useTranslations("ValidationErrors.ToastMessages");
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secret, setSecret] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [totpCode, setTotpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const fetchSetupData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setTotpCode("");
    try {
      const data = await authService.generate2FA();
      const qr = data.qrCodeDataUrl || data.qrCode || data.qrCodeUrl || "";
      const sec = data.secret || "";
      setQrCodeDataUrl(qr);
      setSecret(sec);
    } catch (err: unknown) {
      console.error("Failed to generate 2FA:", err);
      setError(t("SecurityPanel.TwoFactorSetup.setupFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        fetchSetupData();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fetchSetupData]);

  // Lock background scrolling across all devices (mobile, tablet, desktop)
  useEffect(() => {
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

  const handleCopyKey = async () => {
    if (!secret) return;
    try {
      await navigator.clipboard.writeText(secret);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleVerifyAndEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpCode || totpCode.length < 6) {
      setError(t("SecurityPanel.TwoFactorSetup.invalidCode"));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const toastId = toast.loading(tToast("TwoFactor.activating"));
    try {
      await authService.enable2FA(totpCode);
      toast.success(toastId, tToast("TwoFactor.activated"), 3000);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      console.error("Failed to activate 2FA:", err);
      const errorObj = err as { message?: string };
      const errMsg = errorObj?.message || t("SecurityPanel.TwoFactorSetup.invalidCode");
      setError(errMsg);
      toast.error(toastId, errMsg, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative glass-card w-full max-w-sm sm:max-w-md my-auto rounded-3xl p-5 sm:p-6 border border-emerald-500/30 bg-[#0a0a0a] shadow-2xl space-y-4 animate-fade-in-up">
        {/* Top-Left Shield Icon */}
        <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/10">
          <ShieldCheck className="h-4 w-4" />
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
         <div className="text-center space-y-1.5 pt-12 sm:pt-12">
          <h3 className="text-heading-card font-bold text-white">{t("SecurityPanel.TwoFactorSetup.modalTitle")}</h3>
          <p className="text-body-sm text-slate-300 leading-relaxed ">
            {t("SecurityPanel.TwoFactorSetup.modalDesc")}
          </p>
        </div>

        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-2">
            <div className="w-7 h-7 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-tiny text-slate-400">{t("SecurityPanel.TwoFactorSetup.generatingCredentials")}</p>
          </div>
        ) : error && !qrCodeDataUrl ? (
          <div className="space-y-3 py-3 text-center">
            <div className="p-2.5 text-xs text-red-300 bg-red-950/40 border border-red-500/30 rounded-xl">{error}</div>
            <button
              type="button"
              onClick={fetchSetupData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gold text-tiny font-bold uppercase tracking-wider hover:bg-white/10 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{t("SecurityPanel.TwoFactorSetup.retryBtn")}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleVerifyAndEnable} className="space-y-3.5">
            {/* QR Code Container */}
            {qrCodeDataUrl && (
              <div className="flex justify-center">
                <div className="rounded-xl bg-white p-2 shadow-lg shadow-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrCodeDataUrl}
                    alt={t("SecurityPanel.TwoFactorSetup.qrAlt")}
                    className="h-32 w-32 sm:h-36 sm:w-36 object-contain mx-auto"
                  />
                </div>
              </div>
            )}

            {/* Secret key - Centered & Auto-Width */}
            {secret && (
              <div className="flex flex-col items-center gap-1">
                <span className="block text-body-sm text-slate-400">
                  {t("SecurityPanel.TwoFactorSetup.copyKeyLabel")}
                </span>
                <div className="flex justify-center w-full">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono max-w-full">
                    <span className="truncate text-white select-all tracking-wider font-semibold">{secret}</span>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="inline-flex items-center gap-1 text-gold hover:text-gold-light transition-colors text-tiny font-bold uppercase tracking-wider shrink-0 cursor-pointer ml-1"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>
                        {isCopied
                          ? t("SecurityPanel.TwoFactorSetup.copiedKeyBtn")
                          : t("SecurityPanel.TwoFactorSetup.copyKeyBtn")}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 6-Digit App Code Input */}
            <div className="space-y-1.5 text-center pt-1 border-t border-white/10">
              <label
                htmlFor="totp-setup-code"
                className="mt-2 block text-tiny font-bold uppercase tracking-[0.2em] text-gold"
              >
                {t("SecurityPanel.TwoFactorSetup.verifyStep")}
              </label>

              <input
                id="totp-setup-code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                value={totpCode}
                disabled={isSubmitting}
                onChange={(e) => {
                  setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  if (error) setError(null);
                }}
                placeholder={t("SecurityPanel.TwoFactorSetup.verifyPlaceholder")}
                className="w-44 sm:w-48 mx-auto block text-center tracking-[0.35em] font-mono font-bold py-2 px-3 rounded-xl bg-white/5 border border-white/20 text-white text-lg outline-none focus:bg-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600"
              />

              {error && <p className="text-tiny text-red-400 pt-0.5">{error}</p>}
            </div>

            {/* Actions: ONLY Submit button (Cancel button removed) */}
            <div className="pt-1.5">
              <Button
                type="submit"
                disabled={isSubmitting || totpCode.length < 6}
                className="w-full text-caption! font-bold! uppercase! tracking-widest! py-3! disabled:opacity-50"
                variant="auth"
              >
                {isSubmitting
                  ? t("SecurityPanel.TwoFactorSetup.activatingBtn")
                  : t("SecurityPanel.TwoFactorSetup.confirmBtn")}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
