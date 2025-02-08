import {
  torontoNeighborhoods,
  generateTimeSlots,
  generateProviderName,
  generateBusinessName,
} from "./mockData";

interface TimeSlot {
  time: string;
  duration: number;
}

interface Provider {
  id: string;
  businessName: string;
  providerName: string;
  providerImage: string;
  rating: number;
  basePrice: number;
  location: string;
  coordinates: { lat: number; lng: number };
  certificationTier: "gold" | "silver" | "blue" | "unverified";
  timeSlots: TimeSlot[];
}

const generateProviders = (count: number): Provider[] => {
  const tiers: Array<"gold" | "silver" | "blue" | "unverified"> = [
    "gold",
    "silver",
    "blue",
    "unverified",
  ];
  const providers: Provider[] = [];

  for (let i = 0; i < count; i++) {
    const neighborhood =
      torontoNeighborhoods[
        Math.floor(Math.random() * torontoNeighborhoods.length)
      ];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const basePrice = Math.floor(Math.random() * (150 - 70) + 70); // $70-150
    const rating = (Math.random() * (5 - 4) + 4).toFixed(1); // 4.0-5.0

    providers.push({
      id: `provider-${i + 1}`,
      businessName: generateBusinessName(),
      providerName: generateProviderName(),
      providerImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=provider${i}`,
      rating: Math.round(parseFloat(rating) * 10) / 10,
      basePrice,
      location: neighborhood.name,
      coordinates: neighborhood.coordinates,
      certificationTier: tier,
      timeSlots: generateTimeSlots(),
    });
  }

  return providers;
};

const serviceTypes = [
  {
    type: "Energy Healing",
    titles: [
      "Reiki Healing Session",
      "Chakra Balancing",
      "Energy Cleansing",
      "Pranic Healing",
      "Quantum Touch Session",
    ],
  },
  {
    type: "Spiritual Coaching",
    titles: [
      "Life Path Guidance",
      "Spiritual Mentoring",
      "Soul Purpose Session",
      "Mindfulness Coaching",
      "Spiritual Development",
    ],
  },
  {
    type: "Meditation",
    titles: [
      "Guided Meditation",
      "Sound Bath Session",
      "Breathwork Journey",
      "Mindfulness Training",
      "Group Meditation",
    ],
  },
  {
    type: "Tarot Reading",
    titles: [
      "Tarot Card Reading",
      "Oracle Card Session",
      "Psychic Reading",
      "Intuitive Guidance",
      "Destiny Reading",
    ],
  },
  {
    type: "Crystal Healing",
    titles: [
      "Crystal Therapy",
      "Gemstone Healing",
      "Crystal Grid Session",
      "Stone Medicine",
      "Crystal Attunement",
    ],
  },
  {
    type: "Sound Therapy",
    titles: [
      "Sound Healing",
      "Singing Bowl Session",
      "Vibrational Therapy",
      "Gong Bath",
      "Voice Healing",
    ],
  },
];

export const fetchReikiHealers = async () => {
  const providers = generateProviders(50);
  const services = [];

  // Create service entries for each provider's time slots
  for (const provider of providers) {
    for (const slot of provider.timeSlots) {
      const serviceTypeIndex = Math.floor(Math.random() * serviceTypes.length);
      const titleIndex = Math.floor(Math.random() * 5);
      services.push({
        id: `${provider.id}-${slot.time.replace(":", "")}`,
        title: serviceTypes[serviceTypeIndex].titles[titleIndex],
        serviceType: serviceTypes[serviceTypeIndex].type,
        providerName: provider.providerName,
        businessName: provider.businessName,
        providerImage: provider.providerImage,

        rating: provider.rating,
        price: provider.basePrice,
        location: provider.location,
        distance: (Math.random() * 5 + 0.5).toFixed(1),
        coordinates: provider.coordinates,
        certificationTier: provider.certificationTier,
        startTime: slot.time,
        duration: slot.duration,
      });
    }
  }

  // Sort by time
  return services.sort((a, b) => a.startTime.localeCompare(b.startTime));
};
