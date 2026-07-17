export type Industry = {
  name: string;
  description: string;
  productHref: string;
  productLabel: string;
};

export const industries: Industry[] = [
  {
    name: "Energy",
    description:
      "Generation and transmission operators need accurate operational data for grid reliability and regulatory compliance. EDIM analyzes plant data across distributed energy assets.",
    productHref: "/solutions/edim",
    productLabel: "EDIM",
  },
  {
    name: "Nuclear",
    description:
      "Nuclear facilities operate under strict safety and compliance requirements. EDIM provides auditable analytics and documented records across plant operations.",
    productHref: "/solutions/edim",
    productLabel: "EDIM",
  },
  {
    name: "Defense",
    description:
      "Defense programs require secure communications in contested environments. ENADOX secures command and coordination channels end to end.",
    productHref: "/solutions/enadox",
    productLabel: "ENADOX",
  },
  {
    name: "Industrial",
    description:
      "Industrial operators need visibility into process data to reduce downtime and prevent safety incidents. EDIM converts operational telemetry into usable analytics.",
    productHref: "/solutions/edim",
    productLabel: "EDIM",
  },
  {
    name: "Government",
    description:
      "Public-sector agencies need to protect sensitive information and coordinate securely across agencies. ENADOX secures communications and meets government assurance requirements.",
    productHref: "/solutions/enadox",
    productLabel: "ENADOX",
  },
  {
    name: "Utilities",
    description:
      "Water, gas, and electric utilities manage large, distributed infrastructure. EDIM consolidates asset data to support operational decisions.",
    productHref: "/solutions/edim",
    productLabel: "EDIM",
  },
  {
    name: "Critical Infrastructure",
    description:
      "Critical infrastructure operators depend on secure coordination and communications to keep essential services running. ENADOX protects that communications layer.",
    productHref: "/solutions/enadox",
    productLabel: "ENADOX",
  },
  {
    name: "Manufacturing",
    description:
      "Connected manufacturing lines generate operational data used to manage throughput and quality. EDIM verifies that data is accurate and traceable.",
    productHref: "/solutions/edim",
    productLabel: "EDIM",
  },
];
