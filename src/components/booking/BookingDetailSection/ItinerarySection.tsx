"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Clock, MapPin, Navigation, Leaf, Zap, Utensils, Bed } from "lucide-react";
import SectionHeading from "./SectionHeading";

type ItineraryDay = {
  day: number;
  title: string;
  travelTime: string;
  locations: string[];
  route: string[];
  details: string[];
  scenicStops?: string[];
  activities?: string[];
  meals: string;
  accommodation: string;
};

type ItinerarySectionProps = {
  tour: {
    itinerary: ItineraryDay[];
  };
};

export default function ItinerarySection({ tour }: ItinerarySectionProps) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const toggleDay = (dayNum: number) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };
  type ItineraryDay = {
    day: number;
    title: string;
    travelTime: string;
    locations: string[];
    route: string[];
    details: string[];
    scenicStops?: string[];
    activities?: string[];
    meals: string;
    accommodation: string;
  };
  return (
    <section id="itinerary" className="mb-10 md:mb-14 px-1">
      <SectionHeading>Itinerary & Meeting Point</SectionHeading>

      <div className="mb-8 flex flex-col gap-4">
        {tour.itinerary.map((day: ItineraryDay) => {
          const isOpen = openDay === day.day;

          return (
            <div
              key={day.day}
              className={`flex flex-col overflow-hidden rounded-2xl border transition-colors duration-500 ${
                isOpen ? "border-gold/40 bg-white/5 shadow-xl" : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleDay(day.day)}
                className="relative flex w-full cursor-pointer items-start justify-between py-10 px-4 sm:py-6 sm:px-5 md:py-5 md:px-6 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4 sm:items-center md:gap-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl transition-colors md:h-14 md:w-14 ${
                      isOpen ? "bg-gold text-lanka-black" : "bg-white/10 text-white"
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest md:text-[10px]">Day</span>
                    <span className="text-lg font-black leading-none md:text-xl">{day.day}</span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold tracking-wide text-white md:text-lg wrap-break-word">
                      {day.title}
                    </h3>

                    <div className="mt-2 flex flex-col items-start gap-2">
                      <span className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[13px] sm:text-[10px] md:text-xs font-medium tracking-wide text-gold whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span>Travel Time: {day.travelTime}</span>
                      </span>

                      <span className="flex items-center gap-2 text-[13px] sm:text-[10px] md:text-xs font-medium text-slate-300">
                        <MapPin className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                        {day.locations.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-4 md:right-6">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 transition-colors ${
                      isOpen ? "bg-gold/20" : ""
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </button>

              {/* BUTTERY SMOOTH CSS ACCORDION BODY */}
              <div className={`accordion-content-wrapper ${isOpen ? "is-open" : ""}`}>
                <div className="accordion-content-inner">
                  <div className="mt-2 border-t border-white/5 p-4 pt-0 sm:p-5 md:p-6">
                    <div className="mb-6 flex flex-wrap items-center gap-2 pt-4 border-b border-white/5 pb-6">
                      {day.route.map((loc: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 rounded-full border border-gold/10 bg-gold/5 px-3 py-1.5 text-xs font-semibold text-gold/90">
                            <Navigation className="h-3 w-3" />
                            {loc}
                          </span>
                          {idx < day.route.length - 1 && <ChevronRight className="h-4 w-4 text-slate-500" />}
                        </div>
                      ))}
                    </div>

                    <ul className="relative mb-8 space-y-4 pl-6 before:absolute before:inset-y-2 before:left-1.75 before:w-px before:bg-white/10">
                      {day.details.map((detail: string, idx: number) => (
                        <li
                          key={idx}
                          className="relative text-sm font-light leading-relaxed text-slate-300 wrap-break-word"
                        >
                          <span className="absolute -left-6 top-1.5 h-2 w-2 rounded-full bg-gold ring-4 ring-lanka-black" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {day.scenicStops && day.scenicStops.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            <Leaf className="h-3.5 w-3.5" /> Scenic Stops
                          </h4>
                          <ul className="space-y-2">
                            {day.scenicStops.map((stop: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 md:text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50" />
                                {stop}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {day.activities && day.activities.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                            <Zap className="h-3.5 w-3.5" /> Activities
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 md:text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/50" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-6 border-t border-white/5 mt-6">
                      <div className="rounded-xl border border-white/5 bg-white/5 p-4 md:p-5">
                        <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          Meals Included
                        </span>
                        <div className="flex items-center gap-2 text-sm font-bold text-white md:text-base">
                          <Utensils className="h-4 w-4 text-gold" />
                          {day.meals}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/5 p-4 md:p-5">
                        <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          Accommodation / Hotel
                        </span>
                        <div className="flex items-center gap-2 text-sm font-bold text-white md:text-base">
                          <Bed className="h-4 w-4 text-gold" />
                          {day.accommodation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
