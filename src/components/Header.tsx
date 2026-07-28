import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { INSURANCE_SIMPLIFIED_INFO, GOOGLE_REVIEW_STATS } from '../data/medicareData';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ExternalLink, 
  Phone, 
  BookOpen, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Smartphone, 
  Monitor,
  QrCode,
  Award,
  Star
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
  onOpenQRCodeModal: () => void;
  isMobilePreviewMode: boolean;
  setIsMobilePreviewMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenInsuranceModal,
  onOpenAdvisorModal,
  onOpenQRCodeModal,
  isMobilePreviewMode,
  setIsMobilePreviewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm transition-all">
      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Medicare<span className="text-blue-700">Professor</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded uppercase">
                  2026 Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Clear, Unbiased Medicare Guidance & Resource Hub
              </p>
            </div>
          </div>

          {/* Desktop Nav Links & Quick Selection Hamburger Menu */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home' 
                  ? 'bg-blue-50 text-blue-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('plans')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'plans' 
                  ? 'bg-blue-50 text-blue-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              Compare Plans
            </button>

            <button
              onClick={() => handleNavClick('resources')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'resources' 
                  ? 'bg-emerald-50 text-emerald-800 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Resource Hub
            </button>

            <button
              onClick={() => handleNavClick('timeline')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'timeline' 
                  ? 'bg-blue-50 text-blue-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              Turning 65 Roadmap
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'about' 
                  ? 'bg-amber-100 text-amber-900 font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              About & Why Us
            </button>

            {/* Quick Page Selection Hamburger Button for Desktop */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer border ${
                mobileMenuOpen
                  ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-md'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
              }`}
              title="Quick Select All Pages & Services"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-300" />
              ) : (
                <Menu className="w-5 h-5 text-blue-700" />
              )}
            </button>
          </nav>

          {/* Mobile Right Bar Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle quick navigation menu"
              className="px-3 py-2 flex items-center gap-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all cursor-pointer min-h-[42px]"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-5 h-5 text-amber-300" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-amber-300" />
                  <span>Quick Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Touch & Desktop Quick Page Selection Drawer Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 sm:px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-700" />
                  <span>Quick Page & Tool Selector</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Select any section to navigate instantly across The Medicare Professor platform.
                </p>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of All Core Pages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              
              {/* Home Page */}
              <button
                onClick={() => handleNavClick('home')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  activeTab === 'home'
                    ? 'bg-blue-50/80 border-blue-500/60 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                    Main Portal
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">1. Medicare Home</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Overview, 100% Coverage Tactic & Medicare Professor intro.
                  </p>
                </div>
              </button>

              {/* Compare Plans */}
              <button
                onClick={() => handleNavClick('plans')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  activeTab === 'plans'
                    ? 'bg-blue-50/80 border-blue-500/60 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Search className="w-5 h-5 text-indigo-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                    Interactive Tool
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">2. Compare Plans</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Medigap Plan G/N, Advantage Part C & Part D Rx Drug filters.
                  </p>
                </div>
              </button>

              {/* Resource Hub */}
              <button
                onClick={() => handleNavClick('resources')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  activeTab === 'resources'
                    ? 'bg-emerald-50/90 border-emerald-500/60 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Free PDFs
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">3. Resource Hub</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Downloadable Medicare Cheatsheets, FAQs & Strategy Guides.
                  </p>
                </div>
              </button>

              {/* Turning 65 Roadmap */}
              <button
                onClick={() => handleNavClick('timeline')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  activeTab === 'timeline'
                    ? 'bg-blue-50/80 border-blue-500/60 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">
                    IEP Calculator
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">4. Turning 65 Roadmap</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    7-month Initial Enrollment Window calculator & penalty avoidance.
                  </p>
                </div>
              </button>

              {/* About & Why Us */}
              <button
                onClick={() => handleNavClick('about')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  activeTab === 'about'
                    ? 'bg-amber-50/90 border-amber-500/60 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    Why Us
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">5. About & Why Us</h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    Our story, independent $0 advice guarantee & broker comparison.
                  </p>
                </div>
              </button>

              {/* 5.0 Star Google Review Card next to Why Us */}
              <a
                href={GOOGLE_REVIEW_STATS.googleProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/90 hover:bg-amber-100 text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    5.0 ★ <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                    <span>6. Client Reviews</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-snug font-medium">
                    {GOOGLE_REVIEW_STATS.totalReviews}+ Verified 5-Star Reviews. "$1,420/yr saved!"
                  </p>
                </div>
              </a>

            </div>

            {/* Secondary Services & Quick Actions */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Insurance Simplified Network Card */}
              <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-200 text-slate-900 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                    Insurance Simplified Network <ExternalLink className="w-3 h-3" />
                  </span>
                  <h5 className="text-xs font-black text-slate-900">Life & Final Expense Plans</h5>
                  <p className="text-[11px] text-slate-600">IULs, Annuities & Burial Coverage.</p>
                </div>
                <a
                  href={INSURANCE_SIMPLIFIED_INFO.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-lg shadow-xs shrink-0 cursor-pointer min-h-[36px] flex items-center justify-center"
                >
                  Visit ↗
                </a>
              </div>

              {/* QR Code Scanner Modal Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQRCodeModal();
                }}
                className="p-3 bg-indigo-50/90 rounded-xl border border-indigo-200 text-slate-900 flex items-center justify-between gap-3 text-left hover:bg-indigo-100/80 transition-colors cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-indigo-700" /> Share & Scan
                  </span>
                  <h5 className="text-xs font-black text-slate-900">Mobile QR Code</h5>
                  <p className="text-[11px] text-slate-600">Scan to open site on phone.</p>
                </div>
                <span className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg shrink-0">
                  View QR
                </span>
              </button>

              {/* Call / Consult Advisor */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdvisorModal();
                }}
                className="p-3 bg-blue-700 text-white rounded-xl flex items-center justify-between gap-3 text-left hover:bg-blue-800 transition-colors cursor-pointer shadow-sm"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-300" /> Direct Phone Line
                  </span>
                  <h5 className="text-xs font-black text-white">(561) 770-7957</h5>
                  <p className="text-[11px] text-blue-100">Free advisor consultation.</p>
                </div>
                <span className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs rounded-lg shrink-0">
                  Call Now
                </span>
              </button>

            </div>

          </div>
        </div>
      )}
    </header>
  );
};
