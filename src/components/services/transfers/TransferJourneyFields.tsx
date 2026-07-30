import { transferLanguages } from "@/data/transfers";
import { fieldLabelClass, inputClass } from "@/components/services/formStyles";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import CustomTimePicker from "@/components/ui/CustomTimePicker";
import CustomSelect from "@/components/ui/CustomSelect";
import { TravelerPicker } from "@/components/ui/TravelerPicker";
import { VehicleSelector, type ActiveVehicleFilter } from "@/components/services/VehicleSelector";
import { FormError } from "@/components/ui/FormError"; // 🌟 Import FormError
//Icons
import { Globe, MapPin } from "lucide-react";

type TransferJourneyFieldsProps = {
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
  pickupLocation: string;
  onPickupLocationChange: (loc: string) => void;
  dropoffLocation: string;
  onDropoffLocationChange: (loc: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function TransferJourneyFields({
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
  pickupLocation,
  onPickupLocationChange,
  dropoffLocation,
  onDropoffLocationChange,
  errors,
  setErrors,
}: TransferJourneyFieldsProps) {
  const travelerOptions = [
    { type: "adult", label: "Adult", ageRange: "AGE 13-99" },
    { type: "couple", label: "Couple", ageRange: "2 Adults" },
    { type: "child", label: "Child", ageRange: "AGE 2-12" },
    { type: "infant", label: "Infant", ageRange: "UNDER 2" },
  ];

  return (
    <div className="space-y-8">
      {/* Vehicle Type Filter */}
     <div>
  <span className={fieldLabelClass + " mb-4 block"}>Select Your Vehicle Type</span>
  <VehicleSelector
    activeFilter={activeFilter}
    onFilterChange={onFilterChange}
    onVehicleChange={onVehicleChange}
  />
</div>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={fieldLabelClass}>Pick-Up Location</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-gold" />
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
          <span className={fieldLabelClass}>Drop-Off Location</span>
          <span className="relative block">
            <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-gold" />
            <input
              className={`${inputClass} pl-11`}
              placeholder="Destination address"
              value={dropoffLocation}
              onChange={(e) => {
                onDropoffLocationChange(e.target.value);
                setErrors((prev) => ({ ...prev, dropoffLocation: "" }));
              }}
            />
          </span>
          <div className="ml-2">
            <FormError message={errors.dropoffLocation} />
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
          <span className={fieldLabelClass}>Concierge Language</span>
          <CustomSelect
            value={language}
            onChange={(val) => {
              onLanguageChange(val);
              setErrors((prev) => ({ ...prev, language: "" }));
            }}
            options={transferLanguages}
            icon={<Globe className="h-4 w-4 transition-colors group-focus-within:text-gold" />}
            placeholder="Select Language"
          />
          <div className="ml-2">
            <FormError message={errors.language} />
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
      </div>
    </div>
  );
}
