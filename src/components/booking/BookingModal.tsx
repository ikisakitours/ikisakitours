"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Minus, Check, Sparkles, Users, BedDouble, PackagePlus, ChevronDown, Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { useCurrency } from "@/context/CurrencyContext";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { PricingConfig, PricingOption, PricingOptionLocalization } from "@/services/Booking/packageDetails/types";
import { CategoryBreakdown } from "@/services/Booking/packageDetails/pricingUtils";
import { DateDetailItem } from "@/services/date-availability/availabilityService";

interface BookingModalTour {
  title: string;
  pricingConfig?: PricingConfig;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: BookingModalTour;
  tourType?: string;
  journeyDate: string;
  setJourneyDate: (date: string) => void;
  travelerCounts: Record<string, number>;
  handleTravelerChange: (type: string, delta: number) => void;
  selectedOptions: Record<string, { count: number; checked: boolean }>;
  handleOptionToggle: (optionId: string, isChecked: boolean) => void;
  handleOptionCountChange: (optionId: string, delta: number, maxCount?: number) => void;
  onConfirmBooking: () => Promise<void>;
  isLoading: boolean;
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  baseCalculations: {
    unitPrice: number;
    totalPrice: number;
    totalPax: number;
    breakdown: {
      adults?: CategoryBreakdown;
      couples?: CategoryBreakdown;
      children?: CategoryBreakdown;
      infants?: CategoryBreakdown;
    };
  };
  closedDates?: string[];
  dateDetails?: Record<string, DateDetailItem>;
  isLoadingDates?: boolean;
}

