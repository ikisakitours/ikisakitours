"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/auth/authService";
import { LoadingImage } from "@/components/ui/LoadingImage";
//Icons
import { ShieldAlert, Mail, LogOut, Copy, Check } from "lucide-react";

const SUPPORT_EMAIL = "info@ikisakitours.com";

const BARCODE = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2];

export function AccessRestricted() {
  const t = useTranslations("Common.AccessRestricted");
  const tToast = useTranslations("ValidationErrors.ToastMessages.Logout");
  const { user, logoutUser } = useAuth();
  const toast = useToast();

  const [copied, setCopied] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const fullName = user ? `${user.firstname || ""} ${user.lastname || ""}`.trim() : "";
  const initials = user ? `${user.firstname?.charAt(0) || ""}${user.lastname?.charAt(0) || ""}`.toUpperCase() : "";
  const userId = user?.id ? String(user.id) : "";

  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t("mailSubject"))}&body=${encodeURIComponent(
    `${t("mailBody")}\n\n${t("accountHolder")}: ${fullName}\n${t("emailLabel")}: ${user?.email || ""}\n${t("referenceLabel")}: ${userId}\n`,
  )}`;

  const handleCopy = async () => {
    if (!userId) return;
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    const toastId = toast.loading(tToast("loading"));

    try {
      await Promise.all([authService.logout(), new Promise((resolve) => setTimeout(resolve, 800))]);

      logoutUser();
      toast.success(toastId, tToast("success"), 2000);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2200);
    } catch (error) {
      toast.error(toastId, tToast("error"));
      console.error("Logout error:", error);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="no-scrollbar fixed inset-0 z-200 overflow-y-auto bg-lanka-dark">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[2.5rem_2.5rem]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/8 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/6 blur-[130px]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-12 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
        {/* ============ Left: message ============ */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-8 text-2xl font-bold uppercase tracking-widest text-white">
            Iki<span className="gold-gradient-text">Saki</span> <span className="text-white">Tours</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
            <span className="text-caption font-bold uppercase tracking-[0.25em] text-gold">{t("badge")}</span>
          </div>

          <h1 className="premium-serif mb-5 text-heading-section font-light leading-[1.1] text-white">
            {t("titlePart1")} <span className="italic text-gold">{t("titleAccent")}</span>
          </h1>

          <div className="mx-auto mb-6 h-px w-16 bg-linear-to-r from-gold/70 to-transparent lg:mx-0" />

          <p className="mx-auto max-w-lg text-body font-light leading-relaxed text-slate-400 lg:mx-0">
            {t("description")}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-body-sm leading-relaxed text-slate-500 lg:mx-0">{t("reasonNote")}</p>
        </div>

        {/* ============ Right: ticket ============ */}
        <div className="w-full max-w-md shrink-0 self-center lg:w-105">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c]/90 shadow-2xl backdrop-blur-xl">
            {/* top gold line */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />

            {/* Header strip */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <span className="text-tiny font-bold uppercase tracking-[0.3em] text-slate-500">{t("ticketTitle")}</span>
              <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-tiny font-bold uppercase tracking-widest text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                {t("statusLabel")}
              </span>
            </div>

            {/* Account */}
            <div className="px-6 pb-4 pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <span className="text-sm font-bold text-gold">{initials}</span>
                  {user?.avatarUrl && (
                    <LoadingImage
                      src={user.avatarUrl}
                      alt={fullName}
                      fill
                      sizes="56px"
                      className="image-render-visible z-10 object-cover grayscale"
                      wrapperClassName="!absolute inset-0 z-10 w-full h-full"
                      isSmall={true}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-tiny font-bold uppercase tracking-[0.25em] text-slate-500">{t("accountHolder")}</p>
                  <p className="mt-1 truncate text-body font-bold capitalize text-white">{fullName}</p>
                  <p className="truncate text-caption tracking-wider text-slate-400">{user?.email}</p>
                </div>
              </div>

              {/* Sign out (bottom right) */}
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="group flex items-center gap-1.5 text-tiny font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  {t("signOut")}
                </button>
              </div>
            </div>

            {/* Perforation */}
            <div className="relative">
              <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-lanka-dark" />
              <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-lanka-dark" />
              <div className="mx-6 border-t border-dashed border-white/15" />
            </div>

            {/* Reference stub */}
            <div className="px-6 pb-6 pt-6">
              {userId && (
                <>
                  <p className="mb-2 text-tiny font-bold uppercase tracking-[0.25em] text-slate-500">
                    {t("referenceLabel")}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-gold/40"
                  >
                    <span className="truncate font-mono text-caption tracking-wider text-slate-300">{userId}</span>
                    <span className="flex shrink-0 items-center gap-1.5 text-tiny font-bold uppercase tracking-widest text-gold">
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? t("copied") : t("copy")}
                    </span>
                  </button>
                  <p className="mt-2 text-tiny leading-relaxed text-slate-500">{t("referenceHint")}</p>
                </>
              )}

              {/* decorative barcode */}
              <div className="mt-5 flex h-8 items-stretch justify-between gap-0.5 opacity-30" aria-hidden="true">
                {BARCODE.map((w, i) => (
                  <span key={i} className="bg-white" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-white/5 bg-white/2 px-6 py-5">
              <a
                href={mailtoHref}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-gold-dark via-gold to-gold-light px-6 py-3.5 text-caption font-black uppercase tracking-[0.25em] text-lanka-black shadow-[0_10px_30px_-10px_rgba(197,160,89,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <Mail className="relative h-4 w-4" />
                <span className="relative">{t("contactSupport")}</span>
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-tiny font-medium uppercase tracking-[0.25em] text-slate-600">
            {t("footerNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
