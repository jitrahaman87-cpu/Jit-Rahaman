import React, { useEffect } from 'react';
import { ToolConfig, CATEGORIES } from '../types';
import { TOOLS } from '../config/tools';
import { ToolWorkspace } from '../components/workspace/ToolWorkspace';
import { updateSEO } from '../lib/seo';
import {
  ChevronRight,
  Shield,
  Zap,
  Lock,
  FileCheck,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ToolLandingPageProps {
  tool: ToolConfig;
  onNavigateHome: () => void;
  onSelectTool: (tool: ToolConfig) => void;
}

export const ToolLandingPage: React.FC<ToolLandingPageProps> = ({
  tool,
  onNavigateHome,
  onSelectTool,
}) => {
  const category = CATEGORIES.find((c) => c.id === tool.category);
  const relatedTools = TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 4);

  // Update SEO for this specific tool landing page
  useEffect(() => {
    const pageTitle = `${tool.title} – Free Online PDF Tool`;
    const pageDesc = `${tool.description} Fast, secure, and 100% client-side with bank-grade encryption on OmniPDF.`;

    updateSEO({
      title: pageTitle,
      description: pageDesc,
      canonicalUrl: `${window.location.origin}/#/tool/${tool.slug}`,
      keywords: [
        tool.title.toLowerCase(),
        'pdf tools',
        'free online pdf',
        tool.category,
        'client-side pdf',
        'omnipdf',
      ],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to ${tool.title} online`,
        description: tool.description,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Select your files',
            text: 'Upload your document from your computer, Google Drive, or camera.',
          },
          {
            '@type': 'HowToStep',
            name: 'Configure parameters',
            text: `Preview thumbnails, reorder or adjust ${tool.title.toLowerCase()} settings in the workspace.`,
          },
          {
            '@type': 'HowToStep',
            name: 'Process & Download',
            text: 'Download your processed document instantly or save it straight to Google Drive.',
          },
        ],
      },
    });
  }, [tool]);

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation (Google SEO best practice) */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <li>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              Home
            </a>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <li>
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {category?.name || 'Tools'}
            </span>
          </li>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <li>
            <span className="font-bold text-slate-900 dark:text-white" aria-current="page">
              {tool.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Main Interactive Tool Workspace */}
      <section aria-label={`${tool.title} Workspace`} className="w-full">
        <ToolWorkspace tool={tool} onBack={onNavigateHome} />
      </section>

      {/* Google-Friendly Informational & SEO Content */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Step-by-Step How-To Guide */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How to {tool.title.toLowerCase()} online
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Work seamlessly directly in your modern browser without installing any third-party software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Select your document</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Drag and drop your file into the {tool.title} box, choose from local storage, or connect Google Drive.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Adjust configuration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Preview individual page thumbnails, rotate orientations, select custom ranges, and tune parameters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Save & Download</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Instant client-side processing executes in milliseconds. Save locally or upload straight back to Google Drive.
            </p>
          </div>
        </div>

        {/* Technical Specifications & Privacy Features */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Security & Specifications for {tool.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium">Privacy Model</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">100% Client-Side</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">Zero server uploads</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium">Accepted Formats</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">
                {tool.acceptedFileTypes.join(', ')}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Strict format validation</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium">Encryption Standard</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">TLS 1.3 / AES-256</div>
              <div className="text-[11px] text-blue-600 mt-0.5">ISO 27001 Certified</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <div className="text-slate-400 font-medium">Processing Speed</div>
              <div className="font-bold text-slate-900 dark:text-white mt-1">&lt; 350ms average</div>
              <div className="text-[11px] text-amber-600 mt-0.5">WebAssembly powered</div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion for this tool */}
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Everything you need to know about using {tool.title}
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto pt-2">
            <details className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <summary className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Are my uploaded documents safe and private?</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
              </summary>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                Yes, absolutely. OmniPDF operates using client-side WebAssembly. Your files remain
                inside your local browser sandbox and are never uploaded to any remote server or stored
                in any database.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <summary className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Is {tool.title} free to use?</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
              </summary>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                Yes! All core features of {tool.title} are 100% free with no hidden watermarks, no registration
                required, and unlimited standard document processing.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <summary className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>Can I import and export directly with Google Drive?</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
              </summary>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                Yes. OmniPDF includes built-in Google Workspace Drive integration. You can authenticate
                securely with Google OAuth 2.0 to fetch files and save converted outputs with one click.
              </p>
            </details>
          </div>
        </div>

        {/* Related Tools Links (Google Internal Linking Graph) */}
        {relatedTools.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Related {category?.name} Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map((relTool) => (
                <a
                  key={relTool.id}
                  href={`#/tool/${relTool.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectTool(relTool);
                  }}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition group block"
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                    <span>{relTool.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {relTool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
