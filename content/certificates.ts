// Courses and certificates, newest first. To add one, copy an entry and fill it in;
// the page numbers, sorts and lays them out automatically.

export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  /** Shown as written, e.g. "May 2026". */
  issued: string;
  /** Used for ordering: YYYY-MM. */
  date: string;
  description: string;
  skills: string[];
  /** Link where the certificate can be checked. */
  credentialUrl?: string;
  /** Optional scan or export of the certificate itself (otherwise a typeset slip is drawn). */
  image?: { src: string; width: number; height: number };
};

export const certificates: Certificate[] = [
  {
    slug: "elements-of-ai",
    title: "Elements of AI",
    issuer: "University of Helsinki",
    issued: "May 2026",
    date: "2026-05",
    description:
      "An online course on the fundamentals of artificial intelligence and how it applies to digital workflows, strategy and problem-solving.",
    skills: ["Artificial intelligence", "AI tools", "Prompt engineering"],
    credentialUrl: "https://certificates.mooc.fi/validate/dgyaqf9e7",
  },
];

export const certificatesNote = "more on the way";
