import React from 'react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { ABOUT_CONTENT } from '../content/content';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Decorative background heart */}
        <div
          className="absolute -right-24 top-20 w-[420px] h-[420px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <div className="max-w-[840px] mx-auto text-left md:text-center space-y-8">
            <Headline as="h1" align="auto" isHero>
              {ABOUT_CONTENT.hero.headline}
            </Headline>

            <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              {ABOUT_CONTENT.hero.paragraph}
            </p>

            <div className="pt-2 flex justify-start md:justify-center">
              <Button to="/community" variant="primary" fullWidthOnMobile>
                Join Baby First Health
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MISSION (Floating Teal-700 Panel) */}
      <Panel bg="teal-700">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission Statement */}
            <div className="lg:col-span-7 space-y-6">
              <Headline as="h2" theme="dark" align="left">
                {ABOUT_CONTENT.mission.headline}
              </Headline>

              <p className="font-body text-xl md:text-2xl text-white font-medium leading-relaxed [text-wrap:pretty]">
                {ABOUT_CONTENT.mission.statement}
              </p>
            </div>

            {/* Right Column: Mission Image */}
            <div className="lg:col-span-5">
              <SmartImage
                src="/images/about-mission.jpg"
                alt="African family of three walking together in a sunny park"
                aspectRatio="3:2"
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </Panel>

      {/* 3. WHY WE EXIST (Split Section) */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-6">
              <SmartImage
                src="/images/trust-parent-child.jpg"
                alt="African father sitting on the floor with his 3-year-old daughter reading together"
                aspectRatio="3:2"
                className="w-full"
              />
            </div>

            {/* Right Column: Text */}
            <div className="lg:col-span-6 space-y-6">
              <Headline as="h2" align="left">
                {ABOUT_CONTENT.whyWeExist.headline}
              </Headline>

              <div className="space-y-4">
                {ABOUT_CONTENT.whyWeExist.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. WHAT WE BELIEVE (Statement Block) */}
      <Section bg="teal-50">
        <Container>
          <Reveal type="up">
            <div className="max-w-[800px] mx-auto text-left md:text-center space-y-6">
              <Headline as="h2" align="auto">
                {ABOUT_CONTENT.whatWeBelieve.headline}
              </Headline>

              <div className="space-y-4 pt-2">
                {ABOUT_CONTENT.whatWeBelieve.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5. OUR APPROACH (Split Section with Core Values) */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text */}
            <div className="lg:col-span-7 space-y-6">
              <Headline as="h2" align="left">
                {ABOUT_CONTENT.ourApproach.headline}
              </Headline>

              <div className="space-y-4">
                {ABOUT_CONTENT.ourApproach.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column: Soft Tinted Values Card (no borders, rounded 32px) */}
            <div className="lg:col-span-5 bg-teal-50 rounded-[32px] p-8 md:p-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-teal-600 shrink-0 pt-1">
                  <Sparkles size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-teal-900 text-lg">
                    Clear & Evidence-Grounded
                  </h3>
                  <p className="font-body text-sm text-teal-950/80 mt-1 leading-relaxed">
                    Stripping away confusion and conflicting advice to deliver simple, actionable truths.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-teal-600 shrink-0 pt-1">
                  <ShieldCheck size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-teal-900 text-lg">
                    Safe & Responsible
                  </h3>
                  <p className="font-body text-sm text-teal-950/80 mt-1 leading-relaxed">
                    Helping parents recognize red flags and seek professional healthcare without delay.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-teal-600 shrink-0 pt-1">
                  <Heart size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-body font-semibold text-teal-900 text-lg">
                    Caring Community Voice
                  </h3>
                  <p className="font-body text-sm text-teal-950/80 mt-1 leading-relaxed">
                    Standing beside families with patience, encouragement, and practical support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. FOUNDERS (Two-column Profiles) */}
      <Section bg="teal-50">
        <Container>
          <div className="space-y-12 md:space-y-16">
            <div className="max-w-[700px] mx-auto text-left md:text-center space-y-4">
              <Headline as="h2" align="auto">
                {ABOUT_CONTENT.founders.headline}
              </Headline>
            </div>

            {/* Founder Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
              {ABOUT_CONTENT.founders.members.map((founder, idx) => (
                <Reveal key={founder.name} type="up" delay={idx * 150} className="h-full">
                  <div className="bg-white rounded-[32px] p-6 md:p-8 space-y-6 flex flex-col h-full justify-between">
                    {/* Portrait in 4:5 rounded container */}
                    <div className="w-full">
                      <SmartImage
                        src={founder.image}
                        alt={`${founder.name} - ${founder.role}`}
                        aspectRatio="4:5"
                        className="w-full"
                      />
                    </div>

                    {/* Founder Bio */}
                    <div className="space-y-2 pt-2">
                      <h3 className="font-headline font-extrabold text-teal-900 text-2xl tracking-tight">
                        {founder.name}
                      </h3>
                      <p className="font-body font-semibold text-teal-600 text-sm">
                        {founder.role}
                      </p>
                      <p className="font-body text-base text-teal-950/80 pt-2 leading-relaxed [text-wrap:pretty]">
                        {founder.bio}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. FINAL CTA PANEL */}
      <Panel bg="teal-800">
        <Container>
          <div className="max-w-[720px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h2" theme="dark" align="auto">
              {"Raise Them With {{Better Knowledge}}."}
            </Headline>

            <p className="font-body text-lg text-white/90 leading-relaxed [text-wrap:pretty]">
              Join Dolly, Laurence, and a vibrant community of African parents learning together every week.
            </p>

            <div className="pt-4 flex justify-start md:justify-center">
              <Button to="/community" variant="primary" fullWidthOnMobile>
                View Community
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};
