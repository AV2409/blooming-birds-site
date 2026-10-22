# Blooming Birds Site Project Reference

This document records the current application structure, workflows, integrations, verification steps, and known issues for future work.

## 1. Application Overview

- Type: Static HTML, CSS, and JavaScript website.
- Current entry point: `index.html`.
- Legacy entry point: `blooming-birds-daycare.html`.
- Shared styles: `style.css`.
- Shared behavior: `script.js`.
- Build system: None.
- Package manager: None.
- Automated tests: None.
- Deployment assumption: Static hosting, likely Netlify.
- Service age range: 6 months to 12 years in Abbotsford, BC.

## 2. Page Composition

The main page is a single long landing page with anchor-based navigation:

1. Fixed navigation bar and mobile menu.
2. Hero section with enrollment and tour calls to action.
3. About/story section.
4. Abbotsford local SEO section.
5. Team profiles.
6. Programs section with four tabs.
7. Gallery grid.
8. Enrollment information and hours.
9. Call-to-action strip.
10. Contact information and live chat.
11. Footer.
12. Chat widget and floating scroll bird.

Current hero highlights are `5-Star Certified`, `First Aid Certified`, `ECE Certified`, and `Licensed Facility`.

## 3. Runtime Workflows

### 3.1 Initial Page Load

1. The browser parses the HTML and loads Google Fonts and `style.css`.
2. `script.js` initializes navigation, program tabs, live chat, gallery behavior, and reveal animations.
3. The current year is inserted into the main page footer.

### 3.2 Desktop Navigation

1. The fixed navigation remains at the top of the page.
2. When the page scroll position exceeds 60 pixels, `#mainNav` receives the `scrolled` class.
3. Navigation links scroll to page sections using anchor IDs.
4. The enrollment and tour buttons scroll to `#enrollment` and `#contact`.

### 3.3 Mobile Navigation

1. At widths of 768 pixels or less, desktop links and navigation CTAs are hidden.
2. The hamburger button becomes visible.
3. Clicking it toggles the `open` class on `#mobileMenu`.
4. The button's `aria-expanded` value is updated.
5. Opening the menu focuses the first interactive element and disables body scrolling.
6. Closing the menu restores body scrolling and focuses the hamburger button.
7. Escape closes the menu when it is open.
8. Mobile menu links call `closeMobileMenu()` before navigating to their anchors.

### 3.4 Program Tabs

1. Each program button calls `showProgram(programId, button)`.
2. The active class is removed from all program panels and tabs.
3. The selected panel receives the `active` class and becomes visible.
4. The selected button receives the `active` class.

Available programs:

- Infant Care.
- Toddler Adventures.
- Preschool Prep.
- Before and After School Club.

### 3.5 Enrollment Information

1. The `#enrollment` section displays the current hours of operation.
2. Enrollment calls to action scroll to this information section.

### 3.6 Contact Information

1. The `#contact` section displays the address, phone, email, hours, map link, and social links.
2. The live-chat card remains available beside the contact information on larger screens.

### 3.7 Live Chat Widget

1. The chat bubble is closed on initial load.
2. Clicking the chat button toggles the `open` class.
3. The button icon changes between chat and close symbols.
4. The open bubble contains a generic email action.

### 3.8 Gallery Interaction

1. Gallery cards are clickable.
2. Clicking a card opens the lightbox with its image and caption.
3. Previous, next, close, backdrop, Escape, and arrow-key controls are supported.
4. The lightbox provides a fallback message when an image cannot be loaded.

### 3.9 Reveal Animations

1. Elements with the `reveal` class start transparent and shifted down.
2. An `IntersectionObserver` watches those elements after DOM initialization.
3. When an element enters the viewport, the `visible` class is added.
4. The observer stops watching that element after it becomes visible.

### 3.10 Scroll Bird

1. The scroll handler calculates the user's page scroll percentage.
2. The bird's vertical position is mapped across approximately 90 viewport-height units.
3. The bird moves off-screen near the top and appears on the right after the user scrolls slightly.

### 3.11 Footer Year

1. On the current page, `#footerYear` is populated with the current year at runtime.
2. The legacy page uses a hard-coded copyright year.

## 4. External Integrations

### Google Fonts

- `Baloo 2` is used for display text.
- `Nunito` is used for body text.

### Google Maps

- The map is a visual placeholder.
- The map link currently points to generic Google Maps rather than a verified business location.

## 5. Responsive Workflows

### Desktop

- Two-column hero, about, programs, enrollment, and contact layouts.
- Four-column gallery grid.
- Multi-column footer.

### Tablet

- At 1024 pixels, most major two-column sections stack.
- The footer becomes two columns.

### Mobile

- At 768 pixels, the mobile menu replaces desktop navigation.
- Contact and live-chat content stacks into one column.
- Gallery becomes two columns.
- Footer sections stack.
- At 480 pixels, gallery and team cards become single-column.
- Large buttons become full-width.

## 6. Known Issues

### Critical

- No active critical issues are currently tracked.

### High

- **The legacy page duplicates the entire application**: shared content and behavior can diverge and fixes may only reach one entry point.
- **Many claims appear unverified**: ratings, accreditation, family counts, and staff credentials are hard-coded marketing content.
- **Legal and social links are placeholders**: privacy policy, terms, sitemap, accessibility, and social links frequently use `href="#"`.

### Medium

- **Accessibility semantics are incomplete**: tabs and gallery items lack complete ARIA relationships and state attributes.
- **Mobile menu lacks a focus trap**: focus can escape the open menu even though body scrolling is disabled.
- **Reduced motion is unsupported**: animations continue for users who request reduced motion.
- **The Open Graph image is missing**: `og-image.jpg` is referenced but not stored in the repository.
- **The map link is generic**: users are not directed to the actual daycare location.

### Low

- **Invalid CSS declaration**: `.footer-bottom` contains `flex-wrap: gap 12px`, which is ignored by browsers.
- **The tracked `.DS_Store` file is unrelated repository noise**: it should generally not be versioned.
- **Large inline styles reduce maintainability**: much of the page styling is embedded directly in HTML instead of shared CSS classes.
- **No automated quality gates exist**: there is no test, lint, formatting, accessibility, link, or deployment check.

## 7. Verification Workflows

### Syntax and Diff Checks

```sh
node --check script.js
git diff --check
git status --short --untracked-files=all
```

### Local Static Server

```sh
python3 -m http.server 8000
```

Then manually open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/blooming-birds-daycare.html`

### Manual Functional QA

- Load both HTML entry points without console errors.
- Verify desktop and mobile navigation.
- Verify all anchor links.
- Switch between all program tabs.
- Submit invalid enrollment data and verify inline errors.
- Verify the enrollment hours and contact information sections.
- Open and close the live chat widget.
- Click gallery cards and verify lightbox behavior.
- Scroll through the page and verify reveal animations and scroll bird behavior.
- Check layouts at approximately 480, 768, 1024, and desktop widths.
- Test keyboard navigation and visible focus states.
- Test with reduced motion enabled.

### Integration QA

- Confirm email, phone, map, social, and legal links point to real destinations.

## 8. Recommended Work Order

1. Decide whether to remove or repair `blooming-birds-daycare.html`.
2. Replace fictional or inconsistent business information with verified content.
3. Remove placeholder links.
4. Fix accessibility semantics and keyboard behavior.
5. Fix invalid CSS and add reduced-motion handling.
6. Add automated checks and deployment documentation.
