import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { redeemAccessCode } from '../services/portalService';
import { DEFAULT_PROGRAM } from '../data/portalDefaults';

export const RedeemAccessCode: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const codeParam = searchParams.get('code') || searchParams.get('access_code') || '';
  const studentIdParam = searchParams.get('student_id') || '';

  const cachedStudentStr = localStorage.getItem('bfh_current_student');
  const cachedStudent = cachedStudentStr ? JSON.parse(cachedStudentStr) : null;

  const [accessCode, setAccessCode] = useState(codeParam);
  const [studentId, setStudentId] = useState(studentIdParam || cachedStudent?.studentId || '');
  const [fullName, setFullName] = useState(cachedStudent?.fullName || '');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activatedProgram, setActivatedProgram] = useState(DEFAULT_PROGRAM.title);

  useEffect(() => {
    if (codeParam) {
      setAccessCode(codeParam.toUpperCase());
    }
  }, [codeParam]);

  const handleRedeemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim() || !studentId.trim() || !fullName.trim()) {
      setErrorMsg('Please complete all fields (Access Code, Student ID, and Full Name).');
      return;
    }

    setIsRedeeming(true);
    setErrorMsg(null);

    const res = await redeemAccessCode(
      accessCode.trim(),
      cachedStudent?.id || `student_${Date.now()}`,
      studentId.trim(),
      fullName.trim()
    );

    setIsRedeeming(false);

    if (res.success) {
      setIsSuccess(true);
      if (res.programTitle) setActivatedProgram(res.programTitle);
    } else {
      setErrorMsg(res.error || 'Failed to redeem access code. Please check your credentials.');
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
              {"Redeem Your Access Code & {{Activate Course}}"}
            </Headline>
            <p className="font-body text-base md:text-lg text-teal-950/80 leading-relaxed [text-wrap:pretty]">
              Thank you for purchasing via Selar. Enter the access code from your digital delivery receipt below to instantly unlock your learning dashboard.
            </p>
          </div>
        </Container>
      </Section>

      <Section bg="teal-50" className="pt-[85px] pb-[85px]">
        <Container>
          <div className="max-w-[580px] mx-auto">
            {isSuccess ? (
              <div className="bg-white rounded-[32px] p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto text-teal-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-900 font-bold text-xs uppercase tracking-wider inline-block">
                    Enrollment Active
                  </span>
                  <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                    Welcome to Baby First Health!
                  </h2>
                  <p className="font-body text-sm text-teal-950/80 max-w-md mx-auto leading-relaxed">
                    Your access code has been verified and registered to <strong>{fullName}</strong> ({studentId}). You now have full access to the curriculum, video lectures, checkpoint quizzes, and Pedia AI coach.
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <Link
                    to="/portal"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300"
                  >
                    <span>Enter Student Learning Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-xs text-teal-950/60">
                    You can return to your courses anytime via the top navigation bar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
                <div className="space-y-1">
                  <h2 className="font-body font-semibold text-teal-900 text-xl">
                    Enter Selar Receipt Credentials
                  </h2>
                  <p className="font-body text-xs text-teal-950/70">
                    Each access code is single-use and permanently binds to your student record.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-[20px] bg-red-50 text-red-950 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRedeemSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Access Code from Selar Receipt *
                    </label>
                    <input
                      type="text"
                      required
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      placeholder="e.g. BFH-ECD-7892-4105"
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm font-mono font-bold text-teal-950 uppercase outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                      Your Official Student ID *
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

                  <button
                    type="submit"
                    disabled={isRedeeming}
                    className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-sm transition-all duration-300 mt-2"
                  >
                    {isRedeeming ? 'Validating Access Code...' : 'Activate Course Access'}
                  </button>
                </form>

                {/* Helpful Hints Box */}
                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-[20px] bg-teal-50/80 space-y-2 text-xs text-teal-950/80">
                    <div className="flex items-center gap-1.5 text-teal-900 font-semibold">
                      <HelpCircle className="w-4 h-4 text-teal-600" />
                      <span>Where is my Access Code?</span>
                    </div>
                    <p className="leading-relaxed">
                      Your access code is located inside the digital PDF or receipt file downloaded directly from Selar upon completing payment.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <Link
                      to="/apply"
                      className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
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
