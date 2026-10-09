import { z } from "zod";

const SectionSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  emptyText: z.string(),
  visible: z.boolean(),
});

export const OurWorkPageSettingsSchema = z.object({
  filterLabel: z.string().default("Filter by:"),
  searchEnabled: z.boolean().default(true),
  searchPlaceholder: z.string().default("Search projects…"),
  searchEmptyText: z.string().default("No projects match your search."),

  allWorkLabel: z.string().trim().min(1).default("All work"),
  allWorkEmptyText: z.string().default("No projects to show yet."),
  title: z.string().trim().min(1),
  description: z.string(),
  ctaTitle: z.string().trim().min(1),
  ctaDescription: z.string(),
  sections: z.record(z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).refine(value => value !== "all", "All work is reserved"), SectionSchema).refine(sections => Object.keys(sections).length > 0, "Keep at least one category"),
});

export type OurWorkPageSettings = z.infer<typeof OurWorkPageSettingsSchema>;
