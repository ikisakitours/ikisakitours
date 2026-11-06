"use client";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { motion } from "framer-motion";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { contactCtaImagesData } from "@/data/home";
import SectionBadge from "@/components/home/Events/SectionBadge";
import { useReviews } from "@/hooks/testimonials/useFetchReviews";
import { useTranslations } from "next-intl";
//Icons
import { MapPin, Star, ArrowRight, Clock } from "lucide-react";
interface HomeContactCTAProps {
  hideOnMobile?: boolean;
}

export default function HomeContactCTA({ hideOnMobile = false }: HomeContactCTAProps) {
  const t = useTranslations("HomePage.ContactCta");
  const { data: reviewsData, isLoading } = useReviews();

  const backendAvatars = reviewsData?.comments?.slice(0, 3) || [];

  const getInitials = (name?: string) => {
    const clean = (name || "").trim();
    if (!clean) return "U";
    return Array.from(clean).slice(0, 2).join("").toUpperCase();
  };

  const totalCount = reviewsData?.totalComments ?? 0;
  const formattedCount = totalCount > 999 ? `${Math.floor(totalCount / 1000)}k+` : totalCount;

  const ratings = (reviewsData?.comments ?? [])
    .map((c) => c.rating)
    .filter((r): r is number => typeof r === "number" && r > 0);

  const averageRating =
    reviewsData?.averageRating && reviewsData.averageRating > 0
      ? reviewsData.averageRating
      : ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

  const displayRating = averageRating > 0 ? Math.min(averageRating, 5) : 5;

  const hasReviews = totalCount > 0 && backendAvatars.length > 0;
  return (
    <section
      id="contact"
      className={`relative overflow-hidden bg-lanka-dark py-20 md:py-20 xl:py-20 2xl:py-24 3xl:py-32 ${
        hideOnMobile ? "hidden md:block" : ""
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-gold/5 blur-[120px]" />

      {/* Background Watermark */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center overflow-hidden mt-2">
        <span className="select-none leading-none text-[20vw] lg:text-[18vw] 2xl:text-[20vw] font-black uppercase tracking-tighter text-white/2">
          {t("watermark")}
        </span>
        <span className="select-none text-[5vw] lg:text-[4vw] 2xl:text-[4.5vw] font-bold uppercase tracking-[0.5em] text-white/2 -mt-2 sm:-mt-4 lg:-mt-6 ml-[0.5em]">
          {t("watermarkSub")}
        </span>
      </div>

      {/* Reusable Container Layout */}
      <ContainerLayout className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-12 xl:gap-24">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-1/2 space-y-10"
          >
            {/* Top Badge */}

            <SectionBadge badge={t("badge")} />
            {/* Heading */}
            <h2 className="text-heading-section font-serif text-white leading-[1.1] tracking-tight">
              {t("titlePart1")} <br />
              <span className="relative mt-2 inline-block">
                <span className="relative z-10 pr-4 font-light italic text-gold">{t("titleAccent")}</span>
                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-2 bg-gold/20"></span>
              </span>
              <br />
              {t("titlePart2")}
            </h2>

            <p className="max-w-lg text-body font-light leading-relaxed text-slate-400">{t("description")}</p>

            {/* CTA Buttons & Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <Button variant="inquire" href="/contact" className="text-caption! group shrink-0">
                {t("ctaButtonText")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </Button>

              {isLoading ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-8 animate-pulse">
                  <span className="sr-only">{t("loadingReviews")}</span>
                  <div className="flex -space-x-2" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#050505] bg-white/10" />
                    ))}
                  </div>
                  <div className="space-y-2" aria-hidden="true">
                    <div className="h-3.5 w-24 rounded bg-white/10" />
                    <div className="h-3 w-32 rounded bg-white/10" />
                  </div>
                </div>
              ) : hasReviews ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                  <div className="flex -space-x-2">
                    {backendAvatars.map((user, idx) => (
                      <div
                        key={user.id || idx}
                        style={{ zIndex: backendAvatars.length - idx }}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#050505] bg-[#0a0a0a]"
                      >
                        {user.avatarUrl ? (
                          <LoadingImage
                            src={user.avatarUrl}
                            alt={user.authorName || t("imagesAlt.userAvatar")}
                            fill
                            sizes="40px"
                            isSmall
                            className="object-cover"
                            wrapperClassName="w-full h-full"
                          />
                        ) : (
                          <div
                            aria-label={user.authorName || t("imagesAlt.userAvatar")}
                            className="flex h-full w-full items-center justify-center bg-linear-to-br from-gold/30 to-gold/10 text-caption font-bold uppercase tracking-wider text-gold"
                          >
                            {getInitials(user.authorName)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-1 text-gold" aria-label={`Rating ${displayRating.toFixed(1)} out of 5`}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const fillPercent = Math.min(Math.max(displayRating - (star - 1), 0), 1) * 100;
                        return (
                          <span key={star} className="relative inline-block h-3.5 w-3.5 shrink-0">
                            <Star className="absolute inset-0 h-3.5 w-3.5 text-gold/30" />
                            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                              <Star className="h-3.5 w-3.5 shrink-0 fill-gold text-gold" />
                            </span>
                          </span>
                        );
                      })}
                    </div>
                    <p className="mt-1 text-caption uppercase tracking-widest text-white/50">
                      {`${averageRating > 0 ? averageRating.toFixed(1) + " · " : ""}${t("lovedBy", { count: formattedCount })}`}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                    <Clock className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-sm font-bold text-white">{t("replyTitle")}</p>
                    <p className="mt-0.5 text-caption uppercase tracking-widest text-white/50">{t("replySub")}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Image Composition (Editorial Style) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="relative w-full lg:w-1/2"
          >
            {/* Main Tall Image */}
            <div className="relative z-10 ml-auto aspect-3/4 w-[85%] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl md:w-[75%]">
              <LoadingImage
                src={contactCtaImagesData[0].src}
                alt={t("imagesAlt.mainExperience")}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1024px) 75vw, 40vw"
                className="object-cover hover:scale-105"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Square Image */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute -bottom-10 left-0 z-20 aspect-square w-[45%] overflow-hidden rounded-3xl border-4 border-[#050505] shadow-2xl md:w-[40%]"
            >
              <LoadingImage
                src={contactCtaImagesData[1].src}
                alt={t("imagesAlt.detailShot")}
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1024px) 40vw, 20vw"
                className="object-cover"
                wrapperClassName="w-full h-full"
              />
            </motion.div>

            {/* Floating Glassmorphism Badge*/}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              className="absolute -left-1 md:left-28 lg:left-10 2xl:left-18 3xl:left-30 top-10 z-30 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div className="pr-2">
                  <p className="text-body font-bold text-white">{t("localExpertsText")}</p>
                  <p className="mt-0.5 text-body-sm font-bold uppercase tracking-widest gold-gradient-text">
                    {t("supportText")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
