# BFH-DESIGN.md — Baby First Health

Read this file before writing any UI code. Every rule marked **NEVER** or **ALWAYS** is non-negotiable. If a rule here conflicts with a default habit, this file wins.

Mode: **Light mode only** for now. Do not build dark mode.

---

## 1. Design Personality
Professional, sleek, modern, calm, confident. A trustworthy child-health and parenting brand with big bold typography, generous space and smooth motion. It must not look like a generic AI-generated template.

---

## 2. The "No AI Flop" Rules (NEVER list)
- **NEVER** use stroke borders or outlines on anything: buttons, cards, inputs, images, dividers between cards, accordions, navbar. No `border`, no `outline` styling, no `ring` used as a border. (Keyboard focus is the only exception, see Accessibility.)
- **NEVER** use box shadows or drop shadows, including on hover, navbar, modals and dropdowns. No `shadow-*` classes.
- **NEVER** put things in boxes unless the box truly groups related content. Headlines, paragraphs, and most sections sit directly on the section background.
- **NEVER** use kickers, eyebrows or overlines (the small uppercase label above a headline, e.g. "OUR MISSION"). A section starts with its headline.
- **NEVER** use pill "badges" or tag chips above headlines.
- **NEVER** use gradient blobs, glassmorphism, neon glows, or decorative gradient text.
- **NEVER** use emoji as icons.
- **NEVER** use sharp corners. Every button, card, image, input and container is rounded.
- **NEVER** put icons inside boxed squares. Icons sit bare, in teal.
- **NEVER** use a 3-column grid of identical icon cards as the default layout for every section. Vary layouts (see Layout Variety).
- **NEVER** invent copy. All text comes from `BFH-content.md`.
- **NEVER** let text touch the screen edges (see Spacing).

---

## 3. Color System

Brand colors come from the logo: **teal**, **white**, **bright orange**.

### Teal (primary)
| Token | Hex | Use |
|---|---|---|
| teal-50 | #F0FDFA | Alternate section background |
| teal-100 | #CCFBF1 | Soft card fill, icon area tint |
| teal-200 | #99F6E4 | Decorative tint only |
| teal-300 | #5EEAD4 | Decorative tint only |
| teal-400 | #2DD4BF | Accents on dark backgrounds |
| teal-500 | #14B8A6 | Hover states |
| **teal-600** | **#0D9488** | **Brand teal (logo).** Buttons, icons, links |
| teal-700 | #0F766E | Dark section backgrounds, hover on teal-600 |
| teal-800 | #115E59 | Footer, deep sections |
| **teal-900** | **#134E4A** | **Headline text ("dark green")** |
| teal-950 | #042F2E | Body text, text on orange buttons |

### Orange (accent, use sparingly so it stays punchy)
| Token | Hex | Use |
|---|---|---|
| orange-50 | #FFF7ED | Rare soft section tint |
| orange-100 | #FFEDD5 | Rare soft card fill |
| orange-300 | #FDBA74 | Decorative only |
| orange-400 | #FB923C | Highlight words on dark backgrounds |
| **orange-500** | **#F97316** | **Brand orange (logo).** Primary CTA fill |
| **orange-600** | **#EA580C** | **Highlight words on white/light backgrounds** (passes large-text contrast), CTA hover |
| orange-700 | #C2410C | Pressed state |

### Neutrals
White #FFFFFF (base). Body text teal-950. Muted text #3F5F5C (on white). No pure black.

### Color usage rules
- Base page is **white**. Alternate sections between white and teal-50 to create separation without borders.
- One or two sections per page may use a full **teal-700/800 background** with white text (e.g. the Community section and final CTA).
- **Orange is for:** primary CTA buttons, highlighted headline keywords, small accents. Never large orange backgrounds except optionally the final CTA button area.
- **Headline color:** teal-900 on light backgrounds, white on dark backgrounds.
- **Highlighted keyword rule (signature look):** In every headline, wrap the one key word or short phrase in orange. On light backgrounds use `orange-600`; on dark backgrounds use `orange-400`. Only one highlight per headline. Never highlight whole sentences.
- **Contrast:** text on orange buttons is `teal-950`, bold. Do not put white small text on orange.

