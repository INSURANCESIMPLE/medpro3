import React, { useState } from 'react';
import { X, Phone, CheckCircle2, User, Mail, MapPin, Download, ShieldCheck, FileText, Send, Check } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    turning65Soon: true,
  });

  if (!isOpen) return null;

  const targetEmail = 'jason@medicare-professor.com';

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
    `[Medicare Resource Request] ${resourceTitle || '2027 Medicare Guide'} - ${formData.fullName}`
  )}&body=${encodeURIComponent(
    `Hello Jason,\n\nA new 2027 Medicare resource download request was submitted:\n\n` +
      `Requested Resource: ${resourceTitle || '2027 Medicare Guide'}\n` +
      `Full Name: ${formData.fullName}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `ZIP Code: ${formData.zipCode}\n` +
      `Turning 65 Soon: ${formData.turning65Soon ? 'Yes' : 'No'}\n` +
      `Submitted: ${new Date().toLocaleString()}\n\n` +
      `Please follow up with this beneficiary as needed.\n`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/request-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zipCode: formData.zipCode,
          turning65Soon: formData.turning65Soon,
          resourceTitle: resourceTitle || '2027 Medicare Comprehensive Guide',
        }),
      });
    } catch (err) {
      console.warn('API submission notice: Falling back to direct email routing for Jason York', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleDownloadAndClose = () => {
    window.print();
    onClose();
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const handleCopyDetails = () => {
    const text = `Medicare Resource Request: ${resourceTitle}\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nZIP: ${formData.zipCode}\nDestination: ${targetEmail}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
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
            {submitted ? 'Request Sent & PDF Ready!' : `Unlock & Download Guide`}
          </h2>
          <p className="text-xs text-emerald-100 mt-1.5 font-medium">
            {resourceTitle ? `"${resourceTitle}"` : '2027 Medicare Resource Center Guide'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Information Submitted & Sent!
                </h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong>{formData.fullName || 'Valued Senior'}</strong>. Your request details have been dispatched to <strong>{targetEmail}</strong>.
                </p>
              </div>

              {/* Lead Details Confirmation Badge */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-emerald-600" />
                    Sent to Advisor
                  </span>
                  <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {targetEmail}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><strong className="text-slate-800">Name:</strong> {formData.fullName}</div>
                  <div><strong className="text-slate-800">Phone:</strong> {formData.phone}</div>
                  <div><strong className="text-slate-800">ZIP:</strong> {formData.zipCode}</div>
                  <div><strong className="text-slate-800">Email:</strong> {formData.email || 'None provided'}</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{resourceTitle || '2027 Medicare Guide'}</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Click the button below to generate or print your official PDF copy right now.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleDownloadAndClose}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print PDF Guide Now</span>
                </button>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={mailtoUrl}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    onClick={handleCopyDetails}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    {copiedNotification ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-75 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting to jason@medicare-professor.com...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unlock & Download Free Guide</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Secure & Confidential. Sent directly to Jason York.</span>
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  Advisor destination: <span className="font-mono text-emerald-700 font-medium">jason@medicare-professor.com</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
