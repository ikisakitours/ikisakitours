"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { ConfettiRain } from "./promoModal/ConfettiRain";
import { PromoGraphic } from "./promoModal/PromoGraphic";

export interface PromoModalProps {
  storageKey?: string;
  delayMs?: number;
  expiryMinutes?: number;
  discountAmount?: string;
  discountType?: string;
}

export function PromoModal({
  storageKey = "mapmate_promo_data",

  // 1 Second = 1000ms
  //5 minutes *  60 seconds = 300 seconds
  //convert minutes  to milliseconds: 300 * 1000 = 300000 milliseconds
  delayMs = 150000, // 600000 milliseconds = 10 minutes
  expiryMinutes = 60, // 60 minutes
  discountAmount = "$25",
  discountType = "OFF",
}: PromoModalProps) {
  const t = useTranslations("PromoModal");
  const [isOpen, setIsOpen] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  const setCookie = (name: string, value: string, minutes: number) => {
    const maxAge = minutes * 60;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  };

  useEffect(() => {
    const hasSeenPromo = getCookie(storageKey);
    if (hasSeenPromo) return;

    const setupExitIntent = () => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsOpen(true);
          document.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    };

    const setupTimer = () => {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delayMs);
      return () => clearTimeout(timer);
    };

    const cleanupExit = setupExitIntent();
    const cleanupTimer = setupTimer();

    return () => {
      cleanupExit();
      cleanupTimer();
    };
  }, [storageKey, delayMs]);

  const handleClose = () => {
    setIsOpen(false);
    setCookie(storageKey, "true", expiryMinutes);
  };

  const generateUniqueCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `MAPMATE-${code}`;
  };

  const handleClaim = async () => {
    setIsClaiming(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newCode = generateUniqueCode();
    setGeneratedCode(newCode);

    setIsClaiming(false);
    setIsClaimed(true);
    setCookie(storageKey, "true", expiryMinutes);
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = generatedCode;

      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Copy failed", error);
      }

      document.body.removeChild(textArea);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6">
          {isClaimed && <ConfettiRain />}

          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, rotateX: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
            className="relative w-full max-w-3xl bg-surface border border-gold/30 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/80 hover:bg-gold text-slate-300 hover:text-lanka-black border-2 border-gold/40 hover:border-gold shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.7)] transition-all duration-300 group backdrop-blur-xl"
              aria-label="Close promotion"
            >
              <X className="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* 🌟 2. Left Side Graphic Component */}
            <PromoGraphic discountAmount={discountAmount} discountType={discountType} t={t} />

            {/* 🌟 3. Right Side: Text & Dynamic CTA */}
            <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-[#0d0d0d] relative overflow-hidden">
              <AnimatePresence mode="popLayout">
                {!isClaimed ? (
                  <motion.div
                    key="offer-view"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      filter: "blur(6px)",
                      transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
                    }}
                    className="flex flex-col relative z-10 w-full"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
                      <Sparkles className="h-3 w-3" />
                      {t("specialOffer")}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
                      {t("title")}
                    </h2>
                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">{t("description")}</p>

                    <button
                      onClick={handleClaim}
                      disabled={isClaiming}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold-light text-lanka-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                    >
                      {isClaiming ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("generating")}
                        </>
                      ) : (
                        t("activateButton")
                      )}
                    </button>

                    <div className="mt-4 text-center sm:text-left">
                      <button
                        onClick={handleClose}
                        disabled={isClaiming}
                        className="text-xs text-slate-500 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {t("cancelButton")}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    className="flex flex-col items-center sm:items-start relative w-full h-full justify-center"
                  >
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                        <Check className="h-6 w-6 text-green-400" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                        {t("successTitle")}
                      </h2>
                    </div>

                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 text-center sm:text-left relative z-10">
                      {t("successDesc")}
                    </p>

                    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 backdrop-blur-sm">
                      <span className="font-mono text-xl tracking-wider text-gold font-bold">{generatedCode}</span>

                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                          isCopied
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                            : "bg-lanka-black border border-white/20 text-white hover:border-gold hover:text-gold shadow-lg"
                        }`}
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {isCopied ? t("copied") : t("copyCode")}
                      </button>
                    </div>

                    <div className="mt-8 relative z-10 w-full text-center sm:text-left">
                      <button
                        onClick={handleClose}
                        className="text-xs text-gold hover:text-gold-light underline decoration-gold/30 underline-offset-4 transition-colors"
                      >
                        {t("continueBrowsing")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
