"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MapHeader from "./MapHeader";
import MapContent from "./MapContent";
import { useTranslations } from "next-intl";
import MapLoader from "./MapLoader";
//Icons
import { X } from "lucide-react";

// Mock Data Import
import { destinationsData, type Destination } from "@/data/destinationData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletModules = any;

type DestinationsMapProps = {
  onClose?: () => void;
  routeDestinations?: Destination[];
  isRouteMode?: boolean;
};

export default function DestinationsMap({ onClose, routeDestinations, isRouteMode }: DestinationsMapProps) {
  const tMap = useTranslations("Destinations.Map");
  const [MapComponents, setMapComponents] = useState<LeafletModules | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mapConfig, setMapConfig] = useState({ zoom: 7, center: [7.8731, 80.7718] as [number, number] });

  const [query, setQuery] = useState("");

  const baseDestinations = routeDestinations || destinationsData;

  // Filter Data
  const filteredDestinations = baseDestinations.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([mod, L]) => {
      // @ts-expect-error: Deleting this internal prototype property fixes the default marker icon missing issue
      delete L.Icon.Default.prototype._getIconUrl;
      setTimeout(() => {
        setMapComponents({
          MapContainer: mod.MapContainer,
          TileLayer: mod.TileLayer,
          Marker: mod.Marker,
          Popup: mod.Popup,
          Polyline: mod.Polyline,
          divIcon: L.divIcon,
        });
      }, 0);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setMapConfig((prev) => {
        let newZoom = 7;
        if (width < 640) newZoom = 7;
        else if (width < 768) newZoom = 7.1;
        else if (width < 1024) newZoom = 7.5;
        else newZoom = 8.2;

        if (prev.zoom === newZoom) return prev;
        return { zoom: newZoom, center: prev.center };
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!MapComponents) {
    return <MapLoader loadingText={tMap("loading")} />;
  }

  return (
    <section className="glass-card relative overflow-hidden rounded-4xl border border-white/5 p-4 sm:p-8 md:p-12 py-10 transition-colors duration-500">
      {onClose && (
        <button
          onClick={onClose}
          style={{ outline: "none", boxShadow: "none", WebkitTapHighlightColor: "transparent" }}
          className="group absolute right-4 top-4 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-lanka-black text-gold shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-lanka-black focus:outline-none focus:ring-0 sm:right-6 sm:top-6 [-webkit-tap-highlight-color:transparent]"
          title="Close Map"
        >
          <X className="h-4 w-4 transition-colors duration-300 group-hover:text-lanka-black" />
        </button>
      )}

      {/* Header Section */}
      <MapHeader
        query={query}
        setQuery={setQuery}
        filteredCount={filteredDestinations.length}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Map Body Section */}
      <MapContent
        MapComponents={MapComponents}
        mapConfig={mapConfig}
        isDarkMode={isDarkMode}
        query={query}
        setQuery={setQuery}
        destinations={filteredDestinations}
        isRouteMode={isRouteMode}
      />
    </section>
  );
}
