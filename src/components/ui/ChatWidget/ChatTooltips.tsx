"use client";

import React from "react";
import { CloseButton } from "@/components/ui/ChatWidget/CloseButton";
import { useTranslations } from "next-intl";

interface ChatTooltipsProps {
  isOpen: boolean;
  showSideTooltip: boolean;
  showBottomTooltip: boolean;
  isBottomDismissed: boolean;
  isAtBottom?: boolean;
  onCloseSideTooltip: (e: React.MouseEvent) => void;
  onCloseBottomTooltip: (e: React.MouseEvent) => void;
}

export function ChatTooltips({
  isOpen,
  showSideTooltip,
  showBottomTooltip,
  isBottomDismissed,
  isAtBottom = false,
  onCloseSideTooltip,
  onCloseBottomTooltip,
}: ChatTooltipsProps) {
  const t = useTranslations("ChatWidget.Tooltips");
  const tWidget = useTranslations("ChatWidget.Widget");
  return (
    <>
      <div
        className={`absolute right-[125%] mr-3 whitespace-nowrap px-4 py-2.5 rounded-2xl bg-linear-to-r from-lanka-black via-surface to-lanka-black border border-gold/50 shadow-[0_0_30px_rgba(197,160,89,0.3)] backdrop-blur-2xl text-[13px] text-gold font-medium tracking-wide transition-all duration-500 origin-right ${
          showSideTooltip && !isOpen && !isAtBottom
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
            <span className="gold-gradient-text font-bold">{t("sideTooltip")}</span>
          </span>
          <CloseButton onClick={onCloseSideTooltip} className="p-1 z-30" aria-label={tWidget("closeTooltipAria")} iconSize={14} />
        </div>
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-surface border-r border-t border-gold/50 rotate-45 pointer-events-none shadow-md" />
      </div>

      <div
        className={`absolute bottom-[130%] right-0 w-72 sm:w-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
          showBottomTooltip && !isOpen && !isBottomDismissed
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-6 scale-95 pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <CloseButton
          onClick={onCloseBottomTooltip}
          className="absolute -top-2.5 -right-2.5 p-1.5 z-30"
         aria-label={tWidget("closeTooltipAria")}
          iconSize={13}
        />

        {/* Compact & Clean Card */}
        <div className="relative p-4 rounded-2xl bg-linear-to-b from-lanka-black/98 via-surface/95 to-lanka-black/98 border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,89,0.15)] backdrop-blur-2xl flex flex-col overflow-hidden">
          {/* Subtle Top Glow */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-60" />

          {/* Message Heading (Title) */}
          <div className="relative z-10 flex items-center justify-between mb-1.5">
            <h4 className="text-[14px] font-bold text-white flex items-center gap-2">
              <span className="text-base">👋</span>{t("bottomHeading")}
            </h4>
            <span className="text-[9px] text-gold uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
             {t("bottomBadge")}
            </span>
          </div>

          {/* Message Body (Description) */}
          <p className="relative z-10 text-[12px] text-slate-300 leading-relaxed mb-4">
           {t("bottomBody")}
          </p>

          {/* Action Link / Highlighting Text */}
          <div className="relative mt-1 pt-2 pl-3.5 cursor-pointer">
            <div className="absolute left-0 top-3 bottom-0.5 w-px bg-linear-to-b from-gold via-gold/30 to-transparent" />

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5">
                <span className="text-[8.5px] text-gold/50 uppercase tracking-[0.3em] font-light">
                 {t("actionHighlight")}
                </span>
                <span className="text-[13px] text-white/90 font-light tracking-wide">
                  {t("actionText1")} <span className="font-serif italic text-gold font-medium">Private Tour{t("actionText2")}</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5 pb-1 opacity-70">
                <div className="w-5 h-px bg-gold/40"></div>
                <div className="w-1.5 h-1.5 rotate-45 border-[0.5px] border-gold"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
