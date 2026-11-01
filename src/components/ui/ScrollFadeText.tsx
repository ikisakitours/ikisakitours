"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ScrollFadeTextProps = {
  children: ReactNode;
  className?: string;
  maxHeightClass?: string;
};

export function ScrollFadeText({ children, className = "", maxHeightClass = "max-h-40" }: ScrollFadeTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const isScrollable = el.scrollHeight > el.clientHeight + 1;
    setScrollable(isScrollable);
    setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }, []);

  useEffect(() => {
    check();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [check, children]);

  return (
    <div
      ref={ref}
      onScroll={check}
      data-scrollable={scrollable}
      data-at-end={atEnd}
      className={`scroll-fade no-scrollbar overflow-y-auto overscroll-contain pr-2 ${maxHeightClass} ${className}`}
    >
      {children}
    </div>
  );
}