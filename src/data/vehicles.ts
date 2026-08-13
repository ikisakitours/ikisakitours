export type VehicleCategory = "sedan" | "van" | "suv";

export type Vehicle = {
  id: string;
  category: VehicleCategory;
  rate: number;
  price: string;
  passengers: string;
  luggage: string;
  touristNote?: string;
  pricingType?: string;
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
    price: "$120",
    passengers: "1-3",
    luggage: "", //2 Medium Bags
    touristNote: "Ideal for couples or solo travelers looking for a comfortable city-to-city transfer.",
  },
  {
    id: "van-base",
    category: "van",
    rate: 180,
    price: "$180",
    passengers: "4-8",
    luggage: "", //6 Large Bags
    touristNote: "Perfect for family tours or small groups with plenty of space for luggage and equipment.",
  },
  {
    id: "suv-base",
    category: "suv",
    rate: 260,
    price: "$260",
    passengers: "1-5",
    luggage: "", //4 Large Bags
    touristNote: "Best for rough terrains, mountain hill country tours (like Ella/Nuwara Eliya), and luxury comfort.",
  },
];
