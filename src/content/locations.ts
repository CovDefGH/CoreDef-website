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
      "Headquarters and primary R&D for nuclear data analytics and secure communications engineering, based at ASTeCC, University of Kentucky.",
    specialties: ["Nuclear Analytics", "Secure Communications", "R&D"],
    status: "ACTIVE",
    coordinates: { lat: 38.0316, lng: -84.5045 },
  },
];
