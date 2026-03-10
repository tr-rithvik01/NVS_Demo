export const carOptionsByType = {
  Hatchback: ["Maruti Suzuki WagonR", "Maruti Suzuki Swift", "Hyundai Grand i10 Nios", "Tata Tiago"],
  Sedan: ["Maruti Suzuki Dzire", "Honda Amaze", "Hyundai Aura", "Honda City"],
  SUV: ["Mahindra XUV700", "Tata Safari", "Hyundai Creta", "Toyota Fortuner"],
  MPV: ["Kia Carens", "Maruti Suzuki Ertiga", "Toyota Rumion", "Toyota Innova Hycross"],
  "Tempo Traveller": ["Force Traveller 12 Seater", "Force Urbania", "Tempo Traveller 17 Seater"],
  "Premium Car": ["Toyota Camry", "BMW 5 Series", "Mercedes-Benz E-Class", "Audi A6"],
} as const;

export const carTypeOptions = Object.keys(carOptionsByType) as Array<keyof typeof carOptionsByType>;

type EstimateInput = {
  carType: string;
  carModel: string;
  passengers: number;
  from: string;
  to: string;
  distanceKm?: number;
};

const baseFareByType: Record<string, number> = {
  Hatchback: 320,
  Sedan: 420,
  SUV: 620,
  MPV: 760,
  "Tempo Traveller": 1400,
  "Premium Car": 1800,
};

const perKmByType: Record<string, number> = {
  Hatchback: 14,
  Sedan: 17,
  SUV: 22,
  MPV: 24,
  "Tempo Traveller": 32,
  "Premium Car": 40,
};

const includedPassengersByType: Record<string, number> = {
  Hatchback: 4,
  Sedan: 4,
  SUV: 6,
  MPV: 6,
  "Tempo Traveller": 12,
  "Premium Car": 4,
};

const modelMultiplierByName: Record<string, number> = {
  "Toyota Fortuner": 1.12,
  "Toyota Innova Hycross": 1.08,
  "Force Urbania": 1.1,
  "BMW 5 Series": 1.18,
  "Mercedes-Benz E-Class": 1.2,
  "Audi A6": 1.2,
  "Toyota Camry": 1.12,
  "Honda City": 1.05,
  "Mahindra XUV700": 1.06,
};

function estimateRouteDistance(from: string, to: string) {
  const combined = `${from} ${to}`.toLowerCase();
  const uniqueTokens = new Set(combined.split(/[^a-z0-9]+/).filter(Boolean));
  let distance = 6 + uniqueTokens.size * 1.8;

  if (/airport|kempegowda/.test(combined)) distance += 18;
  if (/whitefield|electronic city|yelahanka|sarjapur|hebbal|marathahalli/.test(combined)) distance += 8;
  if (/mysuru|mysore|tumakuru|tumkur|hosur|chennai|hyderabad/.test(combined)) distance += 65;

  return Math.max(8, Math.round(distance));
}

export function calculateBookingEstimate(input: EstimateInput) {
  const passengers = Number.isFinite(input.passengers) ? Math.max(1, input.passengers) : 1;
  const baseFare = baseFareByType[input.carType] || 450;
  const perKm = perKmByType[input.carType] || 18;
  const includedPassengers = includedPassengersByType[input.carType] || 4;
  const distanceKm =
    typeof input.distanceKm === "number" && Number.isFinite(input.distanceKm) && input.distanceKm > 0
      ? Math.round(input.distanceKm)
      : estimateRouteDistance(input.from, input.to);
  const passengerSurcharge = Math.max(0, passengers - includedPassengers) * 90;
  const modelMultiplier = modelMultiplierByName[input.carModel] || 1;
  const subtotal = (baseFare + distanceKm * perKm + passengerSurcharge) * modelMultiplier;
  const rounded = Math.round(subtotal / 10) * 10;

  return {
    estimatedDistanceKm: distanceKm,
    estimatedCost: rounded,
  };
}

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
