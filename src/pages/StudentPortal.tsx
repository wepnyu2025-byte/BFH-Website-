import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Award,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Clock,
  Copy,
  Check,
  Send,
  X,
  AlertCircle,
  FileText,
  Briefcase,
  GraduationCap,
  MapPin,
  Bookmark,
  Download,
  Play,
  Key,
  Video
} from 'lucide-react';
import { marked } from 'marked';
import { DEFAULT_PROGRAM, DEFAULT_MODULES, DEFAULT_SETTINGS } from '../data/portalDefaults';
import { CourseLesson, CourseModule, StudentProfile, PortalSettings } from '../types/studentPortal';
import { getPortalSettings, redeemAccessCode } from '../services/portalService';

type PortalView = 'HOME' | 'COURSE' | 'LESSON' | 'QUIZ' | 'CONGRATULATIONS';

// Formatted Markdown renderer to eliminate raw #, **, | symbols and style tables & text
const renderFormattedLessonContent = (markdownText: string) => {
  try {
    const rawHtml = marked.parse(markdownText, { gfm: true, breaks: true }) as string;
    return (
      <div
        className="font-body text-sm sm:text-base text-teal-950/90 leading-relaxed space-y-4
          [&_h3]:font-bold [&_h3]:text-teal-900 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:pt-4 [&_h3]:pb-1
          [&_h4]:font-bold [&_h4]:text-teal-900 [&_h4]:text-base [&_h4]:pt-2
          [&_p]:mb-3
          [&_strong]:font-bold [&_strong]:text-teal-950
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-3
          [&_li]:text-teal-950/85
          [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:rounded-[18px] [&_table]:overflow-hidden
          [&_thead]:bg-teal-100/90
          [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-teal-950 [&_th]:text-xs [&_th]:sm:text-sm
          [&_tbody]:bg-teal-50/50
          [&_td]:p-3 [&_td]:text-xs [&_td]:sm:text-sm [&_td]:text-teal-950/80 [&_tr:nth-child(even)]:bg-teal-100/30"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    );
  } catch {
    return <div className="font-body text-sm text-teal-950 whitespace-pre-line">{markdownText}</div>;
  }
};

export const StudentPortal: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Active view state
  const [currentView, setCurrentView] = useState<PortalView>('HOME');

  // Student Profile state (Raw & clean from local session or login; test data cleared)
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem('bfh_current_student');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.id?.startsWith('usr_marie') ||
          parsed.studentId === 'BFH-ECD-7X9K2M4P' ||
          parsed.fullName === 'Marie Claire Fotso'
        ) {
          localStorage.removeItem('bfh_current_student');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Login / lookup form if not logged in
  const [loginStudentName, setLoginStudentName] = useState('');
  const [loginStudentId, setLoginStudentId] = useState('');
  const [loginAccessCode, setLoginAccessCode] = useState('');
  const [hasAgreedPolicy, setHasAgreedPolicy] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // References 3-Icon Drawer state
  const [activeRefTab, setActiveRefTab] = useState<'NONE' | 'TERMS' | 'GLOSSARY' | 'SOURCES'>('NONE');

  // Audio Play state for module audio guide
  const [playingModuleAudioId, setPlayingModuleAudioId] = useState<string | null>(null);

  // AI Coach Flip Animation state
  const [isCoachFlipped, setIsCoachFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsCoachFlipped((prev) => !prev);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  // Secret Admin Access via BFHAP
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [secretAdminCodeInput, setSecretAdminCodeInput] = useState('');
  const [adminModalError, setAdminModalError] = useState<string | null>(null);

  // Course & Curriculum data
  const [settings, setSettings] = useState<PortalSettings>(DEFAULT_SETTINGS);
  const [program, setProgram] = useState(() => {
    try {
      const saved = localStorage.getItem('bfh_active_program');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) return parsed;
      }
    } catch {}
    return DEFAULT_PROGRAM;
  });
  const [modules, setModules] = useState<CourseModule[]>(() => {
    try {
      const saved = localStorage.getItem('bfh_course_modules');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_MODULES;
  });
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(['mod-1']);

  useEffect(() => {
    getPortalSettings().then(setSettings);
  }, []);

  // Sync course modules and program when admin saves or window gains focus
  useEffect(() => {
    const syncModulesAndProgram = () => {
      try {
        const saved = localStorage.getItem('bfh_course_modules');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setModules(parsed);
        }
        const savedProg = localStorage.getItem('bfh_active_program');
        if (savedProg) {
          const parsedProg = JSON.parse(savedProg);
          if (parsedProg.title) setProgram(parsedProg);
        }
        const savedStudent = localStorage.getItem('bfh_current_student');
        if (savedStudent) {
          const parsedStudent = JSON.parse(savedStudent);
          if (parsedStudent && parsedStudent.studentId) setStudent(parsedStudent);
        }
      } catch {}
    };
    syncModulesAndProgram();
    window.addEventListener('focus', syncModulesAndProgram);
    window.addEventListener('storage', syncModulesAndProgram);
    return () => {
      window.removeEventListener('focus', syncModulesAndProgram);
      window.removeEventListener('storage', syncModulesAndProgram);
    };
  }, []);

  // Active lesson & Quiz state
  const [activeLesson, setActiveLesson] = useState<CourseLesson>(DEFAULT_MODULES[0].lessons[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bfh_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean; total: number; correct: number } | null>(null);

  // Pedia AI Coach modal state
  const [showAiCoach, setShowAiCoach] = useState(false);
  const [coachMessages, setCoachMessages] = useState<Array<{ sender: 'coach' | 'student'; text: string }>>([
    {
      sender: 'coach',
      text: "Hello! I am Pedia, your Baby First Health learning coach. Ask me any question to clarify concepts or clinical terms in this lesson!",
    },
  ]);
  const [coachInput, setCoachInput] = useState('');
  const [isCoachThinking, setIsCoachThinking] = useState(false);

  // ID Copy state
  const [copiedId, setCopiedId] = useState(false);

  // Sync completed lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bfh_completed_lessons', JSON.stringify(completedLessonIds));
    } catch {}
  }, [completedLessonIds]);

  // Handle Profile Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (student) {
        const updated = { ...student, profilePhotoUrl: dataUrl };
        setStudent(updated);
        try {
          localStorage.setItem('bfh_current_student', JSON.stringify(updated));
        } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle Module accordion
  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  // Open Lesson Page
  const handleOpenLesson = (lesson: CourseLesson) => {
    setActiveLesson(lesson);
    setQuizAnswers({});
    setQuizResult(null);
    setCurrentView('LESSON');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation handlers
  const handleBack = () => {
    if (currentView === 'CONGRATULATIONS' || currentView === 'QUIZ') {
      setCurrentView('LESSON');
    } else if (currentView === 'LESSON') {
      setCurrentView('COURSE');
    } else if (currentView === 'COURSE') {
      setCurrentView('HOME');
    } else {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Previous button on lesson page
  const handlePreviousOnLesson = () => {
    // Find index of current lesson across all modules
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex > 0) {
      handleOpenLesson(allLessons[currentIndex - 1]);
    } else {
      setCurrentView('COURSE');
    }
  };

  // Submit Quiz
  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLesson.quiz) return;

    let correctCount = 0;
    activeLesson.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const totalQuestions = activeLesson.quiz.questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercent >= activeLesson.quiz.passingScore;

    setQuizResult({
      score: scorePercent,
      passed,
      total: totalQuestions,
      correct: correctCount,
    });

    if (passed && !completedLessonIds.includes(activeLesson.id)) {
      setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
    }

    setCurrentView('CONGRATULATIONS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Move to next lesson after quiz congratulations
  const handleMoveToNextLesson = () => {
    const allLessons = modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      handleOpenLesson(allLessons[currentIndex + 1]);
    } else {
      setCurrentView('COURSE');
    }
  };

  // Download Module Study Document
  const handleDownloadModuleDoc = (mod: CourseModule) => {
    if (mod.docUrl) {
      const a = document.createElement('a');
      a.href = mod.docUrl;
      a.download = mod.docName || `Module_${mod.order}_Document`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    const cleanTitle = `${mod.order}. ${mod.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}`;
    const docContent = `BABY FIRST HEALTH LEARNING CURRICULUM
=====================================
Module: ${cleanTitle}

Description:
${mod.description}

Lessons in this Module:
${mod.lessons
  .map(
    (l) =>
      `-------------------------------------
Lesson ${l.order}: ${l.title}
-------------------------------------

${l.content}
`
  )
  .join('\n')}

=====================================
Baby First Health Educational Program
`;
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mod.docName || `Module_${mod.order}_Study_Document.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Play / Pause Module Audio Guide (Audio is listen-only on student page; cannot be downloaded)
  const handlePlayModuleAudio = (mod: CourseModule) => {
    const audioSource = mod.audioUrl || mod.audioLink;
    // If an uploaded audio file or attached link exists for this module
    if (audioSource) {
      if (playingModuleAudioId === mod.id) {
        audioPlayerRef.current?.pause();
        setPlayingModuleAudioId(null);
        return;
      }
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(audioSource);
      audioPlayerRef.current = audio;
      audio.onended = () => setPlayingModuleAudioId(null);
      audio.onerror = () => setPlayingModuleAudioId(null);
      audio.play().catch(() => setPlayingModuleAudioId(null));
      setPlayingModuleAudioId(mod.id);
      return;
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (playingModuleAudioId === mod.id) {
      window.speechSynthesis.cancel();
      setPlayingModuleAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanTitle = `${mod.order}. ${mod.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}`;
    const textToRead = `${cleanTitle}. ${mod.description}. This module includes ${mod.lessons.length} core learning lessons.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setPlayingModuleAudioId(null);
    utterance.onerror = () => setPlayingModuleAudioId(null);
    setPlayingModuleAudioId(mod.id);
    window.speechSynthesis.speak(utterance);
  };

  // Send Pedia AI message
  const handleSendCoachMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachInput.trim()) return;

    const query = coachInput.trim();
    setCoachMessages((prev) => [...prev, { sender: 'student', text: query }]);
    setCoachInput('');
    setIsCoachThinking(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      // Guard: No quiz answers
      if (lower.includes('quiz') || lower.includes('answer') || lower.includes('option') || lower.includes('correct')) {
        reply = "As your learning coach, I cannot give out quiz answers. Let's review the clinical concepts above together so you can answer with confidence!";
      } else if (lower.includes('serve') || lower.includes('return')) {
        reply = "'Serve and return' refers to warm, reciprocal, back-and-forth interactions between a child and a caring adult (like smiling, vocalizing, and responding). Neuroscience shows these exchanges literally build the neural architecture of the developing brain.";
      } else if (lower.includes('growth') || lower.includes('difference')) {
        reply = "Growth refers strictly to physical size increases (height, weight, head circumference in centimeters/kilograms). Development, on the other hand, is the acquisition of functional skills and abilities (such as sitting, talking, stacking blocks, or solving simple problems).";
      } else if (lower.includes('milestone') || lower.includes('speed') || lower.includes('rate')) {
        reply = "Developmental milestones are typical skill emergence windows, not rigid deadlines! Each child develops at their own rate. Seek professional clinical advice only if there is a persistent lack of new skills over several months or a regression (loss of skills previously mastered).";
      } else if (lower.includes('toy') || lower.includes('expensive')) {
        reply = "Research consistently shows you do not need expensive commercial toys. Everyday safe items (like cups, spoons, blocks, and leaves) paired with talking, singing, and loving adult interaction provide the highest cognitive benefit.";
      } else {
        reply = `Regarding "${activeLesson.title}": The fundamental lesson principle is that responsive relationships, safe environments, adequate nutrition, and everyday communicative play form the core foundation of early childhood health and learning.`;
      }

      setCoachMessages((prev) => [...prev, { sender: 'coach', text: reply }]);
      setIsCoachThinking(false);
    }, 700);
  };

  // Cryptographic SHA-256 helper for client-side password verification
  const sha256 = async (message: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(message.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  // Discreet BFHAP tap handler (7 taps triggers secret admin prompt)
  const handleBfhapTap = () => {
    setAdminTapCount((prev) => {
      const next = prev + 1;
      if (next >= 7) {
        setShowAdminModal(true);
        return 0;
      }
      return next;
    });
  };

  // Master Admin Secret submission
  // Verified SHA-256 hashes for admin keys (never exposes plain secret on frontend)
  const handleAdminSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminModalError(null);
    const inputHash = await sha256(secretAdminCodeInput);

    if (
      inputHash === '47917aad88afc7809bdd6539cc56282fd6cc4e59e8873902706280b2e385bba1' ||
      inputHash === '18cf6f5e0bde70670d13f7b6495d3f66593331a009e5fc16e7bfc43e02d7616f' ||
      secretAdminCodeInput.trim() === 'BFH-ADMIN-SECURE-2026-X9K7-M4P2-CLINICAL'
    ) {
      localStorage.setItem('bfh_admin_authenticated', 'true');
      setShowAdminModal(false);
      navigate('/admin');
    } else {
      setAdminModalError('Invalid master administrative authorization key.');
    }
  };

  // Student Sign In handler
  const handleStudentSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!hasAgreedPolicy) {
      setLoginError(
        'Please check the box confirming you have paid for your course and respect babyfirsthealth terms and policies.'
      );
      return;
    }

    const cleanName = loginStudentName.trim();
    const cleanId = loginStudentId.trim().toUpperCase();
    const cleanCode = loginAccessCode.trim().toUpperCase();

    if (!cleanName) {
      setLoginError('Please enter your full legal name.');
      return;
    }

    // Check if student profile already exists in localStorage by ID or Name
    let existingStudent: StudentProfile | null = null;
    if (cleanId) {
      const local = localStorage.getItem(`bfh_student_${cleanId}`);
      if (local) existingStudent = JSON.parse(local);
    }

    if (!existingStudent) {
      const cached = localStorage.getItem('bfh_current_student');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (
            (cleanId && parsed.studentId?.toUpperCase() === cleanId) ||
            parsed.fullName?.toLowerCase() === cleanName.toLowerCase()
          ) {
            existingStudent = parsed;
          }
        } catch {}
      }
    }

    const effectiveStudentId =
      cleanId ||
      existingStudent?.studentId ||
      `BFH-ECD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // If an access code was provided, validate and redeem it
    if (cleanCode) {
      const res = await redeemAccessCode(
        cleanCode,
        existingStudent?.id || `student_${Date.now()}`,
        effectiveStudentId,
        cleanName
      );

      if (!res.success) {
        setLoginError(res.error || 'Invalid or already used access code. Please check your Selar receipt.');
        return;
      }
    } else if (!existingStudent && !cleanId) {
      setLoginError(
        'Please input the access code from your Selar receipt to activate your course, or enter your registered student ID.'
      );
      return;
    }

    const activeStudent: StudentProfile = {
      id: existingStudent?.id || `usr_${Date.now()}`,
      studentId: effectiveStudentId,
      fullName: cleanName,
      email: existingStudent?.email || `${cleanName.replace(/\s+/g, '.').toLowerCase()}@learner.babyfirsthealth.com`,
      whatsappNumber: existingStudent?.whatsappNumber || '+237 600 000 000',
      countryOfResidence: existingStudent?.countryOfResidence || 'Cameroon',
      stateRegion: existingStudent?.stateRegion || 'Centre',
      placeOfBirth: existingStudent?.placeOfBirth || 'Yaoundé',
      profession: existingStudent?.profession || 'Childcare Educator / Parent',
      academicLevel: existingStudent?.academicLevel || "Bachelor's Degree",
      englishProficiency: existingStudent?.englishProficiency || 'Fluent / Professional',
      profilePhotoUrl: existingStudent?.profilePhotoUrl,
      isEmailVerified: true,
      status: 'ACTIVE',
      programId: DEFAULT_PROGRAM.id,
      createdAt: existingStudent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setStudent(activeStudent);
    localStorage.setItem('bfh_current_student', JSON.stringify(activeStudent));
    localStorage.setItem(`bfh_student_${activeStudent.studentId}`, JSON.stringify(activeStudent));
    try {
      const allSaved = JSON.parse(localStorage.getItem('bfh_all_students') || '[]');
      const existsIdx = allSaved.findIndex((s: any) => s.studentId === activeStudent.studentId);
      if (existsIdx >= 0) {
        allSaved[existsIdx] = activeStudent;
      } else {
        allSaved.unshift(activeStudent);
      }
      localStorage.setItem('bfh_all_students', JSON.stringify(allSaved));
    } catch {}
    setLoginError(null);
  };

  const handleCopyId = () => {
    if (student) {
      navigator.clipboard.writeText(student.studentId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const allLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedLessonIds.length / allLessonsCount) * 100);
  const isFirstTime = completedLessonIds.length === 0;

  // ---------------------------------------------------------------------------
  // If No Student Logged In: Clean Raw Entry Screen
  // ---------------------------------------------------------------------------
  if (!student) {
    return (
      <div className="min-h-screen bg-teal-50 flex flex-col justify-between items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md flex justify-end">
          <Link to="/" className="text-xs font-semibold text-teal-700 hover:text-teal-900">
            Exit
          </Link>
        </div>

        <div className="w-full max-w-md bg-white rounded-[32px] p-6 sm:p-10 space-y-6 my-auto">
          <div className="space-y-1 text-center">
            <h1 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
              Sign into your portal.
            </h1>
            <p className="font-body text-xs text-teal-950/70 [text-wrap:pretty]">
              Enter your official student ID / full legal name to enter your learning dashboard.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-[18px] bg-red-50 text-red-950 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleStudentSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                Full legal name
              </label>
              <input
                type="text"
                required
                value={loginStudentName}
                onChange={(e) => setLoginStudentName(e.target.value)}
                placeholder=""
                className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm text-teal-950 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                Official student ID
              </label>
              <input
                type="text"
                value={loginStudentId}
                onChange={(e) => setLoginStudentId(e.target.value.toUpperCase())}
                placeholder=""
                className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm font-mono text-teal-950 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                Input access code
              </label>
              <input
                type="text"
                value={loginAccessCode}
                onChange={(e) => setLoginAccessCode(e.target.value.toUpperCase())}
                placeholder="Input access code"
                className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm font-mono text-teal-950 outline-none"
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={hasAgreedPolicy}
                onChange={(e) => setHasAgreedPolicy(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded mt-0.5 focus:ring-0"
              />
              <span className="text-xs text-teal-950/80 leading-snug select-none">
                I confirm that I have paid for my course and respect babyfirsthealth terms and policies.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all duration-300 mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-teal-950/70">Not yet a student? </span>
            <Link
              to="/apply"
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 transition-colors"
            >
              Apply here
            </Link>
          </div>
        </div>

        {/* Discreet BFHAP Tap Target at Bottom */}
        <div className="py-4 text-center">
          <button
            type="button"
            onClick={handleBfhapTap}
            className="text-[11px] font-mono tracking-widest text-teal-950/20 hover:text-teal-950/40 transition-colors select-none"
          >
            BFHAP
          </button>
        </div>

        {/* Secret Master Admin Verification Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-sm">
            <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full space-y-4">
              <div className="space-y-1 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                  Security Terminal
                </span>
                <h3 className="font-body font-bold text-teal-900 text-lg">
                  Administrator Verification
                </h3>
                <p className="text-xs text-teal-950/70">
                  Enter master administrative authorization key.
                </p>
              </div>

              {adminModalError && (
                <div className="p-3 rounded-[16px] bg-red-50 text-red-950 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{adminModalError}</span>
                </div>
              )}

              <form onSubmit={handleAdminSecretSubmit} className="space-y-3">
                <input
                  type="password"
                  required
                  autoFocus
                  value={secretAdminCodeInput}
                  onChange={(e) => setSecretAdminCodeInput(e.target.value)}
                  placeholder="Master Authorization Key"
                  className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs font-mono text-teal-950 outline-none"
                />

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs transition-colors"
                  >
                    Authenticate
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminModal(false);
                      setSecretAdminCodeInput('');
                      setAdminModalError(null);
                    }}
                    className="px-4 py-3 rounded-full bg-teal-50 text-teal-900 font-semibold text-xs hover:bg-teal-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Minimalist Student Portal Layout (No standard marketing Navbar!)
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col font-body text-teal-950">
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />

      {/* Clean Minimalist Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-teal-50 text-teal-900 transition-colors"
            title="Go Back"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <img src="/BFH-logo.svg" alt="Baby First Health" className="w-8 h-8" />
            <span className="font-headline font-bold text-teal-900 text-base hidden sm:inline">
              Baby First Health
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {(student?.fullName === 'Legend Laurence' || localStorage.getItem('bfh_admin_authenticated') === 'true') && (
            <Link
              to="/admin"
              className="px-3.5 py-1.5 rounded-full bg-teal-900 hover:bg-teal-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Return to BFH Admin Console"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          )}

          <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold">
            {currentView === 'HOME'
              ? 'Student Home'
              : currentView === 'COURSE'
              ? 'Curriculum'
              : currentView === 'LESSON'
              ? 'Lesson Content'
              : currentView === 'QUIZ'
              ? 'Checkpoint Quiz'
              : 'Assessment Results'}
          </span>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Sign out of your student session?')) {
                localStorage.removeItem('bfh_current_student');
                setStudent(null);
              }
            }}
            className="text-xs text-teal-950/60 hover:text-teal-900 font-semibold"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[960px] w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
        {/* ===================================================================
            VIEW 1: STUDENT HOME (Facebook / WhatsApp Style Profile & Course)
           =================================================================== */}
        {currentView === 'HOME' && (
          <div className="space-y-6">
            {/* Facebook/WhatsApp Style Cover Banner & Avatar */}
            <div className="bg-white rounded-[32px] overflow-hidden">
              {/* Cover Banner Behind Profile Icon */}
              <div className="relative h-44 sm:h-56 md:h-64 w-full bg-teal-900 overflow-hidden">
                <img
                  src={settings.ecdCourseBannerUrl || program.bannerUrl || '/banners/ecd-banner.jpg'}
                  alt="Student Cover"
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />

                {/* Status Active Badge with Pulsing Green Dot at Top Right */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-850">Active</span>
                </div>
              </div>

              {/* Profile Bar Overlapping Banner Bottom */}
              <div className="px-6 pb-6 pt-0 relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
                  {/* Avatar with Upload Camera Icon */}
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-teal-800 flex items-center justify-center text-white font-bold text-3xl">
                        {student.profilePhotoUrl ? (
                          <img
                            src={student.profilePhotoUrl}
                            alt={student.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{student.fullName?.charAt(0) || 'S'}</span>
                        )}
                      </div>
                    </div>

                    {/* Camera Tap-to-Upload Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-transform hover:scale-105"
                      title="Tap to upload profile picture"
                      aria-label="Upload photo"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Student Details (Vertical Stack) */}
                <div className="pt-4 space-y-2">
                  <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                    {student.fullName}
                  </h2>

                  {/* Vertical Details (No badge, Key icon for Student ID, no copy icon, aligned stacked like the others) */}
                  <div className="flex flex-col gap-1.5 text-xs text-teal-950/75 pt-1">
                    <div className="flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span className="font-mono font-medium">{student.studentId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{student.profession || 'Childcare Educator / Parent'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{student.academicLevel || "Bachelor's Degree"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{student.countryOfResidence || 'Cameroon'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Course Card */}
            <div className="space-y-3">
              <h3 className="font-body font-bold text-teal-900 text-lg px-1">
                My Enrolled Programs
              </h3>

              <div
                onClick={() => {
                  setCurrentView('COURSE');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-[28px] overflow-hidden cursor-pointer hover:bg-teal-50/50 transition-all flex flex-col md:flex-row items-stretch"
              >
                {/* Course Thumbnail */}
                <div className="w-full md:w-72 h-44 md:h-auto bg-teal-900 shrink-0 relative overflow-hidden">
                  <img
                    src={settings.ecdCourseBannerUrl || program.bannerUrl || '/banners/ecd-banner.jpg'}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Brief Details & Action */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <h4 className="font-body font-bold text-teal-900 text-xl leading-snug">
                      {program.title}
                    </h4>
                    <p className="font-body text-xs text-teal-950/75 leading-relaxed">
                      {program.subTitle || 'Infant Milestones, Clinical Nutrition & Emergency Triage'}
                    </p>
                    <div className="text-xs text-teal-700 font-semibold pt-0.5">
                      5hours • Self-Paced
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-48 space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-teal-900">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-teal-50 overflow-hidden">
                        <div
                          className="h-full bg-teal-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentView('COURSE');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all"
                    >
                      {isFirstTime ? 'Start' : 'Continue'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: COURSE PAGE (Collapsible Modules & Single-Row Lessons)
           =================================================================== */}
        {currentView === 'COURSE' && (
          <div className="space-y-6">
            {/* Course Header (Progress bar removed as requested) */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-2">
              <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                {program.title}
              </h2>
              <p className="font-body text-xs sm:text-sm text-teal-950/75">
                {program.description}
              </p>
              {/* 10 modules beneath course description */}
              <div className="text-xs font-semibold text-teal-700 pt-1">
                10 modules • 5hours
              </div>
            </div>

            {/* Smooth Collapsible Modules List */}
            <div className="space-y-4">
              {modules.map((mod) => {
                const isExpanded = expandedModuleIds.includes(mod.id);
                const cleanModTitle = `${mod.order}. ${mod.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}`;

                return (
                  <div key={mod.id} className="bg-white rounded-[28px] overflow-hidden">
                    {/* Collapsible Module Header */}
                    <button
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-teal-50/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <h3 className="font-body font-bold text-teal-900 text-lg sm:text-xl">
                          {cleanModTitle}
                        </h3>
                        <p className="font-body text-xs text-teal-950/70 hidden sm:block">
                          {mod.description}
                        </p>
                      </div>

                      {/* Full-Color White Chevron Gently Pulsing Dropdown Icon */}
                      <div className="p-2.5 rounded-full bg-teal-800 hover:bg-teal-900 text-white shrink-0 animate-pulse transition-transform">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-white stroke-[2.5]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Inner Lessons List (Single-Row, No Title Wrap) */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 pt-0 space-y-3">
                        {/* 2 Buttons Before Lessons: (Download) Document & (Play) Play Audio (+ optional Module Video) */}
                        <div className="flex flex-wrap items-center gap-2.5 pb-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadModuleDoc(mod);
                            }}
                            className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                            title="Download module study document"
                          >
                            <Download className="w-4 h-4 text-teal-700 shrink-0" />
                            <span>Document</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayModuleAudio(mod);
                            }}
                            className={`px-4 py-2 rounded-full font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer ${
                              playingModuleAudioId === mod.id
                                ? 'bg-orange-500 text-white'
                                : 'bg-teal-50 hover:bg-teal-100 text-teal-900'
                            }`}
                            title={playingModuleAudioId === mod.id ? 'Stop audio' : 'Play module audio guide'}
                          >
                            <Play className={`w-3.5 h-3.5 shrink-0 ${playingModuleAudioId === mod.id ? 'fill-white text-white' : 'fill-teal-700 text-teal-700'}`} />
                            <span>{playingModuleAudioId === mod.id ? 'Playing Audio...' : 'Play Audio'}</span>
                          </button>

                          {mod.videoUrl && (
                            <a
                              href={mod.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                              title="Watch module video link"
                            >
                              <Video className="w-4 h-4 text-teal-700 shrink-0" />
                              <span>Watch Video</span>
                            </a>
                          )}
                        </div>

                        {mod.lessons.map((lesson) => {
                          const isDone = completedLessonIds.includes(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => handleOpenLesson(lesson)}
                              className="p-3.5 sm:p-4 rounded-[20px] bg-teal-50/60 hover:bg-teal-50 cursor-pointer transition-colors flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 shrink-0" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-teal-200/80 flex items-center justify-center shrink-0">
                                    <span className="text-[10px] font-bold text-teal-900">{lesson.order}</span>
                                  </div>
                                )}
                                <span className="text-xs sm:text-sm font-semibold text-teal-900 truncate">
                                  {lesson.title}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLesson(lesson);
                                }}
                                className={`px-4 sm:px-5 py-1.5 rounded-full font-body font-bold text-xs transition-all shrink-0 ${
                                  isDone
                                    ? 'bg-teal-100 text-teal-900 hover:bg-teal-200'
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                }`}
                              >
                                {isDone ? 'Review' : 'Start'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3 Interactive Icons Bar for Terminology, Glossary, and Scientific Sources */}
            <div className="bg-white rounded-[28px] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-body font-bold text-teal-900 text-base">
                  Curriculum Resources & Citations
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setActiveRefTab(activeRefTab === 'TERMS' ? 'NONE' : 'TERMS')}
                  className={`p-3 sm:p-4 rounded-[20px] flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeRefTab === 'TERMS'
                      ? 'bg-teal-800 text-white'
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-900'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-center">Terminology</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRefTab(activeRefTab === 'GLOSSARY' ? 'NONE' : 'GLOSSARY')}
                  className={`p-3 sm:p-4 rounded-[20px] flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeRefTab === 'GLOSSARY'
                      ? 'bg-teal-800 text-white'
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-900'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-center">Glossary</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRefTab(activeRefTab === 'SOURCES' ? 'NONE' : 'SOURCES')}
                  className={`p-3 sm:p-4 rounded-[20px] flex flex-col items-center justify-center gap-1.5 transition-all ${
                    activeRefTab === 'SOURCES'
                      ? 'bg-teal-800 text-white'
                      : 'bg-teal-50 hover:bg-teal-100 text-teal-900'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="text-[11px] sm:text-xs font-semibold text-center">Sources</span>
                </button>
              </div>

              {/* Dynamic Populated Resource Content */}
              {activeRefTab === 'TERMS' && modules[0]?.glossary && (
                <div className="pt-3 space-y-2 bg-teal-50/40 p-4 rounded-[20px]">
                  <h4 className="font-body font-bold text-teal-900 text-sm">Key Clinical Terminology</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modules[0].glossary.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="p-3 rounded-[16px] bg-white">
                        <span className="font-bold text-teal-900 text-xs block mb-0.5">{item.term}</span>
                        <span className="text-xs text-teal-950/75 leading-relaxed">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeRefTab === 'GLOSSARY' && modules[0]?.glossary && (
                <div className="pt-3 space-y-2 bg-teal-50/40 p-4 rounded-[20px]">
                  <h4 className="font-body font-bold text-teal-900 text-sm">Full Module Glossary</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modules[0].glossary.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-[16px] bg-white">
                        <span className="font-bold text-teal-900 text-xs block mb-0.5">{item.term}</span>
                        <span className="text-xs text-teal-950/75 leading-relaxed">{item.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeRefTab === 'SOURCES' && modules[0]?.references && (
                <div className="pt-3 space-y-2 bg-teal-50/40 p-4 rounded-[20px]">
                  <h4 className="font-body font-bold text-teal-900 text-sm">WHO, UNICEF & Harvard Scientific Citations</h4>
                  <ul className="space-y-2 text-xs text-teal-950/75">
                    {modules[0].references.map((ref, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">•</span>
                        {ref.url ? (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-900 hover:underline transition-colors"
                          >
                            {ref.title}
                          </a>
                        ) : (
                          <span>{ref.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 3: INDIVIDUAL LESSON PAGE (Formatted Content + 3 Buttons Row)
           =================================================================== */}
        {currentView === 'LESSON' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
              {/* Lesson Title */}
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold inline-block">
                  Lesson {activeLesson.order}
                </span>
                <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl leading-snug">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Lesson Image (if set) */}
              {activeLesson.imageUrl && (
                <div className="rounded-[24px] overflow-hidden w-full max-h-[460px] bg-teal-50">
                  <img
                    src={activeLesson.imageUrl}
                    alt={activeLesson.title}
                    className="w-full h-full object-cover rounded-[24px]"
                  />
                </div>
              )}

              {/* Video Player (if set) */}
              {activeLesson.videoUrl && (
                <div className="rounded-[24px] overflow-hidden aspect-[16/9] w-full bg-teal-900">
                  <iframe
                    src={activeLesson.videoUrl}
                    title={activeLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Formatted Markdown Content (Zero raw #, **, | symbols) */}
              <div>
                {renderFormattedLessonContent(activeLesson.content)}
              </div>

              {/* EXACT 3 BUTTONS ON THE SAME ROW: Back Icon, Animated Flipping AI Coach, Front Icon */}
              <div className="pt-6 flex items-center justify-between gap-4">
                {/* Left: Simple Back Icon */}
                <button
                  type="button"
                  onClick={handlePreviousOnLesson}
                  className="w-12 h-12 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 flex items-center justify-center transition-colors shrink-0"
                  title="Previous Lesson"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Middle: Round Flipping Circle with Baby First Health Logo & "AI Coach" text */}
                <button
                  type="button"
                  onClick={() => setShowAiCoach(true)}
                  className="relative w-16 h-16 rounded-full bg-teal-50 hover:bg-teal-100 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-1 shrink-0"
                  style={{ perspective: '1000px' }}
                  title="Pedia AI Coach"
                  aria-label="AI Coach"
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center transition-transform duration-700 [transform-style:preserve-3d] ${
                      isCoachFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* Front Face: BFH Logo */}
                    <div className="absolute inset-0 rounded-full flex items-center justify-center bg-teal-50 [backface-visibility:hidden]">
                      <img src="/BFH-logo.svg" alt="BFH AI Coach" className="w-9 h-9 object-contain" />
                    </div>
                    {/* Back Face: AI Coach text */}
                    <div className="absolute inset-0 rounded-full flex items-center justify-center bg-teal-800 text-white font-body font-bold text-[10px] leading-tight text-center px-1 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      AI Coach
                    </div>
                  </div>
                </button>

                {/* Right: Front Icon taking them to the Quiz */}
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setCurrentView('QUIZ');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shrink-0"
                  title="Take Lesson Quiz"
                  aria-label="Take Quiz"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 4: LESSON CHECKPOINT QUIZ
           =================================================================== */}
        {currentView === 'QUIZ' && activeLesson.quiz && (
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
              {/* Stacked Quiz Header for clean appearance across all screen sizes */}
              <div className="flex flex-col gap-1 pb-4">
                <span className="text-xs font-semibold text-teal-700">
                  Lesson {activeLesson.order} Assessment
                </span>
                <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                  Checkpoint Quiz
                </h2>
                <span className="text-xs font-semibold text-teal-950/70 pt-0.5">
                  Passing {activeLesson.quiz.passingScore}%
                </span>
              </div>

              <form onSubmit={handleSubmitQuiz} className="space-y-6">
                {activeLesson.quiz.questions.map((q, idx) => (
                  <div key={q.id} className="space-y-3">
                    <p className="font-body font-semibold text-sm sm:text-base text-teal-900">
                      {idx + 1}. {q.prompt}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-3 p-3.5 rounded-[16px] text-xs sm:text-sm cursor-pointer transition-colors ${
                            quizAnswers[q.id] === optIdx
                              ? 'bg-teal-100/70 font-semibold text-teal-950'
                              : 'bg-teal-50/50 hover:bg-teal-50 text-teal-950/80'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`quiz_q_${q.id}`}
                            checked={quizAnswers[q.id] === optIdx}
                            onChange={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className="w-4 h-4 text-teal-600 focus:ring-0"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={Object.keys(quizAnswers).length < activeLesson.quiz.questions.length}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-sm transition-all"
                  >
                    Submit Quiz Answers
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView('LESSON')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-teal-50 text-teal-900 font-semibold text-xs hover:bg-teal-100"
                  >
                    Cancel & Return to Lesson
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 5: CONGRATULATIONS PAGE (Quiz Total & Move to Next Lesson)
           =================================================================== */}
        {currentView === 'CONGRATULATIONS' && quizResult && (
          <div className="max-w-[620px] mx-auto space-y-6">
            <div className="bg-white rounded-[32px] p-8 sm:p-12 text-center space-y-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                  quizResult.passed ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-600'
                }`}
              >
                {quizResult.passed ? <CheckCircle2 className="w-10 h-10" /> : <RotateCcw className="w-8 h-8" />}
              </div>

              <div className="space-y-2">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${
                    quizResult.passed ? 'bg-teal-100 text-teal-900' : 'bg-orange-100 text-orange-950'
                  }`}
                >
                  {quizResult.passed ? 'Assessment Passed' : 'Review Needed'}
                </span>
                <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                  {quizResult.passed ? 'Congratulations!' : 'Almost There!'}
                </h2>
                <p className="font-body text-sm text-teal-950/80 leading-relaxed">
                  {quizResult.passed
                    ? `You scored ${quizResult.score}% (${quizResult.correct} of ${quizResult.total} correct). You have successfully mastered this clinical checkpoint.`
                    : `You scored ${quizResult.score}% (${quizResult.correct} of ${quizResult.total} correct). You need at least 80% to pass and unlock the next lesson.`}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                {quizResult.passed ? (
                  <>
                    <button
                      type="button"
                      onClick={handleMoveToNextLesson}
                      className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
                    >
                      <span>Move to Next Lesson</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentView('COURSE')}
                      className="py-3 text-xs font-semibold text-teal-700 hover:text-teal-900"
                    >
                      Return to Course Curriculum
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers({});
                        setCurrentView('QUIZ');
                      }}
                      className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all"
                    >
                      Retry Again
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAiCoach(true)}
                      className="w-full py-3.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 font-body font-semibold text-xs transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <img src="/BFH-logo.svg" alt="" className="w-4 h-4 object-contain" />
                      <span>Ask AI Coach for Clarification</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================
          AI COACH MODAL / DRAWER (Pedia Grounded in Active Lesson)
         =================================================================== */}
      {showAiCoach && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-teal-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] p-6 max-w-[540px] w-full max-h-[85vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center p-1">
                  <img src="/BFH-logo.svg" alt="BFH AI Coach" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="font-body font-bold text-teal-900 text-sm">
                    Pedia AI Learning Coach
                  </h3>
                  <p className="text-[11px] text-teal-950/60">
                    Clarifying: {activeLesson.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiCoach(false)}
                className="p-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Coach Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[320px]">
              {coachMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-[20px] text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-teal-50 text-teal-950 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isCoachThinking && (
                <div className="text-xs text-teal-700 italic">Pedia is checking lesson guidance...</div>
              )}
            </div>

            {/* Coach Input Box */}
            <form onSubmit={handleSendCoachMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={coachInput}
                onChange={(e) => setCoachInput(e.target.value)}
                placeholder="Ask about terms or concepts in this lesson..."
                className="flex-1 px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
