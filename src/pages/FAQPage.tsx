import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { updateSEO } from '../lib/seo';

const FAQS = [
  {
    category: 'General',
    q: 'What is OmniPDF Suite?',
    a: 'OmniPDF Suite is an enterprise-grade all-in-one web platform with 70+ specialized tools to organize, convert, optimize, edit, sign, and analyze PDF documents with 100% client-side privacy.',
  },
  {
    category: 'Privacy & Security',
    q: 'Are my uploaded PDF files safe?',
    a: 'Yes, completely. Unlike traditional web services that upload your files to remote cloud servers, OmniPDF uses WebAssembly (Wasm) to process your documents locally inside your browser memory. Your documents never leave your machine.',
  },
  {
    category: 'File Limits',
    q: 'Is there a file size or page count limit?',
    a: 'Standard free users can process files up to 50MB and up to 50 pages per batch. Premium subscribers can process files up to 2GB and up to 200 documents simultaneously.',
  },
  {
    category: 'Google Drive',
    q: 'How does Google Drive integration work?',
    a: 'OmniPDF connects via official Google Workspace OAuth 2.0. With your permission, you can pick documents from your Google Drive, process them, and save converted documents back to your Drive without manual downloads.',
  },
  {
    category: 'AI & Intelligence',
    q: 'How does the AI Document Intelligence feature work?',
    a: 'OmniPDF connects to Google Gemini 2.5 Flash via a secure server proxy. You can ask questions about your contract, summarize 100-page reports, translate documents between 30+ languages, or generate multiple-choice quizzes.',
  },
  {
    category: 'Desktop & Mobile',
    q: 'Can I work offline without an active internet connection?',
    a: 'Yes. With OmniPDF Desktop (available for Windows, macOS, and Linux), you can work entirely offline without needing an active internet connection. You can download the desktop installer from the Resources section.',
  },
  {
    category: 'Pricing & Billing',
    q: 'Can I cancel my Premium subscription at any time?',
    a: 'Yes. You can cancel your subscription with one click from your account settings at any time without fees or cancellation penalties.',
  },
];

interface FAQPageProps {
  onNavigateHome: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigateHome }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Generate Schema.org FAQPage structured data
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    updateSEO({
      title: 'Frequently Asked Questions (FAQ) – OmniPDF',
      description:
        'Find answers to common questions about OmniPDF tools, client-side WebAssembly security, Google Drive sync, pricing, and AI document capabilities.',
      canonicalUrl: `${window.location.origin}/#/faq`,
      keywords: ['omnipdf faq', 'pdf help', 'how to use omnipdf', 'is omnipdf free'],
      structuredData: faqSchema,
    });
  }, []);

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(FAQS.map((f) => f.category)))];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Everything you need to know about our tools, privacy model, and features.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. security, free, drive)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition shadow-2xs"
          >
            <summary className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold uppercase">
                  {faq.category}
                </span>
                <span>{faq.q}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200 shrink-0" />
            </summary>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 pl-2 leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <span>Explore All 70+ PDF Tools</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
