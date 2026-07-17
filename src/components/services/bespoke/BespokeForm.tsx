"use client";

import { type FormEvent, useState } from "react";
import { vehicles } from "@/data/vehicles";
import { BespokeSidebar, Languages } from "@/data/bespokeTravel";
import { BespokeJourneyFields } from "./BespokeJourneyFields";
import { type ActiveVehicleFilter } from "./BespokeVehicleSelector";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import { ContactForm, type ContactData } from "@/components/services/ContactForm";
import { useValidationForm } from "@/hooks/useValidationForm";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";

import { InfoSidebar } from "@/components/services/InfoSidebar";

export function BespokeForm() {
  const defaultCategory = vehicles[0].category;
  const defaultVehicleId = vehicles[0].id;

  const [activeFilter, setActiveFilter] = useState<ActiveVehicleFilter>(defaultCategory);
  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultVehicleId);

  const [pickupLocation, setPickupLocation] = useState("");
  const [tourRequests, setTourRequests] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [language, setLanguage] = useState<string>(Languages[0] || "English");
  const [tourDays, setTourDays] = useState<number>(1);
  const [travelerCounts, setTravelerCounts] = useState<Record<string, number>>({
    adult: 0,
    couple: 0,
    child: 0,
    infant: 0,
  });

  const { errors, validate, setErrors } = useValidationForm();

  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    email: "",
    whatsapp: "",
    specialRequests: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validate({
      date,
      time,
      language,
      days: tourDays,
      counts: travelerCounts,
      pickupLocation,
      tourRequests,
      fullName: contact.fullName,
      email: contact.email,
      whatsapp: contact.whatsapp,
      specialRequests: contact.specialRequests,
    });

    if (isValid) {
      console.log("Form is valid, proceed to API call");
    }
  };

  const handleTourDaysChange = (delta: number) => {
    setTourDays((prev) => Math.max(1, prev + delta));
  };

  const handleTravelerChange = (type: string, delta: number) => {
    setTravelerCounts((prev) => {
      const actualDelta = type === "couple" ? delta * 2 : delta;
      const current = prev[type] || 0;
      const next = current + actualDelta;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  return (
    <ContainerLayout className="relative z-20 -mt-24 pb-24">
      <div className="grid gap-8 xl:grid-cols-12 xl:items-start">
        <form onSubmit={handleSubmit} className="space-y-8 xl:col-span-8">
          <FormPanel className="z-10">
            <StepHeading step="1">Journey Details</StepHeading>
            <BespokeJourneyFields
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onVehicleChange={setSelectedVehicleId}
              date={date}
              onDateChange={setDate}
              time={time}
              onTimeChange={setTime}
              language={language}
              onLanguageChange={setLanguage}
              travelerCounts={travelerCounts}
              onTravelerChange={handleTravelerChange}
              tourDays={tourDays}
              onTourDaysChange={handleTourDaysChange}
              pickupLocation={pickupLocation}
              onPickupLocationChange={setPickupLocation}
              tourRequests={tourRequests}
              onTourRequestsChange={setTourRequests}
              errors={errors}
              setErrors={setErrors}
            />
          </FormPanel>

          <FormPanel className="border-t-2 border-gold/30">
            <StepHeading step="2" subtitle="Chauffeur assignment details">
              Contact Information
            </StepHeading>
            <ContactForm data={contact} setData={setContact} errors={errors} setErrors={setErrors} />
          </FormPanel>
        </form>
        {/* Right Side: Info Sidebar */}
        <InfoSidebar {...BespokeSidebar} />
      </div>

      <div className="xl:col-span-12">
        <CrossPromotionSection />
      </div>
    </ContainerLayout>
  );
}
