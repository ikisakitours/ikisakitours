"use client";
import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface EventHeaderProps {
  badge: string;
  titlePart1: string;
  titleAccent: string;
  description: string;
}

export function EventHeader({ badge, titlePart1, titleAccent, description }: EventHeaderProps) {
  return (
    <>
      {/* Header Section */}
      <div className="max-w-4xl mb-12 ">
        <SectionLabel>{badge}</SectionLabel>
        <h1 className="premium-serif  text-heading-section leading-tight font-light  text-white l mb-6">
          {titlePart1} <span className="gold-gradient-text italic">{titleAccent}</span>
        </h1>

        <p className="font-normal text-body leading-relaxed text-slate-400">{description}</p>
      </div>
    </>
  );
}
