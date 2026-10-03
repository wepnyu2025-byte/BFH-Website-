import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { SmartImage } from '../components/SmartImage';
import { BlogSEO } from '../components/BlogSEO';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../services/blogService';
import { GLOBAL_CONTENT } from '../content/content';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = useMemo(() => {
    return slug ? getBlogPostBySlug(slug) : undefined;
  }, [slug]);

  const relatedPosts = useMemo(() => {
    return post ? getRelatedBlogPosts(post.slug, post.category, 3) : [];
  }, [post]);

  // Track reading progress for top thin teal bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="pt-36 md:pt-44 min-h-[60vh] flex items-center">
        <Section bg="white" className="w-full">
          <Container>
            <div className="max-w-[640px] mx-auto text-left md:text-center space-y-6">
              <Headline as="h1" align="auto">
                {"Article Not {{Found}}"}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed">
                The article you are looking for may have moved or is still being finalized by our clinical team.
              </p>
              <div className="pt-4 flex justify-start md:justify-center">
                <Button to="/blog" variant="primary">
                  Browse All Articles
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // Format title for Headline component with orange highlight
  const headlineFormatted = post.highlight
    ? post.title.replace(
        new RegExp(post.highlight, 'i'),
        `{{${post.highlight}}}`
      )
    : post.title.includes('[Sample Post]')
    ? post.title.replace('[Sample Post]', '[Sample Post] {{') + '}}'
    : `{{${post.title}}}`;

  return (
    <div className="relative pt-28 md:pt-36">
      {/* Top Reading Progress Bar (thin teal bar, no shadow, no border) */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-600 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <BlogSEO post={post} path={`/blog/${post.slug}`} />

      {/* Article Header Section */}
      <Section bg="white" className="pt-[85px] pb-10">
        <Container>
          <div className="max-w-[840px] mx-auto space-y-8">
            {/* Back link & category pill */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-teal-700 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </Link>

              <Link
                to={`/blog/category/${encodeURIComponent(post.category.toLowerCase().replace(/\s+/g, '-'))}`}
                className="px-4 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-body text-xs font-semibold transition-colors"
              >
                {post.category}
              </Link>
            </div>

            {/* Sample Post Alert Banner if applicable */}
            {post.isSample && (
              <div className="bg-orange-50 rounded-[24px] p-5 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm font-body text-teal-950">
                  <p className="font-semibold text-orange-950">
                    Sample Verification Post
                  </p>
                  <p className="text-teal-950/80 leading-relaxed text-xs">
                    This post is a sample built to verify the Baby First Health blog engine, Markdown schema, and clinical source citations. Production articles are reviewed by Dolly Kelly, SRN before publishing.
                  </p>
                </div>
              </div>
            )}

            {/* Headline with single highlighted keyword */}
            <Headline as="h1" align="auto">
              {headlineFormatted}
            </Headline>

            {/* Post Meta Line: Author, Date, Reading Time, Review status - stacked on mobile, inline on bigger screens */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-start md:justify-center gap-2.5 sm:gap-x-4 font-body text-xs md:text-sm text-teal-950/75">
              <span>{post.writtenBy || post.author}</span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{post.date}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{post.readingTimeMinutes} min read</span>
              </span>
              {post.reviewed && post.reviewedBy && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1.5 text-teal-900">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Reviewed by {post.reviewedBy}</span>
                  </span>
                </>
              )}
            </div>

            {/* Cover Image - rounded-[32px], no shadows, no borders */}
            <div className="pt-4">
              <div className="rounded-[32px] overflow-hidden aspect-[16/9] w-full bg-teal-50">
                <SmartImage
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Article Body Column (65 chars wide, ~680px, line-height 1.8) */}
      <Section bg="white" className="pt-0 pb-[85px]">
        <Container>
          <div className="max-w-[680px] mx-auto font-body text-teal-950">
            {/* Key Takeaways block (genuine grouping, soft teal-50 rounded-[28px]) */}
            <div className="bg-teal-50 rounded-[28px] p-6 md:p-8 my-8 space-y-4">
              <h2 className="font-body font-semibold text-teal-900 text-lg md:text-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Key Takeaways for Parents</span>
              </h2>
              <ul className="space-y-3 font-body text-sm md:text-base text-teal-950/85">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2" />
                  <span>Start complementary foods around 6 months when head and neck control are fully established.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2" />
                  <span>Offer smooth, single-ingredient iron-rich purees, local vegetables, and mashed fruits with zero added salt, sugar, or honey.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2" />
                  <span>Practice the 3-day waiting rule between introducing new food items to detect potential sensitivities.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-2" />
                  <span>Continue breastfeeding or formula milk as the primary nutrient source throughout the first year.</span>
                </li>
              </ul>
            </div>

            {/* Parsed HTML Article Body */}
            <div
              className="prose max-w-none text-base md:text-lg leading-[1.8] text-teal-950/85 space-y-4"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* "When to see a doctor" soft orange-50 rounded block */}
            <div className="bg-orange-50 rounded-[28px] p-6 md:p-8 my-10 space-y-4">
              <div className="flex items-center gap-2.5 text-orange-950">
                <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                <h2 className="font-body font-semibold text-lg md:text-xl text-orange-950">
                  When to See a Doctor
                </h2>
              </div>
              <p className="font-body text-sm md:text-base text-teal-950/85 leading-relaxed">
                Contact your pediatrician or visit your nearest primary health clinic if you observe any of the following:
              </p>
              <ul className="space-y-2.5 text-sm md:text-base text-teal-950/85 list-disc pl-5">
                <li>Swelling of the lips, eyes, or tongue, difficulty breathing, or sudden hives (seek immediate emergency care).</li>
                <li>Repeated forceful vomiting or persistent refusing of fluids.</li>
                <li>Signs of dehydration: dry mouth, sunken fontanelle, crying without tears, or fewer than 4 wet diapers in 24 hours.</li>
                <li>Frequent watery diarrhea lasting more than 24 hours or blood in stools.</li>
              </ul>
              <p className="text-xs text-teal-950/70 pt-2 font-medium">
                {GLOBAL_CONTENT.emergencyNote}
              </p>
            </div>

            {/* Affiliate / Recommended Tools block with mandatory disclosure */}
            {post.affiliate && post.affiliate.length > 0 && (
              <div className="bg-teal-50 rounded-[28px] p-6 md:p-8 my-10 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs text-teal-950/60 font-body italic block">
                    This post contains recommended digital guides and resources to support parent learning.
                  </span>
                  <h3 className="font-body font-semibold text-teal-900 text-lg md:text-xl pt-2">
                    Recommended Digital Guide & Resources
                  </h3>
                </div>

                <div className="space-y-4">
                  {post.affiliate.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-[20px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="font-body font-semibold text-teal-950 text-base">
                          {item.title}
                        </h4>
                        <p className="font-body text-xs text-teal-950/75 leading-relaxed">
                          {item.whyItFits}
                        </p>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-teal-950 font-body font-bold text-xs shrink-0 transition-colors"
                      >
                        <span>Access Guide</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Sources List */}
            {post.sources && post.sources.length > 0 && (
              <div className="pt-8 my-8 space-y-3">
                <h3 className="font-body font-semibold text-teal-900 text-sm">
                  Clinical & Institutional Sources
                </h3>
                <ul className="space-y-2 text-xs text-teal-950/70 font-body">
                  {post.sources.map((src, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <strong>{src.name}:</strong> <em>{src.title}</em>
                      {src.url && (
                        <>
                          {' '}—{' '}
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 underline underline-offset-2 hover:text-orange-600"
                          >
                            View publication
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Repeated Medical Disclaimer from Footer */}
            <div className="bg-teal-50/60 rounded-[20px] p-5 my-8 text-xs text-teal-950/75 leading-relaxed font-body">
              <strong>Medical Disclaimer:</strong> {GLOBAL_CONTENT.medicalDisclaimer}
            </div>

            {/* Closing CTA block */}
            <div className="pt-6 my-10 p-8 rounded-[32px] bg-teal-800 text-white text-center space-y-4">
              <h3 className="font-headline font-extrabold text-xl md:text-2xl text-white">
                Have Questions About Your Child's Milestones?
              </h3>
              <p className="font-body text-sm md:text-base text-white/90 max-w-md mx-auto leading-relaxed">
                Join our supportive WhatsApp parenting group for weekly tips, live Q&As with Nurse Dolly Kelly, SRN, and access to practical guides.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button to="/community" variant="primary">
                  Join Community
                </Button>
                <Link
                  to="/products/childhood-emergency-guide"
                  className="px-6 py-3 rounded-full bg-teal-700 hover:bg-teal-600 text-white font-body font-semibold text-sm transition-colors"
                >
                  Emergency Guide
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Keep Reading: Related Posts Section */}
      {relatedPosts.length > 0 && (
        <Section bg="teal-50" className="pt-[85px] pb-[85px]">
          <Container>
            <div className="max-w-[1000px] mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  Keep Reading
                </h2>
                <Link
                  to="/blog"
                  className="font-body text-sm font-semibold text-teal-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <article
                    key={rel.slug}
                    className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between"
                  >
                    <div className="h-44 relative overflow-hidden">
                      <SmartImage
                        src={rel.coverImage}
                        alt={rel.coverAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-teal-100 text-teal-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {rel.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-body text-xs text-teal-950/60 block">
                          {rel.readingTimeMinutes} min read
                        </span>
                        <h3 className="font-body font-semibold text-teal-900 text-lg leading-snug line-clamp-2">
                          <Link
                            to={`/blog/${rel.slug}`}
                            className="hover:text-orange-600 transition-colors"
                          >
                            {rel.title}
                          </Link>
                        </h3>
                      </div>

                      <div className="pt-2">
                        <Link
                          to={`/blog/${rel.slug}`}
                          className="font-body text-xs font-semibold text-teal-700 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                        >
                          <span>Read guide</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
};
