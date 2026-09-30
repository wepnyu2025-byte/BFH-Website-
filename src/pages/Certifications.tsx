import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  CheckCircle2,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Panel } from '../components/Panel';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CERTIFICATIONS_CONTENT } from '../content/content';

type Currency = 'ngn' | 'fcfa' | 'usd';

export const Certifications: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('usd');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Auto-detect user currency based on timezone or locale
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bfh_currency') as Currency | null;
      if (saved && (saved === 'ngn' || saved === 'fcfa' || saved === 'usd')) {
        setCurrency(saved);
        return;
      }

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const locale = (navigator.language || '').toLowerCase();

      if (tz.includes('Lagos') || locale.includes('ng') || tz.includes('Nigeria')) {
        setCurrency('ngn');
      } else if (
        tz.includes('Douala') ||
        locale.includes('cm') ||
        tz.includes('Cameroon') ||
        tz.includes('Central_Africa')
      ) {
        setCurrency('fcfa');
      } else {
        setCurrency('usd');
      }
    } catch {
      setCurrency('usd');
    }
  }, []);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('bfh_currency', newCurrency);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 lg:pt-48 pb-[85px] md:pb-[100px] lg:pb-[120px] bg-white overflow-hidden">
        {/* Subtle background decorative heart */}
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
                    {CERTIFICATIONS_CONTENT.hero.headline}
                  </Headline>

                  <p className="font-body text-lg md:text-xl text-teal-950/80 max-w-[620px] leading-relaxed [text-wrap:pretty]">
                    {CERTIFICATIONS_CONTENT.hero.paragraph}
                  </p>

                  <div>
                    <Button to="/certifications/apply" variant="primary">
                      {CERTIFICATIONS_CONTENT.hero.button}
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Certification Arch Mask Image */}
            <div className="lg:col-span-5">
              <Reveal type="right" delay={150}>
                <SmartImage
                  src={CERTIFICATIONS_CONTENT.hero.image}
                  alt="Caregiver and parent reviewing practical childcare training material attentively"
                  aspectRatio="3:2"
                  className="w-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. AVAILABLE PROGRAMS WITH AUTO CURRENCY & COLLAPSIBLE MODULES */}
      <div id="programs">
        <Section bg="teal-50">
          <Container>
            <div className="space-y-12">
              {/* Header and Currency Switcher (No Eyebrows, No Borders, No Shadows) */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div className="space-y-4 max-w-2xl">
                  <Headline as="h2" align="left">
                    {"Courses Designed For {{Real Caregivers}}"}
                  </Headline>
                  <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                    Practical, evidence-grounded childcare tracks for parents, home caregivers, and professional nannies.
                  </p>
                </div>

                {/* Currency Switcher (Clean rounded pill, zero borders, zero shadows) */}
                <div className="bg-white rounded-full p-1.5 inline-flex items-center gap-1 self-start md:self-auto">
                  <button
                    onClick={() => handleCurrencyChange('ngn')}
                    className={`px-4 py-2 rounded-full font-body text-xs font-bold transition-colors cursor-pointer ${
                      currency === 'ngn'
                        ? 'bg-teal-600 text-white'
                        : 'text-teal-900 hover:text-orange-600'
                    }`}
                  >
                    ₦ NGN
                  </button>
                  <button
                    onClick={() => handleCurrencyChange('fcfa')}
                    className={`px-4 py-2 rounded-full font-body text-xs font-bold transition-colors cursor-pointer ${
                      currency === 'fcfa'
                        ? 'bg-teal-600 text-white'
                        : 'text-teal-900 hover:text-orange-600'
                    }`}
                  >
                    FCFA
                  </button>
                  <button
                    onClick={() => handleCurrencyChange('usd')}
                    className={`px-4 py-2 rounded-full font-body text-xs font-bold transition-colors cursor-pointer ${
                      currency === 'usd'
                        ? 'bg-teal-600 text-white'
                        : 'text-teal-900 hover:text-orange-600'
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {/* 6 Programs List */}
              <div className="space-y-6 max-w-5xl mx-auto">
                {CERTIFICATIONS_CONTENT.programs.map((program, idx) => {
                  const isOpen = expandedId === program.id;
                  const priceDisplay = program.price[currency];

                  // Premium Sleek Gradient Card for Flagship CIF Program
                  if (program.isFlagship) {
                    return (
                      <Reveal key={program.id} type="up" delay={idx * 60}>
                        <div
                          className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white rounded-[32px] p-6 sm:p-8 md:p-12 transition-transform duration-300 hover:-translate-y-1.5"
                        >
                          {/* Always-visible Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div className="space-y-2.5 flex-1 min-w-0">
                              <span className="inline-block px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 font-body text-xs font-bold uppercase tracking-wider">
                                Flagship All-In-One Program
                              </span>

                              <h3 className="font-headline font-extrabold text-white text-xl sm:text-2xl md:text-3xl tracking-tight leading-snug break-words">
                                {program.title}
                              </h3>

                              <p className="font-body text-sm sm:text-base md:text-lg text-teal-100/90 max-w-2xl leading-relaxed [text-wrap:pretty]">
                                {program.subtitle}
                              </p>
                            </div>

                            {/* Price and Modules Toggle (Never overflows) */}
                            <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-2 md:pt-0">
                              <span className="font-headline font-extrabold text-orange-400 text-2xl sm:text-3xl md:text-4xl tracking-tight">
                                {priceDisplay}
                              </span>

                              <button
                                onClick={() => toggleExpand(program.id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-800/90 hover:bg-teal-700 text-white font-body text-xs md:text-sm font-semibold transition-colors cursor-pointer shrink-0"
                                aria-expanded={isOpen}
                              >
                                <span>Modules</span>
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-300 ${
                                    isOpen ? 'rotate-180 text-orange-400' : 'text-teal-200'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {/* Collapsible Animated Curriculum Section (Closed by default) */}
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                              isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="mt-8 pt-8 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {program.topics.map((topic, tIdx) => (
                                    <div
                                      key={tIdx}
                                      className="flex items-start gap-3 p-3 rounded-2xl bg-teal-800/50 text-teal-50 font-body text-sm"
                                    >
                                      <CheckCircle2
                                        size={18}
                                        className="text-orange-400 shrink-0 mt-0.5"
                                      />
                                      <span>{topic}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Application Action Button */}
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-teal-800/30 rounded-[24px] p-5 md:p-6">
                                  <div className="space-y-1">
                                    <p className="font-headline font-bold text-white text-base md:text-lg">
                                      Apply for Complete Integrated Family-care
                                    </p>
                                    <p className="font-body text-xs md:text-sm text-teal-200/90">
                                      Fill in your official candidate details to register with our admissions desk.
                                    </p>
                                  </div>

                                  <div className="shrink-0 w-full sm:w-auto">
                                    <Button
                                      to={`/certifications/apply?course=${program.id}`}
                                      variant="primary"
                                      fullWidthOnMobile
                                    >
                                      Apply Now
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  }

                  // Standard Clean Program Card (White background, zero borders, zero shadows)
                  return (
                    <Reveal key={program.id} type="up" delay={idx * 60}>
                      <div
                        className="bg-white rounded-[32px] p-6 sm:p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1.5"
                      >
                        {/* Always-visible Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                          <div className="space-y-2.5 flex-1 min-w-0">
                            <h3 className="font-headline font-extrabold text-teal-900 text-xl md:text-2xl tracking-tight break-words">
                              {program.title}
                            </h3>

                            <p className="font-body text-sm sm:text-base text-teal-950/80 max-w-2xl leading-relaxed [text-wrap:pretty]">
                              {program.subtitle}
                            </p>
                          </div>

                          {/* Price and Modules Toggle (Never overflows) */}
                          <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-2 md:pt-0">
                            <span className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                              {priceDisplay}
                            </span>

                            <button
                              onClick={() => toggleExpand(program.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-body text-xs md:text-sm font-semibold transition-colors cursor-pointer shrink-0"
                              aria-expanded={isOpen}
                            >
                              <span>Modules</span>
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${
                                  isOpen ? 'rotate-180 text-orange-600' : 'text-teal-700'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Animated Curriculum Section (Closed by default) */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="mt-8 pt-6 space-y-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {program.topics.map((topic, tIdx) => (
                                  <div
                                    key={tIdx}
                                    className="flex items-start gap-3 p-3 rounded-2xl bg-teal-50/70 text-teal-950 font-body text-sm"
                                  >
                                    <CheckCircle2
                                      size={18}
                                      className="text-teal-600 shrink-0 mt-0.5"
                                    />
                                    <span>{topic}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Application Action Button */}
                              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-teal-50 rounded-[24px] p-5 md:p-6">
                                <div className="space-y-1">
                                  <p className="font-headline font-bold text-teal-900 text-base">
                                    Ready to enroll in this course?
                                  </p>
                                  <p className="font-body text-xs text-teal-950/80">
                                    Includes all study modules, self-paced evaluations, and verified completion certificate.
                                  </p>
                                </div>

                                <div className="shrink-0 w-full sm:w-auto">
                                  <Button
                                    to={`/certifications/apply?course=${program.id}`}
                                    variant="primary"
                                    fullWidthOnMobile
                                  >
                                    Apply Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* Direct Support Card without inline icon, button is WhatsApp Icon and Contact Support */}
              <Reveal type="up" delay={200}>
                <div className="bg-white rounded-[32px] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-5xl mx-auto">
                  <div className="space-y-2 max-w-xl">
                    <h4 className="font-headline font-bold text-teal-900 text-lg md:text-xl">
                      Have Questions About Certification?
                    </h4>
                    <p className="font-body text-sm md:text-base text-teal-950/80 leading-relaxed">
                      Chat directly with our admissions and support team on WhatsApp at <strong>+237 650082327</strong> or email <strong>babyfirsthealth@gmail.com</strong>.
                    </p>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    <a
                      href="https://wa.me/237650082327"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-body text-base font-semibold transition-colors cursor-pointer"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                      <span>Contact Support</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      </div>

      {/* 3. STREAMLINED LEARNING PATHWAY (NO REDUNDANT INFORMATION) */}
      <Section bg="white">
        <Container>
          <div className="space-y-12">
            <div className="max-w-[700px] mx-auto text-left md:text-center space-y-4">
              <Headline as="h2" align="auto">
                {"Simple, Flexible {{Certification}}"}
              </Headline>
              <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                Designed for busy African parents and caregivers learning on their schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-teal-50 rounded-[28px] p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-headline font-extrabold text-xl flex items-center justify-center">
                  1
                </div>
                <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                  Choose & Apply
                </h3>
                <p className="font-body text-base text-teal-950/80 leading-relaxed">
                  Select your track and complete your formal candidate registration online.
                </p>
              </div>

              <div className="bg-teal-50 rounded-[28px] p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-headline font-extrabold text-xl flex items-center justify-center">
                  2
                </div>
                <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                  Learn At Your Pace
                </h3>
                <p className="font-body text-base text-teal-950/80 leading-relaxed">
                  Study clear, evidence-based modules anytime with practical demonstrations and guidance.
                </p>
              </div>

              <div className="bg-teal-50 rounded-[28px] p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-headline font-extrabold text-xl flex items-center justify-center">
                  3
                </div>
                <h3 className="font-headline font-extrabold text-teal-900 text-xl">
                  Earn Certificate
                </h3>
                <p className="font-body text-base text-teal-950/80 leading-relaxed">
                  Complete practical review questions and receive your verified Certificate of Completion.
                </p>
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
              {CERTIFICATIONS_CONTENT.cta.headline}
            </Headline>

            <p className="font-body text-base md:text-lg text-white/90 leading-relaxed [text-wrap:pretty]">
              {CERTIFICATIONS_CONTENT.cta.paragraph}
            </p>

            <div className="pt-4 flex justify-start md:justify-center">
              <Button to="/certifications/apply" variant="soft" fullWidthOnMobile>
                Apply Now
              </Button>
            </div>
          </div>
        </Container>
      </Panel>
    </div>
  );
};

