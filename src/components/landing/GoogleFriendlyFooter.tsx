import React, { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Shield,
  FileText,
  ExternalLink,
  Laptop,
  Smartphone,
  Sparkles,
  Layers,
} from 'lucide-react';

interface GoogleFriendlyFooterProps {
  onNavigate: (route: string) => void;
  onOpenLanguage: () => void;
  currentLanguage?: string;
}

export const GoogleFriendlyFooter: React.FC<GoogleFriendlyFooterProps> = ({
  onNavigate,
  onOpenLanguage,
  currentLanguage = 'English',
}) => {
  return (
    <footer
      aria-label="OmniPDF Global Site Footer"
      className="w-full bg-[#181E29] text-slate-400 text-sm mt-20 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main 6-Column / Grid Link Architecture */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
          {/* Col 1: PRODUCT */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Product</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#/app-details"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/app-details');
                  }}
                  className="hover:text-rose-400 font-semibold text-rose-300 transition duration-150 block"
                >
                  Full App Details
                </a>
              </li>
              <li>
                <a
                  href="#/features"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/features');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Features & Catalog
                </a>
              </li>
              <li>
                <a
                  href="#/pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/pricing');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#/features"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/features');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  All 70+ Tools
                </a>
              </li>
              <li>
                <a
                  href="#/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/faq');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: RESOURCES */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#/app-details"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/app-details');
                  }}
                  className="hover:text-white transition duration-150 block font-medium text-rose-300"
                >
                  Full App Details & Specs
                </a>
              </li>
              <li>
                <a
                  href="#/desktop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/desktop');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Web Architecture Overview
                </a>
              </li>
              <li>
                <a
                  href="#/tool/sign-pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/tool/sign-pdf');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  OmniSign E-Signatures
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/about');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  OmniAPI & Webhooks
                </a>
              </li>
              <li>
                <a
                  href="#/omni-img"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/omni-img');
                  }}
                  className="hover:text-rose-400 transition duration-150 block font-medium text-rose-300"
                >
                  OmniIMG Suite
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: SOLUTIONS */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Solutions</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#/solutions/business"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/solutions/business');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="#/solutions/education"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/solutions/education');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#/pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/pricing');
                  }}
                  className="hover:text-white transition duration-150 block text-amber-300"
                >
                  Enterprise Licensing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: LEGAL */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#/security"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/security');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Security & ISO 27001
                </a>
              </li>
              <li>
                <a
                  href="#/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/privacy');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/terms');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#/cookies"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/cookies');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: COMPANY */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/about');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/contact');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#/app-details"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/app-details');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  System Architecture
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#/about');
                  }}
                  className="hover:text-white transition duration-150 block"
                >
                  Press Kit & Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Col 6: FULL APP SUITE & SPECS (Replaces store badges) */}
          <div className="space-y-3 col-span-2 sm:col-span-1 md:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">App Platform</h3>

            {/* App Details & Specs Card */}
            <a
              href="#/app-details"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/app-details');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-rose-500 hover:bg-slate-800/90 text-white transition group"
            >
              <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-rose-400 font-semibold uppercase tracking-wider">
                  Full Details
                </div>
                <div className="text-xs font-bold text-white mt-0.5">App Specs</div>
              </div>
            </a>

            {/* All 70+ Tools */}
            <a
              href="#/features"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/features');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 hover:bg-slate-800/90 text-white transition group"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-slate-400 font-medium">Directory</div>
                <div className="text-xs font-bold text-white mt-0.5">70+ PDF Tools</div>
              </div>
            </a>

            {/* Security Sandbox */}
            <a
              href="#/security"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/security');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500 hover:bg-slate-800/90 text-white transition group"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-emerald-400 font-medium">ISO 27001</div>
                <div className="text-xs font-bold text-white mt-0.5">Zero Retention</div>
              </div>
            </a>

            {/* OmniIMG Companion */}
            <a
              href="#/omni-img"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/omni-img');
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-amber-500 hover:bg-slate-800/90 text-white transition group"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="text-[9px] text-amber-400 font-medium">Image Suite</div>
                <div className="text-xs font-bold text-white mt-0.5">OmniIMG Studio</div>
              </div>
            </a>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-slate-800/90 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Language Selector Button */}
          <button
            onClick={onOpenLanguage}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-700/90 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentLanguage}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Social Icons (matching screenshot: X, Facebook, LinkedIn, Instagram, TikTok, Reddit) */}
          <div className="flex items-center gap-4 text-slate-400">
            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on X Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            {/* Reddit */}
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition p-1"
              aria-label="OmniPDF on Reddit"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </a>
          </div>

          {/* Copyright notice matching screenshot */}
          <div className="text-xs text-slate-500">
            © OmniPDF 2026 ® - Your Complete PDF Editor
          </div>
        </div>
      </div>
    </footer>
  );
};
