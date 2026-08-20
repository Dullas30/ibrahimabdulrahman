import type { StaticImageAsset } from "@/lib/asset";
import campusLostFoundPreview from "@/assets/projects/campus-lost-found-preview.png";
import subUrbanWearsPreview from "@/assets/projects/sub-urban-wears-preview.png";
import nelcoopPreview from "@/assets/projects/nelcoop-preview.png";
import ecms1Preview from "@/assets/projects/ecms1-preview.png";
import ridewisePreview from "@/assets/projects/ridewise-preview.png";
import dconnectPreview from "@/assets/projects/dconnect-preview.png";
import houseOfFahamPreview from "@/assets/projects/house-of-faham-preview.png";
import spamassagePreview from "@/assets/projects/spamassage-preview.png";
import pengCollectionPreview from "@/assets/projects/peng-collection-preview.png";
import abdulBlogPreview from "@/assets/projects/abdulblog-preview.png";

const img = (
  url: string,
  original_filename: string,
  content_type = "image/jpeg",
): StaticImageAsset => ({
  url,
  original_filename,
  content_type,
});

const houseOfFaham = img(houseOfFahamPreview, "house-of-faham-preview.png", "image/png");
const spamassage = img(spamassagePreview, "spamassage-preview.png", "image/png");
const ridewise = img(ridewisePreview, "ridewise-preview.png", "image/png");
const dconnect = img(dconnectPreview, "dconnect-preview.png", "image/png");
const pengCollection = img(pengCollectionPreview, "peng-collection-preview.png", "image/png");
const ecms1Image = img(ecms1Preview, "ecms1-preview.png", "image/png");
const nelcoopImage = img(nelcoopPreview, "nelcoop-preview.png", "image/png");
const subUrbanWearsImage = img(subUrbanWearsPreview, "sub-urban-wears-preview.png", "image/png");
const campusLostFoundImage = img(
  campusLostFoundPreview,
  "campus-lost-found-preview.png",
  "image/png",
);
const abdulBlogImage = img(abdulBlogPreview, "abdulblog-preview.png", "image/png");

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  description: string;
  overview: string;
  features: string[];
  stack: string[];
  image: StaticImageAsset;
  live?: string;
  github?: string;
  caseStudy: {
    problem: string;
    solution: string;
    process: string[];
    results: string;
  };
};

