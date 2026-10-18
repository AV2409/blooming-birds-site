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
8. Enrollment form and FAQ accordion.
9. Call-to-action strip.
10. Contact information and contact form.
11. Footer.
12. Notification toast, chat widget, and floating scroll bird.

Current hero highlights are `5-Star Certified`, `First Aid Certified`, `ECE Certified`, and `Licensed Facility`.

## 3. Runtime Workflows

### 3.1 Initial Page Load

1. The browser parses the HTML and loads Google Fonts and `style.css`.
2. Firebase modules are imported from Google's CDN.
3. Firebase initializes with the embedded project configuration.
4. Firestore helpers are exposed as `window.db` and `window.fb`.
5. `script.js` initializes navigation, event handlers, date limits, and reveal animations.
6. The current year is inserted into the main page footer.

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
- After-School Club.

### 3.5 FAQ Accordion

1. Each FAQ button calls `toggleFaq(index)`.
2. The corresponding `#faq-index` element toggles the `open` class.
3. CSS expands or collapses the answer using `max-height` and padding.
4. The arrow rotates when the item is open.

### 3.6 Enrollment Form

1. The form calls `submitForm(event)` and prevents the default browser submission.
2. Existing inline errors are cleared.
3. Child first name and last name are validated against a letters-and-spaces pattern.
4. A program must be selected.
5. Date of birth is validated against the selected program's age range:
   - Infant Care: 6 to 18 months.
   - Toddler Adventures: 18 months to 3 years.
   - Preschool Prep: 3 to 5 years.
   - After-School Club: 5 to 12 years.
6. Parent name, phone, and email are validated.
7. Optional start and tour dates cannot be in the past.
8. The terms checkbox must be selected.
9. If validation fails, errors are shown and the first error is scrolled into view.
10. A five-second client-side rate limit prevents rapid repeated submissions.
11. A submission object is created with enrollment data and an ISO timestamp.
12. If Firebase initialized, the object is added to Firestore collection `enrollments`.
13. The same object is sent to the Google Apps Script endpoint.
14. A success toast is shown and the form is reset.
15. Firebase errors enter the error handler and show an alert.

### 3.7 Contact Form

1. The form calls `submitContact(event)` and prevents the default browser submission.
2. Name, email, and message fields are validated.
3. The message must contain at least ten characters.
4. A five-second client-side rate limit prevents rapid repeated submissions.
5. A message object is created with name, email, subject, message, and an ISO timestamp.
6. If Firebase initialized, the object is added to Firestore collection `messages`.
7. The same object is sent to the Google Apps Script endpoint.
8. A success toast is shown and the form is reset.
9. Firebase errors enter the error handler and show an alert.

### 3.8 Form Error Clearing

1. Input events are watched at the document level.
2. For recognized form controls, the matching error class and error text are removed.
3. Enrollment and contact forms use separate helper functions to clear all known errors before validation.

### 3.9 Live Chat Widget

1. The chat bubble is closed on initial load.
2. Clicking the chat button toggles the `open` class.
3. The button icon changes between chat and close symbols.
4. The open bubble contains a generic email action.

### 3.10 Gallery Interaction

1. Gallery cards are clickable.
2. Clicking a card reads its caption.
3. The caption is displayed in the notification toast.
4. No image modal or full-size image viewer is opened.

### 3.11 Reveal Animations

1. Elements with the `reveal` class start transparent and shifted down.
2. An `IntersectionObserver` watches those elements after DOM initialization.
3. When an element enters the viewport, the `visible` class is added.
4. The observer stops watching that element after it becomes visible.

### 3.12 Scroll Bird

1. The scroll handler calculates the user's page scroll percentage.
2. The bird's vertical position is mapped across approximately 90 viewport-height units.
3. The bird moves off-screen near the top and appears on the right after the user scrolls slightly.

### 3.13 Footer Year

1. On the current page, `#footerYear` is populated with the current year at runtime.
2. The legacy page uses a hard-coded copyright year.

## 4. External Integrations

### Firebase

- Firebase App and Firestore modules are loaded from `https://www.gstatic.com`.
- Project configuration is embedded in both HTML files.
- Enrollment data is written to `enrollments`.
- Contact data is written to `messages`.
- Firestore rules are not included in this repository.