---

## 4. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headlines (H1, H2) | **Plus Jakarta Sans** | **800 (ExtraBold)** | Massive, bold, modern. Tight tracking (-0.03em), line-height 1.05 to 1.1 |
| Subtitles / subtopics (H3, H4, card titles, button labels, nav links) | **Poppins** | **600 (SemiBold)** | |
| Body text | **Poppins** | **400 (Regular)** | Line-height 1.7 |

Use only these two weight roles for Poppins: **400 for body**, **600 for subtitles**. No other weights.

### Type scale (fluid, use `clamp`)
- H1 (hero): `clamp(2.75rem, 7vw, 5.5rem)`
- H2 (section headline): `clamp(2.25rem, 5vw, 3.75rem)`
- H3 (subtitle): `clamp(1.25rem, 2vw, 1.5rem)`
- Body large (section intro): `1.125rem` to `1.25rem`
- Body: `1rem` (never below 16px)
- Small: `0.875rem` (footer, disclaimers only)

Headlines are large and confident. Section intro paragraphs max width 640px, centered on tablet/desktop.

---

## 5. Shape Language
- **Buttons: fully pill-shaped** (`border-radius: 9999px`).
- **Cards / containers / panels / images: rounded corners**, `28px` on desktop, `24px` on mobile. Large containers (full-width feature panels) `40px`.
- **Inputs / textareas:** `9999px` for single-line inputs, `24px` for textareas.
- **Accordion items:** `24px`.
- No sharp edges anywhere, including images, videos and the mobile menu panel.

---

## 6. Depth Without Borders or Shadows
Separation is created only by:
1. Whitespace.
2. Background color shifts (white / teal-50 / teal-100 / teal-700).
3. Rounded tinted containers (only when grouping is needed).
4. Scale and contrast in typography.

---

## 7. Spacing and Layout

### Section spacing (critical)
- **Every section has at least 85px top padding and 85px bottom padding.**
  - Mobile: `85px` top and bottom
  - Tablet: `100px`
  - Desktop: `120px`
- Never reduce below 85px. Never let two sections feel stacked closely.
- Gap between headline and its intro: 20px to 24px. Between intro and content: 48px to 64px.

### Side padding (boxed layout, critical)
Content never touches the screen edges.
- Mobile: `24px` left and right
- Tablet: `40px` left and right
- Desktop: container `max-width: 1200px`, centered, with `48px` side padding at narrower desktop widths
- Full-width background colors stretch edge to edge, but content stays inside the container.

### Alignment
- **Tablet and desktop:** center-align headlines, subtitles, intro text and CTAs.
- **Mobile (below 768px):** **left-align** all headlines, body text and content. Buttons may be full width.
- Inside multi-column layouts (image beside text) text is left-aligned on desktop too.

### Breakpoints
Mobile `< 768px`, Tablet `768px to 1023px`, Desktop `1024px+`.

### Layout variety
Do not repeat the same layout. Mix: centered text blocks, two-column image and text (alternate sides), large statement sections, soft-tint panels, simple lists, accordion, step sequences.

---

## 8. Components at a glance (details in `BFH-components.md`)
- **Primary button:** orange-500 fill, teal-950 bold text, pill, no border, no shadow. Hover: orange-600 + slight scale up (1.03).
- **Secondary button:** teal-600 fill, white text, pill. Hover teal-700.
- **Soft button (on dark):** white fill, teal-900 text.
- **Cards:** teal-50 or teal-100 fill on white sections; white fill on teal-50 sections. No border, no shadow.
- **Inputs:** teal-50 fill, no border, pill. Focus: fill becomes teal-100 plus the focus ring described below.

---

