// src/services/date-availability/availabilityService.ts

export interface DateDetailItem {
  hex?: string;
  note?: string;
  color?: string;
  hexes?: string[];
  colors?: string[];
  tourType?: string;
  tourTypes?: string[];
  date?: string;
}

export interface AvailabilityResponse {
  apiClosedDates: string[];
  dateDetails: Record<string, DateDetailItem>;
  closedDateDetails: (DateDetailItem & { date: string })[];
  updatedAt?: string;
}

export type KnownTourType =
  | "multiday tours"
  | "one day tours"
  | "custom made tours"
  | "private charter"
  | "transfer"
  | "all";

export interface TourTypeMeta {
  key: "multiday" | "oneday" | "custom" | "charter" | "transfer" | "all";
  canonicalName: KnownTourType;
  defaultHex: string;
  defaultColor: string;
  enLabel: string;
  jaLabel: string;
}

export const TOUR_TYPES_CONFIG: Record<KnownTourType, TourTypeMeta> = {
  "multiday tours": {
    key: "multiday",
    canonicalName: "multiday tours",
    defaultHex: "#10b981",
    defaultColor: "emerald",
    enLabel: "Multi-day Tours",
    jaLabel: "複数日ツアー",
  },
  "one day tours": {
    key: "oneday",
    canonicalName: "one day tours",
    defaultHex: "#2563eb",
    defaultColor: "blue",
    enLabel: "One Day Tours",
    jaLabel: "日帰りツアー",
  },
  "custom made tours": {
    key: "custom",
    canonicalName: "custom made tours",
    defaultHex: "#9333ea",
    defaultColor: "purple",
    enLabel: "Custom Made Tours",
    jaLabel: "オーダーメイドツアー",
  },
  "private charter": {
    key: "charter",
    canonicalName: "private charter",
    defaultHex: "#eab308",
    defaultColor: "gold",
    enLabel: "Private Charter",
    jaLabel: "プライベートチャーター",
  },
  "transfer": {
    key: "transfer",
    canonicalName: "transfer",
    defaultHex: "#f97316",
    defaultColor: "orange",
    enLabel: "Transfers",
    jaLabel: "送迎サービス",
  },
  "all": {
    key: "all",
    canonicalName: "all",
    defaultHex: "#f43f5e",
    defaultColor: "rose",
    enLabel: "All Services Closed",
    jaLabel: "全サービス休業",
  },
};

export function normalizeTourType(type?: string): KnownTourType | string {
  if (!type) return "";
  const lower = type.toLowerCase().trim();
  if (lower === "all" || lower.includes("all tour") || lower.includes("all service")) return "all";
  if (lower.includes("multi")) return "multiday tours";
  if (lower.includes("one") || lower === "oneday") return "one day tours";
  if (lower.includes("custom") || lower.includes("bespoke")) return "custom made tours";
  if (lower.includes("charter") || lower.includes("private") || lower.includes("vehicle")) return "private charter";
  if (lower.includes("transfer")) return "transfer";
  return lower;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// In-memory cache to prevent duplicate fetches across multiple components on the same page
const cache: Record<string, { promise: Promise<AvailabilityResponse>; timestamp: number }> = {};
const CACHE_TTL_MS = 60 * 1000; // 1 minute

export const fetchAvailability = async (locale = "en"): Promise<AvailabilityResponse> => {
  const cacheKey = locale || "en";
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL_MS) {
    return cache[cacheKey].promise;
  }

  const promise = (async (): Promise<AvailabilityResponse> => {
    try {
      // 1. First try the client endpoint with language parameter
      let response = await fetch(`${API_URL}/availability/client?lang=${encodeURIComponent(locale)}`).catch(() => null);

      // 2. Fallback to /availability if /availability/client fails
      if (!response || !response.ok) {
        response = await fetch(`${API_URL}/availability`).catch(() => null);
      }

      if (!response || !response.ok) {
        throw new Error(`Failed to fetch availability dates: ${response?.statusText || "Network error"}`);
      }

      const data = await response.json();

      let apiClosedDates: string[] = [];
      let dateDetails: Record<string, DateDetailItem> = {};
      let closedDateDetails: (DateDetailItem & { date: string })[] = [];
      let updatedAt: string | undefined = undefined;

      if (Array.isArray(data)) {
        apiClosedDates = data;
      } else if (data && typeof data === "object") {
        if (Array.isArray(data.apiClosedDates)) {
          apiClosedDates = data.apiClosedDates;
        } else if (Array.isArray(data.dates)) {
          apiClosedDates = data.dates;
        } else if (Array.isArray(data.data)) {
          apiClosedDates = data.data;
        }

        if (data.dateDetails && typeof data.dateDetails === "object") {
          dateDetails = data.dateDetails;
        }

        if (Array.isArray(data.closedDateDetails)) {
          closedDateDetails = data.closedDateDetails;
        }

        if (typeof data.updatedAt === "string") {
          updatedAt = data.updatedAt;
        }
      }

      // If dateDetails is empty but closedDateDetails exists, index by date
      if (Object.keys(dateDetails).length === 0 && closedDateDetails.length > 0) {
        closedDateDetails.forEach((item) => {
          if (item.date) {
            dateDetails[item.date] = item;
          }
        });
      }

      // If closedDateDetails is empty but dateDetails exists, generate closedDateDetails
      if (closedDateDetails.length === 0 && Object.keys(dateDetails).length > 0) {
        closedDateDetails = Object.entries(dateDetails).map(([date, detail]) => ({
          ...detail,
          date,
        }));
      }

      // If apiClosedDates is empty, extract from dateDetails keys
      if (apiClosedDates.length === 0 && Object.keys(dateDetails).length > 0) {
        apiClosedDates = Object.keys(dateDetails);
      }

      return {
        apiClosedDates,
        dateDetails,
        closedDateDetails,
        updatedAt,
      };
    } catch (error) {
      console.error("Error fetching availability:", error);
      return {
        apiClosedDates: [],
        dateDetails: {},
        closedDateDetails: [],
      };
    }
  })();

  cache[cacheKey] = { promise, timestamp: now };
  return promise;
};

// Kept for backward compatibility
export const fetchClosedDates = async (): Promise<string[]> => {
  const result = await fetchAvailability("en");
  return result.apiClosedDates;
};
