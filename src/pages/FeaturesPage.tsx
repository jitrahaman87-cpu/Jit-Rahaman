import React, { useEffect } from 'react';
import { CATEGORIES } from '../types';
import { TOOLS } from '../config/tools';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Lock } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface FeaturesPageProps {
  onSelectCategory: (categoryId: string) => void;
  onSelectTool: (toolSlug: string) => void;
  onNavigateHome: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onSelectCategory,
  onSelectTool,
  onNavigateHome,
}) => {
  useEffect(() => {
    updateSEO({
      title: 'Features & Capabilities – Complete 70+ PDF Suite | OmniPDF',
      description:
        'Explore the full feature suite of OmniPDF: organize pages, convert from and to Office formats, compress with zero artifacting, military-grade encryption, and Gemini 2.5 AI intelligence.',
      canonicalUrl: `${window.location.origin}/#/features`,
      keywords: ['pdf features', 'online pdf suite', 'merge pdf feature', 'ocr pdf capability'],
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>70+ Tools Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineered for total document versatility.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          From simple page reordering to advanced multi-lingual OCR and AI semantic document queries,
          OmniPDF delivers workstation-grade functionality right in your web browser.
        </p>
      </div>

      {/* Categories Breakdown */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => {
          const categoryTools = TOOLS.filter((t) => t.category === category.id);
          return (
            <div
              key={category.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{category.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                      {categoryTools.length} tools
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {category.description}
                  </p>
                </div>
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Filter this category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tools in this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {categoryTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={`#/tool/${tool.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(tool.slug);
                    }}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition group block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {tool.title}
                      </span>
                      {tool.featured && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {tool.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
