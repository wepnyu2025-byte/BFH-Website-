import { useEffect } from 'react';
import { SITE_URL, SITE_METADATA } from '../config/site';
import { BlogPost } from '../types/blog';

interface BlogSEOProps {
  post?: BlogPost;
  title?: string;
  description?: string;
  path: string;
}

export const BlogSEO: React.FC<BlogSEOProps> = ({ post, title, description, path }) => {
  const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const finalTitle = post
    ? `${post.title} | ${SITE_METADATA.brand}`
    : title
    ? `${title} | ${SITE_METADATA.brand}`
    : SITE_METADATA.defaultTitle;

  const finalDescription = post?.description || description || SITE_METADATA.defaultDescription;
  const ogImage = post?.coverImage
    ? `${SITE_URL}${post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`}`
    : `${SITE_URL}${SITE_METADATA.defaultOgImage}`;

  useEffect(() => {
    // 1. Update Title
    document.title = finalTitle;

    // 2. Helper to set or create meta tag
    const setMeta = (nameOrProperty: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${nameOrProperty}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameOrProperty, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Meta descriptions & viewport
    setMeta('name', 'description', finalDescription);
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDescription);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:type', post ? 'article' : 'website');
    setMeta('property', 'og:site_name', SITE_METADATA.brand);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDescription);
    setMeta('name', 'twitter:image', ogImage);

    // 4. Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Schema.org Article Structured Data (JSON-LD)
    const scriptId = 'blog-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (post) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: [ogImage],
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
          name: SITE_METADATA.brand,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/BFH-logo.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      };
      scriptTag.textContent = JSON.stringify(articleSchema);
    } else {
      const blogHomeSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: finalTitle,
        description: finalDescription,
        url: canonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: SITE_METADATA.brand,
          logo: `${SITE_URL}/BFH-logo.svg`,
        },
      };
      scriptTag.textContent = JSON.stringify(blogHomeSchema);
    }

    return () => {
      // Cleanup on unmount or page change
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [canonicalUrl, finalTitle, finalDescription, ogImage, post]);

  return null;
};
