import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Subscriber, BroadcastPayload, BroadcastRecord } from '../types/emailMarketing';

const SUBSCRIBERS_STORAGE_KEY = 'bfh_email_subscribers_cache';
const BROADCASTS_STORAGE_KEY = 'bfh_email_broadcasts_history';

function parseInline(str: string): string {
  let escaped = escapeHtml(str);
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 700; color: #0f172a;">$1</strong>');
}

export function formatMarkdownForEmail(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    if (rawLine.startsWith('# ')) {
      const content = parseInline(rawLine.replace(/^#\s+/, ''));
      result.push(`<h1 style="color: #134e4a; font-size: 22px; font-weight: 800; margin: 20px 0 10px 0; line-height: 1.3;">${content}</h1>`);
      continue;
    }

    if (rawLine.startsWith('### ')) {
      const content = parseInline(rawLine.replace(/^###\s+/, ''));
      result.push(`<h3 style="color: #0f766e; font-size: 17px; font-weight: 700; margin: 16px 0 8px 0; line-height: 1.4;">${content}</h3>`);
      continue;
    }

    const content = parseInline(rawLine);
    result.push(`<p style="margin: 0 0 14px 0; line-height: 1.65; color: #1e293b; font-size: 16px;">${content}</p>`);
  }

  return result.join('');
}

export function generateEmailHtml(payload: BroadcastPayload, recipientEmail: string = 'parent@example.com'): string {
  const currentYear = new Date().getFullYear();
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://babyfirsthealth.com';
  
  const formattedBody = formatMarkdownForEmail(payload.body);

  const imageHtml = payload.imageUrl?.trim()
    ? `<div style="margin-bottom: 24px; text-align: center;">
        <img src="${escapeHtml(payload.imageUrl.trim())}" alt="Article visual" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto; border: 1px solid #e2e8f0;" />
       </div>`
    : '';

  const buttonHtml = payload.buttonLink?.trim() && payload.buttonLabel?.trim()
    ? `<div style="margin: 28px 0; text-align: center;">
        <a href="${escapeHtml(payload.buttonLink.trim())}" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: 600; font-size: 16px; border-radius: 9999px; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.2);">
          ${escapeHtml(payload.buttonLabel.trim())}
        </a>
       </div>`
    : '';

  const headlineHtml = payload.headline?.trim()
    ? `<h1 style="margin: 0 0 20px 0; color: #134e4a; font-size: 24px; font-weight: 800; line-height: 1.3;">${escapeHtml(payload.headline.trim())}</h1>`
    : '';

  const previewSpan = payload.previewText?.trim()
    ? `<span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${escapeHtml(payload.previewText.trim())}</span>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(payload.subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0fdfa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  ${previewSpan}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0fdfa; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 118, 110, 0.08); border: 1px solid #ccfbf1;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #115e59; padding: 22px 28px; text-align: left;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <a href="${siteUrl}" style="text-decoration: none; display: block;">
                      <img src="${siteUrl}/BFH-logo.svg" alt="Baby First Health" width="38" height="38" style="display: block; width: 38px; height: 38px; border-radius: 8px;" />
                    </a>
                  </td>
                  <td style="vertical-align: middle;">
                    <a href="${siteUrl}" style="text-decoration: none; display: block;">
                      <span style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; display: block;">Baby First Health</span>
                      <span style="color: #ccfbf1; font-size: 12px; font-weight: 300; letter-spacing: 0.3px; display: block; margin-top: 2px;">Every Baby Comes First</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              ${headlineHtml}
              ${imageHtml}
              ${formattedBody}
              ${buttonHtml}
            </td>
          </tr>

          <!-- Warm Signoff -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <table role="presentation" width="100%" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f766e;">Nurse Kelly & The Baby First Health Team</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Supporting African parents from newborn care to age five.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.6;">
              <!-- Social Links -->
              <p style="margin: 0 0 10px 0;">
                <a href="https://www.tiktok.com/@babyfirsthealth" style="color: #38bdf8; text-decoration: none; margin: 0 8px; font-weight: 500;">TikTok</a> • 
                <a href="https://www.facebook.com/share/1VG7i45YqA/" style="color: #38bdf8; text-decoration: none; margin: 0 8px; font-weight: 500;">Facebook</a> • 
                <a href="${siteUrl}/blog" style="color: #38bdf8; text-decoration: none; margin: 0 8px; font-weight: 500;">Health Blog</a>
              </p>

              <!-- Warm Brand Prompt -->
              <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 12px; font-weight: 400;">
                Empowering parents with practical knowledge for healthy, happy children.
              </p>

              <!-- Terms, Policy & Unsubscribe -->
              <p style="margin: 0; color: #475569; font-size: 11px;">
                <a href="${siteUrl}/terms" style="color: #64748b; text-decoration: underline; margin-right: 8px;">Terms &amp; Policies</a> • 
                <a href="${siteUrl}/privacy" style="color: #64748b; text-decoration: underline; margin-right: 8px;">Privacy</a> • 
                <a href="${siteUrl}/unsubscribe?email=${encodeURIComponent(recipientEmail)}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
              </p>
              <p style="margin: 8px 0 0 0; color: #334155; font-size: 10px;">
                © ${currentYear} Baby First Health. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Subscribe email from public site (footer, blog, etc.)
export async function subscribeEmail(email: string, source: string = 'website'): Promise<{ success: boolean; message: string }> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, message: 'Invalid email address' };
  }

  const id = cleanEmail.replace(/[^a-z0-9]/g, '_');
  const subscriber: Subscriber = {
    id,
    email: cleanEmail,
    createdAt: new Date().toISOString(),
    source,
    status: 'ACTIVE'
  };

  // Cache locally
  try {
    const cached = getCachedSubscribers();
    const existingIndex = cached.findIndex(s => s.email === cleanEmail);
    if (existingIndex >= 0) {
      cached[existingIndex].status = 'ACTIVE';
    } else {
      cached.unshift(subscriber);
    }
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // ignore local storage error
  }

  // Persist to Firestore
  try {
    const docRef = doc(db, 'subscribers', id);
    await setDoc(docRef, subscriber, { merge: true });
  } catch (err) {
    console.warn('Firestore subscription fallback:', err);
  }

  return { success: true, message: 'Subscribed successfully' };
}

// Fetch all subscribers
export async function getAllSubscribers(): Promise<Subscriber[]> {
  const cached = getCachedSubscribers();

  try {
    const q = query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: Subscriber[] = [];
    snapshot.forEach(docSnap => {
      list.push(docSnap.data() as Subscriber);
    });

    if (list.length > 0) {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Firestore subscribers fetch fallback:', err);
  }

  return cached;
}

// Delete / remove subscriber
export async function deleteSubscriber(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'subscribers', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore subscriber delete error:', err);
  }

  const cached = getCachedSubscribers().filter(s => s.id !== id);
  localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(cached));
  return true;
}

// Send Broadcast or Test Email
export async function sendBroadcastEmail(
  payload: BroadcastPayload,
  recipients: string[],
  isTest: boolean = false
): Promise<{ success: boolean; sentCount: number; error?: string }> {
  try {
    const response = await fetch('/.netlify/functions/send-broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload,
        recipients,
        isTest
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to send broadcast');
    }

    // Save record
    saveBroadcastRecord({
      id: `bc_${Date.now()}`,
      subject: payload.subject,
      recipientCount: recipients.length,
      sentAt: new Date().toISOString(),
      status: isTest ? 'TEST' : 'SENT',
      testRecipient: isTest ? recipients[0] : undefined
    });

    return { success: true, sentCount: recipients.length };
  } catch (err: any) {
    console.error('Send broadcast error:', err);

    saveBroadcastRecord({
      id: `bc_${Date.now()}`,
      subject: payload.subject,
      recipientCount: recipients.length,
      sentAt: new Date().toISOString(),
      status: 'FAILED',
      error: err.message || 'Unknown error'
    });

    return { success: false, sentCount: 0, error: err.message || 'Error sending broadcast' };
  }
}

export function getCachedSubscribers(): Subscriber[] {
  try {
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [
    {
      id: 'wepnyu2025_gmail_com',
      email: 'wepnyu2025@gmail.com',
      createdAt: new Date().toISOString(),
      source: 'admin-lead',
      status: 'ACTIVE'
    }
  ];
}

export function getBroadcastHistory(): BroadcastRecord[] {
  try {
    const raw = localStorage.getItem(BROADCASTS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

function saveBroadcastRecord(record: BroadcastRecord) {
  try {
    const history = getBroadcastHistory();
    history.unshift(record);
    localStorage.setItem(BROADCASTS_STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
  } catch {
    // ignore
  }
}
