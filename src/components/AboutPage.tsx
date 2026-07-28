import React from 'react';
import { 
  GraduationCap, 
  Phone, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Star, 
  HeartHandshake, 
  Clock, 
  ExternalLink, 
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Building2,
  Users2
} from 'lucide-react';
import { GOOGLE_REVIEW_STATS, INSURANCE_SIMPLIFIED_INFO } from '../data/medicareData';

interface AboutPageProps {
  onOpenAdvisorModal: () => void;
  onOpenInsuranceModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenAdvisorModal,
  onOpenInsuranceModal,
}) => {
  return (
    <div className="space-y-10 sm:space-y-14 animate-in fade-in duration-300">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <GraduationCap className="w-4 h-4" /> About The Medicare Professor
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Google 5.0 Rated Independent Advisor
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Your Dedicated Medicare Advocate & Lifetime Retirement Partner
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Navigating Medicare turning 65 shouldn't feel like taking a calculus test. I built <strong className="text-white">The Medicare Professor</strong> to give seniors honest, unbiased, and 100% free guidance without pushy sales calls.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenAdvisorModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>Call The Professor: <span className="whitespace-nowrap font-extrabold">(561) 770-7957</span></span>
            </button>

            <a
              href={INSURANCE_SIMPLIFIED_INFO.url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Visit Insurance Simplified</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>
      </section>

      {/* About Me Story & Philosophy Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Personal Story Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <HeartHandshake className="w-4 h-4" /> Personal Mission
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Why I Became "The Medicare Professor"
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every day, thousands of seniors turning 65 receive stacks of confusing mailers, endless automated phone calls, and conflicting advice from giant insurance call centers.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              I established <strong>The Medicare Professor</strong> with a simple mission: treat every client like family. As an independent broker, I don't work for UnitedHealthcare, Humana, Aetna, or Mutual of Omaha — <strong>I work exclusively for you.</strong>
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" /> The "100% Coverage Tactic"
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                My signature framework combines <strong>Original Medicare (Part A & B)</strong> with a top-tier <strong>Medigap Supplement (Plan G or N)</strong>, a custom <strong>Part D Drug Plan</strong>, and supplemental <strong>Dental/Vision & Cancer Cash Riders</strong> so you face <strong>$0 surprise medical bills</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-black text-slate-900">Direct Advisor Line</h4>
              <p className="text-xs text-slate-500 font-semibold">(561) 770-7957 • No Automated Gatekeepers</p>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Licensed Independent Broker
            </span>
          </div>
        </div>

        {/* Right Column: Key Stats & Trust Badges */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Satisfaction</span>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-black text-amber-400">5.0 / 5.0</div>
              <p className="text-xs text-slate-300 font-semibold mt-1">
                Based on {GOOGLE_REVIEW_STATS.totalReviews}+ Verified Google Reviews
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              "The Medicare Professor saved us over $1,400 a year on insulin and set us up with zero out-of-pocket hospital coverage. Honest, clear, and truly cares!"
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              Core Commitments
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-extrabold text-slate-900">$0 Cost Advisory</h5>
                  <p className="text-[11px] text-slate-500">You pay exact statutory rate — zero hidden fees.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-extrabold text-slate-900">Annual Rx Formulary Check</h5>
                  <p className="text-[11px] text-slate-500">Free yearly drug price optimization during AEP.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-extrabold text-slate-900">Penalty Prevention Guarantee</h5>
                  <p className="text-[11px] text-slate-500">Never miss your 7-month IEP window.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* WHY US - Comparison Matrix Section */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-100 pb-6">
          <div className="md:col-span-7 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4 text-blue-700" /> Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Medicare Professor vs. Big Call Centers
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              See why hundreds of seniors switch to an independent trusted advisor every single year instead of dealing with high-pressure call centers.
            </p>
          </div>

          {/* Review Card next to Why Us */}
          <a
            href={GOOGLE_REVIEW_STATS.googleProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="md:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 sm:p-5 rounded-2xl shadow-xs hover:shadow-md transition-all group block"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                Verified Google Review <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>

            <p className="text-xs text-slate-800 font-bold italic mb-3 leading-relaxed">
              "Saved us $1,420/year on prescription drugs and set up zero out-of-pocket hospital protection. Honest, clear & always answers!"
            </p>

            <div className="flex items-center justify-between border-t border-amber-200/60 pt-2 text-xs">
              <span className="font-black text-slate-900">5.0 / 5.0 Rating</span>
              <span className="font-extrabold text-amber-800 group-hover:underline">
                Read {GOOGLE_REVIEW_STATS.totalReviews}+ Reviews ↗
              </span>
            </div>
          </a>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-500 w-1/3">
                  Service Feature
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

      {/* Network Partner Section (Insurance Made Simple) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" /> Official Partnership Network
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Powered by Insurance Made Simple
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            Need whole life final expense insurance, fixed index annuities, or home health care coverage? Explore our umbrella partner site at <strong className="text-amber-300">www.insurancesimplified.info</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={INSURANCE_SIMPLIFIED_INFO.url}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>Visit Insurance Simplified</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenInsuranceModal}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
          >
            <span>View Network Details</span>
          </button>
        </div>
      </section>

      {/* Final Call to Action Box */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ready for Stress-Free Medicare Guidance?
          </h2>
          <p className="text-blue-100 text-xs sm:text-base font-medium">
            Call today or schedule a free 15-minute phone review with The Medicare Professor. Zero pressure, guaranteed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenAdvisorModal}
            className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Schedule Free Call: <span className="whitespace-nowrap font-extrabold">(561) 770-7957</span></span>
          </button>
        </div>
      </section>

    </div>
  );
};
