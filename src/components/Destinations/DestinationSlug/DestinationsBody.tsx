"use client";

import React, { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import DestinationsAboutSection from "@/components/Destinations/DestinationSlug/DestinationsAboutSection";
import HighlightsAttractionsSection from "@/components/Destinations/DestinationSlug/HighlightsAttractionsSection";
import PhotosSection from "@/components/Destinations/DestinationSlug/PhotosSection";
import SidebarWidget from "@/components/Destinations/DestinationSlug/SidebarWidget";
import { Destination } from "@/data/destinationData";
import BackNavigation from "@/components/Destinations/DestinationSlug/BackNavigation";

type DestinationsBodyProps = {
  dest: Destination;
};

export default function DestinationsBody({ dest }: DestinationsBodyProps) {
  return (
    <ContainerLayout>
      <Suspense
        fallback={
          <div className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold/50">
            <ArrowLeft className="h-4 w-4" />
            Loading...
          </div>
        }
      >
        <BackNavigation />
      </Suspense>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* LEFT COLUMN (Main Content) */}
        <div className="flex flex-col gap-8 lg:col-span-8">
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
