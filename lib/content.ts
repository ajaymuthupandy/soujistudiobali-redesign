export const BOOKING_URL = "https://bit.ly/souji-studio";

export const contact = {
  phone: "+62 818 031 866 621",
  phoneHref: "tel:+62818031866621",
  instagram: "https://www.instagram.com/soujiyogafitnessstudio/",
  instagramHandle: "@soujiyogafitnessstudio",
  facebook: "https://www.facebook.com/Souji-Studio-Bali-108424127699823/",
  parent: { name: "Nagisa Bali Group", url: "https://nagisabaligroup.com/" },
};

export const nav = [
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const classes = [
  {
    name: "Ashtanga Yoga",
    teacher: "Ari",
    day: "Mondays",
    image: "/images/class/ashtanga.webp",
  },
  {
    name: "Muay Thai",
    teacher: "Yohan",
    day: "Mondays",
    image: "/images/trainer/hendy.webp",
  },
  {
    name: "Mat Fusion Pilates",
    teacher: "Diah",
    day: "Thursdays",
    image: "/images/class/pilates.webp",
  },
];

export const instructors = [
  { name: "Widiswari", role: "Vinyasa Yoga", image: "/images/trainer/widiswari-yoga.jpg", ig: "https://www.instagram.com/baladevyoga/" },
  { name: "Azmi", role: "Hatha Yoga", image: "/images/trainer/azmi-yoga.jpg", ig: "https://www.instagram.com/azmiyoga/" },
  { name: "Novia", role: "Core Strengthening Yoga", image: "/images/trainer/novia-yoga.jpg", ig: "https://www.instagram.com/namaste_novia/" },
  { name: "Dewi", role: "Ashtanga Yoga", image: "/images/trainer/dewi-yoga.jpg", ig: "https://www.instagram.com/dewi__yoga/" },
  { name: "Dai San", role: "Shape Boxercise", image: "/images/trainer/dai-san-box.jpg", ig: "https://www.instagram.com/dai_fastingfitness/" },
  { name: "Rita Kertasasmita", role: "Kids Yoga", image: "/images/trainer/rita-yoga.jpg", ig: "https://www.instagram.com/rita.kertasasmita/" },
  { name: "Kenwiyo", role: "Yogalates", image: "/images/trainer/kenwiyo-yoga.jpg", ig: "https://www.instagram.com/kenwiyo/" },
  { name: "Hendy Pradana", role: "Muay Thai", image: "/images/trainer/hendy.webp", ig: "https://www.instagram.com/trainer_hendipradana/" },
];

/** `tbc` sessions are on the timetable but the studio has not published a start time yet. */
export type Session = { time: string; name: string; teacher: string; tbc?: boolean };

/** Day index follows JS getDay(): 0 = Sunday. Days without classes are left out. */
export const schedule: { day: string; short: string; index: number; sessions: Session[] }[] = [
  {
    day: "Monday",
    short: "Mon",
    index: 1,
    sessions: [
      { time: "17.00", name: "Ashtanga Yoga", teacher: "Ari" },
      { time: "TBC", name: "Muay Thai", teacher: "Yohan", tbc: true },
    ],
  },
  {
    day: "Tuesday",
    short: "Tue",
    index: 2,
    sessions: [
      { time: "17.00", name: "Body Stretching", teacher: "Kezia" },
      { time: "18.00", name: "Gentle / Restorative Yoga", teacher: "Novia" },
    ],
  },
  {
    day: "Thursday",
    short: "Thu",
    index: 4,
    sessions: [
      { time: "17.00", name: "Body Stretching", teacher: "Kezia" },
      { time: "18.00", name: "Core Strengthening Yoga", teacher: "Novia" },
      { time: "TBC", name: "Mat Fusion Pilates", teacher: "Diah", tbc: true },
    ],
  },
  { day: "Sunday", short: "Sun", index: 0, sessions: [{ time: "10.00", name: "Hatha Yoga", teacher: "Ari" }] },
];

export const DAILY_PRICE = 90;
export const MONTHLY_PRICE = 520;
export const MONTHLY_CLASSES = 10;
export const UNLIMITED_PRICE = 700;

export const plans = [
  {
    id: "daily",
    name: "Daily",
    price: DAILY_PRICE,
    period: "per class",
    perks: ["Drop in to any class", "Yoga mat provided", "Easy booking"],
  },
  {
    id: "monthly",
    name: "Monthly",
    price: MONTHLY_PRICE,
    period: "per month",
    perks: ["10 classes a month", "Every class on the schedule", "Yoga mat provided"],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: UNLIMITED_PRICE,
    period: "per month",
    perks: ["Unlimited classes for a month", "Every class on the schedule", "Yoga mat provided", "Cafe Michiko voucher + 15% off"],
  },
] as const;

export const prep = [
  { title: "What to wear", short: "Breathable, fitted clothes. Hair tied back.", icon: "/images/what-to-wear.png" },
  { title: "What to bring", short: "A water bottle. Mats are on us.", icon: "/images/what-to-bring.png" },
  { title: "When to arrive", short: "15 minutes early for a quick tour.", icon: "/images/when-to-arrive.png" },
  { title: "What to say", short: "Any injuries or sensitive areas.", icon: "/images/what-to-say.png" },
];
