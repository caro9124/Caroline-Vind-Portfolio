/*
 * Project images and films, taken from Caroline's Readymag project pages and shown on each project page.
 * Reorder, remove or add entries freely. Films live in /public/videos with a poster frame beside them.
 */

export type GalleryItem =
  | { type: "image"; src: string; width: number; height: number; alt: string }
  | {
      type: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
      alt: string;
      /** Optional display crop (width / height), centred, e.g. to trim black bars baked into a film. */
      crop?: number;
    };

export const galleries: Record<string, GalleryItem[]> = {
  "sunday-syndrome": [
    { type: "image", src: "/images/projects/sunday-syndrome/01-hero-campaign-visual-there-is-no.webp", width: 1400, height: 933, alt: "Hero campaign visual: “There is no cure. Only comfort.”" },
    { type: "image", src: "/images/projects/sunday-syndrome/02-billboard-mock-up.webp", width: 1400, height: 1070, alt: "Billboard mock-up" },
    { type: "image", src: "/images/projects/sunday-syndrome/03-campaign-poster-in-a-subway-car.webp", width: 1400, height: 1050, alt: "Campaign poster in a subway car" },
    { type: "image", src: "/images/projects/sunday-syndrome/04-campaign-posters-in-situ.webp", width: 1400, height: 937, alt: "Campaign posters in situ" },
    { type: "image", src: "/images/projects/sunday-syndrome/05-poster-variations.webp", width: 1400, height: 788, alt: "Poster variations" },
    { type: "image", src: "/images/projects/sunday-syndrome/06-logo-marks-on-blue.webp", width: 1400, height: 788, alt: "Logo marks on blue" },
    { type: "image", src: "/images/projects/sunday-syndrome/07-star-logo-marks.webp", width: 1400, height: 788, alt: "Star logo marks" },
    { type: "image", src: "/images/projects/sunday-syndrome/08-secondary-colour-palette-graphic.webp", width: 1400, height: 788, alt: "Secondary colour palette graphic" },
    { type: "image", src: "/images/projects/sunday-syndrome/09-moodboard.webp", width: 1400, height: 788, alt: "Moodboard" },
    { type: "image", src: "/images/projects/sunday-syndrome/10-app-screens-on-phones.webp", width: 1400, height: 1051, alt: "App screens on phones" },
    { type: "image", src: "/images/projects/sunday-syndrome/11-digital-screen-activation.webp", width: 1400, height: 788, alt: "Digital screen activation" },
    { type: "image", src: "/images/projects/sunday-syndrome/12-pr-package-sunday-syndrome-diagnosis-kit.webp", width: 1400, height: 788, alt: "PR package: Sunday Syndrome diagnosis kit" },
  ],
  "lululemon-x-the-ordinary": [
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/01-lululemon-x-the-ordinary-pop-up.webp", width: 1400, height: 2123, alt: "Lululemon x The Ordinary pop-up space" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/02-bottle-with-charms-in-a-bathroom.webp", width: 1400, height: 2076, alt: "Bottle with charms in a bathroom setting" },
    { type: "video", src: "/videos/lululemon-bottle.mp4", poster: "/videos/lululemon-bottle.jpg", width: 480, height: 720, alt: "Short film of the bottle with its lip balm charm" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/03-three-lip-balm-charms.webp", width: 1400, height: 2100, alt: "Three lip balm charms" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/04-strawberry-lip-balm-charm.webp", width: 1400, height: 2100, alt: "Strawberry lip balm charm" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/05-pink-lip-balm-charm.webp", width: 1400, height: 2100, alt: "Pink lip balm charm" },
    { type: "video", src: "/videos/lululemon-charm.mp4", poster: "/videos/lululemon-charm.jpg", width: 480, height: 720, alt: "360° view of the lip balm charm" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/06-charms-displayed-on-plinths.webp", width: 1400, height: 863, alt: "Charms displayed on plinths" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/07-gift-box-with-bottle-and-charms.webp", width: 1400, height: 1969, alt: "Gift box with bottle and charms" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/08-lululemon-x-the-ordinary-collage.webp", width: 1400, height: 790, alt: "Lululemon x The Ordinary collage" },
    { type: "image", src: "/images/projects/lululemon-x-the-ordinary/09-context-slide.webp", width: 1400, height: 817, alt: "Context slide" },
  ],
  "via-design-and-business": [
    { type: "image", src: "/images/projects/via-design-and-business/01-via-design-business-instagram-profile-on.webp", width: 1400, height: 881, alt: "VIA Design & Business Instagram profile on a phone" },
    { type: "image", src: "/images/projects/via-design-and-business/02-instagram-insights-87-873-views.webp", width: 1400, height: 1663, alt: "Instagram insights: 87,873 views" },
    { type: "image", src: "/images/projects/via-design-and-business/03-instagram-insights-104-241-views.webp", width: 1400, height: 1693, alt: "Instagram insights: 104,241 views" },
    { type: "image", src: "/images/projects/via-design-and-business/04-instagram-audience-insights.webp", width: 1400, height: 2136, alt: "Instagram audience insights" },
  ],
  "editorial-concept": [
    // Readymag order. Picture 01 opens the page as its cover; the flat pages are in the reader below.
    { type: "image", src: "/images/projects/editorial-concept/02-magazine-cover-ss-26-issue-no.webp", width: 1400, height: 1921, alt: "Magazine cover, SS-26 Issue No. 1, on black" },
    { type: "image", src: "/images/projects/editorial-concept/03-spread-with-a-large-quotation-mark.webp", width: 1400, height: 1064, alt: "Spread with a large quotation mark" },
    { type: "image", src: "/images/projects/editorial-concept/04-spread-with-red-frame-and-photographs.webp", width: 1400, height: 945, alt: "Spread with red frame and photographs" },
    { type: "image", src: "/images/projects/editorial-concept/05-spread-with-red-ink-detail.webp", width: 1400, height: 969, alt: "Spread with red ink detail" },
  ],
  "the-improved-bag": [
    { type: "image", src: "/images/projects/the-improved-bag/01-the-bag-on-a-cafe-stool.webp", width: 1400, height: 1237, alt: "The bag on a café stool" },
    { type: "image", src: "/images/projects/the-improved-bag/02-bag-interior-with-organiser.webp", width: 1400, height: 1256, alt: "Bag interior with organiser" },
    { type: "video", src: "/videos/improved-bag.mp4", poster: "/videos/improved-bag.jpg", width: 1280, height: 720, alt: "3D film of the new bag design", crop: 680 / 720 },
    { type: "image", src: "/images/projects/the-improved-bag/03-documentation-of-user-driven-research.webp", width: 1400, height: 791, alt: "Documentation of user-driven research" },
    { type: "image", src: "/images/projects/the-improved-bag/04-target-group-board.webp", width: 1400, height: 789, alt: "Target group board" },
    { type: "image", src: "/images/projects/the-improved-bag/05-function-board.webp", width: 1400, height: 789, alt: "Function board" },
    { type: "image", src: "/images/projects/the-improved-bag/06-lifestyle-board.webp", width: 1400, height: 789, alt: "Lifestyle board" },
    { type: "image", src: "/images/projects/the-improved-bag/07-product-board.webp", width: 1400, height: 789, alt: "Product board" },
    { type: "image", src: "/images/projects/the-improved-bag/08-the-new-design-sketches.webp", width: 1400, height: 789, alt: "The new design: sketches" },
    { type: "image", src: "/images/projects/the-improved-bag/09-the-new-design.webp", width: 1400, height: 789, alt: "The new design" },
  ],
  "organic-pinterest-growth": [
    { type: "image", src: "/images/projects/organic-pinterest-growth/01-pinterest-profile.webp", width: 1400, height: 853, alt: "Pinterest profile" },
    { type: "image", src: "/images/projects/organic-pinterest-growth/02-pinterest-performance-chart.webp", width: 1400, height: 514, alt: "Pinterest performance chart" },
    { type: "image", src: "/images/projects/organic-pinterest-growth/03-top-pins-overview.webp", width: 1400, height: 471, alt: "Top pins overview" },
  ],
};

/** A flip-through magazine: shown after the gallery, one spread at a time with arrows. */
export type ReaderPage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** A single page (like the front cover), shown on the right like a closed magazine. */
  single?: boolean;
};

export const readers: Record<string, ReaderPage[]> = {
  // Exported from the InDesign file: the front cover (one A4 page) and three A4 spreads.
  "editorial-concept": [
    { src: "/images/projects/editorial-concept/reader/01-front-cover-ss26.jpg", width: 595, height: 842, alt: "Front cover: SS-26, Issue No. 1", single: true },
    { src: "/images/projects/editorial-concept/reader/02-spread-raw-elegance.jpg", width: 1191, height: 842, alt: "Raw elegance" },
    { src: "/images/projects/editorial-concept/reader/03-spread-rouge-reverie.jpg", width: 1191, height: 842, alt: "Rouge Reverie" },
    { src: "/images/projects/editorial-concept/reader/04-spread-leave-your-mark.jpg", width: 1191, height: 842, alt: "Leave your mark. Luxury whispers, chaos roars" },
  ],
};
