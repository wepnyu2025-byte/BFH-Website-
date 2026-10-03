# BFH-AGENT.md — Baby First Health

You are building the Baby First Health website: a digital parenting and child-health education platform for African families with children aged 0 to 5.

## Read order (always, before any code)
1. `BFH-agent.md` (this file)
2. `BFH-SKILL.md` (the master design skill: process, taste, quality bar)
3. `BFH-design.md`
4. `BFH-content.md` (the single source of truth for all text)
5. `BFH-sitemap.md`
6. `BFH-components.md`
7. `BFH-animations.md`
8. `BFH-compliance.md`
9. `BFH-seo.md`
10. `BFH-image-prompts.md` (for image filenames and placement)
11. `BFH-blog.md` (only when building or writing for the blog)

If two files disagree: `BFH-compliance.md` wins, then `BFH-design.md`, then `BFH-SKILL.md`, then everything else.

## Stack
- React + Vite + TypeScript
- Tailwind CSS (configure brand colors and fonts as theme tokens from `BFH-design.md`)
- `react-router-dom` for pages
- **No animation libraries.** Do not install Framer Motion, GSAP or AOS. Use CSS transitions and keyframes plus a small `useReveal` hook built on IntersectionObserver (see `BFH-animations.md`)
- `lucide-react` for icons
- Google Fonts: Plus Jakarta Sans (800) and Poppins (400, 600)
- Light mode only

## Project structure
```
/public
  /images          <- generated photos (filenames in BFH-image-prompts.md)
  BFH-logo.svg
  BFH-favicon.svg
/src
  /components      <- Navbar, Footer, Button, Section, Accordion, RevealOnScroll, etc.
  /pages           <- Home, About, Community, Products, EmergencyGuide, Certifications, LiveSessions, FAQ, Contact
  /content         <- text pulled from BFH-content.md, kept in one place
  index.css        <- theme tokens and global rules
```

## Hard rules
1. **No borders. No outlines. No box shadows.** Anywhere. Search your own code for `border`, `outline`, `ring`, `shadow` before finishing. The only allowed exception is the keyboard `:focus-visible` ring.
2. **No kickers or eyebrow labels** above headlines.
3. **Every headline gets one orange highlighted keyword** (see `BFH-design.md`).
4. **Section padding of at least 85px top and bottom.** Use a single reusable `Section` component so this cannot be forgotten.
5. **Side padding on all screens.** Use a single reusable `Container` component.
6. **Center-aligned on tablet and desktop, left-aligned on mobile.**
7. **Pills for buttons, rounded corners for everything else.** No sharp edges.
8. **Never invent copy.** Use text from `BFH-content.md` exactly. If text is missing, leave a clearly marked `TODO` and tell the user.
9. **Never invent medical claims, statistics, testimonials, prices or member counts.**
10. Follow `BFH-compliance.md` for disclaimers and certificate wording.
11. Reuse components. Do not copy-paste section markup.
12. Mobile first. Test at 375px, 768px and 1280px widths.

## Workflow
1. Set up theme tokens (colors, fonts, radii, spacing) from `BFH-design.md` first.
2. Build shared components: `Container`, `Section`, `Button`, `Headline` (supports the orange highlight), `Reveal`, `Accordion`, `Navbar`, `Footer`.
3. Before building each page, write the short plan required by `BFH-SKILL.md` (sections, backgrounds, layout types, the memorable moment). Then build the Home page fully and stop for review.
4. Build remaining pages one at a time, in the order in `BFH-sitemap.md`.
5. After each page, run the pre-submit checklist at the end of `BFH-design.md` and the definition of done in `BFH-SKILL.md`.

## Headline highlight pattern
Headlines are written in `BFH-content.md` with the highlighted keyword wrapped in `{{double braces}}`. Render those words in the accent color. Example: `Better Care Starts With {{Better Knowledge}}.`

## Code standards
- Clean, typed, readable components. Small files.
- Semantic HTML (`header`, `main`, `section`, `footer`, `nav`, `button`).
- Accessible labels on all form fields and buttons.
- No unused dependencies. No placeholder Lorem ipsum.
- Forms: contact form is front-end only unless the user provides a backend or service. Add validation and a friendly success message.

## Before every reply
Tell the user in 2 to 3 sentences what you built, which rules from `BFH-design.md` you applied, and anything you had to assume.
