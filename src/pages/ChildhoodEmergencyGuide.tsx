import React from 'react';
import {
  AlertTriangle,
  Flame,
  Bandage,
  AlertCircle,
  Activity,
  ShieldAlert,
  FileText,
  Video,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { EMERGENCY_GUIDE_CONTENT } from '../content/content';

export const ChildhoodEmergencyGuide: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    AlertTriangle: <AlertTriangle size={28} strokeWidth={2} className="text-teal-600" />,
    Flame: <Flame size={28} strokeWidth={2} className="text-teal-600" />,
    Bandage: <Bandage size={28} strokeWidth={2} className="text-teal-600" />,
    AlertCircle: <AlertCircle size={28} strokeWidth={2} className="text-teal-600" />,
    Activity: <Activity size={28} strokeWidth={2} className="text-teal-600" />,
    ShieldAlert: <ShieldAlert size={28} strokeWidth={2} className="text-teal-600" />,
    FileText: <FileText size={32} strokeWidth={2} className="text-teal-600" />,
    Video: <Video size={32} strokeWidth={2} className="text-teal-600" />,
    Headphones: <Headphones size={32} strokeWidth={2} className="text-orange-600" />,
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
                    {EMERGENCY_GUIDE_CONTENT.hero.headline}
                  </Headline>

                  <p className="font-body text-lg md:text-xl text-teal-950/80 max-w-[620px] leading-relaxed [text-wrap:pretty]">
                    {EMERGENCY_GUIDE_CONTENT.hero.paragraph}
                  </p>

                  <div>
                    <Button
                      href={EMERGENCY_GUIDE_CONTENT.hero.bundleLink}
                      variant="primary"
                      fullWidthOnMobile
                    >
                      {EMERGENCY_GUIDE_CONTENT.hero.button}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Emergency Guide Bundle Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal type="right" delay={150} className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[480px]">
                <img
                  src={EMERGENCY_GUIDE_CONTENT.hero.image}
                  alt="Childhood Emergency Guide 3-Volume Complete Bundle Cover Art"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE THREE ESSENTIAL VOLUMES SECTION */}
      <div id="volumes">
        <Section bg="teal-50">
          <Container>
            <div className="space-y-10">
              <div className="max-w-[760px] text-left space-y-3">
                <Headline as="h2" align="left">
                  {"Three Volumes. {{Complete Preparedness}}."}
                </Headline>
                <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                  Get the full 3-book bundle for complete coverage, or select individual volumes to target specific family needs.
                </p>
              </div>

              {/* Individual Volumes List (Clean white card layout, no tint teal bg, left-aligned, button directly beneath description) */}
              <div className="space-y-6">
                {EMERGENCY_GUIDE_CONTENT.volumes.map((vol, idx) => (
                  <Reveal key={vol.volume} type="up" delay={idx * 100}>
                    <div className="bg-white rounded-[28px] md:rounded-[36px] p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 text-left transition-transform duration-300 hover:-translate-y-1">
                      {/* Cover Image - transparent, no box, no padding, real sizeable on mobile and ok on desktop */}
                      <div className="w-full max-w-[240px] sm:w-48 md:w-52 lg:w-56 shrink-0 flex items-center justify-center sm:justify-start">
                        <img
                          src={vol.image}
                          alt={`${vol.volume}: ${vol.title}`}
                          className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Volume Info - Left-aligned, no kickers, button directly beneath description */}
                      <div className="space-y-3 flex-1 text-left w-full">
                        <h3 className="font-headline font-extrabold text-teal-900 text-2xl sm:text-3xl tracking-tight">
                          {vol.title}
                        </h3>
                        <p className="font-body font-semibold text-teal-700 text-base">
                          {vol.subtitle}
                        </p>
                        <p className="font-body text-base md:text-lg text-teal-950/80 max-w-2xl leading-relaxed [text-wrap:pretty]">
                          {vol.description}
                        </p>
                        <div className="pt-2">
                          <Button href={vol.link} variant="secondary">
                            {`Get ${vol.volume}`}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Direct Store Link banner */}
              <div className="text-left pt-2">
                <p className="font-body text-sm text-teal-950/70">
                  Prefer browsing all Baby First Health editions?{' '}
                  <a
                    href={EMERGENCY_GUIDE_CONTENT.hero.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-teal-800 hover:text-orange-500 underline"
                  >
                    Visit our official Selar store
                  </a>
                  .
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* 2. WHAT'S INSIDE (List with bare teal icons, no boxes) */}
      <Section bg="teal-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Sticky section title */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
              <Headline as="h2" align="left">
                {EMERGENCY_GUIDE_CONTENT.whatsInside.headline}
              </Headline>

              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                {EMERGENCY_GUIDE_CONTENT.whatsInside.intro}
              </p>

              <p className="font-body text-base text-teal-900 font-semibold leading-relaxed pt-2">
                {EMERGENCY_GUIDE_CONTENT.whatsInside.summary}
              </p>
            </div>

            {/* Right Column: Bare icon items list side by side */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {EMERGENCY_GUIDE_CONTENT.whatsInside.situations.map((item, idx) => (
                <Reveal key={item.text} type="up" delay={idx * 60}>
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-teal-100/40">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                      {iconMap[item.icon]}
                    </div>
                    <p className="font-body font-semibold text-teal-900 text-base md:text-lg leading-snug">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. FORMATS (Three soft tiles with different tint fills) */}
      <div id="formats">
        <Section bg="white">
          <Container>
            <div className="space-y-12">
              <div className="max-w-[700px] mx-auto text-left md:text-center space-y-4">
                <Headline as="h2" align="auto">
                  {EMERGENCY_GUIDE_CONTENT.formats.headline}
                </Headline>
                <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed">
                  {EMERGENCY_GUIDE_CONTENT.formats.intro}
                </p>
              </div>

              {/* Three soft tiles with varied fills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                {EMERGENCY_GUIDE_CONTENT.formats.items.map((fmt, idx) => (
                  <Reveal key={fmt.title} type="up" delay={idx * 120}>
                    <div
                      className={`${fmt.fill} rounded-[32px] p-8 md:p-10 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1.5`}
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 flex items-center justify-start">
                          {iconMap[fmt.icon]}
                        </div>
                        <h3 className="font-headline font-extrabold text-teal-900 text-2xl tracking-tight">
                          {fmt.title}
                        </h3>
                        <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                          {fmt.description}
                        </p>
                      </div>

                      <div className="pt-8">
                        <span className="font-body font-semibold text-teal-700 text-sm">
                          Included in guide
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* 4. BONUS IN FLOATING ROUNDED TEAL PANEL */}
      <Panel bg="teal-700">
        <Container>
          <div className="max-w-[720px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h2" theme="dark" align="auto">
              {EMERGENCY_GUIDE_CONTENT.bonus.headline}
            </Headline>

            <p className="font-body text-base md:text-lg text-white/90 leading-relaxed">
              {EMERGENCY_GUIDE_CONTENT.bonus.intro}
            </p>

            {/* Bonus Perks List */}
            <div className="space-y-3 pt-2">
              {EMERGENCY_GUIDE_CONTENT.bonus.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 justify-start md:justify-center text-white font-body text-base md:text-lg font-medium"
                >
                  <CheckCircle2 size={22} className="text-orange-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-start md:justify-center">
              <Button href={EMERGENCY_GUIDE_CONTENT.bonus.link} variant="soft" fullWidthOnMobile>
                {EMERGENCY_GUIDE_CONTENT.bonus.button}
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};
