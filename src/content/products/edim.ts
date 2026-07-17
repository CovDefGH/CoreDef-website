import type { ProductPage } from "./types";

// Copy constraint (FR-EDIM-6): calculational-bias-correction / predictive-
// accuracy framing only — no reactor-internals or safety claims.
// TODO(product): stat + spec values are illustrative pending product/legal
// confirmation (TEST-PLAN.md §5) — confirm before launch.
export const edim: ProductPage = {
  slug: "edim",
  name: "EDIM",
  tagline:
    "EDIM is a physics-based framework that identifies and corrects calculational bias. It reduces prediction error and keeps predictive models aligned with real-time operational data.",
  stats: [
    {
      label: "Economic Impact",
      value: "$200–500M",
      description:
        "Estimated savings per plant over its operational lifetime from mitigating power derates and cycle inefficiencies.",
    },
    {
      label: "Prediction Method",
      value: "Physics-Based Inference",
      description:
        "An information-theoretic methodology that identifies and corrects calculational biases. It improves predictive accuracy while avoiding overfitting, underfitting, and error compensation.",
    },
  ],
};
