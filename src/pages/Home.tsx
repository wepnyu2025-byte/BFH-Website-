import React from 'react';
import {
  Stethoscope,
  HeartHandshake,
  Apple,
  ShieldAlert,
  Sparkles,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { HOME_CONTENT } from '../content/content';

export const Home: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Stethoscope: <Stethoscope size={32} strokeWidth={2} className="text-teal-600" />,
    HeartHandshake: <HeartHandshake size={32} strokeWidth={2} className="text-teal-600" />,
    Apple: <Apple size={32} strokeWidth={2} className="text-teal-600" />,
    ShieldAlert: <ShieldAlert size={32} strokeWidth={2} className="text-teal-600" />,
    Sparkles: <Sparkles size={32} strokeWidth={2} className="text-teal-600" />,
    Users: <Users size={32} strokeWidth={2} className="text-teal-600" />,
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Decorative oversized cropped teal-50 heart */}
        <div
          className="absolute -right-24 md:-right-12 top-20 w-[380px] md:w-[540px] h-[380px] md:h-[540px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-70">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline and Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <Headline as="h1" align="left" isHero>
                  {HOME_CONTENT.hero.headline}
                </Headline>

                <div className="space-y-4 pt-2">
                  {HOME_CONTENT.hero.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="font-body text-lg md:text-xl text-teal-950/80 max-w-[620px] leading-relaxed [text-wrap:pretty]"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <Button to="/community" variant="primary" fullWidthOnMobile>
                  {HOME_CONTENT.hero.button}
                </Button>
              </div>
            </div>

            {/* Right Column: Signature Arch Hero Image with Heart & Orange Plus */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Decorative small orange plus */}
              <div
                className="absolute -top-4 -right-2 md:top-2 md:-right-4 w-8 h-8 z-20 text-orange-500 animate-pulse pointer-events-none"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M11 3h2v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                </svg>
              </div>

              {/* Arch Shaped Photo Container */}
              <div className="relative w-full max-w-[420px]">
                <SmartImage
                  src="/images/hero-home.jpg"
                  alt="African mother gently lifting her laughing toddler at home"
                  aspectRatio="4:5"
                  arch
                  eager
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. TRUST INTRODUCTION (Statement Layout) */}
      <Section bg="white">
        <Container>
          <Reveal type="up">
            <div className="max-w-[800px] mx-auto space-y-6">
              <Headline as="h2" align="auto">
                {HOME_CONTENT.trustIntro.headline}
              </Headline>

              <div className="space-y-4 pt-2">
                {HOME_CONTENT.trustIntro.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 text-left md:text-center leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 3. SIX AREAS (Sticky List Layout) */}
      <Section bg="teal-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Sticky Section Header on Desktop */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-6">
              <Headline as="h2" align="left">
                {HOME_CONTENT.sixAreas.headline}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                Practical, evidence-grounded education covering every critical aspect of early childhood growth and family health.
              </p>
              <div>
                <Button to="/products" variant="secondary">
                  {HOME_CONTENT.sixAreas.button}
                </Button>
              </div>
            </div>

            {/* Right Column: Six Core Areas List (no boxed cards, bare icons) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {HOME_CONTENT.sixAreas.areas.map((area, idx) => (
                <Reveal key={area.title} type="up" delay={idx * 100}>
                  <div className="space-y-3">
                    <div className="w-12 h-12 flex items-center justify-start">
                      {iconMap[area.icon]}
                    </div>
                    <h3 className="font-body font-semibold text-teal-900 text-xl leading-snug">
                      {area.title}
                    </h3>
                    <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                      {area.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. COMMUNITY (Floating Rounded Panel) */}
      <Panel bg="teal-700">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text */}
            <div className="lg:col-span-7 space-y-6">
              <Headline as="h2" theme="dark" align="left">
                {HOME_CONTENT.community.headline}
              </Headline>

              <div className="space-y-4">
                {HOME_CONTENT.community.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <Button to="/community" variant="soft" fullWidthOnMobile>
                  {HOME_CONTENT.community.button}
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <SmartImage
                src="/images/community-parents.jpg"
                alt="Diverse African parents sitting together chatting warmly with toddlers"
                aspectRatio="3:2"
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </Panel>

      {/* 5. LIVE SESSIONS (Floating Rounded Panel Spotlight) */}
      <Section bg="white">
        <Container>
          <div className="bg-teal-700 text-white rounded-[32px] md:rounded-[40px] p-8 md:p-14 lg:p-16 relative overflow-hidden">
            {/* Background subtle heart decoration */}
            <div
              className="absolute -right-16 -bottom-16 w-80 h-80 text-teal-600/30 pointer-events-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
              </svg>
            </div>

            <div className="relative z-10 max-w-[700px] mx-auto text-left md:text-center space-y-6">
              <Headline as="h2" theme="dark" align="auto">
                {HOME_CONTENT.liveSessions.headline}
              </Headline>

              <div className="space-y-3">
                {HOME_CONTENT.liveSessions.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-4 flex justify-start md:justify-center">
                <Button to="/live-sessions" variant="soft" fullWidthOnMobile>
                  {HOME_CONTENT.liveSessions.button}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. PRODUCTS (Tile Trio Layout) */}
      <Section bg="teal-50">
        <Container>
          <div className="space-y-12">
            <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
              <Headline as="h2" align="auto">
                {HOME_CONTENT.products.headline}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                {HOME_CONTENT.products.intro}
              </p>
            </div>

            {/* Three Soft Rounded Cards with Different Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {HOME_CONTENT.products.items.map((item, idx) => (
                <Reveal key={item.title} type="up" delay={idx * 120}>
                  <div className="bg-white rounded-[28px] p-8 md:p-10 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1.5">
                    <div className="space-y-4">
                      <h3 className="font-body font-semibold text-teal-900 text-xl md:text-2xl leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-8">
                      <Button to={item.link} variant="secondary" fullWidthOnMobile>
                        Learn More
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button to="/products" variant="primary">
                {HOME_CONTENT.products.button}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. MEMBER BENEFITS (Supportive Community Feature) */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Community Visual */}
            <div className="lg:col-span-6">
              <SmartImage
                src="/images/community-parents.jpg"
                alt="African parents engaged in community learning and discussion"
                aspectRatio="3:2"
                className="w-full"
              />
            </div>

            {/* Right: Copy and Action */}
            <div className="lg:col-span-6 space-y-6">
              <Headline as="h2" align="left">
                {HOME_CONTENT.memberBenefits.headline}
              </Headline>

              <div className="space-y-4">
                {HOME_CONTENT.memberBenefits.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <Button to="/community" variant="primary" fullWidthOnMobile>
                  {HOME_CONTENT.memberBenefits.button}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. CERTIFICATION (Split Section with Learning Image) */}
      <Section bg="teal-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Copy and Action */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <Headline as="h2" align="left">
                {HOME_CONTENT.certification.headline}
              </Headline>

              <div className="space-y-4">
                {HOME_CONTENT.certification.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <Button to="/certifications" variant="secondary" fullWidthOnMobile>
                  {HOME_CONTENT.certification.button}
                </Button>
              </div>
            </div>

            {/* Right: Learning Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <SmartImage
                src="/images/certification-learning.jpg"
                alt="African woman studying childcare online on a laptop"
                aspectRatio="3:2"
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. FINAL CTA (Grand Floating Panel) */}
      <Panel bg="teal-800">
        {/* Cropped oversized background heart */}
        <div
          className="absolute -left-20 -bottom-20 w-96 h-96 text-teal-900/40 pointer-events-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <div className="relative z-10 max-w-[720px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h2" theme="dark" align="auto">
              {HOME_CONTENT.finalCta.headline}
            </Headline>

            <div className="space-y-2">
              {HOME_CONTENT.finalCta.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-6 flex justify-start md:justify-center">
              <Button to="/community" variant="primary" fullWidthOnMobile>
                {HOME_CONTENT.finalCta.button}
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};
