# Aya Marhaba — Hair Mist Website

A cinematic, single-page site for the Aya Marhaba Hair Mist line (Rose, Oud,
Fruity, Vanilla). Pure HTML/CSS/JS — no build step, no backend, no framework.

## How to view it

Open `index.html` directly in a browser, or for the smoothest experience
(recommended, since some browsers restrict local file access) serve the
folder locally:

```bash
cd aya-marhaba
python3 -m http.server 8000
# then open http://localhost:8000
```

## How to edit things — everything lives in two files

### 1. Prices, discounts, descriptions, notes → `js/data/products.js`

This is the **only** place you should ever need to touch for product info.
Every price, discount, tagline, mood description and fragrance note shown
anywhere on the site — hero, story sections, the interactive switcher, the
notes diagram, and the shop section — is pulled live from this one file.

To change Rose's price from $20 to $22 and its discount from 15% to 25%:

```js
rose: {
  ...
  price: 10,      // ← change this
  discount: 0,   // ← and this
  ...
}
```

Refresh the page. Every place the price appears updates automatically —
you never need to hunt through the HTML.

### 2. Gallery photos → `js/data/gallery.js`

To add a new gallery photo later:

1. Drop the image file into `images/gallery/`
2. Add one line to the array in `js/data/gallery.js`:

```js
{
  src: "images/gallery/my-new-photo.jpg",
  caption: "Short caption shown on hover",
  size: "small"   // "large" | "wide" | "small" — controls the grid shape
}
```

The masonry grid and the lightbox both pick it up automatically.

## About the product images

The four bottle photos you supplied are real product photography (not
AI-generated). For the story sections, switcher, shop panel and final CTA,
the bottles have been cleanly cut out from their original photography
(background removed) so they can be placed on the site's own atmospheric
backgrounds — the bottle itself, its label, cap and liquid color are
untouched. The original uncropped photos are also used as-is for the
gallery and the "Make it yours" lifestyle section.

If you get more real campaign or lifestyle photography later (e.g. a photo
of someone actually applying the mist to their hair), just add it to
`images/gallery/` and register it in `gallery.js` as above — or swap the
image referenced in the `.lifestyle-media img` tag in `index.html` for a
more dedicated lifestyle shot once you have one.

## File structure

```
index.html              → all page markup/sections
css/styles.css           → all styling, design tokens, animations
js/data/products.js      → ⭐ edit prices/copy here
js/data/gallery.js       → ⭐ add gallery photos here
js/main.js               → hero animation, particles, scroll reveal,
                            scent switcher logic, gallery lightbox
images/products/          → original + cut-out bottle photos
images/gallery/           → gallery photos
```

## Notes on the build

- No backend, no database, no server-side code — 100% static, so it can be
  hosted anywhere (Netlify, Vercel, GitHub Pages, S3, or your own server)
  by uploading the folder as-is.
- The "Add to Cart" button is a placeholder that shows a confirmation
  animation — it does not yet connect to a real payment/cart system. When
  you're ready to sell, this button is the one spot to wire up to your
  ecommerce backend of choice (Shopify Buy Button, Stripe Checkout, etc.).
- Respects `prefers-reduced-motion` — anyone with that OS setting enabled
  sees the finished layout instantly, no animation.
