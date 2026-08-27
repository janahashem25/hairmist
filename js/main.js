/* ================================================================
   AYA MARHABA — MAIN SCRIPT
   All product/gallery data comes from js/data/*.js (loaded before
   this file). Nothing here hardcodes a price, discount or name.
   ================================================================ */
(function () {
  "use strict";

  const PRODUCTS = window.PRODUCTS;
  const ORDER = window.PRODUCT_ORDER;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const GLYPH_EMOJI = { rose: "🌹", oud: "🌿", fruity: "🍓", vanilla: "🍦" };

  function money(n, currency) {
    return currency + n.toFixed(n % 1 === 0 ? 0 : 2);
  }

  /* ---------------------------------------------------------------
     LOADER
  --------------------------------------------------------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader.classList.add("hidden"), 400);
    startHeroSequence();
  });

  /* ---------------------------------------------------------------
     HERO — flower opens, bottle rises, copy + nav reveal
  --------------------------------------------------------------- */
  function startHeroSequence() {
    const flower = document.getElementById("hero-flower");
    const flowerMist = document.getElementById("flower-mist");
    const copy = document.getElementById("hero-copy");
    const nav = document.getElementById("site-nav");

    if (prefersReducedMotion) {
      flower.classList.add("open");
      flowerMist.classList.add("active");
      copy.classList.add("reveal");
      nav.classList.add("visible");
      return;
    }

    // 1. closed flower slowly opens
    setTimeout(() => flower.classList.add("open"), 500);
    // 2. as petals open, soft mist puffs from the flower and drifts
    setTimeout(() => {
      flowerMist.classList.add("active");
      spawnDriftParticles(document.getElementById("hero-drift"), 16);
    }, 1000);
    // 3. brand name + headline settle in
    setTimeout(() => copy.classList.add("reveal"), 1900);
    // 4. nav appears last
    setTimeout(() => nav.classList.add("visible"), 2500);
  }

  function spawnDriftParticles(container, count) {
    if (!container || prefersReducedMotion) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "drift-particle";
      const size = 3 + Math.random() * 6;
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = (14 + Math.random() * 14) + "%";
      el.style.top = (30 + Math.random() * 40) + "%";
      el.style.setProperty("--travel", (36 + Math.random() * 14) + "vw");
      el.style.setProperty("--sway", (Math.random() * 40 - 20) + "px");
      el.style.setProperty("--pmax", (0.3 + Math.random() * 0.35).toFixed(2));
      const dur = 7 + Math.random() * 6;
      el.style.animationDuration = dur + "s";
      el.style.animationDelay = (Math.random() * 2) + "s";
      container.appendChild(el);
    }
  }

  /* ---------------------------------------------------------------
     PARTICLES — reusable ambient particle field
  --------------------------------------------------------------- */
  function spawnParticles(container, count, opts) {
    if (!container || prefersReducedMotion) return;
    opts = opts || {};
    const color = opts.color || "rgba(227,195,171,0.9)";
    const minSize = opts.minSize || 3;
    const maxSize = opts.maxSize || 7;
    const minDur = opts.minDur || 8;
    const maxDur = opts.maxDur || 16;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "particle";
      const size = minSize + Math.random() * (maxSize - minSize);
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = Math.random() * 100 + "%";
      el.style.top = 20 + Math.random() * 70 + "%";
      el.style.background = `radial-gradient(circle, ${color}, transparent 70%)`;
      el.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
      el.style.setProperty("--pmax", (0.4 + Math.random() * 0.5).toFixed(2));
      const dur = minDur + Math.random() * (maxDur - minDur);
      el.style.animationDuration = dur + "s";
      el.style.animationDelay = (-Math.random() * dur) + "s";
      container.appendChild(el);
    }
  }

  spawnParticles(document.getElementById("hero-particles"), 26, {
    color: "rgba(227,195,171,0.9)", minSize: 2, maxSize: 6
  });

  const storyParticleColors = {
    rose: "rgba(232,169,184,0.85)",
    oud: "rgba(201,146,87,0.75)",
    fruity: "rgba(199,214,107,0.85)",
    vanilla: "rgba(227,185,110,0.85)"
  };
  document.querySelectorAll(".scent-story").forEach((section) => {
    const scent = section.dataset.scent;
    spawnParticles(section.querySelector(".story-particles"), 14, {
      color: storyParticleColors[scent], minSize: 3, maxSize: 8, minDur: 10, maxDur: 20
    });
  });

  spawnParticles(document.querySelector(".final-particles"), 20, {
    color: "rgba(227,195,171,0.7)", minSize: 2, maxSize: 6
  });

  /* ---------------------------------------------------------------
     NAV — sticky/blur on scroll + mobile burger
  --------------------------------------------------------------- */
  const nav = document.getElementById("site-nav");
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  const burger = document.getElementById("nav-burger");
  const mobileMenu = document.getElementById("nav-mobile");
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------------------------------------------------------------
     SCROLL REVEAL
  --------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll("[data-reveal], .benefit-item, .gallery-item");
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------
     PARALLAX — lightweight transform-only scroll parallax
  --------------------------------------------------------------- */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!prefersReducedMotion && parallaxEls.length) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const factor = parseFloat(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translateY(${(-centerOffset * factor).toFixed(1)}px)`;
      });
      ticking = false;
    };
    document.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------------------------------------------------------------
     RENDER: scent story sections (mood / notes / price)
  --------------------------------------------------------------- */
  ORDER.forEach((key) => {
    const p = PRODUCTS[key];
    const section = document.getElementById("story-" + key);
    if (!section) return;
    section.style.setProperty("--accent", p.accent);
    section.style.setProperty("--accent-deep", p.accentDeep);
    section.style.setProperty("--tint", p.tint);

    section.querySelector(".story-mood").textContent = p.mood;
    const notesEl = section.querySelector(".story-notes");
    notesEl.innerHTML = "";
    [p.notes.top, p.notes.heart, p.notes.base].forEach((n) => {
      const li = document.createElement("li");
      li.textContent = n;
      notesEl.appendChild(li);
    });

    const finalPrice = window.getFinalPrice(key);
    const priceEl = section.querySelector(".story-price");
    priceEl.innerHTML = p.discount > 0
      ? `${money(finalPrice, p.currency)}<span class="was">${money(p.price, p.currency)}</span><span class="off">-${p.discount}%</span>`
      : money(finalPrice, p.currency);
  });

  /* ---------------------------------------------------------------
     RENDER: intro glyphs
  --------------------------------------------------------------- */
  const introGlyphs = document.getElementById("intro-glyphs");
  ORDER.forEach((key) => {
    const p = PRODUCTS[key];
    const a = document.createElement("a");
    a.href = "#story-" + key;
    a.className = "intro-glyph";
    a.innerHTML = `<span class="intro-glyph-icon">${GLYPH_EMOJI[key]}</span>${p.name}`;
    introGlyphs.appendChild(a);
  });

  /* ---------------------------------------------------------------
     SHARED SELECTED-SCENT STATE (drives switcher + notes + shop)
  --------------------------------------------------------------- */
  let selectedScent = "rose";
  const listeners = [];
  function onScentChange(fn) { listeners.push(fn); }
  function setScent(key) {
    selectedScent = key;
    listeners.forEach((fn) => fn(PRODUCTS[key]));
  }

  /* ---------------------------------------------------------------
     BUILD TABS (shared by switcher + shop)
  --------------------------------------------------------------- */
  function buildTabs(container) {
    container.innerHTML = "";
    ORDER.forEach((key) => {
      const p = PRODUCTS[key];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "scent-tab";
      btn.dataset.scent = key;
      btn.setAttribute("role", "tab");
      btn.innerHTML = `<span class="dot"></span>${GLYPH_EMOJI[key]} ${p.name}`;
      btn.addEventListener("click", () => setScent(key));
      container.appendChild(btn);
    });
  }
  const switcherTabs = document.getElementById("switcher-tabs");
  const shopTabs = document.getElementById("shop-tabs");
  buildTabs(switcherTabs);
  buildTabs(shopTabs);

  function syncTabs(container, key) {
    Array.from(container.children).forEach((btn) => {
      const active = btn.dataset.scent === key;
      btn.classList.toggle("active", active);
      if (active) btn.style.setProperty("--tab-accent", PRODUCTS[key].accent);
    });
  }
  onScentChange((p) => {
    syncTabs(switcherTabs, p.key);
    syncTabs(shopTabs, p.key);
  });

  /* ---------------------------------------------------------------
     SWITCHER PANEL
  --------------------------------------------------------------- */
  const switcherImage = document.getElementById("switcher-image");
  const switcherEyebrow = document.getElementById("switcher-eyebrow");
  const switcherName = document.getElementById("switcher-name");
  const switcherMood = document.getElementById("switcher-mood");
  const switcherNotes = document.getElementById("switcher-notes");
  const switcherPrice = document.getElementById("switcher-price");
  const switcherGlow = document.getElementById("switcher-glow");
  const switcherPanel = document.querySelector(".switcher-panel");

  onScentChange((p) => {
    switcherPanel.style.setProperty("--accent", p.accent);
    switcherImage.style.opacity = 0;
    setTimeout(() => {
      switcherImage.src = p.image;
      switcherImage.alt = "Aya Marhaba " + p.name + " Hair Mist";
      switcherImage.style.opacity = 1;
    }, 180);
    switcherGlow.style.background = `radial-gradient(circle, ${p.accent}, transparent 70%)`;
    switcherEyebrow.textContent = GLYPH_EMOJI[p.key] + " " + p.tagline;
    switcherName.textContent = p.name;
    switcherMood.textContent = p.mood;
    switcherNotes.innerHTML = `<li><b>Top</b> ${p.notes.top}</li><li><b>Heart</b> ${p.notes.heart}</li><li><b>Base</b> ${p.notes.base}</li>`;
    const finalPrice = window.getFinalPrice(p.key);
    switcherPrice.innerHTML = p.discount > 0
      ? `${money(finalPrice, p.currency)}<span class="was">${money(p.price, p.currency)}</span>`
      : money(finalPrice, p.currency);
  });

  /* ---------------------------------------------------------------
     NOTES SECTION (synced to selected scent)
  --------------------------------------------------------------- */
  const notesSection = document.getElementById("notes");
  const notesEyebrow = document.getElementById("notes-eyebrow");
  const notesTop = document.getElementById("notes-top");
  const notesHeart = document.getElementById("notes-heart");
  const notesBase = document.getElementById("notes-base");
  const notesBeamFill = document.getElementById("notes-beam-fill");

  onScentChange((p) => {
    notesSection.style.setProperty("--accent", p.accent);
    notesEyebrow.textContent = GLYPH_EMOJI[p.key] + " " + p.name;
    notesTop.textContent = p.notes.top;
    notesHeart.textContent = p.notes.heart;
    notesBase.textContent = p.notes.base;
    notesBeamFill.style.height = "0%";
    requestAnimationFrame(() => (notesBeamFill.style.height = "100%"));
  });

  /* ---------------------------------------------------------------
     SHOP PANEL
  --------------------------------------------------------------- */
  const shopImage = document.getElementById("shop-image");
  const shopGlow = document.getElementById("shop-glow");
  const shopName = document.getElementById("shop-name");
  const shopTagline = document.getElementById("shop-tagline");
  const shopPriceFinal = document.getElementById("shop-price-final");
  const shopPriceOriginal = document.getElementById("shop-price-original");
  const shopDiscount = document.getElementById("shop-discount");
  const shopPanel = document.querySelector(".shop-panel");
  let qty = 1;
  const qtyValue = document.getElementById("qty-value");

  onScentChange((p) => {
    shopPanel.style.setProperty("--accent", p.accent);
    shopImage.style.opacity = 0;
    setTimeout(() => {
      shopImage.src = p.image;
      shopImage.alt = "Aya Marhaba " + p.name + " Hair Mist";
      shopImage.style.opacity = 1;
    }, 180);
    shopGlow.style.background = `radial-gradient(circle, ${p.accent}, transparent 70%)`;
    shopName.textContent = p.name + " Hair Mist";
    shopTagline.textContent = GLYPH_EMOJI[p.key] + "  " + p.tagline;
    const finalPrice = window.getFinalPrice(p.key);
    shopPriceFinal.textContent = money(finalPrice, p.currency);
    shopPriceOriginal.textContent = p.discount > 0 ? money(p.price, p.currency) : "";
    shopDiscount.textContent = p.discount > 0 ? "-" + p.discount + "%" : "";
    shopDiscount.style.display = p.discount > 0 ? "" : "none";
  });

  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty = Math.min(9, qty + 1);
    qtyValue.textContent = qty;
  });

  const addToCartBtn = document.getElementById("add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    const original = addToCartBtn.textContent;
    addToCartBtn.textContent = "Added ✓";
    setTimeout(() => (addToCartBtn.textContent = original), 1600);
  });

  /* ---------------------------------------------------------------
     "EXPLORE {SCENT}" links from story sections
  --------------------------------------------------------------- */
  document.querySelectorAll("[data-goto-scent]").forEach((link) => {
    link.addEventListener("click", () => setScent(link.dataset.gotoScent));
  });

  /* ---------------------------------------------------------------
     FINAL CTA bottle follows selected scent too
  --------------------------------------------------------------- */
  const finalBottleImg = document.getElementById("final-bottle-img");
  onScentChange((p) => {
    finalBottleImg.src = p.image;
    finalBottleImg.alt = "Aya Marhaba " + p.name + " Hair Mist";
  });

  /* ---------------------------------------------------------------
     INITIALIZE default scent
  --------------------------------------------------------------- */
  setScent("rose");

  /* ---------------------------------------------------------------
     GALLERY — render from data + lightbox
  --------------------------------------------------------------- */
  const galleryGrid = document.getElementById("gallery-grid");
  (window.GALLERY_IMAGES || []).forEach((img) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item " + (img.size || "small");
    fig.setAttribute("data-caption", img.caption || "");
    fig.innerHTML = `<img src="${img.src}" alt="${img.caption || ""}" loading="lazy" />`;
    fig.addEventListener("click", () => openLightbox(img.src, img.caption));
    galleryGrid.appendChild(fig);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------------------------------------------------------
     RENDER: benefits
  --------------------------------------------------------------- */
  const ICONS = {
    drop: '<svg viewBox="0 0 24 24"><path d="M12 2s7 8.5 7 13a7 7 0 1 1-14 0c0-4.5 7-13 7-13Z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24"><path d="M4 20c8-1 14-7 15-15C11 6 5 12 4 20Z"/><path d="M4 20c2-4 5-7 9-9"/></svg>',
    shine: '<svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };
  const BENEFITS = [
    { icon: "drop", label: "Alcohol‑Free" },
    { icon: "leaf", label: "For All Hair Types" },
    { icon: "shine", label: "Adds Shine & Freshness" },
    { icon: "shield", label: "UV Protection" },
    { icon: "clock", label: "Long‑Lasting Fragrance" }
  ];
  const benefitsList = document.getElementById("benefits-list");
  BENEFITS.forEach((b) => {
    const div = document.createElement("div");
    div.className = "benefit-item";
    div.innerHTML = `<span class="benefit-icon">${ICONS[b.icon]}</span><span>${b.label}</span>`;
    benefitsList.appendChild(div);
  });
  // re-observe newly created benefit items for scroll reveal
  if (!prefersReducedMotion) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".benefit-item, .gallery-item").forEach((el) => io2.observe(el));
  } else {
    document.querySelectorAll(".benefit-item, .gallery-item").forEach((el) => el.classList.add("in-view"));
  }
})();
