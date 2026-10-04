import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  CreditCard,
  Settings as SettingsIcon,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Search,
  RefreshCw,
  Clock,
  Save,
  Check,
  KeyRound,
  Copy,
  Plus,
  FileText,
  Download,
  Volume2,
  Video,
  Trash2,
  Upload,
  Play,
  Lock,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  BookOpen,
  FileCode,
  Sparkles,
  Link2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Coins,
  Edit3
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import { CERTIFICATIONS_CONTENT } from '../content/content';
import {
  getAllPaymentClaims,
  approvePaymentClaim,
  rejectPaymentClaim,
  getPortalSettings,
  updatePortalSettings,
  getAllAccessCodes,
  generateBatchAccessCodes,
  getAllStudents,
  getStoredOrInitialCodes,
  generateSecureStudentId,
  saveAdminGeneratedStudent
} from '../services/portalService';
import {
  PaymentClaimData,
  PortalSettings,
  CurrencyCode,
  AccessCode,
  CourseModule,
  CourseLesson,
  StudentProfile
} from '../types/studentPortal';
import { DEFAULT_SETTINGS, DEFAULT_PROGRAM, DEFAULT_MODULES } from '../data/portalDefaults';

export interface AdminCourseItem {
  id: string;
  code: string;
  title: string;
  courseType?: 'FREE' | 'PAID';
  isPublished?: boolean;
  subTitle?: string;
  description: string;
  bannerUrl?: string;
  modules: CourseModule[];
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'accessCodes' | 'courses' | 'ledger' | 'claims' | 'settings'>('accessCodes');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [claims, setClaims] = useState<PaymentClaimData[]>([]);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [settings, setSettings] = useState<PortalSettings>(DEFAULT_SETTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [codeFilter, setCodeFilter] = useState<'ALL' | 'AVAILABLE' | 'REDEEMED'>('ALL');

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bfh_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [adminAuthInput, setAdminAuthInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Approval modal state
  const [selectedClaim, setSelectedClaim] = useState<PaymentClaimData | null>(null);
  const [txIdInput, setTxIdInput] = useState('');
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);

  // Access code generation form
  const [generateCount, setGenerateCount] = useState<number>(5);
  const [isBatchSizeDropdownOpen, setIsBatchSizeDropdownOpen] = useState(false);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>(DEFAULT_PROGRAM.id);
  const [isCurriculumDropdownOpen, setIsCurriculumDropdownOpen] = useState(false);
  const [customCurriculums, setCustomCurriculums] = useState<{ id: string; title: string }[]>(() => {
    try {
      const saved = localStorage.getItem('bfh_custom_curriculums');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [isAddingNewCurriculum, setIsAddingNewCurriculum] = useState(false);
  const [newCurriculumInput, setNewCurriculumInput] = useState('');
  const [pricingMode, setPricingMode] = useState<'STANDARD' | 'CUSTOM'>('STANDARD');
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const [customPriceXAF, setCustomPriceXAF] = useState<number>(30000);
  const [isGeneratingCodes, setIsGeneratingCodes] = useState(false);
  const [showGenerateSuccessModal, setShowGenerateSuccessModal] = useState(false);
  const [newlyGeneratedBatch, setNewlyGeneratedBatch] = useState<AccessCode[]>([]);
  const [isAvailableExpanded, setIsAvailableExpanded] = useState(false);
  const [isRedeemedExpanded, setIsRedeemedExpanded] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Generate Student ID State
  const [studentInfoInput, setStudentInfoInput] = useState('');
  const [isGeneratingStudentId, setIsGeneratingStudentId] = useState(false);
  const [generatedStudentResult, setGeneratedStudentResult] = useState<StudentProfile | null>(null);
  const [copiedGeneratedStudentId, setCopiedGeneratedStudentId] = useState(false);

  // Courses state (Multi-Course Support, defaulting to ECD)
  const [courses, setCourses] = useState<AdminCourseItem[]>(() => {
    try {
      const savedCourses = localStorage.getItem('bfh_admin_courses');
      if (savedCourses) {
        const parsed = JSON.parse(savedCourses);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}

    const savedModules = localStorage.getItem('bfh_course_modules');
    let ecdModules = DEFAULT_MODULES;
    if (savedModules) {
      try {
        const parsedMod = JSON.parse(savedModules);
        if (Array.isArray(parsedMod) && parsedMod.length > 0) ecdModules = parsedMod;
      } catch {}
    }

    return [
      {
        id: DEFAULT_PROGRAM.id,
        code: 'ECD',
        title: DEFAULT_PROGRAM.title,
        courseType: 'PAID',
        isPublished: true,
        subTitle: DEFAULT_PROGRAM.subTitle || 'Early Childhood Development Certificate',
        description: DEFAULT_PROGRAM.description,
        bannerUrl: DEFAULT_PROGRAM.bannerUrl || '/images/certification-learning.jpg',
        modules: ecdModules,
      },
    ];
  });

  // Course Views: 'LIST' (dashboard showing created courses with gear icon and banner)
  // or 'SETTINGS' (unique Course Settings page)
  const [courseView, setCourseView] = useState<'LIST' | 'SETTINGS'>('LIST');
  const [settingsCourseId, setSettingsCourseId] = useState<string>(() => courses[0]?.id || DEFAULT_PROGRAM.id);
  const currentSettingsCourse = courses.find((c) => c.id === settingsCourseId) || courses[0];

  // Collapsible state in Course Settings (all modules and lessons collapsible, NO NOTES)
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(['mod-1']);
  const [expandedLessonIds, setExpandedLessonIds] = useState<string[]>([]);

  // Create Course Pop-up State
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [newCourseType, setNewCourseType] = useState<'FREE' | 'PAID'>('PAID');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [selectedProgramIdToCreate, setSelectedProgramIdToCreate] = useState<string>(CERTIFICATIONS_CONTENT.programs[0]?.id || 'childcare-safety');
  const [createCourseError, setCreateCourseError] = useState<string | null>(null);

  // Add Module Modal State
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [addModuleError, setAddModuleError] = useState<string | null>(null);

  // File Upload refs
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadModId, setActiveUploadModId] = useState<string | null>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);

  const [savedCurriculum, setSavedCurriculum] = useState(false);
  const [savedSettings, setSavedSettings] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);
    const key = adminAuthInput.trim();
    if (
      key === 'BFH-ADMIN-SECURE-2026-X9K7-M4P2-CLINICAL' ||
      key === 'BFH-ADMIN-2026' ||
      key.toLowerCase() === 'admin2026' ||
      key.toLowerCase() === 'bfhadmin'
    ) {
      localStorage.setItem('bfh_admin_authenticated', 'true');
      setIsAdminAuthenticated(true);
      setAdminAuthInput('');
    } else {
      setAdminAuthError('Invalid administrator authorization key.');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('bfh_admin_authenticated');
    setIsAdminAuthenticated(false);
  };

  const handleUpdateCurrentSettingsCourse = (updater: (prev: AdminCourseItem) => AdminCourseItem) => {
    setCourses((prevCourses) => {
      const nextCourses = prevCourses.map((c) => {
        if (c.id !== currentSettingsCourse.id) return c;
        return updater(c);
      });
      localStorage.setItem('bfh_admin_courses', JSON.stringify(nextCourses));
      const cur = nextCourses.find((c) => c.id === currentSettingsCourse.id);
      if (cur) {
        localStorage.setItem('bfh_course_modules', JSON.stringify(cur.modules));
        localStorage.setItem('bfh_active_program', JSON.stringify(cur));
      }
      return nextCourses;
    });
  };

  const handleUpdateCourseModule = (modId: string, updates: Partial<CourseModule>) => {
    handleUpdateCurrentSettingsCourse((course) => ({
      ...course,
      modules: course.modules.map((m) => (m.id === modId ? { ...m, ...updates } : m)),
    }));
  };

  const handleUpdateCourseLesson = (modId: string, lessonId: string, updates: Partial<CourseLesson>) => {
    handleUpdateCurrentSettingsCourse((course) => ({
      ...course,
      modules: course.modules.map((m) => {
        if (m.id !== modId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...updates } : l)),
        };
      }),
    }));
  };

  const handleLessonImageUpload = (modId: string, lessonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateCourseLesson(modId, lessonId, { imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLessonImage = (modId: string, lessonId: string) => {
    handleUpdateCourseLesson(modId, lessonId, { imageUrl: undefined });
  };

  const handleAudioFileUploadForModule = (modId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateCourseModule(modId, {
        audioUrl: reader.result as string,
        audioName: file.name,
        audioLink: undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAudioForModule = (modId: string) => {
    handleUpdateCourseModule(modId, {
      audioUrl: undefined,
      audioName: undefined,
      audioLink: undefined,
    });
  };

  const handleDocFileUploadForModule = (modId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateCourseModule(modId, {
        docUrl: reader.result as string,
        docName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDocForModule = (modId: string) => {
    handleUpdateCourseModule(modId, {
      docUrl: undefined,
      docName: undefined,
    });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateCurrentSettingsCourse((course) => ({
        ...course,
        bannerUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePublishCourse = () => {
    handleUpdateCurrentSettingsCourse((course) => ({
      ...course,
      isPublished: true,
    }));
    window.dispatchEvent(new Event('storage'));
    setSavedCurriculum(true);
    setTimeout(() => setSavedCurriculum(false), 2500);
  };

  const toggleModuleExpand = (modId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const toggleLessonExpand = (lesId: string) => {
    setExpandedLessonIds((prev) =>
      prev.includes(lesId) ? prev.filter((id) => id !== lesId) : [...prev, lesId]
    );
  };

  // Helper to download sample course JSON template
  const downloadSampleCourseJson = () => {
    const sample = {
      description: "Comprehensive certification curriculum covering clinical evidence and practical caregiving skills.",
      modules: [
        {
          title: "Module 1: Foundations of Pediatric Care & Triage",
          description: "Essential physiological assessment protocols and emergency recognition.",
          lessons: [
            {
              title: "Lesson 1.1: Vital Sign Parameters & Warning Signs",
              content: "### Clinical Vital Signs\n\nMonitor respiratory rate, capillary refill time, and central tone."
            },
            {
              title: "Lesson 1.2: Rapid Emergency De-escalation",
              content: "### Immediate Actions\n\nPositioning the infant, maintaining patent airway, and call triage protocols."
            }
          ]
        }
      ]
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_course_template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper to download sample module JSON template
  const downloadSampleModuleJson = () => {
    const sample = {
      title: "Pediatric Growth & Developmental Screening",
      description: "Detailed evaluation of physical, cognitive, and fine motor milestones from 0 to 5 years.",
      lessons: [
        {
          title: "Lesson 1: Somatometric Parameters & Percentiles",
          content: "### Somatometric Guidelines\n\nTracking head circumference and growth velocities using WHO standards."
        },
        {
          title: "Lesson 2: Motor Coordination & Reflex Integration",
          content: "### Neuromotor Progression\n\nObserve palmar grasp suppression, pincer grasp emergence, and trunk control."
        }
      ]
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_module_template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Create course from Pop-up (Free vs Paid) + JSON file
  const handleCreateCourseFromJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCreateCourseError(null);

    let title = '';
    let subtitle = '';
    let description = '';
    let bannerUrl = '/images/certification-learning.jpg';

    if (newCourseType === 'PAID') {
      const progInfo = CERTIFICATIONS_CONTENT.programs.find((p) => p.id === selectedProgramIdToCreate);
      title = progInfo?.title || 'Certified Healthcare Program';
      subtitle = progInfo?.subtitle || 'Clinical certification curriculum';
      description = progInfo?.subtitle || DEFAULT_PROGRAM.description;
      bannerUrl = CERTIFICATIONS_CONTENT.hero.image || '/images/certification-learning.jpg';
    } else {
      title = newCourseTitle.trim();
      if (!title) {
        setCreateCourseError('Please enter a course title for the free course.');
        return;
      }
      subtitle = 'Free Training Curriculum';
      description = 'Free Educational Healthcare Course';
      bannerUrl = '/images/certification-learning.jpg';
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const json = JSON.parse(text);

        let rawModules: any[] = [];
        if (Array.isArray(json)) {
          rawModules = json;
        } else if (json && typeof json === 'object') {
          if (json.description && !description) description = json.description;
          if (Array.isArray(json.modules)) {
            rawModules = json.modules;
          } else if (Array.isArray(json.lessons)) {
            rawModules = [json];
          }
        }

        if (rawModules.length === 0) {
          setCreateCourseError('JSON must contain a "modules" array or a list of modules with lessons.');
          return;
        }

        const newCourseId = `prog_${Date.now()}`;
        const parsedModules: CourseModule[] = rawModules.map((m: any, mIdx: number) => {
          const modId = `mod_${newCourseId}_${mIdx + 1}`;
          const rawLessons = Array.isArray(m.lessons) ? m.lessons : [];
          const parsedLessons: CourseLesson[] = rawLessons.map((l: any, lIdx: number) => ({
            id: `les_${modId}_${lIdx + 1}`,
            moduleId: modId,
            programId: newCourseId,
            title: l.title || `Lesson ${lIdx + 1}`,
            order: lIdx + 1,
            content: l.content || `# ${l.title || 'Lesson Overview'}\n\nClinical guidelines and lesson notes.`,
            hasVideo: !!l.videoUrl,
            videoUrl: l.videoUrl || undefined,
            imageUrl: l.imageUrl || undefined,
          }));

          return {
            id: modId,
            programId: newCourseId,
            title: m.title || `Module ${mIdx + 1}`,
            order: mIdx + 1,
            description: m.description || `Module ${mIdx + 1} overview.`,
            lessons: parsedLessons,
            videoUrl: m.videoUrl || undefined,
            audioUrl: m.audioUrl || undefined,
            audioLink: m.audioLink || undefined,
            docUrl: m.docUrl || undefined,
            docName: m.docName || undefined,
          };
        });

        const newCourse: AdminCourseItem = {
          id: newCourseId,
          code: newCourseType === 'PAID' ? 'CERT' : 'FREE',
          title: title,
          courseType: newCourseType,
          isPublished: true,
          subTitle: subtitle,
          description: description,
          bannerUrl: bannerUrl,
          modules: parsedModules,
        };

        const nextCourses = [...courses, newCourse];
        setCourses(nextCourses);
        setSettingsCourseId(newCourse.id);
        setCourseView('SETTINGS');
        setExpandedModuleIds([parsedModules[0]?.id || 'mod-1']);

        localStorage.setItem('bfh_admin_courses', JSON.stringify(nextCourses));
        localStorage.setItem('bfh_course_modules', JSON.stringify(parsedModules));
        localStorage.setItem('bfh_active_program', JSON.stringify(newCourse));
        window.dispatchEvent(new Event('storage'));

        setShowCreateCourseModal(false);
        setSavedCurriculum(true);
        setTimeout(() => setSavedCurriculum(false), 3000);
      } catch (err: any) {
        setCreateCourseError('Invalid JSON format: ' + (err.message || 'Please check file syntax'));
      }
    };
    reader.readAsText(file);
  };

  // Add module to current course from JSON file (supports one or several modules)
  const handleAddModuleFromJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddModuleError(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const json = JSON.parse(text);

        let incomingModules: any[] = [];
        if (Array.isArray(json)) {
          incomingModules = json;
        } else if (json && typeof json === 'object') {
          if (Array.isArray(json.modules)) {
            incomingModules = json.modules;
          } else {
            incomingModules = [json];
          }
        }

        if (incomingModules.length === 0) {
          setAddModuleError('JSON must contain at least one module object with title and lessons.');
          return;
        }

        const startOrder = currentSettingsCourse.modules.length + 1;
        const addedModules: CourseModule[] = incomingModules.map((m: any, idx: number) => {
          const modOrder = startOrder + idx;
          const modId = `mod_${currentSettingsCourse.id}_${Date.now()}_${idx + 1}`;
          const rawLessons = Array.isArray(m.lessons) ? m.lessons : [];
          const parsedLessons: CourseLesson[] = rawLessons.map((l: any, lIdx: number) => ({
            id: `les_${modId}_${lIdx + 1}`,
            moduleId: modId,
            programId: currentSettingsCourse.id,
            title: l.title || `Lesson ${lIdx + 1}`,
            order: lIdx + 1,
            content: l.content || `# ${l.title || 'Lesson Overview'}\n\nClinical guidelines and lesson notes.`,
            hasVideo: !!l.videoUrl,
            videoUrl: l.videoUrl || undefined,
            imageUrl: l.imageUrl || undefined,
          }));

          return {
            id: modId,
            programId: currentSettingsCourse.id,
            title: m.title || `Module ${modOrder}`,
            order: modOrder,
            description: m.description || `Module ${modOrder} description and clinical principles.`,
            lessons: parsedLessons,
            videoUrl: m.videoUrl || undefined,
            audioUrl: m.audioUrl || undefined,
            audioLink: m.audioLink || undefined,
            docUrl: m.docUrl || undefined,
            docName: m.docName || undefined,
          };
        });

        const updatedModules = [...currentSettingsCourse.modules, ...addedModules];
        handleUpdateCurrentSettingsCourse((course) => ({
          ...course,
          modules: updatedModules,
        }));

        setExpandedModuleIds((prev) => [...prev, addedModules[0]?.id]);
        setShowAddModuleModal(false);
        setSavedCurriculum(true);
        setTimeout(() => setSavedCurriculum(false), 3000);
      } catch (err: any) {
        setAddModuleError('Invalid JSON format: ' + (err.message || 'Please check file syntax'));
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const loadData = async () => {
    const fetchedClaims = await getAllPaymentClaims();
    setClaims(fetchedClaims);

    // Initial state: available and redeemed codes are zero until admin generates batch
    const storedCodes = getStoredOrInitialCodes().filter(
      (c: AccessCode) => !c.code.toUpperCase().includes('TEST') && !c.code.toUpperCase().includes('MOCK')
    );
    setAccessCodes(storedCodes);

    const fetchedSettings = await getPortalSettings();
    setSettings(fetchedSettings);

    const fetchedStudents = await getAllStudents();

    // Prepare Legend Laurence test profile in the ledger
    const hasLegend = fetchedStudents.some((s) => s.fullName.toLowerCase() === 'legend laurence');
    if (!hasLegend) {
      const legendTestProfile: StudentProfile = {
        id: 'usr_test_legend_laurence',
        studentId: 'BFH-ECD-LL2026',
        fullName: 'Legend Laurence',
        email: 'legend.laurence@learner.babyfirsthealth.com',
        whatsappNumber: '+237 600 000 000',
        countryOfResidence: 'Cameroon',
        stateRegion: 'Centre',
        placeOfBirth: 'Yaoundé',
        profession: 'Lead Childcare Educator',
        academicLevel: "Master's Degree",
        englishProficiency: 'Fluent / Professional',
        profilePhotoUrl: undefined,
        isEmailVerified: true,
        status: 'ACTIVE',
        programId: DEFAULT_PROGRAM.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      fetchedStudents.unshift(legendTestProfile);
      try {
        localStorage.setItem('bfh_all_students', JSON.stringify(fetchedStudents));
      } catch {}
    }

    setStudents(fetchedStudents);
  };

  const handleLaunchTestProfile = () => {
    const legendTestProfile: StudentProfile = {
      id: 'usr_test_legend_laurence',
      studentId: 'BFH-ECD-LL2026',
      fullName: 'Legend Laurence',
      email: 'legend.laurence@learner.babyfirsthealth.com',
      whatsappNumber: '+237 600 000 000',
      countryOfResidence: 'Cameroon',
      stateRegion: 'Centre',
      placeOfBirth: 'Yaoundé',
      profession: 'Lead Childcare Educator',
      academicLevel: "Master's Degree",
      englishProficiency: 'Fluent / Professional',
      profilePhotoUrl: undefined,
      isEmailVerified: true,
      status: 'ACTIVE',
      programId: DEFAULT_PROGRAM.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Set current active student session so portal opens immediately without manual login or access codes
    localStorage.setItem('bfh_current_student', JSON.stringify(legendTestProfile));
    localStorage.setItem(`bfh_student_${legendTestProfile.studentId}`, JSON.stringify(legendTestProfile));

    try {
      const allSaved = JSON.parse(localStorage.getItem('bfh_all_students') || '[]');
      const existsIdx = allSaved.findIndex((s: any) => s.studentId === legendTestProfile.studentId || s.fullName.toLowerCase() === 'legend laurence');
      if (existsIdx >= 0) {
        allSaved[existsIdx] = legendTestProfile;
      } else {
        allSaved.unshift(legendTestProfile);
      }
      localStorage.setItem('bfh_all_students', JSON.stringify(allSaved));
    } catch {}

    window.dispatchEvent(new Event('storage'));
    navigate('/portal');
  };

  const handleAddNewCurriculum = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const title = newCurriculumInput.trim();
    if (!title) return;
    const newId = `curr_${Date.now()}`;
    const updated = [...customCurriculums, { id: newId, title }];
    setCustomCurriculums(updated);
    try {
      localStorage.setItem('bfh_custom_curriculums', JSON.stringify(updated));
    } catch {}
    setSelectedCurriculumId(newId);
    setNewCurriculumInput('');
    setIsAddingNewCurriculum(false);
  };

  const handleGenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCodes(true);

    const amount = pricingMode === 'CUSTOM' ? (customPriceXAF || 30000) : 30000;

    const allCurriculums = [
      { id: DEFAULT_PROGRAM.id, title: DEFAULT_PROGRAM.title },
      ...CERTIFICATIONS_CONTENT.programs.map((p) => ({ id: p.id, title: p.title })),
      ...courses.map((c) => ({ id: c.id, title: c.title })),
      ...customCurriculums,
    ];
    const foundCurriculum = allCurriculums.find((c) => c.id === selectedCurriculumId);
    const curriculumTitle = foundCurriculum?.title || DEFAULT_PROGRAM.title;

    const notes = pricingMode === 'CUSTOM'
      ? `Generated for ${curriculumTitle} (${amount.toLocaleString()} CFA • ${(amount * 2.5).toLocaleString()} NGN • $${Math.round(amount / 600)} USD)`
      : `Generated for ${curriculumTitle} (30,000 CFA • 75,000 NGN • $50 USD)`;

    const generated = await generateBatchAccessCodes(
      generateCount,
      selectedCurriculumId,
      'XAF',
      amount,
      notes
    );

    await loadData();
    setIsGeneratingCodes(false);
    setNewlyGeneratedBatch(generated);
    setShowGenerateSuccessModal(true);
    setIsAvailableExpanded(true);
  };

  const handleCopySingleCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(code);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const parsePastedStudentInfo = (text: string) => {
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    let fullName = '';
    let email = '';
    let whatsappNumber = '';
    let countryOfResidence = 'Cameroon';
    let stateRegion = 'Centre';
    let placeOfBirth = '';
    let profession = 'Childcare Health Educator';
    let academicLevel = "Bachelor's Degree";

    // Email regex match
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      email = emailMatch[0];
    }

    // Phone / WhatsApp regex match
    const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,5}/);
    if (phoneMatch) {
      whatsappNumber = phoneMatch[0].trim();
    }

    for (const line of lines) {
      const lower = line.toLowerCase();

      // Full Name detection
      if (!fullName && (lower.startsWith('name:') || lower.startsWith('full name:') || lower.startsWith('student name:') || lower.startsWith('nom:'))) {
        fullName = line.split(':')[1]?.trim() || '';
      } else if (!fullName && lower.includes('name') && line.includes(':')) {
        fullName = line.split(':')[1]?.trim() || '';
      }

      // Email line
      if (!email && (lower.startsWith('email:') || lower.startsWith('e-mail:') || lower.startsWith('courriel:'))) {
        email = line.split(':')[1]?.trim() || '';
      }

      // WhatsApp / Phone line
      if (!whatsappNumber && (lower.startsWith('phone:') || lower.startsWith('whatsapp:') || lower.startsWith('tel:') || lower.startsWith('mobile:'))) {
        whatsappNumber = line.split(':')[1]?.trim() || '';
      }

      // Country line
      if (lower.startsWith('country:') || lower.startsWith('pays:') || lower.startsWith('residence:') || lower.startsWith('nationality:')) {
        countryOfResidence = line.split(':')[1]?.trim() || 'Cameroon';
      } else if (lower.includes('cameroon') || lower.includes('nigeria') || lower.includes('ghana') || lower.includes('kenya') || lower.includes('united states') || lower.includes('uk')) {
        if (lower.includes('cameroon')) countryOfResidence = 'Cameroon';
        else if (lower.includes('nigeria')) countryOfResidence = 'Nigeria';
        else if (lower.includes('ghana')) countryOfResidence = 'Ghana';
        else if (lower.includes('kenya')) countryOfResidence = 'Kenya';
        else if (lower.includes('united states') || lower.includes('usa')) countryOfResidence = 'United States';
        else if (lower.includes('uk') || lower.includes('united kingdom')) countryOfResidence = 'United Kingdom';
      }

      // Region / State / City
      if (lower.startsWith('region:') || lower.startsWith('state:') || lower.startsWith('city:') || lower.startsWith('ville:')) {
        stateRegion = line.split(':')[1]?.trim() || 'Centre';
      }

      // Profession
      if (lower.startsWith('profession:') || lower.startsWith('job:') || lower.startsWith('occupation:') || lower.startsWith('metier:')) {
        profession = line.split(':')[1]?.trim() || profession;
      }

      // Academic level
      if (lower.startsWith('academic:') || lower.startsWith('education:') || lower.startsWith('level:') || lower.startsWith('degree:')) {
        academicLevel = line.split(':')[1]?.trim() || academicLevel;
      }
    }

    // Fallback for fullName: take first line that isn't email, phone, or field prefix
    if (!fullName && lines.length > 0) {
      for (const line of lines) {
        if (!line.includes('@') && !line.match(/\d{5,}/) && !line.includes(':')) {
          fullName = line;
          break;
        }
      }
    }

    if (!fullName) {
      fullName = 'Registered Student';
    }

    return {
      fullName,
      email,
      whatsappNumber,
      countryOfResidence,
      stateRegion,
      placeOfBirth,
      profession,
      academicLevel,
    };
  };

  const handleGenerateStudentId = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInfoInput.trim()) return;

    setIsGeneratingStudentId(true);
    const parsed = parsePastedStudentInfo(studentInfoInput);
    const newStudentId = generateSecureStudentId('ECD');
    const uid = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const newStudent: StudentProfile = {
      id: uid,
      studentId: newStudentId,
      fullName: parsed.fullName,
      email: parsed.email || `${parsed.fullName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@learner.babyfirsthealth.com`,
      whatsappNumber: parsed.whatsappNumber || '',
      countryOfResidence: parsed.countryOfResidence,
      stateRegion: parsed.stateRegion,
      placeOfBirth: parsed.placeOfBirth || '',
      profession: parsed.profession,
      academicLevel: parsed.academicLevel,
      englishProficiency: 'Fluent / Professional',
      profilePhotoUrl: undefined,
      isEmailVerified: true,
      status: 'ACTIVE',
      programId: DEFAULT_PROGRAM.id,
      createdAt: now,
      updatedAt: now,
    };

    // Save locally for instant availability and test portal
    localStorage.setItem(`bfh_student_${newStudent.studentId}`, JSON.stringify(newStudent));
    try {
      const all = JSON.parse(localStorage.getItem('bfh_all_students') || '[]');
      all.unshift(newStudent);
      localStorage.setItem('bfh_all_students', JSON.stringify(all));
    } catch {}

    // Save to Firestore
    try {
      await saveAdminGeneratedStudent(newStudent);
    } catch (err) {
      console.warn('Firestore student save error:', err);
    }

    // Update dashboard state so they appear immediately in Ledger
    setStudents((prev) => [newStudent, ...prev.filter((s) => s.studentId !== newStudent.studentId)]);
    setGeneratedStudentResult(newStudent);
    setIsGeneratingStudentId(false);
  };

  const handleOpenApprove = (claim: PaymentClaimData) => {
    setSelectedClaim(claim);
    setTxIdInput(claim.transactionIdHint || '');
    setApprovalError(null);
  };

  const handleConfirmApproval = async () => {
    if (!selectedClaim || !txIdInput.trim()) return;

    setIsApproving(true);
    setApprovalError(null);

    const res = await approvePaymentClaim(
      selectedClaim.id,
      txIdInput.trim(),
      selectedClaim.amountExpected,
      selectedClaim.currency
    );

    setIsApproving(false);

    if (res.success) {
      setSelectedClaim(null);
      await loadData();
    } else {
      setApprovalError(res.error || 'Failed to approve claim');
    }
  };

  const handleReject = async (claimId: string) => {
    const reason = window.prompt('Please enter the reason for rejection (sent to student):');
    if (reason) {
      await rejectPaymentClaim(claimId, reason);
      await loadData();
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePortalSettings(settings);
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2000);
  };

  const filteredCodes = accessCodes.filter((c) => {
    if (codeFilter !== 'ALL' && c.status !== codeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        (c.redeemedByStudentName && c.redeemedByStudentName.toLowerCase().includes(q)) ||
        (c.redeemedByStudentIdCode && c.redeemedByStudentIdCode.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const availableCount = accessCodes.filter((c) => c.status === 'AVAILABLE').length;
  const redeemedCount = accessCodes.filter((c) => c.status === 'REDEEMED').length;

  // ---------------------------------------------------------------------------
  // If Not Authenticated: Secure Admin Login Gate
  // ---------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="pt-28 md:pt-36 min-h-[85vh] bg-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-md w-full space-y-6 shadow-sm border border-teal-100">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-teal-900 flex items-center justify-center mx-auto text-white">
              <Lock className="w-6 h-6 text-orange-400" />
            </div>
            <h1 className="font-body font-bold text-teal-900 text-2xl">
              Admin Authentication
            </h1>
            <p className="font-body text-xs text-teal-950/70 leading-relaxed">
              Enter master administrative authorization key to manage Selar access codes, admissions, and curriculum media.
            </p>
          </div>

          {adminAuthError && (
            <div className="p-3.5 rounded-[18px] bg-red-50 text-red-950 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                Master Authorization Key
              </label>
              <input
                type="password"
                required
                autoFocus
                value={adminAuthInput}
                onChange={(e) => setAdminAuthInput(e.target.value)}
                placeholder="Enter master authorization key"
                className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs font-mono text-teal-950 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-sm transition-all"
            >
              Sign In to Admin Console
            </button>
          </form>

          <div className="pt-2 text-center border-t border-teal-50">
            <Link
              to="/portal"
              className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
            >
              ← Back to Student Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      {/* Top Dedicated Admin Navigation Bar */}
      <header className="sticky top-0 z-50 bg-teal-900 text-white">
        <Container>
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo and BFH Admin text */}
            <div className="flex items-center gap-3">
              <img
                src="/BFH-logo.svg"
                alt="BFH logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-body font-bold text-white text-lg tracking-tight">
                BFH Admin
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('accessCodes')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'accessCodes'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Access Codes ({availableCount})
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('courses');
                  setCourseView('LIST');
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Courses ({courses.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'ledger'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Ledger ({students.length})
              </button>

              <button
                type="button"
                onClick={handleLaunchTestProfile}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-teal-800 text-teal-100 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                title="Open live student test interface as Legend Laurence"
              >
                Test
              </button>

              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-3.5 py-2 rounded-full bg-teal-800/80 hover:bg-red-600/90 text-teal-100 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ml-2 cursor-pointer"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="p-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Hamburger Menu: Plain writings with thin lines separating them, no cards, no icons */}
        {isMobileNavOpen && (
          <div className="md:hidden bg-teal-950 px-6 py-2 transition-all">
            <div className="divide-y divide-teal-800/70">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('accessCodes');
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-4 text-left text-sm font-semibold text-white hover:text-orange-400 transition-colors block cursor-pointer"
              >
                Access Codes
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('courses');
                  setCourseView('LIST');
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-4 text-left text-sm font-semibold text-white hover:text-orange-400 transition-colors block cursor-pointer"
              >
                Courses
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('ledger');
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-4 text-left text-sm font-semibold text-white hover:text-orange-400 transition-colors block cursor-pointer"
              >
                Ledger
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  handleLaunchTestProfile();
                }}
                className="w-full py-4 text-left text-sm font-semibold text-white hover:text-orange-400 transition-colors block cursor-pointer"
              >
                Test
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  handleAdminLogout();
                }}
                className="w-full py-4 text-left text-sm font-semibold text-white hover:text-red-400 transition-colors block cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Admin Area */}
      <Section bg="teal-50" className="pt-8 pb-[85px]">
        <Container>
          {/* TAB 1: ACCESS CODES (Generate Form First, followed by 3 Simple Cards) */}
          {activeTab === 'accessCodes' && (
            <div className="space-y-6">
              {/* 1. Generate Access Codes Card */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-6">
                <h2 className="font-body font-bold text-teal-900 text-2xl">
                  Generate Access Codes
                </h2>

                <form onSubmit={handleGenerateCodes} className="space-y-6">
                  {/* Batch Size (Dropdown with 1, 5, or 10 codes) */}
                  <div className="space-y-1.5 relative">
                    <label className="block text-xs font-semibold text-teal-950">
                      Batch Size
                    </label>
                    <div
                      onClick={() => {
                        setIsBatchSizeDropdownOpen(!isBatchSizeDropdownOpen);
                        setIsCurriculumDropdownOpen(false);
                        setIsPricingDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-full bg-teal-50 flex items-center justify-between cursor-pointer relative pr-10"
                    >
                      <span className="text-xs font-normal text-teal-950">
                        {generateCount === 1 ? '1 Access Code' : `${generateCount} Access Codes`}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-teal-700 absolute right-4 pointer-events-none transition-transform ${isBatchSizeDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isBatchSizeDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl p-1.5 shadow-md z-30 space-y-0.5">
                        {[1, 5, 10].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => {
                              setGenerateCount(count);
                              setIsBatchSizeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                              generateCount === count
                                ? 'bg-teal-50 text-teal-950 font-medium'
                                : 'text-teal-900 hover:bg-teal-50/70'
                            }`}
                          >
                            {count === 1 ? '1 Access Code' : `${count} Access Codes`}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Curriculum (Dropdown with all certification programs + Add option) */}
                  <div className="space-y-1.5 relative">
                    <label className="block text-xs font-semibold text-teal-950">
                      Curriculum
                    </label>

                    {isAddingNewCurriculum ? (
                      <div className="flex items-center gap-2 p-3 rounded-[20px] bg-teal-50">
                        <input
                          type="text"
                          autoFocus
                          value={newCurriculumInput}
                          onChange={(e) => setNewCurriculumInput(e.target.value)}
                          placeholder="Enter new curriculum name..."
                          className="flex-1 px-4 py-2 rounded-full bg-white text-xs font-normal text-teal-950 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddNewCurriculum()}
                          className="px-4 py-2 rounded-full bg-teal-900 text-white text-xs font-semibold cursor-pointer hover:bg-teal-800"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingNewCurriculum(false)}
                          className="px-3 py-2 text-xs text-teal-700 hover:text-teal-900 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div
                          onClick={() => {
                            setIsCurriculumDropdownOpen(!isCurriculumDropdownOpen);
                            setIsBatchSizeDropdownOpen(false);
                            setIsPricingDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 rounded-full bg-teal-50 flex items-center justify-between cursor-pointer relative pr-10"
                        >
                          <span className="text-xs font-normal text-teal-950 truncate">
                            {(() => {
                              const allCurriculums = [
                                { id: DEFAULT_PROGRAM.id, title: DEFAULT_PROGRAM.title },
                                ...CERTIFICATIONS_CONTENT.programs.map((p) => ({ id: p.id, title: p.title })),
                                ...courses.map((c) => ({ id: c.id, title: c.title })),
                                ...customCurriculums,
                              ];
                              const found = allCurriculums.find((c) => c.id === selectedCurriculumId);
                              return found ? found.title : DEFAULT_PROGRAM.title;
                            })()}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-teal-700 absolute right-4 pointer-events-none transition-transform ${isCurriculumDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isCurriculumDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl p-2 shadow-md z-30 max-h-64 overflow-y-auto space-y-0.5 divide-y divide-teal-50">
                            <div className="space-y-0.5 pb-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCurriculumId(DEFAULT_PROGRAM.id);
                                  setIsCurriculumDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                                  selectedCurriculumId === DEFAULT_PROGRAM.id
                                    ? 'bg-teal-50 text-teal-950 font-medium'
                                    : 'text-teal-900 hover:bg-teal-50/70'
                                }`}
                              >
                                {DEFAULT_PROGRAM.title}
                              </button>

                              {CERTIFICATIONS_CONTENT.programs
                                .filter((p) => p.id !== DEFAULT_PROGRAM.id)
                                .map((prog) => (
                                  <button
                                    key={prog.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCurriculumId(prog.id);
                                      setIsCurriculumDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                                      selectedCurriculumId === prog.id
                                        ? 'bg-teal-50 text-teal-950 font-medium'
                                        : 'text-teal-900 hover:bg-teal-50/70'
                                    }`}
                                  >
                                    {prog.title}
                                  </button>
                                ))}

                              {courses
                                .filter((c) => c.id !== DEFAULT_PROGRAM.id && !CERTIFICATIONS_CONTENT.programs.some((p) => p.id === c.id))
                                .map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCurriculumId(c.id);
                                      setIsCurriculumDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                                      selectedCurriculumId === c.id
                                        ? 'bg-teal-50 text-teal-950 font-medium'
                                        : 'text-teal-900 hover:bg-teal-50/70'
                                    }`}
                                  >
                                    {c.title}
                                  </button>
                                ))}

                              {customCurriculums.map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCurriculumId(c.id);
                                    setIsCurriculumDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                                    selectedCurriculumId === c.id
                                      ? 'bg-teal-50 text-teal-950 font-medium'
                                      : 'text-teal-900 hover:bg-teal-50/70'
                                  }`}
                                >
                                  {c.title}
                                </button>
                              ))}
                            </div>

                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCurriculumDropdownOpen(false);
                                  setIsAddingNewCurriculum(true);
                                }}
                                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-teal-800 hover:bg-teal-50 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add New Curriculum</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Currency and Category (Standard or Set Custom Price in CFA with auto-conversion) */}
                  <div className="space-y-3">
                    <div className="space-y-1.5 relative">
                      <label className="block text-xs font-semibold text-teal-950">
                        Currency and Category
                      </label>
                      <div
                        onClick={() => {
                          setIsPricingDropdownOpen(!isPricingDropdownOpen);
                          setIsBatchSizeDropdownOpen(false);
                          setIsCurriculumDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 rounded-full bg-teal-50 flex items-center justify-between cursor-pointer relative pr-10"
                      >
                        <span className="text-xs font-normal text-teal-950 truncate">
                          {pricingMode === 'STANDARD'
                            ? 'Standard (30,000 CFA • 75,000 NGN • $50 USD)'
                            : 'Set Custom Price'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-teal-700 absolute right-4 pointer-events-none transition-transform ${isPricingDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>

                      {isPricingDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl p-1.5 shadow-md z-30 space-y-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              setPricingMode('STANDARD');
                              setIsPricingDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                              pricingMode === 'STANDARD'
                                ? 'bg-teal-50 text-teal-950 font-medium'
                                : 'text-teal-900 hover:bg-teal-50/70'
                            }`}
                          >
                            Standard (30,000 CFA • 75,000 NGN • $50 USD)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPricingMode('CUSTOM');
                              setIsPricingDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-normal transition-colors cursor-pointer ${
                              pricingMode === 'CUSTOM'
                                ? 'bg-teal-50 text-teal-950 font-medium'
                                : 'text-teal-900 hover:bg-teal-50/70'
                            }`}
                          >
                            Set Custom Price
                          </button>
                        </div>
                      )}
                    </div>

                    {/* If Set Custom Price: One Price Field in CFA with Auto-Conversion */}
                    {pricingMode === 'CUSTOM' && (
                      <div className="space-y-2 p-4 rounded-[24px] bg-teal-50">
                        <label className="block text-xs font-semibold text-teal-950">
                          Price in CFA
                        </label>
                        <input
                          type="number"
                          value={customPriceXAF || ''}
                          onChange={(e) => setCustomPriceXAF(Number(e.target.value))}
                          placeholder="Enter price in CFA (e.g. 30000)"
                          className="w-full px-4 py-2.5 rounded-full bg-white text-xs font-normal text-teal-950 outline-none"
                        />
                        <div className="flex flex-wrap items-center justify-between text-xs font-normal text-teal-900 pt-1">
                          <span>Naira: <strong>{Math.round((customPriceXAF || 0) * 2.5).toLocaleString()} NGN</strong></span>
                          <span>USD: <strong>${Math.round((customPriceXAF || 0) / 600)} USD</strong></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Generate Button - Bigger padding, no plus icon */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isGeneratingCodes}
                      className="py-3.5 px-10 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-sm transition-colors cursor-pointer"
                    >
                      {isGeneratingCodes ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Generate Student ID Card */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-body font-bold text-teal-900 text-2xl">
                    Generate Student ID
                  </h2>
                </div>

                <form onSubmit={handleGenerateStudentId} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-teal-950">
                      Student Information
                    </label>
                    <textarea
                      rows={5}
                      value={studentInfoInput}
                      onChange={(e) => setStudentInfoInput(e.target.value)}
                      placeholder="Paste student details here (e.g. Full Name, Email, WhatsApp/Phone, Country, Profession, etc.)..."
                      className="w-full p-4 rounded-[20px] bg-teal-50 text-xs font-normal text-teal-950 outline-none resize-y min-h-[120px]"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isGeneratingStudentId || !studentInfoInput.trim()}
                      className="py-3.5 px-8 rounded-full bg-teal-900 hover:bg-teal-800 disabled:opacity-50 text-white font-body font-bold text-sm transition-colors cursor-pointer"
                    >
                      {isGeneratingStudentId ? 'Generating...' : 'Generate Student ID'}
                    </button>
                  </div>
                </form>

                {/* Newly Generated Student ID Result Card */}
                {generatedStudentResult && (
                  <div className="p-5 rounded-[24px] bg-teal-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-900">
                        Generated Student ID
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        Saved & Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-[18px]">
                      <div className="min-w-0">
                        <span className="font-mono text-sm sm:text-base font-bold text-teal-950 block truncate">
                          {generatedStudentResult.studentId}
                        </span>
                        <span className="text-xs font-normal text-teal-900 block truncate">
                          {generatedStudentResult.fullName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedStudentResult.studentId);
                          setCopiedGeneratedStudentId(true);
                          setTimeout(() => setCopiedGeneratedStudentId(false), 2000);
                        }}
                        className="px-3.5 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedGeneratedStudentId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-orange-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-normal text-teal-950/80 pt-1">
                      <div>
                        <span className="text-teal-950/50">Email:</span>{' '}
                        <span className="font-medium text-teal-900">{generatedStudentResult.email}</span>
                      </div>
                      <div>
                        <span className="text-teal-950/50">WhatsApp / Phone:</span>{' '}
                        <span className="font-medium text-teal-900">{generatedStudentResult.whatsappNumber || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-teal-950/50">Country:</span>{' '}
                        <span className="font-medium text-teal-900">{generatedStudentResult.countryOfResidence}</span>
                      </div>
                      <div>
                        <span className="text-teal-950/50">Profession:</span>{' '}
                        <span className="font-medium text-teal-900">{generatedStudentResult.profession}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Three Simple Cards Under Generate Access Codes */}
              {/* On mobile: stacked on each other. When Available expands, pops down directly on that card and pushes down Redeemed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {/* Card 1: Available */}
                <div className="bg-white rounded-[24px] p-6 space-y-3">
                  <div
                    onClick={() => setIsAvailableExpanded(!isAvailableExpanded)}
                    className="cursor-pointer space-y-1 select-none"
                  >
                    <span className="text-sm font-normal text-teal-950 block">
                      Available
                    </span>
                    <div className="font-body font-bold text-3xl text-teal-900 flex items-center justify-between">
                      <span>{availableCount}</span>
                      <ChevronDown className={`w-5 h-5 text-teal-700 transition-transform ${isAvailableExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Pop-down directly inside Available card */}
                  {isAvailableExpanded && (
                    <div className="pt-3 border-t border-teal-50 space-y-2">
                      {availableCount === 0 ? (
                        <p className="text-xs font-normal text-teal-950/60 py-2">
                          No available codes yet
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                          {accessCodes
                            .filter((c) => c.status === 'AVAILABLE')
                            .map((codeItem) => (
                              <div
                                key={codeItem.id || codeItem.code}
                                className="p-3 rounded-2xl bg-teal-50 flex items-center justify-between gap-2"
                              >
                                <span className="font-mono text-xs font-normal text-teal-900 truncate">
                                  {codeItem.code}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopySingleCode(codeItem.code);
                                  }}
                                  className="p-1.5 rounded-full hover:bg-white text-teal-800 transition-colors cursor-pointer shrink-0"
                                  title="Copy Code"
                                >
                                  {copiedCodeId === codeItem.code ? (
                                    <Check className="w-3.5 h-3.5 text-orange-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card 2: Redeemed */}
                <div className="bg-white rounded-[24px] p-6 space-y-3">
                  <div
                    onClick={() => setIsRedeemedExpanded(!isRedeemedExpanded)}
                    className="cursor-pointer space-y-1 select-none"
                  >
                    <span className="text-sm font-normal text-teal-950 block">
                      Redeemed
                    </span>
                    <div className="font-body font-bold text-3xl text-teal-900 flex items-center justify-between">
                      <span>{redeemedCount}</span>
                      <ChevronDown className={`w-5 h-5 text-teal-700 transition-transform ${isRedeemedExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Pop-down directly inside Redeemed card */}
                  {isRedeemedExpanded && (
                    <div className="pt-3 border-t border-teal-50 space-y-2">
                      {redeemedCount === 0 ? (
                        <p className="text-xs font-normal text-teal-950/60 py-2">
                          No redeemed codes yet
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                          {accessCodes
                            .filter((c) => c.status === 'REDEEMED')
                            .map((codeItem) => (
                              <div
                                key={codeItem.id || codeItem.code}
                                className="p-3 rounded-2xl bg-teal-50 flex items-center justify-between gap-2"
                              >
                                <div className="min-w-0">
                                  <span className="font-mono text-xs font-normal text-teal-900 block truncate">
                                    {codeItem.code}
                                  </span>
                                  <span className="text-[10px] text-teal-950/60 block truncate">
                                    {codeItem.redeemedByStudentName || 'Student'}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopySingleCode(codeItem.code);
                                  }}
                                  className="p-1.5 rounded-full hover:bg-white text-teal-800 transition-colors cursor-pointer shrink-0"
                                  title="Copy Code"
                                >
                                  {copiedCodeId === codeItem.code ? (
                                    <Check className="w-3.5 h-3.5 text-orange-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card 3: Redirection URL */}
                <div className="bg-white rounded-[24px] p-6 space-y-2">
                  <span className="text-sm font-normal text-teal-950 block">
                    Redirection URL
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-normal text-teal-900 truncate">
                      {typeof window !== 'undefined' ? `${window.location.origin}/portal` : 'https://babyfirsthealth.com/portal'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopySingleCode(typeof window !== 'undefined' ? `${window.location.origin}/portal` : 'https://babyfirsthealth.com/portal')}
                      className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-800 shrink-0 transition-colors cursor-pointer"
                      title="Copy Redirection URL"
                    >
                      {copiedCodeId === (typeof window !== 'undefined' ? `${window.location.origin}/portal` : 'https://babyfirsthealth.com/portal') ? (
                        <Check className="w-4 h-4 text-orange-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Pop-up Modal: Codes generated successfully */}
              {showGenerateSuccessModal && (
                <div className="fixed inset-0 z-50 bg-teal-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full space-y-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-body font-bold text-teal-900 text-xl">
                        Codes generated successfully
                      </h3>
                      <p className="text-xs text-teal-950/70">
                        {newlyGeneratedBatch.length} new access {newlyGeneratedBatch.length === 1 ? 'code' : 'codes'} added to Available.
                      </p>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2 py-2">
                      {newlyGeneratedBatch.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 rounded-xl bg-teal-50 font-mono text-xs font-normal text-teal-900 flex items-center justify-between"
                        >
                          <span>{c.code}</span>
                          <button
                            type="button"
                            onClick={() => handleCopySingleCode(c.code)}
                            className="p-1 rounded-md text-teal-700 hover:text-teal-950 transition-colors cursor-pointer"
                            title="Copy single code"
                          >
                            {copiedCodeId === c.code ? (
                              <Check className="w-3.5 h-3.5 text-orange-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowGenerateSuccessModal(false)}
                      className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: LEDGER (Minimalistic Student Profiles) */}
          {activeTab === 'ledger' && (
            <div className="space-y-4">
              <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-body font-bold text-teal-900 text-2xl">
                    Student Profiles
                  </h2>
                  <span className="text-xs font-normal text-teal-950/70">
                    {students.length} {students.length === 1 ? 'Profile' : 'Profiles'}
                  </span>
                </div>

                {students.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm font-normal text-teal-950/70">
                      No student profile yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {students.map((st) => {
                      const isExpanded = expandedStudentId === st.id;
                      const enrolledProg =
                        courses.find((c) => c.id === st.programId) ||
                        CERTIFICATIONS_CONTENT.programs.find((p) => p.id === st.programId);
                      const enrolledProgTitle = enrolledProg?.title || DEFAULT_PROGRAM.title;
                      const isPaidCourse =
                        enrolledProg && 'courseType' in enrolledProg
                          ? (enrolledProg as AdminCourseItem).courseType !== 'FREE'
                          : true;

                      return (
                        <div
                          key={st.id}
                          className="p-4 sm:p-5 rounded-[24px] bg-teal-50/70 hover:bg-teal-50 transition-colors"
                        >
                          {/* Simple line card */}
                          <div
                            onClick={() => setExpandedStudentId(isExpanded ? null : st.id)}
                            className="flex items-center justify-between cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              {/* Circle Image beside the name */}
                              <div className="w-10 h-10 rounded-full bg-teal-200/80 overflow-hidden flex items-center justify-center shrink-0">
                                {st.profilePhotoUrl ? (
                                  <img
                                    src={st.profilePhotoUrl}
                                    alt={st.fullName}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="font-body font-bold text-teal-900 text-sm">
                                    {st.fullName ? st.fullName.charAt(0).toUpperCase() : 'S'}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0">
                                <h3 className="font-body font-bold text-teal-900 text-sm truncate">
                                  {st.fullName}
                                </h3>
                                <span className="text-[11px] font-normal text-teal-950/60 block truncate">
                                  {st.studentId}
                                </span>
                              </div>
                            </div>

                            <ChevronDown
                              className={`w-5 h-5 text-teal-700 transition-transform shrink-0 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </div>

                          {/* Collapsible / drop down details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-teal-100/60 space-y-2.5 text-xs font-normal text-teal-950">
                              <div className="flex items-center justify-between">
                                <span className="text-teal-950/70">Student ID:</span>
                                <span className="font-mono font-semibold text-teal-900">{st.studentId}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-teal-950/70">Country:</span>
                                <span className="font-semibold text-teal-900">{st.countryOfResidence || 'Cameroon'}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-teal-950/70">Enrolled Courses:</span>
                                <span className="font-semibold text-teal-900 text-right">{enrolledProgTitle}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-teal-950/70">Number of Courses Enrolled:</span>
                                <span className="font-semibold text-teal-900">1</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-teal-950/70">Course Type:</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  isPaidCourse
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-teal-100 text-teal-800'
                                }`}>
                                  {isPaidCourse ? 'Paid Course • Access Redeemed' : 'Free Course'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENT CLAIMS QUEUE (Manual / WhatsApp receipts) */}
          {activeTab === 'claims' && (
            <div className="space-y-6">
              {/* Claims Table / Cards */}
              <div className="space-y-4">
                {claims.length === 0 ? (
                  <div className="bg-white rounded-[28px] p-10 text-center text-teal-950/70">
                    No manual payment claims currently pending.
                  </div>
                ) : (
                  claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="bg-white rounded-[28px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-body font-bold text-teal-900 text-base">
                            {claim.studentName}
                          </span>
                          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">
                            {claim.studentIdCode}
                          </span>
                          <span
                            className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${
                              claim.status === 'APPROVED'
                                ? 'bg-teal-100 text-teal-900'
                                : claim.status === 'REJECTED'
                                ? 'bg-red-100 text-red-900'
                                : 'bg-orange-100 text-orange-950'
                            }`}
                          >
                            {claim.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-body text-teal-950/75 pt-1">
                          <div>
                            <span className="block text-teal-950/50">Payer Phone/Name</span>
                            <span className="font-semibold text-teal-900">{claim.payerPhoneOrName}</span>
                          </div>
                          <div>
                            <span className="block text-teal-950/50">Tuition Expected</span>
                            <span className="font-semibold text-teal-900">
                              {claim.amountExpected.toLocaleString()} {claim.currency}
                            </span>
                          </div>
                          <div>
                            <span className="block text-teal-950/50">Submitted Ref/Hint</span>
                            <span className="font-mono text-teal-900">
                              {claim.transactionIdHint || 'None'}
                            </span>
                          </div>
                          <div>
                            <span className="block text-teal-950/50">Policy Consent</span>
                            <span className="text-teal-900 font-semibold">
                              v{claim.policyAcceptedVersion}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                        {claim.status === 'PENDING_VERIFICATION' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenApprove(claim)}
                              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs transition-all"
                            >
                              Approve with TxID
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(claim.id)}
                              className="px-4 py-2.5 rounded-full bg-teal-50 text-teal-800 hover:bg-teal-100 font-body font-semibold text-xs transition-all"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className="text-right text-xs text-teal-950/70">
                            {claim.status === 'APPROVED' ? (
                              <span className="inline-flex items-center gap-1 text-teal-700 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Tx: {claim.verifiedTxId}
                              </span>
                            ) : (
                              <span className="text-red-700 font-semibold">
                                Rejected: {claim.rejectReason}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COURSES & CURRICULUM MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* SCREEN 1: DASHBOARD HOME - DISPLAY OF CREATED COURSES */}
              {courseView === 'LIST' && (
                <div className="space-y-6">
                  {/* Top Header Card: Clean, no extra badges or subtitles */}
                  <div className="bg-white rounded-[32px] p-6 sm:p-8 flex items-center justify-between">
                    <div>
                      <h2 className="font-body font-bold text-teal-900 text-2xl sm:text-3xl">
                        Created Courses
                      </h2>
                    </div>
                    {savedCurriculum && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved!
                      </span>
                    )}
                  </div>

                  {/* Display of Created Courses Cards: Title, Gear Icon, and Banner Image (Flat design, no shadow, no border stroke) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => {
                      const bannerSrc = course.bannerUrl || '/images/certification-learning.jpg';
                      return (
                        <div
                          key={course.id}
                          className="bg-white rounded-[28px] overflow-hidden flex flex-col justify-between"
                        >
                          <div>
                            {/* Course Banner Image */}
                            <div className="relative h-48 w-full bg-teal-900 overflow-hidden">
                              <img
                                src={bannerSrc}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                                  course.courseType === 'PAID'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-teal-700 text-white'
                                }`}>
                                  {course.courseType === 'PAID' ? 'Paid Course' : 'Free Course'}
                                </span>
                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                                  course.isPublished
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-teal-950/80 text-teal-200'
                                }`}>
                                  {course.isPublished ? 'Published' : 'Draft'}
                                </span>
                              </div>
                            </div>

                            {/* Course Content: Title & Details */}
                            <div className="p-5 space-y-2">
                              <h3 className="font-body font-bold text-teal-900 text-lg leading-snug line-clamp-2">
                                {course.title}
                              </h3>
                              <p className="text-xs text-teal-950/70 line-clamp-2">
                                {course.description}
                              </p>
                              <div className="text-[11px] text-teal-900 font-semibold pt-1">
                                {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'} Total
                              </div>
                            </div>
                          </div>

                          {/* Gear Icon Action to enter Course Settings */}
                          <div className="p-5 pt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSettingsCourseId(course.id);
                                setCourseView('SETTINGS');
                                setExpandedModuleIds([course.modules[0]?.id || 'mod-1']);
                              }}
                              className="w-full py-2.5 px-4 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                              title="Open Course Settings"
                            >
                              <SettingsIcon className="w-4 h-4 text-teal-700" />
                              <span>Course Settings</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* FLOATING ACTION BUTTON: ONLY A ROUND CIRCLE WITH A PLUS ICON, NO TEXT, NO SHADOW */}
                  <button
                    type="button"
                    onClick={() => {
                      setNewCourseType('PAID');
                      setNewCourseTitle('');
                      setSelectedProgramIdToCreate(CERTIFICATIONS_CONTENT.programs[0]?.id || 'childcare-safety');
                      setCreateCourseError(null);
                      setShowCreateCourseModal(true);
                    }}
                    className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                    title="Create Course"
                    aria-label="Create Course"
                  >
                    <Plus className="w-6 h-6 text-white stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* SCREEN 2: UNIQUE COURSE SETTINGS PAGE */}
              {courseView === 'SETTINGS' && (
                <div className="space-y-6">
                  {/* Top Bar with Back to Dashboard, Coin Icon for Paid Course, Clean Title, Add Module, and Published */}
                  <div className="bg-white rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCourseView('LIST')}
                          className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Dashboard</span>
                        </button>

                        {/* Paid course badge replaced with coin stack icon to symbolize paid course */}
                        {currentSettingsCourse.courseType === 'PAID' && (
                          <span
                            className="p-1.5 rounded-full bg-orange-100 text-orange-600 inline-flex items-center justify-center"
                            title="Paid Course"
                          >
                            <Coins className="w-4 h-4" />
                          </span>
                        )}

                        {savedCurriculum && (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved!
                          </span>
                        )}
                      </div>

                      <h2 className="font-body font-bold text-teal-900 text-xl sm:text-2xl">
                        {currentSettingsCourse.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
                      <button
                        type="button"
                        onClick={() => setShowAddModuleModal(true)}
                        className="px-4 py-2.5 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-body font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Module</span>
                      </button>

                      <button
                        type="button"
                        onClick={handlePublishCourse}
                        className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Published</span>
                      </button>
                    </div>
                  </div>

                  {/* COURSE BANNER: Clean, no subtitle explanation, edit icon for Change Banner Image */}
                  <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-body font-bold text-teal-900 text-base">
                        Course Banner Image
                      </h3>

                      <div>
                        <input
                          type="file"
                          ref={bannerFileInputRef}
                          onChange={handleBannerUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => bannerFileInputRef.current?.click()}
                          className="text-xs font-bold text-teal-800 hover:text-teal-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-teal-700" />
                          <span>Change Banner Image</span>
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded-[24px] overflow-hidden w-full h-56 bg-teal-900">
                      <img
                        src={currentSettingsCourse.bannerUrl || '/images/certification-learning.jpg'}
                        alt={currentSettingsCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* MODULES LIST (No header line/subtitle, drop icon at right corner inside pulsing green circle) */}
                  <div className="space-y-4">
                    {currentSettingsCourse.modules.map((mod) => {
                      const isModExpanded = expandedModuleIds.includes(mod.id);

                      return (
                        <div
                          key={mod.id}
                          className="bg-white rounded-[28px] overflow-hidden transition-colors"
                        >
                          {/* Module Header - Tap to Expand/Collapse with Pulsing Green Circle at Right Corner */}
                          <div
                            onClick={() => toggleModuleExpand(mod.id)}
                            className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-teal-50/50 transition-colors"
                          >
                            <div>
                              <h4 className="font-body font-bold text-teal-900 text-lg sm:text-xl">
                                Module {mod.order}: {mod.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}
                              </h4>
                            </div>

                            {/* Drop icon at right corner inside a pulsing green circle */}
                            <div className="p-2.5 rounded-full bg-emerald-600 text-white shrink-0 animate-pulse transition-transform">
                              {isModExpanded ? (
                                <ChevronUp className="w-5 h-5 text-white stroke-[2.5]" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-white stroke-[2.5]" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Module Details */}
                          {isModExpanded && (
                            <div className="p-5 sm:p-6 pt-0 space-y-6">
                              {/* 2 Fields: Audio File and Upload Document File */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                {/* Field 1: Audio File */}
                                <div className="p-5 rounded-[22px] bg-teal-50/60 space-y-3">
                                  <div>
                                    <label className="block text-xs font-bold text-teal-900">
                                      Audio File
                                    </label>
                                  </div>

                                  <div className="space-y-2">
                                    {mod.audioUrl ? (
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs font-mono text-teal-800 truncate">
                                            {mod.audioName || `Module_${mod.order}_Audio.mp3`}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => handleRemoveAudioForModule(mod.id)}
                                            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                        <audio controls src={mod.audioUrl} className="w-full h-8" />
                                      </div>
                                    ) : (
                                      <label className="flex items-center justify-center p-3.5 rounded-full bg-white hover:bg-teal-100/50 cursor-pointer text-xs font-semibold text-teal-900 transition-colors">
                                        <Upload className="w-3.5 h-3.5 mr-2 text-teal-700" />
                                        <span>Upload</span>
                                        <input
                                          type="file"
                                          accept="audio/*"
                                          onChange={(e) => handleAudioFileUploadForModule(mod.id, e)}
                                          className="hidden"
                                        />
                                      </label>
                                    )}
                                  </div>

                                  <div className="pt-2">
                                    <label className="block text-xs font-semibold text-teal-900 mb-1">
                                      Or enter audio stream link
                                    </label>
                                    <input
                                      type="url"
                                      value={mod.audioLink || ''}
                                      onChange={(e) =>
                                        handleUpdateCourseModule(mod.id, {
                                          audioLink: e.target.value.trim() ? e.target.value : undefined,
                                        })
                                      }
                                      placeholder="https://..."
                                      className="w-full px-4 py-2.5 rounded-full bg-white text-xs text-teal-950 outline-none"
                                    />
                                    {mod.audioLink && (
                                      <div className="mt-2">
                                        <audio controls src={mod.audioLink} className="w-full h-8" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Field 2: Upload Document File */}
                                <div className="p-5 rounded-[22px] bg-teal-50/60 space-y-3">
                                  <div>
                                    <label className="block text-xs font-bold text-teal-900">
                                      Upload Document File
                                    </label>
                                  </div>

                                  {mod.docUrl ? (
                                    <div className="bg-white p-3.5 rounded-[18px] space-y-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                                          <span className="text-xs font-semibold text-teal-900 truncate">
                                            {mod.docName || `Module_${mod.order}_Document`}
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveDocForModule(mod.id)}
                                          className="text-red-600 hover:text-red-700 text-xs font-semibold ml-2 cursor-pointer"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <label className="flex items-center justify-center p-3.5 rounded-full bg-white hover:bg-teal-100/50 cursor-pointer text-xs font-semibold text-teal-900 transition-colors">
                                      <Upload className="w-3.5 h-3.5 mr-2 text-teal-700" />
                                      <span>Upload</span>
                                      <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.txt"
                                        onChange={(e) => handleDocFileUploadForModule(mod.id, e)}
                                        className="hidden"
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>

                              {/* BENEATH THESE ARE NOW THE LESSONS */}
                              <div className="space-y-3 pt-2">
                                <h5 className="font-body font-bold text-teal-900 text-sm">
                                  Lessons in Module {mod.order} ({mod.lessons.length} Lessons)
                                </h5>

                                <div className="space-y-3">
                                  {mod.lessons.map((lesson) => {
                                    const isLesExpanded = expandedLessonIds.includes(lesson.id);
                                    return (
                                      <div
                                        key={lesson.id}
                                        className="rounded-[20px] bg-teal-50/50 overflow-hidden"
                                      >
                                        {/* Lesson Header - Tap to Expand */}
                                        <div
                                          onClick={() => toggleLessonExpand(lesson.id)}
                                          className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-teal-100/40 transition-colors"
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <button type="button" className="text-teal-800">
                                              {isLesExpanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                              ) : (
                                                <ChevronDown className="w-4 h-4" />
                                              )}
                                            </button>
                                            <span className="text-xs font-bold text-teal-900">
                                              Lesson {lesson.order}: {lesson.title}
                                            </span>
                                          </div>

                                          <div className="flex items-center gap-1.5">
                                            {lesson.imageUrl && (
                                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold inline-flex items-center gap-1">
                                                <ImageIcon className="w-3 h-3" /> Thumbnail
                                              </span>
                                            )}
                                            {lesson.videoUrl && (
                                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-semibold inline-flex items-center gap-1">
                                                <Video className="w-3 h-3" /> Video
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* 2 Fields: Video Link & Upload Thumbnail */}
                                        {isLesExpanded && (
                                          <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Field 1: Video link */}
                                            <div className="space-y-1.5 p-3 rounded-[16px] bg-white">
                                              <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-teal-900">
                                                  Video Link
                                                </label>
                                                {lesson.videoUrl && (
                                                  <a
                                                    href={lesson.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
                                                  >
                                                    <ExternalLink className="w-2.5 h-2.5" /> Test Link
                                                  </a>
                                                )}
                                              </div>
                                              <input
                                                type="url"
                                                value={lesson.videoUrl || ''}
                                                onChange={(e) =>
                                                  handleUpdateCourseLesson(mod.id, lesson.id, {
                                                    videoUrl: e.target.value.trim() ? e.target.value : undefined,
                                                    hasVideo: !!e.target.value.trim(),
                                                  })
                                                }
                                                placeholder="https://..."
                                                className="w-full px-3 py-2 rounded-full bg-teal-50 text-xs text-teal-950 outline-none"
                                              />
                                            </div>

                                            {/* Field 2: Upload thumbnail */}
                                            <div className="space-y-1.5 p-3 rounded-[16px] bg-white">
                                              <label className="block text-xs font-bold text-teal-900">
                                                Upload Thumbnail
                                              </label>
                                              {lesson.imageUrl ? (
                                                <div className="space-y-2">
                                                  <div className="rounded-[12px] overflow-hidden h-28 bg-teal-900">
                                                    <img
                                                      src={lesson.imageUrl}
                                                      alt={lesson.title}
                                                      className="w-full h-full object-cover"
                                                    />
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => handleRemoveLessonImage(mod.id, lesson.id)}
                                                    className="w-full py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold cursor-pointer"
                                                  >
                                                    Remove Thumbnail
                                                  </button>
                                                </div>
                                              ) : (
                                                <label className="flex items-center justify-center p-3 rounded-full bg-teal-50 hover:bg-teal-100/50 cursor-pointer text-xs font-semibold text-teal-900 transition-colors">
                                                  <ImageIcon className="w-3.5 h-3.5 mr-2 text-teal-700" />
                                                  <span>Upload</span>
                                                  <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleLessonImageUpload(mod.id, lesson.id, e)}
                                                    className="hidden"
                                                  />
                                                </label>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================================
              POP-UP MODAL: CREATE COURSE
              Two main fields: Course Type (Free/Paid), Course Title (Manual/Dropdown)
              + Upload Json (Engine extracts module lessons and takes to Course Settings)
             =================================================================== */}
          {showCreateCourseModal && (
            <div className="fixed inset-0 z-50 bg-teal-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-body font-bold text-teal-900 text-xl">
                    Create Course
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateCourseModal(false);
                      setCreateCourseError(null);
                    }}
                    className="p-2 rounded-full hover:bg-teal-50 text-teal-950/70 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {createCourseError && (
                  <div className="p-3.5 rounded-[18px] bg-red-50 text-red-950 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{createCourseError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* FIELD 1: Course Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                      Course Type
                    </label>
                    <select
                      value={newCourseType}
                      onChange={(e) => setNewCourseType(e.target.value as 'FREE' | 'PAID')}
                      className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs font-semibold text-teal-950 outline-none cursor-pointer"
                    >
                      <option value="PAID">Paid Course</option>
                      <option value="FREE">Free Course</option>
                    </select>
                  </div>

                  {/* FIELD 2: Course Title */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                      Course Title
                    </label>

                    {newCourseType === 'FREE' ? (
                      /* Free Course: Type manually */
                      <input
                        type="text"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                        placeholder="Enter course title manually (e.g. Newborn Care Essentials)"
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                      />
                    ) : (
                      /* Paid Course: Branded dropdown selection of certification programs */
                      <select
                        value={selectedProgramIdToCreate}
                        onChange={(e) => setSelectedProgramIdToCreate(e.target.value)}
                        className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs font-semibold text-teal-950 outline-none cursor-pointer"
                      >
                        {CERTIFICATIONS_CONTENT.programs.map((prog) => (
                          <option key={prog.id} value={prog.id}>
                            {prog.title} ({prog.badge})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* FIELD 3: Upload Json */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider">
                        Upload Json
                      </label>
                      <button
                        type="button"
                        onClick={downloadSampleCourseJson}
                        className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> Sample JSON
                      </button>
                    </div>

                    <label className="flex flex-col items-center justify-center p-6 rounded-[24px] bg-teal-50 hover:bg-teal-100/50 cursor-pointer transition-colors text-center">
                      <FileCode className="w-8 h-8 text-orange-500 mb-2" />
                      <span className="font-body font-bold text-teal-900 text-sm">
                        Select JSON File to Extract
                      </span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        onChange={handleCreateCourseFromJsonFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              POP-UP MODAL: ADD MODULE (UPLOAD JSON) - Can add module by module
             =================================================================== */}
          {showAddModuleModal && (
            <div className="fixed inset-0 z-50 bg-teal-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <div className="space-y-0.5">
                    <h3 className="font-body font-bold text-teal-900 text-xl">
                      Add Module
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModuleModal(false);
                      setAddModuleError(null);
                    }}
                    className="p-2 rounded-full hover:bg-teal-50 text-teal-950/70 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {addModuleError && (
                  <div className="p-3.5 rounded-[18px] bg-red-50 text-red-950 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{addModuleError}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-teal-900">
                      Curriculum JSON Template:
                    </span>
                    <button
                      type="button"
                      onClick={downloadSampleModuleJson}
                      className="px-3 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-700" />
                      <span>Download Sample JSON</span>
                    </button>
                  </div>

                  <label className="flex flex-col items-center justify-center p-6 rounded-[24px] bg-teal-50 hover:bg-teal-100/50 cursor-pointer transition-colors text-center">
                    <Upload className="w-8 h-8 text-teal-700 mb-2" />
                    <span className="font-body font-bold text-teal-900 text-sm">
                      Select Module JSON file
                    </span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleAddModuleFromJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLATFORM & SELAR SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-[32px] p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-teal-50 text-teal-900 font-body text-xs font-semibold inline-block">
                  Platform Configuration
                </span>
                <h2 className="font-body font-semibold text-teal-900 text-2xl">
                  Selar Checkout Links & Business Settings
                </h2>
                <p className="font-body text-xs sm:text-sm text-teal-950/75">
                  Update your Selar product store links for each currency and your business support WhatsApp number.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                    Selar Product Link for XAF (Central/West Africa)
                  </label>
                  <input
                    type="url"
                    required
                    value={settings.selarProductLinkXAF}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, selarProductLinkXAF: e.target.value }))
                    }
                    placeholder="https://selar.co/..."
                    className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                    Selar Product Link for NGN (Nigeria)
                  </label>
                  <input
                    type="url"
                    required
                    value={settings.selarProductLinkNGN}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, selarProductLinkNGN: e.target.value }))
                    }
                    placeholder="https://selar.co/..."
                    className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                    Selar Product Link for USD (International)
                  </label>
                  <input
                    type="url"
                    required
                    value={settings.selarProductLinkUSD}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, selarProductLinkUSD: e.target.value }))
                    }
                    placeholder="https://selar.co/..."
                    className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                    Early Childhood Development Course Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={settings.ecdCourseBannerUrl || '/banners/ecd-banner.jpg'}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, ecdCourseBannerUrl: e.target.value }))
                    }
                    placeholder="/banners/ecd-banner.jpg or https://..."
                    className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                  />
                  <p className="text-[11px] text-teal-950/60 mt-1">
                    This banner appears behind the student profile avatar on the Student Portal home screen.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                    Baby First Health Support WhatsApp Number
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.businessWhatsApp}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, businessWhatsApp: e.target.value }))
                    }
                    placeholder="+237671752496"
                    className="w-full px-4 py-3 rounded-full bg-teal-50 text-xs sm:text-sm text-teal-950 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-body font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2"
                  >
                    {savedSettings ? <Check className="w-4 h-4 text-orange-400" /> : <Save className="w-4 h-4" />}
                    <span>{savedSettings ? 'Settings Saved' : 'Save Platform Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </Container>
      </Section>

      {/* Manual Approval Modal (Enforces genuine TxID from ConnectPaye/Receipt) */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-[500px] w-full space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-teal-700 font-bold">
                Manual Merchant Approval
              </span>
              <h3 className="font-body font-semibold text-teal-900 text-xl">
                Approve Payment for {selectedClaim.studentName}
              </h3>
              <p className="text-xs text-teal-950/70">
                Student ID: {selectedClaim.studentIdCode} • Expected:{' '}
                {selectedClaim.amountExpected.toLocaleString()} {selectedClaim.currency}
              </p>
            </div>

            {approvalError && (
              <div className="p-3.5 rounded-[16px] bg-red-50 text-red-950 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{approvalError}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-teal-900">
                Transaction Reference or Selar Order ID *
              </label>
              <input
                type="text"
                required
                value={txIdInput}
                onChange={(e) => setTxIdInput(e.target.value)}
                placeholder="Paste the genuine order/transaction ID here"
                className="w-full px-4 py-3 rounded-full bg-teal-50 text-sm font-mono text-teal-950 outline-none"
              />
              <p className="text-[11px] text-teal-950/70">
                Rule: A cryptographic SHA-256 hash of this TxID is stored in the ledger. The system blocks duplicate approvals automatically.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmApproval}
                disabled={isApproving || !txIdInput.trim()}
                className="flex-1 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-xs sm:text-sm transition-all"
              >
                {isApproving ? 'Verifying & Activating...' : 'Confirm Approval & Activate'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="px-5 py-3.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold hover:bg-teal-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
