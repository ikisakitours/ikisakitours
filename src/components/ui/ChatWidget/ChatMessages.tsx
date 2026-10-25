import React from "react";
import { useTranslations } from "next-intl";
//Icons
import { Mail, Headset, Bot } from "lucide-react";
import { SiWhatsapp, SiLine } from "react-icons/si";

interface ChatMessagesProps {
  onEmailClick: () => void;
  onBotClick: () => void;
  waLink: string;
  lineLink: string;
}

export function ChatMessages({ onEmailClick, onBotClick, waLink, lineLink }: ChatMessagesProps) {
  const t = useTranslations("ChatWidget.Messages");
  return (
    <div className="space-y-6 animate-fade-in-up min-h-90  flex flex-col justify-between">
      <div className="space-y-5">
        {/* Start a new chat section */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3 px-1 tracking-wide uppercase">
            {t("startChatTitle")}
          </h3>
          <div className="space-y-3">
            {/* WhatsApp Button */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-[#25D366]/30 p-3.5 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <SiWhatsapp className="h-5 w-5 text-[#25D366]" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-[#25D366] transition-colors">
                    {t("whatsappTitle")}
                  </p>
                  <p className="text-[10px] text-slate-500">{t("whatsappSubtitle")}</p>
                </div>
              </div>
            </a>

            {/* Line App Button */}
            <a
              href={lineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-[#06C755]/30 p-3.5 hover:border-[#06C755] hover:bg-[#06C755]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <SiLine className="h-5 w-5 text-[#06C755]" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-[#06C755] transition-colors">
                    {t("lineTitle")}
                  </p>
                  <p className="text-[10px] text-slate-500">{t("lineSubtitle")}</p>
                </div>
              </div>
            </a>
            {/* Email Button */}
            {/* <button
              onClick={onEmailClick}
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-gold/30 p-3.5 hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-gold transition-colors">
                    {t("emailTitle")}
                  </p>
                  <p className="text-[10px] text-slate-500">{t("emailSubtitle")}</p>
                </div>
              </div>
            </button> */}

            {/* AI Chatbot Button */}
            <button
              onClick={onBotClick}
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-[#0ea5e9]/30 p-3.5 hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-[#0ea5e9]" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-[#0ea5e9] transition-colors">
                    {t("botTitle") || "Chat with AI Assistant"}
                  </p>
                  <p className="text-[10px] text-slate-500">{t("botSubtitle") || "Get instant automated answers"}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Chats */}
        <div>
          {/* Heading with a small headset badge on the left */}
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-linear-to-br from-gold/25 to-gold/5 shadow-[0_0_10px_-3px_var(--gold)]">
              <Headset size={10} strokeWidth={2.4} className="text-gold-light" />
            </span>
            <h3 className="text-xs font-medium tracking-wide text-slate-400 uppercase">{t("recentTitle")}</h3>
            <span className="h-px flex-1 bg-linear-to-r from-gold/30 to-transparent" />
          </div>

          {/* Message card: full width, no avatar */}
          <div className="group relative cursor-default overflow-hidden rounded-xl border border-white/10 bg-white/4 py-3 pl-4 pr-3.5 backdrop-blur-xl transition-all duration-300 hover:border-gold/30 hover:bg-gold/6">
            {/* Gold accent bar on the left edge */}
            <span className="absolute inset-y-0 left-0 w-0.75 bg-linear-to-b from-gold-light via-gold to-gold-dark" />

            {/* Name on the left, time + live dot on the right */}
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 truncate text-[11px] text-slate-400">{t("customerSupport")}</p>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="whitespace-nowrap text-[10px] text-slate-500">{t("timeNow")}</span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
                  <span className="relative h-2 w-2 rounded-full bg-gold" />
                </span>
              </div>
            </div>

            {/* Message uses the full card width */}
            {/*Most important [word-break:auto-phrase] */}
            <p className="mt-1 text-[13px] font-medium leading-snug text-white wrap-anywhere [word-break:auto-phrase]">
              {t("recentMessage")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
