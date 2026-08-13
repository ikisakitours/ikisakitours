import { vehicleFilters, vehicles } from "@/data/vehicles";
import { Link } from "@/i18nNavigation";
import { Car, Users, Briefcase, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export type ActiveVehicleFilter = (typeof vehicleFilters)[number]["value"];

type VehicleSelectorProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
  showDriverIncludedNote?: boolean;
};

export function VehicleSelector({
  activeFilter,
  onFilterChange,
  onVehicleChange,
  showDriverIncludedNote = false,
}: VehicleSelectorProps) {
  const tVeh = useTranslations("Services.VehicleSelector");

  const handleFilterClick = (filterValue: ActiveVehicleFilter) => {
    onFilterChange(filterValue);

    const firstVehicleInCategory = vehicles.find((v) => v.category === filterValue);
    if (firstVehicleInCategory) {
      onVehicleChange(firstVehicleInCategory.id);
    }
  };
  const currentVehicle = vehicles.find((v) => v.category === activeFilter);
  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start md:gap-4">
        {vehicleFilters.map((filter) => {
          const isActive = filter.value === activeFilter;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => handleFilterClick(filter.value)}
              className={`rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
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

      {/* Messages Section */}
      {showDriverIncludedNote ? (
        /* Private Vehicle Layout */
        <div className="mt-8 space-y-4">
          {currentVehicle && (
            <div className="flex flex-col rounded-xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent px-4 sm:px-6 py-5 w-full shadow-lg">
              {/* Data Points - 2 by 2 Layout */}
              <div className="flex flex-wrap justify-center gap-y-5 gap-x-2 sm:gap-x-4">
                {currentVehicle.price && (
                  <div className="flex items-center gap-2 sm:gap-3 w-[calc(50%-4px)] sm:w-[calc(50%-8px)]">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-gold border border-gold/20">
                      <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {tVeh("startingFrom")}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gold">
                        {currentVehicle.price}{" "}
                        <span className="text-[8px] sm:text-[10px] text-slate-400 font-normal">{tVeh("perDay")}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Passengers */}
                {currentVehicle.passengers && (
                  <div className="flex items-center gap-2 sm:gap-3 w-[calc(50%-4px)] sm:w-[calc(50%-8px)]">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-gold border border-gold/20">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {tVeh("capacity")}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {currentVehicle.passengers}{" "}
                        <span className="text-slate-400 font-normal text-[8px] sm:text-[10px]">{tVeh("pax")}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Luggage */}
                {currentVehicle.luggage && (
                  <div className="flex items-center gap-2 sm:gap-3 w-[calc(50%-4px)] sm:w-[calc(50%-8px)]">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-black/40 text-gold border border-gold/20">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {tVeh("luggage")}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {currentVehicle.luggage}{" "}
                        <span className="text-slate-400 font-normal text-[8px] sm:text-[10px]"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tourist Note  */}
              {currentVehicle.touristNote && (
                <div className="mt-5 pt-4 border-t border-gold/15 w-full text-left flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[14px]">💡</span>
                    <span className="text-gold font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
                      {tVeh("note")}
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11.5px] text-slate-300 italic leading-relaxed">
                    {currentVehicle.touristNote}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Original Setup Card */}
          {/* Original Setup Card */}
          <div className="flex flex-col items-start text-left w-full rounded-xl border border-white/5 bg-white/3 px-5 py-4 backdrop-blur-sm transition-all hover:border-gold/20 hover:bg-white/6">
            {/* Icon & Title Row */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <span className="text-[14px]">💡</span>
              </div>
              <span className="font-bold text-white text-[11px] md:text-xs">{tVeh("needSetup")}</span>
            </div>

            {/* Description Row */}
            <p className="text-[11px] font-light leading-relaxed text-slate-300 md:text-xs">
              {tVeh("cantFind")}{" "}
              <Link
                href="/contact"
                className="font-semibold text-gold underline underline-offset-4 hover:text-white transition-colors"
              >
                {tVeh("contactSupport")}
              </Link>{" "}
              {tVeh("customize")}
            </p>
          </div>

          {/* Original Driver Included Card */}
          {/* Original Driver Included Card */}
          <div className="flex flex-col items-start text-left w-full rounded-xl border border-gold/20 bg-gold/5 px-5 py-4 animate-pulse">
            {/* Icon & Title Row */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-white">
                <Car className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-[11px] md:text-xs">{tVeh("driverIncluded")}</span>
            </div>

            {/* Description Row */}
            <p className="text-[11px] font-medium leading-relaxed text-gold md:text-xs">{tVeh("driverDesc")}</p>
          </div>
        </div>
      ) : (
        /* Transfers & Bespoke Layout */
        <div className="mt-8 flex items-center justify-center md:justify-start w-full">
          <div className="flex flex-col items-start text-left w-full rounded-xl border border-white/5 bg-white/3 px-5 py-4 backdrop-blur-sm transition-all hover:border-gold/20 hover:bg-white/6">
            {/* Icon & Title Row */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                <span className="text-[14px]">💡</span>
              </div>
              <span className="font-bold text-white text-[11px] md:text-xs">{tVeh("needSetup")}</span>
            </div>

            {/* Description Row */}
            <p className="text-[11px] font-light leading-relaxed text-slate-300 md:text-xs">
              {tVeh("cantFind")}{" "}
              <Link
                href="/contact"
                className="font-semibold text-gold underline underline-offset-4 hover:text-white transition-colors"
              >
                {tVeh("contactSupport")}
              </Link>{" "}
              {tVeh("customize")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
