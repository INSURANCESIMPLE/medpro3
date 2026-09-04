import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  BookOpen, 
  Search, 
  Calendar, 
  Award
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

          {/* Desktop Nav Links */}
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

            <a
              href="https://scheduler.zoom.us/Insurance-Made-Simple"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1.5"
              title="Book a consultation"
            >
              <Calendar className="w-4 h-4" />
              📅 Schedule
            </a>
          </nav>

          {/* Mobile Right Bar Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
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
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 sm:px-6 py-4 shadow-2xl">
          <div className="max-w-7xl mx-auto space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('plans')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Compare Plans
            </button>
            <button
              onClick={() => handleNavClick('resources')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Resource Hub
            </button>
            <button
              onClick={() => handleNavClick('timeline')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              Turning 65 Roadmap
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              About & Why Us
            </button>
            <a
              href="https://scheduler.zoom.us/Insurance-Made-Simple"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
            >
              📅 Schedule Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
