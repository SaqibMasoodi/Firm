import { z } from "zod";

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  author: z.string(),
  date: z.string(),
  category: z.string(),
  readTime: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
