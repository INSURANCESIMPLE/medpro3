import React, { useState, useEffect } from 'react';
import { CLIENT_TESTIMONIALS, GOOGLE_REVIEW_STATS } from '../data/medicareData';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  ExternalLink, 
  Phone,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

interface TestimonialCarouselProps {
  onOpenAdvisorModal: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onOpenAdvisorModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = CLIENT_TESTIMONIALS;
  const total = testimonials.length;

  // Auto-play carousel unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  // Compute indices for showing 2 cards on desktop side-by-side
  const nextIndex = (currentIndex + 1) % total;

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 relative overflow-hidden space-y-6 sm:space-y-8"
    >
      {/* Subtle Glow backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row: Google Profile & Rating Summary */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Google G Logo Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google 5.0 Rating</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-white text-xs font-black ml-1">5.0 / 5.0</span>
            </div>

            <span className="text-slate-400 text-xs font-semibold">
              ({GOOGLE_REVIEW_STATS.totalReviews}+ Verified Reviews)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Client Success Stories & Reviews
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            Real seniors and families who saved money, avoided penalties, and secured 100% coverage with The Medicare Professor & Insurance Made Simple.
          </p>
        </div>

        {/* Action Button Link to Google Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={GOOGLE_REVIEW_STATS.googleProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 min-h-[42px]"
          >
            <span>View Google Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={onOpenAdvisorModal}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Consult The Professor</span>
          </button>
        </div>
      </div>

      {/* Carousel Cards Container */}
      <div className="relative z-10 space-y-4">
        
        {/* Navigation Arrows Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Client Experience Highlight ({currentIndex + 1} of {total})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-10 h-10 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Display (1 Card on mobile/tablet, 2 side-by-side on lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Card 1 */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 relative shadow-lg hover:border-slate-700 transition-all">
            <Quote className="w-8 h-8 text-amber-400/20 absolute top-4 right-4 pointer-events-none" />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Google Review
                </span>

                {testimonials[currentIndex].savingsOrOutcome && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {testimonials[currentIndex].savingsOrOutcome}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-slate-400 text-[11px] font-medium ml-2">
                  {testimonials[currentIndex].date}
                </span>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-xs text-slate-400 font-semibold">
                  {testimonials[currentIndex].location} • <span className="text-amber-300">{testimonials[currentIndex].roleOrPlan}</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/30 text-indigo-200 font-black text-xs flex items-center justify-center shrink-0">
                {testimonials[currentIndex].author.charAt(0)}
              </div>
            </div>
          </div>

          {/* Card 2 (Shown on lg screens) */}
          <div className="hidden lg:flex bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex-col justify-between space-y-4 relative shadow-lg hover:border-slate-700 transition-all">
            <Quote className="w-8 h-8 text-amber-400/20 absolute top-4 right-4 pointer-events-none" />

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified Google Review
                </span>

                {testimonials[nextIndex].savingsOrOutcome && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {testimonials[nextIndex].savingsOrOutcome}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonials[nextIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-slate-400 text-[11px] font-medium ml-2">
                  {testimonials[nextIndex].date}
                </span>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed italic">
                "{testimonials[nextIndex].quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white">
                  {testimonials[nextIndex].author}
                </h4>
                <p className="text-xs text-slate-400 font-semibold">
                  {testimonials[nextIndex].location} • <span className="text-amber-300">{testimonials[nextIndex].roleOrPlan}</span>
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 font-black text-xs flex items-center justify-center shrink-0">
                {testimonials[nextIndex].author.charAt(0)}
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex 
                  ? 'w-8 bg-amber-400' 
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
