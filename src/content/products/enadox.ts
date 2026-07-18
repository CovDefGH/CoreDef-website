import type { ProductPage } from "./types";

// Copy constraint (FR-ENADOX-6): mission-outcome framing only — no sensitive
// implementation/architecture detail.
// TODO(product): metric values are illustrative pending product/legal
// confirmation (TEST-PLAN.md §5) — confirm before launch.
export const enadox: ProductPage = {
  slug: "enadox",
  name: "ENADOX",
  tagline:
    "ENADOX is a data-centric transformative layer beyond encryption that is embedded at the source. ENADOX augments autonomous systems, AI models, websites, emails, industrial control systems, and other digital platforms with a shapeshifting ability by appearing benign to external observers while revealing the real content only to the intended recipient.",
  stats: [
    {
      label: "Operating Envelope",
      value: "DDIL",
      description:
        "Built for denied, degraded, intermittent, and limited-bandwidth environments: software-defined radio, drone swarm links, and industrial networks.",
    },
    {
      label: "Redundancy Model",
      value: "Self-Healing",
      description:
        "Sensor and channel data can be recovered through inbuilt cross-platform redundancy when a primary source fails.",
    },
  ],
  specifications: [
    {
      label: "Encryption",
      value:
        "Proprietary Core Defenses cryptographic architecture for denied and contested environments",
    },
    { label: "Throughput", value: "Adaptive to available link budget" },
    { label: "Latency", value: "Optimized for contested, low-bandwidth links" },
  ],
};
