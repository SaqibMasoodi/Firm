import { z } from "zod";

const ExternalUrl = z.string().url().refine(value => /^https?:\/\//i.test(value), "Use an http or https URL").or(z.literal("")).default("");

export const WorkProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  category: z.enum(["websites", "apps", "social-media"]).default("websites"),
  siteUrl: ExternalUrl,
  playStoreUrl: ExternalUrl,
  tags: z.array(z.string()).default([]),
  client: z.string().default(""),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  results: z.array(z.string()).default([]),
});

export type WorkProject = z.infer<typeof WorkProjectSchema>;
