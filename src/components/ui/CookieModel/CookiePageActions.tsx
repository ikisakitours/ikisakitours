"use client";
import { useSyncExternalStore } from "react";
import { getCookieConsentStatus } from "@/utils/cookiesHandle";
import { useTranslations } from "next-intl";
import { Sliders } from "lucide-react";

interface CookiePageActionsProps {
  onManageCookies: () => void;
  onAcceptAll: () => void;
}

const subscribe = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("cookieConsentUpdated", callback);
    return () => window.removeEventListener("cookieConsentUpdated", callback);
  }
  return () => {};
};

const getSnapshot = () => getCookieConsentStatus();

const getServerSnapshot = () => null;

export function CookiePageActions({ onManageCookies, onAcceptAll }: CookiePageActionsProps) {
  const t = useTranslations("cookie");

  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isAccepted = status === "accepted";
  const isDeclined = status === "declined";

  return (
    <div className="relative mt-8 pt-6 border-t border-white/10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Title & Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h4 className="premium-serif text-base sm:text-lg font-bold text-white">
            {t("pageActionTitle")} <span className="gold-gradient-text">{t("pageActionTitleHighlight")}</span>?
          </h4>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-nowrap items-center gap-2.5 sm:gap-3 shrink-0 ml-auto lg:ml-0">
          <button
            onClick={onManageCookies}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-gold/40 px-3.5 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-lanka-black! whitespace-nowrap"
          >
            <Sliders className="h-3.5 w-3.5 shrink-0" />
            <span> {t("manageCookiesBtn")} </span>
          </button>

          <button
            onClick={onAcceptAll}
            disabled={isAccepted || isDeclined}
            className={`rounded-xl px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              isAccepted
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed opacity-80"
                : isDeclined
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 cursor-not-allowed opacity-80"
                  : "bg-gold hover:bg-gold-light text-lanka-black! shadow-[0_0_15px_rgba(197,160,89,0.3)]"
            }`}
          >
            {isAccepted ? t("allAccepted") : isDeclined ? t("allRejected") : t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