export function BookingModal({
  isOpen,
  onClose,
  tour,
  tourType,
  journeyDate,
  setJourneyDate,
  travelerCounts,
  handleTravelerChange,
  selectedOptions,
  handleOptionToggle,
  handleOptionCountChange,
  onConfirmBooking,
  isLoading,
  errors,
  setErrors,
  baseCalculations,
  closedDates,
  dateDetails,
  isLoadingDates,
}: BookingModalProps) {
  const { formatPrice } = useCurrency();
  const locale = useLocale();
  const tModal = useTranslations("Booking.Modal");
  const tWidget = useTranslations("Booking.Widget");
  const tSticky = useTranslations("Booking.StickyBar");
  const tRelated = useTranslations("Booking.Related");
  const tForms = useTranslations("SharedForm");
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const toggleOptionDetails = (optionId: string) => {
    setExpandedDetails((prev) => ({ ...prev, [optionId]: !prev[optionId] }));
  };

  const onTravelerChange = (type: string, delta: number) => {
    handleTravelerChange(type, delta);
    if (errors?.travelers && setErrors) {
      setErrors((prev) => ({ ...prev, travelers: "" }));
    }
  };

  // Scroll modal content to top whenever a date/traveler validation error is triggered
  useEffect(() => {
    if (isOpen && (errors?.date || errors?.travelers)) {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isOpen, errors?.date, errors?.travelers]);

  // Lock background page scroll completely (desktop + mobile/touch) while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const html = document.documentElement;

    // If StickyBookingBar already locked body with position: fixed, preserve its saved scrollY
    const alreadyFixed = body.style.position === "fixed";
    const scrollY = alreadyFixed ? Math.abs(parseInt(body.style.top || "0", 10)) || 0 : window.scrollY;

    const previous = {
      htmlOverflow: html.style.overflow,
      position: alreadyFixed ? "" : body.style.position,
      top: alreadyFixed ? "" : body.style.top,
      left: alreadyFixed ? "" : body.style.left,
      right: alreadyFixed ? "" : body.style.right,
      width: alreadyFixed ? "" : body.style.width,
      overflow: alreadyFixed ? "" : body.style.overflow,
    };

    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;

      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const options: PricingOption[] = tour.pricingConfig?.options || [];

  const getOptionCalcType = (opt: PricingOption) => opt.calculationType || opt.type || "per_booking";

  const isOneTimeBookingOption = (calcType: string) => calcType === "per_booking" || calcType === "flat";

  const getOptionMaxCount = (opt: PricingOption) => {
    const calcType = getOptionCalcType(opt);
    if (isOneTimeBookingOption(calcType)) return 1;
    if (calcType === "per_person") {
      return Math.max(1, baseCalculations.totalPax);
    }
    if (calcType === "per_room") {
      return Math.max(1, baseCalculations.totalPax, 10);
    }
    return 50;
  };

  const getOptionEffectiveCount = (opt: PricingOption) => {
    const state = selectedOptions[opt.id];
    if (!state || !state.checked) return 0;
    const calcType = getOptionCalcType(opt);
    if (isOneTimeBookingOption(calcType)) return 1;
    const maxCount = getOptionMaxCount(opt);
    return Math.min(Math.max(1, state.count || 1), maxCount);
  };

  const getUnitLabel = (calcType: string) => {
    switch (calcType) {
      case "per_person":
        return tSticky("perPerson");
      case "per_room":
        return tModal("perRoom");
      case "per_day":
        return tModal("perDay");
      case "per_night":
        return tModal("perNight");
      default:
        return tModal("perBooking");
    }
  };

  const childDiscountLabel =
    tour.pricingConfig?.passengerPricing?.childRateType === "fixed"
      ? tWidget("childRateFixed")
      : tWidget("childRatePercent", {
          percent:
            typeof tour.pricingConfig?.passengerPricing?.childRateValue === "number" &&
            tour.pricingConfig.passengerPricing.childRateValue > 0
              ? Number(tour.pricingConfig.passengerPricing.childRateValue)
              : 50,
        });

  const getLocalizedText = (field: PricingOptionLocalization | string | unknown) => {
    if (typeof field === "object" && field !== null) {
      const loc = field as Record<string, string | undefined>;
      return loc[locale] || loc.en || Object.values(loc).find(Boolean) || "";
    }
    return field ? String(field) : "";
  };

  // Calculate Extra Options Total using each option's guest-chosen quantity
  const selectedOptionItems = options
    .map((opt) => {
      const count = getOptionEffectiveCount(opt);
      if (count <= 0) return null;
      const calcType = getOptionCalcType(opt);
      const price = Number(opt.price) || 0;
      return {
        opt,
        count,
        isOneTime: isOneTimeBookingOption(calcType),
        name: getLocalizedText(opt.name),
        subtotal: price * count,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const optionsTotal = selectedOptionItems.reduce((sum, item) => sum + item.subtotal, 0);
  const grandTotal = baseCalculations.totalPrice + optionsTotal;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-200 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop: blocks touch/scroll behind the modal */}
      <div
        onClick={onClose}
        className="absolute inset-0 touch-none bg-black/85 backdrop-blur-md"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl border border-gold/20 bg-[#0c0c0c] text-white shadow-2xl overflow-hidden"
      >
        {/* Header: Label + Close button on top row, full-width Tour Title below */}
        <div className="border-b border-white/10 px-5 sm:px-6 py-4 bg-white/2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              {tModal("reviewBookingDetails")}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-gold/50 hover:bg-gold hover:text-black hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] cursor-pointer"
              aria-label={tSticky("closeModal")}
            >
              <X className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>
          <h3 className="mt-1.5 w-full text-base sm:text-lg font-bold text-white leading-snug">
            {tour.title}
          </h3>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 custom-scrollbar"
        >
          {/* 1. Date of Use */}
          <div className="space-y-2 pb-4 border-b border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {tForms("Labels.journeyDate")} <span className="text-gold">*</span>
              </label>
            </div>
            <CustomDatePicker
              value={journeyDate}
              tourType={tourType}
              closedDates={closedDates}
              dateDetails={dateDetails}
              isLoading={isLoadingDates}
              onChange={(d) => {
                setJourneyDate(d);
                if (errors?.date && setErrors) {
                  setErrors((prev) => ({ ...prev, date: "" }));
                }
              }}
            />
            <FormError message={errors?.date} />
          </div>

          {/* 2. Number of Travelers */}
          <div className="space-y-2 pb-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {tForms("Labels.travelers")} <span className="text-gold">*</span>
              </label>
              <span className="text-[11px] font-semibold text-gold bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded-full">
                {tModal("guestsTotal", { count: baseCalculations.totalPax })}
              </span>
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
              <div>
                <p className="font-semibold text-white">
                  {tForms("TravelerOptions.adults")} ({tForms("TravelerOptions.adultAge")})
                </p>
                <p className="text-xs text-gold">
                  {formatPrice(baseCalculations.unitPrice)} {tSticky("perPerson")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onTravelerChange("adult", -1)}
                  disabled={travelerCounts.adult <= 0}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold">{travelerCounts.adult || 0}</span>
                <button
                  type="button"
                  onClick={() => onTravelerChange("adult", 1)}
                  className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Couples */}
            <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
              <div>
                <p className="font-semibold text-white">
                  {tForms("TravelerOptions.couples")} ({tForms("TravelerOptions.coupleAge")})
                </p>
                <p className="text-xs text-gold">
                  {formatPrice(baseCalculations.breakdown?.couples?.unitPrice ?? baseCalculations.unitPrice * 2)}{" "}
                  {tModal("perPair")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onTravelerChange("couple", -1)}
                  disabled={travelerCounts.couple <= 0}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold">{travelerCounts.couple || 0}</span>
                <button
                  type="button"
                  onClick={() => onTravelerChange("couple", 1)}
                  className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
              <div>
                <p className="font-semibold text-white">
                  {tForms("TravelerOptions.children")} ({tForms("TravelerOptions.childAge")})
                </p>
                <p className="text-xs text-emerald-400">
                  {formatPrice(baseCalculations.breakdown?.children?.unitPrice ?? baseCalculations.unitPrice * 0.5)}{" "}
                  ({childDiscountLabel})
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onTravelerChange("child", -1)}
                  disabled={travelerCounts.child <= 0}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold">{travelerCounts.child || 0}</span>
                <button
                  type="button"
                  onClick={() => onTravelerChange("child", 1)}
                  className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between py-2 text-sm">
              <div>
                <p className="font-semibold text-white">
                  {tForms("TravelerOptions.infants")} ({tForms("TravelerOptions.infantAge")})
                </p>
                <p className="text-xs text-slate-400">
                  {baseCalculations.breakdown?.infants?.unitPrice && baseCalculations.breakdown.infants.unitPrice > 0
                    ? `${formatPrice(baseCalculations.breakdown.infants.unitPrice)} ${tModal("perInfant")}`
                    : tWidget("free")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onTravelerChange("infant", -1)}
                  disabled={!travelerCounts.infant || travelerCounts.infant <= 0}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold">{travelerCounts.infant || 0}</span>
                <button
                  type="button"
                  onClick={() => onTravelerChange("infant", 1)}
                  className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <FormError message={errors?.travelers} />
          </div>

          {/* 3. Optional Extras / Tour Add-Ons */}
          {options.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 w-full">
                  <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {tModal("addOnsTitle")}
                  </label>
                </div>
                <span className="self-end text-right text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                  {tModal("optionalSelectQty")}
                </span>
              </div>

              <div className="space-y-2.5">
                {options.map((opt) => {
                  const state = selectedOptions[opt.id] || { checked: false, count: 0 };
                  const isChecked = state.checked;
                  const calcType = getOptionCalcType(opt);
                  const isPerPerson = calcType === "per_person";
                  const isPerRoom = calcType === "per_room";
                  const isOneTime = isOneTimeBookingOption(calcType);
                  const maxCount = getOptionMaxCount(opt);
                  const effectiveCount = isChecked ? getOptionEffectiveCount(opt) : 0;
                  const unitPrice = Number(opt.price) || 0;
                  const lineSubtotal = unitPrice * effectiveCount;

                  const nameText = getLocalizedText(opt.name);
                  const descText = getLocalizedText(opt.description);
                  const isDetailsOpen = Boolean(expandedDetails[opt.id]);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleOptionToggle(opt.id, !isChecked)}
                      className={`group cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${isChecked
                          ? "border-gold/50 bg-gold/4 shadow-[0_0_20px_rgba(197,160,89,0.12)]"
                          : "border-white/10 bg-white/2 hover:border-white/25 hover:bg-white/3"
                        }`}
                    >
                      {/* Top Row: Checkbox + Full Title */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isChecked
                              ? "border-gold bg-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.4)]"
                              : "border-slate-500 bg-transparent group-hover:border-gold/60"
                            }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-3" />}
                        </div>

                        <p className="text-sm font-semibold text-white leading-snug">{nameText}</p>
                      </div>

                      {/* Second Row: Details Button (Left) & Inline Unit Price (Right) */}
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          {descText && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOptionDetails(opt.id);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-gold transition-colors cursor-pointer"
                            >
                              <Info className="w-3 h-3 text-gold/80 shrink-0" />
                              <span className="mt-1">
                                {isDetailsOpen ? tModal("hideDetails") : tRelated("details")}
                              </span>
                              <ChevronDown
                                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isDetailsOpen ? "rotate-180" : ""
                                  }`}
                              />
                            </button>
                          )}
                        </div>

                        <div className="shrink-0 whitespace-nowrap text-right">
                          <span className="text-sm font-bold text-gold">+{formatPrice(unitPrice)}</span>
                          <span className="text-[11px] font-medium text-slate-400"> {getUnitLabel(calcType)}</span>
                        </div>
                      </div>

                      {/* Expandable Full Details (Only shown when Details button is clicked) */}
                      {descText && isDetailsOpen && (
                        <p
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 text-xs text-slate-400 leading-relaxed animate-in fade-in duration-150"
                        >
                          {descText}
                        </p>
                      )}

                      {/* Expanded Quantity Selector Row when Checked (Not shown for one-time per_booking/flat fees) */}
                      {isChecked && !isOneTime && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 pt-3 border-t border-gold/15 flex flex-wrap items-center justify-between gap-2 animate-in fade-in duration-200"
                        >
                          <div className="flex items-start gap-2 text-xs">
                            {isPerPerson ? (
                              <Users className="w-3.5 h-3.5 text-gold/80 shrink-0 mt-0.5" />
                            ) : isPerRoom ? (
                              <BedDouble className="w-3.5 h-3.5 text-gold/80 shrink-0 mt-0.5" />
                            ) : (
                              <PackagePlus className="w-3.5 h-3.5 text-gold/80 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="text-slate-300 font-medium leading-tight">
                                {isPerPerson
                                  ? tModal("guestsUsingThis")
                                  : isPerRoom
                                    ? tModal("roomsNeeded")
                                    : tModal("quantity")}
                              </div>
                              <div className="mt-0.5 text-[11px] text-gold font-semibold">
                                {formatPrice(unitPrice)} × {effectiveCount} = {formatPrice(lineSubtotal)}
                              </div>
                            </div>
                          </div>

                          {/* Pill Stepper Control */}
                          <div className="flex items-center gap-2.5 rounded-full border border-gold/25 bg-black/60 px-2 py-1">
                            <button
                              type="button"
                              onClick={() => handleOptionCountChange(opt.id, -1, maxCount)}
                              disabled={effectiveCount <= 1}
                              className="w-6.5 h-6.5 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:border-gold hover:text-white disabled:opacity-30 disabled:hover:border-white/10 transition-colors"
                              aria-label={tModal("decreaseQuantity")}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="min-w-5 text-center text-xs font-bold text-white">
                              {effectiveCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOptionCountChange(opt.id, 1, maxCount)}
                              disabled={effectiveCount >= maxCount}
                              className="w-6.5 h-6.5 rounded-full border border-gold/40 bg-gold/15 text-gold flex items-center justify-center hover:bg-gold hover:text-black disabled:opacity-30 disabled:hover:bg-gold/15 disabled:hover:text-gold transition-colors"
                              aria-label={tModal("increaseQuantity")}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Grand Total Summary */}
          <div className="rounded-2xl border border-gold/20 bg-white/2 p-4 space-y-2.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>{tModal("baseTourPackage", { count: baseCalculations.totalPax })}</span>
              <span className="font-semibold text-white">{formatPrice(baseCalculations.totalPrice)}</span>
            </div>

            {selectedOptionItems.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex justify-between text-xs font-semibold text-gold">
                  <span>{tModal("selectedAddOns", { count: selectedOptionItems.length })}</span>
                  <span>+{formatPrice(optionsTotal)}</span>
                </div>
                <div className="space-y-1 pl-2">
                  {selectedOptionItems.map(({ opt, count, isOneTime, name, subtotal }) => (
                    <div key={opt.id} className="flex items-start justify-between gap-3 text-[11px] text-slate-400">
                      <span className="leading-snug">
                        • {name}
                        {!isOneTime && <span className="text-slate-300 font-medium"> (×{count})</span>}
                      </span>
                      <span className="shrink-0 font-medium text-slate-300 whitespace-nowrap">
                        +{formatPrice(subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/10 pt-3 flex justify-between items-baseline font-black">
              <div>
                <span className="block text-sm uppercase tracking-wider text-slate-200">
                  {tWidget("estimatedTotal")}
                </span>
                <span className="text-[10px] font-normal text-slate-500">{tWidget("taxesIncluded")}</span>
              </div>
              <span className="text-xl sm:text-2xl text-gold drop-shadow-[0_0_12px_rgba(197,160,89,0.25)]">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer with "Book Now" Button */}
        <div className="border-t border-white/10 p-4 bg-white/2">
          <Button
            type="button"
            disabled={isLoading}
            variant="auth"
            onClick={onConfirmBooking}
            className="w-full text-base font-bold py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? tModal("processing") : tModal("bookNow")}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
