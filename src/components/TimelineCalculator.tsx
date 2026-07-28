import React, { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Clock, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface TimelineCalculatorProps {
  onOpenAdvisorModal: () => void;
}

export const TimelineCalculator: React.FC<TimelineCalculatorProps> = ({ onOpenAdvisorModal }) => {
  const [birthMonth, setBirthMonth] = useState<number>(new Date().getMonth() + 1);
  const [birthYear, setBirthYear] = useState<number>(1961); // ~65 in 2026

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate IEP Dates
  const targetDate = new Date(birthYear + 65, birthMonth - 1, 1);
  
  // 3 months prior
  const iepStart = new Date(targetDate);
  iepStart.setMonth(iepStart.getMonth() - 3);

  // 3 months after (end of IEP month)
  const iepEnd = new Date(targetDate);
  iepEnd.setMonth(iepEnd.getMonth() + 3);
  // last day of that month
  const iepEndLastDay = new Date(iepEnd.getFullYear(), iepEnd.getMonth() + 1, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-amber-300" /> Turning 65 Roadmap Calculator
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Calculate Your Initial Enrollment Period (IEP)
        </h1>

        <p className="text-indigo-100 text-sm sm:text-base max-w-2xl">
          Enter your birth month and year to generate your personalized 7-month enrollment timeline and guarantee your Medicare coverage starts seamlessly without penalty.
        </p>

        {/* Form Inputs */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-4 max-w-xl">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-indigo-200 mb-1">Birth Month</label>
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(Number(e.target.value))}
              className="w-full py-2.5 px-3 bg-white text-slate-900 font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {monthNames.map((m, idx) => (
                <option key={idx} value={idx + 1}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-indigo-200 mb-1">Birth Year</label>
            <input
              type="number"
              min={1940}
              max={1970}
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              className="w-full py-2.5 px-3 bg-white text-slate-900 font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Results Timeline Box */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Your Personalized 7-Month IEP Window
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Based on turning 65 in <strong>{monthNames[birthMonth - 1]} {birthYear + 65}</strong>
            </p>
          </div>

          <div className="bg-amber-100 text-amber-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 border border-amber-300">
            <Clock className="w-4 h-4 text-amber-800" />
            <span>Window Opens: {formatDate(iepStart)}</span>
          </div>
        </div>

        {/* 3 Step Timeline Phase Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phase 1 */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-emerald-950 text-sm">
              Early Sign-Up Window
            </h4>
            <p className="text-xs text-emerald-900/90 font-medium">
              <strong>3 Months Before 65th Birth Month</strong>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enrolling during this phase guarantees your Medicare starts on the 1st day of your birth month with zero delays.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-blue-950 text-sm">
              Your 65th Birth Month
            </h4>
            <p className="text-xs text-blue-900/90 font-medium">
              <strong>{monthNames[birthMonth - 1]} {birthYear + 65}</strong>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enrolling in your birth month means coverage begins the 1st day of the following month.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-indigo-950 text-sm">
              Final Months Window
            </h4>
            <p className="text-xs text-indigo-900/90 font-medium">
              <strong>Through {formatDate(iepEndLastDay)}</strong>
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your last chance to enroll during IEP without having to wait for the General Enrollment Period or risk penalties.
            </p>
          </div>

        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Need help setting up your Social Security or Medicare account? Our advisors guide you step-by-step at $0 cost.</span>
          </div>

          <button
            onClick={onOpenAdvisorModal}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Schedule Guided IEP Walkthrough</span>
          </button>
        </div>

      </div>

    </div>
  );
};
