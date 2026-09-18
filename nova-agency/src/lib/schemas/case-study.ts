import { z } from "zod";

export const CaseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  siteUrl: z.string().optional().default(""),
  tags: z.array(z.string()).default([]),
  client: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()).default([]),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;
