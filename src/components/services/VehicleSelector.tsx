import { useEffect, useMemo } from "react";
import { Link } from "@/lib/i18nNavigation";
import { Users, Briefcase, Tag, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/context/CurrencyContext";
import { useServiceNotes } from "@/hooks/services/note/useServiceNotes";

export type ActiveVehicleFilter = string;
export type ServiceType = "driver" | "guide" | "Driver & Guide";
type VehicleSelectorProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
  showDriverIncludedNote?: boolean;
  isLoading?: boolean;
  serviceType?: ServiceType;
  onServiceTypeChange?: (type: ServiceType) => void;
  noteServiceType?: string;
  onPriceChange?: (prices: { startingPrice: number; selectedPrice: number }) => void;
};

// 1. Reusable Component for Data Point Items (Price, Passengers, Luggage)
type VehicleDataPointProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

function VehicleDataPoint({ icon: Icon, label, value }: VehicleDataPointProps) {
  return (
    <div className="flex items-center gap-3 w-full md:flex-1">
      <div className="hidden md:flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-gold border border-gold/20">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full gap-2 md:gap-1">
        <span className="block text-tiny font-bold uppercase tracking-widest text-slate-400">{label}</span>
        <span className="text-body font-bold text-white ">{value}</span>
      </div>
    </div>
  );
}

// 2. Reusable Component for Info/Support Cards (Setup & Driver Included Cards)
type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  isPulsing?: boolean;
  isGoldBorder?: boolean;
};

