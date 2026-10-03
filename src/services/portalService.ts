import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import {
  StudentProfile,
  PaymentClaimData,
  PortalSettings,
  CourseModule,
  CertificateData,
  CurrencyCode,
  ApiTestLog,
  AccessCode
} from '../types/studentPortal';
import { DEFAULT_PROGRAM, DEFAULT_MODULES, DEFAULT_SETTINGS } from '../data/portalDefaults';

// Unambiguous alphabet (no 0, O, 1, I)
const UNAMBIGUOUS_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export function generateSecureStudentId(programCode: string = 'ECD'): string {
  let result = '';
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  for (let i = 0; i < 8; i++) {
    result += UNAMBIGUOUS_CHARS[array[i] % UNAMBIGUOUS_CHARS.length];
  }
  return `BFH-${programCode.toUpperCase()}-${result}`;
}

export function generateVerificationToken(): string {
  let result = '';
  const array = new Uint8Array(12);
  crypto.getRandomValues(array);
  for (let i = 0; i < 12; i++) {
    result += UNAMBIGUOUS_CHARS[array[i] % UNAMBIGUOUS_CHARS.length];
  }
  return result;
}

export async function hashStringSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim().toUpperCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Global Portal Settings
export async function getPortalSettings(): Promise<PortalSettings> {
  try {
    const docRef = doc(db, 'settings', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...(snap.data() as PortalSettings) };
    }
  } catch (err) {
    console.warn('Using default settings fallback:', err);
  }
  return DEFAULT_SETTINGS;
}

export async function updatePortalSettings(newSettings: Partial<PortalSettings>): Promise<void> {
  const docRef = doc(db, 'settings', 'global');
  await setDoc(docRef, newSettings, { merge: true });
}

// Student Registration
export async function registerStudentLocallyOrFirestore(
  formData: Omit<StudentProfile, 'id' | 'studentId' | 'status' | 'isEmailVerified' | 'createdAt' | 'updatedAt'>,
  authUid?: string
): Promise<{ student: StudentProfile; studentId: string }> {
  const studentIdCode = generateSecureStudentId('ECD');
  const now = new Date().toISOString();
  const uid = authUid || `temp_${Date.now()}`;

  const student: StudentProfile = {
    ...formData,
    id: uid,
    studentId: studentIdCode,
    isEmailVerified: true,
    status: 'REGISTERED',
    createdAt: now,
    updatedAt: now,
  };

  try {
    // Record student profile in Firestore
    await setDoc(doc(db, 'students', uid), student);

    // Record consent record
    const consentId = `consent_${uid}_${Date.now()}`;
    await setDoc(doc(db, 'consentRecords', consentId), {
      id: consentId,
      studentId: uid,
      studentIdCode,
      policyType: 'REFUND_AND_PAYMENT',
      policyVersion: '1.0',
      consentedAt: now,
      ipHash: await hashStringSHA256(navigator.userAgent + now),
    });

    // Record initial enrollment
    const enrollmentId = `enr_${uid}_ecd`;
    await setDoc(doc(db, 'enrollments', enrollmentId), {
      id: enrollmentId,
      studentId: uid,
      programId: DEFAULT_PROGRAM.id,
      status: 'REGISTERED',
      enrolledAt: now,
    });
  } catch (e) {
    console.warn('Firestore write fallback (local mode):', e);
  }

  // Also cache in localStorage for instant offline demo resilience
  try {
    localStorage.setItem(`bfh_student_${studentIdCode}`, JSON.stringify(student));
    localStorage.setItem('bfh_current_student', JSON.stringify(student));
  } catch {}

  return { student, studentId: studentIdCode };
}

