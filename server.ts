import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory store for lead submissions to jason@medicare-professor.com
  const leadSubmissions: Array<{
    id: string;
    type: 'pdf_download' | 'consultation';
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
  }> = [];

  // API endpoint for PDF guide requests
  app.post('/api/request-pdf', (req, res) => {
    try {
      const { fullName, phone, email, zipCode, turning65Soon, resourceTitle } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ error: 'Full name and phone number are required.' });
      }

      const submission = {
        id: `pdf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: 'pdf_download' as const,
        recipient: 'jason@medicare-professor.com',
        data: {
          fullName: String(fullName).trim(),
          phone: String(phone).trim(),
          email: email ? String(email).trim() : 'Not provided',
          zipCode: zipCode ? String(zipCode).trim() : 'Not provided',
          turning65Soon: Boolean(turning65Soon),
          resourceTitle: resourceTitle ? String(resourceTitle).trim() : '2027 Medicare Comprehensive Guide',
        },
        timestamp: new Date().toISOString(),
      };

      leadSubmissions.unshift(submission);

      console.log('====================================================');
      console.log(`[NEW PDF REQUEST SENT TO jason@medicare-professor.com]`);
      console.log(`Resource: ${submission.data.resourceTitle}`);
      console.log(`Senior Name: ${submission.data.fullName}`);
      console.log(`Phone: ${submission.data.phone}`);
      console.log(`Email: ${submission.data.email}`);
      console.log(`ZIP: ${submission.data.zipCode}`);
      console.log(`Turning 65 Soon: ${submission.data.turning65Soon ? 'Yes' : 'No'}`);
      console.log(`Dispatched to: ${submission.recipient}`);
      console.log('====================================================');

      return res.status(200).json({
        success: true,
        message: 'PDF request received and dispatched to jason@medicare-professor.com',
        recipient: 'jason@medicare-professor.com',
        submissionId: submission.id,
        timestamp: submission.timestamp,
        lead: submission.data,
      });
    } catch (err: unknown) {
      console.error('Error processing PDF request:', err);
      return res.status(500).json({ error: 'Failed to process PDF request' });
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
