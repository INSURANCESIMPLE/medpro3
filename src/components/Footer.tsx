import React from 'react';
import { Link } from 'react-router-dom';
import { ActiveTab } from '../types';
import { INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';
import { GraduationCap, ExternalLink, Phone, Mail, ShieldCheck, Heart, QrCode } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
  onOpenQRCodeModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenInsuranceModal,
  onOpenAdvisorModal,
  onOpenQRCodeModal,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-amber-300 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                Medicare<span className="text-blue-400">Professor</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Empowering seniors with unbiased 2026 Medicare guidance, comparison tools, and 1-page cheatsheets.
            </p>

            <div className="pt-1">
              <a
                href={INSURANCE_SIMPLIFIED_INFO.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-slate-900 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span>Beyond Medicare - Life & Retirement Products</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Medicare Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('plans')} className="hover:text-white transition-colors">
                  Compare 2026 Medicare Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white text-emerald-400 font-bold transition-colors">
                  📚 Resource Hub & Cheatsheets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('timeline')} className="hover:text-white transition-colors">
                  Turning 65 IEP Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white text-amber-300 font-bold transition-colors">
                  ⭐ About The Professor & Why Us
                </button>
              </li>
            </ul>
          </div>

          {/* Sister Network Link Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Insurance Simplified Network
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href={INSURANCE_SIMPLIFIED_INFO.url} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Indexed Universal Life (IULs) ↗
                </a>
              </li>
              <li>
                <a href={INSURANCE_SIMPLIFIED_INFO.url} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Final Expense Life Insurance ↗
                </a>
              </li>
              <li>
                <a href={INSURANCE_SIMPLIFIED_INFO.url} target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  Annuities & Retirement Guidance ↗
                </a>
              </li>
              <li>
                <button onClick={onOpenInsuranceModal} className="hover:text-amber-300 transition-colors">
                  View Network Offerings Modal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Speak with a Specialist
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions about Medicare Part B late penalties or Medigap plan rates?
            </p>

            <button
              onClick={onOpenAdvisorModal}
              className="w-full py-2.5 px-3 bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-amber-300" />
              <span>Call <span className="whitespace-nowrap font-extrabold">(561) 770-7957</span></span>
            </button>

            {onOpenQRCodeModal && (
              <button
                onClick={onOpenQRCodeModal}
                className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-blue-300 font-bold text-xs rounded-xl border border-blue-900/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-300" />
                <span>Site Mobile QR Code</span>
              </button>
            )}
          </div>

        </div>

        {/* CMS Compliance Disclaimer */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <p>
            <strong>CMS Disclaimer:</strong> We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact <a href="https://www.medicare.gov" target="_blank" rel="noreferrer" className="underline text-slate-400">Medicare.gov</a> or 1-800-MEDICARE (1-800-633-4227), 24 hours a day/7 days a week, to get information on all of your options.
          </p>
          <p>
            Medicare Professor and Insurance Simplified are private health insurance information portals and are not connected with or endorsed by the U.S. government or the federal Medicare program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-600">
            <div>
              © {new Date().getFullYear()} Medicare Professor & Insurance Simplified. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy-policy" ...>Privacy Policy</Link>
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-slate-400 cursor-pointer transition-colors">
                Terms of Service
              </Link>
              <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>
<a
  href="/privacypolicy"
  target="_blank"
  rel="noreferrer"
  className="hover:text-slate-400 cursor-pointer transition-colors"
>
  Privacy Policy
</a>
      </div>
    </footer>
