import type { PricingOptionLocalization } from "@/services/Booking/packageDetails/types";
import { parseApiError } from "@/utils/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface SelectedBookingOption {
  id: string;
  name: string;
  nameLocalized?: PricingOptionLocalization | string;
  calculationType: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface BookingCategorySummary {
  count: number;
  unitPrice: number;
  total: number;
  discountNote?: string;
}

export interface BookingPricingSummary {
  baseCurrency: "USD";
  displayCurrency: string;
  appliedTier: {
    label: string;
    minPax: number;
    maxPax: number;
    pricePerPerson: number;
  } | null;
  unitPrice: number;
  baseTotal: number;
  optionsTotal: number;
  grandTotal: number;
  breakdown: {
    adults: BookingCategorySummary;
    couples: BookingCategorySummary;
    children: BookingCategorySummary;
    infants: BookingCategorySummary;
  };
}

export interface CreateBookingData {
  packageId: string;
  packageSlug?: string;
  packageName: string;
  packageType: "oneday" | "multiday" | string;
  type: "oneday" | "multiday" | string;
  journeyDate: string;
  travelers: {
    adults: number;
    couples: number;
    children: number;
    infants: number;
  };
  totalPax: number;
  selectedOptions: SelectedBookingOption[];
  basePrice: number;
  optionsTotal: number;
  totalAmount: number;
  currency: string;
  locale: string;
  pricingSummary: BookingPricingSummary;
  userId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  country?: string;
}

export const bookingWidgetService = {
  createBooking: async (data: CreateBookingData) => {
    const res = await fetch(`${API_URL}/package-bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) await parseApiError(res, "Booking submission failed");
    return res.json();
  },
};
