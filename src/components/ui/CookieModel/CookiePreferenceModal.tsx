"use client";
import { useState, useEffect } from "react";
import { saveCookiePreferences, declineAllCookies } from "@/utils/cookiesHandle";
import { useTranslations } from "next-intl";
//Icons
import { X, Plus, Minus, Sliders } from "lucide-react";
interface CookiePreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePreferenceModal({ isOpen, onClose }: CookiePreferenceModalProps) {
  const t = useTranslations("cookie");
  const [preferences, setPreferences] = useState({
    performance: true,
    functional: true,
    targeting: false,
  });

  const [expandedSection, setExpandedSection] = useState<string | null>("necessary");

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

  const handleSave = () => {
    saveCookiePreferences(preferences, "accepted");
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    onClose();
  };

  const handleRejectAll = () => {
    declineAllCookies();
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-4xl bg-[#0a0a0a] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col">
        {/* Top Gold Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-linear-to-r from-transparent via-gold to-transparent opacity-90" />

        {/* Header - Separate divs for Close button and Title */}
        <div className="relative border-b border-white/10 px-6 py-5 sm:px-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all hover:bg-red-500/20 hover:text-red-400 z-20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Title Section */}
          <div className="flex items-center gap-3 pr-12">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Sliders className="h-5 w-5" />
            </div>
            <h2 className="premium-serif text-lg sm:text-xl font-bold text-white tracking-wide">
               {t("modalTitlePrefix")} <span className="gold-gradient-text"> {t("modalTitleHighlight")}</span>
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-300 font-light leading-relaxed custom-scrollbar">
          <p className="text-xs sm:text-sm text-slate-300/90">
           {t("modalDescription")}
          </p>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold">  {t("manageConsentTitle")}</h3>

            {/* 1. Strictly Necessary Cookies */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div
                onClick={() => setExpandedSection(expandedSection === "necessary" ? null : "necessary")}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {expandedSection === "necessary" ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="font-bold text-white text-[13px] sm:text-[14px]">{t("categories.necessary.title")}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold">{t("categories.necessary.badge")}</span>
              </div>
              {expandedSection === "necessary" && (
                <p className="mt-3 text-xs sm:text-[13px] text-slate-400 border-t border-white/5 pt-3 ">
                 {t("categories.necessary.description")}
                </p>
              )}
            </div>

            {/* 2. Performance Cookies */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div
                onClick={() => setExpandedSection(expandedSection === "performance" ? null : "performance")}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {expandedSection === "performance" ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="font-bold text-white text-[13px] sm:text-[14px]">{t("categories.performance.title")}</span>
                </div>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.performance}
                      onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
              {expandedSection === "performance" && (
                <p className="mt-3 text-xs sm:text-[13px] text-slate-400 border-t border-white/5 pt-3">
                      {t("categories.performance.description")}
                </p>
              )}
            </div>

            {/* 3. Functional Cookies */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div
                onClick={() => setExpandedSection(expandedSection === "functional" ? null : "functional")}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {expandedSection === "functional" ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="font-bold text-white text-[13px] sm:text-[14px]">{t("categories.functional.title")}</span>
                </div>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
              {expandedSection === "functional" && (
                <p className="mt-3 text-xs sm:text-[13px] text-slate-400 border-t border-white/5 pt-3">
               {t("categories.functional.description")}
                </p>
              )}
            </div>

            {/* 4. Targeting / Marketing Cookies */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div
                onClick={() => setExpandedSection(expandedSection === "targeting" ? null : "targeting")}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {expandedSection === "targeting" ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="font-bold text-white text-[13px] sm:text-[14px]">{t("categories.targeting.title")}</span>
                </div>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.targeting}
                      onChange={(e) => setPreferences({ ...preferences, targeting: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              </div>
              {expandedSection === "targeting" && (
                <p className="mt-3 text-xs sm:text-[13px] text-slate-400 border-t border-white/5 pt-3">
                 {t("categories.targeting.description")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-6 py-4 sm:px-8">
          <button
            onClick={handleRejectAll}
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
          {t("rejectAll")}
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-gold px-7 py-2.5 text-xs font-bold uppercase tracking-widest text-lanka-black transition-all hover:bg-gold-light shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          >
           {t("confirmChoices")}
          </button>
        </div>
      </div>
    </div>
  );
}
