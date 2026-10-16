// src/services/destinations/types.ts

export interface DestinationPreview {
  id: string;
  title: string;
  slug: string;
  summary: string;
  province: string;
  heroImage: string | null;
  bestTimeToVisit: string;
  climate: string;
}

export interface DestinationFull {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  province: string;
  highlights: string[];
  images: string[];
  bestTimeToVisit: string;
  climate: string;
  primaryLanguage: string;
  localCurrency: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

// 3. Destination Map Data (For Map Markers)
export interface DestinationMapData {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string | null;
}
