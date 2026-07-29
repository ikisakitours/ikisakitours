"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CalendarDays, Radio, Sparkles, ExternalLink } from "lucide-react";
import { SpecialEventListItem } from "@/data/specialEvents";
import { useInView } from "framer-motion";

import UniversalPlayer from "@/components/home/SpecialEvents/UniversalPlayer";
import { SpecialEventsImageSlider } from "@/components/home/SpecialEvents/SpecialEventsImageSlider";

interface EventCardProps {
  event: SpecialEventListItem;
}

export function EventCard({ event }: EventCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      console.log("▶️ SpecialEventsMedia is IN VIEWPORT: Playing/Active state triggered.");
    } else {
      console.log("⏸️ SpecialEventsMedia is OUT OF VIEWPORT: Pausing/Inactive state.");
    }
  }, [isInView]);

  const eventLink = `/special-events/${event.slug}`;

  const getButtonText = () => {
    switch (event.mode) {
      case "live":
        return "View Details & Watch Live";
      case "upcoming":
        return "View Event Schedule";
      case "SpecialEvent":
        return "Explore Full Details";
      default:
        return "View Event Details";
    }
  };

  const displayDate =
    event.mode === "upcoming" && event.date.includes("T")
      ? new Date(event.date).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : event.date;

  return (
    <div
      ref={containerRef}
      className="glass-card group flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 p-4 transition-all duration-300 hover:border-gold/50 hover:shadow-2xl"
    >
      {/* Media Container (Video / Slider / Image) */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-surface">
        {event.videoUrl ? (
          <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
            {isInView ? (
              <UniversalPlayer url={event.videoUrl} />
            ) : (
              <div className="absolute inset-0 bg-black flex items-center justify-center pointer-events-auto">
                <span className="text-xs text-slate-500 tracking-wider">Stream Paused (Out of View)</span>
              </div>
            )}
          </div>
        ) : event.images && event.images.length > 0 ? (
          <div className="absolute inset-0 h-full w-full z-0">
            <SpecialEventsImageSlider images={event.images} titleAccent={event.title} targetLink={eventLink} />
          </div>
        ) : (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent pointer-events-none z-0" />

        {/* --- LIVE NOW Broadcast Badge (Top Left) --- */}
        {event.mode === "live" && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/80 px-3 py-1 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
              {event.broadcastTag || "LIVE NOW"}
            </span>
          </div>
        )}

        {/* Category Badge (Top Right if Live, otherwise Top Left) */}
        <div
          className={`absolute top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 backdrop-blur-md shadow-lg ${
            event.mode === "live" ? "right-3" : "left-3"
          }`}
        >
          {event.category === "Live" ? (
            <Radio className="h-3 w-3 text-red-500 animate-pulse" />
          ) : (
            <Sparkles className="h-3 w-3 text-gold" />
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
            {event.badge || event.category}
          </span>
        </div>

        {/* Status / Date Tag */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <CalendarDays className="h-3.5 w-3.5 text-gold" />
            <span>{displayDate}</span>
          </div>
          <span className="rounded-full bg-gold/20 border border-gold/40 px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase shadow-md backdrop-blur-sm">
            {event.statusTag || event.status}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col grow p-4 pt-6">
        <h3 className="premium-serif text-xl font-normal text-white mb-3 group-hover:text-gold transition-colors">
          {event.title}
        </h3>
        <p className="text-xs font-light leading-relaxed text-slate-300 line-clamp-3 mb-6 grow">{event.description}</p>

        <Button variant="details" href={eventLink} className="w-full py-4!">
          <span className="flex w-full items-center justify-center gap-2 whitespace-nowrap">
            <span>{getButtonText()}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </Button>
      </div>
    </div>
  );
}
