"use client";
import React from "react";
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
    <div className="w-full flex flex-col pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      {/* Constrained Body Content */}
      <ContainerLayout className="">
        <div className="w-full flex flex-col gap-12">
          <OriginSection />
          <StatsSection />
          <MissionVisionSection />
          <CoreValues />
          <Leadership />
          <AboutCTA />
          <Trademark />
        </div>
      </ContainerLayout>
    </div>
  );
}