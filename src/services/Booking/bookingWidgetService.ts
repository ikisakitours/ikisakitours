const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const bookingWidgetService = {
  createBooking: async (data: { journeyDate: string; travelerCounts: Record<string, number> }) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Booking submission failed");
    return res.json();
  },
};