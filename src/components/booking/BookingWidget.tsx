"use client";
import { useCurrency } from "@/context/CurrencyContext";
import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { TravelerPicker } from "./TravelerPicker";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Check, Info, Zap, Banknote, CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";
import type { useBookingWidget } from "@/hooks/Booking/useBookingWidget";
import { useAuth } from "@/context/AuthContext";
import { useAvailability } from "@/hooks/date-availability/useAvailability";
import { useTogglePackageLike } from "@/hooks/Booking/packageLike/useTogglePackageLike";
import { useCheckPackageLike } from "@/hooks/Booking/packageLike/useCheckPackageLike";
import { PricingConfig } from "@/services/Booking/packageDetails/types";
import { calculateDynamicPricing } from "@/services/Booking/packageDetails/pricingUtils";

type TourType = {
  id?: string;
  slug?: string;
  title: string;
  price: number;
  discount?: number | string;
  likes: number;
  pricingConfig?: PricingConfig;
};

type BookingWidgetProps = {
  tour: TourType;
  booking: ReturnType<typeof useBookingWidget>;
  tourType?: string;
  className?: string;
};

const bookingAssurancesIcons = [Zap, Banknote, CalendarDays];

export function BookingWidget({ tour, booking, tourType, className = "" }: BookingWidgetProps) {
  const { formatPrice } = useCurrency();
  const t = useTranslations("Booking.Widget");
  const tForms = useTranslations("SharedForm");
  const rawAssurances = t.raw("assurances") as string[];
  const { user } = useAuth();
  const { closedDates, dateDetails, isLoadingDates } = useAvailability();
  const { handlePackageLikeToggle } = useTogglePackageLike();
  const { isLiked } = useCheckPackageLike(tour.id, user?.id);

  const travelerOptions = [
    {
      type: "adult",
      label: tForms("TravelerOptions.adult"),
      pluralLabel: tForms("TravelerOptions.adults"),
      ageRange: tForms("TravelerOptions.adultAge"),
    },
    {
      type: "couple",
      label: tForms("TravelerOptions.couple"),
      pluralLabel: tForms("TravelerOptions.couples"),
      ageRange: tForms("TravelerOptions.coupleAge"),
    },
    {
      type: "child",
      label: tForms("TravelerOptions.child"),
      pluralLabel: tForms("TravelerOptions.children"),
      ageRange: tForms("TravelerOptions.childAge"),
    },
    {
      type: "infant",
      label: tForms("TravelerOptions.infant"),
      pluralLabel: tForms("TravelerOptions.infants"),
      ageRange: tForms("TravelerOptions.infantAge"),
    },
  ];

  // Hook Data
  const {
    travelerCounts,
    journeyDate,
    setJourneyDate,
    handleTravelerChange,
    errors,
    setErrors,
    isLoading,
    handleBookingSubmit,
  } = booking;

  // ⭐ Fully Optimized Dynamic Pricing Calculation
  const { unitPrice, totalPrice, activeTier, totalPax, breakdown } = calculateDynamicPricing(
    tour.price,
    travelerCounts,
    tour.pricingConfig,
  );

  const childDiscountLabel =
    tour.pricingConfig?.passengerPricing?.childRateType === "fixed"
      ? t("childRateFixed")
      : t("childRatePercent", {
          percent:
            typeof tour.pricingConfig?.passengerPricing?.childRateValue === "number" &&
            tour.pricingConfig.passengerPricing.childRateValue > 0
              ? Number(tour.pricingConfig.passengerPricing.childRateValue)
              : 50,
        });

  return (
    <aside className={`mt-12 w-full md:mx-auto md:max-w-115 xl:mx-0 xl:mt-0 xl:w-[38%] xl:min-w-105 ${className}`}>
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar space-y-4 pb-4">
        {/* Like & Share Header */}
        <div className="flex items-center justify-between px-2">
          <span className="text-caption font-bold uppercase tracking-[0.2em] text-slate-400">{t("loveTour")}</span>
          <div className="flex items-center gap-3">
            <LikeButton
              showLabel={false}
              initialLikes={tour.likes || 0}
              initialIsLiked={isLiked}
              onToggle={async () => {
                if (!user?.id) {
                  alert(t("loginToLike"));
                  return;
                }
                if (!tour.id) return;
                await handlePackageLikeToggle(tour.id, user.id);
              }}
              countClassName="text-caption!"
              iconClassName="w-5 h-5 sm:w-5.5 sm:h-5.5"
              className="group glass-card flex h-10 w-auto items-center justify-center gap-2.5 rounded-full border border-white/5 px-4 transition-all duration-300 hover:border-gold/30 hover:scale-105 hover:bg-white/5 active:scale-95 shadow-[0_0_15px_rgba(197,160,89,0.1)] hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]"
            />

            <div className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-slate-400 transition-all duration-300 hover:scale-100 active:scale-95 hover:border-gold hover:text-gold shadow-[0_0_15px_rgba(197,160,89,0.1)] hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]">
              <ShareButton
                iconSize={20}
                title={tour.title}
                text={t("shareText", { title: tour.title })}
                url={`/booking/multi-days-tours/${tour.slug}`}
              />
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <form className="glass-card rounded-4xl p-6 shadow-2xl" onSubmit={handleBookingSubmit}>
          {/* Rate Header */}
          <div className="mb-6 border-b border-white/10 pb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="mb-1 text-caption font-bold uppercase tracking-[0.3em] text-gold">{t("Rate")}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-bold tracking-tighter text-white">{formatPrice(unitPrice)}</span>
                  <span className="text-caption font-bold uppercase tracking-widest text-slate-400">
                    {t("perPerson")}
                  </span>
                </div>
              </div>
              {tour.discount && Number(tour.discount) > 0 && (
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-tiny font-bold uppercase tracking-widest text-gold">
                  {t("save", { discount: Number(tour.discount) })}
                </span>
              )}
            </div>

            {/* Active Tier or Group Discount Banner */}
            <div className="relative mt-2 p-3 rounded-xl border border-gold/20 bg-gold/5 overflow-hidden">
              <div
                className="absolute -inset-0.5 rounded-[13px] animate-spin-slow opacity-80"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, #c5a059 20deg, #f1d592 60deg, #c5a059 100deg, transparent 180deg)",
                }}
              />
              <div className="absolute inset-0.5 rounded-xl bg-[#0a0a0a]" />
              <div className="relative z-10 flex flex-col items-center gap-1">
                <h4 className="flex items-center justify-center gap-1.5 text-[11px] sm:text-[12px] md:text-[12px] font-black uppercase tracking-widest text-gold">
                  <span className="text-[14px] sm:text-[16px] md:text-[18px]">✨</span>
                  {activeTier
                    ? Number(activeTier.minPax) === Number(activeTier.maxPax)
                      ? t("paxTierSingle", { count: activeTier.minPax })
                      : t("paxTier", { min: activeTier.minPax, max: activeTier.maxPax })
                    : t("groupDiscount")}
                </h4>
                <p className="text-[12px] sm:text-[13px] md:text-[13px] font-medium text-slate-400 italic leading-tight text-center">
                  {totalPax > 0 ? t("activeRateApplied", { price: formatPrice(unitPrice) }) : t("priceDecreases")}
                </p>
              </div>
            </div>
          </div>

          {/* Form Inputs: Date & Travelers */}
          <div className="mb-5 space-y-4">
            <div className="space-y-2">
              <label className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold/80">
                {tForms("Labels.journeyDate")}
              </label>
              <CustomDatePicker
                value={journeyDate}
                closedDates={closedDates}
                dateDetails={dateDetails}
                tourType={tourType}
                isLoading={isLoadingDates}
                onChange={(d) => {
                  setJourneyDate(d);
                  if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                }}
              />
              <div className="ml-2">
                <FormError message={errors.date} />
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="ml-1 block text-caption font-bold uppercase tracking-[0.2em] text-gold/80">
                {tForms("Labels.travelers")}
              </label>
              <TravelerPicker
                options={travelerOptions}
                counts={travelerCounts}
                isLoading={isLoading}
                onChange={(type, delta) => {
                  handleTravelerChange(type, delta);
                  if (errors.travelers) setErrors((prev) => ({ ...prev, travelers: "" }));
                }}
              />
              <div className="ml-2">
                <FormError message={errors.travelers} />
              </div>
            </div>
          </div>

          {/* ⭐ LIVE PRICE BREAKDOWN & ESTIMATED TOTAL (Updates instantly as travelers change!) */}
          {totalPax > 0 && (
            <div className="mb-5 rounded-2xl border border-gold/25 bg-white/2 p-4 space-y-2.5 transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("priceCalculation", { count: totalPax })}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                  {t("tierApplied")}
                </span>
              </div>

              {/* Adults Row */}
              {breakdown.adults.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    {breakdown.adults.count} × {tForms("TravelerOptions.adult")} ({formatPrice(breakdown.adults.unitPrice)})
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.adults.total)}</span>
                </div>
              )}

              {/* Couples Row */}
              {breakdown.couples.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    {breakdown.couples.count} × {tForms("TravelerOptions.couple")} ({formatPrice(breakdown.couples.unitPrice)})
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.couples.total)}</span>
                </div>
              )}

              {/* Children Row (with discount callout) */}
              {breakdown.children.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    {breakdown.children.count} × {tForms("TravelerOptions.child")}
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      {childDiscountLabel}
                    </span>
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.children.total)}</span>
                </div>
              )}

              {/* Infants Row */}
              {breakdown.infants.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    {breakdown.infants.count} × {tForms("TravelerOptions.infant")}
                    {breakdown.infants.unitPrice === 0 && (
                      <span className="text-[10px] text-slate-400 font-bold bg-white/5 px-1.5 py-0.2 rounded">
                        {t("free")}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-emerald-400">{formatPrice(breakdown.infants.total)}</span>
                </div>
              )}

              {/* Final Estimated Total */}
              <div className="flex items-center justify-between pt-2.5 border-t border-gold/20">
                <div>
                  <span className="block text-[11px] font-black uppercase tracking-widest text-gold">
                    {t("estimatedTotal")}
                  </span>
                  <span className="text-[10px] text-slate-500">{t("taxesIncluded")}</span>
                </div>
                <span className="text-[22px] font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(197,160,89,0.3)]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            variant="auth"
            className="md:min-w-90! w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? tForms("ButtonsLoading.checkingAvailability") : tForms("Buttons.checkAvailability")}
          </Button>

          {/* Assurances Footer */}
          <div className="space-y-3 border-t border-white/5 pt-4 mt-4">
            {rawAssurances &&
              rawAssurances.map((assurance, idx) => {
                const Icon = bookingAssurancesIcons[idx] || Check;
                return (
                  <p
                    key={assurance}
                    className="flex items-center justify-center gap-3 text-caption font-bold uppercase tracking-widest text-slate-400"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold" />
                    {assurance}
                  </p>
                );
              })}
            <div className="mt-4 rounded-xl border border-gold/10 bg-gold/5 p-3">
              <p className="text-center text-tiny font-medium uppercase leading-relaxed tracking-[0.15em] text-slate-300">
                <Info className="relative top-[-1.5px] md:top-[-0.5px] mr-1.5 inline-block h-4 w-4 text-gold opacity-70 3xl:h-5 3xl:w-5" />
                {t("priceMayVary")}
              </p>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
}
