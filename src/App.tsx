import React, { useCallback, useState } from 'react';
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

const ZOOM_SCHEDULER_URL = 'https://scheduler.zoom.us/Insurance-Made-Simple';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isMobilePreviewMode, setIsMobilePreviewMode] = useState(false);
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
        
        {activeTab === 'home' && (
          <div className="space-y-8 sm:space-y-12">
            <Hero
              setActiveTab={setActiveTab}
              onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
              onOpenAdvisorModal={onOpenAdvisorModal}
            />

            {/* Insurance Simplified Prominent Banner */}
            <InsuranceSimplifiedBanner
              onOpenModal={() => setIsInsuranceModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'resources' && (
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

        {activeTab === 'plans' && (
          <PlanFinder
            onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
            onOpenAdvisorModal={onOpenAdvisorModal}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineCalculator
            onOpenAdvisorModal={onOpenAdvisorModal}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenAdvisorModal={onOpenAdvisorModal}
            onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
          />
        )}

        {activeTab === 'schedule' && (
          <Schedule />
        )}

      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenInsuranceModal={() => setIsInsuranceModalOpen(true)}
        onOpenAdvisorModal={onOpenAdvisorModal}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenTermsModal={() => setIsTermsModalOpen(true)}
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

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

    </div>
  );
};