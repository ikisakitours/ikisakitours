const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const bookingWidgetService = {
  createBooking: async (data: { 
    packageId: string;
    packageName: string;
    packageType: string; 
    journeyDate: string; 
    travelers: {
      adults: number;
      couples: number;
      children: number;
      infants: number;
    };
    firstName?: string;
    lastName?: string;
    email?: string;
    country?: string;
    type?: string;
  }) => {
    const res = await fetch(`${API_URL}/package-bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Booking submission failed");
    return res.json();
  },
};