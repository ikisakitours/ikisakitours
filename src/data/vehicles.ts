export type VehicleCategory = "sedan" | "van" | "suv";

export type Vehicle = {
  id: string;
  category: VehicleCategory;
  rate: number;
  price: string;
  passengers: string;
  luggage: string;
  touristNote?: string[];
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
    touristNote: [
      "Ideal for couples or solo travelers.",
      "Perfect for comfortable city-to-city transfers and highway drives.",
      "Fully air-conditioned with premium seating for a relaxing journey.",
      "Compact size allows for smooth navigation in busy city streets.",
    ],
  },
  {
    id: "van-base",
    category: "van",
    rate: 180,
    price: "$180",
    passengers: "4-8",
    luggage: "", //6 Large Bags
    touristNote: [
      "Perfect for family tours or small travel groups.",
      "Plenty of space for luggage, surfboards, and travel equipment.",
      "Spacious legroom designed for long-distance travel comfort.",
      "Dual climate control (AC) for an optimal passenger experience.",
      "Rates may vary depending on the van size and exact passenger capacity.",
    ],
  },
  {
    id: "suv-base",
    category: "suv",
    rate: 260,
    price: "$260",
    passengers: "1-5",
    luggage: "", //4 Large Bags
    touristNote: [
      "Best for rough terrains and mountain hill country tours (Ella/Nuwara Eliya).",
      "Offers high-end luxury comfort with elevated scenic viewing angles.",
      "Premium spacious interior equipped with advanced safety features.",
      "The perfect combination of robust power and VIP travel experience.",
    ],
  },
];
