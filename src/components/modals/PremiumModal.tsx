import React, { useState } from 'react';
import { X, Check, Crown, Zap, Shield, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSubscribed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setIsSubscribed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubscribed ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Welcome to OmniPDF Premium!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
              Your 14-day free trial has been activated. Unlimited file sizes, offline desktop mode,
              and AI operations are now unlocked.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>OmniPDF Premium</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Unleash the full power of PDF tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Cancel anytime. 14-day money-back guarantee. No questions asked.
              </p>
            </div>

            {/* Billing Switch */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span
                className={`text-xs font-semibold ${
                  billingCycle === 'monthly'
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500'
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                onClick={() =>
                  setBillingCycle(billingCycle === 'yearly' ? 'monthly' : 'yearly')
                }
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-300 dark:bg-slate-700 transition-colors duration-200 ease-in-out focus:outline-hidden"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    billingCycle === 'yearly' ? 'translate-x-5 bg-amber-400' : 'translate-x-0'
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs font-semibold ${
                    billingCycle === 'yearly'
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500'
                  }`}
                >
                  Yearly
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                  Save 35%
                </span>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                  Pro All-Inclusive
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '$4.99' : '$7.99'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {billingCycle === 'yearly' ? 'Billed annually ($59.88/yr)' : 'Billed monthly'}
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm shadow-md shadow-amber-400/20 transition cursor-pointer active:scale-98"
              >
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited batch document files (up to 200)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>OmniPDF Desktop full offline software</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Advanced Multilingual OCR text extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited Gemini 2.5 AI summaries & queries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Legally binding digital audit e-Signatures</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct Google Drive automatic cloud sync</span>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Bank-Grade 256-Bit SSL
              </span>
              <span>•</span>
              <span>100% Ad-Free Experience</span>
              <span>•</span>
              <span>Instant Setup</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
