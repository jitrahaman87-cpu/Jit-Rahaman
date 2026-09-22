import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Cpu,
  Shield,
  Zap,
  Sparkles,
  Layers,
  Lock,
  Globe,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  ExternalLink,
  HardDrive,
  Eye,
  Flame,
  Check,
  ServerOff,
} from 'lucide-react';
import { TOOLS } from '../config/tools';
import { CATEGORIES, ToolConfig, ToolCategory, CategoryMeta } from '../types';
import { updateSEO } from '../lib/seo';

interface AppDetailsPageProps {
  onNavigateHome: () => void;
  onSelectTool: (slug: string) => void;
  onNavigateToSecurity: () => void;
  onNavigateToPricing: () => void;
}

export const AppDetailsPage: React.FC<AppDetailsPageProps> = ({
  onNavigateHome,
  onSelectTool,
  onNavigateToSecurity,
  onNavigateToPricing,
}) => {
  const [selectedCat, setSelectedCat] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateSEO({
      title: 'OmniPDF Suite – Full App Details, System Architecture & Specifications',
      description:
        'Explore the full technical architecture of OmniPDF Suite: 100% client-side WebAssembly execution, zero document retention privacy, Google Drive integration, and 70+ PDF tools directory.',
      canonicalUrl: `${window.location.origin}/#/app-details`,
      keywords: [
        'omnipdf app details',
        'pdf webassembly architecture',
        'client-side pdf engine',
        'free pdf suite specs',
        'zero retention pdf',
        '70 pdf tools',
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'OmniPDF Suite',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Cross-platform (Web Native)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '70+ Dedicated Document Tools',
          'Client-Side WebAssembly Sandbox',
          'Zero File Retention Policy',
          'Gemini 2.5 AI Document Summarization',
          'ISO 27001 Certified Security Standards',
          'Google Drive Two-Way Synchronization',
        ],
      },
    });
  }, []);

  // Filter tools for the embedded tool explorer
  const filteredTools = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchCat = selectedCat === 'all' || t.category === selectedCat;
      const matchSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Home</span>
          <span>/</span>
          <span className="text-rose-600 dark:text-rose-400">Full App Details & Architecture</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Enterprise Technical Specifications & System Overview</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          OmniPDF Suite Full Application Details
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
          OmniPDF is a unified, 100% web-native document intelligence platform engineered with client-side WebAssembly. It delivers instant, zero-installation PDF processing directly inside your browser—with complete data isolation and zero document retention.
        </p>
      </div>

      {/* 4 Architectural Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Client-Side Wasm Sandbox
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Compiled from high-performance C++ and Rust PDFium libraries, executing file transformations directly in browser memory without server hops.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ServerOff className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Zero Document Retention
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Files are never written to disk or transferred to external cloud storage. Memory buffers are automatically purged upon session completion.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Gemini 2.5 Document AI
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Contextual document comprehension, intelligent executive summaries, automated table parsing, and multi-lingual translation copiloting.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            100% Browser Web-Native
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Zero installation, installer packages, or manual updates required. Runs directly, identically, and securely across every modern browser and device.
          </p>
        </div>
      </div>

      {/* Technical Specifications Matrix */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="px-6 sm:px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            System & Engineering Specifications
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Detailed technical benchmarks, runtime standards, cryptographic limits, and platform support.
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-rose-500" />
              <span>Execution Runtime</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              WebAssembly (Wasm) bytecode sandboxed via HTML5 Web Workers; parallel multi-threading via SIMD instructions.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-blue-500" />
              <span>Memory & Maximum File Size</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              Virtual ArrayBuffer streaming supporting files up to 2,048 MB (2 GB) in local RAM without browser crash or thrashing.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Processing Latency Benchmark</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              Typical page merge / split latency &lt; 40 ms; lossless document compression &lt; 150 ms; OCR recognition &lt; 1.2 s per page.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>Cryptographic Standards</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              Standard PDF 2.0 AES-256 bit encryption, SHA-256 integrity digests, PBKDF2 with 100,000 iterations for password protection.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>Security & Compliance Audits</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              ISO/IEC 27001 Information Security Management, GDPR Article 32 data isolation, CCPA zero-retention, PDF Association compliance.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-500" />
              <span>Cross-Device Compatibility</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              Universal support for Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, and modern mobile browsers. Instant browser execution.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 p-4 sm:px-8 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" />
              <span>Supported Input & Output MIME Formats</span>
            </div>
            <div className="col-span-2 text-slate-600 dark:text-slate-300 mt-1 md:mt-0">
              Input: .pdf, .docx, .doc, .xlsx, .pptx, .jpg, .jpeg, .png, .webp, .svg, .html, .txt. Output: .pdf, .docx, .xlsx, .pptx, .jpg, .png, .txt.
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: WebAssembly Client-Side vs Legacy Cloud Uploaders */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Architectural Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Why Client-Side WebAssembly Beats Traditional Cloud PDF Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Unlike legacy online PDF websites that upload your confidential documents to unknown remote servers, OmniPDF processes everything right on your own CPU.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>OmniPDF Client-Side Architecture</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>100% Private:</strong> Files never leave your local device memory</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Execution:</strong> Zero network latency or upload wait time</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Unlimited Local Files:</strong> Process up to 2GB documents locally</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Setup:</strong> Direct browser execution without plugins or external binaries</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Legacy Server-Based PDF Websites</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Uploads confidential contracts and financial records to third-party servers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Subject to server queue delays, bandwidth throttling, and timeout errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Restricted by arbitrary 10MB–25MB server payload limitations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Risk of lingering server backups and cloud exposure breaches</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Embedded 70+ Tools Interactive Explorer */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Layers className="w-4 h-4" />
              <span>Complete Tool Directory ({TOOLS.length} Tools)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Full Document Intelligence Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Browse every tool included in OmniPDF Suite. Click any tool to open its dedicated page.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search all 70+ tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat: CategoryMeta) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.name} ({TOOLS.filter((t) => t.category === cat.id).length})
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.slug)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-600 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {tool.category}
                  </span>
                  {tool.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Action Footer Card */}
      <div className="rounded-3xl bg-linear-to-r from-rose-500 to-red-600 text-white p-8 sm:p-12 shadow-lg shadow-rose-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to explore OmniPDF Suite?
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            Experience private, instant, client-side PDF productivity without installing any apps or software.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 rounded-xl bg-white text-rose-600 font-bold text-xs sm:text-sm shadow-md hover:bg-rose-50 transition cursor-pointer"
          >
            Launch All Tools
          </button>
          <button
            onClick={onNavigateToSecurity}
            className="px-6 py-3 rounded-xl bg-rose-700/80 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-rose-700 transition cursor-pointer"
          >
            Security Architecture
          </button>
        </div>
      </div>
    </div>
  );
};
