"use client";
import { type FormEvent, useState } from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { LoadingVideo } from "@/components/ui/LoadingVideo";
import { Link, usePathname } from "@/i18nNavigation";
import { footerLinks, socialLinks, legalLinks, contactInfo } from "@/data/navigation";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import TimeDiv from "@/components/ui/TimeDiv";
import { useValidationForm } from "@/hooks/useValidationForm";
import { FormError } from "@/components/ui/FormError";
import { useTranslations } from "next-intl";

//Icons
import { Heart, Mail, MapPin, Phone, Send, Globe } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa6";

const socialLinksIcons = [FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp];
const contactInfoIcons = [MapPin, Phone, Mail];

export function Footer() {
  const tFooter = useTranslations("Footer");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [formData, setFormData] = useState({ email: "" });

  // Validation Hook
  const { errors, validate, setErrors } = useValidationForm();

  // Form Submit Handler
  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      email: formData.email,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call", { ...formData });
    }
  };

  const BRAND_NAME = "AETHERIA LABS";
  const BRAND_URL = "https://portfolio-app-pyqf.vercel.app/";
  const BRAND_LOGO_URL = "/images/aetheria-logo.mp4";
  const isVideoLogo = BRAND_LOGO_URL?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] pt-20 pb-10">
      <div className="absolute bottom-0 left-1/2 -z-10 h-75 w-75 -translate-x-1/2 rounded-full bg-gold/5 blur-[100px] md:w-200" />

      {/* MAPMATE Watermark */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-0 grid w-full place-items-center overflow-hidden opacity-[0.03]">
        <span className="whitespace-nowrap text-[4.4rem]  min-[340px]:max-[365px]:text-[3.9rem] min-[540px]:text-[6rem] sm:text-[4.4rem] md:text-[9rem] lg:text-[12.2rem] xl:text-[14rem] 2xl:text-[17rem] 3xl:text-[19rem] font-black uppercase leading-none text-white">
          MAPMATE
        </span>
      </div>

      <ContainerLayout className="relative z-10">
        <div className="mb-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-x-24 lg:gap-y-12 xl:grid-cols-12 xl:gap-8">
          <div className="flex flex-col items-center space-y-6 text-center sm:items-start sm:text-left xl:col-span-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-light tracking-[0.2em] text-white">
                MAP<span className="font-normal italic text-gold">MATE</span>
              </h3>
              <div className="group relative flex h-5 w-7 items-center justify-center overflow-hidden border-[0.5px] border-white/20 bg-black shadow-[0_0_15px_rgba(197,160,89,0.15)] transition-all duration-500 hover:border-gold/80 hover:shadow-[0_0_25px_rgba(197,160,89,0.6)] hover:scale-110">
                <div className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                <LoadingImage
                  src="https://flagcdn.com/w80/lk.png"
                  alt="Sri Lanka Flag"
                  width={80}
                  height={53}
                  isSmall
                  className="h-full w-full object-fill group-hover:scale-110"
                  wrapperClassName="w-full h-full"
                />

                <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-tr from-black/40 via-transparent to-black/10" />
              </div>
            </div>
            <p className="max-w-xs text-base font-light leading-relaxed text-slate-200">
              {tFooter("brandDescription")}
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {socialLinks.map(({ label, href }, idx) => {
                const Icon = socialLinksIcons[idx];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            {/* Time Display Card */}
            <TimeDiv />
          </div>

          <div className="xl:col-span-2 text-center sm:text-left lg:pl-4">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">
              {tFooter("exploreTitle")}
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((item) => {
                const finalHref = isHome && item.sectionId ? item.sectionId : item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={finalHref}
                      className="text-base font-light text-slate-300 transition-colors hover:text-gold"
                    >
                      {tFooter(`nav.${item.label}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="xl:col-span-3 text-center sm:text-left">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">
              {tFooter("contactTitle")}
            </h4>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => {
                const Icon = contactInfoIcons[index];
                return (
                  <li key={index} className="group flex items-start justify-center space-x-3 sm:justify-start">
                    <Icon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span
                      className={`text-base font-light leading-relaxed text-slate-300 ${item.label.includes("@") ? "transition-colors group-hover:text-gold" : ""}`}
                    >
                      {tFooter(`contactInfo.${item.label}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="xl:col-span-3 text-center sm:text-left">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">
              {tFooter("newsletterTitle")}
            </h4>
            <p className="mb-6 text-base font-light text-slate-300">{tFooter("newsletterDescription")}</p>
            <form onSubmit={handleBookingSubmit} className="relative mx-auto max-w-xs sm:mx-0">
              <input
                type="text"
                placeholder={tFooter("emailPlaceholder")}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                aria-label={tFooter("emailPlaceholder")}
                className="w-full  rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white transition-all placeholder:text-slate-400 focus:border-gold/60 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(20,20,20)]"
              />
              <button
                type="submit"
                aria-label={tFooter("buttonText")}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black transition-all hover:scale-105 hover:bg-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="-ml-30 md:ml-5 lg:ml-5 xl:ml-5">
              <FormError message={errors.email} />
            </div>
          </div>
        </div>

        <div className="mb-10 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Footer bottom section - Layout unchanged */}
        <div className="flex flex-col items-center justify-between gap-8 xl:flex-row">
          <p className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300 lg:text-left">
            <span>&copy; {tFooter("copyright")}</span>
            <Heart className="h-3.5 w-3.5 lg:h-3.75 lg:w-3.75 animate-pulse text-gold shrink-0" fill="currentColor" />
            <span>{tFooter("forTravelers")}</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-white"
              >
                {tFooter(`legal.${item.label}`)}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Industry Standard "Powered By" Signature Badge */}
        <div className="mt-8 flex items-center justify-center">
          <Link
            href={BRAND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center rounded-full bg-[#080808] border border-white/10 p-1.5 pr-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/40 hover:bg-[#0c0c0c] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_30px_rgba(197,160,89,0.2)] overflow-hidden"
          >
            {/* Shimmer Sweep Effect */}
            <div className="absolute inset-0 translate-x-[-150%] bg-linear-to-r from-transparent via-gold/10 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[150%]" />

            {/* Top Edge Highlight */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Icon / Seal Container */}
            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 group-hover:border-gold/30 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.4)]">
              <div className="relative flex h-full w-full items-center justify-center">
                {BRAND_LOGO_URL ? (
                  isVideoLogo ? (
                    <LoadingVideo
                      src={BRAND_LOGO_URL}
                      autoPlay
                      loop
                      muted
                      playsInline
                      isSmall
                      className="h-full w-full object-cover scale-128 select-none pointer-events-none"
                      wrapperClassName="w-full h-full"
                    />
                  ) : (
                    <div className="relative h-full w-full p-1.5 flex items-center justify-center">
                      <LoadingImage
                        src={BRAND_LOGO_URL}
                        alt={BRAND_NAME}
                        fill
                        className="object-contain p-1 select-none pointer-events-none"
                        wrapperClassName="w-full h-full"
                      />
                    </div>
                  )
                ) : (
                  <Globe className="h-4 w-4 text-slate-400 transition-colors duration-700 group-hover:text-gold" />
                )}
              </div>
            </div>

            {/* Text Container with Vertical Sliding Animation (Slot Machine Effect) */}
            <div className="relative ml-4 h-8 overflow-hidden pointer-events-none">
              <div className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-8">
                {/* Default State ) */}
                <div className="flex h-8 flex-col justify-center gap-0.5">
                  <span className="text-[7px] font-semibold uppercase tracking-[0.4em] text-slate-500">
                    Engineered by
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.15em] text-slate-300">{BRAND_NAME}</span>
                </div>

                {/* Hover State */}
                <div className="flex h-8 flex-col justify-center gap-0.5">
                  <span className="text-[7px] font-semibold uppercase tracking-[0.4em] text-gold/70">Developed by</span>
                  <span className="text-[11px] font-bold tracking-[0.15em] text-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                    {BRAND_NAME}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </ContainerLayout>
    </footer>
  );
}
