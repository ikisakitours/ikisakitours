"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { GalleryItem } from "@/data/blog";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

type GalleryCollectionProps = {
  items: GalleryItem[];
};

const INITIAL_COUNT = 4;

export function GalleryCollection({ items }: GalleryCollectionProps) {
  const t = useTranslations("Gallery.Collection");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const isOpen = activeItem !== null;

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % items.length));
  }, [items.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index === null ? items.length - 1 : (index - 1 + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        showNext();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showNext, showPrevious]);

  function handleTouchStart(screenX: number) {
    touchStartX.current = screenX;
  }

  function handleTouchEnd(screenX: number) {
    if (touchStartX.current === null) {
      return;
    }

    const swipeDistance = screenX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }

  return (
    <section className="pb-28 md:pb-32">
      <ContainerLayout>
        <div
          id="gallery-grid"
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 3xl:grid-cols-4 3xl:gap-8"
        >
          {visibleItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} priority={index < 2} onSelect={() => setActiveIndex(index)} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center md:mt-14">
          {hasMore ? (
            <Button
              type="button"
              className="[&_span]:text-caption!"
              variant="explore"
              onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
            >
              {t("loadMore")}
            </Button>
          ) : null}

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px w-8 bg-gold/20" />
            <p className="whitespace-nowrap text-tiny font-medium uppercase tracking-[0.2em] text-slate-500">
              {t("showing")} <span className="text-gold">{visibleItems.length}</span> {t("of")}
              <span className="text-white">{items.length}</span> {t("images")}
            </p>
            <div className="h-px w-8 bg-gold/20" />
          </div>
        </div>
      </ContainerLayout>

      {activeItem ? (
        <GalleryLightbox
          activeItem={activeItem}
          activeIndex={activeIndex ?? 0}
          totalCount={items.length}
          onClose={() => setActiveIndex(null)}
          onNext={showNext}
          onPrevious={showPrevious}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          items={items}
          onSelectIndex={(index) => setActiveIndex(index)}
        />
      ) : null}
    </section>
  );
}
