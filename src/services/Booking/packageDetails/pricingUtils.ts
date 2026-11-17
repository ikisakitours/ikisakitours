// src/services/Booking/packageDetails/pricingUtils.ts
import { PricingConfig, PricingTier } from "./types";

export interface CategoryBreakdown {
  count: number;
  unitPrice: number;
  total: number;
  discountNote?: string;
}

export interface PricingCalculationResult {
  unitPrice: number;
  totalPrice: number;
  activeTier?: PricingTier;
  totalPax: number;
  isTierPricingApplied: boolean;
  breakdown: {
    adults: CategoryBreakdown;
    couples: CategoryBreakdown;
    children: CategoryBreakdown;
    infants: CategoryBreakdown;
  };
}

export function calculateDynamicPricing(
  basePrice: number,
  travelerCounts: Record<string, number> = {},
  pricingConfig?: PricingConfig
): PricingCalculationResult {
  const adults = travelerCounts.adult || 0;
  const couplePersons = travelerCounts.couple || 0;
  const couplePairs = couplePersons / 2;
  const children = travelerCounts.child || 0;
  const infants = travelerCounts.infant || 0;

  const totalPax = adults + couplePersons + children;
  const tiers = pricingConfig?.tiers;
  const passengerPricing = pricingConfig?.passengerPricing;

  let unitPrice = Number(basePrice) || 0;
  let activeTier: PricingTier | undefined;
  let isTierPricingApplied = false;

  // 1. Determine Active Group Discount Tier
  if (tiers && tiers.length > 0) {
    if (totalPax > 0) {
      activeTier = tiers.find((tier) => totalPax >= tier.minPax && totalPax <= tier.maxPax);

      // If totalPax exceeds highest tier, use the highest tier rate
      if (!activeTier) {
        const sortedDesc = [...tiers].sort((a, b) => b.minPax - a.minPax);
        if (totalPax >= sortedDesc[0].minPax) {
          activeTier = sortedDesc[0];
        } else {
          const sortedAsc = [...tiers].sort((a, b) => a.minPax - b.minPax);
          activeTier = sortedAsc[0];
        }
      }

      if (activeTier) {
        unitPrice = activeTier.pricePerPerson;
        isTierPricingApplied = true;
      }
    } else {
      const soloTier = tiers.find((t) => t.minPax === 1) || tiers[0];
      if (soloTier) {
        unitPrice = soloTier.pricePerPerson;
        activeTier = soloTier;
      }
    }
  }

  // 2. Adult Calculation
  const adultTotal = adults * unitPrice;

  // 3. Couple Calculation
  let coupleUnitRate = unitPrice * 2;
  let coupleTotal = 0;
  let coupleNote = "2 Adults (Shared Room)";

  if (couplePairs > 0) {
    if (passengerPricing?.couplePricingType === "fixed" && typeof passengerPricing.coupleFixedPrice === "number" && passengerPricing.coupleFixedPrice > 0) {
      coupleUnitRate = passengerPricing.coupleFixedPrice;
      coupleTotal = couplePairs * coupleUnitRate;
      coupleNote = "Fixed Couple Rate";
    } else {
      coupleTotal = couplePairs * coupleUnitRate;
    }
  }

  // 4. Child Calculation (Percentage or Fixed)
  let childUnitPrice = unitPrice;
  let childDiscountNote = "50% off";

  if (passengerPricing) {
    if (passengerPricing.childRateType === "percentage") {
      const percent = typeof passengerPricing.childRateValue === "number" ? passengerPricing.childRateValue : 50;
      childUnitPrice = (unitPrice * percent) / 100;
      childDiscountNote = `${percent}% of adult rate`;
    } else if (passengerPricing.childRateType === "fixed") {
      childUnitPrice = typeof passengerPricing.childRateValue === "number" ? passengerPricing.childRateValue : unitPrice;
      childDiscountNote = "Fixed child fee";
    }
  }
  const childTotal = children * childUnitPrice;

  // 5. Infant Calculation
  const infantUnitPrice = passengerPricing && typeof passengerPricing.infantPrice === "number" ? passengerPricing.infantPrice : 0;
  const infantTotal = infants * infantUnitPrice;

  const totalPrice = adultTotal + coupleTotal + childTotal + infantTotal;

  return {
    unitPrice,
    totalPrice,
    activeTier,
    totalPax,
    isTierPricingApplied,
    breakdown: {
      adults: { count: adults, unitPrice, total: adultTotal },
      couples: { count: couplePairs, unitPrice: coupleUnitRate, total: coupleTotal, discountNote: coupleNote },
      children: { count: children, unitPrice: childUnitPrice, total: childTotal, discountNote: childDiscountNote },
      infants: { count: infants, unitPrice: infantUnitPrice, total: infantTotal, discountNote: "Free (Under 2)" },
    },
  };
}