"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
//Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { id: "about", key: "about" },
  { id: "highlights", key: "highlights" },
  { id: "description", key: "details" },
  { id: "itinerary", key: "itinerary" },
  { id: "Covered-CitiesRoute", key: "citiesRoute" },
  { id: "includes", key: "includesExcludes" },
  { id: "essentials", key: "bring" },
  { id: "Tour-Customization", key: "bespoke" },
  { id: "Covered-Destinations", key: "destinations" },
  { id: "reviews", key: "reviews" },
];

export function BookingNavigation() {
  const t = useTranslations("Booking.Navigation");
  const [activeSection, setActiveSection] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();

    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky nav
      const navOffset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);

            const activeLink = document.querySelector(`a[href="#${id}"]`) as HTMLElement;
            if (activeLink && scrollRef.current) {
              const container = scrollRef.current;

              const containerRect = container.getBoundingClientRect();
              const linkRect = activeLink.getBoundingClientRect();

              const currentScrollLeft = container.scrollLeft;
              const linkOffsetWithinContainer = linkRect.left - containerRect.left + currentScrollLeft;

              const targetScrollLeft = linkOffsetWithinContainer - container.clientWidth / 2 + linkRect.width / 2;

              container.scrollTo({
                left: targetScrollLeft,
                behavior: "smooth",
              });
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-100px 0px -60% 0px", // Adjust based on layout
        threshold: 0,
      },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // Removed external px values to rely on ContainerLayout
    <nav className="sticky top-20 z-50 mb-8 md:mb-14">
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-full border border-white/5 bg-white/3 p-1 shadow-xl backdrop-blur-3xl transition-all duration-500 hover:border-gold/20">
        <div className="relative flex w-full items-center justify-between px-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/20 text-white border border-white/10 backdrop-blur-md hover:border-gold hover:text-gold transition-all"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={3} />
          </button>
          {/* Main scroll container: internal gaps and padding kept for element spacing */}
          <div ref={scrollRef} className="no-scrollbar flex flex-1 gap-6 overflow-x-auto pl-4 pr-4 py-4 justify-start">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
                className={`whitespace-nowrap font-bold uppercase tracking-[0.2em] transition-all duration-300 
            text-[12px] md:text-[13px]
            ${activeSection === item.id ? "text-gold scale-105" : "text-slate-300 hover:text-white"}`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/20 text-white border border-white/10 backdrop-blur-md hover:border-gold hover:text-gold transition-all"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      </div>
    </nav>
  );
}
