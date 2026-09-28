// "In practice": experiences outside the project work where the skills got used for real.
// Every fact below comes from Caroline's own LinkedIn (experience, volunteering and posts).
// Nothing is invented; where LinkedIn doesn't say something (e.g. the graduate designer's name),
// it is simply left out.

export type PracticeImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position when the photo is cropped. */
  focus?: string;
};

/** Each entry is laid out differently, so the archive doesn't read as a list of identical cards. */
export type PracticeLayout = "metric" | "editorial" | "feature" | "type" | "candid";

export type PracticeEntry = {
  slug: string;
  year: string;
  /** Month shown beside the year, when LinkedIn gives one. */
  when?: string;
  title: string;
  organisation: string;
  role: string;
  description: string;
  /** Short handwritten aside: her own words from LinkedIn, or a plain label. */
  note?: string;
  layout: PracticeLayout;
  images: PracticeImage[];
  /** Photo credit, shown small under the images. */
  credit?: string;
  /** Points to the related Work project instead of repeating it here. */
  link?: { label: string; href: string };
  /** A short silent film, played in a loop while on screen. */
  video?: { src: string; poster: string; width: number; height: number; label: string; caption?: string };
  /** A single figure to set large (the "metric" layout). */
  figure?: { value: string; label: string };
};

const dir = "/images/practice";

export const practiceIntro = "Some things I’ve learned by doing.";

export const practice: PracticeEntry[] = [
  {
    slug: "via-social-media",
    year: "2025",
    when: "Dec 2025 – May 2026",
    title: "Telling VIA’s story",
    organisation: "VIA Design & Business",
    role: "Student assistant, social media (part-time)",
    description:
      "For six months I ran the Design & Business Instagram profile, from idea development and planning to editing and publishing. Covering events like Open House meant capturing moments, conversations and atmosphere, and it gave me more than content. It gave me perspective: seeing VIA both as a student and as part of shaping the story we tell.",
    note: "grateful for the trust and the responsibility",
    layout: "metric",
    figure: { value: "140,000+", label: "organic views in 60 days" },
    images: [],
    link: { label: "See the work", href: "/work/via-design-and-business" },
  },
  {
    slug: "graduate-show",
    year: "2025",
    when: "December",
    title: "Graduate Show ’25",
    organisation: "VIA Design & Business · HEART museum",
    role: "Model & content capture",
    description:
      "I modelled for one of the graduating designers and helped capture content for VIA Design & Business’ social media during the show. Being behind the scenes, from the final preparations to seeing the collection come alive on the runway, reminded me why I enjoy working with fashion, visuals and creative projects.",
    layout: "editorial",
    credit: "Photos: Alissa Leonie Lang",
    images: [
      {
        src: `${dir}/gradshow-01.jpg`,
        alt: "Caroline seated in a sheer tulle gown from the graduate collection",
        width: 800,
        height: 1066,
      },
      {
        src: `${dir}/gradshow-03.jpg`,
        alt: "Backstage styling before the show",
        width: 800,
        height: 1066,
      },
      {
        src: `${dir}/gradshow-05.jpg`,
        alt: "Three models in looks from the collection",
        width: 800,
        height: 1074,
      },
    ],
    video: {
      src: "/videos/gradshow-reel.mp4",
      poster: `${dir}/gradshow-reel-poster.jpg`,
      width: 1080,
      height: 1920,
      label: "A short film from VIA Herning Fashion Show ’25: backstage, a thank-you note and the finale walk",
    },
  },
  {
    slug: "cph-fashion-week",
    year: "2026",
    when: "January",
    title: "Copenhagen Fashion Week",
    organisation: "Baum und Pferdgarten",
    role: "Volunteer, pre-show setup",
    description:
      "I volunteered with pre-show setup and practical tasks for Baum und Pferdgarten during Copenhagen Fashion Week, helping prepare the venue: carrying, setting up and getting everything in place before the first guest takes a seat. I also made a short film of the week for VIA Design & Business’ Instagram.",
    note: "before the doors open",
    layout: "feature",
    images: [
      {
        src: `${dir}/cphfw-runway-group.jpg`,
        alt: "Four people standing on the runway under the lighting rig before the show",
        width: 1200,
        height: 1600,
      },
      {
        src: `${dir}/cphfw-runway-carpet.jpg`,
        alt: "The runway carpet with Baum und Pferdgarten printed along its edge",
        width: 1200,
        height: 1600,
      },
      {
        src: `${dir}/cphfw-boxes-colour.jpg`,
        alt: "Baum und Pferdgarten boxes and bags waiting backstage",
        width: 1200,
        height: 1600,
      },
    ],
    video: {
      src: "/videos/cphfw-reel.mp4",
      poster: `${dir}/cphfw-reel-poster.jpg`,
      width: 720,
      height: 1184,
      label: "A short film from Copenhagen Fashion Week, made for VIA Design & Business’ Instagram: runway shows, details and clothing rails",
      caption: "Filmed & edited for VIA Design & Business’ Instagram",
    },
  },
  {
    slug: "guest-lecture",
    year: "2026",
    when: "May",
    title: "To SoMe or not to SoMe?!",
    organisation: "VIA Design & Business",
    role: "Guest speaker",
    description:
      "Professor Anatolie Cantir invited me to give a guest lecture on social media, storytelling and content strategy. Usually I’m the one in the classroom listening; this time the roles were reversed. We talked about why social media is so much more than randomly posting videos, tools for planning and structuring content, how AI can support the creative process, and our value propositions as young Branding & Marketing students.",
    note: "the chocolate was appreciated",
    layout: "type",
    images: [
      {
        src: `${dir}/lecture-02-schedule.jpg`,
        alt: "The day’s schedule: 8.20 – 9.40, guest speaker Caroline Markvad Vind, To SoMe or not to SoMe?!",
        width: 800,
        height: 163,
      },
      {
        src: `${dir}/lecture-01.jpg`,
        alt: "The classroom during the guest lecture, slides on the screen",
        width: 800,
        height: 1067,
      },
      {
        src: `${dir}/lecture-03-chocolate.jpg`,
        alt: "Chocolate brought along for the class",
        width: 800,
        height: 1067,
      },
    ],
  },
  {
    slug: "gymnasium-workshop",
    year: "2026",
    when: "September",
    title: "A taste of VIA",
    organisation: "Aarhus Gymnasium Tilst (AARHUS TECH) × VIA Design & Business",
    role: "Co-host & workshop facilitator, with Polina Filippova",
    description:
      "I welcomed the International HF class from Aarhus Gymnasium Tilst, where I did my IB Diploma Programme, to VIA Design & Business. We showed them around campus and ran a creative branding & marketing workshop to give them a taste of what we do at VIA. It was a fun day, and really nice to represent VIA and share the creative work we get to do as Design & Business students.",
    note: "my old school, visiting",
    layout: "candid",
    images: [
      {
        src: `${dir}/workshop-01.jpg`,
        alt: "Caroline beside a “Welcome to VIA” slide",
        width: 800,
        height: 1067,
      },
      {
        src: `${dir}/workshop-02.jpg`,
        alt: "Students working together at tables during the workshop",
        width: 800,
        height: 600,
      },
      {
        src: `${dir}/workshop-04.jpg`,
        alt: "The presentation room at VIA Design & Business",
        width: 800,
        height: 1067,
      },
      {
        src: `${dir}/workshop-05.jpg`,
        alt: "Students at work during the workshop",
        width: 800,
        height: 600,
      },
    ],
  },
];
