"use client";

import React, { useSyncExternalStore } from "react";
import { Compass, ArrowLeft, Home, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export interface NotFoundUIProps {
  title?: string;
  oopsText?: string;
  description?: string;
  backButtonText?: string;
  homeButtonText?: string;
  fallbackLocale?: string;
  badgeText?: string;
  code?: string;
  hideBackButton?: boolean;
  hideHomeButton?: boolean;
  languages?: { code: string; label: string }[];
}

const ease = [0.16, 1, 0.3, 1] as const;
const subscribe = () => () => {};

const getCanGoBack = () => document.referrer.length > 0 || window.history.length > 2;

const getServerCanGoBack = () => false;
export function NotFoundUI({
  title = "We couldn't find what you're looking for",
  description = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  backButtonText = "Go Back",
  homeButtonText = "Return Home",
  fallbackLocale = "en",
  badgeText = "Error 404 • Nothing Found",
  oopsText = "Oops...",
  code = "404",
  hideBackButton = false,
  hideHomeButton = false,
  languages,
}: NotFoundUIProps) {
  const router = useRouter();
  const canGoBack = useSyncExternalStore(subscribe, getCanGoBack, getServerCanGoBack);

  const hasLanguages = !!languages?.length;
  const showBackBtn = !hideBackButton && canGoBack;
  const showHomeBtn = !hideHomeButton && !hasLanguages;
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-lanka-dark px-5 py-16">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.10)_0%,transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/3 px-6 py-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-12 sm:py-14"
      >
        {/* Top gold accent line */}
        <div className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />

        {/* Big gradient code */}
        {code && (
          <div
            aria-hidden="true"
            className="select-none bg-linear-to-b from-gold via-gold/60 to-transparent bg-clip-text font-serif text-7xl font-bold leading-none text-transparent sm:text-8xl"
          >
            {code}
          </div>
        )}

        {/* Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-caption font-bold uppercase tracking-[0.2em] text-gold">
          <Compass className="h-3.5 w-3.5" strokeWidth={2} />
          <span>{badgeText}</span>
        </div>

        {/* Text */}
        <p className="mt-6 font-serif text-lg italic text-gold/90">{oopsText}</p>

        <h1 className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          {showBackBtn && (
            <button
              onClick={() => router.back()}
              className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-white/4 px-5 py-3.5 text-caption! font-bold uppercase tracking-[0.12em] text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              <span>{backButtonText}</span>
            </button>
          )}

          {showHomeBtn && (
            <button
              onClick={() => router.push(`/${fallbackLocale}`)}
              className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gold px-5 py-3.5 text-caption! font-black uppercase tracking-[0.12em] text-lanka-black shadow-[0_8px_30px_rgba(197,160,89,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_12px_36px_rgba(197,160,89,0.4)] active:scale-[0.97]"
            >
              <Home className="h-4 w-4 shrink-0" />
              <span>{homeButtonText}</span>
            </button>
          )}

          {languages?.map((lang) => (
            <button
              key={lang.code}
              onClick={() => router.push(`/${lang.code}`)}
              className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gold px-5 py-3.5 text-caption! font-black uppercase tracking-[0.12em] text-lanka-black shadow-[0_8px_30px_rgba(197,160,89,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_12px_36px_rgba(197,160,89,0.4)] active:scale-[0.97]"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
