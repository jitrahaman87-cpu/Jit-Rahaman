import React, { useState, useEffect } from 'react';
import { Check, Crown, Zap, Shield, HelpCircle, ArrowRight, Star, Building2 } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface PricingPageProps {
  onGetStarted: () => void;
  onContactSales: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onGetStarted, onContactSales }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    updateSEO({
      title: 'Pricing & Plans – Free & Premium PDF Solutions',
      description:
        'Transparent pricing for OmniPDF. Choose from Free, Premium, or Business enterprise plans with volume discounts, offline desktop access, and unlimited AI processing.',
      canonicalUrl: `${window.location.origin}/#/pricing`,
      keywords: ['pdf pricing', 'omnipdf premium', 'enterprise pdf license', 'pdf subscription'],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'OmniPDF Suite Premium',
        description: 'Professional online & offline PDF productivity platform.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Free Tier',
            price: '0',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            name: 'Premium Yearly',
            price: '59.88',
            priceCurrency: 'USD',
          },
        ],
      },
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Flexible Plans For Everyone</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Simple, transparent pricing.
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Start for free forever with client-side processing, or upgrade to Premium for batch power,
          offline desktop software, and Gemini AI.
        </p>

        {/* Billing Switch */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span
            className={`text-xs font-semibold ${
              billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'
            }`}
          >
            Billed Monthly
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'yearly' ? 'monthly' : 'yearly')}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-300 dark:bg-slate-700 transition-colors duration-200"
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ${
                billingCycle === 'yearly' ? 'translate-x-5 bg-amber-400' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-semibold ${
                billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'
              }`}
            >
              Billed Annually
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
              Save 35%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Free */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Free Community
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard document operations running 100% in your browser without any signup.
            </p>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Access to all 70+ tools</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% client-side privacy</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Google Drive direct integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Files up to 50MB</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onGetStarted}
            className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs transition cursor-pointer"
          >
            Start Free
          </button>
        </div>

        {/* Tier 2: Premium (Featured matching screenshot) */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FEF6E4] dark:bg-amber-950/30 border-2 border-amber-400 shadow-md space-y-6 flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-900 font-bold text-[10px] uppercase tracking-wider">
            Most Popular
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>OmniPDF Premium</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                {billingCycle === 'yearly' ? '$4.99' : '$7.99'}
              </span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-amber-100/80 leading-relaxed">
              For professionals needing high-speed batch power, OCR, and offline desktop apps.
            </p>
            <div className="h-px bg-amber-200/80 dark:bg-amber-800/40" />
            <ul className="space-y-3 text-xs text-slate-800 dark:text-amber-50">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Everything in Free, plus:</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>OmniPDF Desktop (offline Mac & Windows)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Advanced Multilingual OCR engine</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Gemini 2.5 AI doc summaries & translation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 font-bold" />
                <span>Batch processing up to 200 files</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onGetStarted}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs shadow-md shadow-amber-400/20 transition cursor-pointer"
          >
            Upgrade to Premium
          </button>
        </div>

        {/* Tier 3: Business & Enterprise */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Business Enterprise</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$14.99</span>
              <span className="text-xs text-slate-400">/ user / mo</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Team governance, central billing, SSO/SAML, dedicated customer support and volume API.
            </p>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Team license management console</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>SSO & SAML 2.0 integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Audit logging & compliance reports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dedicated SLA & 24/7 priority support</span>
              </li>
            </ul>
          </div>
          <button
            onClick={onContactSales}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition cursor-pointer"
          >
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  );
};
