export type MenuCategoryId = "mezze" | "grill" | "cafe" | "shisha"

export interface MenuItem {
  name: string
  description: string
  price: number
  tag?: "signature" | "vegetarian" | "vegan" | "spicy" | "seasonal"
}

export interface MenuCategory {
  id: MenuCategoryId
  label: string
  kicker: string
  headline: string
  blurb: string
  image: string
  imageAlt: string
  note: string
  items: MenuItem[]
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "mezze",
    label: "Mezze & Cold",
    kicker: "01 — The table",
    headline: "Plates made for sharing",
    blurb:
      "Everything begins with a table full of small plates. Our mezze is prepared each morning — chickpeas soaked overnight, aubergines charred over open flame, herbs picked the same day.",
    image: "/calypso/mezze-spread.webp",
    imageAlt:
      "Overhead view of a mezze spread with hummus, baba ghanoush, vine leaves, falafel and baladi bread on a terracotta table",
    note: "Baladi bread is baked twice a day and served warm. Ask for a refill — it is on the house.",
    items: [
      {
        name: "Hummus Beiruti",
        description:
          "Chickpeas, tahini, cumin, green chilli, olive oil, warm baladi bread",
        price: 95,
        tag: "vegan",
      },
      {
        name: "Baba Ghanoush",
        description:
          "Aubergine charred over charcoal, pomegranate molasses, mint, sesame",
        price: 105,
        tag: "vegan",
      },
      {
        name: "Warak Enab",
        description:
          "Vine leaves rolled with rice, parsley, dill and lemon — served cold",
        price: 115,
        tag: "vegetarian",
      },
      {
        name: "Tahini & Tomato",
        description: "Whipped tahini, vine tomatoes, red onion, sumac",
        price: 85,
        tag: "vegan",
      },
      {
        name: "Falafel Basket",
        description: "Sesame-crusted falafel, tahini sauce, pickled turnip",
        price: 90,
      },
      {
        name: "The Calypso Board",
        description:
          "Five mezze, two dips, olives, pickles and a basket of baladi bread",
        price: 260,
        tag: "signature",
      },
    ],
  },
  {
    id: "grill",
    label: "From the Grill",
    kicker: "02 — The fire",
    headline: "Charcoal, salt, patience",
    blurb:
      "Our grill is lit at four in the afternoon and burns until the last table leaves. Nothing is rushed: the kofta is hand-minced, the chicken marinated for twelve hours, the lamb cut to order.",
    image: "/calypso/grill-platter.webp",
    imageAlt:
      "Charcoal-grilled kofta, chicken skewers and lamb chops on a hammered brass platter",
    note: "Every grill plate arrives with vermicelli rice, grilled tomato and our house garlic sauce.",
    items: [
      {
        name: "Mixed Grill for Two",
        description: "Kofta, shish tawook, lamb chops, grilled vegetables",
        price: 480,
        tag: "signature",
      },
      {
        name: "Kofta Kebab",
        description: "Hand-minced beef, parsley, onion, smoked chilli",
        price: 260,
        tag: "spicy",
      },
      {
        name: "Shish Tawook",
        description: "Yoghurt-marinated chicken, garlic cream, grilled pepper",
        price: 240,
      },
      {
        name: "Lamb Chops",
        description: "Salt-crusted, charcoal-seared, rosemary butter",
        price: 420,
      },
      {
        name: "Sayadiya Sea Bass",
        description: "Whole grilled sea bass, spiced rice, tahini, lemon",
        price: 390,
        tag: "seasonal",
      },
      {
        name: "Hawawshi",
        description: "Spiced beef baked in baladi pastry, pickles, tahina",
        price: 150,
      },
    ],
  },
  {
    id: "cafe",
    label: "Café & Sweets",
    kicker: "03 — The ark",
    headline: "Coffee, mint and something sweet",
    blurb:
      "Turkish coffee ground to order, mint lemonade pressed to order, and desserts we refuse to cut corners on. This is the ritual that keeps our regulars coming back four times a week.",
    image: "/calypso/coffee-ritual.webp",
    imageAlt:
      "Small cups of Turkish coffee on a brass tray with dates and fresh mint",
    note: "Liquid desserts are for later. Our om ali is baked fresh at 16:00 and again at 21:00.",
    items: [
      {
        name: "Turkish Coffee",
        description:
          "Ground to order, plain, medium or sweet — single or double",
        price: 55,
        tag: "signature",
      },
      {
        name: "Spanish Latte",
        description: "Double espresso, condensed milk, sea salt",
        price: 85,
      },
      {
        name: "Mint Lemonade",
        description: "Fresh limes, mint leaves, crushed ice",
        price: 70,
        tag: "vegan",
      },
      {
        name: "Karkade",
        description: "Hibiscus infusion, served hot or iced",
        price: 60,
        tag: "vegan",
      },
      {
        name: "Sahlab",
        description: "Milk thickened with orchid root, cinnamon, pistachio",
        price: 75,
      },
      {
        name: "Om Ali",
        description: "Layered pastry, milk, nuts — baked to order",
        price: 95,
        tag: "signature",
      },
      {
        name: "Basbousa",
        description: "Semolina cake, honey syrup, pistachio, cream",
        price: 85,
      },
    ],
  },
  {
    id: "shisha",
    label: "Shisha & Drinks",
    kicker: "04 — The terrace",
    headline: "Smoke, breeze, a long evening",
    blurb:
      "Our terrace was designed around the shisha, not the other way around: wide railings, sea-crossing breeze and low lights. Fruit heads are prepared fresh for every session.",
    image: "/calypso/shisha-night.webp",
    imageAlt:
      "Ornate brass hookah on a Cairo terrace at night with warm string lights",
    note: "Shisha is served on the terrace and rooftop only. Tobacco service starts at 14:00.",
    items: [
      {
        name: "Double Apple",
        description: "The classic — anise, apple, cool finish",
        price: 130,
        tag: "signature",
      },
      {
        name: "Grape & Mint",
        description: "Red grape, fresh mint, light sweetness",
        price: 130,
      },
      {
        name: "Lemon & Mint",
        description: "Citrus, mint, a clean and bright session",
        price: 130,
      },
      {
        name: "Calypso House Blend",
        description: "Mango, guava and a whisper of cardamom",
        price: 160,
        tag: "signature",
      },
      {
        name: "Fresh Mango Juice",
        description: "Seasonal, pressed to order",
        price: 80,
        tag: "seasonal",
      },
      {
        name: "Hibiscus Tonic",
        description: "Karkade, tonic, lime, rosemary",
        price: 90,
      },
    ],
  },
]

