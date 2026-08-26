"use client";
import { BespokeJourneyFields } from "./BespokeJourneyFields";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { CrossPromotionSection } from "@/components/services/CrossPromotionSection";
import { ContactForm } from "@/components/services/ContactForm";
import FormPanel from "@/components/services/FormPanel";
import StepHeading from "@/components/services/StepHeading";
import { languages } from "@/data/Languages-CurrencyData";
import { InfoSidebar } from "@/components/services/InfoSidebar";
import { useTranslations } from "next-intl";
import { useBespokeForm } from "@/hooks/services/useBespokeForm";
import { CharterRatesSection } from "@/components/services/CharterRatesSection";

// Icons for Sidebar
import { ShieldCheck, Clock, Headset, Sparkles } from "lucide-react";

export function BespokeForm() {
  const tStep = useTranslations("Services.StepHeadings");
  const tSidebar = useTranslations("Services.Bespoke.Sidebar");

  const featuresData = tSidebar.raw("features") as { title: string; description: string }[];

  const bespokeSidebarProps = {
    titleBase: tSidebar("titleBase"),
    titleAccent: tSidebar("titleAccent"),
    subtitle: tSidebar("subtitle"),
    features: [
      { icon: ShieldCheck, title: featuresData[0]?.title || "", description: featuresData[0]?.description || "" },
      { icon: Clock, title: featuresData[1]?.title || "", description: featuresData[1]?.description || "" },
      { icon: Headset, title: featuresData[2]?.title || "", description: featuresData[2]?.description || "" },
    ],
    footerIcon: Sparkles,
    footerTitle: tSidebar("footerTitle"),
    footerDescription: tSidebar("footerDescription"),
  };

  //Hook
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
  } = useBespokeForm();

  return (
    <ContainerLayout className="relative z-20 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <div className="flex flex-col xl:grid gap-8 xl:grid-cols-12">
        <form onSubmit={handleSubmit} className="space-y-8 xl:col-span-8 order-1 xl:order-0">
          <FormPanel className="z-10">
            <StepHeading step="1">{tStep("step1Journey")}</StepHeading>
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
          <InfoSidebar {...bespokeSidebarProps} />
        </div>
      </div>

      <div className="xl:col-span-12">
        <CrossPromotionSection />
      </div>
    </ContainerLayout>
  );
}
