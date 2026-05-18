import type { MetadataRoute } from "next";

/**
 * robots.txt — auto-served by Next.js at /robots.txt
 * Allows all crawlers and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://childcarecompass.co.uk/sitemap.xml",
  };
}
