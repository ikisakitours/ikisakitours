import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { EventHeader } from "@/components/Events/slug/EventHeader";
import { EventMedia } from "@/components/Events/slug/EventMedia";
import { EventAbout } from "@/components/Events/slug/EventAbout";
import { EventSidebar } from "@/components/Events/slug/EventSidebar";
import { SpecialEventListItem } from "@/data/specialEvents";

interface EventBodyProps {
  listItem: SpecialEventListItem;
}

export function EventBody({ listItem }: EventBodyProps) {
  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-32 relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-96 w-96 rounded-full bg-gold/10 blur-[150px] z-0" />

      <ContainerLayout className="relative z-10">
        <EventHeader
          badge={listItem.badge}
          titlePart1={listItem.title.split(" ")[0]}
          titleAccent={listItem.title.substring(listItem.title.indexOf(" ") + 1)}
          description={listItem.description}
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          <div className="xl:col-span-8">
            <EventMedia
              image={listItem.image}
              titleAccent={listItem.title}
              statusTag={listItem.statusTag}
              videoUrl={listItem.videoUrl}
              mode={listItem.mode}
              broadcastTag={listItem.broadcastTag}
              images={listItem.images}
            />

            <EventAbout
            slug={listItem.slug}
              aboutTitle={listItem.aboutTitle}
              aboutText1={listItem.aboutText1}
              aboutText2={listItem.aboutText2}
              perks={listItem.perks}
              images={listItem.images}
            />
          </div>

          <div className="xl:col-span-4 mt-5">
            <EventSidebar
              eventDate={listItem.eventDate}
              eventTime={listItem.eventTime}
              eventLocation={listItem.eventLocation}
              eventTitle={listItem.title}
              eventSlug={listItem.slug}
              mode={listItem.mode}
              targetDate={listItem.date}
            />
          </div>
        </div>
      </ContainerLayout>
    </main>
  );
}