### Google Apps Script

- Both forms POST JSON to a hard-coded Apps Script URL.
- The request does not set an explicit `Content-Type` header.
- The request is not awaited.
- The response is not checked before showing success.

### Google Fonts

- `Baloo 2` is used for display text.
- `Nunito` is used for body text.

### Google Maps

- The map is a visual placeholder.
- The map link currently points to generic Google Maps rather than a verified business location.

### Cloudflare Email Decoding

- The current page references Cloudflare's email decoding script and encoded email links.
- Those paths are not present in this repository.

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
- Forms become single-column.
- Gallery becomes two columns.
- Footer sections stack.
- At 480 pixels, gallery and team cards become single-column.
- Large buttons become full-width.

## 6. Known Issues

### Critical

- **Legacy forms are incompatible with `script.js`**: `blooming-birds-daycare.html` form fields lack the names and IDs accessed by the shared submission handlers, causing runtime errors on submit.
- **Submission success is not delivery-confirmed**: the Google Apps Script request is neither awaited nor checked, so users can see success when the external submission fails.
- **Sensitive data is sent directly from the browser**: child birth dates, allergy notes, parent contact details, and messages are sent to external services without visible server-side validation or repository-controlled security rules.

### High

- **No Firestore security rules are included**: access control cannot be reviewed or safely maintained from this repository.
- **Firebase initialization is external and failure-prone**: the site depends on CDN module availability and client-side initialization at runtime.
- **The legacy page duplicates the entire application**: shared content and behavior can diverge and fixes may only reach one entry point.
- **Many claims appear unverified**: ratings, accreditation, family counts, staff credentials, and pricing are hard-coded marketing content.
- **Legal and social links are placeholders**: privacy policy, terms, sitemap, accessibility, and social links frequently use `href="#"`.
- **The advertised Stripe workflow does not exist**: the page claims Stripe-secured payments, but there is no Stripe integration.

### Medium

- **Gallery is not a real lightbox**: clicking a gallery item only displays a toast caption.
- **Accessibility semantics are incomplete**: tabs, FAQs, gallery items, and form errors lack complete ARIA relationships and state attributes.
- **Mobile menu lacks a focus trap**: focus can escape the open menu even though body scrolling is disabled.
- **Reduced motion is unsupported**: animations continue for users who request reduced motion.
- **Focus outlines are removed from form controls**: the custom focus style may not provide sufficient contrast or consistency for all users.
- **Cloudflare email paths are deployment-dependent**: encoded email links may fail when served outside the original Cloudflare setup.
- **The Open Graph image is missing**: `og-image.jpg` is referenced but not stored in the repository.
- **The map link is generic**: users are not directed to the actual daycare location.

### Low

- **Invalid CSS declaration**: `.footer-bottom` contains `flex-wrap: gap 12px`, which is ignored by browsers.
- **Invalid inline color expressions**: declarations such as `var(--pink)+'44'` are not valid CSS color syntax.
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
- Open and close every FAQ item.
- Submit invalid enrollment data and verify inline errors.
- Submit valid enrollment data and inspect Firebase and Apps Script network requests.
- Submit invalid and valid contact messages.
- Open and close the live chat widget.
- Click gallery cards and verify toast behavior.
- Scroll through the page and verify reveal animations and scroll bird behavior.
- Check layouts at approximately 480, 768, 1024, and desktop widths.
- Test keyboard navigation and visible focus states.
- Test with reduced motion enabled.

### Integration QA

- Confirm Firebase initialization succeeds.
- Confirm Firestore rules allow only intended operations.
- Confirm Apps Script accepts the request format.
- Confirm Apps Script failures are surfaced to users.
- Confirm no sensitive data is sent to unintended destinations.
- Confirm email, phone, map, social, and legal links point to real destinations.

## 8. Recommended Work Order

1. Decide whether to remove or repair `blooming-birds-daycare.html`.
2. Replace fictional or inconsistent business information with verified content.
3. Define the real form backend and secure Firestore/Apps Script access.
4. Make form delivery awaitable and failure-aware.
5. Remove placeholder links and unsupported Stripe claims.
6. Fix accessibility semantics and keyboard behavior.
7. Fix invalid CSS and add reduced-motion handling.
8. Add automated checks and deployment documentation.
