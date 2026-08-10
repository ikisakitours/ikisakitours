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
        <div className="space-y-6">
          {infoArray.map((item, index) => {
            const Icon = contactInfoIcons[index] || Headphones;
            return <InfoItem key={index} icon={<Icon className="h-5 w-5" />} label={item.label} value={item.value} />;
          })}
        </div>
      </div>

      <div className="relative lg:w-full lg:mx-0 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950/20 via-lanka-black/90 to-lanka-black p-8 md:p-5 lg:p-6 xl:p-8 3xl:p-10 border border-gold/30 shadow-2xl backdrop-blur-xl group/card transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-950/30">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover/card:bg-emerald-500/20" />

        <p className="relative z-10 premium-serif mb-6 md:mb-5 xl:mb-6 text-base md:text-sm xl:text-base 3xl:text-lg font-extrabold tracking-wide text-white flex items-center justify-start gap-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          {t("messagesAppTitle")}
        </p>

        <div className="flex flex-col md:flex-row lg:flex-col gap-5 relative z-10">
          {" "}
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={() => window.open("https://wa.me/94771234567", "_blank")}
            className="group mx-auto lg:mx-0 flex w-full sm:w-auto cursor-pointer items-center justify-center sm:justify-start md:justify-center lg:justify-start gap-4 md:gap-3 xl:gap-4 border-none bg-transparent p-0 text-left"
          >
            {/* Icon Container */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner animate-blink-border transition-all duration-300 group-hover:border-[#25D366] group-hover:bg-[#25D366]/10 group-hover:scale-105 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-13 xl:w-13 3xl:h-15 3xl:w-15">
              <SiWhatsapp className="h-5 w-5 text-emerald-400 transition-colors group-hover:text-[#25D366] md:h-5 md:w-5 xl:h-6 xl:w-6 3xl:h-7 3xl:w-7" />
            </div>

            {/* Text Container */}
            <div className="flex flex-col min-w-0">
              <span className="whitespace-nowrap md:truncate xl:whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white md:text-[10px] lg:text-[11px] xl:text-[13px] 3xl:text-[15px]">
                {t("whatsappButton")}
              </span>

              <span className="mt-1 flex flex-row lg:flex-col xl:flex-row items-center md:items-start xl:items-center gap-1.5 md:gap-0.5 xl:gap-1.5 whitespace-nowrap md:whitespace-normal xl:whitespace-nowrap text-[10px] font-medium text-emerald-400/90 transition-colors group-hover:text-[#25D366] md:text-[10px] lg:text-[10px] xl:text-[12px] 3xl:text-[14px] leading-tight">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-ping" />
                  <span className="whitespace-nowrap">
                    {t("onlineStatus")} <span className="inline md:hidden xl:inline">—</span>
                  </span>
                </span>

                <span className="underline decoration-emerald-400/60 underline-offset-2 whitespace-nowrap lg:ml-3">
                  {t("clickToChat")}
                </span>
              </span>
            </div>
          </button>
          {/* LINE Button */}
          <button
            type="button"
            onClick={() => window.open("https://line.me/ti/p/dcnpathirana", "_blank")}
            className="group mx-auto lg:mx-0 flex w-full sm:w-auto cursor-pointer items-center justify-center sm:justify-start md:justify-center lg:justify-start gap-4 md:gap-3 xl:gap-4 border-none bg-transparent p-0 text-left"
          >
            {/* Icon Container */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner animate-blink-border transition-all duration-300 group-hover:border-[#06C755] group-hover:bg-[#06C755]/10 group-hover:scale-105 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-13 xl:w-13 3xl:h-15 3xl:w-15">
              <svg
                className="h-5 w-5 text-[#06C755]/80 transition-colors group-hover:text-[#06C755] md:h-5 md:w-5 xl:h-6 xl:w-6 3xl:h-7 3xl:w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.383c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.413-.09-.547-.245l-2.335-2.693v2.302c0 .345-.283.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.27.173-.51.43-.595.064-.022.134-.032.2-.032.211 0 .412.091.547.245l2.335 2.694V8.108c0-.345.283-.63.63-.63.349 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.629-.63.629-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.348 0 .63.285.63.63v4.771zm-2.466.629H6.077c-.349 0-.63-.284-.63-.629V8.108c0-.345.281-.63.63-.63.349 0 .63.285.63.63v4.142h1.129c.349 0 .63.283.63.63 0 .344-.281.629-.63.629zM12 2C6.477 2 2 6.477 2 12c0 4.991 3.655 9.128 8.438 9.878.582.107.822-.252.822-.562 0-.277-.01-1.014-.015-1.99-3.438.747-4.161-1.656-4.161-1.656-.53-1.346-1.294-1.705-1.294-1.705-1.121-.767.085-.751.085-.751 1.24.088 1.892 1.274 1.892 1.274 1.102 1.888 2.89 1.343 3.593 1.026.111-.798.432-1.343.784-1.652-2.742-.312-5.624-1.372-5.624-6.11 0-1.35.483-2.454 1.274-3.321-.129-.313-.553-1.571.121-3.275 0 0 1.037-.332 3.4 1.267a11.83 11.83 0 0 1 3.036-.41c1.03 0 2.067.139 3.036.41 2.362-1.6 3.398-1.267 3.398-1.267.675 1.704.251 2.962.123 3.275.792.867 1.272 1.971 1.272 3.321 0 4.75-2.887 5.794-5.634 6.101.444.382.839 1.139.839 2.296 0 1.656-.015 2.993-.015 3.4 0 .313.238.675.827.561C18.349 21.125 22 16.989 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>

            {/* Text Container */}
            <div className="flex flex-col min-w-0">
              <span className="whitespace-nowrap md:truncate xl:whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white md:text-[10px] lg:text-[11px] xl:text-[13px] 3xl:text-[15px]">
                {t("lineButton")}
              </span>

              <span className="mt-1 flex flex-row lg:flex-col xl:flex-row items-center md:items-start xl:items-center gap-1.5 md:gap-0.5 xl:gap-1.5 whitespace-nowrap md:whitespace-normal xl:whitespace-nowrap text-[10px] font-medium text-[#06C755]/80 transition-colors group-hover:text-[#06C755] md:text-[10px] lg:text-[10px] xl:text-[12px] 3xl:text-[14px] leading-tight">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#06C755] animate-ping" />
                  <span className="whitespace-nowrap">
                    {t("onlineStatus")} <span className="inline md:hidden xl:inline">—</span>
                  </span>
                </span>

                <span className="underline decoration-[#06C755]/60 underline-offset-2 whitespace-nowrap lg:ml-3">
                  {t("clickToChat")}
                </span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
