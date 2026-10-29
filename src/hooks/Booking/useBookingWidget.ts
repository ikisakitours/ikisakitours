import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";
import { bookingWidgetService } from "@/services/Booking/bookingWidgetService";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

export function useBookingWidget(tour: { id?: string; title: string }, tourType: "oneday" | "multiday" = "multiday") {
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });
  const [journeyDate, setJourneyDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const current = prev[type] || 0;
      const next = current + actualDelta;

      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const { errors, validate, setErrors } = useValidationForm();
  const tErr = useTranslations("ValidationErrors.ServerErrors");

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validate({ date: journeyDate, counts: travelerCounts });

    if (!isValid) return;

    try {
      setIsLoading(true);

      const currentTourType = tourType === "oneday" ? "oneday" : "multiday";
      const bookingPayload = {
        packageId: tour.id || "default-id-02",
        packageName: tour.title,
        packageType: currentTourType, 
        journeyDate: journeyDate,
        travelers: {
          adults: travelerCounts.adult,
          couples: travelerCounts.couple / 2,
          children: travelerCounts.child,
          infants: travelerCounts.infant,
        },
        firstname: user?.firstname || "Guest",
        lastname: user?.lastname || "User",
        email: user?.email || "guest@example.com",
        country: user?.country || "Sri Lanka",
        type: currentTourType,
      };

      console.log("Sending Payload with User Data:", bookingPayload);
      await bookingWidgetService.createBooking(bookingPayload);
      console.log("Booking successfully created!", bookingPayload);

      setJourneyDate("");
      setTravelerCounts({ adult: 0, couple: 0, child: 0, infant: 0 });
    } catch (error) {
      console.error("Booking error:", error);
      setErrors((prev) => ({ ...prev, date: tErr("bookingFailed") }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    travelerCounts,
    journeyDate,
    setJourneyDate,
    handleTravelerChange,
    errors,
    setErrors,
    isLoading,
    handleBookingSubmit,
  };
}
