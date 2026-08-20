import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;
const recipientEmail = 'jason@insurancesimplified.info';

app.use(express.json());

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    throw new Error('Missing SMTP configuration.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

app.post('/api/advisor-consultation', async (req, res) => {
  const {
    fullName,
    phone,
    zipCode,
    email = '',
    turning65Soon = false,
  } = req.body ?? {};

  if (
    typeof fullName !== 'string' ||
    typeof phone !== 'string' ||
    typeof zipCode !== 'string' ||
    typeof email !== 'string' ||
    typeof turning65Soon !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid form submission.' });
  }

  if (!fullName.trim() || !phone.trim() || !zipCode.trim()) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: recipientEmail,
      replyTo: email.trim() || undefined,
      subject: `New Medicare consultation request from ${fullName.trim()}`,
      text: [
        'A website visitor requested a Medicare consultation.',
        '',
        `Name: ${fullName.trim()}`,
        `Phone: ${phone.trim()}`,
        `ZIP Code: ${zipCode.trim()}`,
        `Email: ${email.trim() || 'Not provided'}`,
        `Turning 65 soon / already on Medicare: ${turning65Soon ? 'Yes' : 'No'}`,
      ].join('\n'),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send advisor consultation email:', error);
    return res.status(500).json({ error: 'Unable to submit your request right now.' });
  }
});

const startServer = async () => {
  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');

    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        const template = await fs.readFile(templatePath, 'utf8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
