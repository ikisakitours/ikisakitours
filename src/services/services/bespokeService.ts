import { parseApiError } from "@/utils/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const bespokeService = {
  submitBespokeTour: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/services/custom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) await parseApiError(res, "Bespoke tour submission failed");
    return res.json();
  },
};