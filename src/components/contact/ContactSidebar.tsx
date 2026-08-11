"use client";
//Icons
import { SiWhatsapp } from "react-icons/si";
import { Mail, Phone, MapPin, Clock, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

const contactInfoIcons = [Mail, Phone, MapPin, Clock];

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gold mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

export default function ContactSidebar() {
  const t = useTranslations("ContactPage.Sidebar");
  const infoArray = t.raw("info") as { label: string; value: string }[];

  return (
    <div className="space-y-8 lg:col-span-1">
      <div className="glass-card rounded-3xl p-8">
        <h2 className="premium-serif mb-6 text-xl text-white">{t("title")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
          {infoArray.map((item, index) => {
            const Icon = contactInfoIcons[index] || Headphones;
            return <InfoItem key={index} icon={<Icon className="h-5 w-5" />} label={item.label} value={item.value} />;
          })}
        </div>
      </div>

      <div className="relative lg:w-full lg:mx-0 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950/20 via-lanka-black/90 to-lanka-black p-8 md:p-5 lg:p-6 xl:p-8 3xl:p-10 border border-gold/30 shadow-2xl backdrop-blur-xl group/card transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-950/30">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover/card:bg-emerald-500/20" />

        <p className="relative z-10 premium-serif mb-6 md:mb-5 xl:mb-6 text-[16px] md:text-{14px} xl:text-[15px] 3xl:text-[17px] font-extrabold tracking-wide text-white flex items-center justify-start gap-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          {t("messagesAppTitle")}
        </p>

        <div className="relative z-10 flex w-full flex-col gap-4 md:flex-row xl:flex-col">
          {/* WhatsApp Button Card */}
          <button
            type="button"
            onClick={() => window.open("https://wa.me/94771234567", "_blank")}
            className="group flex w-full md:w-1/2 xl:w-full cursor-pointer items-start sm:items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 text-left shadow-sm transition-all duration-300 hover:border-white/10 hover:bg-white/5"
          >
            {/* Icon Container (Styles strictly preserved) */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 animate-blink-border">
              <SiWhatsapp className="h-6 w-6 text-emerald-400 transition-colors group-hover:text-[#25D366]" />
            </div>

            {/* Text Container */}
            <div className="flex flex-1 flex-col gap-1.5">
              {/* Title */}
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white sm:text-[11px] md:text-[11px] lg:text-[10px] 3xl:text-[15px]">
                {t("whatsappButton")}
              </span>

              {/* Subtitle / Status */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium text-emerald-400/90 transition-colors group-hover:text-[#25D366] sm:text-[12px] md:text-[10px] lg:text-[12px] 3xl:text-[14px]">
                {/* Online Indicator */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>{t("onlineStatus")}</span>
                </div>
              </div>
            </div>
          </button>

          {/* LINE Button Card */}
          <button
            type="button"
            onClick={() => window.open("https://line.me/ti/p/dcnpathirana", "_blank")}
            className="group flex w-full md:w-1/2 xl:w-full cursor-pointer items-start sm:items-center gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 text-left shadow-sm transition-all duration-300 hover:border-white/10 hover:bg-white/5"
          >
            {/* Icon Container (Styles strictly preserved) */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-[#06C755] group-hover:bg-[#06C755]/10 animate-blink-border">
              <svg
                className="h-6 w-6 text-[#06C755]/80 transition-colors group-hover:text-[#06C755]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.383c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.413-.09-.547-.245l-2.335-2.693v2.302c0 .345-.283.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.27.173-.51.43-.595.064-.022.134-.032.2-.032.211 0 .412.091.547.245l2.335 2.694V8.108c0-.345.283-.63.63-.63.349 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.348 0 .63.285.63.63v4.771zm-2.466.629H6.077c-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.349 0 .63.285.63.63v4.142h1.129c.349 0 .63.283.63.63 0 .344-.281.629-.63.629zM12 2C6.477 2 2 6.477 2 12c0 4.991 3.655 9.128 8.438 9.878.582.107.822-.252.822-.562 0-.277-.01-1.014-.015-1.99-3.438.747-4.161-1.656-4.161-1.656-.53-1.346-1.294-1.705-1.294-1.705-1.121-.767.085-.751.085-.751 1.24.088 1.892 1.274 1.892 1.274 1.102 1.888 2.89 1.343 3.593 1.026.111-.798.432-1.343.784-1.652-2.742-.312-5.624-1.372-5.624-6.11 0-1.35.483-2.454 1.274-3.321-.129-.313-.553-1.571.121-3.275 0 0 1.037-.332 3.4 1.267a11.83 11.83 0 0 1 3.036-.41c1.03 0 2.067.139 3.036.41 2.362-1.6 3.398-1.267 3.398-1.267.675 1.704.251 2.962.123 3.275.792.867 1.272 1.971 1.272 3.321 0 4.75-2.887 5.794-5.634 6.101.444.382.839 1.139.839 2.296 0 1.656-.015 2.993-.015 3.4 0 .313.238.675.827.561C18.349 21.125 22 16.989 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>

            {/* Text Container */}
            <div className="flex flex-1 flex-col gap-1.5">
              {/* Title */}
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white sm:text-[11px] md:text-[11px] lg:text-[10px] 3xl:text-[15px]">
                {t("lineButton")}
              </span>

              {/* Subtitle / Status */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-medium text-emerald-400/90 transition-colors group-hover:text-[#25D366] sm:text-[12px] md:text-[10px] lg:text-[12px] 3xl:text-[14px]">
                {/* Online Indicator */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06C755] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06C755]"></span>
                  </span>
                  <span>{t("onlineStatus")}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