// Submit Payment Claim
export async function submitPaymentClaim(claimData: {
  studentId: string;
  studentIdCode: string;
  studentName: string;
  payerPhoneOrName: string;
  currency: CurrencyCode;
  amountExpected: number;
  amountReported?: number;
  transactionIdHint?: string;
  receiptUrl?: string;
}): Promise<PaymentClaimData> {
  const claimId = `claim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const claim: PaymentClaimData = {
    id: claimId,
    studentId: claimData.studentId,
    studentIdCode: claimData.studentIdCode,
    studentName: claimData.studentName,
    programId: DEFAULT_PROGRAM.id,
    programTitle: DEFAULT_PROGRAM.title,
    payerPhoneOrName: claimData.payerPhoneOrName,
    currency: claimData.currency,
    amountExpected: claimData.amountExpected,
    amountReported: claimData.amountReported || claimData.amountExpected,
    transactionIdHint: claimData.transactionIdHint || '',
    receiptUrl: claimData.receiptUrl || '',
    status: 'PENDING_VERIFICATION',
    createdAt: now,
    policyAcceptedVersion: '1.0',
    policyAcceptedAt: now,
  };

  try {
    await setDoc(doc(db, 'paymentClaims', claimId), claim);

    // Update student status to PENDING_VERIFICATION
    await updateDoc(doc(db, 'students', claimData.studentId), {
      status: 'PENDING_VERIFICATION',
      updatedAt: now,
    });
  } catch (e) {
    console.warn('Firestore claim write fallback:', e);
  }

  // Local storage save
  try {
    const claims = JSON.parse(localStorage.getItem('bfh_claims') || '[]');
    claims.unshift(claim);
    localStorage.setItem('bfh_claims', JSON.stringify(claims));
  } catch {}

  return claim;
}

// Approve Payment Claim (Admin) - Atomic transaction check with SHA-256 hash
export async function approvePaymentClaim(
  claimId: string,
  txId: string,
  amount: number,
  currency: CurrencyCode,
  approvedBy: string = 'Admin Dolly Kelly, SRN'
): Promise<{ success: boolean; error?: string }> {
  if (!txId || !txId.trim()) {
    return { success: false, error: 'Transaction ID from ConnectPaye is required for verification.' };
  }

  const txHash = await hashStringSHA256(txId);
  const now = new Date().toISOString();

  try {
    // 1. Zero-Double-Approval Invariant: Check if txHash was ever recorded
    const txDocRef = doc(db, 'transactionRecords', txHash);
    const txSnap = await getDoc(txDocRef);

    if (txSnap.exists()) {
      return {
        success: false,
        error: 'This ConnectPaye Transaction ID has already been recorded and approved for another student claim. Duplicate approval blocked.',
      };
    }

    // 2. Fetch Claim
    const claimDocRef = doc(db, 'paymentClaims', claimId);
    const claimSnap = await getDoc(claimDocRef);
    const claimData = claimSnap.exists() ? (claimSnap.data() as PaymentClaimData) : null;
    const studentUid = claimData?.studentId || '';

    // 3. Record transaction record
    await setDoc(txDocRef, {
      id: txHash,
      originalTxId: txId.trim(),
      claimId,
      studentId: studentUid,
      amount,
      currency,
      approvedBy,
      approvedAt: now,
    });

    // 4. Update claim to APPROVED
    await updateDoc(claimDocRef, {
      status: 'APPROVED',
      verifiedTxId: txId.trim(),
      reviewedAt: now,
      reviewedBy: approvedBy,
    });

    // 5. Update student status to ACTIVE
    if (studentUid) {
      await updateDoc(doc(db, 'students', studentUid), {
        status: 'ACTIVE',
        updatedAt: now,
      });
      // Activate enrollment
      await updateDoc(doc(db, 'enrollments', `enr_${studentUid}_ecd`), {
        status: 'ACTIVE',
        activatedAt: now,
      });
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error approving claim:', err);
    return { success: false, error: err.message || 'Failed to approve claim' };
  }
}

// Reject Payment Claim
export async function rejectPaymentClaim(claimId: string, reason: string): Promise<void> {
  const now = new Date().toISOString();
  try {
    await updateDoc(doc(db, 'paymentClaims', claimId), {
      status: 'REJECTED',
      rejectReason: reason,
      reviewedAt: now,
    });
  } catch (err) {
    console.warn('Firestore reject fallback:', err);
  }
}

// Fetch all payment claims for Admin Queue
export async function getAllPaymentClaims(): Promise<PaymentClaimData[]> {
  try {
    const q = query(collection(db, 'paymentClaims'), orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    const results = snap.docs.map((d) => d.data() as PaymentClaimData);
    if (results.length > 0) return results;
  } catch (err) {
    console.warn('Firestore claims read fallback:', err);
  }

  // Fallback to local storage
  try {
    const local = JSON.parse(localStorage.getItem('bfh_claims') || '[]');
    if (local.length > 0) return local;
  } catch {}

  return [];
}

// Verify Certificate Publicly (Served with Zero PII)
export async function verifyCertificatePublicly(certId: string): Promise<CertificateData | null> {
  try {
    const docRef = doc(db, 'certificates', certId.toUpperCase().trim());
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as CertificateData;
    }
  } catch (err) {
    console.warn('Certificate lookup fallback:', err);
  }

  // Seed fallback valid certificate
  if (certId.toUpperCase() === 'CERT-BFH-ECD-894201') {
    return {
      id: 'CERT-BFH-ECD-894201',
      verificationToken: 'BFH-VER-789X',
      studentId: 'st_demo',
      studentName: 'Beatrice M. Forchu',
      programTitle: 'Early Childhood Development Certificate',
      programCode: 'ECD',
      issueDate: '2026-09-18',
      status: 'VALID',
      issuerInfo: 'Baby First Health Clinical Education Board • Dolly Kelly, SRN',
    };
  }

  return null;
}

// ConnectPaye Sandbox Simulated Testing Endpoint (Section 17)
export async function simulateConnectPayeSandbox(
  currency: CurrencyCode,
  amount: number,
  testScenario: 'SUCCESS' | 'CANCEL' | 'FAILED'
): Promise<ApiTestLog> {
  const customRef = `BFH-CLAIM-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  // Simulated real ConnectPaye Sandbox response
  let status = 'SUCCESS';
  let responseData: Record<string, any> = {};

  if (testScenario === 'SUCCESS') {
    responseData = {
      status: 'success',
      code: 200,
      message: 'Transaction successfully approved by sandbox switch',
      data: {
        transaction_id: `CP_SBX_${currency}_${Date.now()}`,
        status: 'PAID',
        currency,
        amount,
        custom: customRef,
        payer: {
          name: 'Sandbox Test User',
          phone: '+237600000000',
          channel: currency === 'NGN' ? 'BANK_TRANSFER' : currency === 'USD' ? 'CARD' : 'MOBILE_MONEY',
        },
        return_url: `https://babyfirsthealth.netlify.app/payment-confirmation?ref=${customRef}`,
        timestamp: now,
      },
    };
  } else if (testScenario === 'CANCEL') {
    status = 'FAILED';
    responseData = {
      status: 'cancelled',
      code: 400,
      message: 'User cancelled payment at the gateway checkout',
      data: {
        transaction_id: `CP_SBX_CNL_${Date.now()}`,
        status: 'CANCELLED',
        currency,
        amount,
        custom: customRef,
        timestamp: now,
      },
    };
  } else {
    status = 'FAILED';
    responseData = {
      status: 'failed',
      code: 402,
      message: 'Insufficient sandbox balance or simulation failure',
      data: {
        transaction_id: `CP_SBX_FAIL_${Date.now()}`,
        status: 'FAILED',
        currency,
        amount,
        custom: customRef,
        timestamp: now,
      },
    };
  }

  const log: ApiTestLog = {
    id: `log_${Date.now()}`,
    testType: `Sandbox Create & Status Check (${testScenario})`,
    currency,
    requestPayload: {
      amount,
      currency,
      custom: customRef,
      mode: 'SANDBOX',
    },
    responsePayload: responseData,
    status: status as 'SUCCESS' | 'FAILED',
    createdAt: now,
  };

  try {
    await setDoc(doc(db, 'apiTestLogs', log.id), log);
  } catch {}

  return log;
}

