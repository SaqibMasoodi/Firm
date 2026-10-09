import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getWorkProjects, getBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [workProjects, blogPosts] = await Promise.all([
    getWorkProjects(),
    getBlogPosts(),
  ]);
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const staticPages = [
    "",
    "/about",
    "/our-work",
    "/blog",
    "/contact",
    "/policies",
    "/sitemap",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const workProjectPages = workProjects.map((study) => ({
    url: `${baseUrl}/our-work/${study.slug}`,
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

  return [...staticPages, ...workProjectPages, ...blogPages];
}
