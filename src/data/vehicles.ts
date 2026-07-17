export type VehicleCategory = "sedan" | "van" | "suv";

export type Vehicle = {
  id: string;
  category: VehicleCategory;
  rate: number;
};

export const vehicleFilters = [
  { label: "Sedans", value: "sedan" },
  { label: "Vans", value: "van" },
  { label: "SUVs", value: "suv" },
] as const;

export const vehicles: Vehicle[] = [
  {
    id: "sedan-base",
    category: "sedan",
    rate: 120, 
  },
  {
    id: "van-base",
    category: "van",
    rate: 180,
  },
  {
    id: "suv-base",
    category: "suv",
    rate: 260,
  },
];