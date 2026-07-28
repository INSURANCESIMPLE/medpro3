import React, { useState } from 'react';
import { X, Phone, CheckCircle2, User, Mail, MapPin, Download, ShieldCheck, FileText } from 'lucide-react';

interface ResourceDownloadModalProps {
  isOpen: boolean;
  resourceTitle: string | null;
  onClose: () => void;
}

export const ResourceDownloadModal: React.FC<ResourceDownloadModalProps> = ({
  isOpen,
  resourceTitle,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    turning65Soon: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownloadAndClose = () => {
    window.print();
    onClose();
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-t-2xl sm:rounded-t-3xl relative">
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Free Printable PDF
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {submitted ? 'Your Download is Ready!' : `Unlock & Download Guide`}
          </h2>
          <p className="text-xs text-emerald-100 mt-1.5 font-medium">
            {resourceTitle ? `"${resourceTitle}"` : '2026 Medicare Resource Center Guide'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Access Granted!
                </h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{formData.fullName || 'Valued Senior'}</strong>. You can now download or print your guide.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{resourceTitle || '2026 Medicare Guide'}</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Click the button below to generate your printable PDF copy immediately.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleDownloadAndClose}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print PDF Guide Now</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close & Return to Resources
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                Please complete your quick details below to instantly unlock and download your free printable Medicare guide.
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone & ZIP Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="(561) 770-7957"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="e.g. 33101"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Turning 65 Checkbox */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                <label className="flex items-start gap-2 font-semibold text-amber-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.turning65Soon}
                    onChange={(e) => setFormData({ ...formData, turning65Soon: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded mt-0.5 accent-emerald-600"
                  />
                  <span>I am turning 65 in the next 6 months or already on Medicare</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Unlock & Download Free Guide</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure & Confidential. Zero Spam.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
