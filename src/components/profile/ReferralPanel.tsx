"use client";
import { useState, useRef, useEffect } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";
import { Copy, CheckCircle2, Gift, Users, Coins } from "lucide-react";
import { SiWhatsapp, SiLine } from "react-icons/si";

//Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ReferralPanel() {
  const t = useTranslations("ProfilePage.ReferralPanel");

  const [isCopied, setIsCopied] = useState(false);

  const referralCode = "MAPMATE-ALEX24";
  const referralLink = `https://mapmate.lk/invite/${referralCode}`;
  const stats = {
    invitesSent: 12,
    friendsJoined: 3,
    totalEarned: "$150",
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll Position Checker
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition(); // Initial check
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition); // Update on resize
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // 1. Copy to Clipboard Logic
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // 3. WhatsApp Direct Share Logic
  const handleWhatsappShare = () => {
    const text = encodeURIComponent(
      `Hey! I found this amazing travel concierge in Sri Lanka. Use my link to get an exclusive discount on your first booking: ${referralLink}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleLineShare = () => {
    const text = encodeURIComponent(
      `Hey! I found this amazing travel concierge in Sri Lanka. Use my link to get an exclusive discount on your first booking: ${referralLink}`,
    );
    window.open(`https://line.me/R/msg/text/?${text}`, "_blank");
  };
  return (
    <section className="animate-fade-in-up space-y-8">
      {/* Main Referral Card */}
      <div className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-12">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />

        <div className="relative z-10">
          <div className="mb-8 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Gift className="h-6 w-6" />
              </div>
              <h2 className="premium-serif text-heading-sub text-white">{t("title")}</h2>
            </div>

            <p className="text-body-sm text-slate-400 text-left">{t("subtitle")}</p>
          </div>

          {/* Referral Stats (Industry Standard Layout) */}
          {/* 🌟 Stats Section with Scroll Logic */}
          <div className="mb-10 relative group">
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              // Mobile: Flex row with scroll (snap), md (Tablet/Desktop): Grid layout
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible"
            >
              <div className="snap-center min-w-[75%] shrink-0 md:min-w-0 md:shrink">
                <StatCard icon={<Coins />} title={t("stats.earned")} value={stats.totalEarned} highlight />
              </div>
              <div className="snap-center min-w-[75%] shrink-0 md:min-w-0 md:shrink">
                <StatCard icon={<Users />} title={t("stats.invites")} value={stats.invitesSent} />
              </div>
              <div className="snap-center min-w-[75%] shrink-0 md:min-w-0 md:shrink">
                <StatCard icon={<CheckCircle2 />} title={t("stats.joined")} value={stats.friendsJoined} />
              </div>
            </div>

            {/* Scroll Buttons (Only visible on mobile/small screens if scrolling is needed) */}
            <div className="mt-4 flex justify-end gap-2 md:hidden">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                  ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:border-gold hover:bg-gold hover:text-black cursor-pointer"}`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                 ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:border-gold hover:bg-gold hover:text-black cursor-pointer"}`}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* Reward Banner */}
          <div className="mb-10 rounded-2xl border border-gold/30 bg-linear-to-r from-gold/10 via-gold/5 to-transparent p-6 sm:p-8">
            <h3 className="mb-2 text-heading-card font-bold text-white">
              {t("offerTitle")} <span className="gold-gradient-text">{t("offerAmount")}</span>
            </h3>
            <p className="text-body-sm leading-relaxed text-slate-300 max-w-lg">{t("offerDescription")}</p>
          </div>

          {/* Referral Link & Actions */}
          <div className="mb-12 space-y-4">
            <span className="block text-caption font-bold uppercase tracking-[0.2em] text-gold">{t("yourLink")}</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative max-w-lg flex flex-1 items-center rounded-xl border border-white/10 bg-white/5 p-1 pl-4 transition-colors hover:border-gold/30">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full truncate bg-transparent text-body-sm font-medium tracking-wide text-white outline-none sm:text-sm"
                />
                <button
                  onClick={handleCopy}
                  className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isCopied ? "bg-emerald-500/20 text-emerald-400" : "bg-gold text-black hover:bg-gold-light"
                  }`}
                >
                  {isCopied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {isCopied ? t("copied") : t("copy")}
                </button>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleWhatsappShare}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white"
                  title="Share on WhatsApp"
                >
                  <SiWhatsapp className="h-5 w-5" />
                </button>

                <button
                  onClick={handleLineShare}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00B900]/20 bg-[#00B900]/10 text-[#00B900] transition-colors hover:bg-[#00B900] hover:text-white"
                  title="Share on LINE"
                >
                  <SiLine className="h-5 w-5" />
                </button>

                <ShareButton
                  title="Join me on MapMate!"
                  text="Use my invite code to get 10% off on your first luxury tour in Sri Lanka."
                  url={`/invite/${referralCode}`}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300! hover:border-gold hover:text-gold!"
                  iconClassName="h-5 w-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Stat Card Component
function StatCard({
  icon,
  title,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 ${
        highlight ? "border-gold/30 bg-gold/5" : "border-white/5 bg-white/3"
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${
          highlight ? "bg-gold/20 text-gold" : "bg-white/5 text-slate-400"
        }`}
      >
        <div className="[&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      </div>
      <h4 className="mb-1 text-caption font-bold uppercase tracking-widest text-slate-500 leading-tight">{title}</h4>
      <span className={`text-heading-sub font-black ${highlight ? "gold-gradient-text" : "text-white"}`}>{value}</span>
    </div>
  );
}
