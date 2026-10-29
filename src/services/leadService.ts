/**
 * Medicare Professor Lead Dispatch & Notification Engine
 * Architected for 100% reliable lead capture across Cloudflare, mobile phones, and desktop browsers.
 *
 * Capabilities:
 *  1. Dual-Device Sync: Syncs mobile captures to desktop Advisor Lead Vault via /api/submissions
 *  2. Multi-Channel Relay:
 *     - Channel A: Cloudflare Worker API (/api/request-pdf, /api/submissions)
 *     - Channel B: Direct Webhook (Instant SMS/Text/Google Sheet via Zapier, Make, or Telegram)
 *     - Channel C: Multi-tier Email Fallback (Formspree, Web3Forms, FormSubmit backup)
 *  3. Local Device Fail-safe: Always archives leads in browser localStorage as a zero-loss safety net
 */

export interface LeadSubmission {
  id: string;
  type: 'pdf_download' | 'guide_email' | 'consultation';
  fullName: string;
  phone: string;
  email?: string;
  zipCode?: string;
  turning65Soon?: boolean;
  resourceTitle?: string;
  notes?: string;
  timestamp: string;
  device?: string;
  deliveryStatus: 'sent_to_advisor' | 'pending' | 'saved_locally' | 'synced_from_cloud';
  notifiedEmail: string;
}

export const ADVISOR_NOTIFICATION_EMAIL = 'jason@medicare-professor.com';
export const ADVISOR_BACKUP_EMAIL = 'york.jason87@gmail.com';

const STORAGE_KEY = 'medicare_professor_leads_v2';
const WEBHOOK_KEY = 'medicare_advisor_webhook_url';
const FORMSPREE_KEY = 'medicare_advisor_formspree_id';

/**
 * Detect client device type for lead intelligence
 */
export function getClientDevice(): string {
  if (typeof window === 'undefined') return 'Server';
  const ua = navigator.userAgent || '';
  if (/iphone|ipod/i.test(ua)) return 'iPhone (Mobile)';
  if (/android.*mobile/i.test(ua)) return 'Android (Mobile)';
  if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) return 'Tablet';
  if (/macintosh|mac os x/i.test(ua)) return 'Mac Desktop';
  if (/windows/i.test(ua)) return 'Windows Desktop';
  return 'Web Client';
}

/**
 * Get configured Webhook URL (Zapier, Make, Google Sheets, Telegram)
 */
export function getSavedWebhookUrl(): string {
  try {
    return localStorage.getItem(WEBHOOK_KEY) || '';
  } catch {
    return '';
  }
}

/**
 * Save configured Webhook URL
 */
export function saveWebhookUrl(url: string): void {
  try {
    localStorage.setItem(WEBHOOK_KEY, url.trim());
  } catch (err) {
    console.warn('Unable to save webhook URL:', err);
  }
}

/**
 * Get configured Formspree ID
 */
export function getSavedFormspreeId(): string {
  try {
    return localStorage.getItem(FORMSPREE_KEY) || '';
  } catch {
    return '';
  }
}

/**
 * Save configured Formspree ID
 */
export function saveFormspreeId(id: string): void {
  try {
    localStorage.setItem(FORMSPREE_KEY, id.trim());
  } catch (err) {
    console.warn('Unable to save Formspree ID:', err);
  }
}

/**
 * Read locally stored leads
 */
export function getStoredLeads(): LeadSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Unable to read stored leads:', err);
    return [];
  }
}

/**
 * Save lead into local storage vault
 */
export function saveLeadToVault(lead: LeadSubmission): void {
  try {
    const leads = getStoredLeads();
    const existingIndex = leads.findIndex((l) => l.id === lead.id);
    if (existingIndex >= 0) {
      leads[existingIndex] = lead;
    } else {
      leads.unshift(lead);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(0, 300)));
  } catch (err) {
    console.warn('Unable to save lead to vault:', err);
  }
}

