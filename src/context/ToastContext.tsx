"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

export type ToastType = "loading" | "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  loading: (message: string) => string;
  success: (id: string, message: string, duration?: number) => void;
  error: (id: string, message: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 1. Loading
  const loading = useCallback((message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type: "loading" }]);
    return id;
  }, []);

  //  2. dismiss
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  //  2. success
  const success = useCallback(
    (id: string, message: string, duration = 3000) => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, message, type: "success" } : t)));
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  // 4. error
  const error = useCallback(
    (id: string, message: string, duration = 4000) => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, message, type: "error" } : t)));
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ loading, success, error, dismiss }}>
      {children}

      {/* Toast Container - Responsive Position */}
      <div className="fixed z-9999 flex flex-col gap-3 pointer-events-none top-4 left-1/2 -translate-x-1/2 md:top-6 md:left-auto md:right-6 md:translate-x-0 items-center md:items-end w-full md:w-auto px-4 md:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)", transition: { duration: 0.2 } }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`pointer-events-auto relative overflow-hidden flex items-center gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl transition-colors duration-500 w-max max-w-full
                ${
                  toast.type === "loading"
                    ? "border-gold/40 bg-[#0a0a0a]/95 text-gold shadow-[0_10px_40px_rgba(197,160,89,0.15)]"
                    : toast.type === "success"
                      ? "border-emerald-500/40 bg-[#0a0a0a]/95 text-emerald-400 shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
                      : "border-red-500/40 bg-[#0a0a0a]/95 text-red-400 shadow-[0_10px_40px_rgba(239,68,68,0.15)]"
                }
              `}
            >
              {/* Background Glow Effect */}
              {toast.type === "loading" && <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full" />}
              {toast.type === "success" && <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-full" />}
              {toast.type === "error" && <div className="absolute inset-0 bg-red-500/5 blur-xl rounded-full" />}

              {/* Dynamic Icons with Animation */}
              <div className="relative z-10 flex items-center justify-center shrink-0">
                {toast.type === "loading" && <Loader2 className="h-5 w-5 animate-spin text-gold" />}
                {toast.type === "success" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                )}
                {toast.type === "error" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </motion.div>
                )}
              </div>

              {/* Message */}
              <div className="relative z-10 flex-1 flex items-center gap-1 text-body-sm font-medium">
                {toast.message}
                {/* Animated Dots for Loading State */}
                {toast.type === "loading" && (
                  <span className="-mt-1 flex gap-0.5 ml-1 shrink-0 text-lg font-bold">
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    >
                      .
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    >
                      .
                    </motion.span>
                  </span>
                )}
              </div>

              {/* Close Button (Only for success/error) */}
              {toast.type !== "loading" && (
                <button
                  onClick={() => dismiss(toast.id)}
                  aria-label="Close"
                  className="relative z-10 flex items-center justify-center p-1 rounded-full bg-white/5 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200 shrink-0 border border-transparent hover:border-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
