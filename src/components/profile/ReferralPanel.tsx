"use client";
import { useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";
import { Copy, CheckCircle2, Gift, Users, Coins } from "lucide-react";
import { SiWhatsapp, SiLine } from "react-icons/si";

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
          <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <h2 className="premium-serif text-2xl text-white">{t("title")}</h2>
              <p className="text-xs text-slate-400 mt-1">{t("subtitle")}</p>
            </div>
          </div>

          {/* Referral Stats (Industry Standard Layout) */}
          <div className="mb-10 grid grid-cols-3 gap-2 sm:gap-4">
            <StatCard icon={<Users />} title={t("stats.invites")} value={stats.invitesSent} />
            <StatCard icon={<CheckCircle2 />} title={t("stats.joined")} value={stats.friendsJoined} />
            <StatCard icon={<Coins />} title={t("stats.earned")} value={stats.totalEarned} highlight />
          </div>

          {/* Reward Banner */}
          <div className="mb-10 rounded-2xl border border-gold/30 bg-linear-to-r from-gold/10 via-gold/5 to-transparent p-6 sm:p-8">
            <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
              {t("offerTitle")} <span className="gold-gradient-text">{t("offerAmount")}</span>
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm max-w-lg">{t("offerDescription")}</p>
          </div>

          {/* Referral Link & Actions */}
          <div className="mb-12 space-y-4">
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{t("yourLink")}</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex flex-1 items-center rounded-xl border border-white/10 bg-white/5 p-1 pl-4 transition-colors hover:border-gold/30">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full bg-transparent text-xs font-medium tracking-wide text-white outline-none sm:text-sm"
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
      className={`flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border p-3 sm:p-6 text-center ${highlight ? "border-gold/30 bg-gold/5" : "border-white/5 bg-white/3"}`}
    >
      <div
        className={`mb-1.5 sm:mb-3 flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full ${highlight ? "bg-gold/20 text-gold" : "bg-white/5 text-slate-400"}`}
      >
        <div className="[&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4">{icon}</div>
      </div>
      <h4 className="mb-0.5 sm:mb-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-tight sm:tracking-widest text-slate-500 leading-tight">
        {title}
      </h4>
      <span className={`text-sm sm:text-2xl font-black ${highlight ? "gold-gradient-text" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
