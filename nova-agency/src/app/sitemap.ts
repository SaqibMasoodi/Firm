import type { MetadataRoute } from "next";
import { caseStudies, blogPosts } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nova.agency";

  const staticPages = [
    "",
    "/about",
    "/services",
    "/case-studies",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages];
}
