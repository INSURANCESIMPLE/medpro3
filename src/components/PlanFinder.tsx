import React, { useState, useMemo } from 'react';
import { SAMPLE_MEDICARE_PLANS } from '../data/medicareData';
import { MedicarePlan } from '../types';
import { AddOnCoverageSection } from './AddOnCoverageSection';
import { 
  Search, 
  MapPin, 
  Star, 
  Check, 
  Plus, 
  CheckCircle2, 
  ExternalLink, 
  Phone, 
  SlidersHorizontal,
  X,
  ShieldCheck,
  Eye,
  Pill,
  Sparkles,
  Smile,
  HeartPulse,
  Building2,
  Info
} from 'lucide-react';

interface PlanFinderProps {
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
}

export const PlanFinder: React.FC<PlanFinderProps> = ({
  onOpenInsuranceModal,
  onOpenAdvisorModal,
}) => {
  const [zipCode, setZipCode] = useState<string>('33101');
  const [planTypeFilter, setPlanTypeFilter] = useState<string>('all');
  const [maxPremiumFilter, setMaxPremiumFilter] = useState<number>(200);
  const [requireDentalVision, setRequireDentalVision] = useState<boolean>(false);
  const [selectedPlanForCompare, setSelectedPlanForCompare] = useState<MedicarePlan[]>([]);
  const [activePlanDetail, setActivePlanDetail] = useState<MedicarePlan | null>(null);

  const filteredPlans = useMemo(() => {
    return SAMPLE_MEDICARE_PLANS.filter(plan => {
      if (planTypeFilter !== 'all') {
        if (planTypeFilter === 'advantage' && !plan.type.includes('Advantage')) return false;
        if (planTypeFilter === 'medigap' && !plan.type.includes('Supplement')) return false;
        if (planTypeFilter === 'partd' && !plan.type.includes('Prescription')) return false;
      }
      if (plan.monthlyPremium > maxPremiumFilter) return false;
      if (requireDentalVision && !plan.dentalVisionIncluded) return false;
      return true;
    });
  }, [planTypeFilter, maxPremiumFilter, requireDentalVision]);

  const toggleCompare = (plan: MedicarePlan) => {
    if (selectedPlanForCompare.some(p => p.id === plan.id)) {
      setSelectedPlanForCompare(prev => prev.filter(p => p.id !== plan.id));
    } else {
      if (selectedPlanForCompare.length >= 3) {
        alert('You can compare up to 3 plans side-by-side.');
        return;
      }
      setSelectedPlanForCompare(prev => [...prev, plan]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          <Search className="w-3.5 h-3.5" /> 2026 Medicare Plan Finder
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Compare Medicare Plans in Your ZIP Code
        </h1>

        <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
          Enter your ZIP code to compare top-rated Medicare Advantage, Medigap Supplement, and Part D prescription plans from leading carriers.
        </p>

        {/* Search Inputs */}
        <div className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <MapPin className="w-5 h-5 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter ZIP Code"
              className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 font-bold rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {}}
              className="flex-1 sm:flex-none px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md min-h-[44px]"
            >
              Update Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Plans' },
              { id: 'advantage', label: 'Part C Advantage' },
              { id: 'medigap', label: 'Medigap Supplement' },
              { id: 'partd', label: 'Part D Rx Drugs' },
              { id: 'addons', label: 'Dental, Vision & Add-Ons' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setPlanTypeFilter(type.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all min-h-[42px] flex items-center justify-center cursor-pointer border ${
                  planTypeFilter === type.id
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Additional Toggles */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-700 pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
            <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer select-none min-h-[42px]">
              <input
                type="checkbox"
                checked={requireDentalVision}
                onChange={(e) => setRequireDentalVision(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-800 font-bold">Includes Dental & Vision</span>
            </label>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl min-h-[42px]">
              <span className="text-slate-800 font-bold whitespace-nowrap">Max Premium: <strong className="text-blue-700">${maxPremiumFilter}/mo</strong></span>
              <input
                type="range"
                min={0}
                max={250}
                step={25}
                value={maxPremiumFilter}
                onChange={(e) => setMaxPremiumFilter(Number(e.target.value))}
                className="w-20 sm:w-24 accent-blue-700 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Selected Plan Comparison Drawer Bar */}
        {selectedPlanForCompare.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900">
              <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0" />
              <span>
                Comparing {selectedPlanForCompare.length} plan(s):{' '}
                {selectedPlanForCompare.map(p => p.carrier).join(', ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPlanForCompare([])}
                className="text-xs text-slate-600 hover:text-slate-900 underline px-2 py-1"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Medigap Educational Callout Banner */}
      {(planTypeFilter === 'medigap' || planTypeFilter === 'all') && (
        <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-5 text-amber-950 space-y-2 animate-in fade-in">
          <div className="flex items-center gap-2 font-black text-sm text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Medigap Policyholder Alert: Medigap Plans G & N Exclude Dental, Vision, Lump-Sum Cancer & In-Home Caregiver Expenses</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-medium">
            While Medigap Plan G and Plan N pay your 20% Original Medicare copays and Part A hospital deductibles, Medicare regulations prohibit Medigap from bundling routine dental cleanings, crowns, glasses, lump-sum cancer cash, or private in-home health care aides. Pair your Medigap policy with affordable standalone <strong>Dental, Vision, Cancer, Hospital Indemnity, and Life w/ Home Health Care</strong> plans below.
          </p>
        </div>
      )}

      {/* Plan Cards Grid (Hidden if only viewing Add-Ons tab) */}
      {planTypeFilter !== 'addons' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlans.map(plan => {
            const isComparing = selectedPlanForCompare.some(p => p.id === plan.id);
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  isComparing ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-extrabold uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                          {plan.type}
                        </span>
                        {plan.popularPlanCode && (
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {plan.popularPlanCode}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {plan.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Carrier: {plan.carrier}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black text-slate-900">
                        ${plan.monthlyPremium}
                        <span className="text-xs font-medium text-slate-500">/mo</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-amber-500 text-xs font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{plan.starRating} / 5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-500 block">Annual Deductible:</span>
                      <strong className="text-slate-900">${plan.deductible}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Max Out-of-Pocket:</span>
                      <strong className="text-slate-900">${plan.maxOutOfPocket}</strong>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {plan.drugCoverageIncluded && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                        <Pill className="w-3.5 h-3.5" /> Part D Rx Included
                      </span>
                    )}
                    {plan.dentalVisionIncluded && (
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Dental & Vision Built-In
                      </span>
                    )}
                  </div>

                  {/* Bullet Features */}
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCompare(plan)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer ${
                      isComparing 
                        ? 'bg-blue-700 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isComparing ? 'Selected' : 'Compare Plan'}</span>
                  </button>

                  <button
                    onClick={onOpenAdvisorModal}
                    className="flex-1 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Review with Advisor</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Standalone Add-On Coverage Section (Dental, Vision, Cancer & Hospital Plans) */}
      <div className="pt-4">
        <AddOnCoverageSection 
          onOpenAdvisorModal={onOpenAdvisorModal}
          context={planTypeFilter === 'medigap' ? 'medigap' : 'compare-plans'}
        />
      </div>

      {/* Insurance Simplified Standalone Dental / Vision Option Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-amber-900 font-extrabold text-xs bg-amber-200 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Beyond Medicare
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Need Final Expense, IULs, Life, or Retirement Coverage?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-xl">
            If you chose a Medigap plan (Plan G/N) or Original Medicare, we also cover you with Life and Retirement products at <strong className="font-extrabold text-slate-950">www.insurancesimplified.info</strong>. Add Final Expense, IULs, Life Insurance, or Annuity policies.
          </p>
        </div>

        <a
          href="https://www.insurancesimplified.info"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-300 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 min-h-[44px]"
        >
          <span>Explore Life & Retirement at Insurance Simplified</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
