import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { specialEventContent } from "@/data/specialEvents";
import { CalendarDays, Clock, MapPin, ArrowLeft, Share2, Sparkles, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SpecialEventDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const isPerahera = slug === "kandy-esala-perahera";

  if (!isPerahera && slug !== "default-event") {
  }

  const event = specialEventContent.active;

  return (
    <main className="min-h-screen bg-background text-foreground pb-24 pt-32">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-96 w-96 rounded-full bg-gold/10 blur-[150px]" />

      <ContainerLayout>
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="max-w-4xl mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{event.badge}</span>
          </div>

          <h1 className="premium-serif text-4xl font-light leading-[1.15] text-white sm:text-5xl md:text-6xl mb-6">
            {event.titlePart1} <span className="gold-gradient-text italic">{event.titleAccent}</span>
          </h1>

          <p className="text-base font-light leading-relaxed text-slate-300 md:text-lg">{event.description}</p>
        </div>

        {/* Main Grid: Media & Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Big Image / Video Showcase (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="glass-card relative overflow-hidden rounded-[2.5rem] border border-white/10 p-3 shadow-2xl md:p-4">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl bg-surface">
                <Image
                  src={event.image || ""}
                  alt={event.titleAccent}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                {/* Floating Status Tag */}
                <div className="absolute bottom-6 left-6 rounded-xl border border-white/15 bg-black/70 px-5 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{event.statusTag}</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description / Content */}
            <div className="mt-12 space-y-6 text-slate-300 font-light leading-relaxed">
              <h3 className="premium-serif text-2xl text-white font-normal">About The Experience</h3>
              <p>
                Immerse yourself in the breathtaking majesty of Sri Lanka&apos;s cultural pinnacle. The Kandy Esala
                Perahera is a magnificent display of faith, history, and artistry, featuring thousands of performers,
                traditional drummers, fire-wielders, and majestic elephants adorned in glittering garments.
              </p>
              <p>
                Our exclusive packages ensure you secure the finest viewing galleries, expert cultural guides, and
                seamless luxury transport to and from the sacred city of Kandy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {[
                  "Reserved VIP Grandstand Seating",
                  "Guided Historical Commentary",
                  "Complimentary Traditional Refreshments",
                  "Private Luxury Transit Options",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-surface/50 border border-white/5 p-4 rounded-2xl"
                  >
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking / Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-[2.5rem] border border-gold/20 p-6 md:p-8 sticky top-28 space-y-6">
              <div className="border-b border-white/10 pb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-gold font-bold">Event Pass</span>
                <h3 className="premium-serif text-2xl text-white mt-1">Secure Your Access</h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Date</span>
                    <span className="font-medium text-white">August 2026 (Seasonal)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Time</span>
                    <span className="font-medium text-white">6:00 PM Onwards</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Location</span>
                    <span className="font-medium text-white">Temple of the Tooth, Kandy</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button variant="shine" href="/contact" className="w-full justify-center">
                  Reserve Experience Now
                </Button>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-black/40 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-gold hover:text-gold transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </main>
  );
}
