import { Languages } from "@/data/privateVehicle";
import { fieldLabelClass, inputClass } from "@/components/services/formStyles";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import CustomSelect from "@/components/ui/CustomSelect";
import { PrivateVehicleSelector, type ActiveVehicleFilter } from "./PrivateVehicleSelector";
import { TravelerPicker } from "@/components/ui/TravelerPicker";
import { TourDurationPicker } from "@/components/ui/TourDurationPicker";
import { FormError } from "@/components/ui/FormError";
//Icons
import { Globe, MapPin } from "lucide-react";

type PrivateVehicleJourneyFieldsProps = {
  activeFilter: ActiveVehicleFilter;
  onFilterChange: (filter: ActiveVehicleFilter) => void;
  onVehicleChange: (vehicleId: string) => void;
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  travelerCounts: Record<string, number>;
  onTravelerChange: (type: string, delta: number) => void;
  tourDays: number;
  onTourDaysChange: (delta: number) => void;
  pickupLocation: string;
  onPickupLocationChange: (loc: string) => void;
  tourRequests: string;
  onTourRequestsChange: (req: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  const target = e.currentTarget;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

export function PrivateVehicleJourneyFields({
  activeFilter,
  onFilterChange,
  onVehicleChange,
  date,
  onDateChange,
  time,
  onTimeChange,
  language,
  onLanguageChange,
  travelerCounts,
  onTravelerChange,
  tourDays,
  onTourDaysChange,
  pickupLocation,
  onPickupLocationChange,
  tourRequests,
  onTourRequestsChange,
  errors,
  setErrors,
}: PrivateVehicleJourneyFieldsProps) {
  const travelerOptions = [
    { type: "adult", label: "Adult", ageRange: "AGE 13-99" },
    { type: "couple", label: "Couple", ageRange: "2 Adults" },
    { type: "child", label: "Child", ageRange: "AGE 2-12" },
    { type: "infant", label: "Infant", ageRange: "UNDER 2" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className={fieldLabelClass + " mb-4 block"}>Select Your Vehicle</span>
        <PrivateVehicleSelector
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onVehicleChange={onVehicleChange}
        />
      </div>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Pick-Up Location</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              className={`${inputClass} pl-11`}
              placeholder="Airport or hotel name"
              value={pickupLocation}
              onChange={(e) => {
                onPickupLocationChange(e.target.value);
                setErrors((prev) => ({ ...prev, pickupLocation: "" }));
              }}
            />
          </span>
          <div className="ml-2">
            <FormError message={errors.pickupLocation} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Concierge Language</span>
          <CustomSelect
            value={language}
            onChange={(val) => {
              onLanguageChange(val);
              setErrors((prev) => ({ ...prev, language: "" }));
            }}
            options={Languages}
            icon={<Globe className="h-4 w-4" />}
            placeholder="Select Language"
          />
          <div className="ml-2">
            <FormError message={errors.language} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Journey Date</span>
          <CustomDatePicker
            value={date}
            onChange={(d) => {
              onDateChange(d);
              setErrors((prev) => ({ ...prev, date: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.date} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Pickup Time</span>
          <CustomTimePicker
            value={time}
            onChange={(t) => {
              onTimeChange(t);
              setErrors((prev) => ({ ...prev, time: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.time} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Travelers</span>
          <TravelerPicker
            options={travelerOptions}
            counts={travelerCounts}
            onChange={(type, delta) => {
              onTravelerChange(type, delta);
              setErrors((prev) => ({ ...prev, travelers: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.travelers} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Tour Duration</span>
          <TourDurationPicker
            days={tourDays}
            onChange={(delta) => {
              onTourDaysChange(delta);
              setErrors((prev) => ({ ...prev, days: "" }));
            }}
          />
          <div className="ml-2">
            <FormError message={errors.days} />
          </div>
        </label>
      </div>

      <label className="mb-8 flex flex-col gap-1 group">
        <span className={fieldLabelClass}>Describe Your tour Plan Requests</span>
        <textarea
          className={`${inputClass} auto-resize-textarea min-h-30 w-full resize-none p-4 transition-all duration-300 focus:border-gold/60 focus:bg-white/[0.07] focus:outline-none`}
          placeholder="Enter your trip details destinations or special requests..."
          onInput={handleInput}
          value={tourRequests}
          onChange={(e) => {
            onTourRequestsChange(e.target.value);
            if (errors.tourRequests) {
              setErrors((prev) => ({ ...prev, tourRequests: "" }));
            }
          }}
        />
        <div className="ml-2 mt-1">
          <FormError message={errors.tourRequests} />
        </div>
        <span className="mt-1 block text-[11px] font-medium text-slate-500 md:text-[12px] lg:text-[13px] 3xl:text-[14px] leading-relaxed">
          * Box will expand automatically as you type.
        </span>
      </label>
    </div>
  );
}
