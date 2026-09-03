import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const NOTIFICATION_EMAIL = 'jason@insurancesimplified.info';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { fullName, phone, email, zipCode, turning65Soon, notes } = req.body as {
    fullName: string;
    phone: string;
    email: string;
    zipCode: string;
    turning65Soon: boolean;
    notes?: string;
  };

  if (!fullName || !phone || !zipCode) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const html = `
    <h2>New Medicare Advisor Request</h2>
    <table style="border-collapse:collapse;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Name</td><td>${fullName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Phone</td><td>${phone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Email</td><td>${email || '(not provided)'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">ZIP Code</td><td>${zipCode}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Turning 65 Soon / On Medicare</td><td>${turning65Soon ? 'Yes' : 'No'}</td></tr>
      ${notes ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">Notes</td><td>${notes}</td></tr>` : ''}
    </table>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: NOTIFICATION_EMAIL,
      subject: `Medicare Advisor Request — ${fullName}`,
      html,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to send advisor email:', err);
    res.status(500).json({ error: 'Failed to send notification. Please try again.' });
  }
});

// Serve static Vite build in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
