import React, { useState } from 'react';
import { FEATURED_RESOURCES, FAQ_DATA, INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';
import { MedicareResource } from '../types';
import { ResourceDownloadModal } from './ResourceDownloadModal';
import { 
  BookOpen, 
  FileText, 
  Calendar, 
  Columns, 
  HeartHandshake, 
  Download, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Share2, 
  Check,
  ShieldCheck,
  Smile,
  Eye,
  HeartPulse,
  Building2,
  Home,
  Phone
} from 'lucide-react';

interface ResourceHubProps {
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
}

const parseMarkdownText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const isTable = lines.some(l => l.startsWith('|'));

  if (isTable) {
    const tableRows = lines.filter(l => l.startsWith('|') && !l.includes('---'));
    if (tableRows.length > 0) {
      const headerCols = tableRows[0].split('|').map(c => c.trim()).filter(Boolean);
      const dataRows = tableRows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

      return (
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-900 font-bold">
                {headerCols.map((h, i) => (
                  <th key={i} className="p-2 whitespace-nowrap">{parseMarkdownText(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-slate-800">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2 font-medium">{parseMarkdownText(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div className="mt-3 p-3.5 sm:p-4 bg-slate-50/90 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
      {lines.map((line, idx) => {
        if (line.startsWith('###')) {
          return (
            <h4 key={idx} className="font-extrabold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5 pt-1 pb-0.5 border-b border-slate-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
              {line.replace(/^###\s*/, '')}
            </h4>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-2 text-slate-700 font-medium pl-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span>{parseMarkdownText(line.replace(/^- /, ''))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^(\d+)\.\s/)?.[1];
          const text = line.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2 text-slate-700 font-medium pl-0.5">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {num}
              </span>
              <span>{parseMarkdownText(text)}</span>
            </div>
          );
        }
        return (
          <p key={idx} className="font-medium text-slate-800">
            {parseMarkdownText(line)}
          </p>
        );
      })}
    </div>
  );
};

export const ResourceHub: React.FC<ResourceHubProps> = ({
  onOpenInsuranceModal,
  onOpenAdvisorModal,
}) => {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [copiedResource, setCopiedResource] = useState<string | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedDownloadResourceTitle, setSelectedDownloadResourceTitle] = useState<string | null>(null);

  const handleOpenDownloadModal = (title: string) => {
    setSelectedDownloadResourceTitle(title);
    setIsDownloadModalOpen(true);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-indigo-600" />;
      case 'Columns': return <Columns className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-red-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-500" />;
      default: return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleCopyLink = (title: string) => {
    navigator.clipboard.writeText(`https://www.themedicare-professor.com/resources?title=${encodeURIComponent(title)}`);
    setCopiedResource(title);
    setTimeout(() => setCopiedResource(null), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Mobile-Friendly Resource Header Spotlight */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Mobile-Optimized Resource Library
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            2026 Medicare Resource Center
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
            Download 1-page cheatsheets, explore Part A/B/C/D breakdowns, compare Medigap vs. Advantage options, and access enrollment guides with zero jargon.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="bg-emerald-950/40 text-emerald-200 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 font-medium">
              ✓ Updated for 2026 CMS Rates
            </span>
            <span className="bg-emerald-950/40 text-emerald-200 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 font-medium">
              ✓ Printable PDF Cheatsheets
            </span>
            <span className="bg-emerald-950/40 text-emerald-200 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 font-medium">
              ✓ Free Unbiased Guidance
            </span>
          </div>
        </div>
      </div>

      {/* Featured Strategy Spotlight Card: The Professor's 100% Coverage Tactic */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/80 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              Featured Senior Strategy
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              The Professor's 100% Coverage Tactic
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
              How bundling Original Medicare or Medigap with standalone <strong>Dental, Vision, Cancer, Hospital Indemnity, and Life w/ Home Health Care</strong> policies eliminates surprise out-of-pocket medical & caregiving bills for <strong>zero gaps in coverage</strong>.
            </p>
          </div>

          <button
            onClick={onOpenAdvisorModal}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer min-h-[42px]"
          >
            <Phone className="w-4 h-4" />
            <span>Get 100% Tactic Quote</span>
          </button>
        </div>

        {/* 5 Add-on Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-400 font-extrabold text-xs uppercase">
              <Smile className="w-4 h-4 text-blue-400" />
              1. Dental Care
            </div>
            <div className="text-xs font-black text-white">$0 Cleanings & Implants</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Covers cleanings, crowns, dentures, and implants excluded by Medicare.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-400 font-extrabold text-xs uppercase">
              <Eye className="w-4 h-4 text-indigo-400" />
              2. Vision Care
            </div>
            <div className="text-xs font-black text-white">$10 Exams & Glasses</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Pays for annual eye exams plus $150–$250 yearly frame allowances.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-400 font-extrabold text-xs uppercase">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              3. Lump-Sum Cancer
            </div>
            <div className="text-xs font-black text-white">$10k – $50k Cash Payout</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Direct tax-free cash payout upon diagnosis for non-medical expenses.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase">
              <Building2 className="w-4 h-4 text-amber-400" />
              4. Hospital Indemnity
            </div>
            <div className="text-xs font-black text-white">$250–$600 Daily Cash</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Pays daily cash straight to you to eliminate hospital stay copays.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs uppercase">
              <Home className="w-4 h-4 text-emerald-400" />
              5. Home Health Care
            </div>
            <div className="text-xs font-black text-white">In-Home Aide Cash</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Life rider pays tax-free living cash for costly private in-home caregivers.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Resource Cheatsheet & Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURED_RESOURCES.map(res => (
          <div 
            key={res.id}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/60">
                    {getIcon(res.iconName)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/80">
                    {res.category}
                  </span>
                </div>

                {res.readTime && (
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {res.readTime}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                {res.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {res.description}
              </p>

              {/* Formatted Content Box */}
              {res.content && <FormattedContent content={res.content} />}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {res.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleCopyLink(res.title)}
                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 min-h-[40px]"
              >
                {copiedResource === res.title ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Link</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleOpenDownloadModal(res.title)}
                className="px-4 py-2 text-xs font-extrabold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 min-h-[40px] shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View / Print Guide</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Insurance Simplified Sister Resource Highlight */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
            Beyond Medicare
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            Looking for Non-Medicare Insurance Guidance?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            We also cover you with Life and Retirement products at <span className="font-bold text-amber-300">www.insurancesimplified.info</span>. Access Final Expense, IULs, Life Insurance, and Annuity guides.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={INSURANCE_SIMPLIFIED_INFO.url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <span>Visit Insurance Simplified ↗</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenInsuranceModal}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
          >
            More Details
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Medicare Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Clear answers to common senior insurance and enrollment questions.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map(faq => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-slate-900 text-sm sm:text-base bg-slate-50/50 hover:bg-slate-100/80 flex items-center justify-between gap-4 transition-colors min-h-[48px]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white text-sm text-slate-700 border-t border-slate-100 leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resource Download Lead Modal */}
      <ResourceDownloadModal
        isOpen={isDownloadModalOpen}
        resourceTitle={selectedDownloadResourceTitle}
        onClose={() => setIsDownloadModalOpen(false)}
      />

    </div>
  );
};
