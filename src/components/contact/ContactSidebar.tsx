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

      <div className="relative md:w-85 md:mx-auto lg:w-full lg:mx-0 overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950/20 via-lanka-black/90 to-lanka-black p-8 md:p-5 lg:p-6 xl:p-8 3xl:p-10 border border-gold/30 shadow-2xl backdrop-blur-xl group/card transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-950/30">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover/card:bg-emerald-500/20" />

        <p className="relative z-10 premium-serif mb-5 md:mb-4 xl:mb-5 text-base md:text-sm xl:text-base 3xl:text-lg font-extrabold tracking-wide text-white flex items-center justify-start gap-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          {t("whatsappTitle")}
        </p>

        <button
          type="button"
          onClick={() => window.open("https://wa.me/94771234567", "_blank")} // Update with actual WhatsApp link
          className="group mx-auto lg:mx-0 flex w-full sm:w-auto cursor-pointer items-center justify-center sm:justify-start md:justify-center lg:justify-start gap-4 md:gap-3 xl:gap-4 border-none bg-transparent p-0 text-left relative z-10"
        >
          {/* Icon Container */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner animate-blink-border transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-105 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-13 xl:w-13 3xl:h-15 3xl:w-15">
            <SiWhatsapp className="h-5 w-5 text-emerald-400 transition-colors group-hover:text-gold md:h-5 md:w-5 xl:h-6 xl:w-6 3xl:h-7 3xl:w-7" />
          </div>

          {/* Text Container */}
          <div className="flex flex-col min-w-0">
            <span className="whitespace-nowrap md:truncate xl:whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white md:text-[10px] lg:text-[11px] xl:text-[13px] 3xl:text-[15px]">
              {t("whatsappButton")}
            </span>

            <span className="mt-1 flex flex-row lg:flex-col xl:flex-row items-center md:items-start xl:items-center gap-1.5 md:gap-0.5 xl:gap-1.5 whitespace-nowrap md:whitespace-normal xl:whitespace-nowrap text-[10px] font-medium text-gold/90 md:text-[10px] lg:text-[10px] xl:text-[12px] 3xl:text-[14px] leading-tight">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold animate-ping" />
                <span className="whitespace-nowrap">
                  {t("onlineStatus")} <span className="inline md:hidden xl:inline">—</span>
                </span>
              </span>

              <span className="underline decoration-gold/60 underline-offset-2 transition-colors group-hover:text-gold whitespace-nowrap lg:ml-3">
                {t("clickToChat")}
              </span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}