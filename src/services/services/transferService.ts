import { parseApiError } from "@/utils/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const transferServiceApi = {
  bookTransfer: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/services/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) await parseApiError(res, "Transfer booking failed");
    return res.json();
  },
};