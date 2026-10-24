import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  backgroundText?: string;
  title: string;
  description: React.ReactNode;
  buttonText?: string;
  onAction?: () => void;
  className?: string;
  isMap?: boolean;
};

export function EmptyState({
  backgroundText = "Heritage",
  title,
  description,
  buttonText,
  onAction,
  className = "-mt-60 md:-mt-48",
  isMap = false,
}: EmptyStateProps) {
  const content = (
    <div className="flex min-h-125 flex-col items-center justify-center text-center animate-fade-in-up pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6">
      <div className={`relative flex w-full items-center justify-center ${className}`}>
        {/* Background Text */}
        <span className="premium-serif absolute select-none whitespace-nowrap text-[90px] font-bold tracking-tighter text-white/2 sm:text-[120px] md:text-[140px] lg:text-[170px] xl:text-[200px]">
          {backgroundText}
        </span>
        <div className="relative z-10 max-w-md">
          <div className="mb-4 inline-block">
            <div className="mx-auto mb-6 h-px w-12 bg-gold/50" />
            <h2 className="premium-serif text-heading-sub scale-110 sm:scale-130 lowercase italic tracking-widest text-white">
              {title}
            </h2>
          </div>

          <div className="mx-auto max-w-sm text-caption scale-100 sm:scale-109 font-light uppercase leading-loose tracking-widest text-gray-200 opacity-80">
            {description}
          </div>

          {/* Reusable Explore Button */}
          {buttonText && onAction && (
            <div className="mt-6 flex justify-center">
              <Button type="button" className="[&_span]:text-caption!" variant="explore" onClick={onAction}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isMap) {
    return content;
  }

  return <ContainerLayout>{content}</ContainerLayout>;
}
