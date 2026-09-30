import React from 'react';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  HeartHandshake,
  Database,
  Mail,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const PrivacyPolicy: React.FC = () => {
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
            <Reveal type="up">
              <Headline as="h1" align="auto" isHero>
                {"Your Privacy & {{Data Protection}}"}
              </Headline>
            </Reveal>

            <Reveal type="up" delay={100}>
              <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                How Baby First Health protects parent, caregiver, and candidate information across our educational programs, ebook purchases, and community forums.
              </p>
            </Reveal>

            <Reveal type="up" delay={150}>
              <div className="pt-2 flex flex-wrap items-center justify-start md:justify-center gap-3 text-xs md:text-sm text-teal-900/70 font-body">
                <span>Effective Date: October 2026</span>
                <span>•</span>
                <span>Data Protection Commitment</span>
                <span>•</span>
                <span>Baby First Health Registry</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. CORE PRIVACY PROVISIONS */}
      <Section bg="teal-50">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Section 1: Information We Collect */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <ShieldCheck size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  1. Information We Collect & Receive
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Baby First Health collects only the necessary details required to deliver our educational materials, verify certification credentials, and communicate with parents and caregivers.
                  </p>
                  <ul className="space-y-2.5 list-disc list-inside">
                    <li>
                      <strong>Certification Registration:</strong> Full legal name (as on national ID/passport), country of residence, place of birth, occupation, academic background, contact phone/WhatsApp, and email address.
                    </li>
                    <li>
                      <strong>Digital Purchases:</strong> Transaction IDs and email addresses provided during ebook checkout. All financial payment details (credit cards, mobile money, bank accounts) are processed securely by our certified merchant partner <strong>Selar</strong>; Baby First Health never receives, handles, or stores sensitive financial credentials.
                    </li>
                    <li>
                      <strong>Inquiries & Support:</strong> Information submitted voluntarily through our FAQ form, contact form, or direct WhatsApp support line.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: How We Use Your Data */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <UserCheck size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  2. Purpose & Use of Collected Information
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>We use your information exclusively for legitimate educational and service delivery purposes:</p>
                  <ul className="space-y-2.5 list-disc list-inside">
                    <li>
                      To evaluate candidate submissions, process study modules, and print verified, authentic certificates of completion.
                    </li>
                    <li>
                      To distribute ebook download links, study guides, and workshop worksheets directly to your email inbox.
                    </li>
                    <li>
                      To admit registered parents and caregivers into official WhatsApp peer-support channels and weekly live session links.
                    </li>
                    <li>
                      To respond directly to healthcare and child wellness questions directed to Nurse Dolly and our clinical team.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Strict Zero-Selling Policy */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <Lock size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  3. Zero-Selling & Anti-Commercial Guarantee
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <div className="bg-teal-50 rounded-[24px] p-6 text-teal-950 font-medium">
                    <strong>Our Absolute Privacy Promise:</strong> Baby First Health has never sold, rented, leased, or monetized parent, student, or infant information, and we never will. We do not provide your data to third-party advertising brokers, pharmaceutical manufacturers, or commercial lead networks.
                  </div>
                  <p>
                    Your contact information is strictly used for communications regarding your enrolled courses, purchases, or community notifications that you have explicitly opted into.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Infant & Child Privacy */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <HeartHandshake size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  4. Child & Family Confidentiality
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Baby First Health programs are designed for adult parents, professional nannies, and early-childhood educators. We do not knowingly collect personal identifiable information directly from children under 13 years of age.
                  </p>
                  <p>
                    When a parent provides context regarding an infant&apos;s developmental milestones, feeding schedule, or symptom history in community discussions, such details are treated with the highest degree of respect and parental discretion.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Data Retention & Your Rights */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <Database size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  5. Data Retention, Verification & Your Rights
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Candidate completion records are securely preserved in our academic registry to permit future verification when requested by prospective employers, families, or daycare centers.
                  </p>
                  <p>
                    <strong>Your Privacy Rights:</strong> You may at any time request a summary of the personal details we hold regarding your certifications, update outdated contact phone numbers, or request full deletion of non-essential records by contacting our privacy desk.
                  </p>
                </div>
              </div>

              {/* Privacy Inquiries Contact Box */}
              <div className="mt-6 pt-6 bg-teal-50 rounded-[24px] p-6 space-y-3">
                <h3 className="font-headline font-bold text-teal-900 text-lg">
                  Privacy Questions or Data Requests?
                </h3>
                <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                  To update your certification records, request deletion, or inquire about data security, please reach our administrative team:
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  <a
                    href="mailto:babyfirsthealth@gmail.com"
                    className="inline-flex items-center gap-2 text-teal-800 hover:text-orange-600 font-body font-bold text-sm transition-colors"
                  >
                    <Mail size={16} />
                    <span>babyfirsthealth@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/237650082327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-800 hover:text-orange-600 font-body font-bold text-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>+237 650082327</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
