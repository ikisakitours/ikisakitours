// src/services/date-availability/availabilityService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchClosedDates = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/availability`);

    if (!response.ok) {
      throw new Error("Failed to fetch availability dates");
    }

    const data = await response.json();
    console.log("Backend Data:", data);

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.dates)) {
      return data.dates;
    } else if (data && Array.isArray(data.apiClosedDates)) {
      return data.apiClosedDates;
    }

    return [];
  } catch (error) {
    console.error("Error fetching closed dates:", error);
    return [];
  }
};
