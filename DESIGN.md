---
name: Lokesh Prajapat Portfolio
description: A modern developer portfolio in dark navy and lime.
colors:
  primary: "#d4f878"
  primary-hover: "#e3ffa2"
  background: "#101622"
  surface: "#151d2b"
  surface-raised: "#1b2534"
  foreground: "#f1f4ec"
  muted: "#a8b4c7"
  line: "#2c3646"
typography:
  display:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(48px, 5.1vw, 73px)"
    fontWeight: 650
    lineHeight: 1.11
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(34px, 3.6vw, 48px)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "20px"
    fontWeight: 650
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "11px"
    fontWeight: 400
  code:
    fontFamily: "Consolas, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  tag: "5px"
  filter: "7px"
  control: "8px"
  note: "10px"
  cover: "12px"
  panel: "14px"
  dialog: "16px"
spacing:
  compact: "8px"
  medium: "16px"
  roomy: "24px"
  grid: "30px"
  wide: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "14px 21px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-contact:
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  filter:
    textColor: "{colors.muted}"
    rounded: "{rounded.filter}"
    padding: "9px 14px"
  tag:
    backgroundColor: "#1b2533"
    textColor: "#b6c0d0"
    rounded: "{rounded.tag}"
    padding: "4px 9px"
  project-cover:
    rounded: "{rounded.cover}"
    padding: "23px 25px 18px"
    height: "292px"
  theme-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  project-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.dialog}"
    padding: "44px"
---
# Design System: Lokesh Prajapat Portfolio

## Overview

**Creative North Star: "The Developer Workshop & Lookbook"**

This name describes the implementation direction: precise developer details paired with the spacious typography and composed color fields of a brand lookbook. It is descriptive language for the shipped system. The durable user commitments are dark navy, lime, and a modern developer style.

The system is calm, confident, and content-led. Large headings anchor generous sections; supporting copy and fine rules create a quieter layer. Controls are compact and explicit. The palette stays consistent around the content while illustrative project covers can carry their own brand treatments.

**Key Characteristics:**

- Dark navy layers with lime actions and emphasis.
- Manrope typography with tight display tracking and relaxed body leading.
- Flat surfaces, fine borders, and gently rounded controls.
- Spacious desktop columns that become readable mobile stacks.
- Restrained interaction motion with reduced-motion support.

## Colors

The palette pairs a cool, deep navy foundation with a bright yellow-green accent; the frontmatter records the exact source colors.

### Primary

- **Workshop Lime** (`primary`): primary calls to action, selected tabs and filters, heading punctuation, focus rings, and contact emphasis.
- **Light Lime** (`primary-hover`): the lighter primary button hover state.

### Neutral

- **Midnight Navy** (`background`): the page and sticky header; also dark text on lime controls.
- **Panel Navy** (`surface`): the code demonstration, mobile navigation, and project dialog.
- **Raised Navy** (`surface-raised`): a restrained hover surface for filters.
- **Soft Chalk** (`foreground`): display text, titles, and stronger text within introductory copy.
- **Slate Mist** (`muted`): supporting copy, navigation, and metadata.
- **Navy Rule** (`line`): dividers and structural borders.

Illustrative project covers use scoped lavender, warm ivory, sage, and pale blue fields. The contact section uses a subdued green-navy field. These are component-specific treatments rather than alternative global accents.

**The Lime Signal Rule.** Use lime for actions, selected states, and deliberate text emphasis, following the existing interface's hierarchy.

## Typography

**Display Font:** Manrope Variable (with sans-serif fallback).  
**Body Font:** Manrope Variable (with sans-serif fallback).  
**Label/Mono Font:** Manrope for labels; Consolas (with monospace fallback) for code.

**Character:** Manrope supplies a clear, contemporary voice. Tight display tracking makes the large headlines cohesive; smaller reading text keeps ordinary tracking and generous leading. Georgia is reserved for the illustrated Milano and Protéger cover identities.

### Hierarchy

- **Display:** hero headline uses the frontmatter display role, balanced against the adjacent demonstration. It has two deliberate lines.
- **Headline:** section headings use the headline role. Contact, expertise, and about headings have local fluid sizes suited to their column widths.
- **Title:** the base title role is adjusted to (18px) for project and expertise names and (21px) for experience roles.
- **Body:** the base role is the default; section copy commonly uses (12–14px) with line heights up to (1.9). The desktop hero introduction is larger (18px / 1.7) and capped at (480px).
- **Label:** compact labels identify actual metadata, tags, and controls. Navigation is (13px / 500), button text is (13px / 750), and most labels are (10–12px).
- **Code:** the monospace role displays literal code and line numbers, increasing to (11px) at the tablet layout and reducing to (9px / 1.8) on phones.

**The Heading First Rule.** Major sections begin directly with their heading. Put useful explanation below the heading and keep metadata attached to the item it describes.

Responsive display values are recorded in Layout; the frontmatter carries the wide-screen base roles.

## Layout

The shared content container is capped at (1240px), with a width of `min(1240px, calc(100% - 112px))`. Its desktop side gutters are (56px). Standard sections use (108px) vertical padding. The hero is a two-column grid (1.23fr / 1fr) with a (48px) gap. Projects use two equal columns with gaps of (30px) horizontally and (43px) vertically. Expertise and about use asymmetric columns; the experience timeline separates dates from role content.

