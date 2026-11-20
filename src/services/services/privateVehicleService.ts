import { parseApiError } from "@/utils/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const privateVehicleService = {
  bookVehicle: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/services/chauffeur`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) await parseApiError(res, "Private vehicle booking failed");
    return res.json();
  },
};