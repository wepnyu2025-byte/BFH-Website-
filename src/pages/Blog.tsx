import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, AlertCircle, Search, SlidersHorizontal, X, ChevronDown, Clock, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { BlogSEO } from '../components/BlogSEO';
import { getAllBlogPosts, BLOG_CATEGORIES } from '../services/blogService';
import { GLOBAL_CONTENT } from '../content/content';

const POSTS_PER_PAGE = 6;

export const Blog: React.FC = () => {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    paramCategory ? decodeURIComponent(paramCategory) : 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);

  // Sync category param if route changes
  React.useEffect(() => {
    if (paramCategory) {
      setSelectedCategory(decodeURIComponent(paramCategory));
    } else {
      setSelectedCategory('All');
    }
  }, [paramCategory]);

  const togglePostDetails = (slug: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const allPosts = useMemo(() => getAllBlogPosts(), []);

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    let list = allPosts;

    if (selectedCategory !== 'All') {
      list = list.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, '-') ===
            selectedCategory.toLowerCase().replace(/\s+/g, '-') ||
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <div className="pt-28 md:pt-36">
      <BlogSEO
        path={paramCategory ? `/blog/category/${paramCategory}` : '/blog'}
        title={selectedCategory === 'All' ? 'Child Health & Parenting Insights' : `${selectedCategory} Insights`}
        description="Reliable, nurse-led educational guides on infant milestones, child nutrition, safety, and parenting from Baby First Health."
      />

      {/* Hero Section */}
      <Section bg="white" className="pt-[85px] pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto text-left md:text-center space-y-6">
            <Reveal type="up">
              <Headline as="h1" align="auto">
                {"Practical Guidance For {{Growing Families}}."}
              </Headline>
            </Reveal>

            <Reveal type="up" delay={100}>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                Explore clear, medically grounded parenting guides, child health milestones, and nutrition practices reviewed for African families by registered clinical professionals.
              </p>
            </Reveal>

            {/* Search Bar with Filter Icon */}
            <Reveal type="up" delay={200}>
              <div className="pt-4 max-w-[560px] mx-auto space-y-4">
                <div className="relative flex items-center bg-teal-50 rounded-full px-5 py-3 transition-colors focus-within:bg-teal-100/60">
                  <Search className="w-5 h-5 text-teal-700 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any topic..."
                    className="w-full bg-transparent pl-3 pr-2 font-body text-sm md:text-base text-teal-950 placeholder:text-teal-950/50 outline-none"
                    aria-label="Search articles"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-teal-700 hover:text-teal-900 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`ml-2 p-2 rounded-full transition-all duration-300 relative ${
                      isFilterOpen || selectedCategory !== 'All'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-teal-800 hover:bg-teal-100'
                    }`}
                    aria-label="Filter by category"
                    title="Filter topics"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    {selectedCategory !== 'All' && !isFilterOpen && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full" />
                    )}
                  </button>
                </div>

                {/* Active Category Tag indicator */}
                {selectedCategory !== 'All' && (
                  <div className="flex items-center justify-center gap-2 text-xs font-body text-teal-900">
                    <span className="text-teal-950/70">Filtered by:</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 font-semibold">
                      {selectedCategory}
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('All')}
                        className="hover:text-orange-600"
                        aria-label="Remove category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}

                {/* Collapsible Filter Dropdown Drawer */}
                {isFilterOpen && (
                  <div className="bg-teal-50 rounded-[28px] p-5 text-left transition-all duration-300">
                    <div className="flex items-center justify-between pb-3">
                      <span className="font-body text-xs font-semibold uppercase tracking-wider text-teal-900">
                        Select Topic
                      </span>
                      {selectedCategory !== 'All' && (
                        <button
                          type="button"
                          onClick={() => setSelectedCategory('All')}
                          className="font-body text-xs text-teal-700 hover:text-orange-600 font-semibold"
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory('All');
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded-full font-body text-xs md:text-sm font-semibold transition-colors ${
                          selectedCategory === 'All'
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-teal-900 hover:bg-teal-100'
                        }`}
                      >
                        All Topics ({allPosts.length})
                      </button>
                      {BLOG_CATEGORIES.map((cat) => {
                        const isActive =
                          selectedCategory.toLowerCase() === cat.toLowerCase() ||
                          selectedCategory.toLowerCase() === cat.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsFilterOpen(false);
                            }}
                            className={`px-4 py-2 rounded-full font-body text-xs md:text-sm font-semibold transition-colors ${
                              isActive
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-teal-900 hover:bg-teal-100'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Main Content Area */}
      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          {filteredPosts.length === 0 ? (
            <div className="max-w-md mx-auto bg-white rounded-[32px] p-8 md:p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-teal-600 mx-auto" />
              <h2 className="font-body font-semibold text-teal-900 text-xl">
                No matching articles found
              </h2>
              <p className="font-body text-sm text-teal-950/75 leading-relaxed">
                {searchQuery
                  ? `No guides matched "${searchQuery}". Try a different keyword or reset filters.`
                  : 'We are actively preparing guides for this section. Check back soon or view all topics.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-teal-600 text-white font-body text-sm font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Post Card: Title First -> Detail -> Bright Orange Read Button -> Dropdown for Info */}
              {featuredPost && (
                <Reveal type="up">
                  <div className="bg-white rounded-[32px] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                      <div className="lg:col-span-7 h-[280px] sm:h-[360px] lg:h-[460px] w-full relative overflow-hidden">
                        <SmartImage
                          src={featuredPost.coverImage}
                          alt={featuredPost.coverAlt}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>

                      <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 space-y-5">
                        {/* 1. Post Title First */}
                        <h2 className="font-body font-semibold text-teal-900 text-2xl md:text-3xl leading-snug">
                          <Link
                            to={`/blog/${featuredPost.slug}`}
                            className="hover:text-orange-600 transition-colors"
                          >
                            {featuredPost.title}
                          </Link>
                        </h2>

                        {/* 2. Post Detail */}
                        <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                          {featuredPost.description}
                        </p>

                        {/* 3. Read Button (White text on bright orange button) & Details dropdown icon */}
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <Link
                            to={`/blog/${featuredPost.slug}`}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => togglePostDetails(featuredPost.slug)}
                            className="inline-flex items-center justify-center gap-1.5 text-xs text-teal-900/75 hover:text-teal-950 font-body py-2 px-3.5 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors w-full sm:w-auto"
                            aria-label={expandedPosts[featuredPost.slug] ? "Hide article details" : "View article details"}
                          >
                            <span>{expandedPosts[featuredPost.slug] ? 'Hide info' : 'Article info'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                expandedPosts[featuredPost.slug] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* 4. Revealed details: stacked on mobile, inline on bigger screens */}
                        {expandedPosts[featuredPost.slug] && (
                          <div className="pt-3 pb-1 flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 sm:gap-x-4 text-xs font-body text-teal-950/75 bg-teal-50/70 p-3.5 rounded-[20px] transition-all duration-200">
                            <span className="inline-flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-teal-600" />
                              <span>{featuredPost.category}</span>
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>{featuredPost.writtenBy || featuredPost.author}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-teal-600" />
                              <span>{featuredPost.date}</span>
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-teal-600" />
                              <span>{featuredPost.readingTimeMinutes} min read</span>
                            </span>
                            {featuredPost.reviewed && featuredPost.reviewedBy && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span className="inline-flex items-center gap-1.5 text-teal-900">
                                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                                  <span>Reviewed by {featuredPost.reviewedBy}</span>
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Grid of Remaining Posts */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, idx) => (
                    <Reveal key={post.slug} type="up" delay={idx * 80}>
                      <article className="bg-white rounded-[28px] overflow-hidden flex flex-col h-full">
                        <div className="h-56 relative overflow-hidden">
                          <SmartImage
                            src={post.coverImage}
                            alt={post.coverAlt}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col flex-grow justify-between space-y-4">
                          <div className="space-y-3">
                            {/* 1. Post Title First */}
                            <h3 className="font-body font-semibold text-teal-900 text-xl leading-snug">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="hover:text-orange-600 transition-colors"
                              >
                                {post.title}
                              </Link>
                            </h3>

                            {/* 2. Post Detail */}
                            <p className="font-body text-sm text-teal-950/75 leading-relaxed [text-wrap:pretty]">
                              {post.description}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            {/* 3. Read Button (White text on bright orange button) & dropdown icon */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
                              >
                                <span>Read</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>

                              <button
                                type="button"
                                onClick={() => togglePostDetails(post.slug)}
                                className="inline-flex items-center justify-center gap-1 text-xs text-teal-900/75 hover:text-teal-950 font-body py-1.5 px-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors w-full sm:w-auto"
                                aria-label={expandedPosts[post.slug] ? "Hide article details" : "View article details"}
                              >
                                <span>{expandedPosts[post.slug] ? 'Hide info' : 'Article info'}</span>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    expandedPosts[post.slug] ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </div>

                            {/* 4. Revealed details: stacked on mobile, inline on bigger screens */}
                            {expandedPosts[post.slug] && (
                              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-1.5 sm:gap-x-3 text-xs font-body text-teal-950/75 bg-teal-50/70 p-3 rounded-[16px]">
                                <span className="inline-flex items-center gap-1">
                                  <Tag className="w-3 h-3 text-teal-600" />
                                  <span>{post.category}</span>
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span>{post.writtenBy || post.author}</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-teal-600" />
                                  <span>{post.date}</span>
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-teal-600" />
                                  <span>{post.readingTimeMinutes} min</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}

              {/* Load More Pill Button */}
              {hasMore && (
                <div className="pt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                    className="px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-body font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* Floating Rounded Teal Community Panel */}
      <Section bg="white" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="bg-teal-700 text-white rounded-[32px] md:rounded-[40px] p-8 md:p-14 lg:p-16">
            <div className="max-w-[720px] mx-auto text-left md:text-center space-y-6">
              <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6 text-orange-400" />
              </div>

              <h2 className="font-headline font-extrabold text-2xl md:text-4xl tracking-tight leading-tight">
                Connect Directly With Pediatric Care Advocates
              </h2>

              <p className="font-body text-base md:text-lg text-white/90 leading-relaxed">
                Join our supportive WhatsApp parenting community to receive verified weekly health updates, submit parenting questions, and participate in free Saturday live sessions with Nurse Dolly Kelly, SRN.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  to="/community"
                  variant="primary"
                  fullWidthOnMobile
                >
                  Join the Community
                </Button>
                <a
                  href={GLOBAL_CONTENT.whatsappCommunityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-body font-semibold text-sm transition-colors"
                >
                  Direct WhatsApp Group
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
