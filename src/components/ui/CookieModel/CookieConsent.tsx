"use client";
// import { useState } from "react";
import { Link } from "@/lib/i18nNavigation";
import { CookiePreferenceModal } from "./CookiePreferenceModal";
// import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/hooks/cookies/useCookieConsent";
import { useEffect, useMemo, useState } from "react";
import { createTranslator, useLocale, useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";
import jaCookie from "@/languages/ja/cookie";
//Icons
import { Cookie, X } from "lucide-react";
const cookieMessages: Record<string, unknown> = { ja: jaCookie };
export function CookieConsent() {
 const tLocal = useTranslations("cookie");
const currentLocale = useLocale();
const { data: locationData, isDetecting } = useUserLocation();
const [declined, setDeclined] = useState(false);

useEffect(() => {
  const sync = () => setDeclined(localStorage.getItem("ikisaki_lang_declined") === "true");
  const id = setTimeout(sync, 0);
  window.addEventListener("languageDeclined", sync);
  return () => {
    clearTimeout(id);
    window.removeEventListener("languageDeclined", sync);
  };
}, []);

const { t, lang } = useMemo(() => {
  const detected = locationData?.languages.split(",")[0].split("-")[0].toLowerCase();
  const messages = detected ? cookieMessages[detected] : undefined;

  if (declined || !detected || !messages || currentLocale.toLowerCase() !== "en" || detected === "en") {
    return { t: tLocal, lang: currentLocale };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translator: any = createTranslator({
    locale: detected,
    messages: { cookie: messages },
    namespace: "cookie",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  return { t: translator, lang: detected };
}, [locationData, declined, currentLocale, tLocal]);

  const {
    isVisible,
    isLegalPage,
    isHeaderMenuOpen,
    isPreferenceOpen,
    setIsPreferenceOpen,
    handleAccept,
    handleDecline,
  } = useCookieConsent();
  const [isPending, setIsPending] = useState(false);

  const handleAcceptClick = async () => {
    setIsPending(true);
    try {
      await handleAccept();
    } finally {
      setIsPending(false);
    }
  };

if (!isVisible || isLegalPage || isHeaderMenuOpen || isDetecting) return null;
  return (
    <>
      <div lang={lang} className="fixed bottom-4 left-4 right-4 z-9999 md:bottom-8 md:left-8 md:right-auto md:max-w-105 animate-fade-in-up">
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

          <div className="flex flex-col space-y-4 pr-4 ">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#1a1a1a] to-[#050505] border border-gold/30 shadow-lg">
                  <Cookie className="h-4.5 w-4.5 text-gold" />
                </div>
              </div>

              <h3 className="font-serif text-heading-card font-bold text-white tracking-wide leading-tight">
                {t("titlePrefix")} <span className="gold-gradient-text">{t("titleHighlight")}</span>
              </h3>
            </div>

            <p className="text-left text-body-sm text-slate-300/90 font-light leading-relaxed">{t("description")}</p>

            <p className="text-left text-body-sm  text-slate-400 font-light">
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
                className="text-caption! font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-gold"
              >
                {t("cookiePolicy")}
              </Link>
              <button
                onClick={handleAcceptClick}
                disabled={isPending}
                className={`rounded-xl px-6 py-2.5 text-caption! font-bold uppercase tracking-widest transition-all duration-300 ${
                  isPending
                    ? "bg-gold/60 text-lanka-black/60 cursor-wait opacity-80"
                    : "bg-gold hover:bg-gold-light text-lanka-black shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
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
