import { Button } from "@/components/ui/Button";

export function Cta({ onShareClick }: { onShareClick: () => void }) {
  return (
    <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-4xl border border-gold/20 bg-linear-to-r from-gold/15 to-transparent p-6 text-center md:flex-row md:rounded-[2.5rem] md:p-10 md:text-left 3xl:p-20 3xl:gap-12 3xl:mb-24">
      <div className="w-full flex-1 md:w-auto">
        <h3 className="premium-serif mb-3 text-2xl italic text-white md:text-3xl 3xl:text-5xl">
          Lived an MapMate Story?
        </h3>

        <p className="mx-auto text-[13px] text-slate-400 md:text-sm md:mx-0 md:max-w-md lg:max-w-lg xl:max-w-none xl:whitespace-nowrap 3xl:text-[1.35rem] leading-relaxed">
          Your journey inspires others. Share your feedback and photos to help fellow travelers discover the magic.
        </p>
      </div>

      <div className="w-full shrink-0 md:w-auto">
        <Button
          variant="primary"
          onClick={onShareClick}
          className="w-full px-6! md:w-auto 3xl:px-16! 3xl:py-8! 3xl:text-base!"
        >
          Share Your Experience
        </Button>
      </div>
    </div>
  );
}
