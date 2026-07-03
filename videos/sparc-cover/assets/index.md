# Asset ledger — sparc-cover

All assets frozen project-local via `npx hyperframes capture https://sparc-sports.com/ -o assets/capture` (July 2026). First-party site assets — this IS the site Lydia designed, so everything is on-brand by definition.

## Brand tokens (from extracted/tokens.json + design-styles.json)
- Background black: `#0C0C0C` (surfaces `#141414`, `#252525`)
- Accent lime: `#B5F542` (secondary `#C3F763`)
- Text white: `#FFFFFF`, neutrals `#A7A7A7` / `#9CA3AF` / `#4D4D4D`
- Display font: `good-times` (700) — techy wide display; body: `nimbus-sans` (300–700). Font files in `assets/capture/assets/` (check extracted for @font-face) — fall back to system sans if not embeddable.

## Hero / mockup layers (role → frozen path)
- **laptop+phone dashboard mockup (hero, hi-res 4359×1986, dark laptop with white dashboard UI + phone with SPARC Insight / MPI 84)** → `assets/capture/assets/69cab65125ea7dacf0680cf3-laptop-20mockup.webp`
- same mockup, framed variant 3200×1458 → `assets/capture/assets/hero-13.webp` (smaller: hero-9/10/11/12, hero-image-is-in-view.webp)
- **three-phone app carousel ("How Tennis Players Use SPARC", 1210×972)** → `assets/capture/assets/how-tennis-players-use-sparc.webp`
- **dashboard "SPARC Independent Athletes" assessment-trends UI (white cards, sparklines 30/36/42/38/28/28, 2600×1409)** → `assets/capture/assets/image-21.webp` (variants image-17..20)
- **"Turn Athlete Data Into Coaching Insights" section image (2878×1560)** → `assets/capture/assets/turn-athlete-data-into-coaching-insights.webp`

## Logos
- **SPARC white lockup (mark + wordmark, 1080×361, transparent)** → `assets/capture/assets/hero-2.png` (larger: footer-component-is-in-view.png)
- **Green mark only** → `assets/capture/assets/favicon.png` (tiny) — bigger green mark in contact-sheet-2 slot 8 = check `assets/capture/assets/svgs/` logo-*.svg for vector mark

## Full-page scroll screenshots (base layer / glide)
- `assets/capture/screenshots/scroll-000.png` … `scroll-100.png` (12 viewports, 1920w) — hero at 000, stats row (78% / 80% / 1x / 100%) at 010, feature cards + dashboard at 020, assessment trends at 029, app phones + "How Tennis Players Use SPARC" at 039, testimonials 049–068, pricing $1,500/yr at 078.
- Contact sheets: `screenshots/contact-sheet-1.jpg`, `-2.jpg`
- Page DOM: `assets/capture/extracted/` (visible-text.txt, design-styles.json, tokens.json)

## Notes
- The laptop mockup webp appears to sit on dark/transparent — verify alpha at build time; if baked dark bg, it still composites cleanly on `#0C0C0C`.
- Phone carousel image has phones on dark background — treat as a single layer or mask individual phones with CSS if float-apart is needed.
- No unmet asset needs. No external searches required.