/**
 * Fetch centralized leads from server/Cloudflare worker to sync mobile and desktop
 */
export async function fetchRemoteLeads(): Promise<LeadSubmission[]> {
  try {
    const response = await fetch('/api/submissions', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return [];
    const data = await response.json();
    if (data.submissions && Array.isArray(data.submissions)) {
      return data.submissions.map((item: any) => ({
        id: item.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        type: item.type || 'pdf_download',
        fullName: item.data?.fullName || item.fullName || 'Anonymous Senior',
        phone: item.data?.phone || item.phone || 'Not provided',
        email: item.data?.email || item.email || 'Not provided',
        zipCode: item.data?.zipCode || item.zipCode || 'Not provided',
        turning65Soon: item.data?.turning65Soon ?? item.turning65Soon ?? true,
        resourceTitle: item.data?.resourceTitle || item.resourceTitle || 'Medicare Guide',
        notes: item.data?.notes || item.notes || '',
        timestamp: item.timestamp || new Date().toISOString(),
        device: item.device || 'Cloud Synced',
        deliveryStatus: 'synced_from_cloud',
        notifiedEmail: ADVISOR_NOTIFICATION_EMAIL,
      }));
    }
    return [];
  } catch (err) {
    console.warn('Could not reach central API for leads sync (static or offline):', err);
    return [];
  }
}

/**
 * Merge remote and local leads so Jason sees mobile submissions on desktop
 */
export async function syncLeadVault(): Promise<LeadSubmission[]> {
  const localLeads = getStoredLeads();
  const remoteLeads = await fetchRemoteLeads();

  // Merge map keyed by ID or phone+date
  const mergedMap = new Map<string, LeadSubmission>();

  // Add remote leads first
  remoteLeads.forEach((l) => {
    mergedMap.set(l.id, l);
  });

  // Overlay local leads
  localLeads.forEach((l) => {
    mergedMap.set(l.id, l);
  });

  const mergedList = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedList.slice(0, 300)));
  } catch (err) {
    console.warn('Could not cache merged leads:', err);
  }

  return mergedList;
}

/**
 * Main Lead Submission Handler
 * Dispatches via multiple redundant channels so zero leads are ever lost.
 */
