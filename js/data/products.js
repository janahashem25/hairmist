/**
 * ============================================================
 * AYA MARHABA — CATALOG (categories + every product)
 * ============================================================
 * This is the ONLY place categories and product info are edited.
 * Every product belongs to exactly one category ("hair" or "body").
 * Every price, discount, description and note shown anywhere
 * on the site is pulled from this file at runtime.
 *
 * To change a price or discount, edit the numbers below and
 * refresh the page — nothing else needs to change.
 * ============================================================
 */

window.PRODUCTS = {
  rose: {
    key: "rose",
    category: "hair",
    volume: "50 ml",
    photo: "images/products/rose.jpg",
    name: "Rose",
    tagline: "Romantic · Elegant · Soft",
    mood: "A soft bloom of Damask rose and pink peony, brushed over silk‑smooth hair. Rose is the quiet confidence of getting ready slowly.",
    price: 10,
    discount: 0,
    currency: "$",
    image: "images/products/rose_cutout.png",
    thumb: "images/products/rose.jpg",
    notes: {
      top: "Pink Peony, Dewy Petals",
      heart: "Damask Rose, Muguet",
      base: "White Musk, Soft Amber"
    },
    accent: "#e8a9b8",
    accentDeep: "#7a2e3a",
    tint: "#2a1418",
    glyph: "rose"
  },
  oud: {
    key: "oud",
    category: "hair",
    volume: "50 ml",
    photo: "images/products/oud.jpg",
    name: "Oud",
    tagline: "Deep · Warm · Luxurious",
    mood: "Aged oudh wood and warm resin, wrapped in amber smoke. Oud is for the days you want to be remembered after you've left the room.",
    price: 10,
    discount: 0,
    currency: "$",
    image: "images/products/oud_cutout.png",
    thumb: "images/products/oud.jpg",
    notes: {
      top: "Saffron, Warm Spice",
      heart: "Oudh Wood, Amber Resin",
      base: "Sandalwood, Dark Musk"
    },
    accent: "#c99257",
    accentDeep: "#5a3a1a",
    tint: "#1b140f",
    glyph: "oud"
  },
  fruity: {
    key: "fruity",
    category: "hair",
    volume: "50 ml",
    photo: "images/products/fruity.jpg",
    name: "Fruity",
    tagline: "Fresh · Juicy · Playful",
    mood: "Sun‑ripened orange, kiwi and wild berries splashed across freshly washed hair. Fruity is the scent of an open window in early summer.",
    price: 10,
    discount: 0,
    currency: "$",
    image: "images/products/fruity_cutout.png",
    thumb: "images/products/fruity.jpg",
    notes: {
      top: "Orange Zest, Kiwi",
      heart: "Wild Berries, Nectarine",
      base: "Soft Musk, Blonde Woods"
    },
    accent: "#c7d66b",
    accentDeep: "#5c6b28",
    tint: "#1b1d12",
    glyph: "fruity"
  },
  vanilla: {
    key: "vanilla",
    category: "hair",
    volume: "50 ml",
    photo: "images/products/vanilla.jpg",
    name: "Vanilla",
    tagline: "Creamy · Sweet · Addictive",
    mood: "Whipped vanilla pod and warm silk protein, settling like a cashmere throw. Vanilla is comfort you can wear out the door.",
    price: 10,
    discount: 0,
    currency: "$",
    image: "images/products/vanilla_cutout.png",
    thumb: "images/products/vanilla.jpg",
    notes: {
      top: "Milk Petals, Warm Sugar",
      heart: "Vanilla Orchid, Tonka",
      base: "Golden Amber, Silk Musk"
    },
    accent: "#e3b96e",
    accentDeep: "#8c5a2b",
    tint: "#241a10",
    glyph: "vanilla"
  },
  /* ---------------- BODY MIST ---------------- */
  body_rose: {
    key: "body_rose",
    category: "body",
    volume: "150 ml",
    name: "Rosé",
    tagline: "Romantic · Blooming · Soft",
    mood: "Dewy pink roses and a whisper of baby's breath, settled on soft, hydrated skin.",
    price: 15,
    discount: 0,
    currency: "$",
    photo: "images/bodymist/rose.jpg",
    accent: "#e8a9b8"
  },
  body_fruity: {
    key: "body_fruity",
    category: "body",
    volume: "150 ml",
    name: "Fruity",
    tagline: "Fresh · Juicy · Playful",
    mood: "Orange, kiwi and wild berries with a cool touch of mint — sunshine in a bottle.",
    price: 15,
    discount: 0,
    currency: "$",
    photo: "images/bodymist/fruity.jpg",
    accent: "#a8d86b"
  },
  body_marshmallow: {
    key: "body_marshmallow",
    category: "body",
    volume: "150 ml",
    name: "Marshmallow",
    tagline: "Sweet · Cloudy · Cozy",
    mood: "Soft, sugary marshmallow with clean musk — like wrapping yourself in a fresh white towel.",
    price: 15,
    discount: 0,
    currency: "$",
    photo: "images/bodymist/marshmallow.jpg",
    accent: "#8ec5e8"
  },
  body_vanilla: {
    key: "body_vanilla",
    category: "body",
    volume: "150 ml",
    name: "Vanilla",
    tagline: "Creamy · Warm · Addictive",
    mood: "Vanilla orchid and pods, golden and creamy — comfort you can wear all day.",
    price: 15,
    discount: 0,
    currency: "$",
    photo: "images/bodymist/vanilla.jpg",
    accent: "#e3b96e"
  }
};


/* ------------------------------------------------------------
   CATEGORIES — single source of truth. Order here = order shown
   in the shop tabs and the navigation. "all" is a virtual view.
   ------------------------------------------------------------ */
window.CATEGORIES = [
  { key: "all",  label: "All Products", blurb: "Every Aya Marhaba scent — two collections, one signature." },
  { key: "hair", label: "Hair Mist",    blurb: "A fine mist of fragrance and care for your hair — alcohol‑free, with Vitamin E and silk protein. 50 ml." },
  { key: "body", label: "Body Mist",    blurb: "Long‑lasting fragrance for soft, hydrated skin. 150 ml." }
];

// Display order of products (grouped by category, hair first)
window.PRODUCT_ORDER = [
  "rose", "oud", "fruity", "vanilla",
  "body_rose", "body_fruity", "body_marshmallow", "body_vanilla"
];

// Products for a category key ("all" returns everything)
window.getProductsByCategory = function (cat) {
  return window.PRODUCT_ORDER.filter(function (k) {
    return cat === "all" || window.PRODUCTS[k].category === cat;
  });
};
window.getCategoryLabel = function (cat) {
  var c = window.CATEGORIES.filter(function (x) { return x.key === cat; })[0];
  return c ? c.label : cat;
};

// Shared facts, printed on every bottle — used in Benefits section
window.BRAND_FACTS = {
  brand: "Aya Marhaba",
  line: "Hair Mist",
  volume: "50 ml",
  enrichedWith: ["Vitamin E", "Silk Protein", "UV Protection"],
  claims: ["Alcohol‑Free", "For All Hair Types", "Adds Shine & Freshness", "Long‑Lasting Fragrance"]
};

// Helper — always compute price this way, never hardcode a final price.
window.getFinalPrice = function (key) {
  const p = window.PRODUCTS[key];
  const final = p.price * (1 - p.discount / 100);
  return Math.round(final * 100) / 100;
};
