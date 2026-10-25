import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Download, 
  Send, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  getStoredLeads, 
  submitLeadNotification, 
  ADVISOR_NOTIFICATION_EMAIL, 
  LeadSubmission 
} from '../services/leadService';

interface AdvisorLeadVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisorLeadVaultModal: React.FC<AdvisorLeadVaultModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSentMsg, setTestSentMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadLeads();
      setTestSentMsg(null);
    }
  }, [isOpen]);

  const loadLeads = () => {
    setLeads(getStoredLeads());
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.type === filter;
  });

  const handleExportCsv = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Type', 'Full Name', 'Phone', 'Email', 'ZIP Code', 'Turning 65 Soon', 'Resource Requested', 'Notes', 'Timestamp', 'Delivery Status', 'Target Advisor'];
    
    const rows = leads.map(l => [
      l.id,
      l.type,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.zipCode || '').replace(/"/g, '""')}"`,
      l.turning65Soon ? 'Yes' : 'No',
      `"${(l.resourceTitle || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.timestamp}"`,
      l.deliveryStatus,
      l.notifiedEmail,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `medicare_professor_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to clear stored leads on this browser?')) {
      localStorage.removeItem('medicare_professor_leads_v2');
      loadLeads();
    }
  };

  const handleSendTestLead = async () => {
    setIsSendingTest(true);
    setTestSentMsg(null);
    try {
      const res = await submitLeadNotification({
        type: 'pdf_download',
        fullName: 'Test Lead (Jason Verification)',
        phone: '(561) 770-7957',
        email: ADVISOR_NOTIFICATION_EMAIL,
        zipCode: '33401',
        turning65Soon: true,
        resourceTitle: "The Professor's 100% Coverage Tactic",
        notes: 'Verification test dispatched directly to jason@medicare-professor.com',
      });
      loadLeads();
      setTestSentMsg(`Test dispatched! Check your inbox at ${ADVISOR_NOTIFICATION_EMAIL}. Note: On your very first submission, FormSubmit sends a 1-click activation link to verify your inbox.`);
    } catch (err) {
      setTestSentMsg('Dispatched test lead to local storage vault.');
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>Advisor Lead Vault</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {leads.length} Captured
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Target Notification Inbox: <strong className="text-amber-300">{ADVISOR_NOTIFICATION_EMAIL}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Close Lead Vault"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">All Submissions ({leads.length})</option>
              <option value="pdf_download">PDF Downloads</option>
              <option value="guide_email">Email Requests</option>
              <option value="consultation">Advisor Consultations</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSendTestLead}
              disabled={isSendingTest}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSendingTest ? 'Dispatching...' : 'Send Test Notification'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearLeads}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Clear local lead vault"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Test Notification Banner if sent */}
        {testSentMsg && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              {testSentMsg}
            </div>
          </div>
        )}

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Database className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No leads captured in this view yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Whenever a senior submits their name and phone to access any guide in the Resource Hub, the lead is stored here and dispatched directly to <strong>{ADVISOR_NOTIFICATION_EMAIL}</strong>.
              </p>
              <button
                onClick={handleSendTestLead}
                className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch a Sample Test Lead</span>
              </button>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-emerald-700" />
                        <span>{lead.fullName}</span>
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.type === 'pdf_download' ? 'bg-blue-100 text-blue-800' :
                        lead.type === 'guide_email' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {lead.type === 'pdf_download' ? 'PDF Download' :
                         lead.type === 'guide_email' ? 'Email Copy Request' : 'Consultation'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.resourceTitle}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(lead.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Lead Contact Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <a href={`tel:${lead.phone}`} className="font-bold hover:underline text-blue-900">
                      {lead.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate" title={lead.email}>{lead.email || 'None'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>ZIP: {lead.zipCode || 'N/A'}</span>
                    {lead.turning65Soon && (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-sm ml-1">
                        Age 65
                      </span>
                    )}
                  </div>
                </div>

                {lead.notes && (
                  <div className="text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600 italic">
                    "{lead.notes}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer info explaining email delivery */}
        <div className="bg-slate-100 border-t border-slate-200 p-3.5 sm:p-4 text-xs text-slate-600 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Notifications route directly to <strong>{ADVISOR_NOTIFICATION_EMAIL}</strong> via Cloudflare-compatible form dispatch.
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
            >
              Close Vault
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
