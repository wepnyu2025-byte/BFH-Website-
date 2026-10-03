# BFH-blog.md — Baby First Health Blog

Read `BFH-compliance.md`, `BFH-design.md` and `BFH-SKILL.md` first. Everything in those files applies to the blog. This file adds blog-specific rules. If there is a conflict, `BFH-compliance.md` wins, then the WHO rule below, then `BFH-design.md`.

---

## 1. Two jobs for the AI
1. **Build the blog system once** (routes, layouts, template, SEO, sitemap). Do NOT write or publish any posts during this job except one sample post, clearly marked as a sample.
2. **Write posts one at a time, only when asked**, following the writing workflow in section 6.

---

## 2. Health accuracy rules (non-negotiable)

**WHO alignment.** No post may contradict World Health Organization guidance. If another source disagrees with WHO, follow WHO and flag the difference for the human reviewer.

**Approved sources, in priority order:**
1. World Health Organization (WHO)
2. UNICEF
3. The health ministry or national guidelines of the reader's country (for example, Nigeria, Ghana, Kenya, Cameroon)
4. CDC and the American Academy of Pediatrics (AAP)
5. Peer-reviewed research and major health institutions

Never use blogs, forums, social media, product pages or unnamed "studies" as a source for a health claim.

**Verify before writing.** Before recommending anything (a feeding practice, a warning sign, an age, a quantity, a safety step), the AI must check it against an approved source above. If the AI has web search or grounding available, it must use it. If it does not, it must only state well-established guidance and mark every uncertain claim in the review list (section 6, step 6).

**No hallucination.**
- Never invent statistics, studies, quotes, guideline numbers, medication names, doses or source links.
- Never invent a URL. Only cite sources it can actually name and describe accurately. If unsure, write "Source to be confirmed" in the review list instead of guessing.
- If it cannot verify something, leave it out or flag it. Leaving it out is always better than guessing.

**Safety lines.**
- No diagnosis, no treatment plans, no medication doses, no "home cures" for illness.
- Every post about symptoms includes a clear "When to see a doctor" section.
- No fear-based or shaming language toward parents.
- Do not use affiliate links on emergency, symptom or medical-advice posts.

**Human review.** Every post is reviewed by Dolly Kelly, SRN, before publishing. The AI never marks a post as "Medically reviewed" itself. That label is only added when Dolly has approved it (`reviewed: true` in the post).

---

## 3. Routes
| Page | Route |
|---|---|
| Blog home | `/blog` |
| Single post | `/blog/:slug` |
| Category | `/blog/category/:category` |

Categories (the six content areas): Child Health, Parenting & Psychology, Nutrition & Development, Safety & First Aid, Myths & Safe Parenting, Family Wellbeing.

---

## 4. Layout (follow `BFH-design.md`: no borders, no shadows, no kickers)

**Blog home**
- Headline with one orange keyword, short intro.
- Category filter as soft pill buttons (teal-50 fill, active = teal-600 with white text). No borders.
- One large featured post (rounded image, title, short summary).
- Below it, a grid of posts with varied tile sizes, rounded 32px images, title in Poppins 600, short excerpt, reading time.
- Load more button (pill) instead of numbered pagination.
- A floating rounded teal panel near the end inviting readers to join the community.

**Post page**
- Large headline (Plus Jakarta Sans 800) with one orange keyword, centered on tablet/desktop, left-aligned on mobile.
- Author and date line, reading time. Show Dolly's name and SRN only when she wrote or reviewed the post.
- Rounded cover image.
- Article column 65 characters wide (about 680px), Poppins 400, line-height 1.8. Subheadings in Poppins 600. No boxes around normal text.
- Key takeaways at the top as a soft teal-50 rounded block (this is a genuine grouping).
- "When to see a doctor" as a soft orange-50 rounded block.
- Sources list at the end, in small text.
- Medical disclaimer from the footer, repeated at the end of the article.
- "Keep reading": 3 related posts.
- Soft closing CTA: join the community (primary button).
- Reading progress: a thin teal bar at the very top of the page (no border, no shadow).

