"use client";
import React from "react";
import { aboutData } from "@/data/aboutData";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import OriginSection from "@/components/about/OriginSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import Leadership from "@/components/about/Leadership";
import Trademark from "@/components/about/Trademark";
import CoreValues from "@/components/about/CoreValues";
import StatsSection from "@/components/about/StatsSection";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutBody() {
  return (
    <div className="w-full flex flex-col -mt-24 pb-24">
      {/* Constrained Body Content */}
      <ContainerLayout className="py-12">
        <div className="w-full flex flex-col gap-12">
          {/* Passing Data as Props */}
          <OriginSection data={aboutData.origin} />
          <StatsSection data={aboutData.stats} />
          <MissionVisionSection mission={aboutData.mission} vision={aboutData.vision} />
          <CoreValues data={aboutData.coreValues} />
          <Leadership data={aboutData.leadership} />
          <AboutCTA />
          <Trademark data={aboutData.trademark} />
        </div>
      </ContainerLayout>
    </div>
  );
}
