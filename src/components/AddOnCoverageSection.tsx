import React, { useState } from 'react';
import { 
  Smile, 
  Eye, 
  HeartPulse, 
  Building2, 
  Home,
  Check, 
  Plus, 
  ShieldCheck, 
  Phone, 
  Info, 
  CheckCircle2, 
  Sparkles,
  DollarSign,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface AddOnCoverageSectionProps {
  onOpenAdvisorModal: () => void;
  context?: 'medigap' | 'compare-plans' | 'general';
}

export interface AddOnOption {
  id: string;
  category: 'dental' | 'vision' | 'cancer' | 'hospital' | 'life-homehealth';
  title: string;
  badge: string;
  estimatedMonthly: number;
  iconName: 'Smile' | 'Eye' | 'HeartPulse' | 'Building2' | 'Home';
  tagline: string;
  whyNeededWithMedigap: string;
  highlights: string[];
  popularCarriers: string[];
}

export const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'addon-dental',
    category: 'dental',
    title: 'Comprehensive Dental Insurance',
    badge: 'Most Requested Add-On',
    estimatedMonthly: 28,
    iconName: 'Smile',
    tagline: 'Covers routine cleanings, fillings, crowns, dentures & implants.',
    whyNeededWithMedigap: 'Original Medicare and Medigap (Plan G & Plan N) offer ZERO coverage for routine dental care, cleanings, or implants.',
    highlights: [
      '$0 Copay for 2 Cleanings & Exams per Year',
      '$1,500 - $3,000 Annual Maximum Benefit Cap',
      'Covers Fillings, Root Canals, Crowns & Dentures',
      'No Network Restrictions – See Any Licensed Dentist'
    ],
    popularCarriers: ['Aetna Dental', 'Mutual of Omaha', 'Ameritas', 'Delta Dental']
  },
  {
    id: 'addon-vision',
    category: 'vision',
    title: 'Vision Care & Eyewear Plan',
    badge: 'Budget Friendly',
    estimatedMonthly: 14,
    iconName: 'Eye',
    tagline: 'Covers annual eye exams, designer frames, & prescription lenses.',
    whyNeededWithMedigap: 'Original Medicare does not cover routine eye exams, eyeglasses, or contact lenses unless you have post-cataract surgery.',
    highlights: [
      '$10 Copay for Comprehensive Annual Eye Exams',
      '$150 - $250 Annual Eyewear & Frame Allowance',
      'Discounts on Progressive & Anti-Glare Lenses',
      'Large Nationwide VSP & EyeMed Provider Networks'
    ],
    popularCarriers: ['VSP Vision', 'EyeMed', 'Humana Vision', 'UnitedHealthcare']
  },
  {
    id: 'addon-cancer',
    category: 'cancer',
    title: 'Cancer & Critical Illness Lump-Sum',
    badge: 'Essential Peace of Mind',
    estimatedMonthly: 24,
    iconName: 'HeartPulse',
    tagline: 'Pays $10,000–$50,000 direct cash payout upon cancer or stroke diagnosis.',
    whyNeededWithMedigap: 'Covers non-medical costs like travel to specialized cancer centers, experimental therapies, lodging, and household bills.',
    highlights: [
      'Direct Lump-Sum Cash Payout ($10k to $50k)',
      'Tax-Free Cash Paid Straight to You (Not Doctors)',
      'No Restrictions on How You Spend the Cash',
      'Covers Internal Cancer, Heart Attack, Stroke & Kidney Failure'
    ],
    popularCarriers: ['Mutual of Omaha', 'Aetna Senior', 'GTL Cancer Care', 'Cigna']
  },
  {
    id: 'addon-hospital',
    category: 'hospital',
    title: 'Hospital Indemnity Cash Plan',
    badge: 'Gap Protection',
    estimatedMonthly: 22,
    iconName: 'Building2',
    tagline: 'Pays $250–$600 daily cash directly to you for inpatient hospital stays.',
    whyNeededWithMedigap: 'Completely eliminates out-of-pocket hospital deductibles, ambulance copays, and daily co-insurance for hospital admissions.',
    highlights: [
      '$250 - $600 Daily Cash Benefit for Hospital Confinement',
      'Ambulance Benefit ($200–$400 per ride) Included',
      'Outpatient Surgery & ER Visit Cash Riders Available',
      'Guaranteed Renewable for Life regardless of health changes'
    ],
    popularCarriers: ['GTL (Guarantee Trust Life)', 'Medico', 'Aetna Hospital Indemnity', 'Heartland National']
  },
  {
    id: 'addon-life-homehealth',
    category: 'life-homehealth',
    title: 'Life Insurance w/ Home Health Care Rider',
    badge: 'In-Home Caregiver Protection',
    estimatedMonthly: 32,
    iconName: 'Home',
    tagline: 'Tax-free death benefit PLUS living cash benefits for costly in-home health care aids.',
    whyNeededWithMedigap: 'Original Medicare limits home health care to short-term custodial care. This rider unlocks tax-free cash while living to pay private home health aides, caregivers, and skilled in-home nurses without draining savings.',
    highlights: [
      'Accelerated Living Benefit for In-Home Caregiver Expenses',
      'Tax-Free Cash Payout for Private Skilled Nursing & Aide Visits',
      'Protects Life Savings & Preserves Family Inheritance',
      'Full Death Benefit Payout to Beneficiaries if Care Unused'
    ],
    popularCarriers: ['Mutual of Omaha', 'Lincoln Financial', 'Aetna / Continental', 'Transamerica']
  }
];

