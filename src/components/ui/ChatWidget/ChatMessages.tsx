import React from "react";
import { useTranslations } from "next-intl";
//Icons
import { Mail, Headset } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface ChatMessagesProps {
  onEmailClick: () => void;
  waLink: string;
}

export function ChatMessages({ onEmailClick, waLink }: ChatMessagesProps) {
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
              href="https://line.me/ti/p/dcnpathirana"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-[#06C755]/30 p-3.5 hover:border-[#06C755] hover:bg-[#06C755]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {/* Line App Icon (SVG) */}
                <svg className="h-5 w-5 text-[#06C755]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.383c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.413-.09-.547-.245l-2.335-2.693v2.302c0 .345-.283.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.27.173-.51.43-.595.064-.022.134-.032.2-.032.211 0 .412.091.547.245l2.335 2.694V8.108c0-.345.283-.63.63-.63.349 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.348 0 .63.285.63.63v4.771zm-2.466.629H6.077c-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.349 0 .63.285.63.63v4.142h1.129c.349 0 .63.283.63.63 0 .344-.281.629-.63.629zM12 2C6.477 2 2 6.477 2 12c0 4.991 3.655 9.128 8.438 9.878.582.107.822-.252.822-.562 0-.277-.01-1.014-.015-1.99-3.438.747-4.161-1.656-4.161-1.656-.53-1.346-1.294-1.705-1.294-1.705-1.121-.767.085-.751.085-.751 1.24.088 1.892 1.274 1.892 1.274 1.102 1.888 2.89 1.343 3.593 1.026.111-.798.432-1.343.784-1.652-2.742-.312-5.624-1.372-5.624-6.11 0-1.35.483-2.454 1.274-3.321-.129-.313-.553-1.571.121-3.275 0 0 1.037-.332 3.4 1.267a11.83 11.83 0 0 1 3.036-.41c1.03 0 2.067.139 3.036.41 2.362-1.6 3.398-1.267 3.398-1.267.675 1.704.251 2.962.123 3.275.792.867 1.272 1.971 1.272 3.321 0 4.75-2.887 5.794-5.634 6.101.444.382.839 1.139.839 2.296 0 1.656-.015 2.993-.015 3.4 0 .313.238.675.827.561C18.349 21.125 22 16.989 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-[#06C755] transition-colors">
                    {t("lineTitle")}
                  </p>
                  <p className="text-[10px] text-slate-500">{t("lineSubtitle")}</p>
                </div>
              </div>
            </a>
            {/* Email Button */}
            <button
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
            </button>
          </div>
        </div>

        {/* Recent Chats */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3 px-1 tracking-wide uppercase">{t("recentTitle")}</h3>
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-default">
            <div className="flex items-center gap-3">
              <div className="bg-gold/20 p-2 rounded-full border border-gold/30">
                <Headset size={14} className="text-gold" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{t("customerSupport")}</p>
                <p className="text-[13px] font-medium text-white mt-0.5">{t("recentMessage")}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-slate-500">{t("timeNow")}</span>
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
