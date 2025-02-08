export const torontoNeighborhoods = [
  { name: "Yorkville", coordinates: { lat: 43.6709, lng: -79.3957 } },
  { name: "The Annex", coordinates: { lat: 43.6626, lng: -79.4 } },
  { name: "Rosedale", coordinates: { lat: 43.6766, lng: -79.3782 } },
  { name: "Queen West", coordinates: { lat: 43.6466, lng: -79.4015 } },
  { name: "Leslieville", coordinates: { lat: 43.6578, lng: -79.329 } },
  { name: "Liberty Village", coordinates: { lat: 43.6371, lng: -79.4181 } },
  { name: "Distillery District", coordinates: { lat: 43.6503, lng: -79.3595 } },
  { name: "Kensington Market", coordinates: { lat: 43.6547, lng: -79.4025 } },
  { name: "Bloor West Village", coordinates: { lat: 43.6497, lng: -79.4837 } },
  { name: "Riverdale", coordinates: { lat: 43.6658, lng: -79.3528 } },
  { name: "Cabbagetown", coordinates: { lat: 43.6669, lng: -79.3672 } },
  { name: "High Park", coordinates: { lat: 43.6465, lng: -79.4634 } },
  { name: "Junction", coordinates: { lat: 43.6676, lng: -79.4659 } },
  { name: "Beaches", coordinates: { lat: 43.6682, lng: -79.2902 } },
  { name: "Forest Hill", coordinates: { lat: 43.6906, lng: -79.4156 } },
];

export const generateTimeSlots = () => {
  const slots = [];
  const durations = [30, 45, 60, 75, 90];
  const startHour = 7;
  const endHour = 21; // 9 PM

  // Generate 2-4 random slots for each provider
  const numSlots = Math.floor(Math.random() * 3) + 2;

  // Generate unique times
  const usedTimes = new Set();
  while (slots.length < numSlots) {
    const hour =
      Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    const minute = Math.random() < 0.5 ? 0 : 30;
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    if (!usedTimes.has(time)) {
      usedTimes.add(time);
      const duration = durations[Math.floor(Math.random() * durations.length)];
      slots.push({ time, duration });
    }
  }

  return slots.sort((a, b) => a.time.localeCompare(b.time));
};

export const generateProviderName = () => {
  const firstNames = [
    "Emma",
    "Sophia",
    "Luna",
    "Maya",
    "Aria",
    "Kai",
    "Zen",
    "Nova",
    "River",
    "Sage",
    "Aurora",
    "Willow",
    "Sky",
    "Rain",
    "Crystal",
    "Jasper",
    "Amber",
    "Rose",
    "Lotus",
    "Star",
  ];

  const lastNames = [
    "Peace",
    "Harmony",
    "Light",
    "Spirit",
    "Moon",
    "Sun",
    "Waters",
    "Earth",
    "Wind",
    "Heart",
    "Soul",
    "Grace",
    "Love",
    "Joy",
    "Hope",
    "Faith",
    "Truth",
    "Wisdom",
    "Dream",
    "Song",
  ];

  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
};

export const generateBusinessName = () => {
  const prefixes = [
    "Zen",
    "Sacred",
    "Healing",
    "Peaceful",
    "Tranquil",
    "Divine",
    "Serene",
    "Mystic",
    "Spiritual",
    "Harmonious",
    "Celestial",
    "Pure",
    "Natural",
    "Mindful",
    "Conscious",
  ];

  const suffixes = [
    "Healing Center",
    "Wellness Studio",
    "Reiki Space",
    "Energy Center",
    "Holistic Hub",
    "Healing Room",
    "Wellness Sanctuary",
    "Spirit Studio",
    "Energy Sanctuary",
    "Healing Sanctuary",
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix} ${suffix}`;
};