export const projects: Project[] = [
  {
    slug: "house-of-faham",
    name: "House of Faham",
    tagline: "E-commerce storefront",
    year: "2025",
    description:
      "A modern storefront for a Nigerian fashion brand with product catalog, cart and secure checkout.",
    overview:
      "House of Faham is a growing Nigerian fashion brand. I designed and built a performant storefront that showcases collections beautifully while keeping the buying flow fast and friction-free.",
    features: [
      "Product catalog with categories and detail pages",
      "Cart and checkout flow with form validation",
      "Supabase-backed inventory and orders",
      "Fully responsive, image-optimized gallery",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vite"],
    image: houseOfFaham,
    live: "https://houseoffaham.vercel.app/",
    caseStudy: {
      problem:
        "The brand was selling through DMs and word of mouth, with no central catalog, no prices in one place, and no way for customers to browse or order on their own.",
      solution:
        "A dedicated storefront with a curated catalog, clear product pages and a validated cart-to-checkout flow, wrapped in an editorial visual language that matches the brand's identity.",
      process: [
        "Mapped the shopping journey from discovery to a placed order",
        "Built a reusable component system in React + Tailwind so new collections slot in without new code",
        "Modeled products and orders in Supabase with row-level security",
        "Sweated mobile layouts first, since that's where most customers browse",
      ],
      results:
        "The brand now owns its storefront end to end, and customers browse the full catalog and place orders directly without a single message exchanged first.",
    },
  },
  {
    slug: "spamassage",
    name: "Spamassage",
    tagline: "Booking experience",
    year: "2025",
    description:
      "A premium booking site for an in-home spa service with treatment selection and scheduling.",
    overview:
      "Spamassage brings spa treatments to your home. The site focuses on a calm, luxurious feel with a smooth multi-step booking flow and clear treatment details.",
    features: [
      "Multi-step booking flow with validation",
      "Treatment catalog with pricing",
      "Mobile-first responsive design",
      "Calm, brand-driven visual system",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "React Hook Form", "Zod"],
    image: spamassage,
    live: "https://spamassage.vercel.app/",
    caseStudy: {
      problem:
        "Bookings were coordinated over phone and chat, which led to endless back and forth on times, treatments and addresses, with details often arriving incomplete.",
      solution:
        "A calm, guided booking flow: guests pick a treatment, set their preferences and submit fully validated details in a single sitting, on any device.",
      process: [
        "Broke the booking into small, low-friction steps with React Hook Form + Zod",
        "Designed a quiet, premium visual system that mirrors the in-home spa experience",
        "Kept the whole flow thumb-friendly for mobile-first guests",
      ],
      results:
        "Booking is now one structured flow instead of a chat thread, and every request arrives complete, consistent and ready to confirm.",
    },
  },
  {
    slug: "ridewise-ng",
    name: "RideWise NG",
    tagline: "Fare comparison dashboard",
    year: "2024",
    description:
      "Compare ride-hailing fares across platforms in Nigeria with data-driven charts and insights.",
    overview:
      "RideWise NG aggregates fare estimates from major ride-hailing platforms in Nigeria, helping riders pick the cheapest option with clear visual comparisons.",
    features: [
      "Fare comparison across providers",
      "Interactive charts and trends",
      "Location-based estimates",
      "Clean data dashboard UI",
    ],
    stack: ["React", "TypeScript", "Recharts", "Tailwind CSS", "Vite"],
    image: ridewise,
    live: "https://ride-wise-ng.vercel.app/",
    caseStudy: {
      problem:
        "Fares for the same trip vary wildly between ride-hailing apps, and riders have no way to compare without opening every app and checking one by one.",
      solution:
        "A single dashboard that puts fare estimates side by side, with charts that make price trends and the cheapest option obvious at a glance.",
      process: [
        "Structured the comparison around one question: what does this trip cost, everywhere?",
        "Visualized fares with Recharts so differences read instantly, not after study",
        "Kept the dashboard fast and legible on small screens, where riders actually check",
      ],
      results:
        "Riders can see the cheapest option for a trip in seconds, with trends that make surge pricing patterns easy to spot.",
    },
  },
  {
    slug: "dconnect",
    name: "DConnect",
    tagline: "Local business directory",
    year: "2023",
    description:
      "A discovery platform connecting people with local businesses and services in their area.",
    overview:
      "DConnect is a directory for discovering trusted local businesses. Owners can list services, and visitors can search, filter and connect directly.",
    features: [
      "Business listings with categories",
      "Search and filtering",
      "Owner submission flow",
      "Responsive cards and detail pages",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    image: dconnect,
    live: "https://dconnect-pi.vercel.app/",
    caseStudy: {
      problem:
        "Great local businesses often have no online presence beyond a phone number, so customers can't discover them, compare them or reach them easily.",
      solution:
        "A clean directory where businesses are listed by category with the details that matter, and visitors can search, filter and connect directly.",
      process: [
        "Designed listing cards that answer 'what, where, how do I reach them' at a glance",
        "Built search and category filtering on top of a Supabase-backed directory",
        "Created a simple submission flow so owners can list themselves",
      ],
      results:
        "Local businesses get a real, searchable presence, and customers get one place to discover and compare services in their area.",
    },
  },
  {
    slug: "peng-collection",
    name: "Peng Collection",
    tagline: "Fashion brand site",
    year: "2023",
    description:
      "An elegant brand website for a fashion collection with lookbook-style presentation.",
    overview:
      "Peng Collection is a fashion brand site focused on visual storytelling, with large imagery, smooth transitions and a lookbook feel that elevates the brand.",
    features: [
      "Lookbook-style gallery",
      "Editorial typography and layout",
      "Smooth page transitions",
      "Fully responsive design",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: pengCollection,
    live: "https://thepengcollection.vercel.app/",
    caseStudy: {
      problem:
        "The collection lived on social media, where every brand looks the same, so the label needed a space with the editorial quality its pieces deserve.",
      solution:
        "A lookbook-style site: large imagery, generous whitespace and typography that treats each collection like a magazine spread rather than a feed.",
      process: [
        "Built the layout around the photography, not the other way around",
        "Choreographed subtle transitions with Framer Motion to keep the pace cinematic",
        "Kept the system responsive so the editorial feel survives small screens",
      ],
      results:
        "The brand now has a home that matches its ambition, a permanent, ownable showcase instead of a rented spot in a feed.",
    },
  },
  {
    slug: "ecms1",
    name: "ECMS1",
    tagline: "Management system",
    year: "2026",
    description:
      "A modern web-based management system built with a clean dashboard experience that organizes users and information through an intuitive interface.",
    overview:
      "ECMS1 is a modern web-based management system with a clean dashboard experience designed to organize users and information through an intuitive interface.",
    features: [
      "Responsive dashboard",
      "Clean UI/UX",
      "Fast loading",
      "Organized navigation",
      "Mobile-friendly layout",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Vercel"],
    image: ecms1Image,
    live: "https://ecms1.vercel.app",
    caseStudy: {
      problem:
        "Traditional management systems are often outdated, difficult to navigate, and not optimized for modern devices.",
      solution:
        "Built a responsive dashboard with organized navigation, faster interactions, and a cleaner user experience across desktop and mobile.",
      process: [
        "Planned the interface",
        "Built reusable components",
        "Optimized responsiveness",
        "Deployed on Vercel",
      ],
      results: "Delivered a scalable management interface with improved usability and performance.",
    },
  },
  {
    slug: "nelcoop",
    name: "NELCOOP",
    tagline: "Cooperative platform",
    year: "2026",
    description:
      "A professional cooperative platform designed to present governance, membership benefits, revenue allocation, and organizational vision through a modern digital experience.",
    overview:
      "NELCOOP is a professional cooperative platform that presents governance, revenue allocation, membership benefits, and organizational vision through a modern digital experience.",
    features: [
      "Modern landing page",
      "Governance section",
      "Revenue allocation display",
      "Membership information",
      "Responsive design",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Vercel"],
    image: nelcoopImage,
    live: "https://nelcoop.vercel.app",
    caseStudy: {
      problem:
        "The cooperative needed a professional online presence that clearly communicates its structure and value to members and stakeholders.",
      solution:
        "Created a polished landing platform that explains governance, revenue allocation, membership benefits, and organizational goals.",
      process: [
        "Organized cooperative content",
        "Designed readable layouts",
        "Built reusable components",
        "Optimized responsiveness",
      ],
      results: "Delivered a professional digital presence that improves trust and accessibility.",
    },
  },
  {
    slug: "sub-urban-wears",
    name: "Sub Urban Wears",
    tagline: "Fashion website",
    year: "2026",
    description:
      "A premium fashion website built to showcase clothing collections with a minimalist shopping experience that keeps the products as the main focus.",
    overview:
      "Sub Urban Wears is a premium fashion website built to showcase clothing collections with a minimalist shopping experience that keeps the products as the main focus.",
    features: [
      "Premium fashion UI",
      "Product showcase",
      "Smooth transitions",
      "Mobile responsiveness",
      "Brand-focused visuals",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Vercel"],
    image: subUrbanWearsImage,
    live: "https://sub-urbanwears.vercel.app",
    caseStudy: {
      problem:
        "The clothing brand needed an online storefront that reflects its identity while presenting products in a premium way.",
      solution:
        "Designed a visually driven experience with smooth transitions and a clean product-focused interface.",
      process: [
        "Designed around the brand identity",
        "Built minimal layouts",
        "Improved responsiveness",
        "Optimized interactions",
      ],
      results:
        "Created a polished brand website that strengthens the brand identity and improves user engagement.",
    },
  },
  {
    slug: "campus-lost-and-found",
    name: "Campus Lost & Found",
    tagline: "Campus utility platform",
    year: "2026",
    description:
      "A centralized platform that helps students report, search for, and recover lost items within their campus community.",
    overview:
      "Campus Lost & Found is a centralized platform that helps students report, search for, and recover lost items within their campus community.",
    features: [
      "Lost item reporting",
      "Found item reporting",
      "Searchable listings",
      "User authentication",
      "Responsive interface",
    ],
    stack: ["React", "Vite", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    image: campusLostFoundImage,
    live: "https://campus-lostbutfound.vercel.app",
    caseStudy: {
      problem:
        "Students often rely on scattered WhatsApp groups or word-of-mouth when trying to recover lost belongings.",
      solution:
        "Built a centralized system where users can post lost or found items and search organized listings.",
      process: [
        "Designed the reporting workflow",
        "Built the frontend",
        "Integrated Supabase",
        "Tested core functionality",
      ],
      results:
        "Delivered a practical campus solution that makes recovering lost items more efficient.",
    },
  },
  {
    slug: "abdulblog",
    name: "AbdulBlog",
    tagline: "Personal blog platform",
    year: "2026",
    description:
      "A modern personal blog platform created to publish articles, share ideas, and showcase written content through a clean, SEO-friendly reading experience.",
    overview:
      "AbdulBlog is a modern personal blog platform created to publish articles, share ideas, and showcase written content through a clean, SEO-friendly reading experience.",
    features: [
      "Clean reading interface",
      "Blog post management",
      "Responsive design",
      "Fast page loading",
      "SEO-friendly structure",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown/MDX", "Vercel"],
    image: abdulBlogImage,
    live: "https://abdulblog.vercel.app",
    caseStudy: {
      problem:
        "Many personal blogs prioritize functionality over readability, making it difficult to maintain content while delivering a modern reading experience.",
      solution:
        "Built a lightweight blog focused on readability, fast performance, responsive design, and organized content publishing.",
      process: [
        "Planned the content-first layout",
        "Built reusable page components",
        "Optimized typography",
        "Deployed on Vercel",
      ],
      results:
        "Created a modern blog that serves as both a writing platform and a professional extension of the portfolio.",
    },
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Vite", "TypeScript"],
  },
  {
    title: "Design Tools",
    items: ["Canva", "Figma", "Social media creatives"],
  },
  {
    title: "Backend Basics",
    items: ["Supabase", "REST APIs", "Basic backend concepts"],
  },
  {
    title: "Data Analysis",
    items: ["Excel", "SQL", "Power BI", "Data cleaning", "Visualization"],
  },
];

export const experiences = [
  {
    role: "Creative and Frontend Developer",
    company: "Century Information Systems",
    period: "08/2025 - Present",
    points: [
      "Designed social media graphics, flyers, brochures, and digital marketing materials",
      "Supported the Social Media Director with creative content production and campaign design",
      "Developed responsive webpages using HTML, CSS, and JavaScript",
      "Maintained brand consistency across promotional materials and online platforms",
      "Assisted with IT support, troubleshooting, system maintenance, and client onboarding",
    ],
  },
  {
    role: "IT Support Intern",
    company: "FCT IRS",
    period: "2023 - 2024",
    points: [
      "Assisted with IT support and routine technical troubleshooting",
      "Supported administrative and operational activities within the department",
      "Worked with professional teams to improve workflow efficiency",
    ],
  },
];

export const stats = [
  { value: projects.length, suffix: "", label: "Projects shipped" },
  {
    value: projects.filter((project) => Boolean(project.live)).length,
    suffix: "",
    label: "Live demos",
  },
  { value: skillGroups.length, suffix: "", label: "Skill areas" },
  { value: experiences.length, suffix: "", label: "Experience roles" },
];
