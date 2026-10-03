import { BlogPost, BlogPostFrontmatter, BlogCategory, BlogSource, BlogAffiliateItem } from '../types/blog';

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Child Health',
  'Parenting & Psychology',
  'Nutrition & Development',
  'Safety & First Aid',
  'Myths & Safe Parenting',
  'Family Wellbeing',
];

/**
 * Lightweight frontmatter parser for blog posts
 */
function parseFrontmatter(rawContent: string): { data: Partial<BlogPostFrontmatter>; content: string } {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) {
    return { data: {}, content: normalized.trim() };
  }

  const endOfFrontmatter = normalized.indexOf('\n---', 3);
  if (endOfFrontmatter === -1) {
    return { data: {}, content: normalized.trim() };
  }

  const frontmatterStr = normalized.slice(3, endOfFrontmatter).trim();
  const bodyContent = normalized.slice(endOfFrontmatter + 4).trim();
  const data: Record<string, any> = {};

  const lines = frontmatterStr.split('\n');
  let currentKey = '';
  let inSourcesList = false;
  let inAffiliateList = false;
  let currentSourceItem: Partial<BlogSource> | null = null;
  let currentAffiliateItem: Partial<BlogAffiliateItem> | null = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check for array list start
    if (trimmed.startsWith('sources:')) {
      inSourcesList = true;
      inAffiliateList = false;
      data.sources = [];
      continue;
    }

    if (trimmed.startsWith('affiliate:')) {
      inAffiliateList = true;
      inSourcesList = false;
      data.affiliate = [];
      continue;
    }

    if (inSourcesList) {
      if (rawLine.startsWith('  - ') || rawLine.startsWith('- ')) {
        if (currentSourceItem && currentSourceItem.name && currentSourceItem.title) {
          data.sources.push(currentSourceItem as BlogSource);
        }
        currentSourceItem = {};
        const rest = trimmed.replace(/^-\s*/, '');
        if (rest.includes(':')) {
          const [k, ...v] = rest.split(':');
          const cleanK = k.trim();
          const cleanV = v.join(':').trim().replace(/^["']|["']$/g, '');
          (currentSourceItem as any)[cleanK] = cleanV;
        }
        continue;
      } else if (rawLine.startsWith('    ') && currentSourceItem) {
        const [k, ...v] = trimmed.split(':');
        const cleanK = k.trim();
        const cleanV = v.join(':').trim().replace(/^["']|["']$/g, '');
        (currentSourceItem as any)[cleanK] = cleanV;
        continue;
      } else if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
        if (currentSourceItem && currentSourceItem.name && currentSourceItem.title) {
          data.sources.push(currentSourceItem as BlogSource);
        }
        currentSourceItem = null;
        inSourcesList = false;
      }
    }

    if (inAffiliateList) {
      if (rawLine.startsWith('  - ') || rawLine.startsWith('- ')) {
        if (currentAffiliateItem && currentAffiliateItem.title && currentAffiliateItem.url) {
          data.affiliate.push(currentAffiliateItem as BlogAffiliateItem);
        }
        currentAffiliateItem = {};
        const rest = trimmed.replace(/^-\s*/, '');
        if (rest.includes(':')) {
          const [k, ...v] = rest.split(':');
          const cleanK = k.trim();
          const cleanV = v.join(':').trim().replace(/^["']|["']$/g, '');
          (currentAffiliateItem as any)[cleanK] = cleanV;
        }
        continue;
      } else if (rawLine.startsWith('    ') && currentAffiliateItem) {
        const [k, ...v] = trimmed.split(':');
        const cleanK = k.trim();
        const cleanV = v.join(':').trim().replace(/^["']|["']$/g, '');
        (currentAffiliateItem as any)[cleanK] = cleanV;
        continue;
      } else if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
        if (currentAffiliateItem && currentAffiliateItem.title && currentAffiliateItem.url) {
          data.affiliate.push(currentAffiliateItem as BlogAffiliateItem);
        }
        currentAffiliateItem = null;
        inAffiliateList = false;
      }
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      currentKey = trimmed.slice(0, colonIndex).trim();
      let value = trimmed.slice(colonIndex + 1).trim();

      // strip quotes
      value = value.replace(/^["']|["']$/g, '');

      if (value === 'true') {
        data[currentKey] = true;
      } else if (value === 'false') {
        data[currentKey] = false;
      } else {
        data[currentKey] = value;
      }
    }
  }

  // Push remaining list items if any
  if (currentSourceItem && currentSourceItem.name && currentSourceItem.title && Array.isArray(data.sources)) {
    data.sources.push(currentSourceItem as BlogSource);
  }
  if (currentAffiliateItem && currentAffiliateItem.title && currentAffiliateItem.url && Array.isArray(data.affiliate)) {
    data.affiliate.push(currentAffiliateItem as BlogAffiliateItem);
  }

  return { data, content: bodyContent };
}

/**
 * Convert markdown to clean semantic HTML matching BFH design standards.
 * (No borders, no shadows, rounded corners, clean hierarchy)
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let inList = false;
  let inOrderedList = false;

  const closeLists = () => {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
    if (inOrderedList) {
      htmlParts.push('</ol>');
      inOrderedList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      closeLists();
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      closeLists();
      const text = formatInlineMarkdown(line.slice(4));
      htmlParts.push(`<h3 class="font-body font-semibold text-teal-900 text-xl md:text-2xl mt-8 mb-3">${text}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeLists();
      const text = formatInlineMarkdown(line.slice(3));
      htmlParts.push(`<h2 class="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight mt-12 mb-4">${text}</h2>`);
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        closeLists();
        htmlParts.push('<ul class="space-y-2.5 my-4 pl-5 list-disc text-teal-950/85">');
        inList = true;
      }
      const itemText = formatInlineMarkdown(line.slice(2));
      htmlParts.push(`<li class="leading-relaxed">${itemText}</li>`);
      continue;
    }

    // Ordered list
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (!inOrderedList) {
        closeLists();
        htmlParts.push('<ol class="space-y-2.5 my-4 pl-5 list-decimal text-teal-950/85">');
        inOrderedList = true;
      }
      const itemText = formatInlineMarkdown(numMatch[2]);
      htmlParts.push(`<li class="leading-relaxed pl-1">${itemText}</li>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      closeLists();
      const quoteText = formatInlineMarkdown(line.slice(2));
      htmlParts.push(
        `<blockquote class="bg-teal-50 rounded-[24px] p-6 my-6 font-body text-teal-950 text-base italic leading-relaxed">${quoteText}</blockquote>`
      );
      continue;
    }

    // Standard paragraph
    closeLists();
    const paraText = formatInlineMarkdown(line);
    htmlParts.push(`<p class="font-body text-base md:text-lg text-teal-950/85 leading-relaxed my-4">${paraText}</p>`);
  }

  closeLists();
  return htmlParts.join('\n');
}

/**
 * Handle inline markdown tokens: bold, italic, links, codes
 */
function formatInlineMarkdown(text: string): string {
  let res = text;
  // Bold: **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-teal-950">$1</strong>');
  // Italic: *text*
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  // Links: [label](url)
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, (_match, label, url) => {
    const isExternal = url.startsWith('http');
    const isAffiliate = url.includes('amzn.to') || url.includes('affiliate') || url.includes('partner');
    const rel = isAffiliate
      ? 'rel="sponsored noopener noreferrer"'
      : isExternal
      ? 'rel="noopener noreferrer"'
      : '';
    const target = isExternal ? 'target="_blank"' : '';
    return `<a href="${url}" ${target} ${rel} class="text-teal-700 underline underline-offset-4 decoration-teal-300 hover:text-orange-600 transition-colors font-semibold">${label}</a>`;
  });
  return res;
}

/**
 * Estimate reading time in minutes based on word count
 */
function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const wpm = 200;
  return Math.max(1, Math.ceil(words / wpm));
}

// Vite glob import for all markdown files in /content/blog/*.md
const markdownFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Parse all blog posts from markdown files
 */
export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path];
    const { data, content } = parseFrontmatter(rawContent);

    if (!data.slug || !data.title) continue;

    const post: BlogPost = {
      title: data.title || 'Untitled Post',
      slug: data.slug,
      description: data.description || '',
      category: (data.category as BlogCategory) || 'Child Health',
      date: data.date || '2026-10-01',
      author: data.author || 'Baby First Health Team',
      writtenBy: data.writtenBy,
      reviewed: Boolean(data.reviewed),
      reviewedBy: data.reviewedBy,
      coverImage: data.coverImage || '/images/nutrition-feeding.jpg',
      coverAlt: data.coverAlt || data.title || '',
      highlight: data.highlight,
      sources: data.sources || [],
      affiliate: data.affiliate || [],
      isSample: Boolean(data.isSample || data.title?.includes('[Sample Post]')),
      content,
      htmlContent: markdownToHtml(content),
      readingTimeMinutes: calculateReadingTime(content),
    };

    posts.push(post);
  }

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug || (slug === 'introduce-solid-foods-sample' && p.slug === 'how-to-introduce-solid-foods'));
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase().replace(/\s+/g, '-') ||
           p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const posts = getAllBlogPosts();
  const others = posts.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const remaining = others.filter((p) => p.category !== category);
  return [...sameCategory, ...remaining].slice(0, limit);
}
