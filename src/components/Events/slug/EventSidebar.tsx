import React from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { LikeButton } from "@/components/ui/LikeButton";
import { CountdownTimer } from "@/components/home/Events/CountdownTimer";
//Icons
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventSidebarProps {
  eventDate: string;
  eventTime: string;
  eventLocation: string;

  eventTitle: string;
  eventSlug: string;
  mode: string;
  targetDate?: string;
}

export function EventSidebar({
  eventDate,
  eventTime,
  eventLocation,

  eventTitle,
  eventSlug,
  mode,
  targetDate,
}: EventSidebarProps) {
  return (
    <div className="glass-card rounded-[2.5rem] border border-gold/20 p-6 md:p-8 sticky top-28 space-y-6 ">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">
          {mode === "live" ? "Live Broadcast" : mode === "upcoming" ? "Upcoming Event" : "Featured Experience"}
        </span>
        <h3 className="premium-serif text-2xl text-white mt-1">
          {mode === "live" ? "Happening Now" : "Secure Your Access"}
        </h3>
      </div>

      <div className="space-y-4 text-sm text-slate-300">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-gold shrink-0" />
          <div>
            <span className="block text-xs text-slate-400">Date</span>
            <span className="font-medium text-white">{eventDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gold shrink-0" />
          <div>
            <span className="block text-xs text-slate-400">Time</span>
            <span className="font-medium text-white">{eventTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gold shrink-0" />
          <div>
            <span className="block text-xs text-slate-400">Location</span>
            <span className="font-medium text-white">{eventLocation}</span>
          </div>
        </div>
      </div>

      {mode === "upcoming" && targetDate && (
        <div className="pt-6 pb-2 border-t border-white/10 mt-6">
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mb-4">Time Remaining</p>
          <CountdownTimer targetDate={targetDate} />
        </div>
      )}

      <div className="pt-2 space-y-6">
        {mode === "live" && (
          <div className="flex w-full justify-center">
            <div className="relative w-full sm:w-auto overflow-hidden rounded-2xl border border-red-500/40 bg-[#070304] px-8 py-3.5 shadow-[0_0_25px_rgba(239,68,68,0.15)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(239,68,68,0.08)_50%,transparent_100%)] animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

              <div className="relative z-10 flex items-center justify-center gap-3.5">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-4 w-4 rounded-full border border-red-500/50 animate-ping opacity-75" />
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                  </span>
                </div>

                <span className="whitespace-nowrap text-[11px] md:text-xs font-bold tracking-[0.25em] text-red-400 uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                  Streaming Live Broadcast
                </span>
              </div>

              <div className="absolute top-0 left-1/4 h-px w-1/2 bg-linear-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444]" />
              <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-linear-to-r from-transparent via-rose-500/50 to-transparent" />
            </div>
          </div>
        )}

        {/* --- Like සහ Share Buttons --- */}
        <div className="grid grid-cols-2 pt-2 border-t border-white/10">
          <div className="flex justify-center border-r border-white/10 py-3">
            <LikeButton
              initialLikes={42}
              className="flex items-center justify-center w-full gap-2 text-slate-400 hover:text-gold transition-colors group"
              iconClassName="group-hover:scale-110 transition-transform"
            />
          </div>
          <div className="flex justify-center py-3">
            <ShareButton
              title={eventTitle}
              text={`Check out ${eventTitle} on MapMate Sri Lanka!`}
              url={`/special-events/${eventSlug}`}
              className="flex items-center justify-center w-full text-slate-400 hover:text-gold transition-colors group"
              iconClassName="group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
