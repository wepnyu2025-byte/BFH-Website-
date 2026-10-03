import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, MessageCircle, AlertCircle, ShieldCheck, ArrowRight, Loader2, Copy, Check } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { Button } from '../components/Button';
import { submitPaymentClaim, getPortalSettings } from '../services/portalService';
import { CurrencyCode, PortalSettings } from '../types/studentPortal';
import { DEFAULT_SETTINGS } from '../data/portalDefaults';

export const PaymentConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref') || searchParams.get('transaction_id') || '';

  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<PortalSettings>(DEFAULT_SETTINGS);
  const [copied, setCopied] = useState(false);

  // Stored registration or fallback demo student
  const cachedStudentStr = localStorage.getItem('bfh_current_student');
  const cachedStudent = cachedStudentStr ? JSON.parse(cachedStudentStr) : null;

  const [studentIdCode, setStudentIdCode] = useState(cachedStudent?.studentId || 'BFH-ECD-DEMO789X');
  const [studentName, setStudentName] = useState(cachedStudent?.fullName || 'Enrolled Student');
  const [payerPhone, setPayerPhone] = useState(cachedStudent?.whatsappNumber || '');
  const [currency, setCurrency] = useState<CurrencyCode>('XAF');
  const [txHint, setTxHint] = useState(refParam);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getPortalSettings().then(setSettings);

    // Smooth lazy-load simulation as requested
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(studentIdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPaymentClaim({
      studentId: cachedStudent?.id || 'demo_student_id',
      studentIdCode,
      studentName,
      payerPhoneOrName: payerPhone || studentName,
      currency,
      amountExpected: currency === 'XAF' ? 30000 : currency === 'NGN' ? 75000 : 50,
      transactionIdHint: txHint,
    });
    setIsSubmitted(true);
  };

  // WhatsApp prefilled message containing only: Full Name, Student ID, Program, Currency
  const whatsappText = encodeURIComponent(
    `Hello Baby First Health Admissions,\n\nI have completed my tuition payment on ConnectPaye.\n\nFull Name: ${studentName}\nStudent ID: ${studentIdCode}\nProgram: Early Childhood Development Certificate\nCurrency: ${currency}\n\nAttaching my payment confirmation screenshot.`
  );

  const cleanPhone = settings.businessWhatsApp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappText}`;

  return (
    <div className="pt-28 md:pt-36">
      <Section bg="white" className="pt-[85px] pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
              ConnectPaye Payment Redirect
            </span>
            <Headline as="h1" align="auto">
              {"Payment Received & {{Pending Verification}}"}
            </Headline>
            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              Your transaction submission has been safely received. Our admissions officers are currently cross-referencing your transaction with the ConnectPaye merchant ledger.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="max-w-[680px] mx-auto">
            {isLoading ? (
              <div className="bg-white rounded-[32px] p-12 text-center space-y-6">
                <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto" />
                <h2 className="font-body font-semibold text-teal-900 text-xl">
                  Connecting with admissions verification desk...
                </h2>
                <p className="font-body text-sm text-teal-950/70">
                  Please hold on while we synchronize your payment reference.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-8">
                {/* Status Card Banner */}
                <div className="bg-teal-50/80 rounded-[24px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-body font-semibold text-teal-900 text-base">
                        Status: Pending Verification
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                        30 - 60 MINS
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-teal-950/80 leading-relaxed">
                      Verification is typically completed within <strong>30 minutes to 1 hour</strong> during standard hours. Please check your registered email for confirmation and your password setup link once approved.
                    </p>
                  </div>
                </div>

                {/* Student ID Reminder Box */}
                <div className="bg-teal-900 text-white rounded-[24px] p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold block">
                    Your Official Student ID
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-white">
                      {studentIdCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-xs font-semibold text-teal-100 inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-teal-200/80">
                    Keep this ID handy. You will need it to verify your student credentials and view your certificate.
                  </p>
                </div>

                {/* Expedite via WhatsApp Button */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-body font-semibold text-teal-900 text-lg">
                    Have your receipt screenshot?
                  </h3>
                  <p className="font-body text-sm text-teal-950/75 leading-relaxed">
                    You can instantly speed up your enrollment verification by sending your payment confirmation screenshot directly to our verification desk on WhatsApp:
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-body font-bold text-sm transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 text-orange-400" />
                    <span>Send Receipt on WhatsApp</span>
                  </a>
                </div>

                {/* Optional Claim Form Details */}
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-body font-semibold text-teal-900 text-base">
                      Confirm Payment Information
                    </h3>
                    {isSubmitted && (
                      <span className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" /> Claim Logged
                      </span>
                    )}
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmitClaim} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                          Currency Paid In
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['XAF', 'NGN', 'USD'] as CurrencyCode[]).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setCurrency(c)}
                              className={`py-2.5 rounded-full text-xs font-semibold transition-colors ${
                                currency === c
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
                              }`}
                            >
                              {c} {c === 'XAF' ? '(30,000)' : c === 'NGN' ? '(75,000)' : '($50)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                          Phone Number or Name Used to Pay
                        </label>
                        <input
                          type="text"
                          required
                          value={payerPhone}
                          onChange={(e) => setPayerPhone(e.target.value)}
                          placeholder="e.g. +237 670 000 000 or Account Name"
                          className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                          ConnectPaye Transaction Reference (Optional)
                        </label>
                        <input
                          type="text"
                          value={txHint}
                          onChange={(e) => setTxHint(e.target.value)}
                          placeholder="e.g. CP-99201"
                          className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all"
                      >
                        Update Verification Details
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 rounded-[20px] bg-teal-50 text-xs text-teal-900 space-y-1">
                      <p className="font-semibold">Details registered successfully.</p>
                      <p className="text-teal-950/70">
                        Our admissions desk has logged your payer details and will approve your course access shortly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Return to Portal Link */}
                <div className="pt-2 text-center">
                  <Link
                    to="/portal"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-semibold"
                  >
                    <span>Already approved? Go to Student Portal Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};
