import type { Vehicle } from "@/data/vehicles";
import type { TransferServiceId } from "@/data/transfers";
//Icons
import { Check, ReceiptText } from "lucide-react";
import { useTranslations } from "next-intl";

type TransferFareSummaryProps = {
  selectedServiceId: TransferServiceId;
  selectedVehicle: Vehicle;
};

export function TransferFareSummary({ selectedServiceId, selectedVehicle }: TransferFareSummaryProps) {
  const tFare = useTranslations("Services.FareSummary");
  const tTransfers = useTranslations("Services.Transfers");

  const serviceIndex = selectedServiceId === "pickup" ? 0 : selectedServiceId === "hotel" ? 1 : 2;
  const summaryLabel = tTransfers(`ServiceTypes.${serviceIndex}.summaryLabel`);

  const fareInclusions = tTransfers.raw("FareInclusions") as string[];
  const assurances = tTransfers.raw("Assurances") as { title: string; description: string }[];

  return (
    <aside className="xl:sticky xl:top-24 xl:col-span-4">
      <div className="sticky top-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/85 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
        <div className="h-1 w-full bg-linear-to-r from-transparent via-gold to-transparent opacity-50" />

        <div className="p-6 md:p-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="premium-serif text-xl text-white">
              {tFare("titleBase")} <span className="italic text-gold">{tFare("titleAccent")}</span>
            </h2>
            <ReceiptText className="h-6 w-6 text-gold/30" />
          </div>

          <div className="space-y-5">
            <SummaryItem label={tFare("serviceType")} value={summaryLabel} isActive />
            <SummaryItem label={tFare("vehicleCategory")} value={selectedVehicle.category.toUpperCase() + tFare("typeSuffix")} />
          </div>

          <div className="mt-7 space-y-3 rounded-2xl border border-white/5 bg-white/3 p-4">
            {fareInclusions.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Check className="h-2.5 w-2.5 text-gold" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-300">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-3">
            {assurances.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/5 bg-black/20 p-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
  isActive?: boolean;
};

function SummaryItem({ label, value, isActive = false }: SummaryItemProps) {
  return (
    <div className={`relative border-l pl-6 ${isActive ? "border-gold/30" : "border-white/10"}`}>
      {isActive ? (
        <span className="absolute -left-1.25 top-0 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
      ) : null}
      <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <span className="text-sm font-bold tracking-wide text-white">{value}</span>
    </div>
  );
}