---

## 5. Posts as Markdown files
Posts live in `/content/blog/*.md`. Adding a post means adding a file, with no code edits.

```
---
title: "How to Introduce Solid Foods to Your Baby"
slug: "introduce-solid-foods"
description: "Meta description, 140 to 160 characters."
category: "Nutrition & Development"
date: "2026-10-15"
author: "Baby First Health Team"
writtenBy: ""            # optional, e.g. "Dolly Kelly, SRN"
reviewed: false          # true only after Dolly approves
reviewedBy: ""           # "Dolly Kelly, SRN" when reviewed
coverImage: "/images/blog/introduce-solid-foods.jpg"
coverAlt: "Describe the image"
sources:
  - name: "World Health Organization"
    title: "Exact page or document title"
    url: "https://..."   # only if verified, otherwise leave out
affiliate: []            # see section 7
---
Post body in Markdown...
```

Headline orange keyword in posts: write the title normally and mark the keyword in the post front matter with `highlight: "solid foods"`.

**Post structure (every post):**
1. Short intro that names the parent's problem in 2 to 3 sentences
2. Key takeaways (3 to 5 bullets)
3. Clear sections with H2/H3 subheadings, practical steps, plain words
4. "When to see a doctor"
5. Short summary
6. Sources
7. Disclaimer

Length: 900 to 1,500 words. Plain English, short paragraphs, warm and supportive.

---

## 6. Writing workflow (when the user says "write a post")

**Step 1. Ask before writing.** The AI must ask the user these questions and wait for the answers:
1. **Topic and title**, and the country the readers are in (affects guidelines and foods).
2. **How many images** the post needs (cover image plus inline images). The AI then provides an image prompt for each, using the style block in `BFH-image-prompts.md`, with exact filenames.
3. **Affiliate or product links.** Ask: "Do you want affiliate or product links in this post?" If yes, follow section 7.

**Step 2. Research.** Check the topic against the approved sources. Note which source supports each key claim.

**Step 3. Draft** the post in the format in section 5.

**Step 4. Self-review.** Re-read the draft line by line against the sources. Remove or flag anything that cannot be verified, anything that contradicts WHO, any dose, diagnosis, or invented number, and any fear-based phrasing.

**Step 5. Produce the file** as a Markdown file with `reviewed: false`.

**Step 6. Give a review list for Dolly** with: every health claim in the post and its source, anything flagged "to be confirmed", and any place where local guidelines might differ.

---

## 7. Affiliate and product links

**The AI must not ask for a random link. It must first tell the user exactly what to look for.**

1. After choosing the topic, the AI suggests the **specific type of product and a matching book or product title** that genuinely fits the post. Example: for a post on introducing solid foods, it suggests a weaning recipe book or a feeding set, names the title, and explains why it fits.
2. It then asks the user to provide the affiliate or product link for that exact title (or to suggest their own product and confirm it fits).
3. If the user gives a link that does not match the topic, the AI says so and asks for a better match. It never forces a mismatch into the post.
4. Only recommend products that are safe, age-appropriate and genuinely useful. No health claims about a product beyond what the seller and the approved sources support. No "cures", "treats" or "prevents" language.
5. Place the recommendation naturally, once or twice per post, in a soft rounded teal-50 block titled in Poppins 600. No pushy sales language, no countdowns, no fake urgency.
6. **Disclosure is mandatory.** Above the first affiliate link, add: "This post contains affiliate links. If you buy through them, Baby First Health may earn a small commission at no extra cost to you."
7. All affiliate links use `rel="sponsored noopener noreferrer"` and open in a new tab.
8. No affiliate links on emergency, symptom or medical-advice posts.

Front matter format for affiliate items:
```
affiliate:
  - title: "Exact product or book title"
    url: "https://..."
    whyItFits: "One sentence tying it to the post topic"
```

