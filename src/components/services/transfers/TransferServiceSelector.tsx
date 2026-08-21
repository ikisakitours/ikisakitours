import { transferServiceIds, type TransferServiceId } from "@/data/transfers";
//Icons
import { Car, PlaneLanding, PlaneTakeoff, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceIcons = {
  pickup: PlaneLanding,
  hotel: Car,
  dropoff: PlaneTakeoff,
} satisfies Record<TransferServiceId, LucideIcon>;

type TransferServiceSelectorProps = {
  selectedServiceId: TransferServiceId;
  onServiceChange: (serviceId: TransferServiceId) => void;
  isLoading?: boolean;
};

export function TransferServiceSelector({ selectedServiceId, onServiceChange ,isLoading = false}: TransferServiceSelectorProps) {
  const t = useTranslations("Services.Transfers.ServiceTypes");

  return (
<div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 ${isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>      {transferServiceIds.map((id, index) => {
        const Icon = serviceIcons[id];
        const isSelected = id === selectedServiceId;

        return (
          <label key={id} className="group cursor-pointer">
            <input
              type="radio"
              name="serviceType"
              value={id}
              disabled={isLoading}
              checked={isSelected}
              onChange={() => onServiceChange(id)}
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
              <h3 className="text-body-sm font-bold uppercase tracking-[0.08em] text-white">{t(`${index}.title`)}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-slate-400">{t(`${index}.description`)}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
