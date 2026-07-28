import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Copy, Check, Download, ExternalLink, Smartphone, ShieldCheck } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteUrl?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  siteUrl = 'https://www.themedicare-professor.com',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQR = () => {
    const svgElement = document.getElementById('medicare-professor-qr-code');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 100, 100, 800, 800);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'TheMedicareProfessor_QRCode.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <QrCode className="w-3 h-3" />
              Mobile Scan Code
            </span>
          </div>

          <h3 className="text-xl font-black text-white tracking-tight">
            Scan to Visit Website
          </h3>
          <p className="text-xs text-blue-200 mt-1 font-medium">
            Point your smartphone camera at this QR code to instantly open www.themedicare-professor.com
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center space-y-5">
          {/* QR Code Frame */}
          <div className="inline-block p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-md relative group">
            <QRCodeSVG
              id="medicare-professor-qr-code"
              value={siteUrl}
              size={220}
              level="H"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#0F172A"
            />
            <div className="mt-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              www.themedicare-professor.com
            </div>
          </div>

          {/* Direct Link Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
            <div className="text-left overflow-hidden">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website Address</div>
              <div className="text-xs font-extrabold text-blue-900 truncate">{siteUrl}</div>
            </div>
            <button
              onClick={handleCopyUrl}
              className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shrink-0 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownloadQR}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Save QR Code</span>
            </button>

            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Site</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Compatible with all iOS and Android camera apps</span>
          </div>
        </div>
      </div>
    </div>
  );
};
