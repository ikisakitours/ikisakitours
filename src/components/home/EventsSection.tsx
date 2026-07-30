"use client";

import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { EventsContent } from "@/components/home/Events/EventsContent";
import { EventsMedia } from "@/components/home/Events/EventsMedia";
import { apiResponseEvents } from "@/data/specialEvents";

export function SpecialEventsSection() {
  const activeEvent = apiResponseEvents.find((evt) => evt.mode === "upcoming") || apiResponseEvents[0];

  if (!activeEvent) return null;

  const dynamicTargetLink = activeEvent.mode === "Event" ? "/events" : `/events/${activeEvent.slug}`;

  const targetDate = activeEvent.targetDate || "";

  return (
    <section id="events" className="relative overflow-hidden bg-background py-12 md:py-20 xl:py-24 3xl:py-32">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-gold/10 blur-[140px] md:h-125 md:w-125" />

      <ContainerLayout>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <EventsContent mode={activeEvent.mode} content={activeEvent} targetLink={dynamicTargetLink} />

          <EventsMedia
            mode={activeEvent.mode}
            content={activeEvent}
            targetLink={dynamicTargetLink}
            upcomingTargetDate={targetDate}
          />
        </div>
      </ContainerLayout>
    </section>
  );
}
