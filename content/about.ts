// The About page, set up as a brand guidelines book with Caroline as the brand.
// Facts come from her LinkedIn (About, Experience and posts). The short handwritten notes
// are playful labels: rewrite any of them freely.

export const aboutCover = {
  kicker: "Brand guidelines",
  edition: "Edition 2026",
  lede: "Studying Design, Technology, and Business at VIA Design & Business, specialising in Branding & Marketing Management. Based in Aarhus. What follows is the brand, documented the way I’d document any other.",
};

export const aboutChapters = [
  { id: "origin", label: "Origin" },
  { id: "mission", label: "Mission" },
  { id: "heritage", label: "Heritage" },
  { id: "hours", label: "Operating hours" },
  { id: "identity", label: "Identity" },
  { id: "rules", label: "Do’s & don’ts" },
  { id: "contact", label: "Contact" },
] as const;

export const origin = {
  frames: ["/images/about/origin-1.png", "/images/about/origin-2.png", "/images/about/origin-3.png"],
  now: { src: "/images/about/caroline-smile.jpg", width: 786, height: 1181 },
  note: "curls: on brand since day one",
  body: "Every brand has an origin story. This one starts with curly hair and a lot of curiosity, and grew into studying how brands tell theirs.",
};

export const mission = {
  statement: "Combining creativity and strategy to create brand communication that delivers real value.",
  positioning: [
    { label: "For", text: "beauty, fashion and lifestyle brands" },
    { label: "Who need", text: "strategy, storytelling and content that connects with people" },
    { label: "Caroline is", text: "a Design, Technology, and Business student at VIA, specialising in Branding & Marketing Management" },
    { label: "Who", text: "combines concept development, visual identity and digital strategy" },
  ],
};

/** Education, oldest first. Years left out until confirmed. */
export const education = [
  { short: "MYP", programme: "IB Middle Years Programme", school: "International School of Billund" },
  {
    short: "IB Diploma",
    programme: "IB Diploma Programme",
    school: "Aarhus Gymnasium",
    note: "back as a workshop host in 2026",
    href: "/#in-practice",
  },
  { short: "Design, Technology, and Business", programme: "Specialising in Branding & Marketing Management, now", school: "VIA Design & Business" },
];

/** Every job so far, read as a brand lesson. Oldest first. */
export const heritage = [
  {
    years: "2019–21",
    role: "Fashion model",
    company: "CC Models",
    lesson: "On-location shoots and commercial productions, working with photographers, stylists and production teams on visual brand storytelling.",
    note: "the other side of the camera",
  },
  {
    years: "2023",
    role: "Bartender",
    company: "Kupé",
    lesson: "Attentive service in a high-paced bar: multitasking, guest interaction and teamwork, with quality kept up under pressure.",
    note: "service, under pressure",
  },
  {
    years: "2024",
    role: "Telemarketing & customer service",
    company: "The Call Company",
    lesson: "Outbound sales and fundraising in a KPI-driven setting: persuasive communication, objection handling and relationship building.",
    note: "every call, a pitch",
  },
  {
    years: "2024–25",
    role: "Retail sales & store operations",
    company: "BEAUTYCOS",
    lesson: "Personalised guidance in beauty and haircare, and running the store day to day, from opening to inventory.",
    note: "beauty, up close",
  },
  {
    years: "2025",
    role: "Play Agent",
    company: "LEGO House",
    lesson: "Immersive brand experiences for a global audience, facilitating play in line with LEGO’s identity, and featured in LEGO House’s own social media.",
    note: "brand, but make it play",
  },
  {
    years: "2025–26",
    role: "Social media student assistant",
    company: "VIA Design & Business",
    lesson: "Instagram from idea to publishing: planning, editing, visual storytelling and 140,000+ organic views in 60 days.",
    note: "more in practice ↓",
    href: "/#in-practice",
  },
];

export const palette = [
  { name: "Paper", hex: "#FBFAF8", usage: "The page. Quiet, warm, never pure white." },
  { name: "Ink", hex: "#0A0A0A", usage: "Type, lines and the cursor. Almost black." },
  { name: "Blush", hex: "#F6D9E7", usage: "Highlights only: the colour of a marked-up keyword." },
];

export const typefaces = [
  { name: "Helvetica Neue, italic", role: "for saying things clearly", className: "italic tracking-[-0.03em]" },
  { name: "Botch", role: "for saying them loudly", className: "font-display lowercase" },
  { name: "Reenie Beanie", role: "for the notes in the margin", className: "font-script" },
];

/** Grounded in her own posts: the Levi’s exam reflection, the guest lecture and her About text. */
export const rules = {
  dos: [
    "Turn consumer insights into strategic decisions.",
    "Combine creativity and strategy. Always both.",
  ],
  donts: [
    "Post randomly. Content that connects has strategy, storytelling and purpose behind it.",
    "Leave it as theory. Translate it into something people can use.",
  ],
};

export const contact = {
  usage: "Best applied to beauty, fashion and lifestyle brands, where strategy, creativity and culture all meet.",
  linkedin: "https://www.linkedin.com/in/caroline-vind",
};

