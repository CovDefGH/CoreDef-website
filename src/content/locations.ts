// Operations hubs — headquarters plus planned regional expansion. PLANNED hubs
// describe intended footprint, not active offices; keep status explicit so the
// Global page never overstates presence.

export type OfficeHub = {
  id: string;
  city: string;
  country: string;
  regionTag: "HQ" | "EMEA" | "APAC" | "AMER";
  description: string;
  specialties: string[];
  status: "ACTIVE" | "PLANNED";
  coordinates: { lat: number; lng: number };
};

export const hubs: OfficeHub[] = [
  {
    id: "lexington-hq",
    city: "Lexington",
    country: "USA",
    regionTag: "HQ",
    description:
      "Headquarters and primary R&D — nuclear data analytics and secure communications engineering, based at ASTeCC, University of Kentucky.",
    specialties: ["Nuclear Analytics", "Secure Communications", "R&D"],
    status: "ACTIVE",
    coordinates: { lat: 38.0316, lng: -84.5045 },
  },
  {
    id: "washington-dc",
    city: "Washington, D.C.",
    country: "USA",
    regionTag: "AMER",
    description:
      "Planned hub for U.S. government and defense partnerships, program liaison, and federal compliance coordination.",
    specialties: [
      "Government Partnerships",
      "Defense Programs",
      "Compliance Liaison",
    ],
    status: "PLANNED",
    coordinates: { lat: 38.9072, lng: -77.0369 },
  },
  {
    id: "london-uk",
    city: "London",
    country: "United Kingdom",
    regionTag: "EMEA",
    description:
      "Planned hub serving European critical-infrastructure operators and energy utilities across the EMEA region.",
    specialties: [
      "Critical Infrastructure",
      "Energy Utilities",
      "EMEA Operations",
    ],
    status: "PLANNED",
    coordinates: { lat: 51.5072, lng: -0.1276 },
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    regionTag: "APAC",
    description:
      "Planned hub for APAC industrial and energy operators, supporting regional deployment and time-zone-aligned support.",
    specialties: ["Industrial Systems", "Energy Operators", "APAC Support"],
    status: "PLANNED",
    coordinates: { lat: 1.3521, lng: 103.8198 },
  },
];
