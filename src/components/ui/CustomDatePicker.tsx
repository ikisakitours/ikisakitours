"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { FiChevronDown, FiCalendar, FiSlash, FiCheck, FiInfo, FiChevronUp } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
import {
  type DateDetailItem,
  TOUR_TYPES_CONFIG,
  normalizeTourType,
  type KnownTourType,
} from "@/services/date-availability/availabilityService";
import { useAvailability, checkIfDateClosed } from "@/hooks/date-availability/useAvailability";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  isLoading?: boolean;
  closedDates?: string[];
  dateDetails?: Record<string, DateDetailItem>;
  tourType?: string;
  className?: string;
}

interface ClosedServiceItem {
  name: string;
  canonicalName: KnownTourType | string;
  label: string;
  hex: string;
  colorName?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  isLoading = false,
  closedDates: propClosedDates,
  dateDetails: propDateDetails,
  tourType,
  className = "",
}: CustomDatePickerProps) {
  const t = useTranslations("SharedForm.DatePicker");
  const locale = useLocale();

  // If props are not provided, use availability hook as fallback
  const hookAvailability = useAvailability(locale);
  const closedDates = propClosedDates ?? hookAvailability.closedDates;
  const dateDetails = propDateDetails ?? hookAvailability.dateDetails;
  const effectiveIsLoading = isLoading || (propClosedDates === undefined && hookAvailability.isLoadingDates);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTodayFormatted = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!value) {
      onChange(getTodayFormatted());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const [currentDate, setCurrentDate] = useState<Date>(() => parseDate(value || getTodayFormatted()));
  const [prevValue, setPrevValue] = useState(value);

  // Keep calendar month aligned with selected value if value changes from outside (without useEffect setState)
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      const parsed = parseDate(value);
      if (!isNaN(parsed.getTime())) {
        setCurrentDate(parsed);
      }
    }
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, () => null);

  // Localized months and days from JSON
  const months = t.raw("months") as string[];
  const fullMonths = t.raw("fullMonths") as string[];
  const weekDays = t.raw("days") as string[];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return t("selectDate");
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${year}-${fullMonths[monthIndex] || parts[1]}-${day}`;
    }
    return dateStr;
  };

  // Helper to get service localized label
  const getServiceLabel = (canonical: string): string => {
    const config = TOUR_TYPES_CONFIG[canonical as KnownTourType];
    if (config) {
      const key = config.key;
      try {
        const translated = t(`services.${key}`);
        if (translated && !translated.startsWith("SharedForm.")) return translated;
      } catch {
        // fallback
      }
      return locale === "ja" ? config.jaLabel : config.enLabel;
    }
    return canonical;
  };

  // Normalized current tour type
  const normalizedCurrentTourType = useMemo(
    () => (tourType ? normalizeTourType(tourType) : undefined),
    [tourType]
  );

  // Extract closed services and colors for any date
  const getDayDetails = (dateStr: string): {
    isClosedForCurrent: boolean;
    services: ClosedServiceItem[];
    note?: string;
  } => {
    const detail = dateDetails?.[dateStr];
    const isClosedForCurrent = checkIfDateClosed(dateStr, tourType, dateDetails, closedDates);

    const services: ClosedServiceItem[] = [];

    if (detail) {
      const typesList: string[] = [];
      if (Array.isArray(detail.tourTypes) && detail.tourTypes.length > 0) {
        typesList.push(...detail.tourTypes);
      } else if (typeof detail.tourType === "string" && detail.tourType.trim()) {
        typesList.push(...detail.tourType.split(",").map((s) => s.trim()));
      }

      typesList.forEach((rawType, idx) => {
        const canonical = normalizeTourType(rawType);
        const config = TOUR_TYPES_CONFIG[canonical as KnownTourType];
        const hex =
          detail.hexes?.[idx] ||
          detail.hex ||
          config?.defaultHex ||
          "#ef4444";
        const colorName = detail.colors?.[idx] || detail.color || config?.defaultColor;

        services.push({
          name: rawType,
          canonicalName: canonical,
          label: getServiceLabel(canonical),
          hex,
          colorName,
        });
      });
    } else if (closedDates?.includes(dateStr)) {
      // General closure with no service breakdown
      services.push({
        name: "all",
        canonicalName: "all",
        label: t("notAvailable"),
        hex: "#ef4444",
      });
    }

    return {
      isClosedForCurrent,
      services,
      note: detail?.note,
    };
  };

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveTooltip(null);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Field */}
      <div
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          if (effectiveIsLoading) return;
          setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!effectiveIsLoading) setIsOpen(!isOpen);
          }
        }}
        className={`w-full rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-body-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-gold/60 focus:bg-white/[0.07] cursor-pointer flex justify-between items-center ${isOpen ? "border-gold/60! bg-white/[0.07]!" : ""
          }${effectiveIsLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={value ? "text-white" : "text-slate-500"}>{formatDisplayDate(value)}</span>
        <FiCalendar className="h-4.5 w-4.5 md:h-5 md:w-5 text-slate-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-[#0c0c0e] border border-white/15 rounded-2xl shadow-2xl z-50 p-3.5 sm:p-4 lg:p-5 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl">
          {/* Calendar Header: Month & Year Select */}
          <div className="flex justify-between items-center mb-4 gap-2">
            {/* Month Select */}
            <div className="relative w-full">
              <select
                value={currentDate.getMonth()}
                onChange={(e) => setCurrentDate(new Date(currentDate.getFullYear(), parseInt(e.target.value, 10), 1))}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-3 pr-8 py-2 text-body-sm text-white outline-none transition-all hover:border-white/20 focus:border-gold/60 cursor-pointer appearance-none"
              >
                {months.map((m, i) => (
                  <option key={m} value={i} className="bg-[#0c0c0e] text-white">
                    {m}
                  </option>
                ))}
              </select>
              <FiChevronDown
                strokeWidth={2}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              />
            </div>

            {/* Year Select */}
            <div className="relative w-full">
              <select
                value={currentDate.getFullYear()}
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value, 10), currentDate.getMonth(), 1))}
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-3 pr-8 py-2 text-body-sm text-white outline-none transition-all hover:border-white/20 focus:border-gold/60 cursor-pointer appearance-none"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#0c0c0e] text-white">
                    {y}
                  </option>
                ))}
              </select>
              <FiChevronDown
                strokeWidth={2}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {weekDays.map((d) => (
              <div key={d} className="text-caption font-bold text-slate-400 uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {daysArray.map((d) => {
              const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const isSelected = value === formattedDate;

              const { isClosedForCurrent, services, note } = getDayDetails(formattedDate);
              const hasClosures = services.length > 0;

              // Tooltip positioning depending on column
              const col = (firstDayOfMonth + d - 1) % 7;
              const tooltipPos =
                col <= 1
                  ? "left-0"
                  : col >= 5
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2";
              const arrowPos =
                col <= 1 ? "left-4" : col >= 5 ? "right-4" : "left-1/2 -translate-x-1/2";

              const isTooltipVisible = activeTooltip === formattedDate;

              return (
                <div
                  key={d}
                  className="group relative flex flex-col items-center justify-center py-0.5"
                  onMouseEnter={() => {
                    if (hasClosures) setActiveTooltip(formattedDate);
                  }}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <button
                    type="button"
                    aria-disabled={isClosedForCurrent}
                    onClick={(e) => {
                      if (isClosedForCurrent) {
                        e.stopPropagation();
                        setActiveTooltip(isTooltipVisible ? null : formattedDate);
                      } else {
                        onChange(formattedDate);
                        setIsOpen(false);
                      }
                    }}
                    className={`relative flex flex-col h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-lg lg:rounded-xl text-caption lg:text-body-sm font-semibold outline-none transition-all duration-200 ${isClosedForCurrent
                      ? "cursor-not-allowed text-slate-500 ring-1 ring-inset ring-white/10 hover:ring-red-400/50 bg-red-950/15"
                      : isSelected
                        ? "cursor-pointer bg-gold text-[#0a0a0a] font-bold shadow-[0_0_12px_rgba(197,160,89,0.5)] scale-105 z-10"
                        : "cursor-pointer text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    style={
                      isClosedForCurrent
                        ? {
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(239,68,68,0.12) 0 1.5px, transparent 1.5px 6px)",
                        }
                        : undefined
                    }
                  >
                    <span className="leading-none">{d}</span>

                    {/* Colored Dots Indicator below the date number */}
                    {hasClosures && (
                      <div className="flex items-center justify-center gap-0.5 mt-0.5 h-1.5 w-full overflow-hidden px-0.5">
                        {services.slice(0, 4).map((srv, idx) => (
                          <span
                            key={idx}
                            className="inline-block h-1 w-1 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: srv.hex }}
                            title={`${srv.label}: ${t("notAvailable")}`}
                          />
                        ))}
                        {services.length > 4 && (
                          <span className="inline-block h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Rich Information Tooltip */}
                  {hasClosures && (
                    <div
                      role="tooltip"
                      className={`pointer-events-none absolute bottom-[125%] z-50 ${tooltipPos} transition-all duration-200 w-max min-w-52 sm:min-w-56 max-w-64 sm:max-w-72 ${isTooltipVisible
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                    >
                      <div className="rounded-xl border border-white/15 bg-[#121216]/98 p-2.5 shadow-2xl backdrop-blur-xl space-y-2 text-left overflow-hidden">
                        {/* Status banner */}
                        <div className="flex items-start gap-1.5">
                          {isClosedForCurrent ? (
                            <>
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 mt-0.5">
                                <FiSlash className="h-2 w-2" />
                              </span>
                              <span className="mt-1 text-tiny font-bold text-red-400 leading-tight">
                                {t("unavailableForCurrent")}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                                <FiCheck className="h-2 w-2" />
                              </span>
                              <span className="mt-1 text-tiny font-bold text-emerald-400 leading-tight">
                                {t("availableForCurrent")}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Admin Note if available */}
                        {note && (
                          <div className="space-y-0.5 py-0.5">
                            <div className="flex items-center gap-1 text-gold font-bold text-[10px] uppercase tracking-wider">
                              {t("note")}
                            </div>
                             <p className="text-slate-200 italic text-[11px] leading-snug break-all">
                              {note}
                            </p>
                          </div>
                        )}

                        {/* Closed Services Breakdown */}
                        <div className="space-y-1 border-t border-white/10 pt-1.5">
                          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            {t("notAvailable")}:
                          </div>
                          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                            {services.map((srv, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-tiny">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                                  style={{ backgroundColor: srv.hex }}
                                />
                                <span
                                  className={`truncate ${normalizedCurrentTourType &&
                                    (srv.canonicalName === normalizedCurrentTourType ||
                                      srv.canonicalName === "all" ||
                                      srv.canonicalName === "other")
                                    ? "text-red-400 font-bold"
                                    : "text-slate-300"
                                    }`}
                                >
                                  {srv.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tooltip Arrow */}
                      <span
                        className={`absolute top-full -mt-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-b border-r border-white/15 bg-[#121216] ${arrowPos}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Color Legend & Explanation Guide ( Legend Bar) */}
          <div className="mt-4 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center justify-between w-full text-caption font-bold tracking-wider uppercase text-slate-400 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <FiInfo className="w-3.5 h-3.5 text-gold" />
                {t("legendTitle")}
              </span>
              {showLegend ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showLegend && (
              <div className="mt-2.5 space-y-2 animate-in fade-in duration-200">
                <p className="text-[11px] text-slate-400 leading-tight">
                  {t("legendSubtitle")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {(Object.keys(TOUR_TYPES_CONFIG) as KnownTourType[]).map((typeKey) => {
                    const cfg = TOUR_TYPES_CONFIG[typeKey];
                    const label = getServiceLabel(typeKey);
                    const isCurrent = normalizedCurrentTourType === typeKey;

                    return (
                      <div
                        key={typeKey}
                        className={`flex items-center gap-2 px-2 py-1 rounded-md text-tiny transition-all ${isCurrent
                          ? "bg-gold/15 border border-gold/40 text-white font-semibold"
                          : "bg-white/5 border border-white/5 text-slate-300"
                          }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: cfg.defaultHex }}
                        />
                        <span className="truncate flex-1">{label}</span>
                        {isCurrent && (
                          <span className="text-[9px] uppercase tracking-wider text-gold font-bold">
                            ★
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