export interface Experience {
  id: string
  eyebrow: string
  title: string
  time: string
  description: string
  image: string
  imageAlt: string
  detail: string
}

export const EXPERIENCES: Experience[] = [
  {
    id: "sunset",
    eyebrow: "Daily · 17:30 — 19:00",
    title: "Sunset sessions",
    time: "Golden hour",
    description:
      "The terrace faces west. For ninety minutes the light turns amber, the breeze picks up and the whole room goes quiet without anyone asking it to.",
    image: "/calypso/hero-terrace.webp",
    imageAlt:
      "Rattan chairs and brass tables on a terrace overlooking the Nile at sunset",
    detail: "Cold mezze, mint lemonade, no music until the sun is gone.",
  },
  {
    id: "oud",
    eyebrow: "Thursday — Saturday · 20:30",
    title: "Live oud nights",
    time: "After dark",
    description:
      "A single oud, a percussionist and a rotating guest singer. We keep it low enough to talk over and good enough to stop talking.",
    image: "/calypso/entrance-night.webp",
    imageAlt:
      "Warmly lit arched entrance of the café with bougainvillea at blue hour",
    detail: "Reservations recommended for terrace tables after 20:00.",
  },
  {
    id: "shisha",
    eyebrow: "Daily · 14:00 — closing",
    title: "The shisha ritual",
    time: "All evening",
    description:
      "Brass heads, fruit bowls, natural charcoal and a team that knows when to change the coals without being asked twice.",
    image: "/calypso/shisha-night.webp",
    imageAlt: "Ornate hookah glowing on a rooftop terrace at night",
    detail: "Terrace and rooftop only. House blends start at 130 EGP.",
  },
]

export interface GalleryShot {
  src: string
  alt: string
  caption: string
  meta: string
  span: string
  width: number
  height: number
}

