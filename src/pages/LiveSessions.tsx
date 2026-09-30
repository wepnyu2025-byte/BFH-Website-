import React from 'react';
import {
  Calendar,
  Video,
  Users,
  MessageSquareQuote,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { LIVE_SESSIONS_CONTENT } from '../content/content';

export const LiveSessions: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Subtle decorative heart */}
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
            {/* Left Column: Headline and Intro */}
            <div className="lg:col-span-7">
              <Reveal type="left">
                <div className="space-y-8">
                  <Headline as="h1" align="left" isHero>
                    {LIVE_SESSIONS_CONTENT.hero.headline}
                  </Headline>

                  <p className="font-body text-lg md:text-xl text-teal-950/80 max-w-[620px] leading-relaxed [text-wrap:pretty]">
                    {LIVE_SESSIONS_CONTENT.hero.paragraph}
                  </p>

                  <div>
                    <Button to="#schedule" variant="primary" fullWidthOnMobile>
                      {LIVE_SESSIONS_CONTENT.hero.button}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Live Session Visual */}
            <div className="lg:col-span-5">
              <Reveal type="right" delay={150}>
                <SmartImage
                  src={LIVE_SESSIONS_CONTENT.hero.image}
                  alt="Health professional hosting an interactive live parenting session on laptop"
                  aspectRatio="3:2"
                  className="w-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. UPCOMING SESSIONS / SCHEDULE PLACEHOLDER (Marked TODO without inventing dates) */}
      <div id="schedule">
        <Section bg="teal-50">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-left md:text-center space-y-3">
                <Headline as="h2" align="auto">
                  {"Upcoming {{Live Broadcasts}}"}
                </Headline>
                <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed">
                  Every Saturday morning with healthcare practitioners and childcare specialists.
                </p>
              </div>

              {/* Friendly TODO Placeholder Box (soft rounded, zero borders, zero shadows) */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 text-left md:text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-body text-xs font-bold uppercase tracking-wider">
                  <Clock size={16} />
                  <span>TODO: Schedule & Join Link</span>
                </div>

                <div className="space-y-3 max-w-xl mx-auto">
                  <h3 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                    Next Saturday Session Link Coming Soon
                  </h3>
                  <p className="font-body text-base text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                    Specific session topics, exact broadcast times, and direct stream links will be published here prior to each Saturday. Community members receive reminders directly via email and Telegram.
                  </p>
                </div>

                <div className="pt-2 flex justify-start md:justify-center">
                  <Button to="/community" variant="secondary">
                    Join Community For Reminders
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      {/* 3. WHAT TO EXPECT (Split Section with Bare Teal Icons) */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Heading and Free membership note */}
            <div className="lg:col-span-6 space-y-6">
              <Headline as="h2" align="left">
                {LIVE_SESSIONS_CONTENT.whatToExpect.headline}
              </Headline>

              <div className="space-y-4">
                <p className="font-body text-lg md:text-xl font-semibold text-teal-700 leading-snug">
                  {LIVE_SESSIONS_CONTENT.whatToExpect.note}
                </p>
                <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                  Our live interactive calls bring parents together to discuss real everyday situations with certified practitioners in a welcoming, calm environment.
                </p>
              </div>

              <div className="pt-2">
                <Button to="/community" variant="primary">
                  Get Member Access
                </Button>
              </div>
            </div>

            {/* Right Column: Bare Teal Icon List */}
            <div className="lg:col-span-6 space-y-6">
              {LIVE_SESSIONS_CONTENT.whatToExpect.points.map((point, idx) => (
                <Reveal key={idx} type="up" delay={idx * 80}>
                  <div className="flex items-start gap-4">
                    <div className="text-teal-600 shrink-0 pt-1">
                      {idx === 0 && <Calendar size={28} strokeWidth={2} />}
                      {idx === 1 && <Users size={28} strokeWidth={2} />}
                      {idx === 2 && <Sparkles size={28} strokeWidth={2} />}
                      {idx === 3 && <MessageSquareQuote size={28} strokeWidth={2} />}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-teal-900 text-lg md:text-xl leading-snug">
                        {point}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FINAL CTA PANEL (Floating rounded teal panel) */}
      <Panel bg="teal-700">
        <Container>
          <div className="max-w-[720px] mx-auto text-left md:text-center space-y-6">
            <Headline as="h2" theme="dark" align="auto">
              {LIVE_SESSIONS_CONTENT.cta.headline}
            </Headline>

            <p className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]">
              {LIVE_SESSIONS_CONTENT.cta.paragraph}
            </p>

            <div className="pt-4 flex justify-start md:justify-center">
              <Button to="/community" variant="soft" fullWidthOnMobile>
                {LIVE_SESSIONS_CONTENT.cta.button}
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};
