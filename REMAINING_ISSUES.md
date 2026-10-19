# Remaining Issues

This file tracks unresolved items for future work. `index.html` is the production source of truth. The legacy page is listed separately because it duplicates the application and is not currently the primary entry point.

## Critical

- **Form delivery is not confirmed**: `script.js:244-251` and `script.js:325-332` call `fetch()` without awaiting or checking the response, while the UI reports success immediately.
- **Sensitive data is sent directly from the browser**: enrollment data includes birth dates, allergy notes, parent contact details, and messages in `script.js:220-250` without repository-controlled server-side validation or access rules.
- **Firestore security rules are not included**: the Firebase project configuration is embedded in `index.html:1055-1062`, but no repository-managed rules define who can read or write submitted data.

## High

- **Marketing claims need verification**: ratings, licensing, insurance, First Aid certification, background checks, and staff credentials are hard-coded in `index.html:112-127`, `261-306`, and `983-985`.
- **Firebase depends on external CDN modules**: `index.html:1050-1070` requires Google CDN availability and client-side initialization before form storage works.
- **Placeholder links remain**: social, legal, and some contact links still use `href="#"` in `index.html:921-924` and `1011-1023`.
- **The legacy page duplicates the application**: `blooming-birds-daycare.html` can diverge from `index.html` and should either be repaired, redirected, or retired.

## Medium

- **Custom domain metadata is pending launch**: canonical, Open Graph, and schema URLs currently use `https://bloomingbirds.netlify.app/` in `index.html:17`, `25`, and `38`. Switch them to `https://daycareabbotsford.ca/` after the domain is live.
- **Open Graph image is missing**: `index.html:26` references `og-image.jpg`, but the file is not in the repository.
- **Structured social metadata is empty**: `index.html:54` contains `"sameAs": []`; populate it with real social profile URLs or remove the property.
- **Map link is generic**: `index.html:888-889` opens Google Maps without the childcare address or coordinates.
- **Gallery is not a real lightbox**: `script.js:478-489` displays a toast caption instead of opening an image viewer.
- **Accessibility semantics are incomplete**: program tabs, gallery items, and form errors need stronger ARIA relationships and state attributes.
- **Mobile menu lacks a focus trap**: `script.js:15-45` disables scrolling but allows focus to escape the open menu.
- **Reduced motion is unsupported**: animations do not currently honor `prefers-reduced-motion`.
- **Form focus styling needs review**: custom focus styles may not provide sufficient contrast for every control.

## Low

- **Invalid CSS declaration**: `style.css:1427` uses `flex-wrap: gap 12px`, which browsers ignore.
- **Tracked `.DS_Store` file**: `.DS_Store` is unrelated repository noise and should generally not be versioned.
- **Large inline styles reduce maintainability**: substantial presentation logic remains embedded in the HTML.
- **No automated quality gates exist**: there are no automated tests, linting, accessibility, link, or deployment checks.

## Resolved

- Blog, Reviews, and FAQ sections were removed from the active pages.
- The Holidays row was removed from enrollment hours.
- Contact details were updated to Blooming Birds Childcare, 33214 Westbury Ave, Abbotsford BC V2S 1C2, 778-632-2525, and BloomingBirds25@gmail.com.
- Unsupported Stripe security claims were removed.
