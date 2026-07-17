import { vehicleFilters, vehicles } from "@/data/vehicles";
import Link from "next/link";
export type ActiveVehicleFilter = (typeof vehicleFilters)[number]["value"];

type TransferVehicleSelectorProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
};

export function TransferVehicleSelector({
  activeFilter,
  onFilterChange,
  onVehicleChange,
}: TransferVehicleSelectorProps) {
  const handleFilterClick = (filterValue: ActiveVehicleFilter) => {
    onFilterChange(filterValue);

    const firstVehicleInCategory = vehicles.find((v) => v.category === filterValue);

    if (firstVehicleInCategory) {
      onVehicleChange(firstVehicleInCategory.id);
    }
  };

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

      {/* Special Note */}
      <div className="mt-8 flex items-center justify-center md:justify-start">
        <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 px-5 py-4 backdrop-blur-sm transition-all hover:border-gold/20 hover:bg-white/6">
          {/* Icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
            <span className="text-[14px]">💡</span>
          </div>

          {/* Message */}
          <p className="text-[11px] font-light leading-relaxed text-slate-300 md:text-xs">
            <span className="block font-bold text-white mb-0.5">Need a specific setup?</span>
            Can&apos;t find the vehicle you&apos;re looking for?
            <Link
              href="/contact"
              className="font-semibold text-gold underline underline-offset-4 hover:text-white transition-colors"
            >
              Contact our support team
            </Link>
            to customize your requirements.
          </p>
        </div>
      </div>
    </>
  );
}
