import { vehicleFilters, vehicles } from "@/data/vehicles";
import { Link } from "@/lib/i18nNavigation";
import { Users, Briefcase, Tag, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type ActiveVehicleFilter = (typeof vehicleFilters)[number]["value"];

type VehicleSelectorProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
  showDriverIncludedNote?: boolean;
  isLoading?: boolean;
};

// 1. Reusable Component for Data Point Items (Price, Passengers, Luggage)
type VehicleDataPointProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

function VehicleDataPoint({ icon: Icon, label, value }: VehicleDataPointProps) {
  return (
    <div className="flex items-center gap-3 w-full md:w-[calc(50%-8px)]">
      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-gold border border-gold/20">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start w-full gap-2 md:gap-1">
        {" "}
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
}: VehicleSelectorProps) {
  const tVeh = useTranslations("Services.VehicleSelector");
  const [serviceType, setServiceType] = useState<"driver" | "guide">("driver");

  const handleFilterClick = (filterValue: ActiveVehicleFilter) => {
    if (isLoading) return;
    onFilterChange(filterValue);

    const firstVehicleInCategory = vehicles.find((v) => v.category === filterValue);
    if (firstVehicleInCategory) {
      onVehicleChange(firstVehicleInCategory.id);
    }
  };
  const currentVehicle = vehicles.find((v) => v.category === activeFilter);

  return (
    <>
      <div className={isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}>
        <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start md:gap-4">
          {vehicleFilters.map((filter) => {
            const isActive = filter.value === activeFilter;
            return (
              <button
                key={filter.value}
                type="button"
                disabled={isLoading}
                onClick={() => handleFilterClick(filter.value)}
                className={`rounded-full border px-6 py-2.5 text-caption font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "border-gold bg-gold text-black"
                    : "border-white/10 text-white hover:border-gold hover:text-gold"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Section */}
      {showDriverIncludedNote ? (
        /* Private Vehicle Layout */
        <div className="mt-8 space-y-4">
          {currentVehicle && (
            <div className="flex flex-col rounded-xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent px-4 sm:px-6 py-5 w-full shadow-lg">
              {/* Data Points - Using Reusable Component */}
              <div className="flex flex-wrap justify-center gap-y-4 sm:gap-y-5 gap-x-2 sm:gap-x-4">
                {currentVehicle.price && (
                  <VehicleDataPoint
                    icon={Tag}
                    label={tVeh("startingFrom")}
                    value={
                      <div className="flex items-center gap-1 flex-wrap leading-none">
                        <span className="text-gold font-bold">{currentVehicle.price}</span>

                        {serviceType === "guide" && (
                          <span className="flex items-center text-gold font-bold animate-in fade-in zoom-in-95 duration-200">
                            <span className="flex items-center justify-center mr-2 relative -translate-y-px leading-none">
                              +
                            </span>
                            <span>$20</span>
                          </span>
                        )}

                        <span className="text-tiny text-slate-400 font-normal">{tVeh("perDay")}</span>
                      </div>
                    }
                  />
                )}

                {/* 2. Passengers */}
                {currentVehicle.passengers && (
                  <VehicleDataPoint
                    icon={Users}
                    label={tVeh("capacity")}
                    value={
                      <div className="flex items-baseline gap-1.5 flex-wrap leading-none">
                        <span className="font-bold">{currentVehicle.passengers}</span>
                        <span className="text-slate-400 font-normal text-tiny">{tVeh("pax")}</span>
                      </div>
                    }
                  />
                )}

                {/* 3. Luggage */}
                {currentVehicle.luggage && (
                  <VehicleDataPoint
                    icon={Briefcase}
                    label={tVeh("luggage")}
                    value={
                      <div className="flex items-baseline gap-1.5 flex-wrap leading-none">
                        <span className="font-bold">{currentVehicle.luggage}</span>
                      </div>
                    }
                  />
                )}
              </div>
              {/* --- Service Option Buttons (Driver vs Guide) --- */}
              <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
                {/* User Instruction Text (Left aligned) */}
                <div className="text-left">
                  <span className="text-slate-400 text-body-sm font-medium">{tVeh("customizeTour")}</span>
                </div>

                {/* Toggle Buttons (Right aligned on MD+) */}
                <div className="flex w-full md:w-max p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                  {/* 1. Vehicle with Driver */}
                  <button
                    type="button"
                    onClick={() => setServiceType("driver")}
                    className={`relative flex-1 md:flex-none flex items-center justify-center py-2.5 px-4 md:px-8 md:min-w-40 rounded-lg text-body-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      serviceType === "driver"
                        ? "bg-linear-to-r from-gold/20 via-gold/10 to-transparent border border-gold/50 text-gold shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                        : "text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="tracking-wide">{tVeh("withDriver")}</span>
                  </button>

                  {/* 2. Vehicle with Guide */}
                  <button
                    type="button"
                    onClick={() => setServiceType("guide")}
                    className={`relative flex-1 md:flex-none flex items-center justify-center py-2.5 px-4 md:px-8 md:min-w-40 rounded-lg text-body-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      serviceType === "guide"
                        ? "bg-linear-to-r from-gold/20 via-gold/10 to-transparent border border-gold/50 text-gold shadow-[0_0_15px_rgba(197,160,89,0.15)]"
                        : "text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="tracking-wide">{tVeh("withGuide")}</span>
                  </button>
                </div>
              </div>
              {/* Tourist Note  */}
              {currentVehicle.touristNote && (
                <div className="mt-5 pt-4 border-t border-gold/15 w-full text-left flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-[15px]">📌</span>
                    <span className="text-gold font-bold uppercase tracking-widest text-caption">{tVeh("note")}</span>
                  </div>

                  <ul className="flex flex-col gap-2 w-full">
                    {(tVeh.raw(`Notes.${currentVehicle.category}`) as string[]).map((note, index) => (
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
