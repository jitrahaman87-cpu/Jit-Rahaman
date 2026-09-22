import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface TrustSectionProps {
  onLearnSecurity?: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onLearnSecurity }) => {
  return (
    <section aria-labelledby="trust-heading" className="w-full py-8 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2
          id="trust-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          The PDF software trusted by millions of users
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          OmniPDF is your number one web app for editing PDF with ease. Enjoy all the tools you need to
          work efficiently with your digital documents while keeping your data safe and secure.
        </p>

        {/* Badges container matching the screenshot layout */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20">
          {/* ISO 27001 Badge */}
          <div
            onClick={onLearnSecurity}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition group"
            title="ISO/IEC 27001 Certified Information Security"
          >
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-xs tracking-tighter text-slate-800 dark:text-slate-200 group-hover:border-blue-500 transition">
              <span className="text-[10px] font-black">ISO</span>
            </div>
            <div className="text-left">
              <div className="text-xs font-black tracking-tight leading-none text-slate-900 dark:text-white">
                ISO 27001
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Certified Security
              </div>
            </div>
          </div>

          {/* SECURE SSL ENCRYPTION Badge */}
          <div
            onClick={onLearnSecurity}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition group"
            title="256-Bit TLS SSL Banking Grade Encryption"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition">
              <Lock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black tracking-tight leading-none uppercase text-slate-900 dark:text-white">
                Secure
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                SSL ENCRYPTION
              </div>
            </div>
          </div>

          {/* PDF ASSOCIATION Badge */}
          <div
            onClick={onLearnSecurity}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition group"
            title="Active Member of the PDF Association"
          >
            <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-rose-500 font-black text-sm group-hover:border-rose-500 transition">
              PDF
            </div>
            <div className="text-left">
              <div className="text-xs font-black tracking-tight leading-none text-slate-900 dark:text-white">
                PDF
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium lowercase tracking-wider">
                association
              </div>
            </div>
          </div>

          {/* GDPR / Privacy Badge */}
          <div
            onClick={onLearnSecurity}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition group hidden sm:flex"
            title="GDPR, CCPA & HIPAA Compliant Data Privacy"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black tracking-tight leading-none text-slate-900 dark:text-white">
                GDPR & CCPA
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Compliant Privacy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
