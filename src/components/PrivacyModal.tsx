import React from 'react';
import { ShieldCheck } from 'lucide-react';

type PrivacySection = {
  title: string;
  body: string;
};

const privacySections: PrivacySection[] = [
  {
    title: 'Overview',
    body: 'Medicare Professor, an insurance made simple company ("we," "us," or "our") operates www.medicare-professor.com (the "Site"), including any text messaging (SMS) program offered through the Site. This Privacy Policy explains what information we collect, how we use it, and — most importantly — how we protect it. The short version: information you opt in to give us, including consent to receive calls or text messages, is used only for the purpose you gave it for, and we do not sell or share it with third parties for their own marketing purposes.',
  },
  {
    title: 'Information We Collect',
    body: `We collect information only when you choose to provide it, such as by filling out a form, requesting a quote, or contacting us. This may include:
• Contact details: name, email address, phone number, and mailing address.
• Information relevant to insurance or Medicare plan questions you ask us, such as your age, ZIP code, or current coverage.
• Any message or details you voluntarily submit through a contact or quote request form.
We also automatically collect limited technical data (such as browser type, device type, and pages visited) through standard website analytics and cookies, described in Section 6.`,
  },
  {
    title: 'Opt-In Consent',
    body: `Certain information — such as your contact details, and your consent to be contacted by phone, text message, or email — is collected only when you affirmatively opt in (for example, by checking a consent box and submitting a form). By opting in, you are agreeing to let us or a licensed representative contact you about the specific product or service you inquired about.
You may withdraw this consent at any time by contacting us using the information in Section 9, by replying "STOP" to any text message, or by using the unsubscribe link in any email.`,
  },
  {
    title: 'We Do Not Share Your Opt-In Data With Third Parties',
    body: `This is the core of our privacy commitment: information you provide through an opt-in form on this Site is not sold, rented, or shared with third parties for their own marketing or advertising purposes. Your information is used solely by us (and, where applicable, a licensed insurance agent working on our behalf) to respond to your request.
The limited exceptions to this are:
• Service providers who help us operate the Site or fulfill your request (such as email delivery, hosting, or SMS/text messaging delivery providers), who are contractually required to keep your information confidential and use it only to perform that service.
• Disclosures required by law, such as in response to a valid subpoena, court order, or government request.
• Protecting our rights, safety, or property, or that of our users, in cases of fraud or misuse of the Site.
No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties for any purpose.`,
  },
  {
    title: 'Text Messaging (SMS) Program',
    body: `If you opt in to receive text messages from Medicare Professor, you consent to receive SMS messages related to your inquiry, such as quote follow-ups, appointment reminders, and requested plan information. Consent to receive text messages is never a condition of purchasing any product or service.
• Message frequency varies based on your interaction with us.
• Message and data rates may apply.
• Reply STOP at any time to opt out of text messages.
• Reply HELP for assistance, or contact us using the information in Section 9.
Text messaging opt-in data and consent are not shared with any third parties for any purpose, including marketing.`,
  },
  {
    title: 'How We Use Your Information',
    body: `We use the information you provide to:
• Respond to your inquiry or quote request.
• Provide information about insurance or Medicare plans you asked about.
• Improve and maintain the Site.
• Comply with applicable laws and regulations, including those governing insurance marketing and communications.`,
  },
  {
    title: 'Cookies and Analytics',
    body: 'We may use cookies or similar technologies to understand how visitors use the Site and to improve its performance. These tools collect general, non-identifying usage data. You can disable cookies in your browser settings; doing so may affect some Site features.',
  },
  {
    title: 'Data Security',
    body: 'We use reasonable administrative and technical safeguards to protect the information you provide. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
  },
  {
    title: 'Your Choices and Rights',
    body: `You may:
• Ask what information we have collected about you.
• Ask us to correct or delete your information.
• Withdraw your consent to be contacted, at any time — including opting out of text messages by replying STOP.
To exercise any of these choices, contact us using the information below.`,
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.',
  },
];

export const PrivacyModal: React.FC = () => {
  return (
    <div
      className="w-full max-w-3xl mx-auto animate-in fade-in duration-200"
      aria-labelledby="privacy-policy-title"
    >
      <div className="relative w-full rounded-2xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 rounded-t-2xl border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 sm:rounded-t-3xl sm:p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
              <ShieldCheck className="h-3 w-3" />
              Privacy & Data Use
            </span>
          </div>

          <h2 id="privacy-policy-title" className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Privacy Policy
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Medicare Professor is committed to protecting your privacy and being clear about how information is used when you visit our website or request Medicare guidance.
          </p>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="rounded-2xl border border-blue-900/60 bg-blue-950/30 p-4 text-sm leading-relaxed text-blue-50">
            By using this website, you consent to the practices described below. This policy applies to information collected through Medicare Professor and related consultation requests.
          </div>

          {privacySections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-base font-extrabold text-white">{section.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-300">{section.body}</p>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-base font-extrabold text-white">Contact Us</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-300">
              {`If you have questions about this Privacy Policy or how your information is handled, contact us at:
Medicare Professor
Email: jason@flainsurancesolutions.com
Website: www.medicare-professor.com`}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
