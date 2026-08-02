"use client";

import React from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import DestinationsAboutSection from "@/components/Destinations/DestinationSlug/DestinationsAboutSection";
import HighlightsAttractionsSection from "@/components/Destinations/DestinationSlug/HighlightsAttractionsSection";
import PhotosSection from "@/components/Destinations/DestinationSlug/PhotosSection";
import SidebarWidget from "@/components/Destinations/DestinationSlug/SidebarWidget";
import { Destination } from "@/data/destinationData";

type DestinationsBodyProps = {
  dest: Destination;
};

export default function DestinationsBody({ dest }: DestinationsBodyProps) {
  return (
    <ContainerLayout className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12 xl:gap-10">
        <div className="flex flex-col gap-8 xl:col-span-8">
          {/* 1. About Section */}
          <DestinationsAboutSection name={dest.name} about={dest.about} />

          {/* 2. Highlights & Attractions Section */}
          <HighlightsAttractionsSection attractions={dest.attractions} />

          {/* 3. Photos Section */}
          <PhotosSection name={dest.name} slug={dest.slug} photos={dest.photos} />
        </div>

        {/* RIGHT COLUMN (Sidebar Widget) */}
        <SidebarWidget name={dest.name} guide={dest.guide} />
      </div>
    </ContainerLayout>
  );
}
