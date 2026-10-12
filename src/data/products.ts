// The five product/service categories from the company brief.
// Descriptions are kept short and factual. Do not add specifications,
// prices or benefit claims until the business confirms them.

export type Product = {
  slug: string;
  name: string;
  description: string;
  icon: "droplet" | "fuel" | "battery" | "glass-water" | "shield";
};

export const products: Product[] = [
  {
    slug: "adblue-def",
    name: "AdBlue / DEF",
    description:
      "Diesel Exhaust Fluid (DEF/AdBlue), supplied through our all-India manufacturing tie-up with Rohan Energy Solutions Pvt Ltd.",
    icon: "droplet",
  },
  {
    slug: "filling-stations",
    name: "AdBlue Filling Stations",
    description:
      "AdBlue Filling Station (AFS) franchise opportunities as we expand our network across India.",
    icon: "fuel",
  },
  {
    slug: "battery-water",
    name: "Battery Water",
    description:
      "Battery water offered as part of our product range. Contact us for details.",
    icon: "battery",
  },
  {
    slug: "drinking-water",
    name: "Drinking Water",
    description:
      "Drinking water offered as part of our product range. Contact us for details.",
    icon: "glass-water",
  },
  {
    slug: "anti-corrosive-coatings",
    name: "Anti-Corrosive Coatings",
    description:
      "Industrial coating and repair/protection solutions through our authorized dealership for Enecon Corporation.",
    icon: "shield",
  },
];