import { type ReactNode } from "react";

type StepHeadingProps = {
  step: string;
  children: ReactNode;
  subtitle?: string;
};

export default function StepHeading({ step, children, subtitle }: StepHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="flex items-center text-body-lead font-bold uppercase tracking-wider text-white">
          <span className="mr-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-body-sm font-bold text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]">
            {step}
          </span>
          {children}
        </h2>
        {subtitle ? (
          <p className="mt-2 pl-11 text-caption font-bold uppercase tracking-[0.2em] text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="hidden h-px flex-1 bg-linear-to-r from-transparent via-white/10 to-transparent md:block" />
    </div>
  );
}