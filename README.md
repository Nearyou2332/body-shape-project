# Body Shape

A responsive fitness landing page with accessible program browsing and a browser-local starting-plan builder. Built with semantic HTML, CSS, and vanilla JavaScript; no framework, build step, or third-party scripts.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`. You can also open `index.html` directly for a basic preview.

## Features

- Responsive layouts for phones, tablets, and desktop screens.
- Mobile navigation with keyboard support and explicit expanded state.
- Category filters with visible selection and announced result counts.
- Native modal dialogs with focus containment, Escape-to-close, and focus return.
- Program-to-plan flow with goal preselection.
- Local starting-plan generation, editable choices, and a plain-text download.
- Native FAQ disclosures, reduced-motion support, skip link, and visible focus indicators.
- Local WOFF2 fonts and optimized WebP photography; no external runtime dependencies.

## Project structure

- `index.html` — content and accessible page structure.
- `styles/main.css` — visual system, components, and responsive rules.
- `scripts/main.js` — navigation, filtering, dialogs, and plan generation.
- `scripts/check_site.py` — dependency-free checks for local assets, fragment links, IDs, labels, and page content.
- `image/optimized/` — the assets served by the revised page.
- `docs/` — screenshots and verification notes.

Original photographs, font source files, and the original component styles are retained as source material. The revised page loads only `styles/main.css`, three WOFF2 font files, the logo, and selected optimized photographs.

## Content and integration boundaries

The displayed Austin address is illustrative, as stated in the footer. The social links open the main pages of Instagram, LinkedIn, X, and Facebook; no club accounts were supplied. Replace these with verified business details and profile URLs before using the page for an operating business.

The plan builder is an introductory outline, not a booking system or a contact form. It sends no requests, stores no personal data, and makes no reservation. There is no backend or email integration. The coaching section describes training principles rather than inventing staff identities, credentials, testimonials, or sales figures.

## Verify

```sh
python3 scripts/check_site.py
node --check scripts/main.js
```

See [verification notes](docs/VERIFICATION.md) for browser checks and limits. Browser screenshots: [desktop](docs/desktop.jpg), [mobile](docs/mobile.jpg), and [footer](docs/footer.jpg).
