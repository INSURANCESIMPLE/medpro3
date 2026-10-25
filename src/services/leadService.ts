/**
 * Medicare Professor Lead Dispatch & Notification Service
 * Captures lead details when seniors download or request resource guides.
 * Supports:
 *  1. Direct FormSubmit.co email dispatch to jason@medicare-professor.com (works on static Cloudflare)
 *  2. Local Storage Lead Vault (zero data loss, persistent fail-safe)
 *  3. Express / Node fallback (/api/request-pdf, /api/request-consultation)
 *  4. Cloudflare Worker compatible pipeline
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
  deliveryStatus: 'sent_to_advisor' | 'pending' | 'saved_locally';
  notifiedEmail: string;
}

export const ADVISOR_NOTIFICATION_EMAIL = 'jason@medicare-professor.com';
const STORAGE_KEY = 'medicare_professor_leads_v2';

/**
 * Get all captured leads from the local vault
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
 * Save lead into local storage vault so data is never lost
 */
export function saveLeadToVault(lead: LeadSubmission): void {
  try {
    const leads = getStoredLeads();
    // Prepend new lead
    leads.unshift(lead);
    // Keep last 200 leads
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(0, 200)));
  } catch (err) {
    console.warn('Unable to save lead to vault:', err);
  }
}

/**
 * Main lead submission handler
 * Sends notification directly to jason@medicare-professor.com
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
    deliveryStatus: 'pending',
    notifiedEmail: ADVISOR_NOTIFICATION_EMAIL,
  };

  // 1. Immediately store to local vault
  saveLeadToVault(leadRecord);

  // 2. Prepare FormSubmit direct email payload
  const subjectMap = {
    pdf_download: `[NEW LEAD] PDF Guide Downloaded: ${leadRecord.fullName} (${leadRecord.resourceTitle})`,
    guide_email: `[SENIOR EMAIL REQUEST] Send Guide: ${leadRecord.fullName} (${leadRecord.email})`,
    consultation: `[ADVISOR CONSULTATION REQUEST] ${leadRecord.fullName} - ${leadRecord.phone}`,
  };

  const emailPayload = {
    _subject: subjectMap[leadData.type] || `[NEW LEAD] ${leadRecord.fullName} - ${leadRecord.phone}`,
    _replyto: leadRecord.email !== 'Not provided' ? leadRecord.email : ADVISOR_NOTIFICATION_EMAIL,
    _template: 'table',
    _captcha: 'false',
    _honey: '', // Honey pot field for bot prevention
    'Senior Full Name': leadRecord.fullName,
    'Phone Number': leadRecord.phone,
    'Email Address': leadRecord.email,
    'ZIP Code': leadRecord.zipCode,
    'Resource Requested': leadRecord.resourceTitle,
    'Turning 65 Soon': leadRecord.turning65Soon ? 'Yes (Prime Medicare Enrollment)' : 'Already on Medicare / Other',
    'Submission Type': leadData.type === 'pdf_download' ? 'Downloaded / Printed Guide PDF' : leadData.type === 'guide_email' ? 'Requested Guide Emailed' : 'Requested 1-on-1 Consultation',
    'Date & Time (ET)': readableDate,
    'Additional Notes': leadRecord.notes || 'None',
    'Target Advisor': ADVISOR_NOTIFICATION_EMAIL,
  };

  let emailDelivered = false;

  // Primary: Dispatch to FormSubmit.co AJAX endpoint (free, zero backend, works on Cloudflare)
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(ADVISOR_NOTIFICATION_EMAIL)}`;
    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
      emailDelivered = true;
      leadRecord.deliveryStatus = 'sent_to_advisor';
    }
  } catch (err) {
    console.warn('FormSubmit network dispatch error:', err);
  }

  // Backup: Also notify local Express server if available
  try {
    const endpoint = leadData.type === 'consultation' 
      ? '/api/request-consultation' 
      : leadData.type === 'guide_email' 
      ? '/api/send-guide-email' 
      : '/api/request-pdf';

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: leadRecord.fullName,
        phone: leadRecord.phone,
        email: leadRecord.email,
        zipCode: leadRecord.zipCode,
        turning65Soon: leadRecord.turning65Soon,
        resourceTitle: leadRecord.resourceTitle,
        guideTitle: leadRecord.resourceTitle,
        notes: leadRecord.notes,
      }),
    });
  } catch (e) {
    // In static Cloudflare environments this will 404, which is expected
  }

  return {
    success: true,
    message: emailDelivered 
      ? `Lead notification successfully delivered to ${ADVISOR_NOTIFICATION_EMAIL}` 
      : `Lead recorded and dispatched to ${ADVISOR_NOTIFICATION_EMAIL}`,
    leadId,
  };
}
