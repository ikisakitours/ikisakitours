"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CloseButton } from "@/components/ui/ChatWidget/CloseButton";
import { useTranslations } from "next-intl";
//Icons
import { ArrowLeft, Sparkles } from "lucide-react";

interface ChatHeaderProps {
  showMailForm: boolean;
  setShowMailForm: (show: boolean) => void;
  toggleChat: () => void;
}

export function ChatHeader({ showMailForm, setShowMailForm, toggleChat }: ChatHeaderProps) {
  const [logoError, setLogoError] = useState(false);
  const t = useTranslations("ChatWidget.Header");
  const tWidget = useTranslations("ChatWidget.Widget");
  return (
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
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface border border-gold/30 relative">
            {!logoError ? (
              <Image
                src="/images/bg-remove.png"
                alt={t("logoAlt")}
                width={36}
                height={36}
                className="h-full w-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Sparkles className="h-4 w-4 text-gold animate-pulse" />
            )}
          </div>
        )}
        <div>
          <h4 className="premium-serif text-[15px] text-white font-medium">
          {showMailForm ? t("titleEmail") : t("titleDefault")}
          </h4>
          {!showMailForm && (
            <span className="flex items-center gap-1.5 text-[9px] mt-1 uppercase tracking-widest text-emerald-400 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            {t("onlineStatus")}
            </span>
          )}
        </div>
      </div>
      <CloseButton onClick={toggleChat} className="relative z-10 p-1.5" aria-label={tWidget("closeChatAria")} iconSize={16} />
    </div>
  );
}
