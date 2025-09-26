// src/data/mockData/transportationData.js

const transportationData = [
  {
    id: 1,
    type: "Taxi",
    provider: "Sikkim Taxi Services",
    contact: "+91-9876543210",
    pricePerKm: 25,
    availability: "24/7",
    description: "Reliable local taxi service for short and long trips."
  },
  {
    id: 2,
    type: "Bus",
    provider: "Sikkim State Transport",
    contact: "+91-9432109876",
    routes: [
      { from: "Gangtok", to: "Pelling", duration: "6h" },
      { from: "Gangtok", to: "Lachung", duration: "9h" }
    ],
    price: { min: 150, max: 500 },
    availability: "Daily",
    description: "State-run buses connecting major towns and tourist destinations."
  },
  {
    id: 3,
    type: "Shared Jeep",
    provider: "Local Jeep Operators",
    contact: "+91-9123456780",
    routes: [
      { from: "Gangtok", to: "Tsomgo Lake", duration: "2h" },
      { from: "Gangtok", to: "Nathula Pass", duration: "4h" }
    ],
    price: { perPerson: 300 },
    availability: "Daily",
    description: "Affordable shared jeeps for small groups of tourists."
  },
  {
    id: 4,
    type: "Helicopter",
    provider: "Pawan Hans",
    contact: "+91-9871234567",
    routes: [
      { from: "Bagdogra", to: "Gangtok", duration: "30min" }
    ],
    price: { perPerson: 3500 },
    availability: "On Demand",
    description: "Fast and scenic helicopter rides for premium travelers."
  },
  {
    id: 5,
    type: "Rental Car",
    provider: "Sikkim Car Rentals",
    contact: "+91-9812345678",
    pricePerDay: 2000,
    vehicleTypes: ["SUV", "Sedan", "Hatchback"],
    availability: "Daily",
    description: "Self-drive or chauffeur-driven cars available for sightseeing."
  }
];

export default transportationData;
