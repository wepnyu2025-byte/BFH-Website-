import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { retrievePairedAccessCode } from '../services/portalService';
import { DEFAULT_PROGRAM } from '../data/portalDefaults';

export const RedeemAccessCode: React.FC = () => {
  const [searchParams] = useSearchParams();

  const studentIdParam = searchParams.get('student_id') || searchParams.get('id') || '';
  const emailParam = searchParams.get('email') || '';
  const nameParam = searchParams.get('name') || '';

  const cachedStudentStr = typeof window !== 'undefined' ? localStorage.getItem('bfh_current_student') : null;
  const cachedStudent = cachedStudentStr ? JSON.parse(cachedStudentStr) : null;

  const [studentId, setStudentId] = useState(studentIdParam || cachedStudent?.studentId || '');
  const [email, setEmail] = useState(emailParam || cachedStudent?.email || '');
  const [fullName, setFullName] = useState(nameParam || cachedStudent?.fullName || '');

  const [isRetrieving, setIsRetrieving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [retrievedAccessCode, setRetrievedAccessCode] = useState<string | null>(null);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  useEffect(() => {
    if (studentIdParam) setStudentId(studentIdParam.toUpperCase());
    if (emailParam) setEmail(emailParam);
    if (nameParam) setFullName(nameParam);
  }, [studentIdParam, emailParam, nameParam]);

  const handleRetrieveCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !email.trim() || !fullName.trim()) {
      setErrorMsg('Please enter your full name, official Student ID, and registered email address.');
      return;
    }

    setIsRetrieving(true);
    setErrorMsg(null);

    const res = await retrievePairedAccessCode(studentId.trim(), email.trim(), fullName.trim());

    setIsRetrieving(false);

    if (res.success && res.accessCode) {
      setRetrievedAccessCode(res.accessCode);
      // Cache student profile in local storage
      if (res.student) {
        try {
          localStorage.setItem('bfh_current_student', JSON.stringify(res.student));
          localStorage.setItem(`bfh_student_${res.student.studentId}`, JSON.stringify(res.student));
        } catch {}
      }
    } else {
      setErrorMsg(
        res.error ||
          'No matching student record found. Please verify your Student ID and Email, or contact admissions on WhatsApp.'
      );
    }
  };

  const handleCopyCode = () => {
    if (retrievedAccessCode) {
      navigator.clipboard.writeText(retrievedAccessCode);
      setHasCopiedCode(true);
      setTimeout(() => setHasCopiedCode(false), 2500);
    }
  };

  return (
    <div className="pt-28 md:pt-36">
      <Section bg="white" className="pt-[85px] pb-12">
        <Container>
          <div className="max-w-[760px] mx-auto text-left md:text-center space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
              Selar Product Access Portal
            </span>
            <Headline as="h1" align="auto">
              {"Retrieve Your Access Code & {{Enter Portal}}"}
            </Headline>
            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              Thank you for purchasing via Selar. Input your registered details below to automatically receive your paired access code and unlock your student dashboard.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="max-w-[580px] mx-auto">
            {retrievedAccessCode ? (
              <div className="bg-white rounded-[32px] p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto text-teal-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider inline-block">
                    Access Code Ready
                  </span>
                  <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                    Here is your Access Code
                  </h2>
                  <p className="font-body text-sm text-teal-950/80 max-w-md mx-auto leading-relaxed">
                    This single-use access code is paired to <strong>{fullName}</strong> ({studentId}). Copy it below to enter your student portal.
                  </p>
                </div>

                {/* Prominent Access Code Display Box */}
                <div className="bg-teal-900 text-white rounded-2xl p-5 space-y-3 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-teal-300 font-semibold block">
                    Your Paired Course Access Code
                  </span>
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-white select-all">
                    {retrievedAccessCode}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="mt-2 px-5 py-2.5 rounded-full bg-white text-teal-950 hover:bg-teal-50 text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {hasCopiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Access Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-teal-800" />
                        <span>Copy Access Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Helpful Instruction Box */}
                <div className="p-4 rounded-2xl bg-teal-50/80 text-left space-y-1.5 border border-teal-100/60 text-xs text-teal-950/80">
                  <div className="flex items-center gap-1.5 font-bold text-teal-900">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Next Step: Student Portal Login</span>
                  </div>
                  <p className="leading-relaxed">
                    When you tap the button below, the Student Portal opens:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Paste your access code in the <strong>paste access code here</strong> field</li>
                    <li>Input your Student ID in the <strong>input your student ID here</strong> field</li>
                  </ul>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    to={`/portal?access_code=${retrievedAccessCode}&student_id=${studentId}&name=${encodeURIComponent(fullName)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300"
                  >
                    <span>Go to Student portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-xs text-teal-950/60">
                    Your credentials have been automatically loaded into the portal login fields.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-body font-semibold text-teal-900 text-xl">
                    Retrieve Your Access Code
                  </h2>
                  <p className="font-body text-xs text-teal-950/70">
                    Enter the exact Name, Student ID, and Email used on your registration form.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-[20px] bg-red-50 text-red-950 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRetrieveCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Marie Claire Fotso"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Official Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                      placeholder="e.g. BFH-ECD-XXXXXXXX"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm font-mono text-teal-950 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Registered Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marie@example.com"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isRetrieving}
                    className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-sm transition-all duration-300 mt-2 cursor-pointer"
                  >
                    {isRetrieving ? 'Verifying Student Record...' : 'Retrieve Access Code'}
                  </button>
                </form>

                {/* Helpful Hints Box */}
                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-[20px] bg-teal-50/80 space-y-2 text-xs text-teal-950/80">
                    <div className="flex items-center gap-1.5 text-teal-900 font-semibold">
                      <HelpCircle className="w-4 h-4 text-teal-600" />
                      <span>How this works</span>
                    </div>
                    <p className="leading-relaxed">
                      When you completed your registration, your Student ID was automatically paired with an Access Code. Once your Selar payment is processed, entering your details above delivers your code instantly.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <Link
                      to="/apply"
                      className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2"
                    >
                      Haven't registered yet? Register here to get your Student ID
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
