import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const paths = [
    "/en",
    "/en/invoice-generator",
    "/en/about",
    "/en/contact",
    "/en/privacy-policy",
    "/en/terms",
    "/en/guides/how-to-write-an-invoice",
    "/en/guides/net-30-vs-net-15",
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "/en" ? 1 : path === "/en/invoice-generator" ? 0.9 : 0.6,
  }));
}
