"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUp, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
};

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const suggestions = [
  { label: "Plan a safari", hint: "Yala, Wilpattu & Udawalawe" },
  { label: "Best time to visit", hint: "Season guide by region" },
  { label: "Custom itinerary", hint: "Built around your dates" },
];

export function BotChatInterface() {
  const t = useTranslations("ChatWidget.BotChat");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: t("initialGreeting"),
      time: getTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close the panel on outside click / tap or Escape
  useEffect(() => {
    if (!showSuggestions) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [showSuggestions]);

  const handleSuggestionClick = (label: string) => {
    setShowSuggestions(false);
    handleSend(label);
  };
  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  // Clear pending reply timer on unmount
  useEffect(() => {
    return () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    };
  }, []);

  const handleSend = useCallback(
    (textToSend?: string) => {
      const text = (textToSend ?? inputValue).trim();
      if (!text || isTyping) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text,
        time: getTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
      if (!textToSend) setInputValue("");

      // Simulated bot reply
      setIsTyping(true);
      replyTimerRef.current = setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: t("simulatedReply"),
          time: getTime(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 1400);
    },
    [inputValue, isTyping, t],
  );

  return (
    <div className="relative flex h-[clamp(250px,calc(55vh-2.5rem),410px)] flex-col justify-between">
      {/* 1. Conversation area */}
      <div className="no-scrollbar relative flex-1 space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-1 pb-3 pt-1">
        {/* Slim guide badge */}
        <div className="flex justify-center py-0.5">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-linear-to-r from-gold/10 via-white/3 to-gold/10 py-1 pl-1 pr-3.5 shadow-[0_0_18px_-6px_var(--gold)] backdrop-blur-xl">
            {/* Compass with a glowing orbit ring */}
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span
                className="animate-spin-slow absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, var(--gold) 55%, var(--gold-light) 80%, transparent 100%)",
                }}
              />
              <span className="absolute inset-[1.5px] rounded-full bg-lanka-black" />
              <Compass size={12} strokeWidth={2.2} className="relative text-gold-light" />
            </span>

            <span className="premium-serif text-[12px] tracking-wide text-slate-200">{t("guideBadge")}</span>
          </div>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex w-full flex-col ${isUser ? "items-end" : "items-start"} animate-fade-in-up`}
            >
              <div
                className={`relative max-w-[86%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  isUser
                    ? "rounded-2xl rounded-br-md bg-linear-to-br from-gold-light via-gold to-gold-dark font-medium text-lanka-black shadow-lg shadow-gold/15"
                    : "rounded-2xl rounded-bl-md border border-white/10 border-l-2 border-l-gold/70 bg-white/4 text-slate-200 backdrop-blur-xl"
                }`}
              >
                {msg.text}
              </div>
              <span className="mt-1 px-1 text-[10px] text-slate-500">{msg.time}</span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start animate-fade-in-up" role="status" aria-label="The guide is typing">
            <div className="relative flex items-center gap-1.25 overflow-hidden rounded-2xl rounded-bl-md border border-white/10 border-l-2 border-l-gold/70 bg-white/4 px-4 py-3.5 backdrop-blur-xl">
              {/* Soft gold light sweeping across the bubble */}
              <span className="ikisaki-sheen pointer-events-none absolute inset-0" />

              {/* Three dots in a flowing wave */}
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="ikisaki-dot relative h-1.5 w-1.5 rounded-full bg-linear-to-br from-gold-light to-gold shadow-[0_0_6px_var(--gold)]"
                  style={{ animationDelay: `${i * 0.16}s` }}
                />
              ))}

              <style>{`
        @keyframes ikisaki-wave {
          0%, 60%, 100% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0.35;
          }
          30% {
            transform: translate3d(0, -4px, 0) scale(1.15);
            opacity: 1;
          }
        }
        @keyframes ikisaki-sheen {
          0%   { transform: translate3d(-120%, 0, 0); }
          100% { transform: translate3d(120%, 0, 0); }
        }
        .ikisaki-dot {
          animation: ikisaki-wave 1.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          will-change: transform, opacity;
        }
        .ikisaki-sheen {
          background: linear-gradient(
            100deg,
            transparent 30%,
            rgba(241, 213, 146, 0.12) 50%,
            transparent 70%
          );
          animation: ikisaki-sheen 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ikisaki-dot { animation: none; opacity: 0.8; }
          .ikisaki-sheen { display: none; }
        }
      `}</style>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* 2. Compact quick chips (always one row) */}

      <div ref={suggestionsRef} className="relative flex shrink-0 justify-end py-1.5">
        {/* Panel */}
        <div
          id="ikisaki-suggestions"
          aria-hidden={!showSuggestions}
          className={`absolute inset-x-0 bottom-full mb-1.5 origin-bottom-right overflow-hidden rounded-2xl border border-gold/25 bg-lanka-black/95 shadow-2xl shadow-black/70 backdrop-blur-xl transition-all duration-300 ease-out ${
            showSuggestions
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0"
          }`}
        >
          {/* Thin gold light along the top edge */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-gold/60 to-transparent" />

          <div className="max-h-[clamp(96px,calc(55vh-12rem),176px)] overflow-y-auto overscroll-contain p-1.5">
            {suggestions.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleSuggestionClick(item.label)}
                disabled={isTyping}
                tabIndex={showSuggestions ? 0 : -1}
                className={`group relative block w-full rounded-xl py-2 pl-4 pr-3 text-left transition-all duration-300 hover:bg-linear-to-r hover:from-gold/12 hover:to-transparent focus-visible:bg-gold/10 focus-visible:outline-none disabled:opacity-40 ${
                  idx !== suggestions.length - 1 ? "mb-0.5" : ""
                }`}
              >
                {/* Gold accent rail: grows on hover */}
                <span className="absolute left-1.5 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-gold/35 transition-all duration-300 group-hover:h-6 group-hover:bg-gold group-focus-visible:h-6 group-focus-visible:bg-gold" />

                <span className="premium-serif block truncate text-[13.5px] leading-tight text-slate-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold-light">
                  {item.label}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-400">
                  {item.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle button (text + count badge, no icons) */}
        <button
          onClick={() => setShowSuggestions((v) => !v)}
          aria-expanded={showSuggestions}
          aria-controls="ikisaki-suggestions"
          className={`inline-flex items-center gap-2 rounded-full border bg-white/5 py-1 pl-3.5 pr-1.5 text-[11.5px] tracking-wide transition-colors duration-300 [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 active:scale-95 ${
            showSuggestions
              ? "border-gold/50 text-gold"
              : "border-white/10 text-slate-300 hover:border-gold/40 hover:text-gold"
          }`}
        >
          <span className="premium-serif">{t("suggestionsButton")}</span>
          <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold/20 px-1 text-[10px] font-semibold tabular-nums text-gold">
            {suggestions.length}
          </span>
        </button>
      </div>

      {/* 3. Input */}
      <div className="relative mt-auto shrink-0 border-t border-white/10 bg-surface/95 pt-2">
        <div className="relative flex items-center rounded-2xl border border-white/15 bg-lanka-black/80 p-1.5 shadow-inner backdrop-blur-xl transition-all duration-300 focus-within:border-gold/60 focus-within:ring-1 focus-within:ring-gold/30">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("inputPlaceholder")}
            aria-label="Message the travel guide"
            className="w-full border-none bg-transparent py-2 pl-3 pr-12 text-[13px] text-white placeholder-slate-500 focus:outline-none focus:ring-0"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message"
            className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-gold-light via-gold to-gold-dark text-lanka-black shadow-md shadow-gold/20 transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 active:scale-95"
          >
            <ArrowUp size={16} strokeWidth={2.6} />
          </button>
        </div>

        <p className="mt-1.5 text-center text-[10px] tracking-wide text-slate-500">{t("poweredBy")}</p>
      </div>
    </div>
  );
}
