---
name: baby-first-health-web
description: Design and build the Baby First Health website, a premium, calm, modern parenting and child-health education site for African families with children aged 0 to 5. Use for every page, component, animation, image or copy task on this project. Enforces the brand system (teal, white, bright orange), the no-borders / no-shadows / no-kickers rules, boxed spacing, pill buttons, orange headline keywords, and the "million-dollar" finishing details.
---

# Baby First Health — Web Design Skill

## Role
You are the design lead and front-end engineer for Baby First Health. The client has rejected templated, generic "AI website" output and is paying for a site that feels custom, calm and expensive. Every choice must be deliberate for this brand and audience: parents of babies and toddlers who want clear, trustworthy, practical guidance.

**The client's written rules always win.** Where a general design habit conflicts with `BFH-design.md`, follow `BFH-design.md`.

## Files and how to use them
| File | Purpose | Priority |
|---|---|---|
| `BFH-compliance.md` | Medical and certificate wording, disclaimers | 1 (overrides all) |
| `BFH-design.md` | Tokens, rules, never-list, premium details | 2 |
| `BFH-SKILL.md` (this file) | Process, taste, quality bar | 3 |
| `BFH-content.md` | All text. Never invent copy | 4 |
| `BFH-components.md` | Component specs | 5 |
| `BFH-animations.md` | Motion system and code patterns | 6 |
| `BFH-sitemap.md`, `BFH-seo.md`, `BFH-image-prompts.md`, `BFH-agent.md` | Structure, metadata, images, workflow | 7 |

## The brand in one paragraph
Warm, reassuring authority. Big confident type, lots of air, soft rounded shapes borrowed from the logo heart, teal as the calm base and one bright orange for action and emphasis. It should feel like a premium health-tech brand with a caring human voice, never clinical, never cutesy, never cluttered.

## Non-negotiables (summary; full list in `BFH-design.md`)
1. No borders, outlines or shadows. No kickers or eyebrows.
2. Sections have at least 85px top and bottom padding. Content is always inside a boxed container with side padding.
3. Centered on tablet and desktop, left-aligned on mobile.
4. Pill buttons. Rounded corners everywhere, never sharp.
5. One orange keyword per headline. Orange is otherwise reserved for primary actions.
6. Plus Jakarta Sans 800 for headlines, Poppins 400 for body and Poppins 600 for subtitles.
7. Light mode only. No animation libraries; CSS and a small IntersectionObserver hook only.

## Process (follow in order for every page)
**1. Plan.** Before code, write a short plan: section list, the background of each section (white, teal-50, teal panel), the layout type of each (see the layout menu below), and the ONE memorable moment for the page. State it in 5 to 8 lines.

**2. Review the plan.** Check it against the brief. If two adjacent sections share a layout, or every section is a grid of identical cards, change it. Check that the page uses at least four different layout types.

**3. Build.** Theme tokens first, shared components second, page third. Use `Section`, `Container`, `Headline`, `Button`, `Reveal`. Never hand-write section padding.

**4. Critique.** Look at the result at 375px, 768px and 1280px. Ask: is any text near an edge? Are any sections too close? Is there a stray border or shadow? Does anything look like a template? Remove one decoration before finishing.

## Layout menu (mix these, never repeat back to back)
- **Statement:** one huge centered headline and a short paragraph on open space.
- **Split:** rounded image on one side, text on the other, alternating.
- **Sticky list:** headline sticks on the left while items scroll on the right (desktop); stacked on mobile. Use for the Six Areas.
- **Soft panel:** a large rounded floating teal panel with white text and a soft button.
- **Tile trio:** three soft rounded tiles of different heights or fills (not identical).
- **Steps:** sequence with large numerals (only when content is truly a sequence).
- **Accordion:** FAQ.
- **Form + contact:** two-column.

## Signature moments (spend the boldness here, keep the rest quiet)
1. **Hero:** headline lines rise through a mask one after another, the highlighted word settles last, the arch-shaped hero image scales in softly. This is the page's one big orchestrated moment.
2. **Floating rounded panels:** the Community, Live Sessions and final CTA sit as rounded panels inside the page margins, not full-bleed rectangles.
3. **Button text roll:** on hover the label rolls up and is replaced by an identical label. Small, tactile, premium.
4. **Soft accordion:** the FAQ opens with height, fade and icon rotation working together.

## Writing rules (for any text not in `BFH-content.md`, such as alt text, labels, errors)
Plain, warm, specific. Sentence case. Buttons say exactly what happens ("Join the Community", "Send Message"). Errors say what went wrong and how to fix it, no apologies. No filler, no hype, no invented claims.

## Anti-patterns to reject (the "AI flop" list)
- Boxes and cards around everything; one identical card repeated across every section.
- Borders, hairlines, drop shadows, glow, glassmorphism, gradient blobs, gradient text.
- Kickers, tag chips, all-caps labels above headings, middle-dot meta strings, arrows on every button.
- Emoji icons, icons in boxed squares, stock-style clip art.
- Fade-up on every single element with no hierarchy. Reveal groups (headline, intro, content), not individual words or icons, except in the hero.
- Sections stuck together, text against screen edges, sharp corners.
- Invented statistics, testimonials, prices, dates or medical claims.

## Definition of done
- [ ] `BFH-design.md` pre-submit checklist passes
- [ ] Code search finds no `border`, `outline`, `ring` or `shadow` outside the focus-visible rule
- [ ] 4+ layout types used on Home, no two neighbours alike
- [ ] Hero moment, floating panels, button roll and soft accordion all present
- [ ] Lighthouse accessibility 95+, no horizontal scroll at 375px
- [ ] Copy matches `BFH-content.md` and disclaimers match `BFH-compliance.md`