function InfoCard({ icon, title, description, isPulsing = false, isGoldBorder = false }: InfoCardProps) {
  return (
    <div
      className={`flex flex-col items-start text-left w-full rounded-xl px-5 py-4 backdrop-blur-sm transition-all ${
        isPulsing
          ? "border border-gold/20 bg-gold/5 animate-pulse"
          : isGoldBorder
            ? "border border-gold/20 bg-gold/5"
            : "border border-white/5 bg-white/3 hover:border-gold/20 hover:bg-white/6"
      }`}
    >
      <div className="flex items-center gap-3 mb-2.5">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isPulsing ? "bg-gold/20 text-white" : "bg-gold/10 text-gold"}`}
        >
          {icon}
        </div>
        <span className={`font-bold text-body-sm ${isPulsing ? "text-white" : "text-white"}`}>{title}</span>
      </div>
      <p
        className={`text-body-sm leading-relaxed ${isPulsing ? "font-medium text-gold" : "font-light text-slate-300"}`}
      >
        {description}
      </p>
    </div>
  );
}

export function VehicleSelector({
  activeFilter,
  onFilterChange,
  onVehicleChange,
  showDriverIncludedNote = false,
  isLoading = false,
  serviceType = "driver",
  onServiceTypeChange = () => {},
  noteServiceType = "custom",
  onPriceChange,
}: VehicleSelectorProps) {
  const tVeh = useTranslations("Services.VehicleSelector");
  const { formatPrice } = useCurrency();
  const { data: serviceNotesData } = useServiceNotes(noteServiceType);

  const availableVehicleTypes = useMemo(
    () => (serviceNotesData ? Array.from(new Set(serviceNotesData.map((item) => item.vehicleType))) : []),
    [serviceNotesData],
  );

  useEffect(() => {
    if (!serviceNotesData || availableVehicleTypes.length === 0) return;

    const exists = availableVehicleTypes.some((v) => v.toLowerCase() === activeFilter?.toLowerCase());
    if (!exists) {
      onFilterChange(availableVehicleTypes[0]);
      onVehicleChange(String(serviceNotesData[0].id));
    }
  }, [serviceNotesData, availableVehicleTypes, activeFilter, onFilterChange, onVehicleChange]);

  const handleFilterClick = (filterValue: ActiveVehicleFilter) => {
    if (isLoading) return;
    onFilterChange(filterValue);

    const noteForType = serviceNotesData?.find(
      (item) => item.vehicleType?.toLowerCase().trim() === filterValue?.toLowerCase().trim(),
    );
    if (noteForType) {
      onVehicleChange(String(noteForType.id));
    }
  };

  const matchedServiceNote = serviceNotesData?.find(
    (item) =>
      item.vehicleType?.toLowerCase().trim() === activeFilter?.toLowerCase().trim() ||
      activeFilter?.toLowerCase().includes(item.vehicleType?.toLowerCase().trim()),
  );

  let finalPriceUSD = 0;
  let extraCostUSD = 0;

  if (matchedServiceNote) {
    finalPriceUSD = parseFloat(matchedServiceNote.startingPrice || "0");

    const driverPrice = parseFloat(matchedServiceNote.withDriverPrice || "0");
    const guidePrice = parseFloat(matchedServiceNote.withGuidePrice || "0");
    const bothPrice = parseFloat(matchedServiceNote.withDriverAndGuidePrice || "0");

    if (serviceType === "driver") {
      extraCostUSD = driverPrice;
    } else if (serviceType === "guide") {
      extraCostUSD = guidePrice;
    } else if (serviceType === "Driver & Guide") {
      extraCostUSD = bothPrice;
    }
  }

  useEffect(() => {
    onPriceChange?.({ startingPrice: finalPriceUSD, selectedPrice: extraCostUSD });
  }, [finalPriceUSD, extraCostUSD, onPriceChange]);

  return (
    <>
      <div className={isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}>
        <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start md:gap-4">
          {availableVehicleTypes.map((vType) => {
            const isActive = vType.toLowerCase() === activeFilter?.toLowerCase();
            return (
              <button
                key={vType}
                type="button"
                disabled={isLoading}
                onClick={() => handleFilterClick(vType)}
                className={`rounded-full border px-6 py-2.5 text-caption font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "border-gold bg-gold text-black"
                    : "border-white/10 text-white hover:border-gold hover:text-gold"
                }`}
              >
                {vType}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Section */}
      {showDriverIncludedNote ? (
        /* Private Vehicle Layout */
        <div className="mt-8 space-y-4">
          {matchedServiceNote && (
            <div className="flex flex-col rounded-xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent px-4 sm:px-6 py-5 w-full shadow-lg">
              {/* Data Points - Using Reusable Component */}
              <div className="flex flex-wrap justify-center gap-y-4 sm:gap-y-5 gap-x-2 sm:gap-x-4">
                {/* 1. Price */}
                <VehicleDataPoint
                  icon={Tag}
                  label={tVeh("startingFrom")}
                  value={
                    <div className="flex items-center gap-1 flex-wrap leading-none">
                      <span className="text-gold font-bold">{formatPrice(finalPriceUSD)}</span>

                      {extraCostUSD > 0 && (
                        <span className="flex items-center text-gold font-bold animate-in fade-in zoom-in-95 duration-200">
                          <span className="flex items-center justify-center mr-2 relative -translate-y-px leading-none">
                            +
                          </span>
                          <span>{formatPrice(extraCostUSD)}</span>
                        </span>
                      )}

                      <span className="text-tiny text-slate-400 font-normal">{tVeh("perDay")}</span>
                    </div>
                  }
                />

                {/* 2. Passengers */}
                {matchedServiceNote.vehicleCapacity && (
                  <VehicleDataPoint
                    icon={Users}
                    label={tVeh("capacity")}
                    value={
                      <div className="flex items-baseline gap-1.5 flex-wrap leading-none">
                        <span className="font-bold">{matchedServiceNote.vehicleCapacity}</span>
                        <span className="text-slate-400 font-normal text-tiny">{tVeh("pax")}</span>
                      </div>
                    }
                  />
                )}

                {/* 3. Luggage */}
                {matchedServiceNote.luggages && (
                  <VehicleDataPoint
                    icon={Briefcase}
                    label={tVeh("luggage")}
                    value={
                      <div className="flex items-baseline gap-1.5 flex-wrap leading-none">
                        <span className="font-bold">{matchedServiceNote.luggages}</span>
                        <span className="text-slate-400 font-normal text-tiny">{tVeh("bags")}</span>
                      </div>
                    }
                  />
                )}
              </div>
              {/* --- Service Option Buttons (Driver vs Guide) --- */}
              {(() => {
                const options: {
                  value: ServiceType;
                  label: string;
                  hint: string;
                  icon: React.ReactNode;
                }[] = [
                  {
                    value: "driver",
                    label: tVeh("withDriver"),
                    hint: tVeh("serviceHints.driver"),
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 3v7M5 15.5l5.2-3M19 15.5l-5.2-3" />
                      </svg>
                    ),
                  },
                  {
                    value: "guide",
                    label: tVeh("withGuide"),
                    hint: tVeh("serviceHints.guide"),
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                        <circle cx="12" cy="9.5" r="2.5" />
                      </svg>
                    ),
                  },
                  {
                    value: "Driver & Guide",
                    label: tVeh("both") || "Driver & Guide",
                    hint: tVeh("serviceHints.both"),
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />
                      </svg>
                    ),
                  },
                ];
                const activeIndex = options.findIndex((o) => o.value === serviceType);

                return (
                  <div className="mt-5 w-full">
                    {/* Section label */}
                    <div className="mb-3 flex items-center gap-3">
                      <p className="text-slate-400 text-body-sm font-medium whitespace-nowrap">
                        {tVeh("customizeTour")}
                      </p>
                      <span className="h-px flex-1 bg-linear-to-r from-white/15 to-transparent" />
                    </div>

                    {/* Rail selector */}
                    {/* Rail selector */}
                    <div
                      role="radiogroup"
                      aria-label={tVeh("customizeTour")}
                      className="relative w-full rounded-2xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md"
                    >
                      {options.map((opt, i) => {
                        const selected = serviceType === opt.value;

                        return (
                          <button
                            key={opt.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onServiceTypeChange(opt.value)}
                            className={`group relative z-10 flex w-full cursor-pointer items-center gap-3.5 rounded-xl border px-3.5 py-3 text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                              selected
                                ? "border-gold/40 bg-linear-to-r from-gold/20 via-gold/5 to-transparent shadow-[0_0_22px_rgba(197,160,89,0.18)]"
                                : "border-transparent"
                            }`}
                          >
                            {i > 0 && (
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute left-7.25 -top-px h-[calc(50%+1px)] w-0.5 transition-colors duration-500 ${
                                  i <= activeIndex ? "bg-gold" : "bg-white/10"
                                }`}
                              />
                            )}
                            {i < options.length - 1 && (
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute -bottom-px left-7.25 h-[calc(50%+1px)] w-0.5 transition-colors duration-500 ${
                                  i < activeIndex ? "bg-gold" : "bg-white/10"
                                }`}
                              />
                            )}

                            {/* Diamond node = radio */}
                            <span
                              className={`flex h-8 w-8 shrink-0 rotate-45 items-center justify-center rounded-lg border transition-all duration-500 ${
                                selected
                                  ? "border-gold bg-gold text-black shadow-[0_0_16px_rgba(197,160,89,0.55)] scale-110"
                                  : "border-white/15 bg-[#0c0c0c] text-slate-400 group-hover:border-gold/50 group-hover:text-gold"
                              }`}
                            >
                              <span className="-rotate-45">{opt.icon}</span>
                            </span>

                            {/* Texts */}
                            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                              <span
                                className={`text-body-sm font-semibold leading-snug tracking-wide transition-colors duration-300 ${
                                  selected ? "text-gold" : "text-slate-300 group-hover:text-white"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span
                                className={`text-[11px] leading-snug transition-colors duration-300 sm:text-xs ${
                                  selected ? "text-gold/60" : "text-slate-500"
                                }`}
                              >
                                {opt.hint}
                              </span>
                            </span>

                            {/* Ticket number */}
                            <span
                              className={`shrink-0 font-mono text-[11px] tracking-widest transition-colors duration-300 ${
                                selected ? "text-gold" : "text-slate-600"
                              }`}
                            >
                              0{i + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              {/* Tourist Note  */}
              {matchedServiceNote.notes && matchedServiceNote.notes.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gold/15 w-full text-left flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-[15px]">📌</span>
                    <span className="text-gold font-bold uppercase tracking-widest text-caption">{tVeh("note")}</span>
                  </div>

                  <ul className="flex flex-col gap-2 w-full">
                    {matchedServiceNote.notes.map((note, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-body-sm text-slate-300 italic leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-1.75 shrink-0"></span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Original Setup Card using InfoCard */}
          <InfoCard
            icon={<span className="text-[18px]">💡</span>}
            title={tVeh("needSetup")}
            description={
              <>
                {tVeh("cantFind")}{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold underline underline-offset-4 hover:text-white transition-colors"
                >
                  {tVeh("contactSupport")}
                </Link>{" "}
                {tVeh("customize")}
              </>
            }
          />
        </div>
      ) : (
        /* Transfers & Bespoke Layout */
        <div className="mt-8 flex items-center justify-center md:justify-start w-full">
          <InfoCard
            icon={<span className="text-[18x]">💡</span>}
            title={tVeh("needSetup")}
            description={
              <>
                {tVeh("cantFind")}{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold underline underline-offset-4 hover:text-white transition-colors"
                >
                  {tVeh("contactSupport")}
                </Link>{" "}
                {tVeh("customize")}
              </>
            }
          />
        </div>
      )}
    </>
  );
}
