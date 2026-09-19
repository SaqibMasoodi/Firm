import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/the-foundry", "/agartha"],
      },
    ],
    sitemap: "https://northforgelabs.com/sitemap.xml",
  };
}
