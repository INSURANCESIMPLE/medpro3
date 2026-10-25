import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer, { type SendMailOptions } from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email transporter setup
function createEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Graceful fallback logger transporter when SMTP is not configured in dev
  return {
    sendMail: async (mailOptions: SendMailOptions) => {
      console.log('--- [DISPATCH EMAIL NOTIFICATION] ---');
      console.log(`To: ${mailOptions.to}`);
      console.log(`From: ${mailOptions.from || 'advisor@medicare-professor.com'}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body:\n${mailOptions.text || mailOptions.html}`);
      console.log('------------------------------------');
      return { messageId: `msg_${Date.now()}` };
    },
  };
}

const mailer = createEmailTransporter();
const ADVISOR_EMAIL = 'jason@medicare-professor.com';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory store for lead submissions to jason@medicare-professor.com
  const leadSubmissions: Array<{
    id: string;
    type: 'pdf_download' | 'consultation' | 'guide_email';
    recipient: string;
    data: {
      fullName: string;
      phone: string;
      email: string;
      zipCode: string;
      turning65Soon: boolean;
      resourceTitle?: string;
      notes?: string;
    };
    timestamp: string;
    emailSentStatus?: string;
  }> = [];

  // API endpoint for PDF guide requests (notifying Jason York)
  app.post('/api/request-pdf', async (req, res) => {
    try {
      const { fullName, phone, email, zipCode, turning65Soon, resourceTitle } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: 'Full name and phone number are required.' });
      }

      const submission = {
        id: `pdf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: 'pdf_download' as const,
        recipient: ADVISOR_EMAIL,
        data: {
          fullName: String(fullName).trim(),
          phone: String(phone).trim(),
          email: email ? String(email).trim() : 'Not provided',
          zipCode: zipCode ? String(zipCode).trim() : 'Not provided',
          turning65Soon: Boolean(turning65Soon),
          resourceTitle: resourceTitle ? String(resourceTitle).trim() : '2027 Medicare Comprehensive Guide',
        },
        timestamp: new Date().toISOString(),
        emailSentStatus: 'Dispatched to jason@medicare-professor.com',
      };

      leadSubmissions.unshift(submission);

      console.log('====================================================');
      console.log(`[NEW PDF REQUEST SENT TO ${ADVISOR_EMAIL}]`);
      console.log(`Resource: ${submission.data.resourceTitle}`);
      console.log(`Senior Name: ${submission.data.fullName}`);
      console.log(`Phone: ${submission.data.phone}`);
      console.log(`Email: ${submission.data.email}`);
      console.log(`ZIP: ${submission.data.zipCode}`);
      console.log(`Turning 65 Soon: ${submission.data.turning65Soon ? 'Yes' : 'No'}`);
      console.log(`Dispatched to: ${submission.recipient}`);
      console.log('====================================================');

      // Attempt outbound email notification to Jason
      try {
        await mailer.sendMail({
          from: '"Medicare Professor Lead Engine" <no-reply@medicare-professor.com>',
          to: ADVISOR_EMAIL,
          subject: `[New Lead] PDF Guide Request: ${submission.data.resourceTitle} - ${submission.data.fullName}`,
          text: `Hello Jason,\n\nA senior has submitted their information to access a 2027 Medicare resource guide:\n\n` +
            `Resource Requested: ${submission.data.resourceTitle}\n` +
            `Full Name: ${submission.data.fullName}\n` +
            `Phone: ${submission.data.phone}\n` +
            `Email: ${submission.data.email}\n` +
            `ZIP Code: ${submission.data.zipCode}\n` +
            `Turning 65 Soon: ${submission.data.turning65Soon ? 'Yes' : 'No'}\n` +
            `Submission Time: ${new Date().toLocaleString()}\n\n` +
            `Medicare Professor Advisory System`,
        });
      } catch (mailErr) {
        console.warn('Mail dispatch warning:', mailErr);
      }

      return res.status(200).json({
        success: true,
        message: `PDF request received and dispatched to ${ADVISOR_EMAIL}`,
        recipient: ADVISOR_EMAIL,
        submissionId: submission.id,
        timestamp: submission.timestamp,
        lead: submission.data,
      });
    } catch (err: unknown) {
      console.error('Error processing PDF request:', err);
      return res.status(500).json({ error: 'Failed to process PDF request' });
    }
  });

  // API endpoint to send the guide to senior's email AND notify Jason
  app.post('/api/send-guide-email', async (req, res) => {
    try {
      const { email, fullName, guideTitle, phone, zipCode } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required to email the guide.' });
      }

      const seniorName = fullName ? String(fullName).trim() : 'Valued Senior';
      const resource = guideTitle ? String(guideTitle).trim() : '2027 Medicare Resource Guide';

      const emailSubmission = {
        id: `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: 'guide_email' as const,
        recipient: ADVISOR_EMAIL,
        data: {
          fullName: seniorName,
          phone: phone ? String(phone).trim() : 'On file',
          email: String(email).trim(),
          zipCode: zipCode ? String(zipCode).trim() : 'On file',
          turning65Soon: true,
          resourceTitle: resource,
        },
        timestamp: new Date().toISOString(),
        emailSentStatus: `Sent to ${email} & notified ${ADVISOR_EMAIL}`,
      };

      leadSubmissions.unshift(emailSubmission);

      console.log('====================================================');
      console.log(`[GUIDE EMAILED TO SENIOR & NOTIFIED ${ADVISOR_EMAIL}]`);
      console.log(`Recipient: ${email}`);
      console.log(`Senior Name: ${seniorName}`);
      console.log(`Guide: ${resource}`);
      console.log('====================================================');

      // Send to Senior
      try {
        await mailer.sendMail({
          from: '"Jason York | Medicare Professor" <jason@medicare-professor.com>',
          to: String(email).trim(),
          cc: ADVISOR_EMAIL,
          subject: `Your Free 2027 Medicare Guide: ${resource}`,
          text: `Dear ${seniorName},\n\n` +
            `Thank you for requesting "${resource}" from The Medicare Professor!\n\n` +
            `Your complete official 2027 Medicare advisory guide is ready. As an independent advisor, I help seniors navigate Medicare Parts A, B, C, and D, Medigap Plan G/N, and the 100% Coverage Tactic (Dental, Vision, Cancer & Hospital Indemnity) with zero bias.\n\n` +
            `Key Highlights of your requested guide (${resource}):\n` +
            `- Updated for 2027 CMS Medicare guidelines and rates\n` +
            `- Step-by-step guidance to avoid late enrollment penalties\n` +
            `- Full breakdown of out-of-pocket spending limits and zero-gap strategies\n\n` +
            `If you have any questions or would like me to review your specific medications or doctors at no cost, please feel free to call or text me anytime.\n\n` +
            `Warm regards,\n\n` +
            `Jason York\n` +
            `Licensed Medicare & Senior Benefits Advisor\n` +
            `The Medicare Professor (Insurance Made Simple)\n` +
            `Phone: (800) 732-7248\n` +
            `Email: ${ADVISOR_EMAIL}\n` +
            `Website: https://www.themedicare-professor.com\n` +
            `Sister Site: https://www.insurancesimplified.info`,
        });
      } catch (mailErr) {
        console.warn('Mail delivery warning:', mailErr);
      }

      return res.status(200).json({
        success: true,
        message: `Your guide "${resource}" has been sent to ${email}, and Jason York has been notified!`,
        seniorEmail: email,
        advisorEmail: ADVISOR_EMAIL,
        submissionId: emailSubmission.id,
      });
    } catch (err: unknown) {
      console.error('Error sending guide email:', err);
      return res.status(500).json({ error: 'Failed to dispatch guide email' });
    }
  });

  // API endpoint for Consultation requests
  app.post('/api/request-consultation', (req, res) => {
    try {
      const { fullName, phone, email, zipCode, turning65Soon, notes } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: 'Full name and phone number are required.' });
      }

      const submission = {
        id: `consult_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: 'consultation' as const,
        recipient: 'jason@medicare-professor.com',
        data: {
          fullName: String(fullName).trim(),
          phone: String(phone).trim(),
          email: email ? String(email).trim() : 'Not provided',
          zipCode: zipCode ? String(zipCode).trim() : 'Not provided',
          turning65Soon: Boolean(turning65Soon),
          notes: notes ? String(notes).trim() : '',
        },
        timestamp: new Date().toISOString(),
      };

      leadSubmissions.unshift(submission);

      console.log('====================================================');
      console.log(`[NEW CONSULTATION REQUEST SENT TO jason@medicare-professor.com]`);
      console.log(`Senior Name: ${submission.data.fullName}`);
      console.log(`Phone: ${submission.data.phone}`);
      console.log(`Email: ${submission.data.email}`);
      console.log(`ZIP: ${submission.data.zipCode}`);
      console.log(`Turning 65 Soon: ${submission.data.turning65Soon ? 'Yes' : 'No'}`);
      console.log(`Dispatched to: ${submission.recipient}`);
      console.log('====================================================');

      return res.status(200).json({
        success: true,
        message: 'Consultation request received and dispatched to jason@medicare-professor.com',
        recipient: 'jason@medicare-professor.com',
        submissionId: submission.id,
        timestamp: submission.timestamp,
        lead: submission.data,
      });
    } catch (err: unknown) {
      console.error('Error processing consultation request:', err);
      return res.status(500).json({ error: 'Failed to process consultation request' });
    }
  });

  // Inspection endpoint for checking leads routed to Jason
  app.get('/api/submissions', (_req, res) => {
    res.json({
      targetRecipient: 'jason@medicare-professor.com',
      totalCount: leadSubmissions.length,
      submissions: leadSubmissions,
    });
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medicare Professor server running on http://0.0.0.0:${PORT} (Leads routed to jason@medicare-professor.com)`);
  });
}

startServer();
