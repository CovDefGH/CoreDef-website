import type { MetadataRoute } from "next";

const BASE_URL = "https://core-defenses.com";

const ROUTES = [
  "",
  "/solutions",
  "/solutions/edim",
  "/solutions/enadox",
  "/industries",
  "/careers",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // ponytail: no lastModified, a fake always-now date trains crawlers to ignore it
  return ROUTES.map((path) => ({ url: `${BASE_URL}${path}` }));
}
