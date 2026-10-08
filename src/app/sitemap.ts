import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...getProducts().map((product) => ({
      url: `${site.url}/produtos/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
