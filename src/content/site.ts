// Client-provided real contact + careers data.
export const site = {
  email: "info@core-defenses.com",
  address: {
    line1: "A166, ASTeCC",
    line2: "145 Graham Ave",
    city: "Lexington, KY 40506",
  },
  // Google Maps place embed (cid provided by client). output=embed → iframe-safe,
  // no Maps API key required (NFR-SEC-2).
  mapEmbedUrl:
    "https://www.google.com/maps?cid=11871406629572706665&output=embed",
  mapPlaceUrl: "https://www.google.com/maps?cid=11871406629572706665",
  applyFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeLkrtguwl4J0P9leR8Ca-GTPlPWS50pToKN6dlvk4l_HVLow/viewform",
} as const;
