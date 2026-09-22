import React, { useEffect } from 'react';
import { Layers, Shield, Globe, Award, Sparkles, ArrowRight } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface AboutPageProps {
  onNavigateHome: () => void;
  onContactSales: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onContactSales }) => {
  useEffect(() => {
    updateSEO({
      title: 'About OmniPDF Suite – Our Mission & Architecture',
      description:
        'Discover the team, vision, and cutting-edge WebAssembly technology powering OmniPDF: the world-leading privacy-first PDF utility suite.',
      canonicalUrl: `${window.location.origin}/#/about`,
      keywords: ['about omnipdf', 'omnipdf team', 'wasm pdf engine', 'private pdf tool'],
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reinventing digital document productivity.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          OmniPDF was founded with a singular conviction: digital document editing should be accessible,
          lightning-fast, and unconditionally private.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">70+</div>
          <div className="text-xs text-slate-500 mt-1">Modular PDF Tools</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">50M+</div>
          <div className="text-xs text-slate-500 mt-1">Files Processed</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
          <div className="text-xs text-slate-500 mt-1">Client Privacy</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">190+</div>
          <div className="text-xs text-slate-500 mt-1">Countries Served</div>
        </div>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Say goodbye to slow, server-dependent converters.
          </h2>
          <p>
            For decades, manipulating PDF documents required either purchasing heavy, expensive desktop software
            or uploading confidential personal contracts to unknown third-party cloud servers.
          </p>
          <p>
            OmniPDF solves this dilemma by compiling C++ and Rust PDF rendering engines directly into
            WebAssembly. Your documents run directly inside your browser at near-native execution speeds.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Core Architectural Commitments</h3>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero file upload or persistence on remote machines</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Next-gen Gemini 2.5 Flash document intelligence</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Google Drive and modern cloud ecosystem compatibility</span>
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>ISO/IEC 27001 audited organizational security</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Press & Contact */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Press & Inquiries</h3>
          <p className="text-xs text-slate-500">Interested in media kits, integrations, or partnerships?</p>
        </div>
        <button
          onClick={onContactSales}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
        >
          Contact Our Team
        </button>
      </div>
    </div>
  );
};
