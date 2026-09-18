import { z } from "zod";

export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string(),
  socials: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }).default({}),
});

export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  rating: z.number().default(5),
});

export const TestimonialsSectionSchema = z.union([
  z.object({
    image: z.string().default("/images/testimonials/featured.webp"),
    testimonials: z.array(TestimonialSchema).default([]),
  }),
  z.array(TestimonialSchema).transform((items) => ({
    image: "/images/testimonials/featured.webp",
    testimonials: items,
  })),
]);

export const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string(),
  variant: z.enum(["dark", "green"]).default("dark"),
});

export const WorkflowStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

export const ClientLogoSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

export const SiteConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string(),
    city: z.string(),
  }),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

export const NavLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const FeaturedWorkSchema = z.array(z.string()).max(3);

export const HeaderConfigSchema = z.object({
  image: z.string(),
  objectPosition: z.string().default("50% 50%"),
  alt: z.string().optional().default(""),
});

export const SiteHeadersSchema = z.object({
  home: HeaderConfigSchema,
  about: HeaderConfigSchema,
  services: HeaderConfigSchema,
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type FAQ = z.infer<typeof FAQSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type TestimonialsSectionData = {
  image: string;
  testimonials: Testimonial[];
};
export type Stat = z.infer<typeof StatSchema>;
export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;
export type ClientLogo = z.infer<typeof ClientLogoSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type NavLink = z.infer<typeof NavLinkSchema>;
export type FeaturedWork = z.infer<typeof FeaturedWorkSchema>;
export type HeaderConfig = z.infer<typeof HeaderConfigSchema>;
export type SiteHeaders = z.infer<typeof SiteHeadersSchema>;

