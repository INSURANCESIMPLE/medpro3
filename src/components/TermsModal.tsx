import React from 'react';
import { FileText, X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const termsSections = [
  {
    title: 'Educational Use Only',
    body: 'Content on Medicare Professor is provided for general informational and educational purposes. It does not replace personalized advice from a licensed insurance professional, legal advisor, or government representative.',
  },
  {
    title: 'No Government Affiliation',
    body: 'Medicare Professor is a private Medicare information resource and is not affiliated with, endorsed by, or acting on behalf of the U.S. government, CMS, or the federal Medicare program.',
  },
  {
    title: 'Plan Availability & Accuracy',
    body: 'Plan details, pricing, availability, and benefits may vary by carrier, location, and eligibility. While we aim to keep information current, you should confirm final plan details directly with Medicare, carriers, or a licensed agent.',
  },
  {
    title: 'User Responsibilities',
    body: 'By using this site, you agree to provide accurate information when requesting assistance and to use the website only for lawful purposes. You agree not to misuse forms, interfere with site operations, or attempt unauthorized access.',
  },
  {
    title: 'Third-Party Links',
    body: 'This website may link to outside resources or partner sites for scheduling, educational materials, or related insurance products. We are not responsible for the content, availability, or privacy practices of those third-party services.',
  },
  {
    title: 'Limitation of Liability',
    body: 'Medicare Professor and its partners are not liable for losses or damages arising from reliance on website content, temporary site interruptions, or decisions made using general information presented on this site.',
  },
];

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-of-service-title"
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-700 bg-slate-950 text-slate-200 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 rounded-t-2xl sm:rounded-t-3xl border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close terms of service"
          >
            <X className="w-5 h-5" />
          </button>

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
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
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
