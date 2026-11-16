export type VehicleCategory = "sedan" | "van" | "suv";

export type Vehicle = {
  id: string;
  category: VehicleCategory;
};

export const vehicles: Vehicle[] = [
  { id: "sedan-base", category: "sedan" },
  { id: "van-base", category: "van" },
  { id: "suv-base", category: "suv" },
];
