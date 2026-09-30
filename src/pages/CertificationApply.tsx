import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { CustomDropdown } from '../components/CustomDropdown';
import { CERTIFICATIONS_CONTENT } from '../content/content';

const ACADEMIC_LEVELS = [
  'High School / Secondary Certificate',
  'A-Level / College Diploma',
  'Vocational / Technical Certificate',
  "Bachelor's Degree",
  "Master's Degree / Doctorate",
  'Other Professional Qualification',
] as const;

const ENGLISH_PROFICIENCY_LEVELS = [
  'Native / Bilingual',
  'Fluent / Professional Proficiency',
  'Intermediate / Working Knowledge',
  'Basic Communication',
] as const;

export const CertificationApply: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || 'cif-certification';

  const [formData, setFormData] = useState({
    courseId: preselectedCourse,
    nameAsOnId: '',
    country: '',
    placeOfBirth: '',
    profession: '',
    contactNumber: '',
    email: '',
    academicLevel: ACADEMIC_LEVELS[0] as string,
    englishProficiency: ENGLISH_PROFICIENCY_LEVELS[1] as string,
    statement: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, courseId: preselectedCourse }));
    }
  }, [preselectedCourse]);

  const selectedProgram =
    CERTIFICATIONS_CONTENT.programs.find((p) => p.id === formData.courseId) ||
    CERTIFICATIONS_CONTENT.programs[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const constructEmailBody = () => {
    return `OFFICIAL APPLICATION DETAILS:
------------------------------------------
Program: ${selectedProgram.title}
Full Name (as on ID): ${formData.nameAsOnId}
Country of Residence: ${formData.country}
Place of Birth: ${formData.placeOfBirth}
Profession / Occupation: ${formData.profession}
Contact Number (WhatsApp): ${formData.contactNumber}
Email Address: ${formData.email}
Academic Level: ${formData.academicLevel}
English Proficiency: ${formData.englishProficiency}
Goals / Notes: ${formData.statement || 'None provided'}
------------------------------------------
Submitted via Baby First Health Portal`;
  };

  const constructWhatsAppMessage = () => {
    const text = `Hello Baby First Health, I would like to submit my formal application for the *${selectedProgram.title}*.\n\n*Name as on ID:* ${formData.nameAsOnId}\n*Country:* ${formData.country}\n*Place of Birth:* ${formData.placeOfBirth}\n*Profession:* ${formData.profession}\n*Phone:* ${formData.contactNumber}\n*Email:* ${formData.email}\n*Academic Level:* ${formData.academicLevel}\n*English Proficiency:* ${formData.englishProficiency}`;
    return encodeURIComponent(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger mailto link to babyfirsthealth@gmail.com
    const subject = encodeURIComponent(
      `Certification Application - ${selectedProgram.title} - ${formData.nameAsOnId}`
    );
    const body = encodeURIComponent(constructEmailBody());
    const mailtoUrl = `mailto:babyfirsthealth@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
    setIsSubmitted(true);
  };

  const courseOptions = CERTIFICATIONS_CONTENT.programs.map((program) => ({
    value: program.id,
    label: program.title,
    badge: program.isFlagship ? 'Flagship' : undefined,
  }));

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-36 md:pt-44 pb-[85px] md:pb-[100px] bg-white overflow-hidden">
        {/* Subtle decorative heart */}
        <div
          className="absolute -right-24 top-20 w-[420px] h-[420px] text-teal-50 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-60">
            <path d="M50 88.5L42.5 81.6C16 57.5 0 43 0 25C0 10.5 11.5 0 26 0C34.2 0 42 3.8 50 9.8C58 3.8 65.8 0 74 0C88.5 0 100 10.5 100 25C100 43 84 57.5 57.5 81.6L50 88.5Z" />
          </svg>
        </div>

        <Container>
          <Reveal type="up">
            <div className="max-w-3xl mx-auto space-y-6 text-left md:text-center">
              <div className="flex items-center justify-start md:justify-center gap-2">
                <Link
                  to="/certifications"
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-body text-sm font-semibold transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to All Certifications</span>
                </Link>
              </div>

              <Headline as="h1" align="auto" isHero>
                {"Formal Certification {{Application}}"}
              </Headline>

              <p className="font-body text-lg md:text-xl text-teal-950/80 leading-relaxed [text-wrap:pretty]">
                Please fill in your official details to register for your verified Baby First Health certificate program.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. APPLICATION FORM SECTION */}
      <Section bg="teal-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <Reveal type="up">
                <div className="bg-white rounded-[32px] p-8 md:p-12 text-left md:text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} strokeWidth={2.5} />
                  </div>

                  <Headline as="h2" align="auto">
                    {"Application {{Ready to Send}}"}
                  </Headline>

                  <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed">
                    Your formal application details for <strong>{selectedProgram.title}</strong> have been prepared for our admissions office at <strong>babyfirsthealth@gmail.com</strong>.
                  </p>

                  <div className="bg-teal-50 rounded-[24px] p-6 space-y-3 text-left">
                    <p className="font-body font-semibold text-teal-900 text-sm">
                      Candidate: {formData.nameAsOnId}
                    </p>
                    <p className="font-body text-xs text-teal-950/80">
                      Country: {formData.country} • Profession: {formData.profession} • Academic Level: {formData.academicLevel}
                    </p>
                    <p className="font-body text-xs text-teal-950/80">
                      Contact: {formData.contactNumber} • Email: {formData.email}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={`https://wa.me/237650082327?text=${constructWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <Link
                      to="/certifications"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-900 font-body font-semibold text-base transition-colors"
                    >
                      View Other Programs
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal type="up" delay={100}>
                <div className="bg-white rounded-[32px] p-8 md:p-12 space-y-8">
                  {/* Form header */}
                  <div className="space-y-2 pb-2">
                    <h3 className="font-headline font-extrabold text-teal-900 text-2xl tracking-tight">
                      Candidate Registration
                    </h3>
                    <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                      All applications are formally processed by Dolly and Laurence at our admissions desk. Official certificates of completion are issued in accordance with your verified identification.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Custom Branded Course selection */}
                    <CustomDropdown
                      name="courseId"
                      label="Selected Certificate Program *"
                      value={formData.courseId}
                      options={courseOptions}
                      onChange={(val) => handleDropdownChange('courseId', val)}
                      required
                    />

                    {/* Name as on ID */}
                    <div className="space-y-2">
                      <label
                        htmlFor="nameAsOnId"
                        className="block font-body text-sm font-semibold text-teal-900"
                      >
                        Full Name (as on official ID / Passport) *
                      </label>
                      <input
                        type="text"
                        id="nameAsOnId"
                        name="nameAsOnId"
                        value={formData.nameAsOnId}
                        onChange={handleInputChange}
                        placeholder="e.g. Dolly Laurence Ndifon"
                        required
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Two columns: Country and Place of Birth */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="country"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Country of Residence *
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="e.g. Cameroon / Nigeria / Ghana"
                          required
                          className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="placeOfBirth"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Place of Birth *
                        </label>
                        <input
                          type="text"
                          id="placeOfBirth"
                          name="placeOfBirth"
                          value={formData.placeOfBirth}
                          onChange={handleInputChange}
                          placeholder="e.g. Douala / Lagos / Yaoundé"
                          required
                          className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Two columns: Profession and Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="profession"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Current Profession / Occupation *
                        </label>
                        <input
                          type="text"
                          id="profession"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          placeholder="e.g. Parent, Nanny, Nurse, Teacher"
                          required
                          className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="contactNumber"
                          className="block font-body text-sm font-semibold text-teal-900"
                        >
                          Contact Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="e.g. +237 650082327"
                          required
                          className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email address with gmail address template sample */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block font-body text-sm font-semibold text-teal-900"
                      >
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. name@gmail.com"
                        required
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-full px-6 py-4 outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Two custom branded dropdowns: Academic Level and English Proficiency */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <CustomDropdown
                        name="academicLevel"
                        label="Highest Academic Level *"
                        value={formData.academicLevel}
                        options={ACADEMIC_LEVELS}
                        onChange={(val) => handleDropdownChange('academicLevel', val)}
                        required
                      />

                      <CustomDropdown
                        name="englishProficiency"
                        label="English Language Proficiency *"
                        value={formData.englishProficiency}
                        options={ENGLISH_PROFICIENCY_LEVELS}
                        onChange={(val) => handleDropdownChange('englishProficiency', val)}
                        required
                      />
                    </div>

                    {/* Personal goals / notes */}
                    <div className="space-y-2">
                      <label
                        htmlFor="statement"
                        className="block font-body text-sm font-semibold text-teal-900"
                      >
                        Personal Goals / Specific Experience (Optional)
                      </label>
                      <textarea
                        id="statement"
                        name="statement"
                        value={formData.statement}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Briefly state your background or what you hope to achieve through this certificate..."
                        className="w-full bg-teal-50 hover:bg-teal-100/60 focus:bg-white text-teal-950 placeholder:text-teal-900/40 font-body text-base rounded-[24px] p-5 outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit CTA - White text, bright orange button, simply "Submit" */}
                    <div className="pt-4 space-y-4">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        Submit
                      </button>

                      <p className="font-body text-xs text-teal-950/70 text-center leading-relaxed">
                        All applications are routed directly to <strong>babyfirsthealth@gmail.com</strong>. We will contact you within 24 hours to confirm your registration and tuition details.
                      </p>
                    </div>
                  </form>
                </div>
              </Reveal>
            )}

            {/* Direct Support Card without inline icon, button is WhatsApp Icon and Contact Support */}
            <Reveal type="up" delay={200}>
              <div className="mt-10 bg-white rounded-[28px] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-teal-900 text-lg">
                    Need Direct Support with Your Application?
                  </h4>
                  <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                    Connect with our admissions desk on WhatsApp at <strong>+237 650082327</strong> or email <strong>babyfirsthealth@gmail.com</strong>.
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <a
                    href="https://wa.me/237650082327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-body text-sm font-semibold transition-colors cursor-pointer"
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
  );
};
