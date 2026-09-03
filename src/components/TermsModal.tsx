import React from 'react';
import { FileText } from 'lucide-react';

const termsSections = [
  {
    title: 'Agreement to Terms',
    body: 'These Terms of Service ("Terms") govern your use of www.medicare-professor.com (the "Site"), operated by Medicare Professor an insurance made simple company ("we," "us," or "our"), including our SMS/text messaging program. By using the Site, submitting a form, or opting in to receive text messages from us, you agree to these Terms. If you do not agree, please do not use the Site or opt in to our messaging program.',
  },
  {
    title: 'Use of the Site',
    body: 'You agree to use the Site only for lawful purposes and to provide accurate information when submitting any form. You may not use the Site to submit false or misleading contact information, attempt to disrupt, damage, or gain unauthorized access to the Site, or use automated tools (bots, scrapers) to interact with the Site without our permission.',
  },
  {
    title: 'SMS / Text Messaging Terms',
    body: `This section describes the text messaging program offered through the Site (the "Program") and applies to anyone who opts in to receive text messages from us.
Description: By opting in, you agree to receive SMS text messages from Medicare Professor related to your inquiry, such as: confirmations of a quote request or appointment, follow-up on questions you submitted, and reminders and requested plan or coverage information.
How to opt in: You opt in by checking the consent box on a Site form and submitting your phone number, or by another method that clearly indicates your consent.
Message frequency: Message frequency varies depending on your interaction with us and the information you request.
Cost: Message and data rates may apply, depending on your mobile carrier and plan.
How to opt out: You can opt out of the Program at any time by replying STOP to any message you receive from us. After you send STOP, we will send a confirmation message and you will not receive further texts from us unless you opt in again.
How to get help: Reply HELP to any message, or contact us at support@medicare-professor.com, for assistance.
Supported carriers are not liable for delayed or undelivered messages.
No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties for any purpose. See our Privacy Policy for full details on how your information is used and protected.
Consenting to receive text messages is not a condition of purchasing any product or service.`,
  },
  {
    title: 'No Insurance or Medicare Advice',
    body: 'Content on the Site is for general informational purposes only and does not constitute insurance, medical, financial, or legal advice, and is not a guarantee of coverage, eligibility, or plan availability. Plan availability and details vary by location and change over time; please confirm details with a licensed agent or the relevant plan provider before making a decision.',
  },
  {
    title: 'Third-Party Links',
    body: 'The Site may link to third-party websites we do not control. We are not responsible for the content, accuracy, or privacy practices of any third-party site.',
  },
  {
    title: 'Disclaimer of Warranties',
    body: 'The Site and its content are provided "as is" and "as available," without warranties of any kind, express or implied, including accuracy, completeness, or fitness for a particular purpose.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the fullest extent permitted by law, Medicare Professor shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site or the Program.',
  },
  {
    title: 'Changes to These Terms',
    body: 'We may update these Terms from time to time. Continued use of the Site or the Program after changes are posted constitutes acceptance of the revised Terms.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms are governed by the laws of the state in which Medicare Professor operates, without regard to conflict-of-law principles.',
  },
  {
    title: 'Contact Us',
    body: `Questions about these Terms or the text messaging Program can be sent to Medicare Professor an insurance made simple company.
Email: support@medicare-professor.com
Website: www.medicare-professor.com`,
  },
];

export const TermsModal: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in duration-200" aria-labelledby="terms-of-service-title">
      <div
        className="w-full rounded-2xl sm:rounded-3xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl relative"
      >
        <div className="sticky top-0 z-10 rounded-t-2xl sm:rounded-t-3xl border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
              <FileText className="w-3 h-3" />
              Site Terms
            </span>
          </div>

          <h2 id="terms-of-service-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Terms of Service
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            These terms govern your use of the Medicare Professor website, tools, educational content, and consultation request features.
          </p>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="rounded-2xl border border-indigo-900/60 bg-indigo-950/30 p-4 text-sm leading-relaxed text-indigo-50">
            By accessing or using this website, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.
          </div>

          {termsSections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-base font-extrabold text-white">{section.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-300">{section.body}</p>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-base font-extrabold text-white">Updates to These Terms</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              We may update these terms from time to time to reflect service changes, legal obligations, or website improvements. Continued use of the site after updates are posted constitutes acceptance of the revised terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
