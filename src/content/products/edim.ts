import type { ProductPage } from "./types";

// Copy constraint (FR-EDIM-6): uncertainty reduction / thermal margin /
// operational efficiency framing only — no reactor-internals or safety claims.
// TODO(product): stat + spec values are illustrative pending product/legal
// confirmation (TEST-PLAN.md §5) — confirm before launch.
export const edim: ProductPage = {
  slug: "edim",
  eyebrow: "Nuclear Data Analytics",
  name: "EDIM",
  tagline:
    "Nuclear data carries uncertainty. EDIM identifies and narrows it, reducing the uncertainty penalty on thermal margin so operators can run closer to true capability, not worst-case assumptions.",
  stats: [
    {
      label: "Recovered Margin Value",
      value: "$200–500M",
      description:
        "Estimated economic value per reactor over its lifetime from higher allowable power output, longer fuel cycles, and more flexible operation.",
    },
    {
      label: "Uncertainty Penalty",
      value: "Reduced",
      description:
        "Best-estimate-plus-uncertainty methods replace stacked conservatism, quantified across the full fuel cycle.",
    },
  ],
  specifications: [
    { label: "Deployment", value: "On-premises or private cloud" },
    {
      label: "Compatibility",
      value:
        "Standard nuclear data libraries and industry simulation toolchains",
    },
    { label: "Data Residency", value: "Customer-controlled, region-locked" },
    { label: "Integration APIs", value: "REST + file-based batch interfaces" },
  ],
};
