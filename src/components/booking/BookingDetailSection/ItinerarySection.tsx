"use client";
import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
//Icons
import { ChevronDown, Clock, MapPin, Leaf, Zap, Utensils, Bed, ArrowRight } from "lucide-react";

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
                className="relative flex w-full cursor-pointer items-center justify-between py-4 px-4 sm:py-4 sm:px-5 md:py-5 md:px-6 text-left gap-2 sm:gap-3"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1 w-full">
                  {/* Day Badge (Shrink-0 prevents it from getting squeezed) */}
                  <div
                    className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl transition-colors md:h-14 md:w-14 ${
                      isOpen ? "bg-gold text-lanka-black" : "bg-white/10 text-white"
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest md:text-[10px]">Day</span>
                    <span className="text-base font-black leading-none md:text-xl">{day.day}</span>
                  </div>

                  <div className="flex flex-col min-w-0 flex-1 w-full py-0.5">
                    <h3 className="w-full text-[13px] min-[340px]:max-[365px]:text-[0.72rem] min-[375px]:max-[667px]:text-[0.78rem] min-[540px]:text-[0.9rem] sm:text-sm md:text-lg font-bold tracking-wide text-white leading-snug">
                      {day.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-start gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[10px] min-[375px]:max-[667px]:text-[0.62rem] min-[340px]:max-[365px]:text-[0.6rem] min-[540px]:text-[0.75rem] sm:text-[11px] md:text-xs font-medium tracking-wide text-gold">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span className="whitespace-nowrap">Travel Time: {day.travelTime}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Chevron Arrow (Shrink-0 keeps its size perfect) */}
                <div className="flex shrink-0 items-center justify-center pl-1 sm:pl-2">
                  <div
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gold/10 transition-colors ${
                      isOpen ? "bg-gold/20" : ""
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </button>

              {/* BUTTERY SMOOTH CSS ACCORDION BODY */}
              <div className={`accordion-content-wrapper ${isOpen ? "is-open" : ""}`}>
                <div className="accordion-content-inner">
                  <div className="border-t border-white/5 p-4 pt-4 sm:p-5 md:p-6">
                    <div className="space-y-4 mb-6 border-b border-white/5 pb-6 pt-4">
                      {/* 1. Route Section */}
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 mb-2">
                          Route Overview
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {day.route.map((loc: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/2 px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-gold/5 hover:text-gold">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold/50 transition-colors group-hover:bg-gold"></span>
                                {loc}
                              </span>
                              {idx < day.route.length - 1 && (
                                <ArrowRight className="h-3 w-3 shrink-0 text-gold/60 mx-1" strokeWidth={4} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Locations Section */}
                      <div className="pt-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 mb-2">
                          Key Destinations
                        </h4>
                        <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-1.5 md:gap-3">
                          {day.locations.map((loc: string, idx: number) => (
                            <span
                              key={idx}
                              className="flex items-center gap-2 text-[13px] sm:text-[10px] md:text-xs font-medium text-slate-300"
                            >
                              <MapPin className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                              {loc}
                              {idx < day.locations.length - 1 && (
                                <span className="hidden md:inline text-gold/50 ml-1">•</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 mb-3">
                        Day Itinerary
                      </h4>
                      <ul className="relative space-y-4 pl-6 before:absolute before:inset-y-2 before:left-1.75 before:w-px before:bg-white/10">
                        {day.details.map((detail: string, idx: number) => (
                          <li
                            key={idx}
                            className="relative text-sm font-light leading-relaxed text-slate-300 wrap-break-word"
                          >
                            <span className="absolute -left-5 top-1.5 h-2 w-2 rounded-full bg-gold ring-4 ring-lanka-black" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

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
                          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold">
                            <Zap className="h-3.5 w-3.5 text-gold" /> Activities
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 md:text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
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
