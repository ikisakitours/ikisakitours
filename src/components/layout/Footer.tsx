import Image from "next/image";
import Link from "next/link";
import { footerLinks, socialLinks, legalLinks, contactInfo } from "@/data/navigation";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
//Icons
import { Heart, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import TimeDiv from "@/data/TimeDiv";
const socialLinksIcons = [FaInstagram, FaTiktok, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp];
const contactInfoIcons = [MapPin, Phone, Mail];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050505] pt-20 pb-10">
      <div className="absolute bottom-0 left-1/2 -z-10 h-75 w-75 -translate-x-1/2 rounded-full bg-gold/5 blur-[100px] md:w-200" />

      {/* MAPMATE Watermark */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 flex select-none justify-center overflow-hidden opacity-[0.03]">
        <span className="text-[12vw] font-black uppercase leading-none tracking-tighter text-white">MAPMATE</span>
      </div>

      <ContainerLayout className="relative z-10">
        <div className="mb-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 flex flex-col items-center space-y-6 text-center sm:items-start sm:text-left">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-light tracking-[0.2em] text-white">
                MAP<span className="font-normal italic text-gold">MATE</span>
              </h3>
              <div className="h-4 w-6 overflow-hidden rounded-sm border border-white/10 shadow-lg">
                <Image
                  src="https://flagcdn.com/w80/lk.png"
                  alt="Sri Lanka Flag"
                  width={80}
                  height={53}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="max-w-xs text-base font-light leading-relaxed text-slate-200">
              Discover the soul of the Indian Ocean. From misty mountains to golden shores, we curate authentic luxury
              experiences.
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

          <div className="lg:col-span-2 text-center sm:text-left lg:pl-4">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-light text-slate-300 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 text-center sm:text-left">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">Contact Us</h4>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => {
                const Icon = contactInfoIcons[index];
                return (
                  <li key={index} className="group flex items-start justify-center space-x-3 sm:justify-start">
                    <Icon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span
                      className={`text-base font-light leading-relaxed text-slate-300 ${item.label.includes("@") ? "transition-colors group-hover:text-gold" : ""}`}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3 text-center sm:text-left">
            <h4 className="mb-5 text-sm sm:text-base font-black uppercase tracking-[0.3em] text-white">Newsletter</h4>
            <p className="mb-6 text-base font-light text-slate-300">
              Get weekly travel tips and exclusive hidden gems.
            </p>
            <form className="relative mx-auto max-w-xs sm:mx-0">
              <input
                type="email"
                placeholder="Your email..."
                required
                aria-label="Your email"
                className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white transition-all placeholder:text-slate-400 focus:border-gold/60 focus:outline-none [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(20,20,20)] [&:-webkit-autofill]:text-white [-webkit-text-fill-color:white]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black transition-all hover:scale-105 hover:bg-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mb-10 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Footer bottom section - Layout unchanged */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300 lg:text-left">
            &copy; 2026 MapMate Luxury. Crafted with
            <Heart className="inline h-3 w-3 animate-pulse text-gold" fill="currentColor" /> for travelers.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </ContainerLayout>
    </footer>
  );
}
