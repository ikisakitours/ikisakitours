"use client";

import React from "react";
import { Compass, ArrowLeft, Home, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export interface NotFoundUIProps {
  title?: string;
  oopsText?:string;
  description?: string;
  backButtonText?: string;
  homeButtonText?: string;
  fallbackLocale?: string;
  badgeText?: string;
  hideBackButton?: boolean;
  hideHomeButton?: boolean;
}

export function NotFoundUI({
  title = "We couldn't find what you're looking for",
  description = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  backButtonText = "Go Back",
  homeButtonText = "Return Home",
  fallbackLocale = "en",
  badgeText = "Error 404 • Nothing Found",
  oopsText ="Oops...",
  hideBackButton = false,
  hideHomeButton = false,
}: NotFoundUIProps) {
  const router = useRouter();

  const canGoBack = (() => {
    if (typeof window === "undefined") return false;
    const hasReferrer = document.referrer.length > 0;
    const hasLongHistory = window.history.length > 2;
    return hasReferrer || hasLongHistory;
  })();

  const showBackBtn = !hideBackButton && canGoBack;
  const showHomeBtn = !hideHomeButton;

  return (
    <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center px-6 overflow-hidden bg-lanka-dark py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-100 sm:h-162.5 sm:w-162.5 rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center z-10">
        {/* Top Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-caption font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_30px_rgba(197,160,89,0.2)] backdrop-blur-md"
        >
          <Search className="h-4 w-4 animate-pulse" />
          <span>{badgeText}</span>
        </motion.div>

        {/* Unique Floating Radar / Compass Icon Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-linear-to-b from-white/8 to-transparent border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group"
        >
          {/* Outer Rotating Radar Ring */}
          <div className="absolute -inset-2 rounded-[3rem] border border-dashed border-gold/20 animate-[spin_25s_linear_infinite]" />

          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gold/10 filter blur-2xl animate-pulse" />

          {/* Core Compass */}
          <Compass
            className="relative h-16 w-16 text-gold transition-transform duration-700 group-hover:rotate-90"
            strokeWidth={1.2}
          />

          {/* Floating Map Pin */}
          <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0c0c0c] border border-gold/50 shadow-2xl">
            <MapPin className="h-5 w-5 text-gold animate-bounce" />
          </div>
        </motion.div>

        {/* Typography with Smooth Stagger */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 flex items-center justify-center gap-2 text-gold font-serif text-4xl sm:text-6xl tracking-wide"
        >
          <span> 🔍</span>
          <span>{oopsText}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-6 font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-12 text-base font-light leading-relaxed text-slate-400 max-w-lg"
        >
          {description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex w-full flex-col sm:flex-row items-center justify-center gap-4 max-w-lg"
        >
          {showBackBtn && (
            <button
              onClick={() => router.back()}
              className={`group flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/3 px-6 py-4 text-caption! font-bold uppercase tracking-[0.15em] text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95 backdrop-blur-md shadow-lg whitespace-nowrap ${
                showHomeBtn ? "w-full sm:w-1/2" : "w-full sm:w-auto sm:px-12"
              }`}
            >
              <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>{backButtonText}</span>
            </button>
          )}

          {showHomeBtn && (
            <button
              onClick={() => router.push(`/${fallbackLocale}`)}
              className={`group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gold px-6 py-4 text-caption! font-black uppercase tracking-[0.15em] text-lanka-black shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_45px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-95 whitespace-nowrap ${
                showBackBtn ? "w-full sm:w-1/2" : "w-full sm:w-auto sm:px-12"
              }`}
            >
              <Home className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{homeButtonText}</span>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