export const AddOnCoverageSection: React.FC<AddOnCoverageSectionProps> = ({
  onOpenAdvisorModal,
  context = 'general'
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['addon-dental']);
  const [activeTab, setActiveTab] = useState<'all' | 'dental' | 'vision' | 'cancer' | 'hospital' | 'life-homehealth'>('all');

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalMonthlyAddOnCost = selectedAddOns.reduce((sum, id) => {
    const item = ADD_ON_OPTIONS.find(o => o.id === id);
    return sum + (item ? item.estimatedMonthly : 0);
  }, 0);

  const filteredOptions = ADD_ON_OPTIONS.filter(opt => {
    if (activeTab === 'all') return true;
    return opt.category === activeTab;
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-6 h-6 text-blue-600" />;
      case 'Eye': return <Eye className="w-6 h-6 text-indigo-600" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-amber-600" />;
      case 'Home': return <Home className="w-6 h-6 text-emerald-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
      
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {context === 'medigap' 
              ? 'Essential Medigap & Original Medicare Add-Ons' 
              : 'Add-On Coverage Options'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Dental, Vision, Cancer, Hospital & Life Home Health Plans
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Original Medicare and Medigap (Plan G & Plan N) leave major gaps for routine Dental, Vision, lump-sum Cancer benefits, Hospital stays, and costly Home Care aides. Customize your total senior coverage with affordable standalone add-on policies.
          </p>
        </div>

        {/* Selected Add-ons Summary Box */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0 space-y-2 text-right md:min-w-[240px]">
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Selected Add-Ons ({selectedAddOns.length})
          </div>
          <div className="text-2xl font-black text-amber-400">
            +${totalMonthlyAddOnCost} <span className="text-xs text-slate-400 font-normal">/mo (est.)</span>
          </div>
          <button
            onClick={onOpenAdvisorModal}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Add to Quote</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All 5 Add-On Plans' },
          { id: 'dental', label: 'Dental Insurance' },
          { id: 'vision', label: 'Vision Care' },
          { id: 'cancer', label: 'Cancer & Critical Illness' },
          { id: 'hospital', label: 'Hospital Indemnity' },
          { id: 'life-homehealth', label: 'Life & Home Health Care' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[42px] flex items-center justify-center cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add-On Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOptions.map((item) => {
          const isSelected = selectedAddOns.includes(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 sm:p-6 transition-all border flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-950 border-amber-400/80 ring-2 ring-amber-400/20 shadow-xl'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                      {renderIcon(item.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-amber-300">
                      ${item.estimatedMonthly}
                      <span className="text-[10px] font-medium text-slate-400">/mo</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Est. rate</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {item.tagline}
                </p>

                {/* Why Needed Callout Box */}
                <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-800/50 text-[11px] text-blue-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Why it matters with Medigap:</strong>
                    <span>{item.whyNeededWithMedigap}</span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {item.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Carriers */}
                <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-1">
                  <span className="font-semibold text-slate-300">Carriers:</span>
                  {item.popularCarriers.map((carrier, cIdx) => (
                    <span key={cIdx} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                      {carrier}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Toggle Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleAddOn(item.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Added to Plan Estimate (+${item.estimatedMonthly}/mo)</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-300" />
                      <span>Select Add-On Policy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenAdvisorModal}
                  className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer min-h-[42px]"
                  title="Ask licensed advisor about rates in your state"
                >
                  <span>Rates</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Banner Inside Add-On Section */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 text-amber-300 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-white block">Need Help Bundling Medigap + Dental, Vision, Cancer, Hospital or Life Home Care Plans?</span>
            <span className="text-slate-400">Our licensed advisors compare 30+ top carriers to find the lowest bundle rate in your ZIP code.</span>
          </div>
        </div>

        <button
          onClick={onOpenAdvisorModal}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer min-h-[42px] flex items-center justify-center"
        >
          Get Free Custom Bundle Quote
        </button>
      </div>

    </div>
  );
};