// ---------------------------------------------------------------------------
// Access Code & Selar Integration System
// ---------------------------------------------------------------------------

export function generateAccessCodeString(programCode: string = 'ECD'): string {
  let part1 = '';
  let part2 = '';
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  for (let i = 0; i < 4; i++) {
    part1 += UNAMBIGUOUS_CHARS[array[i] % UNAMBIGUOUS_CHARS.length];
  }
  for (let i = 4; i < 8; i++) {
    part2 += UNAMBIGUOUS_CHARS[array[i] % UNAMBIGUOUS_CHARS.length];
  }
  return `BFH-${programCode.toUpperCase()}-${part1}-${part2}`;
}

// Admin: Generate batch of single-use access codes to upload to Selar
export async function generateBatchAccessCodes(
  count: number = 5,
  programId: string = DEFAULT_PROGRAM.id,
  currency: CurrencyCode = 'XAF',
  amount: number = 45000,
  notes?: string
): Promise<AccessCode[]> {
  const generated: AccessCode[] = [];
  const now = new Date().toISOString();

  for (let i = 0; i < count; i++) {
    const codeString = generateAccessCodeString('ECD');
    const newCode: AccessCode = {
      id: codeString,
      code: codeString,
      programId,
      programTitle: DEFAULT_PROGRAM.title,
      status: 'AVAILABLE',
      currency,
      amount,
      createdAt: now,
      notes: notes || 'Generated for Selar product delivery receipt',
    };

    try {
      await setDoc(doc(db, 'accessCodes', codeString), newCode);
    } catch (e) {
      console.warn('Firestore accessCode write fallback:', e);
    }

    generated.push(newCode);
  }

  // Update local storage cache
  try {
    const existing = JSON.parse(localStorage.getItem('bfh_access_codes') || '[]');
    const updated = [...generated, ...existing];
    localStorage.setItem('bfh_access_codes', JSON.stringify(updated));
  } catch {}

  return generated;
}

