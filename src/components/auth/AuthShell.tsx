import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

type AuthIntroKey = "Gateway" | "Signup" | "Login" | "Recovery" | "Reset";

type AuthShellProps = {
  children: ReactNode;
  introKey: AuthIntroKey;
};

export function AuthShell({ children, introKey }: AuthShellProps) {
  const t = useTranslations("Auth");
  return (
    <main className="fixed inset-0 z-200 overflow-y-auto bg-lanka-black text-slate-200">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-lanka-black">
        <Image
          src={t(`Intros.${introKey}.image`)}
          alt={t(`Intros.${introKey}.imageAlt`)}
          fill
          priority
          sizes="100vw"
          className="image-render-visible animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/45 to-black/95" />
      </div>

      <div className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-8 md:px-8">
        <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <section className="hidden space-y-8 p-8 lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {t(`Intros.${introKey}.eyebrow`)}
              </span>
            </div>

            <h1 className="premium-serif text-6xl leading-tight text-white">
              {t(`Intros.${introKey}.title`)} <br />
              <span className="italic text-gold">{t(`Intros.${introKey}.accent`)}</span>
            </h1>

            <p className="max-w-md text-lg font-light leading-relaxed text-slate-300">{t(`Intros.${introKey}.body`)}</p>
          </section>

          <div className="flex w-full justify-center">{children}</div>
        </div>
      </div>
    </main>
  );
}
