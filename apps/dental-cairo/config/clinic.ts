/**
 * Single source of truth for Nile Smile Dental Studio content.
 *
 * NOTE: this is a design concept for a fictional clinic. Prices, phone
 * numbers, addresses and reviews are placeholder demo data.
 */

export const clinic = {
  name: "Nile Smile",
  fullName: "Nile Smile Dental Studio",
  tagline: "Modern dentistry in the heart of Cairo",
  description:
    "Digital dentistry, gentle care and fixed-in-EGP pricing across two studios in New Cairo and Sheikh Zayed.",
  emergencyLine: "+20 100 999 0000",
  whatsapp: "201000000000",
  email: "hello@nilesmile.eg",
  rating: 4.9,
  reviewCount: 1284,
  patients: 24_000,
  yearsOfPractice: 18,
  googleReviewsUrl: "https://www.google.com/maps",
} as const;

/** wa.me deep link for the clinic's WhatsApp line. */
export const waLink = (message: string) =>
  `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;

/** tel: link for any phone number shown on the site. */
export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const hours = {
  weekdays: "Saturday – Thursday · 10:00 – 22:00",
  friday: "Friday · 14:00 – 22:00",
  emergency: "Emergency line open 24/7",
} as const;

export type Branch = {
  slug: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  mapQuery: string;
  perks: string[];
  hours: { label: string; value: string }[];
};

export const branches: Branch[] = [
  {
    slug: "new-cairo",
    name: "New Cairo Studio",
    area: "Fifth Settlement · 90th Street",
    address: "12 El-Nasr Street, off 90th North, Fifth Settlement, New Cairo",
    phone: "+20 100 123 4567",
    mapQuery: "90th Street, Fifth Settlement, New Cairo, Egypt",
    perks: ["Free parking", "Wheelchair accessible", "Kids play corner"],
    hours: [
      { label: "Saturday – Thursday", value: "10:00 – 22:00" },
      { label: "Friday", value: "14:00 – 22:00" },
    ],
  },
  {
    slug: "sheikh-zayed",
    name: "Sheikh Zayed Studio",
    area: "Arkan Plaza",
    address: "Building 4, Ground Floor, Arkan Plaza, Sheikh Zayed City, Giza",
    phone: "+20 100 765 4321",
    mapQuery: "Arkan Plaza Sheikh Zayed City Egypt",
    perks: ["Valet parking", "Late evening slots", "Family rooms"],
    hours: [
      { label: "Saturday – Thursday", value: "11:00 – 21:00" },
      { label: "Friday", value: "15:00 – 21:00" },
    ],
  },
];

export const neighbourhoods = [
  "Fifth Settlement",
  "Sheikh Zayed",
  "Maadi",
  "Zamalek",
  "Heliopolis",
  "Nasr City",
  "6th of October",
  "Rehab",
  "Madinaty",
  "Downtown",
  "New Capital",
  "Dokki",
];

export type Treatment = {
  slug: string;
  title: string;
  description: string;
  priceFrom: number;
  duration: string;
  icon: string;
  featured?: boolean;
};

export const treatments: Treatment[] = [
  {
    slug: "implants",
    title: "Dental implants",
    description:
      "Single-tooth to full-arch implants placed with 3D guided surgery and a 10-year warranty.",
    priceFrom: 12_500,
    duration: "60 min visit · 3–4 months total",
    icon: "implant",
    featured: true,
  },
  {
    slug: "invisalign",
    title: "Clear aligners",
    description:
      "Invisalign Diamond provider — see your final smile on screen before you start.",
    priceFrom: 28_000,
    duration: "6–18 months",
    icon: "aligner",
    featured: true,
  },
  {
    slug: "veneers",
    title: "Veneers & smile design",
    description:
      "Digitally previewed porcelain veneers, hand-finished by our ceramist in Cairo.",
    priceFrom: 6_500,
    duration: "2 visits",
    icon: "veneer",
  },
  {
    slug: "whitening",
    title: "Whitening",
    description:
      "In-studio LED whitening up to 6 shades brighter, plus a take-home top-up kit.",
    priceFrom: 4_500,
    duration: "60 min",
    icon: "whitening",
  },
  {
    slug: "root-canal",
    title: "Root canal therapy",
    description:
      "Rotary endodontics under a surgical microscope — most cases finished in a single visit.",
    priceFrom: 3_500,
    duration: "60–90 min",
    icon: "endodontics",
    featured: true,
  },
  {
    slug: "zirconia",
    title: "Zirconia crowns",
    description:
      "Metal-free crowns and bridges milled in-house and fitted the same week.",
    priceFrom: 5_500,
    duration: "2 visits",
    icon: "crown",
  },
  {
    slug: "kids",
    title: "Kids' dentistry",
    description:
      "Tell–show–do paediatric care, fluoride, sealants and a play area they'll ask to visit.",
    priceFrom: 800,
    duration: "30 min",
    icon: "kids",
  },
  {
    slug: "emergency",
    title: "Same-day emergency",
    description:
      "Toothache, broken crown or a lost filling — call the emergency line and we'll fit you in today.",
    priceFrom: 900,
    duration: "Same day",
    icon: "emergency",
  },
];

export const technology = [
  {
    title: "3D CBCT imaging",
    description:
      "Low-dose scans that show nerves and bone before we touch a thing.",
  },
  {
    title: "Intraoral scanning",
    description: "No impression goo — a 90-second digital scan of your bite.",
  },
  {
    title: "Digital smile design",
    description: "Approve your new smile on screen before treatment starts.",
  },
  {
    title: "Surgical microscope",
    description: "Up to 25× magnification for gentler, more precise work.",
  },
  {
    title: "Dental laser",
    description: "Less bleeding and faster healing for gum procedures.",
  },
  {
    title: "Hospital-grade sterilisation",
    description:
      "Single-use kits and class-B autoclave cycles, tracked per patient.",
  },
];

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  focus: string;
  credentials: string;
  experience: string;
  languages: string;
  image: string;
};

export const doctors: Doctor[] = [
  {
    slug: "nour-el-sayed",
    name: "Dr. Nour El-Sayed",
    title: "Orthodontics & clear aligners",
    focus: "Invisalign, adult orthodontics",
    credentials: "MSc Orthodontics, Ain Shams University · Invisalign Diamond",
    experience: "14 years",
    languages: "Arabic · English · French",
    image: "/images/doctor-1.jpg",
  },
  {
    slug: "karim-fathy",
    name: "Dr. Karim Fathy",
    title: "Implantology & oral surgery",
    focus: "Guided implants, bone grafting",
    credentials: "PhD Oral Implantology, Cairo University · ITI member",
    experience: "19 years",
    languages: "Arabic · English · German",
    image: "/images/doctor-2.jpg",
  },
  {
    slug: "yasmine-adel",
    name: "Dr. Yasmine Adel",
    title: "Paediatric & preventive dentistry",
    focus: "Kids' dentistry, anxiety-free care",
    credentials: "MSc Paediatric Dentistry, Alexandria University",
    experience: "9 years",
    languages: "Arabic · English",
    image: "/images/doctor-3.jpg",
  },
];

export type Package = {
  name: string;
  price: number;
  cadence: string;
  blurb: string;
  includes: string[];
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: "Clean & Check",
    price: 1_200,
    cadence: "per visit",
    blurb: "The 45-minute reset most patients book twice a year.",
    includes: [
      "Full examination & X-rays",
      "Ultrasonic scaling and polish",
      "Fluoride treatment",
      "Personal care plan",
    ],
  },
  {
    name: "Smile Makeover",
    price: 4_500,
    cadence: "per month · 12 months",
    blurb:
      "Veneers or aligners with digital preview, 0% bank instalments available.",
    includes: [
      "3D scan & digital smile design",
      "Alignment or 8 veneers",
      "In-studio whitening",
      "Retainers & 2 years of follow-ups",
    ],
    featured: true,
  },
  {
    name: "Family Care",
    price: 3_600,
    cadence: "per year",
    blurb: "Two adults and up to three children, all preventive care covered.",
    includes: [
      "Two cleanings each per year",
      "Free emergency visits",
      "15% off all treatments",
      "Priority evening slots",
    ],
  },
];

export const processSteps = [
  {
    title: "Book in 60 seconds",
    description:
      "WhatsApp, call or use the form — we confirm your slot the same day.",
  },
  {
    title: "Diagnosis, not guesswork",
    description:
      "3D scan and photos. We show you exactly what is happening in your mouth.",
  },
  {
    title: "Fixed plan in EGP",
    description:
      "One written plan with every price and instalment option before we start.",
  },
  {
    title: "Gentle treatment",
    description:
      "Painless anaesthesia, single-visit treatments where possible, and breaks whenever you need them.",
  },
  {
    title: "Follow-up & warranty",
    description:
      "12-month implant warranty and free check-ups after major treatment.",
  },
];

export type Testimonial = {
  name: string;
  area: string;
  treatment: string;
  quote: string;
  image: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ahmed Mostafa",
    area: "New Cairo",
    treatment: "Clear aligners",
    quote:
      "I'd been putting off fixing my teeth for years because of the drive and the waiting. Fourteen months later my aligners are done and I never once had an appointment start late.",
    image: "/images/patient-1.jpg",
    rating: 5,
  },
  {
    name: "Salma Hosny",
    area: "Maadi",
    treatment: "Veneers",
    quote:
      "They showed me a digital preview before touching anything, so there were no surprises. The ceramist matched my other teeth perfectly. Worth every pound.",
    image: "/images/patient-2.jpg",
    rating: 5,
  },
  {
    name: "Omar Farouk",
    area: "Sheikh Zayed",
    treatment: "Implant",
    quote:
      "Two implants, zero pain, and the whole thing was finished on schedule at the price I signed for. Dr. Karim explains everything before he does it.",
    image: "/images/patient-3.jpg",
    rating: 5,
  },
  {
    name: "Mariam Kamel",
    area: "Nasr City",
    treatment: "Kids' dentistry",
    quote:
      "My son used to scream in the car on the way to the dentist. Now he asks when we're going back. The kids' area and Dr. Yasmine make all the difference.",
    image: "/images/patient-4.jpg",
    rating: 5,
  },
  {
    name: "Nada Sherif",
    area: "Zamalek",
    treatment: "Whitening",
    quote:
      "Booked at 9pm and was out by 10:15 — the late hours are a lifesaver if you work in the city. My teeth held the shade for months.",
    image: "/images/patient-2.jpg",
    rating: 5,
  },
  {
    name: "Youssef Ibrahim",
    area: "Heliopolis",
    treatment: "Emergency root canal",
    quote:
      "Called the emergency line at 2am with a swollen face. Seen at 9am, root canal done the same morning. I can't describe the relief.",
    image: "/images/patient-1.jpg",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How much does a visit cost, and do you show prices upfront?",
    answer:
      "First consultations with a full examination and X-rays are 300 EGP, credited back against any treatment you start. Every plan is written down with fixed EGP prices before treatment begins, and prices are locked for six months.",
  },
  {
    question: "Do you accept insurance and instalments?",
    answer:
      "We are direct-billing partners with MetLife, Allianz, AXA, Bupa, Cigna, Globemed, Nextcare and Mednet, so you usually only pay your co-pay at the desk. We also offer 0% instalments up to 12 months through Valu, Sympl, Contact and Meeza, plus most Egyptian banks.",
  },
  {
    question: "Is treatment painful? I'm quite anxious about dentists.",
    answer:
      "Most patients tell us the anaesthetic injection is the only part they feel, so we use topical gel, buffered anaesthesia and a vibration device to make it barely noticeable. For very anxious patients we offer nitrous oxide sedation, and you can raise a hand to pause at any moment.",
  },
  {
    question: "How long does Invisalign take?",
    answer:
      "Simple crowding cases finish in 6–9 months, more complex bite corrections take 14–18 months. After your 3D scan we simulate the full result, so you see the number of aligners and the finish date before you commit.",
  },
  {
    question: "Can I get treated the same day if I'm in pain?",
    answer:
      "Yes. Call the 24/7 emergency line and we hold same-day slots at both studios for toothache, swelling, broken teeth or lost crowns. If your case needs a specialist, we route you to the on-call doctor that day.",
  },
  {
    question: "When should my child first see a dentist?",
    answer:
      "By their first birthday, or within six months of the first tooth. The first visit is a friendly 'tell–show–do' appointment with no treatment, so your child gets comfortable with the chair, the sounds and the team.",
  },
  {
    question: "Is there parking and is the studio accessible?",
    answer:
      "New Cairo has free on-site parking and a wheelchair-accessible entrance with lift access to the third floor. Arkan Plaza has valet parking and step-free access from the ground floor.",
  },
];

export const insurers = [
  "MetLife",
  "Allianz",
  "AXA",
  "Bupa",
  "Cigna",
  "Globemed",
  "Nextcare",
  "Mednet",
  "Misr Insurance",
  "Amlak",
];

export const instalmentPartners = ["Valu", "Sympl", "Contact", "Meeza", "CIB", "NBE"];
