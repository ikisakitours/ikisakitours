import { type ReactNode } from "react";

type FormPanelProps = {
  children: ReactNode;
  className?: string;
};

export default function FormPanel({ children, className = "" }: FormPanelProps) {
  return (
    <section
      className={`glass-card relative rounded-4xl border border-white/10 bg-[#0a0a0a]/85 p-6 shadow-2xl backdrop-blur-3xl md:p-10 ${className}`}
    >
      {children}
    </section>
  );
}
