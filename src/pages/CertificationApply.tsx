import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Upload,
  Check,
  KeyRound
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { registerStudentLocallyOrFirestore, getPortalSettings } from '../services/portalService';
import { CurrencyCode, PortalSettings } from '../types/studentPortal';
import { DEFAULT_SETTINGS, DEFAULT_PROGRAM } from '../data/portalDefaults';

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
  const courseParam = searchParams.get('course');
  const isBccp = courseParam === 'cif-certification' || courseParam === 'bccp';

  const [settings, setSettings] = useState<PortalSettings>(DEFAULT_SETTINGS);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('XAF');

  const [formData, setFormData] = useState({
    fullName: '',
    countryOfResidence: 'Cameroon',
    stateRegion: '',
    placeOfBirth: '',
    whatsappNumber: '',
    email: '',
    profession: 'Parent / Caregiver',
    academicLevel: ACADEMIC_LEVELS[0] as string,
    englishProficiency: ENGLISH_PROFICIENCY_LEVELS[1] as string,
  });

  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [identityConfirmed, setIdentityConfirmed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedStudentId, setGeneratedStudentId] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    getPortalSettings().then(setSettings);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPassportPhoto(dataUrl);
        }
      };
      img.src = uploadEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert('Please read and agree to the terms and policies before registering.');
      return;
    }
    if (!identityConfirmed) {
      alert('Please confirm your verifiable identity and email address.');
      return;
    }
    if (!passportPhoto) {
      alert('Please upload a passport photograph.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerStudentLocallyOrFirestore({
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        countryOfResidence: formData.countryOfResidence,
        stateRegion: formData.stateRegion,
        placeOfBirth: formData.placeOfBirth,
        profession: formData.profession,
        academicLevel: formData.academicLevel,
        englishProficiency: formData.englishProficiency,
        profilePhotoUrl: passportPhoto,
        programId: DEFAULT_PROGRAM.id,
      });

      setGeneratedStudentId(res.studentId);
      setShowSuccessPopup(true);
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (generatedStudentId) {
      navigator.clipboard.writeText(generatedStudentId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleDownloadId = () => {
    if (!generatedStudentId) return;
    const content = `BABY FIRST HEALTH - OFFICIAL STUDENT CREDENTIALS
=====================================================
Student Name: ${formData.fullName}
Student ID: ${generatedStudentId}
Registered Program: Early Childhood Development Certificate
Registration Date: ${new Date().toLocaleDateString()}
Official Verification Portal: https://babyfirsthealth.netlify.app/portal
Support WhatsApp: ${settings.businessWhatsApp}
=====================================================
IMPORTANT: Save this document. You will need this Student ID to access your Student Portal and receive your accredited certificate upon completion.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BFH-Student-ID-${generatedStudentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPaymentUrl = () => {
    if (isBccp && settings.selarBccpLink) {
      return settings.selarBccpLink;
    }
    if (selectedCurrency === 'NGN') return settings.selarProductLinkNGN || settings.connectPayeLinkNGN;
    if (selectedCurrency === 'USD') return settings.selarProductLinkUSD || settings.connectPayeLinkUSD;
    return settings.selarProductLinkXAF || settings.connectPayeLinkXAF;
  };

  return (
    <div className="pt-28 md:pt-36">
      {/* Success Pop-up Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-[520px] w-full shadow-2xl space-y-6 text-center relative border border-teal-100">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="font-body font-semibold text-teal-900 text-2xl">
                Registration Successful!
              </h2>
              <p className="font-body text-sm font-normal text-teal-950/80 leading-relaxed">
                Your official student profile has been created.
              </p>
            </div>

            {/* Student ID Highlight Box */}
            <div className="bg-teal-900 text-white rounded-2xl p-5 space-y-2 text-left">
              <span className="text-[11px] uppercase tracking-wider text-teal-300 font-semibold block">
                Official Student ID
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-white">
                {generatedStudentId}
              </div>
            </div>

            {/* Delivery Notification Notice */}
            <div className="p-4 rounded-2xl bg-teal-50/80 text-left space-y-2 border border-teal-100/60">
              <p className="font-body text-xs font-normal text-teal-950/80 leading-relaxed">
                Your student ID will be sent via:
              </p>
              <ul className="space-y-1.5 text-xs text-teal-900 font-normal">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                  <span><strong>Email:</strong> {formData.email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                  <span><strong>WhatsApp:</strong> {formData.whatsappNumber}</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyId}
                className="flex-1 py-3 px-4 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                {copiedId ? <Check className="w-4 h-4 text-orange-500" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId ? 'Copied' : 'Copy Student ID'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSuccessPopup(false)}
                className="flex-1 py-3 px-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors"
              >
                Continue to Tuition Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <Section bg="white" className="pt-[85px] pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
              Clinical Certification Enrollment
            </span>
            <Headline as="h1" align="auto">
              {"Student Registration & {{Admissions}}"}
            </Headline>
            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              Register for the accredited <strong>Early Childhood Development Certificate</strong>. Complete the student application below to receive your permanent Student ID.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Registration Content */}
      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="max-w-[680px] mx-auto">
            {!generatedStudentId ? (
              /* Registration Form */
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-8">
                <div className="space-y-2">
                  <h2 className="font-body font-semibold text-teal-900 text-2xl">
                    Learner Profile Details
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-teal-950/70">
                    Your details will appear on your verified digital and printed certificate upon graduation.
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Full Legal Name (as it should appear on your Certificate) *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Marie Claire Fotso"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        Country of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        name="countryOfResidence"
                        value={formData.countryOfResidence}
                        onChange={handleInputChange}
                        placeholder="e.g. Cameroon, Nigeria"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        State / Region / Province *
                      </label>
                      <input
                        type="text"
                        required
                        name="stateRegion"
                        value={formData.stateRegion}
                        onChange={handleInputChange}
                        placeholder="e.g. Centre, Littoral, Lagos"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        Place of Birth (for registry) *
                      </label>
                      <input
                        type="text"
                        required
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        placeholder="e.g. Yaoundé, Douala"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        WhatsApp Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. +237 671 00 00 00"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Email Address (for portal access and password setup) *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. learner@example.com"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        Profession / Occupation
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="e.g. Nurse, Educator, Mother"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                        Academic Level
                      </label>
                      <select
                        name="academicLevel"
                        value={formData.academicLevel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                      >
                        {ACADEMIC_LEVELS.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Passport Photograph Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Passport Photograph *
                    </label>
                    {passportPhoto ? (
                      <div className="flex items-center gap-4 p-3 rounded-2xl bg-teal-50 border border-teal-100">
                        <img
                          src={passportPhoto}
                          alt="Passport"
                          className="w-14 h-14 rounded-full object-cover border-2 border-teal-600 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-teal-900 truncate">Passport photo attached</p>
                          <p className="text-[11px] text-teal-950/60 font-normal">Ready for Student ID</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPassportPhoto(null)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-full border-2 border-dashed border-teal-200 bg-teal-50/50 hover:bg-teal-50 text-teal-900 text-xs font-semibold cursor-pointer transition-colors">
                        <Upload className="w-4 h-4 text-teal-600" />
                        <span>Upload Passport Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Selected Program Box */}
                  <div className="p-4 rounded-[20px] bg-teal-50/80 space-y-2">
                    <span className="text-xs uppercase font-semibold text-teal-800 tracking-wider">
                      Enrolling Program
                    </span>
                    <h3 className="font-body font-semibold text-teal-900 text-base">
                      {DEFAULT_PROGRAM.title}
                    </h3>
                    {settings.promoConfig?.isActive ? (
                      <p className="font-body text-xs text-teal-950/80 leading-relaxed font-normal">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold text-[10px] mr-1.5 uppercase">
                          {settings.promoConfig.badgeText || 'PROMO'}
                        </span>
                        Tuition:{' '}
                        <span className="line-through text-teal-950/50">30,000 XAF</span>{' '}
                        <strong className="text-orange-600 font-bold">
                          {settings.promoConfig.promoPriceXAF?.toLocaleString() || '10,000'} XAF
                        </strong>{' '}
                        •{' '}
                        <span className="line-through text-teal-950/50">75,000 NGN</span>{' '}
                        <strong className="text-orange-600 font-bold">
                          {settings.promoConfig.promoPriceNGN?.toLocaleString() || '25,000'} NGN
                        </strong>{' '}
                        •{' '}
                        <span className="line-through text-teal-950/50">$50</span>{' '}
                        <strong className="text-orange-600 font-bold">
                          ${settings.promoConfig.promoPriceUSD || 18} USD
                        </strong>{' '}
                        (Self-paced, clinical faculty feedback, accredited diploma).
                      </p>
                    ) : (
                      <p className="font-body text-xs text-teal-950/75 leading-relaxed font-normal">
                        Tuition: 30,000 XAF • 75,000 NGN • $50 USD (Self-paced, clinical faculty feedback, accredited diploma).
                      </p>
                    )}
                  </div>

                  {/* Verification & Consent Checkboxes */}
                  <div className="pt-2 space-y-3">
                    <label className="flex items-start gap-2.5 cursor-pointer text-sm font-normal text-teal-950/80 select-none">
                      <input
                        type="checkbox"
                        required
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-teal-300 text-teal-600 focus:ring-0 shrink-0 cursor-pointer"
                      />
                      <span className="leading-snug">
                        I have read and agree to the{' '}
                        <Link
                          to="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-700 underline font-normal hover:text-teal-900"
                        >
                          terms and policies
                        </Link>.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-sm font-normal text-teal-950/80 select-none">
                      <input
                        type="checkbox"
                        required
                        checked={identityConfirmed}
                        onChange={(e) => setIdentityConfirmed(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-teal-300 text-teal-600 focus:ring-0 shrink-0 cursor-pointer"
                      />
                      <span className="leading-snug">
                        I confirm that I am a real person and have uploaded a real and verifiable identity and email address.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAgreed || !identityConfirmed || !passportPhoto}
                    className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-base transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </form>
              </div>
            ) : (
              /* Registration Success & Next Steps */
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-8 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto text-teal-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-body font-semibold text-teal-900 text-2xl sm:text-3xl">
                    Registration Successful!
                  </h2>
                  <p className="font-body text-sm text-teal-950/80 max-w-md mx-auto">
                    Your official Baby First Health student account has been created. Save your Student ID securely below.
                  </p>
                </div>

                {/* Student ID Card */}
                <div className="bg-teal-900 text-white rounded-[24px] p-6 sm:p-8 space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold">
                      Official Student ID
                    </span>
                    <span className="px-3 py-1 rounded-full bg-teal-800 text-[11px] font-bold text-teal-200">
                      STATUS: REGISTERED
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {passportPhoto && (
                      <img
                        src={passportPhoto}
                        alt="Student Passport"
                        className="w-16 h-16 rounded-full object-cover border-2 border-teal-400 shrink-0 shadow-md"
                      />
                    )}
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm font-semibold text-teal-100 truncate">{formData.fullName}</div>
                      <div className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white truncate">
                        {generatedStudentId}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-teal-200/90 font-normal pt-1 border-t border-teal-800/80">
                    Your student ID has been sent via email to <strong className="text-white">{formData.email}</strong> and via WhatsApp to <strong className="text-white">{formData.whatsappNumber}</strong>.
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-xs font-semibold text-teal-100 inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId ? 'Copied' : 'Copy Student ID'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadId}
                      className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-xs font-semibold text-teal-100 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download ID Card</span>
                    </button>
                  </div>
                </div>

                {/* Currency & Tuition Selection */}
                <div className="text-left space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-teal-900">
                    Select Tuition Currency:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['XAF', 'NGN', 'USD'] as CurrencyCode[]).map((cur) => {
                      const promoMultiplier = isBccp ? 3 : 1;
                      const origXAF = isBccp ? '100,000' : '30,000';
                      const origNGN = isBccp ? '250,000' : '75,000';
                      const origUSD = isBccp ? '165' : '50';
                      const promoXAF = ((settings.promoConfig?.promoPriceXAF || 10000) * promoMultiplier).toLocaleString();
                      const promoNGN = ((settings.promoConfig?.promoPriceNGN || 25000) * promoMultiplier).toLocaleString();
                      const promoUSD = (settings.promoConfig?.promoPriceUSD || 18) * promoMultiplier;

                      return (
                        <button
                          key={cur}
                          type="button"
                          onClick={() => setSelectedCurrency(cur)}
                          className={`py-3 rounded-[16px] text-xs font-bold transition-colors ${
                            selectedCurrency === cur
                              ? 'bg-teal-600 text-white'
                              : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
                          }`}
                        >
                          {cur}{' '}
                          {cur === 'XAF'
                            ? settings.promoConfig?.isActive
                              ? `(${promoXAF})`
                              : `(${origXAF})`
                            : cur === 'NGN'
                            ? settings.promoConfig?.isActive
                              ? `(${promoNGN})`
                              : `(${origNGN})`
                            : settings.promoConfig?.isActive
                            ? `($${promoUSD})`
                            : `($${origUSD})`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment CTA */}
                <div className="space-y-4 pt-2">
                  <a
                    href={getPaymentUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-base transition-all duration-300"
                  >
                    <span>Proceed to Tuition Payment on Selar ({selectedCurrency})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-xs text-teal-950/70">
                    After completing your purchase on Selar, you will receive an Access Code in your digital receipt. You will be redirected back to activate your course access immediately.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold">
                    <Link
                      to="/redeem"
                      className="px-5 py-2.5 rounded-full bg-teal-50 text-teal-900 hover:bg-teal-100 transition-colors inline-flex items-center gap-1.5"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-orange-500" />
                      <span>Have your Access Code? Redeem Here</span>
                    </Link>
                    <Link
                      to="/payment-confirmation"
                      className="text-teal-700 hover:text-teal-900 underline"
                    >
                      Manual payment verification status
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
