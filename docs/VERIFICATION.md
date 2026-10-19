# Verification

Verified locally on October 19, 2026. No production deployment was performed.

## Browser checks

The connected Chromium-based preview browser was checked at widths of **320, 390, 768, 1024, and 1440 CSS pixels**. The document width matched the viewport at each size; no horizontal page overflow was observed. Mobile and desktop screenshots were inspected.

Passed checks:

- Local CSS, fonts, and images load; no broken images were observed.
- Main calls to action navigate to the intended sections.
- Mobile menu opens, updates `aria-expanded`, and closes after navigation.
- Program filters show 6 total / 2 strength / 3 conditioning / 1 mobility cards.
- Program details open in native dialogs; Escape closes the dialog and restores focus to its trigger.
- A program's goal transfers to the plan builder.
- Missing-goal validation displays a clear message and focuses the relevant field.
- All three goals generate the corresponding outline; 2-, 3-, and 4-day selections were exercised.
- Changing selections and regenerating the plan works.
- Downloading a plan creates a readable `body-shape-starting-plan.txt` file.
- FAQ disclosures toggle by click and keyboard Enter.
- The footer contains the illustrative Austin address and links to Instagram, LinkedIn, X, and Facebook.
- No console warnings or errors were observed in the preview.

## Source checks

- `python3 scripts/check_site.py` passes: local HTML/CSS resource paths, fragment destinations, unique IDs, ARIA references, image alt attributes, label targets, page text, and external-tab link attributes.
- `node --check scripts/main.js` passes.
- The selected photographic sources totalled 917,026 bytes. The 12 optimized WebP assets total 365,268 bytes, a reduction of approximately 60%. This compares asset sizes, not measured page-load speed.

## Limits

This was browser-based responsive testing, not testing on physical devices or separate Safari and Firefox installations. No Lighthouse score, full automated accessibility certification, or backend integration is claimed. The page uses native focus management, semantic landmarks, explicit labels, contrast-conscious colors, and reduced-motion CSS; screen-reader testing was not performed.

The address is illustrative and the social URLs are platform homepages, not verified club profiles. The plan builder performs no booking or submission. Original photographs and fonts are retained from the existing repository; their licensing provenance has not been independently verified.