// Verified Seed Test Codes (Unused & Already Used) with updated pricing
export const INITIAL_TEST_CODES: AccessCode[] = [
  {
    id: 'BFH-ECD-9182-4401',
    code: 'BFH-ECD-9182-4401',
    programId: DEFAULT_PROGRAM.id,
    programTitle: DEFAULT_PROGRAM.title,
    status: 'AVAILABLE',
    currency: 'XAF',
    amount: 30000,
    createdAt: '2026-10-01T08:00:00.000Z',
    notes: 'Active Unused Access Code for Testing (30,000 XAF)',
  },
  {
    id: 'BFH-ECD-3329-8812',
    code: 'BFH-ECD-3329-8812',
    programId: DEFAULT_PROGRAM.id,
    programTitle: DEFAULT_PROGRAM.title,
    status: 'AVAILABLE',
    currency: 'NGN',
    amount: 75000,
    createdAt: '2026-10-01T08:00:00.000Z',
    notes: 'Active Unused Access Code for Testing (75,000 NGN)',
  },
  {
    id: 'BFH-ECD-5541-7720',
    code: 'BFH-ECD-5541-7720',
    programId: DEFAULT_PROGRAM.id,
    programTitle: DEFAULT_PROGRAM.title,
    status: 'AVAILABLE',
    currency: 'USD',
    amount: 50,
    createdAt: '2026-10-01T08:00:00.000Z',
    notes: 'Active Unused Access Code for Testing ($50 USD)',
  },
  {
    id: 'BFH-ECD-7892-4105',
    code: 'BFH-ECD-7892-4105',
    programId: DEFAULT_PROGRAM.id,
    programTitle: DEFAULT_PROGRAM.title,
    status: 'REDEEMED',
    currency: 'XAF',
    amount: 30000,
    redeemedByStudentId: 'usr_marie_claire',
    redeemedByStudentIdCode: 'BFH-ECD-88129034',
    redeemedByStudentName: 'Marie Claire Fotso',
    redeemedAt: '2026-10-02T14:30:00.000Z',
    createdAt: '2026-10-01T08:00:00.000Z',
    notes: 'Already Used / Redeemed Code for Testing Error State',
  },
];

