// src/hooks/date-availability/useAvailability.ts
import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import {
  fetchAvailability,
  type DateDetailItem,
  type AvailabilityResponse,
  normalizeTourType,
} from "@/services/date-availability/availabilityService";

export function checkIfDateClosed(
  dateStr: string,
  tourType?: string,
  dateDetails?: Record<string, DateDetailItem>,
  closedDates?: string[]
): boolean {
  if (!dateStr) return false;
  const inClosedDates = !!closedDates?.includes(dateStr);
  const detail = dateDetails?.[dateStr];

  if (!inClosedDates && !detail) {
    return false;
  }

  // If no specific tourType is requested, treat as closed
  if (!tourType) {
    return true;
  }

  if (detail) {
    const closedTypes: string[] = [];
    if (Array.isArray(detail.tourTypes) && detail.tourTypes.length > 0) {
      closedTypes.push(...detail.tourTypes);
    } else if (typeof detail.tourType === "string" && detail.tourType.trim()) {
      closedTypes.push(...detail.tourType.split(",").map((s) => s.trim()));
    }

    // If detail specified but tourTypes list is empty, closed for all
    if (closedTypes.length === 0) {
      return true;
    }

    const normalizedClosed = closedTypes.map((t) => normalizeTourType(t));

    // "all" means all services (multiday, oneday, custom, charter, transfer) are unavailable!
    if (normalizedClosed.includes("all")) {
      return true;
    }

    const normalizedTarget = normalizeTourType(tourType);
    return normalizedClosed.includes(normalizedTarget);
  }

  return inClosedDates;
}

export const useAvailability = (preferredLocale?: string) => {
  const activeLocale = useLocale();
  const locale = preferredLocale || activeLocale || "en";

  const [availability, setAvailability] = useState<AvailabilityResponse>({
    apiClosedDates: [],
    dateDetails: {},
    closedDateDetails: [],
  });
  const [isLoadingDates, setIsLoadingDates] = useState<boolean>(true);

  const loadDates = useCallback(async () => {
    setIsLoadingDates(true);
    try {
      const data = await fetchAvailability(locale);
      setAvailability(data);
    } catch (error) {
      console.error("Failed to load availability dates", error);
      setAvailability({
        apiClosedDates: [],
        dateDetails: {},
        closedDateDetails: [],
      });
    } finally {
      setIsLoadingDates(false);
    }
  }, [locale]);

  useEffect(() => {
    void loadDates();
  }, [loadDates]);

  const isDateClosed = useCallback(
    (dateStr: string, tourType?: string): boolean => {
      return checkIfDateClosed(
        dateStr,
        tourType,
        availability.dateDetails,
        availability.apiClosedDates
      );
    },
    [availability.dateDetails, availability.apiClosedDates]
  );

  const getDateDetail = useCallback(
    (dateStr: string): DateDetailItem | undefined => {
      return availability.dateDetails[dateStr];
    },
    [availability.dateDetails]
  );

  return {
    closedDates: availability.apiClosedDates,
    dateDetails: availability.dateDetails,
    closedDateDetails: availability.closedDateDetails,
    updatedAt: availability.updatedAt,
    isLoadingDates,
    isDateClosed,
    getDateDetail,
    refetch: loadDates,
  };
};
