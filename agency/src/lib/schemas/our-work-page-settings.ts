import { z } from "zod";

const SectionSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  emptyText: z.string(),
  visible: z.boolean(),
});

export const OurWorkPageSettingsSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  ctaTitle: z.string().trim().min(1),
  ctaDescription: z.string(),
  sections: z.object({
    websites: SectionSchema,
    apps: SectionSchema,
    "social-media": SectionSchema,
  }),
});

export type OurWorkPageSettings = z.infer<typeof OurWorkPageSettingsSchema>;
