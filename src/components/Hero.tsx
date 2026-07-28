import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { INSURANCE_SIMPLIFIED_INFO, GOOGLE_REVIEW_STATS } from '../data/medicareData';
import { TestimonialCarousel } from './TestimonialCarousel';
import { 
  GraduationCap, 
  Search, 
  BookOpen, 
  ExternalLink, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Sparkles,
  FileText,
  Calendar,
  Zap,
  Star,
  Award,
  XCircle,
  HeartHandshake
} from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInsuranceModal: () => void;
  onOpenAdvisorModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  setActiveTab,
  onOpenInsuranceModal,
  onOpenAdvisorModal,
}) => {
  const [zipCode, setZipCode] = useState<string>('33101');

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('plans');
  };

  return (
    <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      
      {/* Hero Container */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white overflow-hidden shadow-2xl border border-slate-800 p-6 sm:p-12 lg:p-16">
        
        {/* Subtle decorative glow elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Row Badges: Phone Call-out & 2026 Guidance Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAdvisorModal}
              className="inline-flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-500 text-white border border-blue-400/40 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all cursor-pointer group max-w-full text-center min-h-[42px]"
              title="Call The Medicare Professor for free guidance"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <Phone className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
              <span className="leading-tight">
                Speak to The Professor: <strong className="text-amber-300 font-extrabold tracking-wide text-xs sm:text-base whitespace-nowrap">(561) 770-7957</strong>
              </span>
            </button>

            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3.5 py-2 rounded-full text-xs font-bold text-slate-300 shadow-sm backdrop-blur-md min-h-[42px]">
              <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>2026 Updated Medicare Guidance</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none sm:leading-tight">
            Medicare Made <span className="text-amber-300 drop-shadow-sm">Simple, Clear</span> & Mobile-Friendly
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Unbiased 2026 Medicare Advantage, Supplement (Medigap), and Part D guidance. Access 1-page cheatsheets & comparison guides. We also cover you with Life and Retirement products at{' '}
            <a 
              href={INSURANCE_SIMPLIFIED_INFO.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-300 font-bold underline underline-offset-4 hover:text-amber-200 transition-colors"
            >
              Insurance Simplified
            </a>.
          </p>

          {/* ZIP Code Search Box */}
          <form 
            onSubmit={handleZipSearch}
            className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/20 max-w-xl mx-auto shadow-2xl flex flex-col sm:flex-row items-center gap-2.5"
          >
            <div className="relative w-full">
              <MapPin className="w-5 h-5 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={5}
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter 5-digit ZIP Code"
                className="w-full h-12 pl-11 pr-4 py-3 bg-white text-slate-900 font-extrabold rounded-xl text-sm sm:text-base leading-normal focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Search className="w-4 h-4" />
              <span>Compare Plans</span>
            </button>
          </form>

          {/* Quick Trust Signals */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Free Service
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> Licensed Advisors
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
              <Sparkles className="w-4 h-4 text-amber-400" /> Mobile Touch Menu
            </span>
          </div>

        </div>
      </section>

      {/* Touch-Friendly Action Grid (Featured Quick Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Resource Center (Spotlight) */}
        <div 
          onClick={() => setActiveTab('resources')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden min-h-[200px]"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <span className="bg-amber-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Mobile Spotlight
              </span>
            </div>
            <h3 className="text-xl font-black">
              2026 Resource Hub
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed font-medium">
              Instant access to 1-page printable cheatsheets, enrollment guides, and FAQs.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
            <span>Explore Resources</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Insurance Simplified Sister Site */}
        <div 
          onClick={() => onOpenInsuranceModal()}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group min-h-[200px]"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-950/10 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-slate-950" />
              </div>
              <span className="bg-slate-950 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Beyond Medicare
              </span>
            </div>
            <h3 className="text-xl font-black">
              Life & Retirement Products
            </h3>
            <p className="text-xs text-slate-900 font-semibold leading-relaxed">
              We also cover you with Life and Retirement products at www.insurancesimplified.info.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-black text-slate-950 group-hover:translate-x-1 transition-transform">
            <span>Visit Insurance Simplified</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Plan Comparison */}
        <div 
          onClick={() => setActiveTab('plans')}
          className="bg-white hover:bg-slate-50 text-slate-900 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[200px]"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold">
              Compare 2026 Plans
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter Medicare Advantage, Medigap Plan G/N, and Part D standalone drug plans.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
            <span>Compare Plans Now</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Turning 65 IEP Roadmap */}
        <div 
          onClick={() => setActiveTab('timeline')}
          className="bg-white hover:bg-slate-50 text-slate-900 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group min-h-[200px]"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-indigo-700" />
            </div>
            <h3 className="text-xl font-bold">
              Turning 65 Roadmap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculate your exact 7-month Initial Enrollment Period (IEP) dates and avoid late penalties.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform">
            <span>Generate IEP Window</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </section>

      {/* Testimonial Carousel (Google Client Reviews) */}
      <TestimonialCarousel onOpenAdvisorModal={onOpenAdvisorModal} />

      {/* About & Why Choose Us Section (Replacing former cross-access banner) */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4 text-blue-700" /> About & Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Medicare Professor vs. 1-800 Call Centers
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Discover why seniors choose an independent trusted advisor over high-pressure 1-800 call centers. Our guidance is 100% free with $0 hidden fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('about')}
              className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>Full About & Why Us Story</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={onOpenAdvisorModal}
              className="w-full sm:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call: <span className="whitespace-nowrap font-extrabold">(561) 770-7957</span></span>
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500 w-1/3">
                  Feature / Guarantee
                </th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50/80 rounded-t-xl w-1/3">
                  The Medicare Professor
                </th>
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-50/80 rounded-t-xl w-1/3">
                  1-800 Junk Mail Call Centers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Carrier Options</td>
                <td className="py-3.5 px-4 bg-emerald-50/40 text-emerald-950 font-extrabold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>10+ Major Insurance Carriers Compared</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 bg-rose-50/30 text-rose-950 font-semibold">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Only 1 or 2 captive partners pushed</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Personal Advisor Contact</td>
                <td className="py-3.5 px-4 bg-emerald-50/40 text-emerald-950 font-extrabold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct Phone Access (561) 770-7957</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 bg-rose-50/30 text-rose-950 font-semibold">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Random hourly rep & endless transfer hold times</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Annual Rx Formulary Review</td>
                <td className="py-3.5 px-4 bg-emerald-50/40 text-emerald-950 font-extrabold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automatic Yearly Check every October</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 bg-rose-50/30 text-rose-950 font-semibold">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Zero post-enrollment support or annual Rx checkups</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">100% Medical Bill Protection</td>
                <td className="py-3.5 px-4 bg-emerald-50/40 text-emerald-950 font-extrabold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Plan G/N + Dental/Vision + Cancer Riders</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 bg-rose-50/30 text-rose-950 font-semibold">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>High copay plans with surprise out-of-pocket costs</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Cost to You</td>
                <td className="py-3.5 px-4 bg-emerald-50/40 text-emerald-950 font-black text-emerald-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>$0 Always (Statutory Rates)</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 bg-rose-50/30 text-rose-950 font-semibold">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Same price ($0), but zero service & high frustration</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
