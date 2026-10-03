import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { Headline } from '../components/Headline';
import {
  getAllPaymentClaims,
  approvePaymentClaim,
  rejectPaymentClaim,
  getPortalSettings,
  updatePortalSettings,
  getAllAccessCodes,
  generateBatchAccessCodes
} from '../services/portalService';
import {
  PaymentClaimData,
  PortalSettings,
  CurrencyCode,
  AccessCode,
  CourseModule
} from '../types/studentPortal';
import { DEFAULT_SETTINGS, DEFAULT_PROGRAM, DEFAULT_MODULES } from '../data/portalDefaults';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accessCodes' | 'claims' | 'curriculum' | 'settings'>('accessCodes');
  const [claims, setClaims] = useState<PaymentClaimData[]>([]);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
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

  // File Upload refs for module audio and document
  const audioFileInputRef = useRef<HTMLInputElement>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);

  // Approval modal state
  const [selectedClaim, setSelectedClaim] = useState<PaymentClaimData | null>(null);
  const [txIdInput, setTxIdInput] = useState('');
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);

  // Access code generation form
  const [generateCount, setGenerateCount] = useState<number>(5);
  const [generateCurrency, setGenerateCurrency] = useState<CurrencyCode>('XAF');
  const [isGeneratingCodes, setIsGeneratingCodes] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedAllAvailable, setCopiedAllAvailable] = useState(false);

  // Curriculum Media Management state
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
  const [selectedModuleId, setSelectedModuleId] = useState<string>(DEFAULT_MODULES[0]?.id || 'mod-1');
  const [savedCurriculum, setSavedCurriculum] = useState(false);

  // Settings form
  const [savedSettings, setSavedSettings] = useState(false);

  const selectedModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

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

  const handleUpdateSelectedModule = (updates: Partial<CourseModule>) => {
    setModules((prev) =>
      prev.map((m) => (m.id === selectedModule.id ? { ...m, ...updates } : m))
    );
  };

  const handleUpdateLessonVideo = (lessonId: string, videoUrl: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== selectedModule.id) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, videoUrl, hasVideo: !!videoUrl.trim() } : l
          ),
        };
      })
    );
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateSelectedModule({
        audioUrl: reader.result as string,
        audioName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAudio = () => {
    handleUpdateSelectedModule({
      audioUrl: undefined,
      audioName: undefined,
    });
    if (audioFileInputRef.current) audioFileInputRef.current.value = '';
  };

  const handleDocFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdateSelectedModule({
        docUrl: reader.result as string,
        docName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = () => {
    handleUpdateSelectedModule({
      docUrl: undefined,
      docName: undefined,
    });
    if (docFileInputRef.current) docFileInputRef.current.value = '';
  };

  const handleSaveCurriculum = () => {
    localStorage.setItem('bfh_course_modules', JSON.stringify(modules));
    window.dispatchEvent(new Event('storage'));
    setSavedCurriculum(true);
    setTimeout(() => setSavedCurriculum(false), 2500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedClaims = await getAllPaymentClaims();
    setClaims(fetchedClaims);
    const fetchedCodes = await getAllAccessCodes();
    setAccessCodes(fetchedCodes);
    const fetchedSettings = await getPortalSettings();
    setSettings(fetchedSettings);
  };

  const handleGenerateCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCodes(true);
    const amount = generateCurrency === 'XAF' ? 30000 : generateCurrency === 'NGN' ? 75000 : 50;
    await generateBatchAccessCodes(
      generateCount,
      DEFAULT_PROGRAM.id,
      generateCurrency,
      amount,
      `Generated for Selar ${generateCurrency} receipts`
    );
    await loadData();
    setIsGeneratingCodes(false);
  };

  const handleCopySingleCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(code);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyAllAvailableCodes = () => {
    const availableCodes = accessCodes
      .filter((c) => c.status === 'AVAILABLE')
      .map((c) => c.code)
      .join('\n');

    if (!availableCodes) return;
    navigator.clipboard.writeText(availableCodes);
    setCopiedAllAvailable(true);
    setTimeout(() => setCopiedAllAvailable(false), 2000);
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
    <div className="pt-28 md:pt-36">
      {/* Top Banner */}
      <div className="bg-teal-900 text-white py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-orange-400 font-bold">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-body font-semibold text-xl text-white">
                    Baby First Health Admin Console
                  </h1>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30">
                    Master Admin
                  </span>
                </div>
                <p className="text-xs text-teal-200">
                  Selar Access Codes, Admissions, and Course Verification Management
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAdminLogout}
                className="px-3.5 py-2 rounded-full bg-teal-800 hover:bg-teal-700 text-teal-100 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors mr-1"
                title="Log out of Admin Console"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('accessCodes')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'accessCodes'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Selar Access Codes ({availableCount} Ready)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('claims')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'claims'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Payment Claims ({claims.filter((c) => c.status === 'PENDING_VERIFICATION').length} Pending)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('curriculum')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'curriculum'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Curriculum Media
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-orange-500 text-white'
                    : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                }`}
              >
                Platform Settings
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Admin Area */}
      <Section bg="teal-50" className="pt-8 pb-[85px]">
        <Container>
          {/* TAB 1: SELAR ACCESS CODES MANAGER */}
          {activeTab === 'accessCodes' && (
            <div className="space-y-6">
              {/* Stats Overview Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-[24px] p-6 space-y-1">
                  <span className="text-xs uppercase font-semibold text-teal-950/60 block">
                    Available for Selar Receipts
                  </span>
                  <div className="font-body font-bold text-3xl text-teal-900">
                    {availableCount}
                  </div>
                  <p className="text-xs text-teal-950/70">
                    Ready to copy into your Selar digital download receipt files.
                  </p>
                </div>

                <div className="bg-white rounded-[24px] p-6 space-y-1">
                  <span className="text-xs uppercase font-semibold text-teal-950/60 block">
                    Redeemed by Students
                  </span>
                  <div className="font-body font-bold text-3xl text-orange-600">
                    {redeemedCount}
                  </div>
                  <p className="text-xs text-teal-950/70">
                    Learners who have activated course access using their code.
                  </p>
                </div>

                <div className="bg-white rounded-[24px] p-6 space-y-1">
                  <span className="text-xs uppercase font-semibold text-teal-950/60 block">
                    Selar Redirection URL
                  </span>
                  <div className="font-mono text-xs font-bold text-teal-900 break-all pt-1">
                    https://babyfirsthealth.netlify.app/redeem
                  </div>
                  <p className="text-[11px] text-teal-950/70">
                    Paste this into your Selar product settings as the Redirect URL after payment.
                  </p>
                </div>
              </div>

              {/* Generate New Access Codes Block */}
              <div className="bg-white rounded-[28px] p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-body font-semibold text-teal-900 text-lg">
                      Generate New Single-Use Access Codes
                    </h3>
                    <p className="font-body text-xs text-teal-950/70">
                      Create a fresh batch of codes to upload into your Selar receipt or delivery document.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAllAvailableCodes}
                    disabled={availableCount === 0}
                    className="px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 disabled:opacity-50 text-teal-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-stretch sm:self-auto justify-center"
                  >
                    {copiedAllAvailable ? <Check className="w-3.5 h-3.5 text-orange-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAllAvailable ? 'Copied All Available Codes!' : 'Copy All Available Codes'}</span>
                  </button>
                </div>

                <form onSubmit={handleGenerateCodes} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1">
                      Batch Size
                    </label>
                    <select
                      value={generateCount}
                      onChange={(e) => setGenerateCount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-full bg-teal-50 text-xs font-semibold text-teal-950 outline-none"
                    >
                      <option value={1}>1 Code</option>
                      <option value={5}>5 Codes</option>
                      <option value={10}>10 Codes</option>
                      <option value={20}>20 Codes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1">
                      Curriculum
                    </label>
                    <input
                      type="text"
                      disabled
                      value={DEFAULT_PROGRAM.title}
                      className="w-full px-4 py-2.5 rounded-full bg-teal-50 text-xs text-teal-950 outline-none truncate"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-900 mb-1">
                      Currency Category
                    </label>
                    <select
                      value={generateCurrency}
                      onChange={(e) => setGenerateCurrency(e.target.value as CurrencyCode)}
                      className="w-full px-4 py-2.5 rounded-full bg-teal-50 text-xs font-semibold text-teal-950 outline-none"
                    >
                      <option value="XAF">XAF (30,000)</option>
                      <option value="NGN">NGN (75,000)</option>
                      <option value="USD">USD ($50)</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isGeneratingCodes}
                      className="w-full py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-body font-bold text-xs transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isGeneratingCodes ? 'Generating...' : `Generate ${generateCount} Codes`}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Codes Filter & Search */}
              <div className="bg-white rounded-[28px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-teal-600 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search code or student name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-teal-50 text-xs text-teal-950 outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 self-stretch md:self-auto">
                  {(['ALL', 'AVAILABLE', 'REDEEMED'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setCodeFilter(filter)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        codeFilter === filter
                          ? 'bg-teal-600 text-white'
                          : 'bg-teal-50 text-teal-900 hover:bg-teal-100'
                      }`}
                    >
                      {filter === 'ALL'
                        ? 'All'
                        : filter === 'AVAILABLE'
                        ? `Available (${availableCount})`
                        : `Redeemed (${redeemedCount})`}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={loadData}
                    className="p-2 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100"
                    title="Refresh data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Access Codes Table */}
              <div className="space-y-3">
                {filteredCodes.length === 0 ? (
                  <div className="bg-white rounded-[28px] p-10 text-center text-teal-950/70">
                    No access codes found matching your criteria.
                  </div>
                ) : (
                  filteredCodes.map((codeItem) => (
                    <div
                      key={codeItem.id}
                      className="bg-white rounded-[24px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-base font-bold text-teal-900">
                            {codeItem.code}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              codeItem.status === 'AVAILABLE'
                                ? 'bg-teal-100 text-teal-900'
                                : 'bg-orange-100 text-orange-950'
                            }`}
                          >
                            {codeItem.status}
                          </span>
                          {codeItem.currency && (
                            <span className="text-[11px] text-teal-950/60 font-semibold">
                              ({codeItem.currency})
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-teal-950/75">
                          {codeItem.status === 'REDEEMED' ? (
                            <span>
                              Redeemed by <strong>{codeItem.redeemedByStudentName}</strong> ({codeItem.redeemedByStudentIdCode}) on {new Date(codeItem.redeemedAt || '').toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-teal-950/60">
                              Generated {new Date(codeItem.createdAt).toLocaleDateString()} • Ready for customer delivery
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                        <button
                          type="button"
                          onClick={() => handleCopySingleCode(codeItem.code)}
                          className="px-3.5 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          {copiedCodeId === codeItem.code ? (
                            <Check className="w-3.5 h-3.5 text-orange-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedCodeId === codeItem.code ? 'Copied' : 'Copy Code'}</span>
                        </button>

                        {codeItem.status === 'AVAILABLE' && (
                          <Link
                            to={`/redeem?code=${codeItem.code}`}
                            target="_blank"
                            className="px-3.5 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors"
                          >
                            Test Redeem
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
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

          {/* TAB 3: CURRICULUM MEDIA (Module Audio, Module Doc, Module/Lesson Video Links) */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-semibold">
                      Curriculum Media & Resources
                    </span>
                    {savedCurriculum && (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Changes Saved!
                      </span>
                    )}
                  </div>
                  <h2 className="font-body font-bold text-teal-900 text-xl sm:text-2xl">
                    Early Childhood Development Course Media
                  </h2>
                  <p className="font-body text-xs text-teal-950/70">
                    Upload audio files and documents for each module, and configure video links for modules or lessons.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveCurriculum}
                  className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 self-stretch md:self-auto justify-center"
                >
                  <Save className="w-4 h-4" />
                  <span>{savedCurriculum ? 'Curriculum Saved!' : 'Save Curriculum Media'}</span>
                </button>
              </div>

              {/* Module Selector Pill Bar */}
              <div className="bg-white rounded-[28px] p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-body font-bold text-teal-900 text-sm">
                    Select Module to Edit (10 Modules Total)
                  </h3>
                  <span className="text-xs text-teal-950/60 font-semibold">
                    Selected: Module {selectedModule.order}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {modules.map((m) => {
                    const isSelected = m.id === selectedModule.id;
                    const hasAudio = !!m.audioUrl;
                    const hasDoc = !!m.docUrl;
                    const hasVideo = !!m.videoUrl || m.lessons.some((l) => !!l.videoUrl);

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedModuleId(m.id)}
                        className={`p-3 rounded-[20px] text-left transition-all flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-teal-900 text-white shadow-md'
                            : 'bg-teal-50 hover:bg-teal-100/70 text-teal-950'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-bold ${isSelected ? 'text-orange-400' : 'text-teal-800'}`}>
                            Module {m.order}
                          </span>
                          <div className="flex items-center gap-1">
                            {hasAudio && (
                              <span title="Has audio">
                                <Volume2 className={`w-3 h-3 ${isSelected ? 'text-teal-200' : 'text-teal-600'}`} />
                              </span>
                            )}
                            {hasDoc && (
                              <span title="Has document">
                                <FileText className={`w-3 h-3 ${isSelected ? 'text-teal-200' : 'text-teal-600'}`} />
                              </span>
                            )}
                            {hasVideo && (
                              <span title="Has video">
                                <Video className={`w-3 h-3 ${isSelected ? 'text-orange-300' : 'text-orange-500'}`} />
                              </span>
                            )}
                          </div>
                        </div>

                        <span className={`text-[11px] leading-tight line-clamp-2 ${isSelected ? 'text-white/90' : 'text-teal-950/80'}`}>
                          {m.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Module Media Configuration Form */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 space-y-6">
                {/* Module Details Header */}
                <div className="space-y-1 pb-4 border-b border-teal-50">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Editing Module {selectedModule.order} of {modules.length}
                  </span>
                  <h3 className="font-body font-bold text-teal-900 text-xl">
                    {selectedModule.order}. {selectedModule.title.replace(/^Module\s*\d*[:.-]?\s*/i, '').replace(/^\d+\.\s*/, '')}
                  </h3>
                  <p className="text-xs text-teal-950/70">
                    {selectedModule.description}
                  </p>
                </div>

                {/* 1. Module Video Link (Module Level) */}
                <div className="space-y-2 p-5 rounded-[24px] bg-teal-50/40">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-teal-900">
                      Module Video Link (Optional for Entire Module)
                    </label>
                    {selectedModule.videoUrl && (
                      <a
                        href={selectedModule.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Test Link
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={selectedModule.videoUrl || ''}
                    onChange={(e) => handleUpdateSelectedModule({ videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/... or https://vimeo.com/... or MP4 link"
                    className="w-full px-4 py-3 rounded-full bg-white text-xs sm:text-sm text-teal-950 outline-none"
                  />
                  <p className="text-[11px] text-teal-950/60">
                    If set, students will see a &quot;Watch Video&quot; button in the module dropdown before lessons.
                  </p>
                </div>

                {/* 2. Module Audio Guide Upload (Module Level Only) */}
                <div className="space-y-3 p-5 rounded-[24px] bg-teal-50/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-body font-bold text-teal-900 text-xs sm:text-sm">
                        Upload Audio File for Module (Module Only)
                      </h4>
                      <p className="text-[11px] text-teal-950/70">
                        Upload an audio lecture or audio guide (.mp3, .wav, .m4a). Played when student taps &quot;Play Audio&quot;.
                      </p>
                    </div>
                  </div>

                  {/* Hidden Audio file input */}
                  <input
                    type="file"
                    ref={audioFileInputRef}
                    onChange={handleAudioFileUpload}
                    accept="audio/mp3,audio/wav,audio/m4a,audio/mpeg,audio/*"
                    className="hidden"
                  />

                  {selectedModule.audioUrl ? (
                    <div className="bg-white p-4 rounded-[20px] space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Volume2 className="w-4 h-4 text-teal-700 shrink-0" />
                          <span className="text-xs font-semibold text-teal-900 truncate">
                            {selectedModule.audioName || `Module_${selectedModule.order}_Audio.mp3`}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                            Active
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => audioFileInputRef.current?.click()}
                            className="px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-[11px] font-semibold"
                          >
                            Replace Audio
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveAudio}
                            className="p-1 rounded-full text-red-600 hover:bg-red-50"
                            title="Remove audio"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Built-in Audio Player Preview */}
                      <audio controls src={selectedModule.audioUrl} className="w-full h-8" />
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-xs text-teal-950/60">
                        No custom audio file uploaded yet. (Falls back to audio guide speech in student portal).
                      </div>
                      <button
                        type="button"
                        onClick={() => audioFileInputRef.current?.click()}
                        className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Audio File</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Module Study Document Upload (Module Level Only) */}
                <div className="space-y-3 p-5 rounded-[24px] bg-teal-50/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-body font-bold text-teal-900 text-xs sm:text-sm">
                        Upload Study Document for Module (Module Only)
                      </h4>
                      <p className="text-[11px] text-teal-950/70">
                        Upload a study syllabus or notes document (.pdf, .doc, .docx, .txt). Downloaded when student taps &quot;Document&quot;.
                      </p>
                    </div>
                  </div>

                  {/* Hidden Doc file input */}
                  <input
                    type="file"
                    ref={docFileInputRef}
                    onChange={handleDocFileUpload}
                    accept=".pdf,.doc,.docx,.txt,application/pdf"
                    className="hidden"
                  />

                  {selectedModule.docUrl ? (
                    <div className="bg-white p-4 rounded-[20px] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-teal-700 shrink-0" />
                        <span className="text-xs font-semibold text-teal-900 truncate">
                          {selectedModule.docName || `Module_${selectedModule.order}_Study_Document.pdf`}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          Uploaded
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={selectedModule.docUrl}
                          download={selectedModule.docName || `Module_${selectedModule.order}_Doc`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> View/Download
                        </a>
                        <button
                          type="button"
                          onClick={() => docFileInputRef.current?.click()}
                          className="px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 text-[11px] font-semibold"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveDoc}
                          className="p-1 rounded-full text-red-600 hover:bg-red-50"
                          title="Remove document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="text-xs text-teal-950/60">
                        No custom study document uploaded yet. (Falls back to structured lesson notes in student portal).
                      </div>
                      <button
                        type="button"
                        onClick={() => docFileInputRef.current?.click()}
                        className="px-4 py-2 rounded-full bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Document File</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Lesson Video Links (For Lessons in this Module) */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <h4 className="font-body font-bold text-teal-900 text-sm sm:text-base">
                      Lesson Video Links for Module {selectedModule.order}
                    </h4>
                    <p className="text-xs text-teal-950/70">
                      Configure video links for each individual lesson. Videos will be embedded directly above the lesson text for students.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {selectedModule.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 rounded-[20px] bg-teal-50/50 space-y-2 border border-teal-100/50"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                          <span className="text-xs font-bold text-teal-900">
                            Lesson {lesson.order}: {lesson.title}
                          </span>
                          {lesson.videoUrl && (
                            <a
                              href={lesson.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" /> Test Video
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={lesson.videoUrl || ''}
                            onChange={(e) => handleUpdateLessonVideo(lesson.id, e.target.value)}
                            placeholder="https://www.youtube.com/embed/... or Vimeo or MP4 URL"
                            className="flex-1 px-4 py-2.5 rounded-full bg-white text-xs text-teal-950 outline-none"
                          />
                          {lesson.videoUrl && (
                            <button
                              type="button"
                              onClick={() => handleUpdateLessonVideo(lesson.id, '')}
                              className="p-2 rounded-full text-teal-950/50 hover:text-red-600 transition-colors"
                              title="Clear video URL"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Save Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-teal-50">
                  <div className="text-xs text-teal-950/70">
                    Tip: Remember to tap Save to persist video links and uploaded media files to the portal.
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCurriculum}
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-body font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savedCurriculum ? 'Saved to Portal!' : 'Save Curriculum Changes'}</span>
                  </button>
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
