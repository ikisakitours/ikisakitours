"use client";
//Icons
import { SiWhatsapp, SiLine } from "react-icons/si";
import { Mail, Phone, MapPin, Clock, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

const contactInfoIcons = [Mail, Phone, MapPin, Clock];

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <div className="text-gold">{icon}</div>
        <p className="text-body-sm font-medium text-slate-400">{label}</p>
      </div>
      <div>
        <p className="text-right text-body-sm font-bold text-white">{value}</p>
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
        <h2 className="premium-serif mb-6 text-heading-sub text-white">{t("title")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
          {infoArray.map((item, index) => {
            const Icon = contactInfoIcons[index] || Headphones;
            return <InfoItem key={index} icon={<Icon className="h-5 w-5" />} label={item.label} value={item.value} />;
          })}
        </div>
      </div>

      <div className="relative lg:w-full lg:mx-0 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950/20 via-lanka-black/90 to-lanka-black p-8 md:p-5 lg:p-6 xl:p-8 3xl:p-10 border border-gold/30 shadow-2xl backdrop-blur-xl group/card transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-950/30">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover/card:bg-emerald-500/20" />

        <p className="relative z-10 premium-serif mb-6 md:mb-5 xl:mb-6 text-heading-card font-extrabold tracking-wide text-white flex items-center justify-start gap-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          {t("messagesTitle")}
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
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white">
                {t("whatsappButton")}
              </span>

              {/* Subtitle / Status */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-caption font-medium text-emerald-400/90 transition-colors group-hover:text-[#25D366]">
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
              <SiLine className="h-5 w-5 text-[#06C755]/80 transition-colors group-hover:text-[#06C755]" />
            </div>

            {/* Text Container */}
            <div className="flex flex-1 flex-col gap-1.5">
              {/* Title */}
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white">
                {t("lineButton")}
              </span>

              {/* Subtitle / Status */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-caption font-medium text-emerald-400/90 transition-colors group-hover:text-[#25D366]">
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
