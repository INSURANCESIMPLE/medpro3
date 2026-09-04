import React, { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { ResourceHub } from './components/ResourceHub';
import { PlanFinder } from './components/PlanFinder';
import { TimelineCalculator } from './components/TimelineCalculator';
import { AboutPage } from './components/AboutPage';
import { Schedule } from './components/Schedule';
import { InsuranceSimplifiedBanner } from './components/InsuranceSimplifiedBanner';
import { InsuranceSimplifiedModal } from './components/InsuranceSimplifiedModal';
import { PrivacyModal } from './components/PrivacyModal';
import { QRCodeModal } from './components/QRCodeModal';
import { TermsModal } from './components/TermsModal';
import { Footer } from './components/Footer';

const ZOOM_SCHEDULER_URL = 'https://scheduler.zoom.us/Medicare-professor';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isMobilePreviewMode, setIsMobilePreviewMode] = useState(false);

  const getActiveTab = (pathname: string): ActiveTab => {
    switch (pathname) {
      case '/plans':
        return 'plans';
      case '/resources':
        return 'resources';
      case '/timeline':
        return 'timeline';
      case '/about':
        return 'about';
      case '/schedule':
        return 'schedule';
      default:
        return 'home';
    }
  };

  const activeTab = getActiveTab(location.pathname);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    switch (tab) {
      case 'plans':
        navigate('/plans');
        return;
      case 'resources':
        navigate('/resources');
        return;
      case 'timeline':
        navigate('/timeline');
        return;
      case 'about':
        navigate('/about');
        return;
      case 'schedule':
        navigate('/schedule');
        return;
      default:
        navigate('/');
    }
  }, [navigate]);

  const onOpenAdvisorModal = useCallback(() => {
    window.open(ZOOM_SCHEDULER_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-amber-300 selection:text-slate-950 flex flex-col justify-between ${
      isMobilePreviewMode ? 'max-w-[420px] mx-auto my-6 rounded-[40px] shadow-2xl border-[10px] border-slate-900 overflow-hidden ring-1 ring-slate-800' : ''
    }`}>
      
      {/* Top Banner & Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
        onOpenAdvisorModal={onOpenAdvisorModal}
        onOpenQRCodeModal={() => setIsQRCodeModalOpen(true)}
        isMobilePreviewMode={isMobilePreviewMode}
        setIsMobilePreviewMode={setIsMobilePreviewMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Routes>
          <Route
            path="/"
            element={(
              <div className="space-y-8 sm:space-y-12">
                <Hero
                  setActiveTab={setActiveTab}
                  onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
                  onOpenAdvisorModal={onOpenAdvisorModal}
                />
                <InsuranceSimplifiedBanner
                  onOpenModal={() => setIsInsuranceModalOpen(true)}
                />
              </div>
            )}
          />
          <Route
            path="/resources"
            element={(
              <div className="space-y-8">
                <ResourceHub
                  onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
                  onOpenAdvisorModal={onOpenAdvisorModal}
                />
                <InsuranceSimplifiedBanner
                  onOpenModal={() => setIsInsuranceModalOpen(true)}
                />
              </div>
            )}
          />
          <Route
            path="/plans"
            element={(
              <PlanFinder
                onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
                onOpenAdvisorModal={onOpenAdvisorModal}
              />
            )}
          />
          <Route
            path="/timeline"
            element={(
              <TimelineCalculator
                onOpenAdvisorModal={onOpenAdvisorModal}
              />
            )}
          />
          <Route
            path="/about"
            element={(
              <AboutPage
                onOpenAdvisorModal={onOpenAdvisorModal}
                onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
              />
            )}
          />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/privacy-policy" element={<PrivacyModal />} />
          <Route path="/privacypolicy" element={<PrivacyModal />} />
          <Route path="/terms-of-service" element={<TermsModal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
        onOpenAdvisorModal={onOpenAdvisorModal}
        onOpenQRCodeModal={() => setIsQRCodeModalOpen(true)}
      />

      {/* Mobile Fixed Bottom Navigation Bar (Resource & Insurance Quick Touch Target) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
        onOpenAdvisorModal={onOpenAdvisorModal}
      />

      {/* Insurance Simplified Partner Modal */}
      <InsuranceSimplifiedModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
        onOpenAdvisorModal={onOpenAdvisorModal}
      />

      {/* Mobile QR Code Modal */}
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
      />

    </div>
  );
};
