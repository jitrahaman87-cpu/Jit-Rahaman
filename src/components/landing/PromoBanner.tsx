import React from 'react';
import { Check, Crown, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onGetPremium: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onGetPremium }) => {
  return (
    <section aria-labelledby="promo-heading" className="w-full">
      <div className="relative overflow-hidden rounded-3xl bg-[#FEF6E4] dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Subtle decorative graphic in corner */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-200/40 dark:bg-amber-800/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-6 relative z-10">
          <h2
            id="promo-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-amber-50"
          >
            Get more with Premium
          </h2>

          <ul className="space-y-3.5 text-sm sm:text-base text-slate-700 dark:text-amber-100/90">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full p-0.5 text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="leading-snug">
                Get full access to all 70+ OmniPDF tools with high-speed client-side processing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full p-0.5 text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="leading-snug">
                Edit PDFs, get advanced OCR for scanned documents and request secure e-Signatures
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full p-0.5 text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 shrink-0">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="leading-snug">
                Connect tools and create custom workflows with high-speed batch processing
              </span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={onGetPremium}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-slate-900 font-bold text-sm shadow-md shadow-amber-400/20 transition-all duration-150 cursor-pointer"
            >
              <Crown className="w-4 h-4 fill-slate-900" />
              <span>Get Premium</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-75" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