export const GALLERY: GalleryShot[] = [
  {
    src: "/calypso/grill-platter.webp",
    alt: "Charcoal-grilled kofta, chicken skewers and lamb chops on a brass platter",
    caption: "Charcoal, 900°",
    meta: "From 16:00 daily",
    span: "col-span-2 row-span-2",
    width: 1408,
    height: 768,
  },
  {
    src: "/calypso/interior-arches.webp",
    alt: "Limewash arches, rattan lamps and terracotta floors inside the café",
    caption: "Limewash & linen",
    meta: "Indoor salon",
    span: "",
    width: 1408,
    height: 768,
  },
  {
    src: "/calypso/mezze-spread.webp",
    alt: "Mezze spread with hummus, falafel and baladi bread",
    caption: "Mezze for the table",
    meta: "Morning prep",
    span: "",
    width: 1408,
    height: 768,
  },
  {
    src: "/calypso/coffee-ritual.webp",
    alt: "Turkish coffee served on a brass tray with dates",
    caption: "Ark of coffee",
    meta: "Ground to order",
    span: "",
    width: 1408,
    height: 768,
  },
  {
    src: "/calypso/dessert-tea.webp",
    alt: "Basbousa with pistachio and a glass of mint tea",
    caption: "Something sweet",
    meta: "Baked at 16:00",
    span: "",
    width: 1408,
    height: 768,
  },
]

export interface Testimonial {
  quote: string
  name: string
  meta: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We came for coffee and stayed for the grill. Four hours later the staff were still bringing mint tea and never once made us feel we should leave.",
    name: "Nour H.",
    meta: "Regular since opening",
  },
  {
    quote:
      "The terrace at sunset is the closest thing to a holiday you can have on a Tuesday in Cairo. Book the corner table if you can.",
    name: "Mariam & Adel",
    meta: "Anniversary dinner",
  },
  {
    quote:
      "Best shisha in the area, and the only place I bring guests from abroad — the mezze does the talking for me.",
    name: "Youssef S.",
    meta: "Google review",
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: "Do I need a reservation?",
    answer:
      "Walk-ins are always welcome for the indoor salon. Terrace and rooftop tables are best reserved, especially Thursday to Saturday after 20:00. We hold reserved tables for 20 minutes.",
  },
  {
    question: "Where exactly are you?",
    answer:
      "We are on the Chill Out El Kafrawi Axis in Cairo, a short drive from Maadi and Zahraa El Maadi. Valet parking is available every evening from 18:00.",
  },
  {
    question: "Is shisha served everywhere?",
    answer:
      "Shisha is served on the terrace and rooftop only, starting at 14:00. The indoor salon is kept smoke-free so families and working guests always have a quiet corner.",
  },
  {
    question: "Can you host a group or a private evening?",
    answer:
      "Yes. The rooftop seats up to 40 guests for private events, and we regularly host birthdays, engagements and company dinners. Call us and we will build a set menu around your group.",
  },
  {
    question: "Do you have vegetarian and vegan options?",
    answer:
      "Plenty. Most of our mezze is vegan by design, and the kitchen can adapt the majority of the grill and café menu. Tell your server and we will take care of it.",
  },
]

export const HOURS = [
  { day: "Sunday — Wednesday", time: "09:00 — 01:00" },
  { day: "Thursday — Saturday", time: "09:00 — 02:00" },
  { day: "Kitchen last orders", time: "One hour before closing" },
]

export const CONTACT = {
  phoneDisplay: "+20 10 0268 3835",
  phoneHref: "tel:+201002683835",
  whatsappHref: "https://wa.me/201002683835",
  email: "calypsocafeegypt@gmail.com",
  emailHref: "mailto:calypsocafeegypt@gmail.com",
  address: "Chill Out El Kafrawi Axis, Cairo, Egypt",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Calypso+Cafe+El+Kafrawi+Axis+Cairo",
  instagramHref: "https://www.instagram.com/calypso.egypt/",
  facebookHref: "https://www.facebook.com/Calypso.egypt/",
}

export const NAV_LINKS = [
  { href: "#house", label: "The house" },
  { href: "#menu", label: "Menu" },
  { href: "#evenings", label: "Evenings" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Visit" },
]

export const AREAS = ["Terrace", "Indoor salon", "Rooftop"] as const
export type SeatingArea = (typeof AREAS)[number]

export const TIME_SLOTS = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
]
