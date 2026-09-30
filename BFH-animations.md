# BFH-ANIMATIONS.md — Baby First Health

**No animation libraries.** Everything is CSS plus one tiny IntersectionObserver hook. This runs anywhere, including Google AI Studio, and keeps the site fast.

Motion is smooth, soft and premium. Nothing snaps or bounces. Motion should either draw attention to one thing or answer a user action.

## Tokens
```css
:root {
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --t-reveal: 800ms;
  --t-small: 250ms;
  --t-accordion: 450ms;
  --stagger: 100ms;
}
```
Travel distance: 32px desktop, 24px mobile.

## Hierarchy (avoid "everything fades up")
1. **One signature moment per page:** the hero sequence.
2. **Group reveals:** each section reveals as groups (headline, then intro, then content, then button), not every icon and sentence individually.
3. **Answering the user:** hover, press, open/close. These are always allowed.

## Reveal types (trigger once at 15% visibility)
| Class | Effect | Use on |
|---|---|---|
| `.reveal-up` | opacity 0 to 1, translateY 32px to 0 | Headlines, paragraphs, default |
| `.reveal-left` | opacity 0 to 1, translateX -40px to 0 | Left column in split layouts |
| `.reveal-right` | opacity 0 to 1, translateX 40px to 0 | Right column in split layouts |
| `.reveal-pop` | opacity 0 to 1, scale 0.94 to 1 | Images, panels, CTA buttons |
| `.stagger > *` | children reveal 100ms apart | Lists, tile groups, steps |

On mobile, left/right reveals become `reveal-up` (prevents horizontal overflow). Set `overflow-x: clip` on the page wrapper.

```css
.reveal { opacity: 0; transition: opacity var(--t-reveal) var(--ease), transform var(--t-reveal) var(--ease); transition-delay: var(--delay, 0ms); }
.reveal-up    { transform: translateY(32px); }
.reveal-left  { transform: translateX(-40px); }
.reveal-right { transform: translateX(40px); }
.reveal-pop   { transform: scale(0.94); }
.reveal.is-visible { opacity: 1; transform: none; }
```

### useReveal hook (React)
```tsx
import { useEffect, useRef } from "react";
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-visible"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}
```
Stagger: set `style={{"--delay": `${i*100}ms`}}` on each child.

## Hero sequence (page load)
1. Headline lines rise through a mask, 120ms apart (each line wrapped in an `overflow: hidden` span with an inner span moving from `translateY(110%)` to `0`).
2. The orange highlighted word finishes last with a tiny scale from 0.96 to 1.
3. Intro paragraph fades up at 500ms, button pops in at 650ms.
4. Arch image scales from 0.94 to 1 and fades in at 250ms. The cropped heart behind it drifts 24px into place.
5. The small orange plus pops in last at 900ms, then does nothing else.

## Button text roll
```css
.btn .label { display:inline-block; overflow:hidden; height:1.5em; line-height:1.5em; }
.btn .label span { display:block; transition: transform var(--t-small) var(--ease); }
.btn:hover .label span { transform: translateY(-100%); }
```
Markup: `<span class="label"><span>Join the Community</span><span aria-hidden="true">Join the Community</span></span>` (the two spans stack vertically). Also on hover: background shifts one shade and the button scales to 1.03; on press scale 0.98.

## Accordion (FAQ) — soft expand
```css
.acc-panel { display:grid; grid-template-rows:0fr; transition: grid-template-rows var(--t-accordion) var(--ease); }
.acc-panel > div { overflow:hidden; opacity:0; transform:translateY(8px); transition: opacity 350ms var(--ease), transform 350ms var(--ease); }
.acc-item[data-open="true"] .acc-panel { grid-template-rows:1fr; }
.acc-item[data-open="true"] .acc-panel > div { opacity:1; transform:none; transition-delay:80ms; }
.acc-icon { transition: transform 300ms var(--ease); }
.acc-item[data-open="true"] .acc-icon { transform: rotate(45deg); }
```
Never use `display: none` toggling. Use `aria-expanded` and `aria-controls` on the trigger. One item open at a time.

## Navbar
- On scroll past 40px: background transitions transparent to teal-50 over 300ms.
- Mobile menu: panel drops down and fades in over 350ms, links stagger in 60ms apart, hamburger morphs into X. Closing reverses smoothly.

## Cards, tiles and images
- Tile hover: `translateY(-6px)` and a fill shift (for example teal-50 to teal-100). No shadow.
- Feature tile hover option: fill floods from teal-50 to teal-600 and text turns white over 350ms.
- Images inside rounded frames: hover zoom to 1.04 in an `overflow: hidden` container, 700ms.
- Subtle parallax inside frames (progressive enhancement):
```css
@supports (animation-timeline: view()) {
  .parallax img { animation: drift linear both; animation-timeline: view(); animation-range: cover; }
  @keyframes drift { from { transform: translateY(-6%) scale(1.12);} to { transform: translateY(6%) scale(1.12);} }
}
```

## Sticky list (Six Areas)
Left column `position: sticky; top: 120px`. Right column items use `.reveal-up`. Sticky is disabled below 1024px.

## Page transitions
Fade the page container in over 300ms on route change and scroll to top.

## Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after { animation-duration:0.01ms !important; transition-duration:150ms !important; scroll-behavior:auto !important; }
  .reveal { transform:none !important; }
}
```

## Performance
Animate only `transform` and `opacity` (plus the grid-rows accordion). Never animate `width`, `top` or `box-shadow`. Use `will-change: transform` sparingly.
