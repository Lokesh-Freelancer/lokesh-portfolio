# Lokesh Prajapat — Portfolio

Professional portfolio built with React, Next.js App Router, TypeScript and CSS. The dark navy/lime design presents Shopify projects, expertise, experience, education, and direct contact details from the supplied resume.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Build

```sh
npm run typecheck
npm run build
```

`out/` contains the deployable static website. You can also deploy the Next.js source to Vercel with the standard Next.js preset.

## Edit your portfolio

- `src/lib/content.ts`: projects, skills, experience, email and LinkedIn.
- `src/components/portfolio.tsx`: page sections, contact phone, hero copy, education and interactions.
- `src/app/globals.css`: design tokens and responsive styles.
- `src/app/layout.tsx`: title, description and social metadata. Update `metadataBase` if deploying on another domain.
- `public/Lokesh-Resume.pdf`: the original downloadable resume.

Project covers are typographic illustrations, not screenshots of the client websites. The hero storefront is an interactive demo. No project URLs, headshot or current availability were supplied, so none are invented. Contact actions use email, phone and LinkedIn directly; no contact backend is required.

Native dialogs support Escape and return focus to their trigger. The demo tabs support arrow keys, Home and End. Motion is disabled under `prefers-reduced-motion`.
