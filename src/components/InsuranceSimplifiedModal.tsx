import React from 'react';
import { INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';
import { X, ExternalLink, Shield, Check, Heart, TrendingUp, Sparkles, Phone, ArrowUpRight } from 'lucide-react';

interface InsuranceSimplifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisorModal: () => void;
}

export const InsuranceSimplifiedModal: React.FC<InsuranceSimplifiedModalProps> = ({
  isOpen,
  onClose,
  onOpenAdvisorModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-slate-950 text-amber-300 font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Official Partner Site
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {INSURANCE_SIMPLIFIED_INFO.title}
          </h2>
          <p className="text-sm font-semibold text-slate-900 mt-1">
            {INSURANCE_SIMPLIFIED_INFO.domain}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-slate-800 text-sm leading-relaxed">
            <p className="font-semibold text-amber-950 mb-1">
              Why Medicare Professor Recommends Insurance Simplified:
            </p>
            <p className="text-slate-700">
              {INSURANCE_SIMPLIFIED_INFO.description}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-700" />
              Available Policies & Add-Ons:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INSURANCE_SIMPLIFIED_INFO.offerings.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <TrendingUp className="w-5 h-5 text-blue-700 mx-auto mb-1" />
              <div className="font-bold text-xs text-blue-950">IULs & Life</div>
              <div className="text-[11px] text-slate-600">Growth & Protection</div>
            </div>

            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <Heart className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <div className="font-bold text-xs text-red-950">Final Expense</div>
              <div className="text-[11px] text-slate-600">Guaranteed Acceptance</div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <Sparkles className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
              <div className="font-bold text-xs text-emerald-950">Zero Jargon</div>
              <div className="text-[11px] text-slate-600">Simple Enrollment</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={INSURANCE_SIMPLIFIED_INFO.url}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:flex-1 py-3.5 px-6 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Visit www.insurancesimplified.info</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenAdvisorModal();
              }}
              className="w-full sm:w-auto py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>Request Combined Consultation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
