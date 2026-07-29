import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  backgroundText?: string;
  title: string;
  description: React.ReactNode;
  buttonText?: string;
  onAction?: () => void;
};

export function EmptyState({ backgroundText = "Heritage", title, description, buttonText, onAction }: EmptyStateProps) {
  return (
    <ContainerLayout>
      <div className=" flex min-h-125 flex-col items-center justify-center text-center animate-fade-in-up">
        <div className="relative flex w-full items-center justify-center">
          {/* Background Text */}
          <span className="premium-serif absolute select-none whitespace-nowrap text-[90px] font-bold tracking-tighter text-white/2 sm:text-[120px] md:text-[140px] lg:text-[170px] xl:text-[200px]">
            {backgroundText}
          </span>

          <div className="relative z-10">
            <div className="mb-4 inline-block">
              <div className="mx-auto mb-6 h-px w-12 bg-gold/50" />
              <h2 className="premium-serif text-3xl lowercase italic tracking-widest text-white md:text-4xl">
                {title}
              </h2>
            </div>

            <div className="mx-auto max-w-sm text-xs font-light uppercase leading-loose tracking-widest text-gray-400 opacity-80 md:text-sm">
              {description}
            </div>

            {/* Reusable Explore Button */}
            {buttonText && onAction && (
              <div className="mt-12 flex justify-center">
                <Button type="button" variant="explore" onClick={onAction}>
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
}