## 9. Motion (details in `BFH-animations.md`)
CSS-only, no animation libraries. Smooth, soft, premium. Fade-in up, left, right, soft pop-ups, staggered reveals, and smooth height-animated expand/collapse for accordions. Never instant jumps. Respect `prefers-reduced-motion`.

---

## 10. Imagery
- Real, warm photography of African parents and children (see `BFH-image-prompts.md`), rounded corners `28px`+.
- No borders, no shadows on images.
- Images stored in `/public/images/` and referenced by the filenames in `BFH-image-prompts.md`.
- All images need descriptive `alt` text.

---

## 11. Icons
Use one consistent line-icon set (Lucide), 2px stroke, teal-600, no container. Size 28 to 32px.

---

## 12. Accessibility
- Body text contrast at least 4.5:1.
- Keyboard focus is the **only** place an outline is allowed: a 3px `teal-600` focus ring with 3px offset, on `:focus-visible` only.
- Tap targets at least 48px tall.
- Respect `prefers-reduced-motion`.
- Semantic HTML: one H1 per page, logical heading order.

---

## 13. Pre-Submit Checklist
Before finishing any page, confirm:
- [ ] Zero borders, outlines or shadows in the code
- [ ] No kickers or eyebrow labels
- [ ] Every headline has one orange highlighted keyword
- [ ] Sections have at least 85px top and bottom padding
- [ ] Side padding present on mobile, tablet and desktop
- [ ] Mobile is left-aligned, tablet/desktop centered
- [ ] All buttons are pills, all containers rounded
- [ ] Animations present and smooth; FAQ expands softly
- [ ] All copy matches `BFH-content.md`

---

## 14. Premium Details (the "million-dollar" layer)

**Radius hierarchy** (avoid one radius on everything): buttons and inputs `9999px`; small tiles `24px`; cards and images `32px`; hero arch image `999px 999px 40px 40px`; floating panels `48px` desktop / `32px` mobile.

**Floating panels.** Community, Live Sessions and the final CTA are rounded teal panels inset from the screen edges (16px mobile, 24px tablet/desktop margin), not full-bleed rectangles. The footer is a teal-800 panel with rounded top corners.

**Brand shape motif.** Reuse the logo's heart and orange plus as quiet decoration: one oversized teal-50 or teal-100 heart partly cropped off the edge behind the hero and the final CTA, and one small orange plus near the hero image. Solid fills only, no gradients. Maximum two plus accents per page.

**Arch hero image.** The hero photo uses a tall arch mask (`border-radius: 999px 999px 40px 40px`). Secondary images use plain rounded rectangles.

**Navbar.** Floating rounded bar inset 12px from the top. Transparent at the top of the page. After 40px of scroll it fills with teal-50 (no shadow, no border) with a soft blur-free transition. Logo left, links center, orange button right.

**Type finishing.** `text-wrap: balance` on all headlines, `text-wrap: pretty` on paragraphs, headline tracking `-0.03em`, paragraph max width 60ch to 65ch. Numerals use `font-variant-numeric: tabular-nums`.

**Buttons.** Label roll on hover (see `BFH-animations.md`), 56px height, 32px horizontal padding, generous click area. No arrow glyph appended by default.

**Parallax and depth without shadows.** Images move slightly slower than the page inside their rounded frames (scroll-driven CSS, 6% travel). Overlapping shapes (heart behind image, plus in front) create depth.

**Selection and scrollbar.** `::selection` teal-200 background with teal-950 text. Thin rounded scrollbar in teal-300 on desktop.

**Smooth scroll.** `scroll-behavior: smooth`, `scroll-padding-top: 96px` so anchors clear the navbar.

**Perceived speed.** Hero image loads eagerly with correct width/height to avoid layout shift, all other images `loading="lazy"`, fonts use `display=swap`, and images are WebP or optimized JPG under 250 KB.

**Restraint.** Spend boldness in one place per page (the hero moment). Everything else stays quiet. Before finishing a page, remove one decoration.
