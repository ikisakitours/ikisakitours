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

// --- Reusable Accordion Component ---
const CookieAccordionItem = ({
  title,
  description,
  badge,
  isRequired,
  isExpanded,
  isChecked,
  onToggleExpand,
  onToggleCheck,
}: {
  title: string;
  description: string;
  badge?: string;
  isRequired?: boolean;
  isExpanded: boolean;
  isChecked: boolean;
  onToggleExpand: () => void;
  onToggleCheck: (checked: boolean) => void;
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      {/* Header Section */}
      <div onClick={onToggleExpand} className="flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 text-slate-300 transition-transform duration-300">
            {isExpanded ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          </span>
          <span className="font-bold text-white text-body-sm">
            {title}
            {isRequired && <span className="ml-1 inline-block translate-y-0.5 text-base text-[#E5484D]">*</span>}
            {/* text-red-500 */}
          </span>
        </div>

        {/* Toggle Switch */}
        <div
          className={`flex items-center gap-3 ${isRequired ? "opacity-50" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <label
            className={`relative inline-flex items-center ${isRequired ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => !isRequired && onToggleCheck(e.target.checked)}
              readOnly={isRequired}
              disabled={isRequired}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
          </label>
        </div>
      </div>

      {/* Grid Animation Container */}
      <div
        className={`grid ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        style={{
          transition: "grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-4 sm:pt-5">
            <div
              className={`border-t border-white/5 pt-4 transform-gpu transition-opacity duration-300 ${
                isExpanded ? "opacity-100 ease-out" : "opacity-0 ease-in"
              }`}
              style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            >
              {isRequired && badge && (
                <div className="mb-2 flex justify-end">
                  <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-micro font-bold uppercase tracking-wider text-gold border border-gold/20">
                    {badge}
                  </span>
                </div>
              )}
              <p className="text-body-sm text-slate-400">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Modal Component ---
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

  // Cookie Categories Data Array
  const cookieCategories = [
    {
      id: "necessary",
      title: t("categories.necessary.title"),
      description: t("categories.necessary.description"),
      badge: t("categories.necessary.badge"),
      isRequired: true,
      isChecked: true, // Always true
    },
    {
      id: "performance",
      title: t("categories.performance.title"),
      description: t("categories.performance.description"),
      isRequired: false,
      isChecked: preferences.performance,
    },
    {
      id: "functional",
      title: t("categories.functional.title"),
      description: t("categories.functional.description"),
      isRequired: false,
      isChecked: preferences.functional,
    },
    {
      id: "targeting",
      title: t("categories.targeting.title"),
      description: t("categories.targeting.description"),
      isRequired: false,
      isChecked: preferences.targeting,
    },
  ];

  const updatePreference = (id: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-4xl bg-[#0a0a0a] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col">
        {/* Top Gold Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-linear-to-r from-transparent via-gold to-transparent opacity-90" />

        {/* Header Section */}
        <div className="relative border-b border-white/10 px-5 py-5 sm:px-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all hover:bg-red-500/20 hover:text-red-400"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Title Section */}
          <div className="flex items-center gap-3 sm:gap-4 pr-10 sm:pr-12">
            <div className="shrink-0 flex h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Sliders className="h-5 w-5" />
            </div>

            <h2 className="premium-serif text-heading-card font-bold text-white tracking-wide">
              {t("modalTitlePrefix")} <span className="gold-gradient-text">{t("modalTitleHighlight")}</span>
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-300 font-light leading-relaxed custom-scrollbar">
          <p className="text-body text-slate-300/90">{t("modalDescription")}</p>

          <div className="space-y-4">
            <h3 className="text-caption font-bold uppercase tracking-widest text-gold"> {t("manageConsentTitle")}</h3>

            {/* Mapped Accordion Components */}
            {cookieCategories.map((category) => (
              <CookieAccordionItem
                key={category.id}
                title={category.title}
                description={category.description}
                badge={category.badge}
                isRequired={category.isRequired}
                isExpanded={expandedSection === category.id}
                isChecked={category.isChecked}
                onToggleExpand={() => setExpandedSection(expandedSection === category.id ? null : category.id)}
                onToggleCheck={(checked) => updatePreference(category.id, checked)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-6 py-4 sm:px-8">
          <button
            onClick={handleRejectAll}
            // w-full on mobile, sm:w-auto on desktop
            className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            {t("rejectAll")}
          </button>

          <button
            onClick={handleSave}
            // w-full on mobile, sm:w-auto on desktop
            className="w-full sm:w-auto rounded-xl bg-gold px-7 py-3.5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-lanka-black transition-all hover:bg-gold-light shadow-[0_0_15px_rgba(197,160,89,0.3)]"
          >
            {t("confirmChoices")}
          </button>
        </div>
      </div>
    </div>
  );
}
