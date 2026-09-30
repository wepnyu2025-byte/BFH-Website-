import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  GraduationCap,
  BookOpen,
  Users,
  FileCheck2,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const TermsOfService: React.FC = () => {
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
                {"Terms of Service & {{Medical Disclaimer}}"}
              </Headline>
            </Reveal>

            <Reveal type="up" delay={100}>
              <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                Clear, transparent guidelines outlining our healthcare education scope, professional certification policies, digital product licenses, and emergency protocols.
              </p>
            </Reveal>

            <Reveal type="up" delay={150}>
              <div className="pt-2 flex flex-wrap items-center justify-start md:justify-center gap-3 text-xs md:text-sm text-teal-900/70 font-body">
                <span>Effective Date: October 2026</span>
                <span>•</span>
                <span>Baby First Health Initiative</span>
                <span>•</span>
                <span>Founded by Dolly Kelly S., RN</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. CORE LEGAL AND MEDICAL DISCLAIMER SECTIONS */}
      <Section bg="teal-50">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Section 1: Crucial Medical & Emergency Care Notice */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <ShieldAlert size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  1. Medical & Emergency Care Disclaimer
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Baby First Health is a maternal, infant, and early-childhood health education initiative founded by Registered Nurse Dolly Kelly S. (SRN). Our mission is to educate, empower, and equip parents, caregivers, and childcare practitioners with evidence-based knowledge and practical caregiving skills.
                  </p>
                  <p className="bg-teal-50 rounded-[24px] p-6 text-teal-950 font-medium">
                    <strong>Critical Emergency Notice:</strong> Baby First Health does not operate an emergency medical facility, emergency hospital triage, or urgent clinical dispatch. If your baby or young child is experiencing severe respiratory distress, unresponsiveness, prolonged convulsions, severe burns, sudden anaphylaxis, or acute poisoning, immediately contact your local emergency number or transport your child to the nearest hospital casualty department without delay.
                  </p>
                  <p>
                    The information provided across our website, publications, webinars, and community forums is for general instructional and preventive purposes. It does not establish a formal patient-clinician relationship, nor should it ever substitute direct physical examination, laboratory diagnosis, or personalized treatment plans prescribed by a licensed pediatrician or medical practitioner.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Educational Scope & Certification Policies */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <GraduationCap size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  2. Certification Programs & Scope of Credentials
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Baby First Health offers specialized, structured training credentials, including the flagship <strong>Complete Integrated Family-care (CIF)</strong> program and individual certificates in Childcare & Safety, Early Development, Positive Psychology, Child Nutrition, and Childhood Emergency Awareness.
                  </p>
                  <p>
                    <strong>Credential Scope:</strong> Our certificates are certificates of completion designed to verify attendance, mastery of core curriculum topics, and evaluated practical safety understanding. They validate knowledge and caregiving competence for parents, nannies, daycare providers, and early childhood educators.
                  </p>
                  <p>
                    <strong>Statutory Licensing Notice:</strong> Baby First Health certificates do not constitute formal government nursing diplomas, state medical licenses, or hospital-accredited clinical credentials. Candidates must submit truthful personal details matching their official legal identity (passport or national ID card) for issuance and verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Digital Products, Ebooks & Purchase Terms */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <BookOpen size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  3. Digital Ebooks, Access & Personal License
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    All digital publications, including the 3-volume <strong>Childhood Emergency Guide</strong> collection, are distributed electronically through our verified checkout partner, Selar.
                  </p>
                  <p>
                    Upon purchasing an ebook or bundle, you receive a personal, non-exclusive, non-transferable digital license to download, read, and reference the material across your personal devices (smartphones, tablets, e-readers, and computers) with lifetime access.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> All text, illustrations, checklists, and visual guides are the exclusive intellectual property of Baby First Health. Unauthorized distribution, resale, reproduction, digital file-sharing, or commercial repurposing without prior written consent from Baby First Health is strictly prohibited under applicable copyright laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Community Conduct & Live Sessions */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <Users size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  4. Community Conduct & Safe Discussion Standards
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Participation in our official WhatsApp parent communities, webinars, and live workshops requires mutual respect, privacy, and constructive encouragement.
                  </p>
                  <p>
                    <strong>Prohibited Behavior:</strong> We maintain strict zero-tolerance for medical misinformation, promotion of unsafe home remedies or unverified herbal infusions in place of clinical care, commercial advertising spam, offensive language, or harassment of members.
                  </p>
                  <p>
                    <strong>Child Dignity & Privacy:</strong> While parents may discuss common symptoms, sleep patterns, or feeding hurdles, sensitive photographs of children or confidential family matters shared within groups must be treated with absolute confidentiality by all community participants.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Limitation of Liability & Contact */}
            <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-6 text-left">
              <div className="w-12 h-12 flex items-center justify-start text-teal-600">
                <FileCheck2 size={32} strokeWidth={2} />
              </div>

              <div className="space-y-3">
                <h2 className="font-headline font-extrabold text-teal-900 text-2xl md:text-3xl tracking-tight">
                  5. Limitation of Liability & Governance
                </h2>
                <div className="space-y-4 font-body text-base text-teal-950/85 leading-relaxed [text-wrap:pretty]">
                  <p>
                    Baby First Health compiles educational content in good faith using established pediatric, maternal, and early childhood safety guidelines. However, every child is biologically unique, and care decisions made in the home remain the sole responsibility of the parent or legal guardian. Baby First Health, its founder, and instructors are not liable for actions taken or omitted based on educational content.
                  </p>
                  <p>
                    These terms are governed in accordance with international healthcare education standards and local civil jurisprudence applicable to maternal health initiatives.
                  </p>
                </div>
              </div>

              {/* Legal Inquiries Contact Box */}
              <div className="mt-6 pt-6 bg-teal-50 rounded-[24px] p-6 space-y-3">
                <h3 className="font-headline font-bold text-teal-900 text-lg">
                  Questions Regarding Our Terms?
                </h3>
                <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                  For legal inquiries, credential verifications, or institutional partnerships, contact our administration desk:
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
