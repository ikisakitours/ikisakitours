import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "tag" | "service" | "inquire" | "explore" | "auth" | "details" | "shine" | "reviewTag";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = "primary", href, children, className = "", ...props }: ButtonProps) {
  const baseStyles = "transition-all duration-300";

  const variants = {
    primary:
      "rounded-lg bg-gold px-4 py-2.5 text-[0.625rem] font-bold uppercase tracking-widest text-lanka-black hover:bg-foreground md:rounded-xl md:px-8 md:py-4 md:text-xs",
    tag: "border-b border-transparent pb-0.5 text-xs font-medium text-foreground/70 hover:border-gold/50 hover:text-gold md:text-[0.8125rem]",
    service:
      "group relative flex cursor-pointer items-center gap-3 rounded-full border border-gold/40 bg-lanka-black/60 px-4 py-2 backdrop-blur-md hover:scale-105 hover:border-gold hover:bg-gold/20 md:px-6 md:py-3 shadow-[0_0_15px_rgba(197,160,89,0.15)] hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]",
    inquire:
      "group flex w-full sm:w-auto items-center justify-center rounded-full bg-gold px-12 py-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-lanka-black shadow-xl shadow-gold/10 hover:scale-105 3xl:px-16 3xl:py-6 3xl:text-sm 4xl:px-20 4xl:py-8 4xl:text-base",
    explore: "group inline-flex items-center",
    auth: "!tracking-[0.2em] flex w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark py-5 px-8 text-[13px] font-extrabold uppercase tracking-[0.6em] text-black transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    details:
      "group relative flex shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:border-gold min-h-[44px] px-5 py-3 sm:min-h-0 sm:px-5 sm:py-2.5 lg:px-6",
    shine:
      "group relative flex items-center justify-center overflow-hidden rounded border-2 border-gold/30 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:border-gold animate-pulse shadow-[0_0_15px_rgba(197,160,89,0.3)] px-6 py-3 md:px-8 md:py-4 3xl:px-10 3xl:py-5",
    reviewTag:
      "flex w-full sm:w-fit items-center justify-center rounded border-2 border-gold/30 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-gold hover:border-gold px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-black md:px-8 md:py-4 md:text-xs",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const content =
    variant === "explore" ? (
      <div className="relative flex items-center justify-center">
        <div className="absolute right-full mr-4 h-px w-8 bg-gold/30 opacity-0 transition-all duration-500 group-hover:w-16 group-hover:bg-gold md:w-12 md:group-hover:w-20 3xl:w-16 3xl:group-hover:w-24" />

        <div className="relative overflow-hidden rounded-full border border-gold/50 px-6 py-3 shadow-xl transition-all duration-500 md:px-8 md:py-4 3xl:px-10 3xl:py-5">
          <span className="relative z-10 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-colors duration-500 group-hover:text-black! md:text-xs 3xl:text-sm">
            {children}
          </span>

          <div className="absolute inset-0 translate-y-full bg-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
        </div>
      </div>
    ) : variant === "details" ? (
      <>
        <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 sm:text-[10px]">
          {children}
        </span>
        <div className="absolute inset-0 z-0 h-full w-full -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </>
    ) : variant === "shine" ? (
      <>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-transparent via-white/15 to-transparent animate-sheen-sweep" />
        </div>
        <span className="relative z-10 whitespace-nowrap font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-black text-[10px] md:text-xs 3xl:text-sm">
          {children}
        </span>
      </>
    ) : variant === "reviewTag" ? (
      <span className="flex flex-row items-center justify-center gap-2 font-bold leading-none">{children}</span>
    ) : (
      children
    );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {content}
    </button>
  );
}