---

## 8. SEO and discoverability
- Unique `<title>` (under 60 characters) and meta description for every post.
- One H1 per page, logical H2/H3 order.
- **Canonical tag** on every page pointing to the site's primary URL. Read the domain from a single `SITE_URL` setting so it can be changed once when the custom domain is connected.
- Open Graph and Twitter tags with the cover image, so links look right on WhatsApp, Facebook and X.
- `Article` structured data (headline, image, date, author, publisher).
- Auto-generated `sitemap.xml` (home, all pages, all posts, categories) and `robots.txt` pointing to it.
- Descriptive alt text on all images. Images compressed under 250 KB. `loading="lazy"` except the cover.
- Internal links: each post links to 2 to 3 related posts and to Community or Products where relevant.
- Clean, readable URLs. No dates in URLs.

### Pre-rendering (important)
The site is a React single-page app. Posts must reach Google and social-media crawlers as real HTML.
- Add build-time pre-rendering (static generation) so each blog page is output as a complete HTML file, for example with `vite-react-ssg` or an equivalent Vite-compatible tool.
- Confirm by viewing the page source of a built post: the title, headline and article text must be visible in the raw HTML.
- Keep `/* /index.html 200` in Netlify's `_redirects` for any non-pre-rendered routes.

---

## 9. Starter topics (titles only; write one at a time when asked)

**Child Health:** Understanding Your Baby's Vaccination Schedule · Everyday Hygiene That Protects Your Baby · Fever in Children: Signs Parents Should Know · Diarrhoea and Dehydration: What to Watch For · Caring for Your Baby's Teeth from the Start

**Parenting & Psychology:** Why Toddlers Have Tantrums and How to Respond · Positive Discipline for Children Under Five · Building Your Baby's Bond Through Play · Helping Your Child Handle Big Feelings · Screen Time for Young Children

**Nutrition & Development:** Exclusive Breastfeeding: What Parents Should Know · Introducing Solid Foods at the Right Time · Healthy Local Foods for Babies and Toddlers · Developmental Milestones from Birth to Five · Helping a Picky Eater

**Safety & First Aid:** Childproofing Your Home Room by Room · Preventing Burns in the Kitchen · Choking Awareness for Parents · Safe Sleep for Babies · Keeping Medicines and Chemicals Out of Reach

**Myths & Safe Parenting:** Common Baby Care Myths Parents Hear · Traditional Practices: What Helps and What Can Harm · Why Babies Should Not Be Given Herbal Mixtures Without Advice · Teething Myths

**Family Wellbeing:** Sleep and Routine for the Whole Family · Looking After Yourself as a New Parent · Sharing Parenting Responsibilities · Talking to Older Children About a New Baby

Launch with 5 to 8 of these, then publish 1 to 2 per week. Do not publish dozens at once.

---

## 10. Launch and domain checklist
1. Connect the custom domain in Netlify and set it as the primary domain (Netlify then 301-redirects the `netlify.app` address).
2. Update `SITE_URL` so every canonical tag, sitemap entry and Open Graph URL uses the new domain.
3. Add the new domain to Google Search Console and submit `sitemap.xml`.
4. After each new post is deployed, paste its URL into Search Console and click "Request indexing".
5. Check the post's source in the browser to confirm it is pre-rendered.
6. Keep the redirect active for at least a year.

---

## 11. Definition of done (blog system)
- [ ] `/blog`, `/blog/:slug` and category pages work, with no borders, shadows or kickers
- [ ] One clearly marked sample post only
- [ ] Posts load from Markdown files
- [ ] Canonical, Open Graph, structured data, sitemap and robots.txt all present
- [ ] Pre-rendered HTML verified in page source
- [ ] Sources, disclaimer and "When to see a doctor" sections render on posts
- [ ] Affiliate disclosure and `rel="sponsored"` supported
