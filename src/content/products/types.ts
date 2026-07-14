// Content model per TECHNICAL-DESIGN.md §5.3
export type ProductPage = {
  slug: string;
  eyebrow: string;
  name: string;
  tagline: string;
  stats: { label: string; value: string; description: string }[];
  specifications?: { label: string; value: string }[];
};