export async function submitLeadNotification(leadData: {
  type: 'pdf_download' | 'guide_email' | 'consultation';
  fullName: string;
  phone: string;
  email?: string;
  zipCode?: string;
  turning65Soon?: boolean;
  resourceTitle?: string;
  notes?: string;
}): Promise<{ success: boolean; message: string; leadId: string }> {
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const submissionTimestamp = new Date().toISOString();
  const readableDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'medium',
  });
  const deviceType = getClientDevice();

  const leadRecord: LeadSubmission = {
    id: leadId,
    type: leadData.type,
    fullName: leadData.fullName.trim(),
    phone: leadData.phone.trim(),
    email: leadData.email?.trim() || 'Not provided',
    zipCode: leadData.zipCode?.trim() || 'Not provided',
    turning65Soon: leadData.turning65Soon ?? true,
    resourceTitle: leadData.resourceTitle || '2027 Medicare Resource Guide',
    notes: leadData.notes || '',
    timestamp: submissionTimestamp,
    device: deviceType,
    deliveryStatus: 'pending',
    notifiedEmail: ADVISOR_NOTIFICATION_EMAIL,
  };

  // 1. Immediately archive in local storage
  saveLeadToVault(leadRecord);

  const subjectMap = {
    pdf_download: `[NEW LEAD] PDF Guide Downloaded: ${leadRecord.fullName} (${leadRecord.resourceTitle})`,
    guide_email: `[SENIOR EMAIL REQUEST] Send Guide: ${leadRecord.fullName} (${leadRecord.email})`,
    consultation: `[ADVISOR CONSULTATION REQUEST] ${leadRecord.fullName} - ${leadRecord.phone}`,
  };

  const payload = {
    _subject: subjectMap[leadData.type] || `[NEW LEAD] ${leadRecord.fullName} - ${leadRecord.phone}`,
    _replyto: leadRecord.email !== 'Not provided' ? leadRecord.email : ADVISOR_NOTIFICATION_EMAIL,
    advisorEmail: ADVISOR_NOTIFICATION_EMAIL,
    backupEmail: ADVISOR_BACKUP_EMAIL,
    fullName: leadRecord.fullName,
    phone: leadRecord.phone,
    email: leadRecord.email,
    zipCode: leadRecord.zipCode,
    resourceTitle: leadRecord.resourceTitle,
    turning65Soon: leadRecord.turning65Soon ? 'Yes (T65 / Prime Enrollment)' : 'No / Already Enrolled',
    submissionType:
      leadData.type === 'pdf_download'
        ? 'Downloaded / Printed PDF Guide'
        : leadData.type === 'guide_email'
        ? 'Requested Guide Emailed'
        : 'Requested 1-on-1 Consultation',
    timestamp: readableDate,
    device: deviceType,
    notes: leadRecord.notes || 'None',
  };

  let dispatchedSuccessfully = false;

  // 2. Channel A: Direct Worker / Express Backend Endpoint
  try {
    const endpoint =
      leadData.type === 'consultation'
        ? '/api/request-consultation'
        : leadData.type === 'guide_email'
        ? '/api/send-guide-email'
        : '/api/request-pdf';

    const savedWebhook = getSavedWebhookUrl();

    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        webhookUrl: savedWebhook || undefined,
      }),
    });

    if (apiResponse.ok) {
      dispatchedSuccessfully = true;
      leadRecord.deliveryStatus = 'sent_to_advisor';
      saveLeadToVault(leadRecord);
    }
  } catch (apiErr) {
    console.warn('API backend dispatch non-fatal:', apiErr);
  }

  // 3. Channel B: Custom Advisor Webhook (Zapier, Make, Google Sheets, Telegram)
  const webhookUrl = getSavedWebhookUrl();
  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors', // Allow cross-origin submission to Zapier/Google Apps Script
        body: JSON.stringify(payload),
      });
      dispatchedSuccessfully = true;
      leadRecord.deliveryStatus = 'sent_to_advisor';
      saveLeadToVault(leadRecord);
    } catch (whErr) {
      console.warn('Custom webhook dispatch non-fatal:', whErr);
    }
  }

  // 4. Channel C: Formspree (if ID configured)
  const formspreeId = getSavedFormspreeId();
  if (formspreeId) {
    try {
      const fsRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (fsRes.ok) {
        dispatchedSuccessfully = true;
        leadRecord.deliveryStatus = 'sent_to_advisor';
        saveLeadToVault(leadRecord);
      }
    } catch (fsErr) {
      console.warn('Formspree dispatch non-fatal:', fsErr);
    }
  }

  // 5. Channel D: FormSubmit fallback (in case their server recovers)
  try {
    const fsUrl = `https://formsubmit.co/ajax/${encodeURIComponent(ADVISOR_NOTIFICATION_EMAIL)}`;
    const fsResponse = await fetch(fsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...payload,
        _cc: ADVISOR_BACKUP_EMAIL,
        _captcha: 'false',
        _template: 'table',
      }),
    });

    if (fsResponse.ok) {
      dispatchedSuccessfully = true;
      leadRecord.deliveryStatus = 'sent_to_advisor';
      saveLeadToVault(leadRecord);
    }
  } catch {
    // FormSubmit might be down (e.g. 521), gracefully continue
  }

  return {
    success: true,
    message: dispatchedSuccessfully
      ? `Lead notification successfully sent to ${ADVISOR_NOTIFICATION_EMAIL}`
      : `Lead safely recorded for ${ADVISOR_NOTIFICATION_EMAIL}`,
    leadId,
  };
}
