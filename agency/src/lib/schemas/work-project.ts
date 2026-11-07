import { z } from "zod";

const ExternalUrl = z.string().url().refine(value => /^https?:\/\//i.test(value), "Use an http or https URL").or(z.literal("")).default("");

export const WorkProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  cutoutImage: z.string().default(""),
  imagePosition: z.string().default("50% 50%"),
  imageScale: z.coerce.number().min(0.2).max(5).default(1),
  slug: z.string(),
  category: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).refine(value => value !== "all", "All work is reserved").default("websites"),
  siteUrl: ExternalUrl,
  playStoreUrl: ExternalUrl,
  appDownloadUrl: ExternalUrl,
  additionalCategories: z.array(z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).refine(value => value !== "all")).default([]),
  tags: z.array(z.string()).default([]),
  client: z.string().default(""),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  results: z.array(z.string()).default([]),
});

export type WorkProject = z.infer<typeof WorkProjectSchema>;
