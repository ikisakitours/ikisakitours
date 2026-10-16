// src/services/destinations/fetchDestinationServices.ts

import type { DestinationPreview, DestinationFull, DestinationMapData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchDestinationServices = {
  // 1. Get all destination previews
  getDestinationPreviews: async (): Promise<DestinationPreview[]> => {
    const res = await fetch(`${API_URL}/destinations/previews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch destination previews");
    return res.json();
  },

  // 2. Get a single destination by slug
  getDestinationBySlug: async (slug: string): Promise<DestinationFull> => {
    const res = await fetch(`${API_URL}/destinations/slug/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch the destination by slug");
    return res.json();
  },

  // 3. Get all destinations map data
  getDestinationMapData: async (): Promise<DestinationMapData[]> => {
    const res = await fetch(`${API_URL}/destinations/map`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch destinations map data");
    return res.json();
  },

  // 4. Get a single destination map data by slug
  getSingleDestinationMapData: async (slug: string): Promise<DestinationMapData> => {
    const res = await fetch(`${API_URL}/destinations/slug/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch single destination map data");
    return res.json();
  },
};