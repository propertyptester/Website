const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const FACE = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2.5&w=200&h=200&q=80`;

export const COMPANY = {
  name: "Property Perfect",
  tagline: "Build. Maintain. Renew.",
  promise: "One call, one crew, property handled.",
  phone: "(402) 606-7011",
  phoneHref: "tel:+14026067011",
  email: "admin@propertyperfect.net",
  area: "Serving all of Florida",
  hours: "Mon–Sat · 7am–6pm",
};

export const IMG = {
  hero: U("photo-1688064776733-c163870305f2", 1600),
  palmDrive: U("photo-1734381077421-01a348085a4c"),
  sunset: U("photo-1605723517503-3cadb5818a0c"),
  tree1: U("photo-1626828476637-5bd713ef9f22"),
  tree2: U("photo-1754322449185-31f56117ed87"),
  pool: U("photo-1583468381700-d035630deed6"),
  commercial: U("photo-1644864544377-da82b8cf3703"),
  crew: U("photo-1586207943161-821db30f42f1"),
  concrete1: U("photo-1685464196387-854858ce0f4f"),
  concrete2: U("photo-1673978483810-ad14e573eece"),
  land1: U("photo-1779636489744-76eb81c44925"),
  land2: U("photo-1759496607068-f2892afdaf23"),
  garden1: U("photo-1599685315640-9ceab2f58148"),
  garden2: U("photo-1730660338791-8d63548efc75"),
  house1: U("photo-1560170412-0f7df0eb0fb1"),
  community: U("photo-1648299825830-195cca1f8acd"),
  storm: U("photo-1786295866836-2949bbd847cd"),
  av1: FACE("photo-1762708546645-65ee9ccedfae"),
  av2: FACE("photo-1659481993364-4512775ed911"),
  av3: FACE("photo-1762709412730-321a0d81b517"),
  av4: FACE("photo-1758599543111-36ce5c34fceb"),
};

export const SERVICES = [
  {
    slug: "tree-removal-trimming",
    name: "Tree Removal & Trimming",
    icon: "TreePine",
    chip: "coral",
    tagline: "Safe, clean, storm-ready canopies.",
    image: IMG.tree1,
    desc: "From hazardous pines to overgrown palms, our certified crews remove, trim and shape trees the safe way — protecting your roofs, lines, tenants and curb appeal, then leaving the site cleaner than we found it.",
    includes: [
      "Hazardous & dead tree removal",
      "Canopy raising & trimming",
      "Palm pruning & skinning",
      "Stump grinding & root clearance",
      "Storm-damage response",
      "Full debris haul-away",
    ],
  },
  {
    slug: "hoa-work-orders",
    name: "HOA Work Orders",
    icon: "ClipboardList",
    chip: "teal",
    tagline: "Board-ready work orders, closed out fast.",
    image: IMG.pool,
    desc: "We speak fluent HOA. Violation cures, common-area upkeep and recurring community schedules — every work order photo-documented and closed out fast, with reporting your board will actually enjoy reading.",
    includes: [
      "Violation cure & compliance fixes",
      "Common-area upkeep",
      "Turnkey vendor coordination",
      "Photo documentation on every order",
      "Fast board reporting",
      "Recurring community schedules",
    ],
  },
  {
    slug: "concrete",
    name: "Concrete",
    icon: "Shovel",
    chip: "coral",
    tagline: "Flat work that stays flat.",
    image: IMG.concrete1,
    desc: "Driveways, sidewalks, slabs and pads — poured, finished and sealed to handle Florida sun, storms and sprinklers. Clean forms, honest curing, and a site reset when we're done.",
    includes: [
      "Driveways, sidewalks & slabs",
      "Pavers & edging",
      "Curbing & aprons",
      "Pads for HVAC & sheds",
      "Crack & spall repair",
      "Cleanup & site reset",
    ],
  },
  {
    slug: "property-maintenance-repairs",
    name: "Property Maintenance & Repairs",
    icon: "Wrench",
    chip: "mint",
    tagline: "The fix-it list, finished.",
    image: IMG.crew,
    desc: "One crew for the punch list that never ends. Interior and exterior repairs, preventive walkthroughs and pressure washing — handled on a schedule or on demand, always with photo proof of completion.",
    includes: [
      "Interior & exterior handyman repairs",
      "Drywall, paint & caulk",
      "Door, lock & hardware fixes",
      "Irrigation checks & minor plumbing",
      "Pressure washing",
      "Preventive walkthroughs",
    ],
  },
  {
    slug: "cleanup-landscaping",
    name: "Cleanup & Landscaping",
    icon: "Leaf",
    chip: "teal",
    tagline: "Curb appeal that makes boards smile.",
    image: IMG.land1,
    desc: "Recurring grounds care and one-time deep cleanups that keep Florida properties lush: mowing, edging, beds, hedges, sod — and the debris gone before we pull out of the gate.",
    includes: [
      "Mowing, edging & blowing",
      "Bed weeding & re-mulching",
      "Hedge & shrub shaping",
      "Sod & seasonal planting",
      "Leaf & debris removal",
      "One-time deep cleanups",
    ],
  },
  {
    slug: "general-property-improvements",
    name: "General Property Improvements",
    icon: "Hammer",
    chip: "coral",
    tagline: "Upgrades that raise the value.",
    image: IMG.garden1,
    desc: "Beyond maintenance: fences, hardscape, exterior refreshes and the small construction projects that make a property worth more — quoted clearly, built properly, guaranteed in writing.",
    includes: [
      "Fence repair & installation",
      "Small hardscape projects",
      "Exterior refreshes & painting",
      "Mailbox, sign & light fixtures",
      "Pergolas & shade features",
      "Seasonal décor installs",
    ],
  },
];

export const EXTRA_SERVICES = [
  { slug: "pressure-washing", name: "Pressure Washing", icon: "Droplets", chip: "teal", line: "Driveways, sidewalks, walls & roofs restored." },
  { slug: "storm-prep-cleanup", name: "Storm Prep & Debris Cleanup", icon: "CloudLightning", chip: "coral", line: "Hurricane-season readiness, fast." },
  { slug: "mulch-sod-planting", name: "Mulch, Sod & Planting", icon: "Sprout", chip: "mint", line: "Fresh beds and instant curb appeal." },
  { slug: "gutter-exterior-cleaning", name: "Gutter & Exterior Cleaning", icon: "Sparkles", chip: "teal", line: "Clear gutters, brighter exteriors." },
  { slug: "painting-drywall", name: "Painting & Drywall", icon: "PaintBucket", chip: "mint", line: "Clean finishes, inside and out." },
  { slug: "junk-debris-haulaway", name: "Junk & Debris Haul-Away", icon: "Truck", chip: "coral", line: "Clutter gone, hauled today." },
];

export const ALL_SERVICES = [...SERVICES, ...EXTRA_SERVICES];

export const CUSTOMER_TYPES = [
  {
    slug: "property-managers",
    name: "Property Managers",
    icon: "Building2",
    chip: "coral",
    copy: "Portfolio coverage without the vendor chase. One crew for every trade, one invoice, photo-documented close-outs.",
  },
  {
    slug: "hoas-boards",
    name: "HOAs & Community Boards",
    icon: "Users",
    chip: "teal",
    copy: "Board-ready work orders, violation cures, and common-area care that keeps residents proud of where they live.",
  },
  {
    slug: "commercial-owners",
    name: "Commercial Property Owners",
    icon: "Landmark",
    chip: "mint",
    copy: "Stores, offices and plazas kept sharp and safe — from parking lots and concrete to canopies and grounds.",
  },
  {
    slug: "homeowners",
    name: "Homeowners",
    icon: "Home",
    chip: "coral",
    copy: "From the fix-it list to the backyard dream — one trusted, insured crew for everything around your home.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Jason R.",
    role: "Property Manager",
    city: "Orlando, FL",
    avatar: IMG.av1,
    quote: "Property Perfect transformed our rental property. Professional, reliable, and easy to work with!",
  },
  {
    name: "Melissa T.",
    role: "Homeowner",
    city: "Tampa, FL",
    avatar: IMG.av2,
    quote: "Our home has never looked better. The team is friendly, detail-oriented, and truly cares.",
  },
  {
    name: "Carlos M.",
    role: "Commercial Property Owner",
    city: "Miami, FL",
    avatar: IMG.av3,
    quote: "Dependable service and excellent communication. I highly recommend Property Perfect.",
  },
  {
    name: "Dana K.",
    role: "HOA Board Member",
    city: "St. Petersburg, FL",
    avatar: IMG.av4,
    quote: "They close out our HOA work orders fast — with photos. Our board finally has a vendor it can trust.",
  },
  {
    name: "Priya S.",
    role: "Homeowner",
    city: "Sarasota, FL",
    initials: "PS",
    quote: "One call and the crew handled the tree, the concrete and the cleanup. That's how it should work.",
  },
  {
    name: "Marcus W.",
    role: "Property Manager",
    city: "Jacksonville, FL",
    initials: "MW",
    quote: "Every work order comes back documented and done right. The communication alone is worth it.",
  },
];

export const PROJECTS = [
  { title: "Palm-lined driveway refresh", category: "Landscaping", image: IMG.palmDrive },
  { title: "Hazardous tree takedown", category: "Tree Work", image: IMG.tree1 },
  { title: "Community pool-area cleanup", category: "HOA", image: IMG.pool },
  { title: "New concrete walkway", category: "Concrete", image: IMG.concrete2 },
  { title: "Tropical garden bed redesign", category: "Landscaping", image: IMG.garden2 },
  { title: "Hurricane prep & roofline seal", category: "Maintenance", image: IMG.storm },
  { title: "Commercial grounds care", category: "Commercial", image: IMG.commercial },
  { title: "Canopy trim over structure", category: "Tree Work", image: IMG.tree2 },
  { title: "Full-property spring cleanup", category: "Landscaping", image: IMG.land2 },
];

export const CITIES = [
  "Orlando",
  "Tampa",
  "Miami",
  "Jacksonville",
  "Fort Lauderdale",
  "St. Petersburg",
  "Sarasota",
  "Naples",
  "Palm Beach",
  "Ocala",
];
