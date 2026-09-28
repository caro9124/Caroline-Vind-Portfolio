// The CV, redrawn in the portfolio's identity. Content comes from Caroline's English CV (the one
// linked from her Readymag portfolio), updated with her newer Danish CV, LinkedIn and this site.
// The home address is deliberately left out, because this page and its PDF are public.

export const cv = {
  title: "Creative Branding & Marketing student",
  portrait: { src: "/images/cv/portrait-face.jpg", width: 270, height: 350 },
  pdf: "/files/Caroline-Vind-CV.pdf",
  profile: [
    "Branding & Marketing student with a strong interest in brand storytelling, social media strategy, e-commerce and creative campaign development.",
    "Experienced in developing social media concepts, assisting content production and contributing to visual identity and brand storytelling. I thrive where creativity and strategy meet, and work independently, with an eye for detail.",
  ],
  experience: [
    {
      role: "Social Media Student Assistant",
      org: "VIA Design & Business",
      dates: "Dec 2025 – Jun 2026",
      points: [
        "Developed creative content concepts supporting brand storytelling",
        "Planned and produced short-form video content",
        "Contributed to the school’s visual identity and social media content direction",
        "140,000+ organic views in 60 days",
      ],
    },
    {
      role: "Play Agent",
      org: "LEGO House",
      dates: "Mar 2025 – Aug 2025",
      points: [
        "Engaged international visitors through interactive brand experiences",
        "Communicated the LEGO brand universe through storytelling and activities",
        "Developed strong communication and audience engagement skills",
      ],
    },
    {
      role: "Sales Assistant & Store Operations",
      org: "BEAUTYCOS",
      dates: "Dec 2024 – Mar 2025",
      points: [
        "Delivered customer service in a fast-paced retail environment",
        "Supported product promotion and customer engagement",
        "Assisted with visual merchandising and in-store campaign displays",
      ],
    },
  ],
  earlier: [
    "Telemarketing & Customer Service, The Call Company (2024)",
    "Bartender, Kupé (2023)",
    "Fashion Model, CC Models (2019–2021)",
  ],
  inPractice: [
    "Guest lecturer, “To SoMe or not to SoMe?!”, VIA (2026)",
    "Workshop host for Aarhus Gymnasium’s International HF class (2026)",
    "Volunteer, Baum und Pferdgarten, Copenhagen Fashion Week (2026)",
    "Model & content capture, VIA Graduate Show ’25",
  ],
  education: [
    {
      org: "VIA Design & Business",
      dates: "Sep 2025 – present",
      lines: ["PBA in Design, Technology & Business (English)", "Specialisation: Branding & Marketing Management"],
    },
    { org: "Aarhus Gymnasium", dates: "Aug 2021 – May 2023", lines: ["International Baccalaureate Diploma Programme"] },
    { org: "International School of Billund", dates: "", lines: ["IB Middle Years Programme"] },
  ],
  skills: [
    "Brand storytelling",
    "Social media strategy",
    "Content creation",
    "Concept development",
    "Campaign ideation",
    "Trend research",
    "Editing",
    "Adobe",
  ],
  certificates: [{ name: "Elements of AI", issuer: "University of Helsinki", year: "2026" }],
  languages: [
    { name: "Danish", level: 5 },
    { name: "English", level: 5 },
  ],
};
