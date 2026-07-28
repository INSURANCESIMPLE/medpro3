import React from 'react';
import { ActiveTab } from '../types';
import { INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';
import { 
  Home, 
  Search, 
  BookOpen, 
  ExternalLink, 
  PhoneCall
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenInsuranceModal,
  onOpenAdvisorModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-1.5 px-2">
      <div className="grid grid-cols-5 gap-1 text-center max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all min-h-[48px] ${
            activeTab === 'home' 
              ? 'text-blue-700 font-bold bg-blue-50/80' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Home</span>
        </button>

        {/* Plans */}
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all min-h-[48px] ${
            activeTab === 'plans' 
              ? 'text-blue-700 font-bold bg-blue-50/80' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Plans</span>
        </button>

        {/* Prominent Resource Hub Button with Glow & Badge */}
        <button
          onClick={() => setActiveTab('resources')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative min-h-[48px] ${
            activeTab === 'resources' 
              ? 'text-emerald-800 bg-emerald-100 font-extrabold ring-2 ring-emerald-500/40 shadow-sm' 
              : 'text-emerald-700 font-bold bg-emerald-50/90 border border-emerald-200/80'
          }`}
        >
          <span className="absolute -top-1.5 bg-amber-400 text-slate-950 font-black text-[8px] px-1.5 py-0.2 rounded-full uppercase tracking-tight shadow-xs animate-pulse">
            Resource Tab
          </span>
          <BookOpen className="w-5 h-5 mb-0.5 text-emerald-600" />
          <span className="text-[10px] leading-tight">Resources</span>
        </button>

        {/* Insurance Simplified Direct Touch Access */}
        <a
          href={INSURANCE_SIMPLIFIED_INFO.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold transition-all min-h-[48px] relative group"
          title="Visit Insurance Simplified"
        >
          <span className="flex items-center gap-0.5 text-amber-600">
            <ExternalLink className="w-4 h-4 mb-0.5" />
          </span>
          <span className="text-[9px] leading-tight font-extrabold text-amber-900">
            Insurance ↗
          </span>
        </a>

        {/* Advisor Call */}
        <button
          onClick={onOpenAdvisorModal}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-blue-700 bg-blue-50 font-semibold transition-all min-h-[48px]"
        >
          <PhoneCall className="w-5 h-5 mb-0.5 text-blue-700" />
          <span className="text-[10px] leading-tight">Advisor</span>
        </button>

      </div>
    </div>
  );
};