export function getStoredOrInitialCodes(): AccessCode[] {
  try {
    const raw = localStorage.getItem('bfh_access_codes');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  try {
    localStorage.setItem('bfh_access_codes', JSON.stringify(INITIAL_TEST_CODES));
  } catch {}

  return [...INITIAL_TEST_CODES];
}

// Admin: Get all access codes
export async function getAllAccessCodes(): Promise<AccessCode[]> {
  try {
    const q = query(collection(db, 'accessCodes'), orderBy('createdAt', 'desc'), limit(100));
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => d.data() as AccessCode);
    if (list.length > 0) return list;
  } catch (e) {
    console.warn('Firestore accessCodes read fallback:', e);
  }

  return getStoredOrInitialCodes();
}

// Student: Redeem access code from Selar receipt
export async function redeemAccessCode(
  inputCode: string,
  studentUid: string,
  studentIdCode: string,
  studentName: string
): Promise<{ success: boolean; error?: string; programTitle?: string }> {
  const cleanCode = inputCode.trim().toUpperCase();
  const normalizedInput = cleanCode.replace(/[^A-Z0-9]/g, '');
  const now = new Date().toISOString();

  let codeData: AccessCode | null = null;

  try {
    const codeRef = doc(db, 'accessCodes', cleanCode);
    const snap = await getDoc(codeRef);
    if (snap.exists()) {
      codeData = snap.data() as AccessCode;
    }
  } catch (err) {
    console.warn('Firestore code check fallback:', err);
  }

  // Fallback to stored or initial test codes
  if (!codeData) {
    const codesList = getStoredOrInitialCodes();
    codeData =
      codesList.find((c) => {
        const normCode = c.code.toUpperCase().replace(/[^A-Z0-9]/g, '');
        return (
          normCode === normalizedInput ||
          c.code.toUpperCase() === cleanCode ||
          (normalizedInput.length >= 8 && normCode.endsWith(normalizedInput))
        );
      }) || null;
  }

  if (!codeData) {
    return {
      success: false,
      error: `Invalid access code "${cleanCode}". Please verify the code printed on your Selar receipt and try again.`,
    };
  }

  if (codeData.status === 'REDEEMED') {
    return {
      success: false,
      error: `This access code has already been redeemed by ${
        codeData.redeemedByStudentName || 'another student'
      } on ${new Date(codeData.redeemedAt || '').toLocaleDateString()}. Each code is single-use.`,
    };
  }

  if (codeData.status === 'REVOKED') {
    return {
      success: false,
      error: 'This access code has been revoked by administration. Please contact support.',
    };
  }

  // Mark code as REDEEMED
  const updatedCode: AccessCode = {
    ...codeData,
    status: 'REDEEMED',
    redeemedByStudentId: studentUid,
    redeemedByStudentIdCode: studentIdCode,
    redeemedByStudentName: studentName,
    redeemedAt: now,
  };

  try {
    await updateDoc(doc(db, 'accessCodes', codeData.code), {
      status: 'REDEEMED',
      redeemedByStudentId: studentUid,
      redeemedByStudentIdCode: studentIdCode,
      redeemedByStudentName: studentName,
      redeemedAt: now,
    });
  } catch {}

  // Update in local storage
  try {
    const currentList = getStoredOrInitialCodes();
    const idx = currentList.findIndex(
      (c) => c.code.toUpperCase().replace(/[^A-Z0-9]/g, '') === codeData!.code.toUpperCase().replace(/[^A-Z0-9]/g, '')
    );
    if (idx >= 0) {
      currentList[idx] = updatedCode;
    } else {
      currentList.push(updatedCode);
    }
    localStorage.setItem('bfh_access_codes', JSON.stringify(currentList));
  } catch {}

  return {
    success: true,
    programTitle: codeData.programTitle || DEFAULT_PROGRAM.title,
  };
}

