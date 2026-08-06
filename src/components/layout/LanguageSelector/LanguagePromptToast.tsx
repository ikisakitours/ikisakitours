"use client";

import React from "react";
import { X, Sparkles, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguagePromptToastProps {
  showPrompt: boolean;
  promptType: "switch" | "unsupported" | null;
  detectedCountry: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetLangObj: any;
  currentLangName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  onAccept: () => void;
  onDismiss: (openDropdown: boolean) => void;
}

export function LanguagePromptToast({
  showPrompt,
  promptType,
  detectedCountry,
  targetLangObj,
  currentLangName,
  t,
  onAccept,
  onDismiss,
}: LanguagePromptToastProps) {
  return (
    <AnimatePresence>
      {showPrompt && promptType && (
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-18 md:top-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-105 z-9999"
        >
          {/* Main Card Container */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a]/98 sm:bg-[#080808]/90 backdrop-blur-3xl border border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            {/* Elegant Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-2/3 bg-linear-to-r from-transparent via-gold to-transparent opacity-80" />

            {/* Very Soft Close Button */}
            <button
              onClick={() => onDismiss(false)}
              className="absolute top-4 right-4 group flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/30 z-10"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-red-400" />
            </button>

            <div className="px-6 py-6 sm:px-7">
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-3">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
                  <div className="relative h-11 w-11 rounded-full bg-linear-to-br from-[#1a1a1a] to-[#050505] border border-gold/30 flex items-center justify-center shadow-lg">
                    {promptType === "switch" ? (
                      <Sparkles className="h-4.5 w-4.5 text-gold" />
                    ) : (
                      <Globe className="h-4.5 w-4.5 text-gold" />
                    )}
                  </div>
                </div>
                <div className="pt-0.5 pr-6">
                  <h3 className="font-serif font-bold text-white text-[16px] sm:text-[17px] tracking-wide leading-tight">
                    {promptType === "switch" ? t("autoDetect.switchTitle") : t("autoDetect.unsupportedTitle")}
                  </h3>
                </div>
              </div>

              {/* Description - Sweet & Short */}
              <p className="text-[12.5px] sm:text-[13px] text-slate-300/90 leading-relaxed mb-6 font-light">
                {promptType === "switch"
                  ? t.rich("autoDetect.switchDesc", {
                      country: detectedCountry,
                      language: targetLangObj?.name,
                      b: (chunks: React.ReactNode) => <strong className="text-gold font-bold">{chunks}</strong>,
                    })
                  : t.rich("autoDetect.unsupportedDesc", {
                      country: detectedCountry,
                      b: (chunks: React.ReactNode) => <strong className="text-gold font-bold">{chunks}</strong>,
                    })}
              </p>

              {/* Action Buttons - Side by Side layout */}
              <div className="flex items-center gap-3">
                {promptType === "switch" ? (
                  <>
                    <button
                      onClick={() => onDismiss(false)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-[11px] uppercase tracking-widest transition-all duration-300"
                    >
                      {t("autoDetect.btnNo")}
                    </button>
                    <button
                      onClick={onAccept}
                      className="flex-1 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-lanka-black font-bold text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t("autoDetect.btnYes")}
                    </button>
                  </>
                ) : (
                  <>
                    {/* Unsupported: Keep English Button */}
                    <button
                      onClick={() => onDismiss(false)}
                      className="flex-1 py-2.5 px-2 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-semibold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 text-center"
                    >
                      {t("autoDetect.btnKeep", { lang: currentLangName })}
                    </button>
                    {/* Unsupported: Choose Language Button */}
                    <button
                      onClick={() => onDismiss(true)}
                      className="flex-1 py-2.5 px-2 rounded-xl bg-gold hover:bg-gold-light text-lanka-black font-bold text-[10px] sm:text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
                    >
                      {t("autoDetect.btnChoose")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
