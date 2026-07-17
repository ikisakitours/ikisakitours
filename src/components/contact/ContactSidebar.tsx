import { MessageSquare, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SidebarProps = {
  data: {
    title: string;
    info: {
      icon: LucideIcon;
      label: string;
      value: string;
    }[];
    whatsapp: {
      title: string;
      buttonText: string;
    };
  };
};

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gold mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

export default function ContactSidebar({ data }: SidebarProps) {
  return (
    <div className="space-y-8 lg:col-span-1">
      <div className="glass-card rounded-3xl p-8">
        <h2 className="premium-serif mb-6 text-xl text-white">{data.title}</h2>
        <div className="space-y-6">
          {data.info.map((item, index) => {
            const Icon = item.icon;
            return <InfoItem key={index} icon={<Icon className="h-5 w-5" />} label={item.label} value={item.value} />;
          })}
        </div>
      </div>

      <div className="rounded-3xl bg-lanka-black p-8 border border-gold/20">
        <p className="mb-4 text-base font-extrabold text-white">{data.whatsapp.title}</p>
        <Button variant="service" className="w-full justify-center">
          <MessageSquare className="h-4 w-4" />
          {data.whatsapp.buttonText}
        </Button>
      </div>
    </div>
  );
}
