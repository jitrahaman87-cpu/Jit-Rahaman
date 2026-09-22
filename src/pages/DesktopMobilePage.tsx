import React, { useEffect } from 'react';
import { Laptop, Smartphone, Check, Shield, Wifi, ArrowLeft, ArrowRight, Layers, Zap, Cpu } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface DesktopMobilePageProps {
  type: 'desktop' | 'mobile';
  onNavigateHome: () => void;
  onNavigateToAppDetails?: () => void;
}

export const DesktopMobilePage: React.FC<DesktopMobilePageProps> = ({
  type,
  onNavigateHome,
  onNavigateToAppDetails,
}) => {
  const isDesktop = type === 'desktop';

  useEffect(() => {
    updateSEO({
      title: isDesktop
        ? 'OmniPDF Web Suite – Desktop Browser Productivity & Architecture'
        : 'OmniPDF Mobile Web – Responsive PDF Tools for Smartphone & Tablet',
      description: isDesktop
        ? 'Full desktop browser capabilities with client-side WebAssembly, high-speed multi-core batch processing, and zero software installation.'
        : 'Access 70+ PDF tools instantly on any mobile browser with private client-side processing and Google Drive sync.',
      canonicalUrl: `${window.location.origin}/#/${type}`,
      keywords: [
        isDesktop ? 'desktop web pdf tools' : 'mobile web pdf editor',
        'client-side pdf suite',
        'omnipdf app details',
        'no install pdf editor',
      ],
    });
  }, [isDesktop, type]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Cross-Platform Web Architecture
        </span>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200/50 dark:border-rose-900/40">
          {isDesktop ? <Laptop className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          <span>{isDesktop ? 'Desktop Browser Workstation' : 'Mobile & Tablet Browser Companion'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {isDesktop
            ? 'OmniPDF on Desktop: Instant, zero-install productivity.'
            : 'OmniPDF on Mobile: Full PDF power in your pocket browser.'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          {isDesktop
            ? 'Process sensitive contracts, multi-gigabyte files, and batch conversions directly in your favorite desktop browser with hardware-accelerated WebAssembly.'
            : 'Access all 70+ PDF tools directly from your mobile browser without installing third-party apps or granting system-level storage permissions.'}
        </p>
      </div>

      {/* Feature Architecture Cards - No Store Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {isDesktop ? 'Hardware-Accelerated Wasm Engine' : 'Touch-Optimized Responsive UI'}
            </h2>
            <p className="text-xs text-slate-500">
              {isDesktop
                ? 'Leverages multi-threading via Web Workers and SIMD memory buffers to process large documents at native binary speed.'
                : 'Custom touch controls for pinch-to-zoom, visual page reordering, digital signatures, and responsive camera document capture.'}
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Zero software installation required</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <span>100% private client-side processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant startup in any modern browser</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onNavigateHome}
            className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Launch All 70+ Tools in Browser</span>
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Zero-Retention Security Model
            </h2>
            <p className="text-xs text-slate-500">
              All documents are isolated inside your browser memory and never uploaded or retained on remote servers.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>ISO 27001 certified security practices</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Automatic memory purge on document save</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Optional Google Drive integration for personal storage</span>
              </li>
            </ul>
          </div>
          {onNavigateToAppDetails ? (
            <button
              onClick={onNavigateToAppDetails}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>View Full App Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onNavigateHome}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore Platform Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

