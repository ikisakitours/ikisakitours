"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Lock } from "lucide-react";
import { Link } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
    const t = useTranslations("ValidationErrors.AuthRequired");
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-card relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 z-10"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-red-400" />
        </button>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <Lock className="h-6 w-6 text-gold" />
        </div>

        <h3 className="mb-2 text-heading-card font-bold text-white">{t("title")}</h3>
        <p className="mb-8 text-body-sm text-slate-400">
         {t("description")}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full rounded-xl bg-gold px-4 py-3.5 text-caption font-bold uppercase tracking-widest text-lanka-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
          {t("loginBtn")}
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
