import fs from 'node:fs';
import path from 'node:path';

// Root directory
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'blog');

// Single source of truth for site domain (auto-detects custom domain from Netlify URL or VITE_SITE_URL)
const SITE_URL = (process.env.VITE_SITE_URL || process.env.URL || 'https://babyfirsthealth.netlify.app').replace(/\/+$/, '');
const SITE_BRAND = 'Baby First Health';

interface Source {
  name: string;
  title: string;
  url?: string;
}

interface AffiliateItem {
  title: string;
  url: string;
  whyItFits: string;
}

interface ParsedPost {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  author: string;
  writtenBy?: string;
  reviewed: boolean;
  reviewedBy?: string;
  coverImage: string;
  coverAlt: string;
  highlight?: string;
  sources: Source[];
  affiliate: AffiliateItem[];
  isSample: boolean;
  rawMarkdown: string;
  htmlContent: string;
}

const CATEGORIES = [
  'Child Health',
  'Parenting & Psychology',
  'Nutrition & Development',
  'Safety & First Aid',
  'Myths & Safe Parenting',
  'Family Wellbeing',
];

function parseFrontmatterSimple(fileContent: string): { data: Record<string, any>; body: string } {
  const normalized = fileContent.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) {
    return { data: {}, body: normalized.trim() };
  }

  const endOfFrontmatter = normalized.indexOf('\n---', 3);
  if (endOfFrontmatter === -1) {
    return { data: {}, body: normalized.trim() };
  }

  const frontmatterStr = normalized.slice(3, endOfFrontmatter).trim();
  const body = normalized.slice(endOfFrontmatter + 4).trim();
  const data: Record<string, any> = {};

  const lines = frontmatterStr.split('\n');
  let inSources = false;
  let inAffiliate = false;
  let currentSource: Partial<Source> | null = null;
  let currentAffiliate: Partial<AffiliateItem> | null = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('sources:')) {
      inSources = true;
      inAffiliate = false;
      data.sources = [];
      continue;
    }

    if (trimmed.startsWith('affiliate:')) {
      inAffiliate = true;
      inSources = false;
      data.affiliate = [];
      continue;
    }

    if (inSources) {
      if (rawLine.startsWith('  - ') || rawLine.startsWith('- ')) {
        if (currentSource && currentSource.name && currentSource.title) {
          data.sources.push(currentSource as Source);
        }
        currentSource = {};
        const rest = trimmed.replace(/^-\s*/, '');
        if (rest.includes(':')) {
          const [k, ...v] = rest.split(':');
          (currentSource as any)[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '');
        }
        continue;
      } else if (rawLine.startsWith('    ') && currentSource) {
        const [k, ...v] = trimmed.split(':');
        (currentSource as any)[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '');
        continue;
      } else if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
        if (currentSource && currentSource.name && currentSource.title) {
          data.sources.push(currentSource as Source);
        }
        currentSource = null;
        inSources = false;
      }
    }

    if (inAffiliate) {
      if (rawLine.startsWith('  - ') || rawLine.startsWith('- ')) {
        if (currentAffiliate && currentAffiliate.title && currentAffiliate.url) {
          data.affiliate.push(currentAffiliate as AffiliateItem);
        }
        currentAffiliate = {};
        const rest = trimmed.replace(/^-\s*/, '');
        if (rest.includes(':')) {
          const [k, ...v] = rest.split(':');
          (currentAffiliate as any)[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '');
        }
        continue;
      } else if (rawLine.startsWith('    ') && currentAffiliate) {
        const [k, ...v] = trimmed.split(':');
        (currentAffiliate as any)[k.trim()] = v.join(':').trim().replace(/^["']|["']$/g, '');
        continue;
      } else if (!rawLine.startsWith(' ') && !rawLine.startsWith('\t')) {
        if (currentAffiliate && currentAffiliate.title && currentAffiliate.url) {
          data.affiliate.push(currentAffiliate as AffiliateItem);
        }
        currentAffiliate = null;
        inAffiliate = false;
      }
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim();
      let value = trimmed.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      if (value === 'true') data[key] = true;
      else if (value === 'false') data[key] = false;
      else data[key] = value;
    }
  }

  if (currentSource && currentSource.name && currentSource.title && Array.isArray(data.sources)) {
    data.sources.push(currentSource as Source);
  }
  if (currentAffiliate && currentAffiliate.title && currentAffiliate.url && Array.isArray(data.affiliate)) {
    data.affiliate.push(currentAffiliate as AffiliateItem);
  }

  return { data, body };
}

