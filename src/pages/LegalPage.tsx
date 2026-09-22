import React, { useEffect, useState } from 'react';
import { Shield, FileText, Lock, ArrowLeft } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'cookies';
  onNavigateHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = 'privacy',
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(initialTab);

  useEffect(() => {
    const titles = {
      privacy: 'Privacy Policy & Zero Retention Standard – OmniPDF',
      terms: 'Terms and Conditions of Service – OmniPDF',
      cookies: 'Cookie Policy & Local Storage Transparency – OmniPDF',
    };
    updateSEO({
      title: titles[activeTab],
      description:
        'Read OmniPDF legal terms, GDPR compliance declaration, zero-retention document processing policy, and transparent service conditions.',
      canonicalUrl: `${window.location.origin}/#/${activeTab}`,
      keywords: ['omnipdf privacy policy', 'pdf terms of service', 'client-side privacy legal'],
    });
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs text-slate-400">Last updated: September 2026</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'privacy'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'terms'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Terms of Service
        </button>
        <button
          onClick={() => setActiveTab('cookies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'cookies'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Cookie Policy
        </button>
      </div>

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p>
              OmniPDF is committed to preserving the privacy and confidentiality of your documents.
              This policy explains our architectural approach to data handling.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              1. 100% Client-Side Processing Architecture
            </h2>
            <p>
              Unlike traditional cloud software providers, OmniPDF is compiled to WebAssembly (Wasm)
              and runs entirely within your device's browser memory sandbox. When you merge, split,
              compress, watermark, or edit a document, your files never cross network boundaries.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              2. Zero Document Storage & Retention
            </h2>
            <p>
              OmniPDF operates under a strict <strong>Zero Document Retention Policy</strong>. We do not
              maintain file servers, s3 buckets, or temporary storage disks for user document files. Once
              you close your browser tab or navigate away, the binary memory is immediately discarded.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              3. Google Workspace & Drive OAuth Permissions
            </h2>
            <p>
              When using Google Drive integration, OmniPDF requests only granular, least-privilege scopes
              (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">drive.file</code>).
              We only access files you explicitly pick via the user interface. We never index, read, or catalog
              your broader Google Drive storage.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              4. GDPR & CCPA Compliance
            </h2>
            <p>
              OmniPDF complies with the General Data Protection Regulation (GDPR) and California Consumer
              Privacy Act (CCPA). Because we do not collect or store personal files, there is zero risk of data
              breach or unauthorized third-party disclosure.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
            <p>
              Welcome to OmniPDF Suite. By using our website, desktop applications, or API services,
              you agree to the following terms and conditions.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              1. Permitted Use
            </h2>
            <p>
              You may use OmniPDF for personal, academic, or commercial document processing in accordance
              with all applicable laws. You may not use our platform to distribute malware, infringe copyrights,
              or conduct automated denial of service attacks.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              2. Intellectual Property Rights
            </h2>
            <p>
              You retain 100% of all intellectual property rights, copyright, and ownership in any documents,
              images, or texts processed using OmniPDF. OmniPDF claims no ownership or license to user files.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              3. Warranty Disclaimer
            </h2>
            <p>
              OmniPDF provides its tools "as is" and "as available" without warranties of any kind. While we
              strive for precision in PDF parsing and formatting, users should verify outputs before relying on
              them for critical legal or medical filings.
            </p>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cookie Policy</h1>
            <p>
              OmniPDF prioritizes lightweight performance and user privacy. We do not use third-party tracking
              cookies or intrusive advertising pixels.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-4">
              1. Essential Technical Storage
            </h2>
            <p>
              We use client-side <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</code>{' '}
              only to preserve your personal preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your dark mode or light mode appearance choice.</li>
              <li>Your selected language preference.</li>
              <li>Temporary offline cache for WebAssembly execution binaries.</li>
            </ul>
          </div>
        )}
      </article>
    </div>
  );
};
