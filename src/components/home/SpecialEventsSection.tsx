"use client";

import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { SpecialEventsContent } from "@/components/home/SpecialEvents/SpecialEventsContent";
import { SpecialEventsMedia } from "@/components/home/SpecialEvents/SpecialEventsMedia";
import { SpecialEventMode, EventContentItem } from "@/data/specialEvents";

interface SpecialEventsSectionProps {
  mode: SpecialEventMode;
  content: EventContentItem;
  targetLink: string;
  upcomingTargetDate: string;
}

export function SpecialEventsSection({ mode, content, targetLink, upcomingTargetDate }: SpecialEventsSectionProps) {
  return (
    <section id="special-events" className="relative overflow-hidden bg-background py-12 md:py-20 xl:py-24 3xl:py-32">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-gold/10 blur-[140px] md:h-125 md:w-125" />

      <ContainerLayout>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <SpecialEventsContent mode={mode} content={content} targetLink={targetLink} />

          <SpecialEventsMedia
            mode={mode}
            content={content}
            targetLink={targetLink}
            upcomingTargetDate={upcomingTargetDate}
          />
        </div>
      </ContainerLayout>
    </section>
  );
}