function markdownToSemanticHtml(md: string): string {
  const lines = md.split('\n');
  const output: string[] = [];
  let inList = false;
  let inOrderedList = false;

  const closeLists = () => {
    if (inList) {
      output.push('</ul>');
      inList = false;
    }
    if (inOrderedList) {
      output.push('</ol>');
      inOrderedList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeLists();
      continue;
    }

    if (line.startsWith('### ')) {
      closeLists();
      const text = inlineTokens(line.slice(4));
      output.push(`<h3 class="font-body font-semibold text-teal-900 text-xl md:text-2xl mt-8 mb-3">${text}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeLists();
      const text = inlineTokens(line.slice(3));
      output.push(`<h2 class="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight mt-12 mb-4">${text}</h2>`);
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        closeLists();
        output.push('<ul class="space-y-2.5 my-4 pl-5 list-disc text-teal-950/85">');
        inList = true;
      }
      const itemText = inlineTokens(line.slice(2));
      output.push(`<li class="leading-relaxed">${itemText}</li>`);
      continue;
    }

    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (!inOrderedList) {
        closeLists();
        output.push('<ol class="space-y-2.5 my-4 pl-5 list-decimal text-teal-950/85">');
        inOrderedList = true;
      }
      const itemText = inlineTokens(numMatch[2]);
      output.push(`<li class="leading-relaxed pl-1">${itemText}</li>`);
      continue;
    }

    if (line.startsWith('> ')) {
      closeLists();
      const quoteText = inlineTokens(line.slice(2));
      output.push(`<blockquote class="bg-teal-50 rounded-[24px] p-6 my-6 font-body text-teal-950 text-base italic leading-relaxed">${quoteText}</blockquote>`);
      continue;
    }

    closeLists();
    const paraText = inlineTokens(line);
    output.push(`<p class="font-body text-base md:text-lg text-teal-950/85 leading-relaxed my-4">${paraText}</p>`);
  }

  closeLists();
  return output.join('\n');
}

function inlineTokens(text: string): string {
  let res = text;
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-teal-950">$1</strong>');
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, (_match, label, url) => {
    const isAffiliate = url.includes('amzn.to') || url.includes('affiliate');
    const rel = isAffiliate ? 'rel="sponsored noopener noreferrer"' : 'rel="noopener noreferrer"';
    return `<a href="${url}" target="_blank" ${rel} class="text-teal-700 underline font-semibold">${label}</a>`;
  });
  return res;
}

function readAllPosts(): ParsedPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const posts: ParsedPost[] = [];

  for (const filename of files) {
    const fullPath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const { data, body } = parseFrontmatterSimple(content);

    if (!data.slug || !data.title) continue;

    posts.push({
      title: data.title,
      slug: data.slug,
      description: data.description || '',
      category: data.category || 'Child Health',
      date: data.date || '2026-10-01',
      author: data.author || 'Baby First Health Team',
      writtenBy: data.writtenBy,
      reviewed: Boolean(data.reviewed),
      reviewedBy: data.reviewedBy,
      coverImage: data.coverImage || '/images/nutrition-feeding.jpg',
      coverAlt: data.coverAlt || data.title,
      highlight: data.highlight,
      sources: data.sources || [],
      affiliate: data.affiliate || [],
      isSample: Boolean(data.isSample || data.title.includes('[Sample Post]')),
      rawMarkdown: body,
      htmlContent: markdownToSemanticHtml(body),
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function renderPostHtml(template: string, post: ParsedPost): string {
  const pageTitle = `${post.title} | ${SITE_BRAND}`;
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImageUrl = `${SITE_URL}${post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`}`;

  // Article JSON-LD Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [ogImageUrl],
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        '@type': 'Person',
        name: post.writtenBy || post.author,
      },
      ...(post.reviewed && post.reviewedBy
        ? [
            {
              '@type': 'Person',
              name: post.reviewedBy,
              jobTitle: 'Senior Registered Nurse (SRN)',
            },
          ]
        : []),
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/BFH-logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };

  const schemaTag = `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;

  // Inject meta and SEO into <head>
  let html = template;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);

  // Canonical tag
  const canonicalTag = `<link rel="canonical" href="${pageUrl}" />`;
  const metaTags = `
    ${canonicalTag}
    <meta name="description" content="${post.description}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${post.description}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:site_name" content="${SITE_BRAND}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${post.description}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    ${schemaTag}
  `;

  html = html.replace('</head>', `${metaTags}\n</head>`);

  // Pre-rendered HTML inside <div id="root">
  const preRenderedBody = `
    <div class="min-h-screen flex flex-col bg-white text-teal-950 font-body antialiased">
      <main class="flex-1 pt-28 md:pt-36">
        <article class="max-w-[840px] mx-auto px-4 md:px-8 py-12">
          <div class="space-y-6">
            <span class="px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
              ${post.category}
            </span>
            <h1 class="font-headline font-extrabold text-teal-900 text-3xl md:text-5xl tracking-tight leading-tight">
              ${post.title}
            </h1>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-teal-950/70 font-body">
              <span>By ${post.writtenBy || post.author}</span>
              <span class="hidden sm:inline">•</span>
              <time datetime="${post.date}">${post.date}</time>
              ${post.reviewed && post.reviewedBy ? `<span class="hidden sm:inline">•</span><span>Reviewed by ${post.reviewedBy}</span>` : ''}
            </div>
            <div class="rounded-[32px] overflow-hidden aspect-[16/9] w-full bg-teal-50 my-6">
              <img src="${post.coverImage}" alt="${post.coverAlt}" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="max-w-[680px] mx-auto mt-8 font-body text-teal-950/85">
            ${post.htmlContent}
          </div>
        </article>
      </main>
    </div>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${preRenderedBody}</div>`);

  return html;
}

function renderBlogIndexHtml(template: string, posts: ParsedPost[]): string {
  const pageTitle = `Child Health & Parenting Insights | ${SITE_BRAND}`;
  const pageUrl = `${SITE_URL}/blog`;
  const description =
    'Practical, clinical guidance for parents of children aged 0 to 5 on child health, parenting, nutrition, safety and family wellbeing.';

  let html = template;
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);

  const metaTags = `
    <link rel="canonical" href="${pageUrl}" />
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${SITE_URL}/images/hero-home.jpg" />
    <meta property="og:site_name" content="${SITE_BRAND}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${description}" />
  `;

  html = html.replace('</head>', `${metaTags}\n</head>`);

  const listItems = posts
    .map(
      (p) => `
    <article class="bg-white rounded-[28px] p-6 space-y-3">
      <span class="text-xs font-semibold text-teal-700 uppercase tracking-wide">${p.category}</span>
      <h2 class="font-body font-semibold text-teal-900 text-xl">
        <a href="/blog/${p.slug}">${p.title}</a>
      </h2>
      <p class="text-sm text-teal-950/75 leading-relaxed">${p.description}</p>
    </article>
  `
    )
    .join('\n');

  const preRenderedBody = `
    <div class="min-h-screen flex flex-col bg-white text-teal-950 font-body antialiased">
      <main class="flex-1 pt-28 md:pt-36">
        <div class="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
          <h1 class="font-headline font-extrabold text-teal-900 text-4xl md:text-6xl text-center mb-6">
            Practical Guidance For <span class="text-orange-600">Growing Families</span>.
          </h1>
          <p class="font-body text-base md:text-lg text-teal-950/80 text-center max-w-[720px] mx-auto mb-12">
            ${description}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${listItems}
          </div>
        </div>
      </main>
    </div>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${preRenderedBody}</div>`);
  return html;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toCleanSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateSitemap(posts: ParsedPost[]): string {
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'about', priority: '0.8', changefreq: 'monthly' },
    { path: 'community', priority: '0.9', changefreq: 'weekly' },
    { path: 'products', priority: '0.9', changefreq: 'weekly' },
    { path: 'products/childhood-emergency-guide', priority: '0.9', changefreq: 'weekly' },
    { path: 'certifications', priority: '0.8', changefreq: 'monthly' },
    { path: 'certifications/apply', priority: '0.7', changefreq: 'monthly' },
    { path: 'live-sessions', priority: '0.8', changefreq: 'weekly' },
    { path: 'faq', priority: '0.7', changefreq: 'monthly' },
    { path: 'contact', priority: '0.8', changefreq: 'monthly' },
    { path: 'blog', priority: '0.9', changefreq: 'daily' },
    { path: 'privacy', priority: '0.3', changefreq: 'yearly' },
    { path: 'terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const now = new Date().toISOString().split('T')[0];

  const staticUrls = staticPages.map((page) => {
    const loc = page.path ? `${SITE_URL}/${page.path}` : `${SITE_URL}/`;
    return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  const categoryUrls = CATEGORIES.map((cat) => {
    const catSlug = toCleanSlug(cat);
    return `
  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/category/${catSlug}`)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const postUrls = posts.map((post) => {
    return `
  <url>
    <loc>${escapeXml(`${SITE_URL}/blog/${post.slug}`)}</loc>
    <lastmod>${post.date || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('')}
${categoryUrls.join('')}
${postUrls.join('')}
</urlset>`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function generateNetlifyRedirects(): string {
  return `/api/pedia-coach /.netlify/functions/pedia-coach 200
/api/send-broadcast /.netlify/functions/send-broadcast 200
/api/* /.netlify/functions/:splat 200
/* /index.html 200
`;
}

async function run() {
  console.log('🚀 Running Baby First Health Blog Pre-rendering & SEO build...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ folder not found. Please run vite build first.');
    process.exit(1);
  }

  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');
  const posts = readAllPosts();
  console.log(`📄 Found ${posts.length} blog post(s) to pre-render.`);

  // 1. Pre-render Blog Home (/blog)
  const blogDir = path.join(DIST_DIR, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  const blogIndexHtml = renderBlogIndexHtml(template, posts);
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'blog.html'), blogIndexHtml, 'utf-8');
  console.log('✅ Pre-rendered /blog -> dist/blog/index.html');

  // 2. Pre-render each post (/blog/:slug)
  for (const post of posts) {
    const postDir = path.join(blogDir, post.slug);
    fs.mkdirSync(postDir, { recursive: true });

    const postHtml = renderPostHtml(template, post);
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf-8');
    fs.writeFileSync(path.join(blogDir, `${post.slug}.html`), postHtml, 'utf-8');
    // Also generate alias for previously bookmarked sample slug if applicable
    if (post.slug === 'how-to-introduce-solid-foods') {
      const aliasDir = path.join(blogDir, 'introduce-solid-foods-sample');
      fs.mkdirSync(aliasDir, { recursive: true });
      fs.writeFileSync(path.join(aliasDir, 'index.html'), postHtml, 'utf-8');
    }
  }

  // 3. Pre-render category index pages (/blog/category/:category)
  const categoryBaseDir = path.join(blogDir, 'category');
  fs.mkdirSync(categoryBaseDir, { recursive: true });
  for (const cat of CATEGORIES) {
    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
    const catDir = path.join(categoryBaseDir, catSlug);
    fs.mkdirSync(catDir, { recursive: true });

    const filtered = posts.filter((p) => p.category.toLowerCase() === cat.toLowerCase());
    const catHtml = renderBlogIndexHtml(template, filtered);
    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf-8');
  }
  console.log('✅ Pre-rendered 6 blog category pages.');

  // 4. Generate sitemap.xml
  const sitemapXml = generateSitemap(posts);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  const publicDir = path.join(ROOT_DIR, 'public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  }
  console.log('✅ Generated dist/sitemap.xml & public/sitemap.xml');

  // 5. Generate robots.txt
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  }
  console.log('✅ Generated dist/robots.txt & public/robots.txt');

  // 6. Generate Netlify _redirects
  const redirects = generateNetlifyRedirects();
  fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirects, 'utf-8');
  console.log('✅ Generated dist/_redirects (/* /index.html 200)');

  console.log('🎉 Blog pre-rendering and SEO generation complete!');
}

run().catch((err) => {
  console.error('Fatal error during prerendering:', err);
  process.exit(1);
});
