"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, Sparkles, ArrowLeft, Home, MessageSquareText } from "lucide-react";
import { ChatHome } from "@/components/ui/ChatWidget/ChatHome";
import { ChatMessages } from "@/components/ui/ChatWidget/ChatMessages";
import { ChatMailForm } from "@/components/ui/ChatWidget/ChatMailForm";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [activeTab, setActiveTab] = useState<"home" | "messages">("home");
  const [showMailForm, setShowMailForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(false);
      setActiveTab("home");
      setShowMailForm(false);
    }
  };

  const whatsappNumber = "94770000000";
  const defaultMessage = "Hello! I would like to plan a tour to Sri Lanka.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      <div
        className={`absolute bottom-20 right-0 w-93.75 sm:w-90 md:w-90 glass-card rounded-3xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto shadow-2xl"
            : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-lanka-black/95 border-b border-gold/20 p-4 flex justify-between items-center relative shrink-0">
          <div className="absolute top-0 left-1/4 w-24 h-24 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            {showMailForm ? (
              <button
                onClick={() => setShowMailForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-white/10 text-slate-300 hover:text-gold hover:border-gold/30 transition-all"
              >
                <ArrowLeft size={16} />
              </button>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-gold/30">
                <Sparkles className="h-4 w-4 text-gold animate-pulse" />
              </div>
            )}
            <div>
              <h4 className="premium-serif text-[15px] text-white font-medium">
                {showMailForm ? "Send an Email" : "MapMate Sri Lanka"}
              </h4>
              {!showMailForm && (
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Online Now
                </span>
              )}
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="relative z-10 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 bg-surface/95 backdrop-blur-xl overflow-y-auto no-scrollbar max-h-[55vh]">
          {showMailForm ? (
            <ChatMailForm />
          ) : activeTab === "home" ? (
            <ChatHome onNewChat={() => setActiveTab("messages")} />
          ) : (
            <ChatMessages onEmailClick={() => setShowMailForm(true)} waLink={waLink} />
          )}
        </div>

        {!showMailForm && (
          <div className="flex border-t border-white/10 bg-lanka-black/95 shrink-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === "home" ? "text-gold" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Home size={18} />
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 py-3 flex justify-center transition-colors ${activeTab === "messages" ? "text-gold" : "text-slate-500 hover:text-slate-300"}`}
            >
              <MessageSquareText size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-center">
        <div
          className={`absolute right-[125%] mr-3 whitespace-nowrap px-4 py-2.5 rounded-2xl bg-linear-to-r from-lanka-black via-surface to-lanka-black border border-gold/50 shadow-[0_0_30px_rgba(197,160,89,0.3)] backdrop-blur-2xl text-[13px] text-gold font-medium tracking-wide transition-all duration-500 origin-right ${
            showTooltip && !isOpen
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 translate-x-4 scale-95 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-transparent via-gold/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <span className="relative z-10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="gold-gradient-text font-bold">We&apos;re here!</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-1 rounded-full bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
          </div>
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-surface border-r border-t border-gold/50 rotate-45 pointer-events-none shadow-md" />
        </div>
        {/* Luxury Glowing Tooltip / Single Combined Message Box */}
        <div
          className={`absolute bottom-[130%] right-0 w-72 sm:w-80 transition-all duration-500 origin-bottom-right ${
            showTooltip && !isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-3 -right-3 p-1.5 rounded-full bg-lanka-black border border-gold/40 text-slate-300 hover:text-white hover:border-gold transition-all shadow-lg z-30"
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>

          {/* Single Combined Message Box */}
          <div className="relative p-4 rounded-2xl bg-lanka-black/95 border border-gold/40 shadow-[0_0_25px_rgba(197,160,89,0.25)] backdrop-blur-2xl flex flex-col gap-2">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-transparent via-gold/5 to-transparent pointer-events-none" />

            <p className="relative z-10 flex items-center gap-2 text-[14px] text-white font-medium">
              <span>👋</span> Hi! How can we help?
            </p>

            <div className="relative z-10 border-t border-gold/20 pt-2 text-[14px] text-gold font-medium">
              I Need To Customize My Tour In Srianka
            </div>
          </div>
        </div>
        <button
          onClick={toggleChat}
          className="relative group flex h-14 w-14 md:h-15.5 md:w-15.5 items-center justify-center rounded-full bg-linear-to-b from-surface via-lanka-black to-lanka-black border-2 border-gold/60 shadow-[0_0_35px_rgba(197,160,89,0.35)] hover:shadow-[0_0_50px_rgba(197,160,89,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 z-50"
          aria-label="Toggle chat"
        >
          <div className="absolute -inset-1.5 rounded-full border border-gold/30 animate-[spin_5s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-3 rounded-full border border-dashed border-gold/20 animate-[spin_10s_linear_infinite_reverse] pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-gold-dark/30 via-transparent to-gold/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          {isOpen ? (
            <X className="h-6 w-6 text-gold transition-all duration-500 rotate-180 scale-110 relative z-10 drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
          ) : (
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-gold transition-all duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
          )}
        </button>
      </div>
    </div>
  );
}