/*
 * A sample week, based on Caroline's colour-coded Google Calendar: same rhythm and colour logic,
 * with the activities renamed to the marketing work they stand for. Times rounded to the half hour.
 * Days: 0 = Monday … 6 = Sunday. Times are decimal hours (8.5 = 08:30).
 */
export const calendarCategories = [
  { id: "class", label: "Class", color: "#0A0A0A", text: "#FBFAF8" },
  { id: "strategy", label: "Strategy", color: "#5B4A42", text: "#FBFAF8" },
  { id: "content", label: "Content creation", color: "#D9DFC0", text: "#0A0A0A" },
  { id: "research", label: "Brand research", color: "#B59A8A", text: "#0A0A0A" },
  { id: "side", label: "Side projects", color: "transparent", text: "#0A0A0A", dashed: true },
  { id: "routine", label: "Routines", color: "#F6D9E7", text: "#0A0A0A" },
  { id: "reading", label: "Reading", color: "#EFE6C6", text: "#0A0A0A" },
  { id: "meta", label: "Planning the planning", color: "#E4E1DC", text: "#0A0A0A" },
] as const;

export type CalendarCategory = (typeof calendarCategories)[number]["id"];

export type CalendarEvent = { day: number; start: number; end: number; title: string; category: CalendarCategory };

const everyDay = (e: Omit<CalendarEvent, "day">) => [0, 1, 2, 3, 4, 5, 6].map((day) => ({ ...e, day }));

export const calendarWeek: CalendarEvent[] = [
  // Monday
  { day: 0, start: 8.5, end: 10, title: "Weekly planning & KPIs", category: "strategy" },
  { day: 0, start: 10.5, end: 11.5, title: "Competitor audit", category: "research" },
  { day: 0, start: 10, end: 10.5, title: "Plan the plan", category: "meta" },
  { day: 0, start: 11.5, end: 13.5, title: "Building this portfolio", category: "side" },
  { day: 0, start: 14, end: 16, title: "Consumer insight analysis", category: "strategy" },
  { day: 0, start: 16, end: 18, title: "Trend research (scroll TikTok for hours)", category: "research" },
  // Tuesday
  { day: 1, start: 8.5, end: 14.5, title: "Global Marketing & Branding", category: "class" },
  { day: 1, start: 15, end: 16.5, title: "Campaign moodboards", category: "content" },
  { day: 1, start: 17, end: 18, title: "Edit on CapCut", category: "content" },
  // Wednesday
  { day: 2, start: 9, end: 11, title: "Content shoot", category: "content" },
  { day: 2, start: 11.5, end: 13.5, title: "Campaign strategy", category: "strategy" },
  { day: 2, start: 14, end: 15.5, title: "Caption copywriting", category: "content" },
  { day: 2, start: 13.5, end: 14, title: "Reschedule Monday", category: "meta" },
  { day: 2, start: 16, end: 17, title: "Case study writing", category: "side" },
  // Thursday
  { day: 3, start: 8.5, end: 14.5, title: "Global Marketing & Branding", category: "class" },
  { day: 3, start: 15, end: 16.5, title: "Group work: synopsis", category: "strategy" },
  { day: 3, start: 16.5, end: 17, title: "Check calendar", category: "meta" },
  { day: 3, start: 19, end: 21, title: "LinkedIn-maxxing: post “What my morning coffee taught me about branding”", category: "content" },
  // Friday
  { day: 4, start: 8.5, end: 10, title: "Edit & schedule posts", category: "content" },
  { day: 4, start: 10.5, end: 11.5, title: "Analytics check-in", category: "strategy" },
  { day: 4, start: 12, end: 14.5, title: "Checking emails", category: "routine" },
  { day: 4, start: 15, end: 16, title: "Newsletter roundup", category: "reading" },
  { day: 4, start: 16.5, end: 17.5, title: "Make a to-do list for the to-do list", category: "meta" },
  // Saturday
  { day: 5, start: 10, end: 11, title: "Moodboard refresh", category: "routine" },
  { day: 5, start: 8.5, end: 9.5, title: "Schedule spontaneity", category: "meta" },
  { day: 5, start: 12, end: 14, title: "Practice Claude", category: "side" },
  { day: 5, start: 15, end: 16.5, title: "Brand deep dive", category: "research" },
  // Sunday
  { day: 6, start: 9, end: 10.5, title: "Plan next week’s content", category: "content" },
  { day: 6, start: 11, end: 12, title: "Branding podcast", category: "reading" },
  { day: 6, start: 12.5, end: 13.5, title: "Colour-code the calendar", category: "meta" },
  { day: 6, start: 19, end: 20.5, title: "Weekly reset (reschedule everything)", category: "routine" },
  // Every day
  ...everyDay({ start: 18, end: 18.5, title: "Dinner", category: "routine" }),
  // Weeknight reading, plus Sunday
  ...[0, 1, 2, 3, 6].map((day) => ({ day, start: 21, end: 21.5, title: "Marketing reads", category: "reading" as const })),
];

export const calendarNotes = {
  intro: "A sample week, based on my colour-coded Google Calendar. Every hour has a colour, and every colour has a job.",
  wake: "alarm: before 6, every day",
  margin: "yes, planning is in the calendar too",
};
