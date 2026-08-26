import React from 'react';
import { ShieldCheck } from 'lucide-react';

const privacySections = [
  {
    title: 'Information We Collect',
    body: 'We may collect personal details you choose to share with Medicare Professor, including your name, phone number, email address, ZIP code, and any Medicare-related questions submitted through our forms or consultation requests.',
  },
  {
    title: 'How We Use Information',
    body: 'Your information is used to respond to questions, provide Medicare plan guidance, schedule consultations, and improve our educational tools and website experience. We do not sell your personal information.',
  },
  {
    title: 'Sharing & Third Parties',
    body: 'We may share information with licensed insurance professionals, service providers, or trusted partners only as needed to deliver requested services, comply with legal obligations, or support site operations.',
  },
  {
    title: 'Cookies & Analytics',
    body: 'Like most websites, we may use cookies or analytics tools to understand site usage, improve performance, and enhance usability. You can manage cookie preferences through your browser settings.',
  },
  {
    title: 'Data Protection',
    body: 'We use reasonable administrative, technical, and organizational safeguards to protect the information you submit. While no online system is guaranteed to be fully secure, we work to limit unauthorized access and misuse.',
  },
  {
    title: 'Your Choices',
    body: 'You may request updates, corrections, or removal of information you have submitted by contacting us directly. You can also choose not to provide optional information, though some services may be limited as a result.',
  },
  {
    title: 'Mobile Data We Collect', 
    body: 1.When you access our Website using a mobile device, we may automatically collect certain information, including:Device Information: Your mobile device model, operating system, unique device identifiers (such as advertising IDs), and mobile network information.
    Location Data: Approximate location derived from your IP address or, with your explicit consent, precise real-time geolocation data through your device settings. 
    Usage Data: Information about how you interact with our Website, including page views, timestamps, and app/browser diagnostic data.
    2. How We Use and Share Mobile Data: We use the mobile data we collect to optimize our Website interface, troubleshoot technical issues, and improve our services. We do not sell, rent, or share your mobile data or mobile phone numbers with third parties for marketing or promotional purposes.
    Your mobile data will only be shared under the following strict circumstances: Service Providers: With trusted vendors who assist us in operating our Website and delivering services, under strict confidentiality agreements.Legal Compliance: When required by law, subpoena, or legal process to protect our rights or the safety of our users.
    3. Your Mobile Privacy ChoicesYou have control over the mobile data you share with us. You can manage your privacy through the following methods:Location Services: You can disable precise location tracking at any time by adjusting the permissions in your mobile device settings.Do Not Track: You can set your mobile browser to opt-out of behavioral tracking mechanisms.
    Opt-Out of Communications: If you have provided your mobile number for updates, you can opt-out at any time by replying "STOP" to any mobile message you receive. "Message frequency is periodic, not to exceed 10 messages per calendar month.""message and data rates may apply"
  },
];

export const PrivacyModal: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in duration-200" aria-labelledby="privacy-policy-title">
      <div
        className="w-full rounded-2xl sm:rounded-3xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl relative"
      >
        <div className="sticky top-0 z-10 rounded-t-2xl sm:rounded-t-3xl border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
              <ShieldCheck className="w-3 h-3" />
              Privacy & Data Use
            </span>
          </div>

          <h2 id="privacy-policy-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
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
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h3 className="text-base font-extrabold text-white">Contact Us</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              If you have questions about this Privacy Policy or how your information is handled, please contact Medicare Professor before submitting sensitive personal details through the site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
