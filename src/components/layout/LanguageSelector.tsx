"use client";
import { useState, useEffect, useRef, useMemo, useTransition } from "react";
import { usePathname, useRouter, routing } from "@/lib/i18nNavigation";
import { useLocale, useTranslations, createTranslator } from "next-intl";
import { languages } from "@/data/Languages-CurrencyData";
import { createPortal } from "react-dom";
import jaSiteHeader from "@/languages/ja/SiteHeader";
import enSiteHeader from "@/languages/en/SiteHeader";
// Icons
import { ChevronDown, Search } from "lucide-react";
import { LanguagePromptToast } from "./LanguageSelector/LanguagePromptToast";
import { useUserLocation } from "@/hooks/useUserLocation";

const promptMessages: Record<string, unknown> = {
  ja: jaSiteHeader.Language,
  en: enSiteHeader.Language,
  // fr: frSiteHeader.Language,
  // de: deSiteHeader.Language,
};
export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations("SiteHeader.Language") as any;
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState<"switch" | "unsupported" | null>(null);
  const [detectedCountry, setDetectedCountry] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [targetLangObj, setTargetLangObj] = useState<any>(null);

  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const { data: locationData } = useUserLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Click Outside Logic for Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Scroll to selected item inside dropdown
  useEffect(() => {
    if (isOpen && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleHide = () => setShowPrompt(false);
    window.addEventListener("hideLanguagePrompt", handleHide);
    return () => window.removeEventListener("hideLanguagePrompt", handleHide);
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => {
        if (window.innerWidth < 1280) {
          const scrollContainer = document.querySelector("#animated-mobile-menu .overflow-y-auto");
          if (scrollContainer) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight + 500,
              behavior: "smooth",
            });
          }
        } else {
          // Desktop
          dropdownRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    };

    window.addEventListener("openLanguageDropdown", handleOpenEvent as EventListener);
    return () => window.removeEventListener("openLanguageDropdown", handleOpenEvent as EventListener);
  }, []);

  useEffect(() => {
    if (!locationData) return;

    const evaluateAndShowPrompt = () => {
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem("ikisaki_lang_prompt_seen");
        if (hasSeenPrompt) return;

        if (detectedCountry !== locationData.country_name) {
          setDetectedCountry(locationData.country_name);
        }

        const primaryLangCode = locationData.languages.split(",")[0].split("-")[0].toLowerCase();
        const matchedLang = languages.find((l) => l.code.toLowerCase() === primaryLangCode);

        if (matchedLang) {
          if (currentLocale.toLowerCase() !== matchedLang.code.toLowerCase()) {
            if (targetLangObj?.code !== matchedLang.code) setTargetLangObj(matchedLang);
            if (promptType !== "switch") setPromptType("switch");

            if (!showPrompt) {
              setShowPrompt(true);
              localStorage.setItem("ikisaki_lang_prompt_seen", "true");
            }
          } else {
            localStorage.setItem("ikisaki_lang_prompt_seen", "true");
          }
        } else {
          if (promptType !== "unsupported") setPromptType("unsupported");

          if (!showPrompt) {
            setShowPrompt(true);
            localStorage.setItem("ikisaki_lang_prompt_seen", "true");
          }
        }
      }, 1500);
    };

    const runLanguagePromptSequence = () => {
      const hasCookieConsent = document.cookie.includes("ikisaki_cookie_consent=");

      if (hasCookieConsent) {
        evaluateAndShowPrompt();
      } else {
        const onCookieConsentUpdated = () => {
          evaluateAndShowPrompt();
          window.removeEventListener("cookieConsentUpdated", onCookieConsentUpdated);
        };
        window.addEventListener("cookieConsentUpdated", onCookieConsentUpdated);
      }
    };

    if (typeof window !== "undefined") {
      const isPreloaderAlreadyDone =
        document.cookie.includes("preloader_seen=true") ||
        (window as Window & { __preloaderDone?: boolean }).__preloaderDone;

      if (isPreloaderAlreadyDone) {
        runLanguagePromptSequence();
      } else {
        window.addEventListener("preloaderFinished", runLanguagePromptSequence);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("preloaderFinished", runLanguagePromptSequence);
      }
    };
  }, [locationData, currentLocale, detectedCountry, promptType, showPrompt, targetLangObj]);

  // Prompt Actions
  const markLanguageDeclined = () => {
    localStorage.setItem("ikisaki_lang_declined", "true");
    window.dispatchEvent(new Event("languageDeclined"));
  };

  const switchLanguage = (newLocale: string) => {
    const isSupported = (routing.locales as readonly string[]).includes(newLocale);

    startTransition(() => {
      if (isSupported) {
        router.replace(pathname, { locale: newLocale });
      } else {
        router.push(`/${newLocale}`, { locale: currentLocale });
      }
    });
  };

  const handlePromptAccept = () => {
    window.dispatchEvent(new CustomEvent("hideLanguagePrompt"));
    localStorage.setItem("ikisaki_lang_prompt_seen", "true");

    if (promptType === "switch" && targetLangObj) {
      const newLocale = targetLangObj.code.toLowerCase();
      window.dispatchEvent(new CustomEvent("languageChanged", { detail: targetLangObj.currency }));
      switchLanguage(newLocale);
    }
  };

  const handlePromptDismiss = (openDropdown: boolean) => {
    window.dispatchEvent(new CustomEvent("hideLanguagePrompt"));
    localStorage.setItem("ikisaki_lang_prompt_seen", "true");
    markLanguageDeclined();
    if (openDropdown) {
      if (window.innerWidth < 1280) {
        const mobileMenuState = document.getElementById("mobile-menu-btn")?.getAttribute("aria-expanded");

        if (mobileMenuState === "false") {
          document.getElementById("mobile-menu-btn")?.click();

          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("openLanguageDropdown"));
          }, 850);
        } else {
          window.dispatchEvent(new CustomEvent("openLanguageDropdown"));
        }
      } else {
        window.dispatchEvent(new CustomEvent("openLanguageDropdown"));
      }
    }
  };

  const filteredLanguages = useMemo(() => {
    const q = search.toLowerCase();
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q),
    );
  }, [search]);

  const currentLang = languages.find((l) => l.code.toLowerCase() === currentLocale.toLowerCase()) || languages[0];

  const promptConfig = useMemo(() => {
    const code = targetLangObj?.code?.toLowerCase() as string | undefined;
    const langMessages = code ? promptMessages[code] : undefined;

    if (promptType !== "switch" || !code || !langMessages) {
      return { t, lang: currentLocale, country: detectedCountry };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const translator: any = createTranslator({
      locale: code,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: { SiteHeader: { Language: langMessages } } as any,
      namespace: "SiteHeader.Language",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    let country = detectedCountry;
    try {
      const code2 = locationData?.country_code;
      if (code2) {
        country = new Intl.DisplayNames([code], { type: "region" }).of(code2) ?? detectedCountry;
      }
    } catch {}

    return { t: translator, lang: code, country };
  }, [promptType, targetLangObj, t, currentLocale, detectedCountry, locationData]);
  return (
    <>
      <div className="relative flex items-center z-70" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          type="button"
          disabled={isPending}
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center gap-1.5 rounded-full border pl-3.5 pr-2.5 py-1.75 transition-all duration-300 focus:outline-none ${
            isOpen ? "bg-gold/10 border-gold/50" : "bg-white/5 border-white/10 hover:border-gold/30 hover:bg-gold/5"
          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span className="text-body-sm">{currentLang.flag}</span>
          <span className="text-body-sm font-bold text-white transition-colors group-hover:text-gold">
            {currentLang.code.toUpperCase()}
          </span>
          <span className="text-caption font-bold text-gold/90">({currentLang.nativeName})</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:text-gold ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
          />
          <span className="tooltip pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-md bg-[#0a0a0a] border border-gold/30 px-3 py-1.5 text-tiny font-bold uppercase tracking-wider text-gold opacity-0 transition-all duration-200 group-hover:opacity-100 shadow-2xl z-50 hidden md:block">
            {t("tooltip")}
          </span>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 top-full mt-3 w-80 origin-top-right overflow-hidden rounded-xl border border-gold/20 bg-lanka-black/95 backdrop-blur-2xl transition-all duration-300 ${
            isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="border-b border-white/10 bg-white/5 p-3">
            <p className="mb-2 text-caption font-bold uppercase tracking-widest text-slate-400">{t("select")}</p>
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#050505] py-2 pl-9 pr-3 text-body-sm text-white placeholder:text-slate-600 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = currentLocale.toLowerCase() === lang.code.toLowerCase();
                return (
                  <button
                    key={lang.code}
                    ref={isSelected ? selectedItemRef : null}
                    onClick={() => {
                      const newLocale = lang.code.toLowerCase();
                      setIsOpen(false);
                      setSearch("");
                      markLanguageDeclined();
                      window.dispatchEvent(new CustomEvent("languageChanged", { detail: lang.currency }));

                      if (newLocale !== currentLocale) {
                        switchLanguage(newLocale);
                      }
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gold/10 ${
                      isSelected ? "bg-white/5 border-l-2 border-gold" : "border-l-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span
                          className={`text-body-sm ${isSelected ? "font-bold text-gold" : "font-medium text-slate-200"}`}
                        >
                          {lang.name}
                        </span>
                        <span className="text-caption text-slate-500 font-semibold">{lang.nativeName}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-caption font-bold ${isSelected ? "text-gold" : "text-slate-400"}`}>
                        {lang.code.toUpperCase()}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-4 text-center text-body-sm text-slate-500">{t("noResults")}</div>
            )}
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <LanguagePromptToast
            showPrompt={showPrompt}
            promptType={promptType}
            detectedCountry={promptConfig.country}
            targetLangObj={targetLangObj}
            currentLangName={currentLang.name}
            t={promptConfig.t}
            lang={promptConfig.lang}
            onAccept={handlePromptAccept}
            onDismiss={handlePromptDismiss}
          />,
          document.body,
        )}
    </>
  );
}
