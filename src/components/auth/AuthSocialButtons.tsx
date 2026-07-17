import { FaApple, FaGoogle } from "react-icons/fa";
import { authSocialProviders } from "@/data/auth";

const providerIcons = {
  Google: FaGoogle,
  Apple: FaApple,
} as const;

type AuthSocialButtonsProps = {
  label: string;
};

export function AuthSocialButtons({ label }: AuthSocialButtonsProps) {
  return (
    <>
      <div className="relative my-8 text-center">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/5" />
        <span className="relative bg-[#0d0d0d] px-4 text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px] 3xl:text-[15px] uppercase tracking-widest text-slate-600">
          {label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {authSocialProviders.map((provider) => {
          const Icon = providerIcons[provider];

          return (
            <button
              key={provider}
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 py-3 text-xs font-bold text-white transition-colors hover:bg-white/5"
            >
              <Icon className="h-4 w-4 text-gold" />
              {provider}
            </button>
          );
        })}
      </div>
    </>
  );
}
