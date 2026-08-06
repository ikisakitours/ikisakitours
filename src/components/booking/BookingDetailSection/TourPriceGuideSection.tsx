"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import { Users, PlusCircle, Info } from "lucide-react";

export function TourPriceGuideSection() {
  return (
    <section id="pricing-guide" className="mb-10 md:mb-14 px-1 border-t border-white/5 pt-10 lg:pt-16">
      <SectionHeading>Pricing & Additional Costs</SectionHeading>
      <div className=" space-y-6 text-sm font-light leading-[1.7] text-slate-300 md:text-base md:leading-[1.8] wrap-break-word">
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                <Users className="h-4 w-4" />
                <span>Base Rates by Group Size</span>
              </h3>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
                Total per group
              </span>
            </div>

            <ul className="divide-y divide-white/5 text-sm">
              <li className="flex items-center justify-between py-3 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">1 Adult</span>
                  <span className="text-xs text-slate-500 hidden sm:inline-block">(Solo Traveler)</span>
                </div>
                <div className="font-bold text-white">$33</div>
              </li>

              <li className="flex items-center justify-between py-3 bg-gold/5 -mx-5 px-5 md:-mx-7 md:px-7 border-l-2 border-gold">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gold">2 Adults</span>
                  <span className="text-xs text-gold/70 hidden sm:inline-block">(Couples / Duo)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-gold text-lanka-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider hidden sm:block">
                    Popular
                  </span>
                  <span className="font-bold text-gold">$54</span>
                </div>
              </li>
            </ul>

            <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <p>For groups of 3 or more, tiered discounts automatically apply during checkout.</p>
            </div>
          </div>

          <div className="p-5 md:p-7 border-t border-white/5 bg-surface/40">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs">
                <PlusCircle className="h-4 w-4" />
                <span>Optional Upgrades & Add-ons</span>
              </h3>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden sm:block">
                Additional Fees
              </span>
            </div>

            <ul className="divide-y divide-white/5 text-sm">
              {/* Add-on 1 */}
              <li className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 hover:bg-white/[0.01] transition-colors">
                <div>
                  <span className="block text-white font-medium">Foreign Language Speaking Guide</span>
                  <span className="text-xs text-slate-500">Expert native speaker (e.g., Japanese, German)</span>
                </div>
                <div className="font-bold text-gold sm:text-right shrink-0">
                  +$30{" "}
                  <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider ml-1">/ day</span>
                </div>
              </li>

              {/* Add-on 2 */}
              <li className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 hover:bg-white/[0.01] transition-colors">
                <div>
                  <span className="block text-white font-medium">Premium Van Upgrade</span>
                  <span className="text-xs text-slate-500">Extra spacious vehicle for comfort and heavy luggage</span>
                </div>
                <div className="font-bold text-gold sm:text-right shrink-0">
                  +$30{" "}
                  <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider ml-1">/ day</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Special Pricing Note */}
        <div className="text-xs text-slate-500 italic px-3 border-l-2 border-gold/30">
          <span className="font-semibold text-slate-400">Important Note:</span> All specified rates are subject to
          seasonal adjustments, local operational costs, and tax regulations. Final customized prices will be reflected
          securely at the checkout page.
        </div>
      </div>
    </section>
  );
}
