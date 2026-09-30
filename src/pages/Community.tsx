import React from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  Lock,
  CreditCard,
  Percent,
  Stethoscope,
  HeartHandshake,
  Sparkles,
  Apple,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { COMMUNITY_CONTENT } from '../content/content';

export const Community: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users size={28} strokeWidth={2} className="text-teal-600" />,
    GraduationCap: <GraduationCap size={28} strokeWidth={2} className="text-teal-600" />,
    Calendar: <Calendar size={28} strokeWidth={2} className="text-teal-600" />,
    BookOpen: <BookOpen size={28} strokeWidth={2} className="text-teal-600" />,
    Lock: <Lock size={28} strokeWidth={2} className="text-teal-600" />,
    CreditCard: <CreditCard size={28} strokeWidth={2} className="text-teal-600" />,
    Percent: <Percent size={28} strokeWidth={2} className="text-teal-600" />,
    Stethoscope: <Stethoscope size={28} strokeWidth={2} className="text-teal-600" />,
    HeartHandshake: <HeartHandshake size={28} strokeWidth={2} className="text-teal-600" />,
    Sparkles: <Sparkles size={28} strokeWidth={2} className="text-teal-600" />,
    Apple: <Apple size={28} strokeWidth={2} className="text-teal-600" />,
    TrendingUp: <TrendingUp size={28} strokeWidth={2} className="text-teal-600" />,
    ShieldAlert: <ShieldAlert size={28} strokeWidth={2} className="text-teal-600" />,
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Subtle background decoration */}
        <div
          className="absolute -right-20 top-20 w-[420px] h-[420px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline and intro */}
            <div className="lg:col-span-7">
              <Reveal type="left">
                <div className="space-y-8">
                  <Headline as="h1" align="left" isHero>
                    {COMMUNITY_CONTENT.hero.headline}
                  </Headline>

                  <p className="font-body text-lg md:text-xl text-teal-950/80 max-w-[620px] leading-relaxed [text-wrap:pretty]">
                    {COMMUNITY_CONTENT.hero.paragraph}
                  </p>

                  <div>
                    <Button
                      href={COMMUNITY_CONTENT.hero.whatsappLink}
                      variant="primary"
                      fullWidthOnMobile
                    >
                      {COMMUNITY_CONTENT.hero.button}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Community Visual */}
            <div className="lg:col-span-5">
              <Reveal type="right" delay={150}>
                <SmartImage
                  src={COMMUNITY_CONTENT.hero.image}
                  alt="Diverse African parents sitting together chatting warmly with toddlers"
                  aspectRatio="3:2"
                  className="w-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MEMBERSHIP BENEFITS (Clean list with bare teal icons, no boxes) */}
      <Section bg="teal-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Sticky section title */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-6">
              <Headline as="h2" align="left">
                {COMMUNITY_CONTENT.benefits.headline}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                A complete ecosystem providing dependable child health guidance, weekly live sessions, and practical parenting support.
              </p>
              <div>
                <Button to="#join" variant="secondary">
                  Join Now
                </Button>
              </div>
            </div>

            {/* Right Column: Bare icon items with no box wrapping */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {COMMUNITY_CONTENT.benefits.items.map((benefit, idx) => (
                <Reveal key={benefit.title} type="up" delay={idx * 80}>
                  <div className="space-y-3">
                    <div className="w-12 h-12 flex items-center justify-start">
                      {iconMap[benefit.icon]}
                    </div>
                    <p className="font-body font-semibold text-teal-900 text-lg leading-snug">
                      {benefit.title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. WEEKLY TOPICS (Flowing set of soft rounded tiles of different fills) */}
      <Section bg="white">
        <Container>
          <div className="space-y-12">
            <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
              <Headline as="h2" align="auto">
                {COMMUNITY_CONTENT.topics.headline}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                {COMMUNITY_CONTENT.topics.intro}
              </p>
            </div>

            {/* Flowing soft rounded tiles with varied gentle fills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
              {COMMUNITY_CONTENT.topics.list.map((topic, idx) => (
                <Reveal key={topic.name} type="pop" delay={idx * 70}>
                  <div
                    className={`${topic.fill} rounded-[28px] px-7 py-6 flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1.5`}
                  >
                    <div className="shrink-0">{iconMap[topic.icon]}</div>
                    <span className="font-headline font-extrabold text-teal-900 text-lg md:text-xl tracking-tight">
                      {topic.name}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FINAL CTA PANEL (Floating rounded teal panel) */}
      <div id="join">
        <Panel bg="teal-700">
          {/* Subtle cropped heart motif */}
          <div
            className="absolute -right-16 -bottom-16 w-80 h-80 text-teal-600/30 pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
            </svg>
          </div>

          <Container>
            <div className="relative z-10 max-w-[720px] mx-auto text-left md:text-center space-y-6">
              <Headline as="h2" theme="dark" align="auto">
                {COMMUNITY_CONTENT.cta.headline}
              </Headline>

              <p className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]">
                {COMMUNITY_CONTENT.cta.paragraph}
              </p>

              <div className="pt-6 flex justify-start md:justify-center">
                <Button
                  href={COMMUNITY_CONTENT.cta.whatsappLink}
                  variant="primary"
                  fullWidthOnMobile
                >
                  {COMMUNITY_CONTENT.cta.button}
                </Button>
              </div>
            </div>
          </Container>
        </Panel>
      </div>
    </div>
  );
};
