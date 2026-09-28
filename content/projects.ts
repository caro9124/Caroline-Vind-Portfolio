import type { CoverArtKey } from "@/components/CoverArt";

/*
 * Caroline's projects, migrated from her Readymag portfolio
 * (https://readymag.website/u4216659955/6158721/) as content only.
 * Wording is kept as published there. Fields that weren't stated are left out rather than guessed.
 * Order matches the Readymag Projects page.
 */

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  /** The name before the colon in the original title. */
  name: string;
  /** The descriptor after the colon in the original title, shown as the category line. */
  focus: string;
  /** null where Readymag doesn't state a year. */
  year: string | null;
  /** What kind of work it is, e.g. a concept, an academic project, or work for an organisation. */
  context: string;
  client?: string;
  role?: string;
  tools: string[];
  /** Project text, one paragraph per entry. */
  description: string[];
  /** Results or key points, where the project lists them. */
  highlights?: { heading: string; items: string[] }[];
  /** Further written notes that follow the highlights. */
  notes?: { heading?: string; text: string }[];
  link?: ProjectLink;
  /** Shown as the hover preview and at the top of the project page. */
  cover: { src: string; width: number; height: number; alt: string };
  /** Use an art-directed cover composed in code instead of the cover image (see components/CoverArt). */
  coverArt?: CoverArtKey;
  /** Hover preview styling, so each print sits a little differently. */
  preview: {
    /** Degrees, keep within -1.5 to 1.5. */
    rotate: number;
    /** CSS object-position for the crop, e.g. "50% 30%". */
    focus: string;
    /** Width / height of the print. */
    aspect: number;
    /** Optional different image for the hover preview (defaults to the cover). */
    src?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "sunday-syndrome",
    name: "Sunday Syndrome",
    focus: "Brand Identity & Campaign Strategy",
    year: "2026",
    context: "Conceptual streetwear brand",
    tools: ["Canva", "Google Gemini", "Midjourney", "Adobe Photoshop"],
    description: [
      "Sunday Syndrome is a conceptual streetwear brand developed to explore branding, campaign creation, and marketing strategy. The project includes the development of a visual identity, campaign concept, PR package, QR-based activation, and email marketing concept, supported by defined campaign objectives. It demonstrates my ability to combine creative branding, storytelling, and marketing planning to build a cohesive brand concept.",
    ],
    link: {
      label: "See the project here",
      href: "https://canva.link/3mixl4d4gv52ym8",
    },
    cover: { src: "/images/projects/sunday-syndrome/cover.webp", width: 960, height: 900, alt: "Model in the Sunday Syndrome hoodie on a city staircase" },
    preview: { rotate: -1.2, focus: "50% 30%", aspect: 4 / 5 },
  },
  {
    slug: "lululemon-x-the-ordinary",
    name: "Lululemon x The Ordinary",
    focus: "Product Extension Concept",
    year: "2025",
    context: "Product extension concept",
    tools: ["Canva", "AI tools"],
    description: [
      "This project rethinks the Lululemon water bottle as both a functional object and a branding opportunity.",
      "In addition to physical refinements, I developed a conceptual collaboration with The Ordinary: a clip-on lip balm charm designed to embed beauty into daily wellness routines.",
      "The result is a strategic extension that connects utility, personalization, and cultural visibility.",
    ],
    cover: { src: "/images/projects/lululemon-x-the-ordinary/cover.webp", width: 1400, height: 2349, alt: "Water bottle with lip balm charm in a calm interior" },
    preview: { rotate: 0.9, focus: "50% 60%", aspect: 3 / 4 },
  },
  {
    slug: "via-design-and-business",
    name: "VIA Design & Business",
    focus: "Instagram Strategy",
    year: "2025 – 2026",
    context: "Student position",
    client: "VIA Design & Business",
    role: "Instagram content strategy, production, editing and publishing",
    tools: ["CapCut", "Instagram", "Canva"],
    description: [
      "In my student position, I managed the Instagram presence for VIA Design & Business, handling content strategy, production, editing, and publishing. Through strategic social media content, I aimed to enhance the program’s brand perception and contribute to student recruitment and audience engagement.",
      "I introduced a more youthful, platform-native approach to the content strategy: adjusting tone, visual aesthetics, and storytelling to better align with Gen Z.",
    ],
    highlights: [
      {
        heading: "First 60 days",
        items: [
          "+19% increase in impressions",
          "104,241 organic impressions (in 30 days)",
          "0% paid distribution",
          "Increased engagement on video formats",
          "Stronger non-follower reach (25%)",
        ],
      },
    ],
    link: {
      label: "Explore the account",
      href: "https://www.instagram.com/via_design_og_business/",
    },
    cover: { src: "/images/projects/via-design-and-business/caroline-cutout.png", width: 900, height: 1200, alt: "Caroline with a VIA lanyard beside the headline result: +19% impressions in the first 60 days" },
    coverArt: "via",
    preview: { rotate: -0.6, focus: "50% 50%", aspect: 3 / 4 },
  },
  {
    slug: "editorial-concept",
    name: "Editorial Concept",
    focus: "Graphic Design and Art Direction",
    year: "2026",
    context: "Academic design project",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    description: [
      "Developed as part of an academic design project, this conceptual magazine layout explores visual identity through structured composition, typographic hierarchy, and cohesive art direction.",
    ],
    cover: { src: "/images/projects/editorial-concept/01-magazine-issues-stacked-on-concrete.webp", width: 1400, height: 1033, alt: "Magazine issues stacked on concrete" },
    preview: { rotate: 1.1, focus: "50% 45%", aspect: 4 / 5, src: "/images/projects/editorial-concept/reader/01-front-cover-ss26.jpg" },
  },
  {
    slug: "the-improved-bag",
    name: "The Improved Bag",
    focus: "Product Concept",
    year: "2025",
    context: "Research-based product concept",
    tools: ["Canva", "Google Gemini"],
    description: [
      "A research-based redesign of an everyday fashion accessory, developed through user interviews, market analysis, and concept iteration.",
    ],
    cover: { src: "/images/projects/the-improved-bag/cover.webp", width: 1400, height: 1221, alt: "The improved bag with laptop and charm" },
    preview: { rotate: -1, focus: "50% 55%", aspect: 1 },
  },
  {
    slug: "organic-pinterest-growth",
    name: "Organic Pinterest Growth",
    focus: "10M+ Impressions",
    year: "2024",
    context: "Fashion-focused Pinterest pin",
    tools: ["Pinterest"],
    description: [
      "In 2024, I created and published a fashion-focused Pinterest pin that organically generated over 10 million impressions without paid promotion.",
    ],
    highlights: [
      {
        heading: "Organic performance",
        items: [
          "10M+ impressions",
          "126K+ engagements",
          "11.68K saves",
          "1.18M pin clicks",
          "52.5K monthly profile views",
        ],
      },
    ],
    notes: [
      {
        text: "The content resonated strongly with Gen Z women, aligning with current Pinterest search trends within fashion and styling.",
      },
      {
        heading: "Sustained performance",
        text: "625,47k impressions and 59.93k engagement over a 90-day period.",
      },
      {
        heading: "Key insight",
        text: "This project demonstrates how trend alignment, platform-specific formatting, and strong visual hooks can generate large-scale organic reach without paid media.",
      },
    ],
    link: {
      label: "View original pin",
      href: "https://dk.pinterest.com/pin/748864244398987327/",
    },
    cover: { src: "/images/projects/organic-pinterest-growth/cover.jpg", width: 1252, height: 1439, alt: "The fashion pin: a slogan T-shirt styled with wide jeans" },
    preview: { rotate: 0.6, focus: "50% 35%", aspect: 4 / 5 },
  },
];

export const projectNumber = (i: number) => String(i + 1).padStart(2, "0");
