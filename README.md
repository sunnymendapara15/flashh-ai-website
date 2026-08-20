# Flashh ai — Landing Page

A premium, modern, conversion-focused landing page for **Flashh ai**, the AI that turns a simple text conversation into working automations. Built for tech and non-tech people alike.

## ✨ Highlights

- **All 11 sections** — sticky navbar, hero, social proof, features, product showcase, benefits, testimonials, pricing, FAQ, final CTA, and footer.
- **Premium visuals** — refined violet→indigo→cyan gradients, glassmorphism, ambient drifting orbs, subtle grid, glow.
- **Elegant motion** — scroll reveals, staggered entrances, hover lift/glow, typing microinteractions, magnetic buttons, pointer parallax.
- **Fully responsive** — mobile-first, fluid `clamp()` typography, breakpoints at 560 / 720 / 900 / 1024px.
- **Accessible** — semantic landmarks, skip link, ARIA on menu & accordion, visible focus rings, keyboard navigable, `prefers-reduced-motion` respected.
- **Zero dependencies** — pure HTML/CSS/JS, no build step, no external images. Just open and run.

## 🗂 Structure

```
flashh-ai-website/
├── index.html        # Full semantic structure (all sections)
├── css/
│   └── styles.css    # Design tokens, layout, components, motion, responsive, a11y
├── js/
│   └── main.js       # Scroll reveals, counters, nav, FAQ, typing, microinteractions
└── README.md
```

## 🚀 Run locally

No build tools required.

**Option 1 — open directly**
Double-click `index.html` (or drag it into your browser).

**Option 2 — local server (recommended)**
```bash
# Python 3
python3 -m http.server 5500

# then visit
# http://localhost:5500
```

**Option 3 — Node**
```bash
npx serve .
```

## 🎨 Customize

- **Brand colors / gradients** — edit the CSS custom properties at the top of `css/styles.css` (`:root`).
- **Copy** — edit text directly in `index.html`.
- **Fonts** — swap the Google Fonts `<link>` in `index.html` and the `--font-*` tokens in `css/styles.css`.
- **Integrations list, stats, pricing, testimonials** — all live as plain markup in `index.html`.

## ♿ Accessibility notes

- All interactive elements are keyboard reachable with visible focus.
- The mobile menu and FAQ use proper `aria-expanded` / `aria-controls`.
- Motion respects `prefers-reduced-motion: reduce`.
- Color contrast meets WCAG AA on the dark theme.

## 📄 License

MIT — free to use, modify, and ship.
