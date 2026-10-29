import React, { useEffect } from 'react';
import { Calendar, Phone, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface ScheduleProps {
  onOpenAdvisorModal?: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onOpenAdvisorModal }) => {
  useEffect(() => {
    const MSG = 'ggx-booking-confirmation-redirect';
    const ALLOWED = [
      'https://my.gogurux.com',
      'https://www.themedicare-professor.com',
      'http://localhost:5173',
      'http://localhost:3000',
    ];

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== MSG) return;
      if (ALLOWED.indexOf(event.origin) === -1) return;
      const raw = String(event.data.url || '').trim();
      if (!raw) return;
      try {
        const u = new URL(raw);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return;
        window.location.assign(u.toString());
      } catch {
        // invalid URL ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Schedule Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
              100% Free Senior Guidance
            </span>
            <span className="bg-blue-800/80 text-blue-200 text-xs px-3 py-1 rounded-full font-semibold border border-blue-700/60 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Real-Time Direct Calendar
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Schedule Your Consultation
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
            Choose your preferred time on our calendar below for an independent, no-pressure Medicare review with licensed advisor Jason York. We will review your doctors, prescriptions, and out-of-pocket costs at zero charge.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:5617707957"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Prefer to Call Right Now? (561) 770-7957</span>
            </a>

            {onOpenAdvisorModal && (
              <button
                onClick={onOpenAdvisorModal}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors border border-white/20 cursor-pointer"
              >
                <span>Request a Callback Instead</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-blue-200 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Sales Pressure Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Medigap & Advantage Comparison</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2027 CMS Late Penalty Prevention</span>
          </div>
        </div>
      </div>

      {/* Embedded GoGuruX / TheMedicare-Professor Consultation Calendar */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl border border-slate-200">
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Select Date & Time for Your Consultation</span>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Powered by The Medicare Professor
          </span>
        </div>

        <div className="w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-200">
          <iframe
            src="https://www.themedicare-professor.com/book/medicare-professor-com/medicare-consult?embed=1"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: '700px',
              border: 'none',
              borderRadius: '8px',
              display: 'block',
            }}
            frameBorder="0"
            scrolling="auto"
            title="Medicare consult - Booking"
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;