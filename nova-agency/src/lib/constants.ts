import type { Service, TeamMember, FAQ, Testimonial, CaseStudy, BlogPost, Stat, WorkflowStep } from "@/types";

export const siteConfig = {
  name: "Nova",
  description:
    "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
  url: "https://nova.agency",
  email: "info@nova.agency",
  phone: "01234 567 890",
  address: {
    line1: "Nova Office Complex",
    line2: "13 Imaginary Street",
    city: "Manchester",
  },
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/home",
    linkedin: "https://www.linkedin.com/feed/",
  },
};

export const navLinks = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

export const services: Service[] = [
  {
    id: "software-development",
    title: "Software Development",
    description:
      "From concept to launch, we build robust digital products that drive business growth. Our team delivers custom websites, SaaS platforms, mobile apps, AI chatbots, and API integrations tailored to your unique needs.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp",
    slug: "software-development",
    features: [
      "Websites",
      "SaaS platforms",
      "Mobile apps",
      "Custom software",
      "AI chatbots",
      "API integrations",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "We craft intuitive, beautiful interfaces that delight users and drive conversions. Our design process combines user research, wireframing, and pixel-perfect execution to create seamless digital experiences.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp",
    slug: "ui-ux-design",
    features: ["Wireframes", "App design", "Website design", "Design systems"],
  },
  {
    id: "branding-creative-design",
    title: "Branding & Creative Design",
    description:
      "Your brand is your story. We help you tell it with striking logos, cohesive brand identities, professional business cards, eye-catching posters, and compelling pitch decks that leave lasting impressions.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp",
    slug: "branding-creative-design",
    features: [
      "Logos",
      "Brand identity",
      "Business cards",
      "Posters",
      "Pitch decks",
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Stay ahead of the curve with strategic social media management. We handle content calendars, create engaging reels, write compelling captions, track analytics, and build your community — so you can focus on your business.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp",
    slug: "social-media-management",
    features: [
      "Content calendars",
      "Reels",
      "Captions",
      "Analytics",
      "Community management",
    ],
  },
  {
    id: "video-editing-production",
    title: "Video Editing & Production",
    description:
      "Bring your vision to life with professional video production. From Instagram Reels and YouTube Shorts to long-form content and podcasts — we deliver polished, engaging video content with motion graphics, subtitles, and color grading.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp",
    slug: "video-editing-production",
    features: [
      "Instagram Reels",
      "YouTube Shorts",
      "TikTok edits",
      "Long-form YouTube",
      "Podcasts",
      "Motion graphics",
      "Subtitles",
      "Color grading",
      "Thumbnails",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Drive targeted traffic and convert visitors into customers. Our data-driven marketing strategies span SEO, Google Ads, Facebook Ads, email marketing, and lead generation to maximize your ROI.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp",
    slug: "digital-marketing",
    features: [
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "Email marketing",
      "Lead generation",
    ],
  },
  {
    id: "business-automation-ai",
    title: "Business Automation & AI",
    description:
      "Streamline your operations with intelligent automation. We set up WhatsApp automation, CRM systems, invoice automation, and custom workflow solutions that save time and reduce human error.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp",
    slug: "business-automation-ai",
    features: [
      "WhatsApp automation",
      "CRM setup",
      "Invoice automation",
      "Workflow automation",
    ],
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description:
      "Navigate the complex technology landscape with expert guidance. From technology strategy and software audits to cloud migration and security consultation, we help you make informed decisions that drive growth.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp",
    slug: "it-consulting",
    features: [
      "Technology strategy",
      "Software audits",
      "Cloud migration",
      "Security consultation",
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "peter",
    name: "Peter",
    role: "CEO",
    bio: "Peter is the founder of Nova, and passionate about helping businesses grow through Social Media.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639e951bf17ff4d42d5fa0b_alexander-hipp-iEEBWgY_6lA-unsplash%20(1).webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "Social Media Strategy Director",
    bio: "Expert in crafting compelling brand stories on social media platforms for heightened engagement.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639ea359f7b8e44486caaf3_isaiah-mcclean-DrVJk1EaPSc-unsplash.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "claudia",
    name: "Claudia",
    role: "Digital Marketing Analyst",
    bio: "Skilled in translating data into actionable insights for strategic online marketing campaigns.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f96_simone-hutsch-_M4SLgyL3Ps-unsplash.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "stanley",
    name: "Stanley",
    role: "Admin",
    bio: "Stanley is a master at stress relief and spreading happiness throughout the office.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639ea4f83b52cc9b4629606_camylla-battani-zSCoQkrLMOE-unsplash.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "eve",
    name: "Eve",
    role: "TikTok Specialist",
    bio: "Eve is the dynamo behind our TikTok campaigns, with an uncanny ability to tap into the latest trends and translate them into viral content.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f85_joel-filipe-PFIeJh17SZo-unsplash.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "kirsty",
    name: "Kirsty",
    role: "Graphic Designer",
    bio: "With a keen eye for aesthetics and a deep understanding of brand identity, Kirsty ensures that every piece of content communicates the essence of our clients' brands.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f74_joel-filipe-PFIeJh17SZo-unsplash.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "nathan",
    name: "Nathan",
    role: "Finance Director",
    bio: "With an expertise in financial strategy and a knack for numbers, Nathan oversees budgeting, forecasting, and financial planning.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f80_howard-bouchevereau-042Srn0-82o-unsplash-1.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
  {
    id: "craig",
    name: "Craig",
    role: "Account Manager",
    bio: "Craig is your go-to person for all things project-related. With a talent for organization and a commitment to excellent client service Craig ensures that every project runs smoothly.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f8c_joel-filipe-PFIeJh17SZo-unsplash-1.webp",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home",
    },
  },
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of services including software development (websites, SaaS, mobile apps), UI/UX design, branding & creative design, social media management, video editing & production, digital marketing, business automation & AI, and IT consulting. We tailor our services to meet the unique needs of each client.",
  },
  {
    id: "faq-2",
    question: "How do you approach new projects?",
    answer:
      "Our proven workflow starts with a discovery call to understand your needs, followed by a detailed proposal. We then move through design, development, and testing phases before launch. Post-launch, we provide ongoing support and maintenance to ensure long-term success.",
  },
  {
    id: "faq-3",
    question: "What industries do you work with?",
    answer:
      "We work with a diverse range of industries including hospitals, schools, restaurants, retail businesses, real estate companies, startups, manufacturing companies, NGOs, and government organizations. Our adaptable approach allows us to deliver results across any sector.",
  },
  {
    id: "faq-4",
    question: "What makes your agency different from others?",
    answer:
      "What sets us apart is our end-to-end approach — we handle everything from branding and design to development and marketing under one roof. Our team combines creativity with technical expertise and data-driven strategies to deliver results. We prioritize transparency and communication at every step.",
  },
  {
    id: "faq-5",
    question: "How do we get started?",
    answer:
      "Getting started is easy! Simply reach out through our contact form, email, or give us a call. We'll schedule a discovery call to discuss your goals, target audience, and current challenges. From there, we'll propose a customized strategy tailored to your needs and kick off your project.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Since partnering with this incredible team, our online engagement has skyrocketed! Sales have increased by 30% in just a few months, and our brand awareness is at an all-time high. Their creative approach to content and targeted strategies really make a difference. Highly recommend if you're looking to elevate your brand's online presence!",
    author: "Emily R.",
    role: "Boutique Owner",
    rating: 5,
  },
  {
    id: "testimonial-2",
    quote:
      "This agency has been a game-changer for our startup. Their data-driven strategies and deep understanding of digital platforms have significantly boosted our lead generation and conversion rates. The team is proactive, transparent, and really dedicated to our success. It's been a pleasure working with professionals who are as passionate about our growth as we are.",
    author: "Marcus L.",
    role: "Tech Startup Founder",
    rating: 5,
  },
  {
    id: "testimonial-3",
    quote:
      "I was amazed by the immediate impact their work had on our event promotions. Not only did they increase our event's visibility, but they also engaged our target audience in meaningful ways, leading to a record number of attendees. Their attention to detail, creativity, and expertise were beyond impressive. This agency truly knows how to make digital work wonders for your business.",
    author: "Sophia T.",
    role: "Event Coordinator",
    rating: 5,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "glowessence-skincare",
    title: "GlowEssence Skincare",
    description:
      "Illuminating the Digital Presence of GlowEssence Skincare",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b43702704f962650dca7f_663a28dc7e93c88d44d5b464_reuben-mansell-nwOip8AOZz0-unsplash%20(1)%20(1).webp",
    slug: "glowessence-skincare",
    tags: ["Branding", "Web Development"],
    client: "GlowEssence Skincare",
    challenge:
      "GlowEssence needed a complete digital overhaul — from their brand identity to their e-commerce platform. Their existing website was outdated and failed to capture their premium positioning.",
    solution:
      "We redesigned their brand identity, built a modern e-commerce platform, and implemented a comprehensive digital marketing strategy spanning social media, SEO, and paid advertising.",
    results: [
      "250% increase in online sales",
      "180% growth in social media followers",
      "45% improvement in conversion rate",
      "Top 3 Google rankings for key terms",
    ],
  },
  {
    id: "brewzen-coffee-retailer",
    title: "BrewZen Coffee Retailer",
    description:
      "BrewZen is a boutique coffee retailer known for its unique blends and commitment to sustainability.",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663a473e10986c639c898829_1.webp",
    slug: "brewzen-coffee-retailer",
    tags: ["Mobile App", "Automation"],
    client: "BrewZen Coffee",
    challenge:
      "BrewZen wanted to modernize their ordering system and build a loyal customer base through a mobile-first approach while maintaining their artisanal brand feel.",
    solution:
      "We developed a custom mobile app with ordering, loyalty program, and push notifications. We also automated their inventory management and integrated with their POS system.",
    results: [
      "40% of orders now through the app",
      "65% customer retention rate",
      "30% reduction in inventory waste",
      "4.8 star app rating",
    ],
  },
  {
    id: "burgerhaven-restaurant",
    title: "BurgerHaven Restaurant",
    description:
      "Sizzling Digital Transformation for BurgerHaven Restaurant",
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663a47dee92fa62a03e898be_Untitled%20design%20(28).webp",
    slug: "burgerhaven-restaurant",
    tags: ["SEO", "Digital Marketing"],
    client: "BurgerHaven",
    challenge:
      "BurgerHaven was struggling with low online visibility and needed to compete with larger chains in their area. They needed a comprehensive digital marketing strategy.",
    solution:
      "We implemented local SEO optimization, Google Ads campaigns, social media marketing, and a redesigned website with online ordering capabilities.",
    results: [
      "300% increase in website traffic",
      "85% increase in online orders",
      "First page Google rankings",
      "150% increase in revenue",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "future-of-ai-business",
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how AI is transforming business operations and what it means for your company's future growth.",
    content: `Artificial Intelligence is no longer a futuristic concept — it's here, and it's transforming how businesses operate. From chatbots handling customer inquiries to automated invoice processing and predictive analytics, AI is enabling companies to work smarter, not harder.

## Key Areas Where AI Is Making an Impact

### Customer Service
AI-powered chatbots can handle up to 80% of routine customer inquiries, freeing your team to focus on complex issues that require a human touch. These systems learn and improve over time, providing increasingly accurate and helpful responses.

### Marketing Automation
AI algorithms can analyze customer behavior patterns to deliver personalized content at the right time through the right channel. This level of personalization was previously impossible at scale.

### Operations & Workflow
From automated inventory management to predictive maintenance, AI is streamlining operations across industries. Businesses report up to 40% reduction in operational costs after implementing AI solutions.

## Getting Started with AI

The key is to start small. Identify one area of your business where automation could have the biggest impact, then scale from there. Our team can help you assess your readiness and build a roadmap for AI adoption.`,
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp",
    slug: "future-of-ai-business",
    author: "Sarah",
    date: "2024-09-10",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: "building-brand-identity",
    title: "Building a Brand Identity That Stands Out",
    excerpt:
      "Learn the essential elements of creating a memorable brand identity that resonates with your target audience.",
    content: `Your brand identity is more than just a logo — it's the complete visual and emotional language that communicates who you are to the world. In a crowded marketplace, a strong brand identity can be the difference between being noticed and being ignored.

## The Core Elements

### Visual Identity
This includes your logo, color palette, typography, and imagery style. Every visual element should work together to create a cohesive and recognizable look.

### Brand Voice
How you communicate is just as important as what you communicate. Your brand voice should be consistent across all touchpoints — from your website copy to social media posts.

### Brand Values
What does your company stand for? Your values should be authentic and reflected in every aspect of your business, from your product design to your customer service.

## The Process

Building a brand identity is a journey, not a destination. It starts with deep research into your market, competitors, and target audience. From there, we develop a brand strategy that guides every creative decision.`,
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp",
    slug: "building-brand-identity",
    author: "Claudia",
    date: "2024-09-05",
    category: "Design",
    readTime: "4 min read",
  },
  {
    id: "social-commerce-trends",
    title: "Social Commerce: The Future of Online Shopping",
    excerpt:
      "Social commerce is reshaping how consumers discover and purchase products. Here's what you need to know.",
    content: `Social commerce — the integration of e-commerce with social media platforms — is projected to reach $1.2 trillion by 2025. For businesses, this represents an enormous opportunity to meet customers where they already spend their time.

## What Is Social Commerce?

Social commerce goes beyond simply posting product links on social media. It encompasses the entire shopping experience — from discovery to checkout — within social platforms themselves.

## Key Platforms

### Instagram Shopping
With features like shoppable posts, Stories, and the dedicated Shop tab, Instagram has become a powerhouse for social commerce.

### TikTok Shop
TikTok's explosive growth has made it a critical platform for reaching younger demographics. Its live shopping features are particularly effective.

### Facebook Marketplace & Shops
With billions of users, Facebook remains a significant player in social commerce, particularly for local businesses.

## How to Get Started

The key to social commerce success is authenticity. Create content that adds value first and sells second. Build trust with your audience through consistent, quality content before pushing products.`,
    image:
      "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp",
    slug: "social-commerce-trends",
    author: "Peter",
    date: "2024-08-28",
    category: "Marketing",
    readTime: "6 min read",
  },
];

export const stats: Stat[] = [
  {
    value: "98%",
    label: "Satisfaction rate",
    description:
      "Nova boasts an impressive client satisfaction rate of 98%, reflecting our commitment to excellence and the effectiveness of our strategies in meeting client objectives.",
    variant: "dark",
  },
  {
    value: "236+",
    label: "Happy clients",
    description:
      "We've had the privilege of partnering with a diverse range of businesses, from startups to established enterprises, each with their unique challenges and aspirations.",
    variant: "green",
  },
  {
    value: "100%",
    label: "Hard work",
    description:
      "We will 100% produce hard work no matter what. In an industry where dedication and results speak volumes, Nova stands out by delivering an unprecedented 100% hard work rate.",
    variant: "dark",
  },
  {
    value: "10+",
    label: "Years of experience",
    description:
      "Celebrating a decade of excellence, Nova has been at the forefront of the technology and creative industry. Our extensive experience has established us as trusted partners for brands looking to make an impact.",
    variant: "green",
  },
  {
    value: "21",
    label: "Countries with clients",
    description:
      "With clients spread across 21+ countries, Nova combines global reach with local expertise. This unique approach enables us to tailor solutions that resonate on a global scale.",
    variant: "dark",
  },
  {
    value: "24/7",
    label: "Support from our team",
    description:
      "Our commitment to our clients extends beyond regular business hours. Nova offers 24/7 customer support to ensure that our clients always have access to the assistance and guidance they need.",
    variant: "green",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: 1,
    title: "Lead",
    description: "Initial contact and inquiry from potential client.",
  },
  {
    step: 2,
    title: "Discovery Call",
    description:
      "In-depth conversation to understand your needs, goals, and challenges.",
  },
  {
    step: 3,
    title: "Proposal",
    description:
      "Detailed project proposal with scope, timeline, and investment.",
  },
  {
    step: 4,
    title: "Design",
    description:
      "Creative design phase with wireframes, mockups, and brand assets.",
  },
  {
    step: 5,
    title: "Development",
    description: "Building your solution with clean, scalable code.",
  },
  {
    step: 6,
    title: "Testing",
    description: "Rigorous QA testing across devices and scenarios.",
  },
  {
    step: 7,
    title: "Launch",
    description: "Deploying your project and going live.",
  },
  {
    step: 8,
    title: "Support",
    description: "Ongoing maintenance, updates, and growth support.",
  },
];

export const clientLogos = [
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f6b_Logoipsum%205.svg",
    alt: "Client logo",
  },
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f66_Logoipsum%203.svg",
    alt: "Client logo",
  },
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f6b_Logoipsum%205.svg",
    alt: "Client logo",
  },
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f66_Logoipsum%203.svg",
    alt: "Client logo",
  },
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f6b_Logoipsum%205.svg",
    alt: "Client logo",
  },
  {
    src: "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f66_Logoipsum%203.svg",
    alt: "Client logo",
  },
];
