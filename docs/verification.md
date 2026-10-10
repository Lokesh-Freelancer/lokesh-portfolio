# Portfolio verification

Production build: `node <Sites plugin>/scripts/build-site.mjs` passed, Next.js 16.4.0 static routes generated. `npm run typecheck` passed. Dependency installation reported zero vulnerabilities. Impeccable mechanical detector returned an empty findings list.

Browser QA on the local exported site and development preview:
- Desktop 1440px and mobile 390px show no document horizontal overflow.
- Mobile menu opens, reaches Work, and closes after selection.
- Project filters show one WordPress project, three Shopify projects, and all four when reset.
- Milano contribution dialog opens with supplied content, Escape closes it, and focus returns to its initiating button.
- Demo tabs switch using arrow keys. Adding the sample item changes the demo button to Remove from demo bag and displays an illustrative confirmation.
- Email copy action displays success feedback after the clipboard write promise resolves. Browser tooling's separate clipboard inspection returned an empty string; exact OS clipboard contents were not verified.
- Resume copies have identical SHA-256 hashes; original source remains unchanged.
- Exported browser console reported no warnings or errors.
- Final desktop and mobile evidence is saved in `.impeccable/review/` (ignored by Git).

Illustrative project covers and storefront demo are labeled. Project source contains no invented client URLs, availability or testimonials.
