# Portfolio Implementation Plan

> For agentic workers: use superpowers:executing-plans inline. Steps use checkbox syntax.

**Goal:** Deliver a complete professional Next.js portfolio based on Lokesh's resume.

**Architecture:** Next.js App Router, static export, a small interactive client component, data separate from presentation. Native HTML dialogs and CSS handle interface behavior.

**Tech Stack:** React, Next.js, TypeScript, CSS, self-hosted Manrope.

**Spec:** docs/superpowers/specs/2026-10-10-portfolio-design.md

## Global Constraints
Use supplied resume facts and confirmed navy/lime style. No invented project links or availability. Honor reduced motion and keyboard navigation.

## Review Focus
390px viewport has no horizontal overflow. Dialog escape restores focus. Mobile menu closes after navigation. Copy failure retains a usable email link. PDF downloads the original file.

## Task 1: Portfolio and interactions
- [ ] Create package and static-export configuration, layout and metadata.
- [ ] Add content data, portfolio component, responsive styles and original PDF.
- [ ] Verify production build and type checking.
- [ ] Exercise navigation, project dialogs, preview switch, contact and PDF in browser; capture desktop and mobile.

## Task 2: Delivery
- [ ] Run design detector and independent visual review.
- [ ] Record finished design tokens and maintainable source instructions.
- [ ] Package verified static export, synchronize source and publish private Site.
- [ ] Confirm deployment and hand off preview and local source.
