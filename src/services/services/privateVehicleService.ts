const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const privateVehicleService = {
  bookVehicle: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/vehicles/private`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Private vehicle booking failed");
    return res.json();
  },
};