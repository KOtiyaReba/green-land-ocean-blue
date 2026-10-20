import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const routes = ["", "/products", "/about", "/locations", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  if (!site) return []; // no domain yet, so no sitemap entries
  return routes.map((path) => ({ url: `${site}${path}` }));
}