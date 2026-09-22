import React, { useEffect } from 'react';
import { Building2, GraduationCap, Check, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { updateSEO } from '../lib/seo';

interface SolutionsPageProps {
  type: 'business' | 'education';
  onNavigateHome: () => void;
  onContactSales: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  type,
  onNavigateHome,
  onContactSales,
}) => {
  const isBusiness = type === 'business';

  useEffect(() => {
    updateSEO({
      title: isBusiness
        ? 'OmniPDF for Business – Enterprise Document Governance & Licensing'
        : 'OmniPDF for Education – Student & Teacher Document Productivity',
      description: isBusiness
        ? 'Empower your teams with bank-grade PDF tools, SSO/SAML 2.0 authentication, centralized license provisioning, and high-volume REST API integrations.'
        : 'Special 50% discount for universities, K-12 schools, and academic research institutions. Seamless Google Classroom and Google Drive integration.',
      canonicalUrl: `${window.location.origin}/#/solutions/${type}`,
      keywords: [
        isBusiness ? 'business pdf' : 'education pdf',
        'omnipdf solutions',
        'team pdf license',
        'google classroom pdf',
      ],
    });
  }, [isBusiness, type]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          {isBusiness ? <Building2 className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
          <span>{isBusiness ? 'Enterprise Solutions' : 'Academic & Education'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {isBusiness
            ? 'Transform document workflows across your entire organization.'
            : 'Empowering students and educators with seamless PDF tools.'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          {isBusiness
            ? 'Scalable PDF processing, team user provisioning, strict audit logs, and SOC 2 / ISO 27001 compliance for enterprise security.'
            : 'Equip classrooms, faculties, and university students with fast, reliable, privacy-first PDF tools at half the price.'}
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {isBusiness ? 'Team Administration' : 'Classroom Management'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isBusiness
              ? 'Easily invite, assign seats, revoke access, and manage centralized company invoices.'
              : 'Bulk invite teachers and students with domain-level Google Workspace verification.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {isBusiness ? 'SSO / SAML 2.0 & SCIM' : 'COPPA & FERPA Compliant'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isBusiness
              ? 'Single Sign-On with Okta, Azure AD, Google Workspace, and Ping Identity.'
              : 'Student data is never logged, indexed, or shared with third-party advertisers.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {isBusiness ? 'High-Throughput API' : 'Google Drive & Classroom'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isBusiness
              ? 'Integrate PDF conversion and merging directly into your backend software via REST API.'
              : 'Students can submit homework, split textbook chapters, and mark annotations in one click.'}
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-2xl font-black">
            {isBusiness ? 'Ready to empower your company?' : 'Request an Education License'}
          </h2>
          <p className="text-xs text-blue-100">
            {isBusiness
              ? 'Talk with our enterprise solution architects for tailored pricing and onboarding.'
              : 'Get verified in 24 hours with your .edu email or school accreditation.'}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onContactSales}
            className="px-6 py-3 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition shadow-md cursor-pointer"
          >
            {isBusiness ? 'Contact Enterprise Sales' : 'Claim Education Discount'}
          </button>
        </div>
      </div>
    </div>
  );
};
