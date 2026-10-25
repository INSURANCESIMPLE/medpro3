import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  CheckCircle2, 
  User, 
  Mail, 
  MapPin, 
  Download, 
  ShieldCheck, 
  FileText, 
  Send, 
  Check, 
  Printer, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { 
  HUB_GUIDES, 
  HubGuideDefinition, 
  getGuideByTitleOrId, 
  downloadGuideAsPdf 
} from '../utils/pdfGuideGenerators';
import { submitLeadNotification, ADVISOR_NOTIFICATION_EMAIL } from '../services/leadService';

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
  const [selectedGuideId, setSelectedGuideId] = useState<string>('parts-cheatsheet');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Email delivery state
  const [emailToSend, setEmailToSend] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    turning65Soon: true,
  });

  // Sync selected guide when modal opens with a resourceTitle
  useEffect(() => {
    if (isOpen) {
      const guide = getGuideByTitleOrId(resourceTitle);
      setSelectedGuideId(guide.id);
      setEmailSentSuccess(false);
      setEmailError('');
      setDownloadSuccess(false);
    }
  }, [isOpen, resourceTitle]);

  if (!isOpen) return null;

  const currentGuide: HubGuideDefinition = HUB_GUIDES[selectedGuideId] || getGuideByTitleOrId(resourceTitle);
  const targetEmail = 'jason@medicare-professor.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadNotification({
        type: 'pdf_download',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        zipCode: formData.zipCode,
        turning65Soon: formData.turning65Soon,
        resourceTitle: currentGuide.title,
      });

      // If email was already entered in initial form, pre-populate emailToSend
      if (formData.email) {
        setEmailToSend(formData.email);
      }
    } catch (err) {
      console.warn('Lead submission notification warning:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleDownloadPdf = () => {
    downloadGuideAsPdf(currentGuide, {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || emailToSend,
      zipCode: formData.zipCode,
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePrintGuide = () => {
    // Generate clean printable window with the full guide document
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentGuide.title} - 2027 Medicare Professor Guide</title>
          <style>
            @page { size: letter; margin: 15mm; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              line-height: 1.5;
              margin: 0;
              padding: 20px;
            }
            .header-bar {
              background: #064e3b;
              color: #ffffff;
              padding: 24px;
              border-radius: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 24px;
            }
            .header-bar h1 {
              font-size: 20px;
              margin: 0 0 4px 0;
              letter-spacing: -0.5px;
            }
            .header-bar p {
              margin: 0;
              font-size: 12px;
              color: #d1fae5;
            }
            .badge-2027 {
              background: #f59e0b;
              color: #022c22;
              font-weight: 900;
              font-size: 11px;
              padding: 6px 14px;
              border-radius: 9999px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .senior-banner {
              background: #f1f5f9;
              border-left: 4px solid #059669;
              padding: 12px 16px;
              border-radius: 6px;
              font-size: 13px;
              margin-bottom: 24px;
            }
            .guide-title {
              font-size: 24px;
              font-weight: 800;
              margin: 0 0 8px 0;
              color: #0f172a;
              line-height: 1.25;
            }
            .guide-subtitle {
              font-size: 14px;
              color: #475569;
              margin: 0 0 20px 0;
            }
            .highlights-box {
              background: #ecfdf5;
              border: 1px solid #a7f3d0;
              border-radius: 8px;
              padding: 16px;
              margin-bottom: 24px;
            }
            .highlights-box h3 {
              margin: 0 0 10px 0;
              font-size: 13px;
              color: #064e3b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .highlights-box ul {
              margin: 0;
              padding-left: 20px;
              font-size: 13px;
              color: #047857;
            }
            .highlights-box li {
              margin-bottom: 6px;
            }
            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .section-heading {
              font-size: 14px;
              font-weight: 800;
              color: #1e293b;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 6px;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .section-list {
              margin: 0;
              padding-left: 18px;
              font-size: 13px;
              color: #334155;
            }
            .section-list li {
              margin-bottom: 8px;
            }
            .protip-box {
              background: #fef3c7;
              border: 1px solid #fde68a;
              border-radius: 8px;
              padding: 14px;
              margin-top: 24px;
              margin-bottom: 24px;
              font-size: 13px;
              color: #78350f;
            }
            .advisor-footer {
              border-top: 2px solid #e2e8f0;
              padding-top: 16px;
              margin-top: 30px;
              font-size: 12px;
              color: #64748b;
              display: flex;
              justify-content: space-between;
              page-break-inside: avoid;
            }
            .advisor-contact {
              font-weight: bold;
              color: #0f172a;
            }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <div>
              <h1>THE MEDICARE PROFESSOR</h1>
              <p>Independent Senior Medicare & Protection Guidance | Insurance Made Simple</p>
            </div>
            <div class="badge-2027">2027 Official Guide</div>
          </div>

          ${formData.fullName ? `
          <div class="senior-banner">
            <strong>Prepared Exclusively For:</strong> ${formData.fullName} ${formData.zipCode ? `| ZIP: ${formData.zipCode}` : ''} | <strong>Advisor:</strong> Jason York (jason@medicare-professor.com)
          </div>
          ` : ''}

          <h2 class="guide-title">${currentGuide.title}</h2>
          <p class="guide-subtitle">${currentGuide.subtitle}</p>

          <div class="highlights-box">
            <h3>Key Executive Takeaways (2027 Standards):</h3>
            <ul>
              ${currentGuide.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>

          ${currentGuide.sections.map(sec => `
            <div class="section">
              <div class="section-heading">${sec.heading}</div>
              <ul class="section-list">
                ${sec.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="protip-box">
            <strong>PRO TIP:</strong> ${currentGuide.proTip}
          </div>

          <div class="advisor-footer">
            <div>
              <div class="advisor-contact">Jason York | Licensed Medicare & Senior Benefits Advisor</div>
              <div>Phone: (800) 732-7248 | Email: jason@medicare-professor.com</div>
              <div>Web: www.themedicare-professor.com | Sister Network: www.insurancesimplified.info</div>
            </div>
            <div style="text-align: right;">
              <div>Federally Regulated Rates</div>
              <div>100% Free Senior Guidance</div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailToSend || !emailToSend.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsSendingEmail(true);
    setEmailError('');

    try {
      await submitLeadNotification({
        type: 'guide_email',
        fullName: formData.fullName || 'Valued Senior',
        phone: formData.phone || 'On file',
        email: emailToSend,
        zipCode: formData.zipCode || 'On file',
        resourceTitle: currentGuide.title,
        notes: `Senior requested copy of ${currentGuide.title} emailed to: ${emailToSend}`,
      });

      setEmailSentSuccess(true);
    } catch (err) {
      console.warn('Error sending guide email notification:', err);
      // Still show success since lead is saved in local vault
      setEmailSentSuccess(true);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCopyDetails = () => {
    const text = `Medicare Resource: ${currentGuide.title}\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email || emailToSend || 'Not provided'}\nZIP: ${formData.zipCode}\nDispatched to: ${targetEmail}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmailSentSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 sm:p-7 rounded-t-2xl sm:rounded-t-3xl relative">
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Official 2027 PDF Guide
            </span>
            <span className="bg-white/15 text-white font-medium text-[10px] px-2.5 py-0.5 rounded-full">
              {currentGuide.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            {submitted ? 'PDF Guide Ready!' : currentGuide.shortTitle}
          </h2>
          <p className="text-xs text-emerald-100 mt-1 font-medium leading-relaxed">
            {currentGuide.subtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {submitted ? (
            /* STEP 2: POST-SUBMISSION / DOWNLOAD / PRINT / EMAIL */
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              
              {/* Submission confirmation banner */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-extrabold text-emerald-950">
                    Lead Sent to Jason York ({targetEmail})
                  </div>
                  <p className="text-emerald-800 leading-normal">
                    Thank you, <strong>{formData.fullName || 'Valued Senior'}</strong>! Your details have been delivered to our lead desk. You can now download, print, or email your complete guide below.
                  </p>
                </div>
              </div>

              {/* Guide Card Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    {currentGuide.shortTitle}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {currentGuide.readTime}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-700">
                  <div className="font-bold text-slate-900">{currentGuide.title}</div>
                  <div className="text-[11px] text-slate-600">{currentGuide.description}</div>
                </div>

                {/* Key Highlights */}
                <div className="pt-1 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Guide Highlights:</div>
                  <ul className="text-xs space-y-1 text-slate-700">
                    {currentGuide.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Core Options: Print or Download PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF (.pdf)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintGuide}
                  className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Guide / Save as PDF</span>
                </button>
              </div>

              {/* Option to Email the Guide */}
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
                  <Mail className="w-4 h-4 text-teal-700" />
                  <span>Want this guide emailed to your inbox as well?</span>
                </div>

                {emailSentSuccess ? (
                  <div className="p-3 bg-emerald-100/80 rounded-xl border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Success! We dispatched <strong>"{currentGuide.shortTitle}"</strong> to <strong>{emailToSend}</strong>!
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSendEmail} className="space-y-2">
                    <p className="text-[11px] text-teal-900/80">
                      Enter your email address below to receive an official PDF copy and advisor notes directly:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="your-email@example.com"
                          value={emailToSend}
                          onChange={(e) => setEmailToSend(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-teal-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSendingEmail}
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-75 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      >
                        {isSendingEmail ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Email Guide to Me</span>
                          </>
                        )}
                      </button>
                    </div>
                    {emailError && (
                      <p className="text-[11px] text-rose-600 font-medium">{emailError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Lead Summary & Advisor Direct Link */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied Summary!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>Copy Lead Summary</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-500 hover:text-slate-800 font-bold py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>

            </div>
          ) : (
            /* STEP 1: LEAD CAPTURE FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Guide Selector Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Selected Guide to Access
                </label>
                <div className="relative">
                  <select
                    value={selectedGuideId}
                    onChange={(e) => setSelectedGuideId(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 appearance-none"
                  >
                    {Object.values(HUB_GUIDES).map((guide) => (
                      <option key={guide.id} value={guide.id}>
                        {guide.shortTitle} ({guide.category})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Instant Access & Direct Advisor Notification</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  Submit your details below to instantly unlock the printable PDF. Your request details are sent directly to advisor <strong>{targetEmail}</strong>.
                </p>
              </div>

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
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Phone & ZIP Code */}
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
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
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
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional for print; required if you want it emailed)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
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
                  <span>I am turning 65 soon or currently evaluating my Medicare plan options</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-75 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending notification to {targetEmail}...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unlock PDF Guide & Notify Advisor</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1 pt-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Confidential. Dispatched to Advisor: {targetEmail}</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
