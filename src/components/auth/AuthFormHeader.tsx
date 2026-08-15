import { useTranslations } from "next-intl";
type AuthFormHeaderProps = {
  introKey: "Gateway" | "Signup" | "Login" | "Recovery" | "Reset";
};

export function AuthFormHeader({ introKey }: AuthFormHeaderProps) {
  const t = useTranslations("Auth");
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-6 bg-gold/40" />
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
          {t(`FormHeaders.${introKey}.eyebrow`)}
        </span>
        <div className="h-px w-6 bg-gold/40" />
      </div>
      <h1 className="premium-serif text-3xl text-white">{t(`FormHeaders.${introKey}.title`)}</h1>
    </div>
  );
}