The spacing scale describes reused intervals, not a required mathematical grid. Fine-grained component spacing remains contextual. Hero actions, headings, explanatory copy, and metadata have distinct levels of separation.

- **At or below (1100px):** container gutters become (36px); hero spacing and column gaps tighten, and its headline becomes (5.2vw).
- **At or below (820px):** gutters become (24px); the hero stacks, with a centered demo capped at (540px), and the headline becomes (66px). Section padding becomes (76px). Project cards retain two columns, section headings and filters stack, and contact becomes a single column.
- **At or below (600px):** gutters become (20px); projects, expertise, experience, and about become single columns. Section padding becomes (65px). The hero headline uses `clamp(33px, 8.8vw, 53px)` with line-height (1.14). Primary controls use a minimum height of (47px). Navigation becomes a button-controlled vertical menu.
- **At or above (1600px):** hero vertical padding increases to (112px).

The sticky header is (94px) tall, then (78px) at tablet width and (73px) on phones. Anchor scroll padding accounts for the header: (106px) normally and (93px) on phones.

## Elevation & Depth

There are no authored box shadows. Depth comes from neighboring navy tones, thin rules, and the dialog's dark backdrop (85% opacity). The lime note overlaps the bottom of the demo panel to create a small foreground layer. The header, toast, and dialog use placement and stacking order to communicate prominence.

**The Flat Surface Rule.** Convey resting depth with color, borders, and overlap, as the shipped components do.

## Shapes

Controls have gently curved corners (8px); filter chips are slightly tighter (7px), and passive tags tighter again (5px). Project covers use (12px), the demonstration uses (14px), and dialogs use (16px). Borders are fine (1px). Circular arrow frames and timeline markers provide small contrasting forms. Product illustration silhouettes belong to the demo rather than the global container language.

## Components

### Buttons

Confident and compact, with clear action labels.

- **Primary:** lime fill and midnight text; padding and minimum height follow the frontmatter. Icons are spaced from text by (22px).
- **Hover:** light lime fill and a subtle upward movement (2px), transitioning over (0.2s).
- **Focus:** a lime outline (2px) offset by (5px).
- **Outlined contact:** transparent fill, subdued green border, and lime text; hover adds a dark green surface.
- **Text actions:** resume links remain quiet until hover; inline contact actions use lime with underline feedback.
- **Disabled:** reduced opacity (0.55) and an unavailable cursor.

### Chips

Project tags are passive metadata with a low-contrast navy fill. Filters are buttons with transparent default fill and muted text. Selected filters use lime text, a dark green surface, and a subtle green border. Filter hover uses the raised navy tone. Phone filters have a minimum height of (40px).

### Cards / Containers

Project covers are full-width interactive fields with brand-specific type and color. Desktop covers are (292px) high, reducing to (265px) at the compact desktop breakpoint, (237px) at tablet width, and (245px) on phones. A small framed arrow signals detail access. Hover scales only the central cover identity (1.045), over (0.35s).

The project dialog uses panel navy, a fine slate border, and a dark backdrop. Its width is capped at (600px) with (20px) outer gutters, its height is capped by the dynamic viewport, and padding reduces from (44px) to (40px 24px 28px) on phones. Native dialog behavior supplies focus handling and Escape dismissal; the explicit close button remains visible.

### Navigation

The wordmark is heavy (800) and tightly tracked, with a lime period. Desktop links are muted, becoming foreground-colored on hover. A separate outlined contact action completes the row. The mobile toggle has a minimum target size of (44px), reports its expanded state, and opens a vertical panel below the header. Choosing a navigation link closes the menu.

### Theme Demonstration

A bordered navy editor panel switches between a Liquid code view and an illustrative storefront. Tab selection is expressed with lime text and a thin underline. Arrow, Home, and End keys move selection and focus. The panel enters with a restrained clip reveal (1s), using `cubic-bezier(.16, 1, .3, 1)`. The storefront's bag action changes its label and status copy without implying a real checkout.

### Feedback and Access

A lime toast confirms copying or explains clipboard failure. It enters with opacity and a small vertical translation over (0.2s), remains visible for (4.5s), and announces through a polite status region. A focus-revealed skip link and shared focus outline support keyboard navigation.

Reduced-motion preferences disable transitions and animation throughout the interface and switch smooth anchor scrolling to immediate scrolling.

## Do's and Don'ts

### Do:

- **Do** preserve the dark navy foundation and lime action hierarchy.
- **Do** start major sections with their heading and place useful explanation below it.
- **Do** retain generous leading for reading copy and the implemented mobile stacking behavior.
- **Do** show keyboard focus and respect reduced-motion preferences.
- **Do** label illustrative covers and storefront content honestly.

### Don't:

- **Don't** turn project-cover colors or typefaces into competing global brand accents.
- **Don't** add shadows to the existing flat surface vocabulary without an intentional system change.
- **Don't** replace actual project metadata with decorative section labels.
- **Don't** present illustrative artwork as a supplied screenshot or a live client storefront.

