/**
 * ============================================================
 * AYA MARHABA â€” PRODUCT DATA
 * ============================================================
 * This is the ONLY place product info should be edited.
 * Every price, discount, description and note shown anywhere
 * on the site is pulled from this file at runtime.
 *
 * To change a price or discount, edit the numbers below and
 * refresh the page â€” nothing else needs to change.
 * ============================================================
 */

window.PRODUCTS = {
  rose: {
    key: "rose",
    name: "Rose",
    tagline: "Romantic Â· Elegant Â· Soft",
    mood: "A soft bloom of Damask rose and pink peony, brushed over silkâ€‘smooth hair. Rose is the quiet confidence of getting ready slowly.",
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
    name: "Oud",
    tagline: "Deep Â· Warm Â· Luxurious",
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
    name: "Fruity",
    tagline: "Fresh Â· Juicy Â· Playful",
    mood: "Sunâ€‘ripened orange, kiwi and wild berries splashed across freshly washed hair. Fruity is the scent of an open window in early summer.",
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
    name: "Vanilla",
    tagline: "Creamy Â· Sweet Â· Addictive",
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
  }
};

window.PRODUCT_ORDER = ["rose", "oud", "fruity", "vanilla"];

// Shared facts, printed on every bottle â€” used in Benefits section
window.BRAND_FACTS = {
  brand: "Aya Marhaba",
  line: "Hair Mist",
  volume: "50 ml",
  enrichedWith: ["Vitamin E", "Silk Protein", "UV Protection"],
  claims: ["Alcoholâ€‘Free", "For All Hair Types", "Adds Shine & Freshness", "Longâ€‘Lasting Fragrance"]
};

// Helper â€” always compute price this way, never hardcode a final price.
window.getFinalPrice = function (key) {
  const p = window.PRODUCTS[key];
  const final = p.price * (1 - p.discount / 100);
  return Math.round(final * 100) / 100;
};
