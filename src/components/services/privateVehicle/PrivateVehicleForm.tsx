"use client";

import { ContactForm } from "@/components/services/ContactForm";
import { PrivateVehicleJourneyFields } from "./PrivateVehicleJourneyFields";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";
import { InfoSidebar } from "@/components/services/InfoSidebar";
import { useTranslations } from "next-intl";
import { languages } from "@/data/Languages-CurrencyData";
import { usePrivateVehicleForm } from "@/hooks/services/usePrivateVehicleForm";
import { CharterRatesSection } from "@/components/services/CharterRatesSection";
// Icons for Sidebar
import { Car, UserCheck, Map, Wallet } from "lucide-react";

export function PrivateVehicleForm() {
  const tStep = useTranslations("Services.StepHeadings");
  const tSidebar = useTranslations("Services.PrivateVehicle.Sidebar");
  const featuresData = tSidebar.raw("features") as { title: string; description: string }[];

  const privateVehicleSidebarProps = {
    titleBase: tSidebar("titleBase"),
    titleAccent: tSidebar("titleAccent"),
    subtitle: tSidebar("subtitle"),
    features: [
      { icon: Car, title: featuresData[0].title, description: featuresData[0].description },
      { icon: UserCheck, title: featuresData[1].title, description: featuresData[1].description },
      { icon: Map, title: featuresData[2].title, description: featuresData[2].description },
    ],
    footerIcon: Wallet,
    footerTitle: tSidebar("footerTitle"),
    footerDescription: tSidebar("footerDescription"),
  };

  const {
    activeFilter,
    setActiveFilter,
    // selectedVehicleId,
    setSelectedVehicleId,
    pickupLocation,
    setPickupLocation,
    tourRequests,
    setTourRequests,
    date,
    setDate,
    time,
    setTime,
    language,
    setLanguage,
    tourDays,
    handleTourDaysChange,
    travelerCounts,
    handleTravelerChange,
    contact,
    setContact,
    errors,
    setErrors,
    isLoading,
    handleSubmit,
  } = usePrivateVehicleForm();
  return (
    <ContainerLayout className="relative z-20 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="flex flex-col xl:grid gap-8 xl:grid-cols-12">
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8 xl:col-span-8 order-1 xl:order-0">
          <FormPanel className="z-10">
            <StepHeading step="1">{tStep("step1Journey")}</StepHeading>
            <PrivateVehicleJourneyFields
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
              languagesList={languages}
              isLoading={isLoading}
            />
          </FormPanel>
          <FormPanel className="border-t-2 border-gold/30">
            <StepHeading step="2" subtitle={tStep("stepContactSub")}>
              {tStep("stepContact")}
            </StepHeading>
            <ContactForm
              data={contact}
              setData={setContact}
              errors={errors}
              setErrors={setErrors}
              isLoading={isLoading}
            />
          </FormPanel>
        </form>
        <div className="xl:col-span-12 order-2 xl:order-last w-full xl:mt-4">
          <CharterRatesSection />
        </div>
        {/* Right Side: Info Sidebar */}
        <div className="xl:col-span-4 order-3 xl:order-0 h-full relative">
          <InfoSidebar {...privateVehicleSidebarProps} />
        </div>
      </div>

      <div className="xl:col-span-12">
        <CrossPromotionSection />
      </div>
    </ContainerLayout>
  );
}
