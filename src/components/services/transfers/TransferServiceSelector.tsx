import { transferServiceTypes, type TransferServiceId } from "@/data/transfers";
//Icons
import { Car, PlaneLanding, PlaneTakeoff, type LucideIcon } from "lucide-react";

const serviceIcons = {
  pickup: PlaneLanding,
  hotel: Car,
  dropoff: PlaneTakeoff,
} satisfies Record<TransferServiceId, LucideIcon>;

type TransferServiceSelectorProps = {
  selectedServiceId: TransferServiceId;
  onServiceChange: (serviceId: TransferServiceId) => void;
};

export function TransferServiceSelector({ selectedServiceId, onServiceChange }: TransferServiceSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
      {transferServiceTypes.map((service) => {
        const Icon = serviceIcons[service.id];
        const isSelected = service.id === selectedServiceId;

        return (
          <label key={service.id} className="group cursor-pointer">
            <input
              type="radio"
              name="serviceType"
              value={service.id}
              checked={isSelected}
              onChange={() => onServiceChange(service.id)}
              className="sr-only"
            />
            <div
              className={`flex h-full flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all md:p-6 ${
                isSelected
                  ? "border-gold bg-gold/10 shadow-[0_0_28px_rgba(197,160,89,0.14)]"
                  : "border-white/10 bg-white/3 hover:border-gold/50 hover:bg-white/6"
              }`}
            >
              <Icon className="mb-3 h-6 w-6 text-gold md:h-7 md:w-7" />
              <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-white md:text-sm">
                {service.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{service.description}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
