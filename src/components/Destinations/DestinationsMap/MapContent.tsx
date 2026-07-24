"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { type Destination } from "@/data/destinationData";
import { type LeafletMouseEvent } from "leaflet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletModules = any;

type MapContentProps = {
  MapComponents: LeafletModules;
  mapConfig: { zoom: number; center: [number, number] };
  isDarkMode: boolean;
  query: string;
  setQuery: (val: string) => void;
  destinations: Destination[];
  isRouteMode?: boolean;
};

export default function MapContent({
  MapComponents,
  mapConfig,
  isDarkMode,
  query,
  setQuery,
  destinations,
  isRouteMode,
}: MapContentProps) {
  const { MapContainer, TileLayer, Marker, Popup, Polyline, divIcon } = MapComponents;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRefs = useRef<{ [key: string]: any }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [lineWidth, setLineWidth] = useState(4);

  useEffect(() => {
    let isMounted = true;

    if (!isRouteMode || destinations.length < 2) {
      setTimeout(() => {
        if (isMounted) setRoutePath([]);
      }, 0);
      return;
    }

    const fetchRoute = async () => {
      try {
        const coordinatesString = destinations.map((d) => `${d.lng},${d.lat}`).join(";");

        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`,
        );
        const data = await response.json();

        if (isMounted && data.routes && data.routes.length > 0) {
          const geoJsonCoords = data.routes[0].geometry.coordinates;
          const latLngs = geoJsonCoords.map((coord: [number, number]) => [coord[1], coord[0]]);
          setRoutePath(latLngs);
        }
      } catch (error) {
        console.error("Failed to fetch real road route:", error);
        if (isMounted) setRoutePath([]);
      }
    };

    fetchRoute();

    return () => {
      isMounted = false;
    };
  }, [isRouteMode, destinations]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const blurKeyboard = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    const handlePopupClose = () => {
      if (query) {
        setQuery("");
      }
    };

    map.on("popupclose", handlePopupClose);

    let timeoutId: NodeJS.Timeout;

    if (!query || destinations.length === 0) {
      map.closePopup();

      timeoutId = setTimeout(() => {
        map.flyTo(mapConfig.center, mapConfig.zoom, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25,
        });
      }, 100);
    } else {
      const matchedDest = destinations.find((d) => d.name.toLowerCase() === query.toLowerCase());

      if (matchedDest) {
        blurKeyboard();

        map.flyTo([matchedDest.lat, matchedDest.lng], 13, {
          animate: true,
          duration: 1.5,
          easeLinearity: 0.25,
        });

        timeoutId = setTimeout(() => {
          const marker = markerRefs.current[matchedDest.slug];
          if (marker) {
            marker.openPopup();
          }
        }, 1500);
      }
    }

    return () => {
      clearTimeout(timeoutId);
      map.off("popupclose", handlePopupClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, destinations]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setLineWidth(routePath.length > 0 ? 2 : 2);
      } else {
        setLineWidth(routePath.length > 0 ? 4 : 3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [routePath]);

  return (
    <div className="relative mx-auto h-112.5 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl z-10 sm:h-137.5 md:h-187.5 lg:h-205">
      <div className="pointer-events-none absolute right-2 top-2 sm:right-4 sm:top-4 z-1000 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 shadow-lg backdrop-blur-md">
        <span className="shrink-0 inline-block h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
        <span className="translate-y-[0.5px] text-[8px] sm:text-[9px] text-gold/90 font-semibold uppercase tracking-[0.2em] leading-none">
          Choose a place to discover
        </span>
      </div>
      {destinations.length === 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-lanka-black backdrop-blur-md">
          <EmptyState
            backgroundText="Explore"
            title="no destinations found"
            description={
              <>
                Your search criteria returned no locations. <br />
                Please try resetting your search.
              </>
            }
            buttonText="Reset Exploration"
            onAction={() => {
              setQuery("");
            }}
          />
        </div>
      )}
      {destinations.length > 0 && (
        <MapContainer
          ref={mapRef}
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", background: isDarkMode ? "var(--lanka-black, #0a0a0a)" : "#f0f0f0" }}
        >
          <TileLayer
            attribution={
              isDarkMode
                ? '&copy; <a href="https://carto.com/">CARTO</a>'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
            url={
              isDarkMode
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />

          {isRouteMode && destinations.length > 1 && (
            <Polyline
              positions={routePath.length > 0 ? routePath : destinations.map((d) => [d.lat, d.lng])}
              pathOptions={{
                color: "#C5A059",
                weight: lineWidth,
                dashArray: routePath.length > 0 ? undefined : "8, 8",
              }}
            />
          )}

          {destinations.map((dest) => {
            const customHtmlIcon = divIcon({
              className: "custom-map-marker-wrapper",
              html: `
                <div class="pointer-events-auto relative flex scale-90 flex-col items-center sm:scale-100">
                  <div class="group relative mb-1 flex w-max cursor-pointer items-center gap-1.5 rounded-full border border-gold/40 bg-lanka-black/90 px-1 py-0.5 shadow-xl backdrop-blur-md transition-transform hover:scale-105 sm:gap-2 sm:px-1.5 sm:py-1">
                    <div class="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-gold/60 sm:h-6 sm:w-6">
                      <img src="${dest.hero.image}" alt="${dest.name}" class="h-full w-full object-cover" />
                    </div>
                    <span class="whitespace-nowrap pr-1.5 text-[9px] font-bold uppercase tracking-wider text-white sm:pr-2 sm:text-[10px]">${dest.name}</span>
                  </div>
                  <div class="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white bg-gold shadow-[0_0_10px_rgba(197,160,89,0.9)] sm:h-4 sm:w-4">
                    <div class="h-1 w-1 rounded-full bg-lanka-black sm:h-1.5 sm:w-1.5"></div>
                  </div>
                </div>
              `,
              iconSize: [120, 50],
              iconAnchor: [60, 45],
              popupAnchor: [0, -45],
            });

            return (
              <Marker
                key={dest.slug}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={(r: any) => {
                  if (r) markerRefs.current[dest.slug] = r;
                }}
                position={[dest.lat, dest.lng]}
                icon={customHtmlIcon}
                eventHandlers={{
                  click: (e: LeafletMouseEvent) => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    e.target.isClickedOpen = true;
                    e.target.openPopup();
                  },
                  mouseover: (e: LeafletMouseEvent) => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    e.target.openPopup();
                  },
                  mouseout: (e: LeafletMouseEvent) => {
                    if (window.innerWidth > 768) {
                      const target = e.target;
                      if (target.isClickedOpen) return;

                      hoverTimeoutRef.current = setTimeout(() => {
                        target.closePopup();
                      }, 300);
                    }
                  },
                }}
              >
                <Popup className="custom-map-popup">
                  <div
                    className="relative w-56 overflow-hidden rounded-2xl border border-white/10 bg-lanka-black p-0 text-left text-white shadow-2xl backdrop-blur-xl transition-colors duration-300"
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    }}
                    onMouseLeave={() => {
                      const marker = markerRefs.current[dest.slug];
                      if (marker && window.innerWidth > 768) {
                      }
                    }}
                  >
                    <a
                      href="#close"
                      onClick={(e) => {
                        e.preventDefault();
                        const markerElement = e.currentTarget.closest(".leaflet-popup");
                        if (markerElement) {
                          const closeBtn = markerElement.querySelector(".leaflet-popup-close-button") as HTMLElement;
                          if (closeBtn) closeBtn.click();
                        }

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const marker = markerRefs.current[dest.slug] as any;
                        if (marker) marker.isClickedOpen = false;

                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                        setQuery("");
                      }}
                      style={{ outline: "none", boxShadow: "none", WebkitTapHighlightColor: "transparent" }}
                      className="text-white! hover:bg-gold! hover:text-lanka-black! absolute right-2 top-2 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
                      title="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                    </a>

                    <div className="relative h-28 w-full overflow-hidden">
                      <Image src={dest.hero.image} alt={dest.name} fill sizes="220px" className="object-cover" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-3">
                      <h3 className="mb-1 text-sm font-bold tracking-wide text-white">{dest.name}</h3>
                      <p className="mb-3 line-clamp-2 text-[11px] font-light leading-relaxed text-slate-300">
                        {dest.hero.strapline}
                      </p>

                      <Link
                        href={`/destination/${dest.slug}?from=${isRouteMode ? "routeMap" : "map"}`}
                        style={{ outline: "none", boxShadow: "none", WebkitTapHighlightColor: "transparent" }}
                        className="bg-gold! text-lanka-black! hover:bg-white! hover:text-lanka-black! flex w-full items-center justify-center rounded-xl py-2 text-[10px] font-extrabold uppercase tracking-widest shadow-md transition-all focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
                      >
                        View Destination
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}
