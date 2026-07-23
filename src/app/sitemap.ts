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
  return ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
