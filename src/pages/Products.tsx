import React from 'react';
import { BookOpen, GraduationCap, Package, Percent, ArrowRight } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { PRODUCTS_CONTENT } from '../content/content';

export const Products: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Subtle background decoration */}
        <div
          className="absolute -right-24 top-20 w-[420px] h-[420px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <div className="max-w-[840px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h1" align="auto" isHero>
              {PRODUCTS_CONTENT.hero.headline}
            </Headline>

            <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              {PRODUCTS_CONTENT.hero.paragraph}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. CATEGORIES OVERVIEW: WHAT WE OFFER */}
      <Section bg="teal-50">
        <Container>
          <div className="space-y-12">
            <div className="max-w-[700px] mx-auto text-left md:text-center space-y-3">
              <Headline as="h2" align="auto">
                {"What We {{Offer}}"}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed">
                Structured learning, practical reference guides, and carefully chosen family items.
              </p>
            </div>

            {/* Asymmetric layout of varied tiles */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              {/* Tile 1: Guides & Ebooks (Wide 7 cols) - Clicking navigates to /products/childhood-emergency-guide */}
              <div className="md:col-span-7 bg-white rounded-[32px] p-8 md:p-12 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                    <BookOpen size={32} strokeWidth={2} />
                  </div>
                  <h3 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                    {PRODUCTS_CONTENT.categories.guides.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-teal-950/80 max-w-md leading-relaxed [text-wrap:pretty]">
                    {PRODUCTS_CONTENT.categories.guides.description} Includes our acclaimed 3-volume Childhood Emergency Guide collection.
                  </p>
                </div>

                <div className="pt-8">
                  <Button to="/products/childhood-emergency-guide" variant="primary">
                    View Guides
                  </Button>
                </div>
              </div>

              {/* Tile 2: Courses (Compact 5 cols) */}
              <div className="md:col-span-5 bg-teal-100/70 rounded-[32px] p-8 md:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                    <GraduationCap size={32} strokeWidth={2} />
                  </div>
                  <h3 className="font-headline font-extrabold text-teal-900 text-2xl tracking-tight">
                    {PRODUCTS_CONTENT.categories.courses.title}
                  </h3>
                  <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                    {PRODUCTS_CONTENT.categories.courses.description}
                  </p>
                </div>

                <div className="pt-8">
                  <Button to="/certifications" variant="secondary">
                    View Courses
                  </Button>
                </div>
              </div>

              {/* Tile 3: Baby Products (5 cols, with authentic photo) */}
              <div className="md:col-span-5 bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5">
                <div className="space-y-6">
                  <div className="w-full">
                    <SmartImage
                      src={PRODUCTS_CONTENT.categories.products.image}
                      alt="Simple baby essentials in soft tones"
                      aspectRatio="1:1"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-headline font-extrabold text-teal-900 text-2xl tracking-tight">
                      {PRODUCTS_CONTENT.categories.products.title}
                    </h3>
                    <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                      {PRODUCTS_CONTENT.categories.products.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button to="/contact" variant="secondary">
                    Inquire About Products
                  </Button>
                </div>
              </div>

              {/* Tile 4: Member Offers (Warm 7 cols) */}
              <div className="md:col-span-7 bg-orange-50 rounded-[32px] p-8 md:p-12 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5">
                <div className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-start text-orange-600">
                    <Percent size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                    {PRODUCTS_CONTENT.categories.memberOffers.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-teal-950/80 max-w-lg leading-relaxed [text-wrap:pretty]">
                    {PRODUCTS_CONTENT.categories.memberOffers.description}
                  </p>
                </div>

                <div className="pt-8">
                  <Button to="/community" variant="primary">
                    Community Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FINAL CTA PANEL */}
      <Panel bg="teal-700">
        <Container>
          <div className="max-w-[720px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h2" theme="dark" align="auto">
              {"Equip Your Parenting With {{Practical Tools}}."}
            </Headline>

            <p className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]">
              Access our full library of guides, structured programs, and exclusive member savings.
            </p>

            <div className="pt-4 flex justify-start md:justify-center">
              <Button to="/community" variant="soft" fullWidthOnMobile>
                Community Details
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};
