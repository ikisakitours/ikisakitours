"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
//Icons
import { Camera, Image as ImageIcon, X, AlertTriangle } from "lucide-react";

type ImageSourceModalProps = {
  isOpen: boolean;
  cameraError: string | null;
  onClose: () => void;
  onTriggerInput: (inputId: string) => void;
};

export function ImageSourceModal({ isOpen, cameraError, onClose, onTriggerInput }: ImageSourceModalProps) {
  const t = useTranslations("ProfilePage");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-110 flex items-end justify-center p-4 pb-6 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-sm md:max-w-md overflow-hidden rounded-4xl border border-gold/20 bg-[#0c0c0c]/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] sm:rounded-3xl"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-[60px]" />
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20 sm:hidden" />

            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-body-sm font-extrabold uppercase tracking-[0.25em] text-gold"
              >
                {t("Modals.Source.title")}
              </motion.h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-slate-400 transition-all hover:bg-gold hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {cameraError && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative mb-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-red-500/30 bg-linear-to-r from-red-500/15 via-red-500/5 to-transparent px-4 py-3 shadow-[0_0_25px_rgba(239,68,68,0.15)] backdrop-blur-xl"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-red-500/40 bg-linear-to-br from-red-500/30 via-red-600/10 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md">
                  <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping opacity-40 pointer-events-none" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-caption font-black uppercase tracking-[0.2em] text-red-400/90">
                    {t("Modals.Source.errorTitle")}
                  </span>
                  <p className="text-caption font-medium leading-tight text-red-200/90">{cameraError}</p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="w-full md:w-1/2"
              >
                <button
                  type="button"
                  onClick={() => onTriggerInput("camera-input")}
                  className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-gold/30 bg-linear-to-r from-white/[0.07] to-white/2 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:shadow-[0_10px_25px_rgba(197,160,89,0.25)] active:scale-95"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-gold">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-caption font-extrabold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-black">
                      {t("Modals.Source.btnTakePhoto")}
                    </span>
                    <span className="text-tiny text-slate-400 transition-colors duration-300 group-hover:text-black/70">
                      {t("Modals.Source.btnTakePhotoSub")}
                    </span>
                  </div>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full md:w-1/2"
              >
                <button
                  type="button"
                  onClick={() => onTriggerInput("gallery-input")}
                  className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-gold/30 bg-linear-to-r from-white/[0.07] to-white/2 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:shadow-[0_10px_25px_rgba(197,160,89,0.25)] active:scale-95"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold transition-all duration-300 group-hover:bg-black group-hover:border-black group-hover:text-gold">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-caption font-extrabold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-black">
                      {t("Modals.Source.btnGallery")}
                    </span>
                    <span className="text-tiny text-slate-400 transition-colors duration-300 group-hover:text-black/70">
                      {t("Modals.Source.btnGallerySub")}
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
