# BFH-COMPONENTS.md — Baby First Health

All components follow `BFH-design.md`: no borders, no shadows, rounded, pill buttons.

## Container
`max-width 1200px`, centered, side padding 24px (mobile) / 40px (tablet) / 48px (desktop).

## Panel
A rounded (48px desktop / 32px mobile) teal-700 or teal-800 block inset 16px (mobile) / 24px (desktop) from the screen edges, with the same vertical padding as a Section (85px minimum). Used for Community, Live Sessions and the final CTA. Content inside uses Container with extra inner side padding.

## Section
Wrapper with `padding-block: 85px` (mobile), `100px` (tablet), `120px` (desktop). Accepts a background prop: `white`, `teal-50`, `teal-700`, `teal-800`. Text color switches automatically on dark backgrounds.

## Headline
H1/H2 in Plus Jakarta Sans 800. Accepts `{{highlighted}}` words rendered in orange-600 (light bg) or orange-400 (dark bg). Centered on tablet/desktop, left on mobile.

## Button
Variants: `primary` (orange-500 fill, teal-950 text), `secondary` (teal-600 fill, white text), `soft` (white fill, teal-900 text, for dark sections). Pill, 56px tall, padding 0 32px, Poppins 600, 1rem. Full width on mobile when it is the main CTA. No border, no shadow. Label uses the CSS text-roll hover (two stacked copies of the label inside an `overflow: hidden` span, see `BFH-animations.md`).

## Navbar
- Desktop: logo left, links (Home, About, Community, Products, Certifications, Live Sessions, FAQ, Contact) centered or right, **Join the Community** primary button at far right.
- Floating rounded bar (pill, `9999px`) inset 12px from the top and 16px from the sides, fixed. Transparent at the top, fills teal-50 after 40px of scroll. No border, no shadow.
- Active link: teal-600 text with a small orange dot under it (no underline border).
- Mobile: logo left, primary button (if space) and hamburger right. Menu opens as a full-width rounded panel below the header with links stacked vertically, 56px tap height each, and a clear close icon (hamburger morphs into X).
- Logo: `/BFH-logo.svg` at 44px height beside the wordmark "Baby First Health" (Plus Jakarta Sans 800, teal-900).

## Hero
Big H1, supporting paragraph, primary button. Right-side (below on mobile) arch-shaped hero image (`border-radius: 999px 999px 40px 40px`), with a cropped teal-50 heart behind it and one small orange plus. On mobile the image sits below the button. Top padding accounts for the fixed navbar plus 85px minimum.

## Feature list (Six Areas)
Six items in the **sticky list** layout on desktop: the section headline and intro stick on the left while the items scroll on the right; stacked normally on tablet and mobile. Each item has a bare teal icon, a Poppins 600 title and a short description. Layout: 3 columns desktop, 2 tablet, 1 mobile. Items sit on a teal-50 section background with **no card boxes**, or use soft teal-100 rounded tiles alternating with white only if grouping is needed. Vary from other sections.

## Split section (image + text)
Two columns on desktop, image side alternates. Image has 28px+ radius. Text left-aligned inside the column on desktop, and stacked (image first, then text) on mobile.

## Card
Soft fill (teal-50/teal-100/white depending on section), radius 28px, padding 32px. No border, no shadow. Title Poppins 600, body Poppins 400.

## Accordion (FAQ)
Each item is a rounded (24px) teal-50 block, question in Poppins 600, plus icon on the right rotating to a cross. Answer expands smoothly (see `BFH-animations.md`). Items separated by 12px gap, not lines.

## Steps (Certification process)
Four numbered steps in a row on desktop (stacked on mobile). Numbers in large Plus Jakarta Sans 800, teal-600. Steps connected by a soft teal-200 dotted or solid thin line is NOT allowed if it reads as a border; use spacing only, or a simple arrow icon between steps.

## Form (Contact)
Fields: Name, Phone / WhatsApp, Email, Message. Fill teal-50, no border, pill inputs (textarea 24px radius), 56px tall, labels above in Poppins 600. Submit is the primary button. Show inline validation in orange-700 text and a soft success message on submit.

## Pricing / product tiles
Products page category tiles use soft-fill rounded cards with a title, one-line description and a button. Do not show prices unless provided by the user.

## Live sessions block
A large rounded teal-700 panel with white headline, short text and a soft button. Session dates only appear when supplied by the user.

## Footer
teal-800 background, white text. Logo and tagline on the left, Quick Links in columns, disclaimer text in small type (0.875rem, white at 80% opacity), copyright at the bottom. No divider lines, use spacing. Padding at least 85px top, 48px bottom.

## Disclaimer note (inline)
Short rounded teal-50 block for the medical disclaimer on the Emergency Guide and Certifications pages. See `BFH-compliance.md`.
