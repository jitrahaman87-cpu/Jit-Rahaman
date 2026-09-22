import React, { useEffect } from 'react';
import { Shield, Lock, CheckCircle2, FileText, Server, AlertTriangle, ArrowRight } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface SecurityPageProps {
  onNavigateHome: () => void;
}

export const SecurityPage: React.FC<SecurityPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    updateSEO({
      title: 'Security, Privacy & ISO 27001 Compliance – OmniPDF',
      description:
        'Learn how OmniPDF guarantees bank-grade security: ISO/IEC 27001 certified protocols, TLS 1.3 encryption, client-side WebAssembly sandbox, and zero document retention.',
      canonicalUrl: `${window.location.origin}/#/security`,
      keywords: ['pdf security', 'iso 27001 pdf', 'gdpr pdf tool', 'client-side encryption'],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'OmniPDF Security & Privacy Architecture',
        description: 'Comprehensive overview of data privacy and encryption standards at OmniPDF.',
      },
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>ISO 27001 & GDPR Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Your documents never leave your hands.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          OmniPDF is architected with a privacy-by-design philosophy. Over 95% of all operations execute
          directly inside your browser's WebAssembly sandbox.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Client-Side Sandbox (Wasm)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            When you merge, split, rotate, or compress files, binary operations run locally in your computer’s RAM
            via compiled WebAssembly. Files are never transmitted across the network to external servers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            ISO/IEC 27001 Certification
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Our cloud and organizational infrastructure adheres to the ISO/IEC 27001 standard for information
            security management systems (ISMS), audited annually by certified third-party registrars.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Zero Document Retention Policy
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            When using optional AI analysis (Gemini 2.5), payloads are processed strictly in ephemeral memory
            under enterprise zero-retention guidelines. Documents are purged immediately after analysis.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            GDPR, CCPA & HIPAA Ready
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Full compliance with European Union GDPR data protection laws and California CCPA guidelines.
            We provide standard Data Processing Addendums (DPAs) for enterprise and healthcare customers.
          </p>
        </div>
      </div>

      {/* Encryption Details */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <h2 className="text-xl font-bold">256-Bit TLS 1.3 Transport Security</h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          All network communications with Google Drive API and Gemini AI use HTTPS with TLS 1.3 encryption and
          perfect forward secrecy (PFS). Man-in-the-middle attacks and packet inspection are mathematically
          prevented.
        </p>
        <div className="pt-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
          >
            <span>Back to PDF Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
