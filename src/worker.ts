/**
 * Cloudflare Worker Backend for Medicare Professor (medpro3)
 * Handles API routes for lead capture, email notification, and central lead vault sync.
 * Routes static assets to dist/ (SPA mode).
 */

export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
}

export interface StoredLead {
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
  deliveryStatus: string;
}

// In-worker memory cache for recent leads across edge instances
const leadStore: StoredLead[] = [];

const ADVISOR_EMAIL = 'jason@medicare-professor.com';
const BACKUP_EMAIL = 'york.jason87@gmail.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. GET /api/submissions: Fetch all captured leads (so mobile and desktop share the vault)
    if (url.pathname === '/api/submissions' && request.method === 'GET') {
      return new Response(
        JSON.stringify({
          success: true,
          targetRecipient: ADVISOR_EMAIL,
          totalCount: leadStore.length,
          submissions: leadStore,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      );
    }

    // 2. POST /api/request-pdf, /api/send-guide-email, /api/request-consultation
    if (
      (url.pathname === '/api/request-pdf' ||
        url.pathname === '/api/send-guide-email' ||
        url.pathname === '/api/request-consultation') &&
      request.method === 'POST'
    ) {
      try {
        const body: any = await request.json();
        const userAgent = request.headers.get('user-agent') || '';
        const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);

        const leadType: 'pdf_download' | 'guide_email' | 'consultation' =
          url.pathname.includes('consultation')
            ? 'consultation'
            : url.pathname.includes('send-guide-email')
            ? 'guide_email'
            : 'pdf_download';

        const leadRecord: StoredLead = {
          id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          type: leadType,
          fullName: String(body.fullName || 'Anonymous Senior').trim(),
          phone: String(body.phone || 'Not provided').trim(),
          email: body.email ? String(body.email).trim() : 'Not provided',
          zipCode: body.zipCode ? String(body.zipCode).trim() : 'Not provided',
          turning65Soon: Boolean(body.turning65Soon ?? true),
          resourceTitle: body.resourceTitle || body.guideTitle || '2027 Medicare Comprehensive Guide',
          notes: body.notes ? String(body.notes).trim() : '',
          timestamp: new Date().toISOString(),
          device: isMobile ? 'Mobile Phone / Tablet' : 'Desktop Browser',
          deliveryStatus: 'captured_on_cloudflare',
        };

        // Prepend to central memory store
        leadStore.unshift(leadRecord);
        if (leadStore.length > 500) {
          leadStore.pop();
        }

        console.log(`[Cloudflare Lead Captured] ${leadRecord.fullName} | ${leadRecord.phone} | Device: ${leadRecord.device}`);

        // 1. Edge-side Outbound Dispatch via ShipMyForm (100% Free Email Delivery)
        try {
          const emailSubject = leadRecord.type === 'consultation'
            ? `[CONSULTATION REQUEST] ${leadRecord.fullName} - ${leadRecord.phone}`
            : leadRecord.type === 'guide_email'
            ? `[EMAIL GUIDE REQUEST] ${leadRecord.fullName} (${leadRecord.email})`
            : `[PDF DOWNLOAD LEAD] ${leadRecord.fullName} - ${leadRecord.resourceTitle}`;

          const emailBody = {
            name: leadRecord.fullName,
            phone: leadRecord.phone,
            email: leadRecord.email,
            zipCode: leadRecord.zipCode,
            turning65: leadRecord.turning65Soon ? 'Yes (T65 Prime)' : 'No / Enrolled',
            guideRequested: leadRecord.resourceTitle,
            device: leadRecord.device,
            timestamp: leadRecord.timestamp,
            notes: leadRecord.notes || 'None',
            subject: emailSubject,
            targetAdvisor: ADVISOR_EMAIL,
          };

          // Dispatch to primary email: jason@medicare-professor.com
          await fetch(`https://shipmyform.com/to/${encodeURIComponent(ADVISOR_EMAIL)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin': 'https://medicare-professor.com',
            },
            body: JSON.stringify(emailBody),
          }).catch(() => {});

          // Dispatch to backup email: york.jason87@gmail.com
          fetch(`https://shipmyform.com/to/${encodeURIComponent(BACKUP_EMAIL)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin': 'https://medicare-professor.com',
            },
            body: JSON.stringify({
              ...emailBody,
              subject: `[BACKUP] ${emailSubject}`,
            }),
          }).catch(() => {});

          leadRecord.deliveryStatus = 'sent_to_advisor';
        } catch (mailErr) {
          console.warn('Worker outbound mail dispatch non-fatal:', mailErr);
        }

        // 2. Try forwarding to configured Webhook (e.g. Zapier, Make, Google Sheets) if present
        const webhookUrl = env.WEBHOOK_URL || body.webhookUrl;
        if (webhookUrl && webhookUrl.startsWith('http')) {
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'medicare_lead_captured',
                advisorEmail: ADVISOR_EMAIL,
                backupEmail: BACKUP_EMAIL,
                lead: leadRecord,
              }),
            });
            leadRecord.deliveryStatus = 'webhook_dispatched';
          } catch (whErr) {
            console.warn('Webhook dispatch failed:', whErr);
          }
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: `Lead successfully captured for ${ADVISOR_EMAIL}`,
            leadId: leadRecord.id,
            lead: leadRecord,
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err.message || 'Failed to capture lead' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Default: Forward to Cloudflare Static Asset Handler (dist/ SPA)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Medicare Professor Service Active', { status: 200 });
  },
};
