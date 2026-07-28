import React from 'react';
import { INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';
import { ExternalLink, ShieldCheck, Heart, FileText, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

interface InsuranceSimplifiedBannerProps {
  onOpenModal: () => void;
}

export const InsuranceSimplifiedBanner: React.FC<InsuranceSimplifiedBannerProps> = ({ onOpenModal }) => {
  return (
    <section className="bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 text-slate-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-amber-300 relative overflow-hidden my-6 sm:my-10">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-300/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        
        <div className="space-y-3 text-center lg:text-left flex-1">
          <div className="inline-flex items-center gap-2 bg-slate-950 text-amber-300 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Beyond Medicare</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
            Life & Retirement Products with <span className="underline decoration-slate-950/30">Insurance Simplified</span>
          </h3>

          <p className="text-sm sm:text-base text-slate-900 font-medium max-w-2xl leading-relaxed">
            We also cover you with Life and Retirement products at{' '}
            <strong className="font-extrabold bg-slate-950/10 px-1.5 py-0.5 rounded text-slate-950">
              www.insurancesimplified.info
            </strong>. Simple, hassle-free final expense, IULs, life insurance, and annuity guidance.
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs font-bold text-slate-900">
            <span className="flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5 text-blue-800" /> IULs & Life Insurance
            </span>
            <span className="flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-lg">
              <Heart className="w-3.5 h-3.5 text-red-600" /> Final Expense
            </span>
            <span className="flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-lg">
              <FileText className="w-3.5 h-3.5 text-blue-700" /> Annuities & Retirement
            </span>
            <span className="flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" /> Zero Jargon
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href={INSURANCE_SIMPLIFIED_INFO.url}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group min-h-[48px]"
          >
            <span>Visit Insurance Simplified</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-amber-400" />
          </a>

          <button
            onClick={onOpenModal}
            className="w-full sm:w-auto px-5 py-3 bg-white/80 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl border border-slate-900/10 shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span>View Coverage Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
