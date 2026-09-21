const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'content/case-studies',
  'content/blog',
  'content/services',
  'content/site'
];
dirs.forEach(d => fs.mkdirSync(path.resolve(d), { recursive: true }));

// 1. Site Config
const siteConfig = {
  name: "Northforge Labs",
  description: "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
  url: "https://firm.org",
  email: "info@firm.org",
  phone: "01234 567 890",
  address: {
    line1: "Srinagar",
    line2: "Kashmir",
    city: "Jammu and Kashmir"
  },
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/home",
    linkedin: "https://www.linkedin.com/feed/"
  }
};
fs.writeFileSync('content/site/config.json', JSON.stringify(siteConfig, null, 2));

// 2. Navigation
const navigation = [
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" }
];
fs.writeFileSync('content/site/navigation.json', JSON.stringify(navigation, null, 2));

// 3. Services
const services = [
  {
    id: "software-development",
    title: "Software Development",
    description: "From concept to launch, we build robust digital products that drive business growth. Our team delivers custom websites, SaaS platforms, mobile apps, AI chatbots, and API integrations tailored to your unique needs.",
    image: "/images/placeholder.svg",
    slug: "software-development",
    features: [
      "Websites",
      "SaaS platforms",
      "Mobile apps",
      "Custom software",
      "AI chatbots",
      "API integrations"
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "We craft intuitive, beautiful interfaces that delight users and drive conversions. Our design process combines user research, wireframing, and pixel-perfect execution to create seamless digital experiences.",
    image: "/images/placeholder.svg",
    slug: "ui-ux-design",
    features: ["Wireframes", "App design", "Website design", "Design systems"]
  },
  {
    id: "branding-creative-design",
    title: "Branding & Creative Design",
    description: "Your brand is your story. We help you tell it with striking logos, cohesive brand identities, professional business cards, eye-catching posters, and compelling pitch decks that leave lasting impressions.",
    image: "/images/placeholder.svg",
    slug: "branding-creative-design",
    features: [
      "Logos",
      "Brand identity",
      "Business cards",
      "Posters",
      "Pitch decks"
    ]
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Stay ahead of the curve with strategic social media management. We handle content calendars, create engaging reels, write compelling captions, track analytics, and build your community — so you can focus on your business.",
    image: "/images/placeholder.svg",
    slug: "social-media-management",
    features: [
      "Content calendars",
      "Reels",
      "Captions",
      "Analytics",
      "Community management"
    ]
  },
  {
    id: "video-editing-production",
    title: "Video Editing & Production",
    description: "Bring your vision to life with professional video production. From Instagram Reels and YouTube Shorts to long-form content and podcasts — we deliver polished, engaging video content with motion graphics, subtitles, and color grading.",
    image: "/images/placeholder.svg",
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
      "Thumbnails"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Drive targeted traffic and convert visitors into customers. Our data-driven marketing strategies span SEO, Google Ads, Facebook Ads, email marketing, and lead generation to maximize your ROI.",
    image: "/images/placeholder.svg",
    slug: "digital-marketing",
    features: [
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "Email marketing",
      "Lead generation"
    ]
  },
  {
    id: "business-automation-ai",
    title: "Business Automation & AI",
    description: "Streamline your operations with intelligent automation. We set up WhatsApp automation, CRM systems, invoice automation, and custom workflow solutions that save time and reduce human error.",
    image: "/images/placeholder.svg",
    slug: "business-automation-ai",
    features: [
      "WhatsApp automation",
      "CRM setup",
      "Invoice automation",
      "Workflow automation"
    ]
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    description: "Navigate the complex technology landscape with expert guidance. From technology strategy and software audits to cloud migration and security consultation, we help you make informed decisions that drive growth.",
    image: "/images/placeholder.svg",
    slug: "it-consulting",
    features: [
      "Technology strategy",
      "Software audits",
      "Cloud migration",
      "Security consultation"
    ]
  }
];
services.forEach(s => {
  fs.writeFileSync(`content/services/${s.slug}.json`, JSON.stringify(s, null, 2));
});

// 4. Team Members
const teamMembers = [
  {
    id: "peter",
    name: "Peter",
    role: "CEO",
    bio: "Peter is the founder of Northforge Labs, and passionate about helping businesses grow through Social Media.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "Social Media Strategy Director",
    bio: "Expert in crafting compelling brand stories on social media platforms for heightened engagement.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "claudia",
    name: "Claudia",
    role: "Digital Marketing Analyst",
    bio: "Skilled in translating data into actionable insights for strategic online marketing campaigns.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "stanley",
    name: "Stanley",
    role: "Admin",
    bio: "Stanley is a master at stress relief and spreading happiness throughout the office.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "eve",
    name: "Eve",
    role: "TikTok Specialist",
    bio: "Eve is the dynamo behind our TikTok campaigns, with an uncanny ability to tap into the latest trends and translate them into viral content.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "kirsty",
    name: "Kirsty",
    role: "Graphic Designer",
    bio: "With a keen eye for aesthetics and a deep understanding of brand identity, Kirsty ensures that every piece of content communicates the essence of our clients' brands.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "nathan",
    name: "Nathan",
    role: "Finance Director",
    bio: "With an expertise in financial strategy and a knack for numbers, Nathan oversees budgeting, forecasting, and financial planning.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  },
  {
    id: "craig",
    name: "Craig",
    role: "Account Manager",
    bio: "Craig is your go-to person for all things project-related. With a talent for organization and a commitment to excellent client service Craig ensures that every project runs smoothly.",
    image: "/images/avatar.svg",
    socials: {
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://twitter.com/home"
    }
  }
];
fs.writeFileSync('content/site/team.json', JSON.stringify(teamMembers, null, 2));

// 5. FAQs
const faqs = [
  {
    id: "faq-1",
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of services including software development (websites, SaaS, mobile apps), UI/UX design, branding & creative design, social media management, video editing & production, digital marketing, business automation & AI, and IT consulting. We tailor our services to meet the unique needs of each client."
  },
  {
    id: "faq-2",
    question: "How do you approach new projects?",
    answer: "Our proven workflow starts with a discovery call to understand your needs, followed by a detailed proposal. We then move through design, development, and testing phases before launch. Post-launch, we provide ongoing support and maintenance to ensure long-term success."
  },
  {
    id: "faq-3",
    question: "What industries do you work with?",
    answer: "We work with a diverse range of industries including hospitals, schools, restaurants, retail businesses, real estate companies, startups, manufacturing companies, NGOs, and government organizations. Our adaptable approach allows us to deliver results across any sector."
  },
  {
    id: "faq-4",
    question: "What makes your agency different from others?",
    answer: "What sets us apart is our end-to-end approach — we handle everything from branding and design to development and marketing under one roof. Our team combines creativity with technical expertise and data-driven strategies to deliver results. We prioritize transparency and communication at every step."
  },
  {
    id: "faq-5",
    question: "How do we get started?",
    answer: "Getting started is easy! Simply reach out through our contact form, email, or give us a call. We'll schedule a discovery call to discuss your goals, target audience, and current challenges. From there, we'll propose a customized strategy tailored to your needs and kick off your project."
  }
];
fs.writeFileSync('content/site/faqs.json', JSON.stringify(faqs, null, 2));

// 6. Testimonials
const testimonials = [
  {
    id: "testimonial-1",
    quote: "Since partnering with this incredible team, our online engagement has skyrocketed! Sales have increased by 30% in just a few months, and our brand awareness is at an all-time high. Their creative approach to content and targeted strategies really make a difference. Highly recommend if you're looking to elevate your brand's online presence!",
    author: "Emily R.",
    role: "Boutique Owner",
    rating: 5
  },
  {
    id: "testimonial-2",
    quote: "This agency has been a game-changer for our startup. Their data-driven strategies and deep understanding of digital platforms have significantly boosted our lead generation and conversion rates. The team is proactive, transparent, and really dedicated to our success. It's been a pleasure working with professionals who are as passionate about our growth as we are.",
    author: "Marcus L.",
    role: "Tech Startup Founder",
    rating: 5
  },
  {
    id: "testimonial-3",
    quote: "I was amazed by the immediate impact their work had on our event promotions. Not only did they increase our event's visibility, but they also engaged our target audience in meaningful ways, leading to a record number of attendees. Their attention to detail, creativity, and expertise were beyond impressive. This agency truly knows how to make digital work wonders for your business.",
    author: "Sophia T.",
    role: "Event Coordinator",
    rating: 5
  }
];
fs.writeFileSync('content/site/testimonials.json', JSON.stringify(testimonials, null, 2));

// 7. Case Studies
const caseStudies = [
  {
    id: "glowessence-skincare",
    title: "GlowEssence Skincare",
    description: "Illuminating the Digital Presence of GlowEssence Skincare",
    image: "/images/placeholder.svg",
    slug: "glowessence-skincare",
    tags: ["Branding", "Web Development"],
    client: "GlowEssence Skincare",
    challenge: "GlowEssence needed a complete digital overhaul — from their brand identity to their e-commerce platform. Their existing website was outdated and failed to capture their premium positioning.",
    solution: "We redesigned their brand identity, built a modern e-commerce platform, and implemented a comprehensive digital marketing strategy spanning social media, SEO, and paid advertising.",
    results: [
      "250% increase in online sales",
      "180% growth in social media followers",
      "45% improvement in conversion rate",
      "Top 3 Google rankings for key terms"
    ]
  },
  {
    id: "brewzen-coffee-retailer",
    title: "BrewZen Coffee Retailer",
    description: "BrewZen is a boutique coffee retailer known for its unique blends and commitment to sustainability.",
    image: "/images/placeholder.svg",
    slug: "brewzen-coffee-retailer",
    tags: ["Mobile App", "Automation"],
    client: "BrewZen Coffee",
    challenge: "BrewZen wanted to modernize their ordering system and build a loyal customer base through a mobile-first approach while maintaining their artisanal brand feel.",
    solution: "We developed a custom mobile app with ordering, loyalty program, and push notifications. We also automated their inventory management and integrated with their POS system.",
    results: [
      "40% of orders now through the app",
      "65% customer retention rate",
      "30% reduction in inventory waste",
      "4.8 star app rating"
    ]
  },
  {
    id: "burgerhaven-restaurant",
    title: "BurgerHaven Restaurant",
    description: "Sizzling Digital Transformation for BurgerHaven Restaurant",
    image: "/images/placeholder.svg",
    slug: "burgerhaven-restaurant",
    tags: ["SEO", "Digital Marketing"],
    client: "BurgerHaven",
    challenge: "BurgerHaven was struggling with low online visibility and needed to compete with larger chains in their area. They needed a comprehensive digital marketing strategy.",
    solution: "We implemented local SEO optimization, Google Ads campaigns, social media marketing, and a redesigned website with online ordering capabilities.",
    results: [
      "300% increase in website traffic",
      "85% increase in online orders",
      "First page Google rankings",
      "150% increase in revenue"
    ]
  }
];
caseStudies.forEach(cs => {
  fs.writeFileSync(`content/case-studies/${cs.slug}.json`, JSON.stringify(cs, null, 2));
});

// 8. Blog Posts
const blogPosts = [
  {
    id: "future-of-ai-business",
    title: "The Future of AI in Business Automation",
    excerpt: "Discover how AI is transforming business operations and what it means for your company's future growth.",
    content: `Artificial Intelligence is no longer a futuristic concept — it's here, and it's transforming how businesses operate. From chatbots handling customer inquiries to automated invoice processing and predictive analytics, AI is enabling companies to work smarter, not harder.\n\n## Key Areas Where AI Is Making an Impact\n\n### Customer Service\nAI-powered chatbots can handle up to 80% of routine customer inquiries, freeing your team to focus on complex issues that require a human touch. These systems learn and improve over time, providing increasingly accurate and helpful responses.\n\n### Marketing Automation\nAI algorithms can analyze customer behavior patterns to deliver personalized content at the right time through the right channel. This level of personalization was previously impossible at scale.\n\n### Operations & Workflow\nFrom automated inventory management to predictive maintenance, AI is streamlining operations across industries. Businesses report up to 40% reduction in operational costs after implementing AI solutions.\n\n## Getting Started with AI\n\nThe key is to start small. Identify one area of your business where automation could have the biggest impact, then scale from there. Our team can help you assess your readiness and build a roadmap for AI adoption.`,
    image: "/images/placeholder.svg",
    slug: "future-of-ai-business",
    author: "Sarah",
    date: "2024-09-10",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    id: "building-brand-identity",
    title: "Building a Brand Identity That Stands Out",
    excerpt: "Learn the essential elements of creating a memorable brand identity that resonates with your target audience.",
    content: `Your brand identity is more than just a logo — it's the complete visual and emotional language that communicates who you are to the world. In a crowded marketplace, a strong brand identity can be the difference between being noticed and being ignored.\n\n## The Core Elements\n\n### Visual Identity\nThis includes your logo, color palette, typography, and imagery style. Every visual element should work together to create a cohesive and recognizable look.\n\n### Brand Voice\nHow you communicate is just as important as what you communicate. Your brand voice should be consistent across all touchpoints — from your website copy to social media posts.\n\n### Brand Values\nWhat does your company stand for? Your values should be authentic and reflected in every aspect of your business, from your product design to your customer service.\n\n## The Process\n\nBuilding a brand identity is a journey, not a destination. It starts with deep research into your market, competitors, and target audience. From there, we develop a brand strategy that guides every creative decision.`,
    image: "/images/placeholder.svg",
    slug: "building-brand-identity",
    author: "Claudia",
    date: "2024-09-05",
    category: "Design",
    readTime: "4 min read"
  },
  {
    id: "social-commerce-trends",
    title: "Social Commerce: The Future of Online Shopping",
    excerpt: "Social commerce is reshaping how consumers discover and purchase products. Here's what you need to know.",
    content: `Social commerce — the integration of e-commerce with social media platforms — is projected to reach $1.2 trillion by 2025. For businesses, this represents an enormous opportunity to meet customers where they already spend their time.\n\n## What Is Social Commerce?\n\nSocial commerce goes beyond simply posting product links on social media. It encompasses the entire shopping experience — from discovery to checkout — within social platforms themselves.\n\n## Key Platforms\n\n### Instagram Shopping\nWith features like shoppable posts, Stories, and the dedicated Shop tab, Instagram has become a powerhouse for social commerce.\n\n### TikTok Shop\nTikTok's explosive growth has made it a critical platform for reaching younger demographics. Its live shopping features are particularly effective.\n\n### Facebook Marketplace & Shops\nWith billions of users, Facebook remains a significant player in social commerce, particularly for local businesses.\n\n## How to Get Started\n\nThe key to social commerce success is authenticity. Create content that adds value first and sells second. Build trust with your audience through consistent, quality content before pushing products.`,
    image: "/images/placeholder.svg",
    slug: "social-commerce-trends",
    author: "Peter",
    date: "2024-08-28",
    category: "Marketing",
    readTime: "6 min read"
  }
];
blogPosts.forEach(bp => {
  fs.writeFileSync(`content/blog/${bp.slug}.json`, JSON.stringify(bp, null, 2));
});

// 9. Stats
const stats = [
  {
    value: "98%",
    label: "Satisfaction rate",
    description: "Northforge Labs boasts an impressive client satisfaction rate of 98%, reflecting our commitment to excellence and the effectiveness of our strategies in meeting client objectives.",
    variant: "dark"
  },
  {
    value: "236+",
    label: "Happy clients",
    description: "We've had the privilege of partnering with a diverse range of businesses, from startups to established enterprises, each with their unique challenges and aspirations.",
    variant: "green"
  },
  {
    value: "100%",
    label: "Hard work",
    description: "We will 100% produce hard work no matter what. In an industry where dedication and results speak volumes, Northforge Labs stands out by delivering an unprecedented 100% hard work rate.",
    variant: "dark"
  },
  {
    value: "10+",
    label: "Years of experience",
    description: "Celebrating a decade of excellence, Northforge Labs has been at the forefront of the technology and creative industry. Our extensive experience has established us as trusted partners for brands looking to make an impact.",
    variant: "green"
  },
  {
    value: "21",
    label: "Countries with clients",
    description: "With clients spread across 21+ countries, Northforge Labs combines global reach with local expertise. This unique approach enables us to tailor solutions that resonate on a global scale.",
    variant: "dark"
  },
  {
    value: "24/7",
    label: "Support from our team",
    description: "Our commitment to our clients extends beyond regular business hours. Northforge Labs offers 24/7 customer support to ensure that our clients always have access to the assistance and guidance they need.",
    variant: "green"
  }
];
fs.writeFileSync('content/site/stats.json', JSON.stringify(stats, null, 2));

// 10. Workflow Steps
const workflowSteps = [
  { step: 1, title: "Lead", description: "Initial contact and inquiry from potential client." },
  { step: 2, title: "Discovery Call", description: "In-depth conversation to understand your needs, goals, and challenges." },
  { step: 3, title: "Proposal", description: "Detailed project proposal with scope, timeline, and investment." },
  { step: 4, title: "Design", description: "Creative design phase with wireframes, mockups, and brand assets." },
  { step: 5, title: "Development", description: "Building your solution with clean, scalable code." },
  { step: 6, title: "Testing", description: "Rigorous QA testing across devices and scenarios." },
  { step: 7, title: "Launch", description: "Deploying your project and going live." },
  { step: 8, title: "Support", description: "Ongoing maintenance, updates, and growth support." }
];
fs.writeFileSync('content/site/workflow.json', JSON.stringify(workflowSteps, null, 2));

// 11. Client Logos
const clientLogos = [
  { src: "/images/logos/client-logo-1.svg", alt: "Client logo 1" },
  { src: "/images/logos/client-logo-2.svg", alt: "Client logo 2" },
  { src: "/images/logos/client-logo-1.svg", alt: "Client logo 3" },
  { src: "/images/logos/client-logo-2.svg", alt: "Client logo 4" },
  { src: "/images/logos/client-logo-1.svg", alt: "Client logo 5" },
  { src: "/images/logos/client-logo-2.svg", alt: "Client logo 6" }
];
fs.writeFileSync('content/site/client-logos.json', JSON.stringify(clientLogos, null, 2));

console.log("Successfully generated all content/ JSON files!");
