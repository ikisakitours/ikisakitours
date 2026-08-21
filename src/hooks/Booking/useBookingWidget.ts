// src/hooks/useBookingWidget.ts
import { useState, type FormEvent } from "react";
import { useValidationForm } from "@/hooks/useValidationForm";

export function useBookingWidget() {
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });
  const [journeyDate, setJourneyDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validate({ date: journeyDate, counts: travelerCounts });
    
    if (!isValid) return;

    try {
      setIsLoading(true);
      // Simulated API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Booking form is valid, proceed to API call", { journeyDate, travelerCounts });
    } catch (error) {
      console.error("Booking error:", error);
      setErrors((prev) => ({ ...prev, date: "Booking submission failed" }));
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