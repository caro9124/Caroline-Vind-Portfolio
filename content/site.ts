// All editable copy and imagery for the site lives here.

export const person = {
  firstName: "Caroline",
  lastName: "Vind",
  year: "2026",
  intro:
    "is studying Design, Technology, and Business at VIA, specialising in Branding & Marketing Management, with a particular interest in storytelling, strong visual identities and finding strategic ways to make ideas work. She’s especially drawn to beauty, fashion and lifestyle brands, where strategy, creativity, and culture all meet.",
};

// Words that get a pink highlight when the mouse passes over them (matched case-insensitively).
export const keywords = [
  "creative strategist",
  "designer",
  "branding",
  "campaigns",
  "content",
  "digital experiences",
  "strategy",
  "design",
  "sketching",
  "brands",
  "campaign",
  "marketing",
  "storytelling",
  "visual identity",
  "art direction",
];

// Copy beside the stippled portrait below the hero. Placeholder text: rewrite in your own words.
export const aboutTeaser = {
  label: "About",
  heading: "Hello, I'm Caroline.",
  body: "Strategy, storytelling and a lot of figuring things out in between. I like finding unexpected ways to make an idea work, from shaping a brand to building campaigns, content and digital experiences around it.",
  linkLabel: "More about me",
  href: "/about",
};

// The creative process, told as a hand-drawn journey on the homepage (one entry per drawn stage,
// the last one sits by the arrow into Selected work). Edit freely: keep it short and personal.
export const processStages = [
  { title: "research", line: "Understand the brand, audience & world around it." },
  { title: "define", line: "Find the problem, opportunity & objective." },
  { title: "strategize", line: "Decide what the brand should say, do & stand for." },
  { title: "concept", line: "Find the idea that brings it all together." },
  { title: "create", line: "Turn the idea into something people can experience." },
  { title: "activate", line: "Put it into the world. Learn. Refine." },
];

export const navItems = [
  { label: "Work", href: "/work" },
  { label: "Certificates", href: "/certificates" },
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type CollageItem = {
  src: string;
  alt: string;
  /** Position and size as percentages of the collage box. */
  top: number;
  left: number;
  width: number;
  /** width / height */
  aspect: number;
  rotate?: number;
  z?: number;
  /** Optional irregular "cut-out" edge (not needed for PNGs that are already cut out). */
  clipPath?: string;
  /** Show a colour photo in black and white to match the collage. */
  grayscale?: boolean;
};

export const collage: CollageItem[] = [
  {
    src: "/images/pattern-pink.svg",
    alt: "Pale pink ornamental pattern",
    top: 53,
    left: 21,
    width: 43,
    aspect: 1,
    rotate: -1.5,
    z: 1,
  },
  {
    src: "/images/caroline-child.png",
    alt: "Caroline as a child",
    top: 24,
    left: 0,
    width: 37,
    aspect: 262 / 279,
    rotate: 0.5,
    z: 2,
    grayscale: true,
  },
  {
    src: "/images/caroline-full-body.jpg",
    alt: "Full-length black and white portrait of Caroline",
    top: 0,
    left: 54,
    width: 46,
    aspect: 786 / 1181,
    rotate: 0,
    z: 3,
  },
];
