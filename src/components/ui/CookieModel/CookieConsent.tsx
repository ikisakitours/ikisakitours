"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18nNavigation";
import { CookiePreferenceModal } from "./CookiePreferenceModal";
import { saveCookiePreferences, declineAllCookies } from "@/utils/cookiesHandle";
import { useTranslations } from "next-intl";
//Icons
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isLegalPage = pathname.includes("/legal/cookie");
  const [isPreferenceOpen, setIsPreferenceOpen] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  useEffect(() => {
    const hasConsent = document.cookie.split("; ").find((row) => row.startsWith("mapmate_cookie_consent="));

    if (hasConsent) return;

    const showCookieModal = () => {
      setTimeout(() => setIsVisible(true), 1500);
    };

    if (typeof window !== "undefined") {
      const isPreloaderAlreadyDone =
        document.cookie.includes("preloader_seen=true") ||
        (window as Window & { __preloaderDone?: boolean }).__preloaderDone;

      if (isPreloaderAlreadyDone) {
        showCookieModal();
      } else {
        window.addEventListener("preloaderFinished", showCookieModal);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("preloaderFinished", showCookieModal);
      }
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMenuState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;

      if (customEvent.detail.isOpen) {
        clearTimeout(timeoutId);
        setIsHeaderMenuOpen(true);
      } else {
        timeoutId = setTimeout(() => {
          setIsHeaderMenuOpen(false);
        }, 800);
      }
    };
    window.addEventListener("mobileMenuStateChange", handleMenuState);

    const handleCookieUpdate = () => {
      setIsVisible(false);
    };
    window.addEventListener("cookieConsentUpdated", handleCookieUpdate);

    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuState);
      window.removeEventListener("cookieConsentUpdated", handleCookieUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAccept = () => {
    saveCookiePreferences({ performance: true, functional: true, targeting: true }, "accepted");
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  const handleDecline = () => {
    declineAllCookies();
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  if (!isVisible || isLegalPage || isHeaderMenuOpen) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-9999 md:bottom-8 md:left-8 md:right-auto md:max-w-105 animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a]/98 sm:bg-[#080808]/98 backdrop-blur-3xl border border-white/15 p-6 sm:px-7 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-2/3 bg-linear-to-r from-transparent via-gold to-transparent opacity-80" />

          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />

          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 z-10"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-red-400" />
          </button>

          <div className="flex flex-col space-y-4 pr-4">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a1a1a] to-[#050505] border border-gold/30 shadow-lg">
                  <Cookie className="h-4.5 w-4.5 text-gold" />
                </div>
              </div>

              <h3 className="font-serif text-[16px] sm:text-[17px] font-bold text-white tracking-wide leading-tight">
                {t("titlePrefix")} <span className="gold-gradient-text">{t("titleHighlight")}</span>
              </h3>
            </div>

            <p className="text-left text-[12.5px] sm:text-[13px] text-slate-300/90 font-light leading-relaxed">
              {t("description")}
            </p>

            <p className="text-left text-[12.5px] sm:text-[13px] text-slate-400 font-light">
              {t("wantToCustomize")}&nbsp;
              <button
                onClick={() => setIsPreferenceOpen(true)}
                className="font-bold text-gold underline hover:text-gold-light transition-colors"
              >
                {t("managePreferences")}
              </button>
            </p>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/legal/cookie"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-gold md:text-xs"
              >
                {t("cookiePolicy")}
              </Link>
              <button
                onClick={handleAccept}
                className="rounded-xl bg-gold hover:bg-gold-light text-lanka-black font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] px-6 py-2.5"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CookiePreferenceModal isOpen={isPreferenceOpen} onClose={() => setIsPreferenceOpen(false)} />
    </>
  );
}
