export type CurrencyCode = 'XAF' | 'NGN' | 'USD';

export type PaymentVerificationMode = 'MANUAL' | 'API_ASSISTED' | 'API_AUTO';

export type EnrollmentStatus = 'REGISTERED' | 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'COMPLETED';

export type ClaimStatus = 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED';

export type CertificateStatus = 'VALID' | 'REVOKED';

export interface StudentProfile {
  id: string; // Auth UID
  studentId: string; // BFH-ECD-XXXXXXXX
  fullName: string;
  email: string;
  whatsappNumber: string;
  countryOfResidence: string;
  stateRegion: string;
  placeOfBirth: string;
  profession: string;
  academicLevel: string;
  englishProficiency: string;
  profilePhotoUrl?: string;
  isEmailVerified: boolean;
  status: EnrollmentStatus;
  programId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramData {
  id: string;
  code: string;
  title: string;
  subTitle?: string;
  hours?: string;
  description: string;
  bannerUrl?: string;
  priceXAF: number;
  priceNGN: number;
  priceUSD: number;
  passingScore: number;
  maxQuizAttempts: number;
  isActive: boolean;
}

export interface PaymentClaimData {
  id: string;
  claimToken?: string;
  studentId: string;
  studentIdCode: string;
  studentName: string;
  programId: string;
  programTitle: string;
  payerPhoneOrName: string;
  currency: CurrencyCode;
  amountExpected: number;
  amountReported?: number;
  transactionIdHint?: string;
  receiptUrl?: string;
  status: ClaimStatus;
  verifiedTxId?: string;
  rejectReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  policyAcceptedVersion: string;
  policyAcceptedAt: string;
  apiStatusBadge?: 'MATCH' | 'PENDING' | 'FAILED' | 'MISMATCH' | 'UNCHECKED';
}

export interface CourseModule {
  id: string;
  programId: string;
  title: string;
  order: number;
  description: string;
  lessons: CourseLesson[];
  docUrl?: string;
  docName?: string;
  audioUrl?: string;
  audioName?: string;
  audioLink?: string;
  videoUrl?: string;
  glossary?: Array<{ term: string; definition: string }>;
  references?: Array<{ title: string; url?: string }>;
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  programId: string;
  title: string;
  order: number;
  content: string;
  hasVideo: boolean;
  videoUrl?: string;
  imageUrl?: string;
  coachNotes?: string;
  quiz?: CourseQuiz;
}

export interface CourseQuiz {
  id: string;
  lessonId: string;
  programId: string;
  passingScore: number; // percentage, e.g. 80
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswerIndex?: number; // kept server-side in admin/functions
  explanation?: string;
}

export interface CertificateData {
  id: string; // e.g. CERT-BFH-ECD-987654
  verificationToken: string;
  studentId: string;
  studentName: string;
  programTitle: string;
  programCode: string;
  issueDate: string;
  status: CertificateStatus;
  issuerInfo: string;
}

export interface AccessCode {
  id: string; // Code string, e.g. BFH-ECD-7892-4105
  code: string;
  programId: string;
  programTitle: string;
  status: 'AVAILABLE' | 'REDEEMED' | 'REVOKED';
  currency?: CurrencyCode;
  amount?: number;
  redeemedByStudentId?: string;
  redeemedByStudentIdCode?: string;
  redeemedByStudentName?: string;
  redeemedAt?: string;
  createdAt: string;
  notes?: string;
}

export interface PortalSettings {
  paymentVerificationMode: PaymentVerificationMode;
  connectPayeLinkXAF: string;
  connectPayeLinkNGN: string;
  connectPayeLinkUSD: string;
  selarProductLinkXAF: string;
  selarProductLinkNGN: string;
  selarProductLinkUSD: string;
  ecdCourseBannerUrl?: string;
  businessWhatsApp: string;
  allowedVideoHosts: string[];
  pediaEnabled: boolean;
  pediaDailyLimit: number;
  autoIssueCertificates: boolean;
  refundPolicyVersion: string;
  refundPolicyContent: string;
}

export interface ApiTestLog {
  id: string;
  testType: string;
  currency: CurrencyCode;
  requestPayload: Record<string, any>;
  responsePayload: Record<string, any>;
  status: 'SUCCESS' | 'FAILED';
  createdAt: string;
}
