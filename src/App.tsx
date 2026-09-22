import React, { useState, useEffect, useMemo } from 'react';
import { TOOLS } from './config/tools';
import { CATEGORIES, ToolConfig, ToolCategory } from './types';
import { ToolCard } from './components/ToolCard';
import { ToolWorkspace } from './components/workspace/ToolWorkspace';
import { GoogleDriveModal } from './components/GoogleDriveModal';

// Landing and SEO Components
import { PromoBanner } from './components/landing/PromoBanner';
import { SisterAppBanner } from './components/landing/SisterAppBanner';
import { TrustSection } from './components/landing/TrustSection';
import { GoogleFriendlyFooter } from './components/landing/GoogleFriendlyFooter';

// Modals
import { PremiumModal } from './components/modals/PremiumModal';
import { AuthModal } from './components/modals/AuthModal';
import { LanguageModal } from './components/modals/LanguageModal';

// Dedicated Google-friendly subpages
import { ToolLandingPage } from './pages/ToolLandingPage';
import { PricingPage } from './pages/PricingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SecurityPage } from './pages/SecurityPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { OmniImgPage } from './pages/OmniImgPage';
import { DesktopMobilePage } from './pages/DesktopMobilePage';
import { AppDetailsPage } from './pages/AppDetailsPage';

import { updateSEO } from './lib/seo';
import {
  Search,
  Sparkles,
  Cloud,
  Moon,
  Sun,
  Layers,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

export default function App() {
  // Current route parsed from window.location.hash
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.hash || '#/');
  const [selectedTool, setSelectedTool] = useState<ToolConfig | null>(null);
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Modals state
  const [isGlobalDriveOpen, setIsGlobalDriveOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({ isOpen: false, mode: 'login' });
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Synchronize hash routing
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash || '#/';
      if (!hash.startsWith('#')) {
        hash = `#/${hash.replace(/^\//, '')}`;
      } else if (!hash.startsWith('#/')) {
        hash = `#/${hash.replace(/^#\/?/, '')}`;
      }
      setCurrentRoute(hash);

      // Check if hash matches a specific tool: #/tool/:slug
      if (hash.startsWith('#/tool/')) {
        const slug = hash.replace('#/tool/', '');
        const found = TOOLS.find((t) => t.slug === slug || t.id === slug);
        if (found) {
          setSelectedTool(found);
        }
      } else {
        setSelectedTool(null);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update default SEO when on home route
  useEffect(() => {
    if (currentRoute === '#/' || currentRoute === '') {
      updateSEO({
        title: 'OmniPDF Suite – 70+ Free Online PDF Tools & AI Intelligence',
        description:
          'Every PDF tool you need: Merge, Split, Compress, Convert, Edit, E-Sign, OCR, and AI summaries. 100% private client-side processing with Google Drive sync.',
        canonicalUrl: window.location.origin + '/#/',
        keywords: [
          'pdf suite',
          'free pdf tools',
          'merge pdf online',
          'compress pdf without quality loss',
          'ocr pdf',
          'client-side pdf',
          'omnipdf',
        ],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'OmniPDF Suite',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All modern web browsers',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      });
    }
  }, [currentRoute]);

  // Navigate helper
  const navigateTo = (path: string) => {
    let normalized = path;
    if (!normalized.startsWith('#')) {
      normalized = `#/${normalized.replace(/^\//, '')}`;
    } else if (!normalized.startsWith('#/')) {
      normalized = `#/${normalized.replace(/^#\/?/, '')}`;
    }
    window.location.hash = normalized;
    setIsMobileMenuOpen(false);
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Featured tools for quick access
  const featuredTools = useMemo(() => {
    return TOOLS.filter((t) => t.featured);
  }, []);

  // Helper for direct header tool shortcuts
  const mergeTool = TOOLS.find((t) => t.id === 'merge-pdf');
  const splitTool = TOOLS.find((t) => t.id === 'split-pdf');
  const compressTool = TOOLS.find((t) => t.id === 'compress-pdf');

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#FAFAFA] text-slate-900'
      } flex flex-col font-sans transition-colors duration-200`}
    >
      {/* Top Enterprise Header matching screenshot */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Primary Brand */}
          <div className="flex items-center gap-6">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/');
              }}
              className="flex items-center gap-2.5 select-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white font-black shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  OmniPDF
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 rounded-sm uppercase tracking-wider">
                  Suite
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links matching screenshot */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-bold tracking-wide">
              {mergeTool && (
                <a
                  href={`#/tool/${mergeTool.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`#/tool/${mergeTool.slug}`);
                  }}
                  className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition uppercase"
                >
                  Merge PDF
                </a>
              )}
              {splitTool && (
                <a
                  href={`#/tool/${splitTool.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`#/tool/${splitTool.slug}`);
                  }}
                  className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition uppercase"
                >
                  Split PDF
                </a>
              )}
              {compressTool && (
                <a
                  href={`#/tool/${compressTool.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`#/tool/${compressTool.slug}`);
                  }}
                  className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition uppercase"
                >
                  Compress PDF
                </a>
              )}
              <a
                href="#/features"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('#/features');
                }}
                className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition uppercase flex items-center gap-1"
              >
                <span>Convert PDF</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="#/features"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('#/features');
                }}
                className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition uppercase"
              >
                All PDF Tools
              </a>
              <a
                href="#/app-details"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('#/app-details');
                }}
                className="px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition uppercase font-semibold"
              >
                App Details
              </a>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Google Drive Direct Button */}
            <button
              onClick={() => setIsGlobalDriveOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Google Drive Cloud Storage"
            >
              <Cloud className="w-4 h-4 text-blue-500" />
              <span>Google Drive</span>
            </button>

            {/* Pricing link */}
            <a
              href="#/pricing"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/pricing');
              }}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 px-2 py-1.5 transition hidden sm:block"
            >
              Pricing
            </a>

            {/* Login / User Status */}
            {currentUser ? (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl">
                {currentUser.split('@')[0]}
              </span>
            ) : (
              <button
                onClick={() => setAuthModalConfig({ isOpen: true, mode: 'login' })}
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 px-2.5 py-1.5 transition cursor-pointer"
              >
                Login
              </button>
            )}

            {/* Sign Up Vibrant Button (matching screenshot red/coral pill) */}
            <button
              onClick={() => setAuthModalConfig({ isOpen: true, mode: 'signup' })}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-sm shadow-red-500/20 transition cursor-pointer"
            >
              Sign up
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2 text-xs font-bold uppercase">
            <a
              href="#/tool/merge-pdf"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/tool/merge-pdf');
              }}
              className="block py-2 text-slate-700 dark:text-slate-300"
            >
              Merge PDF
            </a>
            <a
              href="#/tool/split-pdf"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/tool/split-pdf');
              }}
              className="block py-2 text-slate-700 dark:text-slate-300"
            >
              Split PDF
            </a>
            <a
              href="#/tool/compress-pdf"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/tool/compress-pdf');
              }}
              className="block py-2 text-slate-700 dark:text-slate-300"
            >
              Compress PDF
            </a>
            <a
              href="#/features"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/features');
              }}
              className="block py-2 text-slate-700 dark:text-slate-300"
            >
              All 70+ PDF Tools
            </a>
            <a
              href="#/app-details"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/app-details');
              }}
              className="block py-2 text-rose-600 dark:text-rose-400 font-semibold"
            >
              Full App Details & Specs
            </a>
            <a
              href="#/pricing"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/pricing');
              }}
              className="block py-2 text-slate-700 dark:text-slate-300"
            >
              Pricing
            </a>
            <a
              href="#/omni-img"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('#/omni-img');
              }}
              className="block py-2 text-rose-600 dark:text-rose-400"
            >
              OmniIMG Companion
            </a>
          </div>
        )}
      </header>

      {/* Main Content Router mapped to Google-Friendly subpages */}
      <main className="flex-1">
        {/* Subpage: Specific Tool Landing Page */}
        {selectedTool ? (
          <ToolLandingPage
            tool={selectedTool}
            onNavigateHome={() => navigateTo('#/')}
            onSelectTool={(t) => navigateTo(`#/tool/${t.slug}`)}
          />
        ) : currentRoute === '#/app-details' ||
          currentRoute === '#/details' ||
          currentRoute === '#/specs' ||
          currentRoute === '#/overview' ? (
          <AppDetailsPage
            onNavigateHome={() => navigateTo('#/')}
            onSelectTool={(slug) => navigateTo(`#/tool/${slug}`)}
            onNavigateToSecurity={() => navigateTo('#/security')}
            onNavigateToPricing={() => navigateTo('#/pricing')}
          />
        ) : currentRoute === '#/pricing' ? (
          <PricingPage
            onGetStarted={() => setIsPremiumOpen(true)}
            onContactSales={() => navigateTo('#/contact')}
          />
        ) : currentRoute === '#/features' || currentRoute === '#/tools' ? (
          <FeaturesPage
            onSelectCategory={(catId) => {
              setActiveCategory(catId as any);
              navigateTo('#/');
            }}
            onSelectTool={(slug) => navigateTo(`#/tool/${slug}`)}
            onNavigateHome={() => navigateTo('#/')}
          />
        ) : currentRoute === '#/security' ? (
          <SecurityPage onNavigateHome={() => navigateTo('#/')} />
        ) : currentRoute === '#/solutions/business' ? (
          <SolutionsPage
            type="business"
            onNavigateHome={() => navigateTo('#/')}
            onContactSales={() => navigateTo('#/contact')}
          />
        ) : currentRoute === '#/solutions/education' ? (
          <SolutionsPage
            type="education"
            onNavigateHome={() => navigateTo('#/')}
            onContactSales={() => navigateTo('#/contact')}
          />
        ) : currentRoute === '#/faq' ? (
          <FAQPage onNavigateHome={() => navigateTo('#/')} />
        ) : currentRoute === '#/privacy' ||
          currentRoute === '#/terms' ||
          currentRoute === '#/cookies' ? (
          <LegalPage
            initialTab={currentRoute.replace('#/', '') as any}
            onNavigateHome={() => navigateTo('#/')}
          />
        ) : currentRoute === '#/about' ? (
          <AboutPage
            onNavigateHome={() => navigateTo('#/')}
            onContactSales={() => navigateTo('#/contact')}
          />
        ) : currentRoute === '#/contact' ? (
          <ContactPage onNavigateHome={() => navigateTo('#/')} />
        ) : currentRoute === '#/omni-img' ? (
          <OmniImgPage onNavigateHome={() => navigateTo('#/')} />
        ) : currentRoute === '#/desktop' ? (
          <DesktopMobilePage
            type="desktop"
            onNavigateHome={() => navigateTo('#/')}
            onNavigateToAppDetails={() => navigateTo('#/app-details')}
          />
        ) : currentRoute === '#/mobile' ? (
          <DesktopMobilePage
            type="mobile"
            onNavigateHome={() => navigateTo('#/')}
            onNavigateToAppDetails={() => navigateTo('#/app-details')}
          />
        ) : (
          /* Default Main Home Dashboard */
          <div className="space-y-16">
            {/* Top Workspace Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
              {/* Search & Hero Section */}
              <div className="text-center max-w-3xl mx-auto pt-2 pb-2 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ISO 27001 Certified • Powered by WebAssembly & Gemini 2.5</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                  Every tool you need to work with PDFs in one place
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm sm:leading-relaxed max-w-2xl mx-auto">
                  Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to
                  use! Merge, split, compress, convert, rotate, unlock, and watermark PDFs with just a
                  few clicks.
                </p>

                {/* Global Search Bar */}
                <div className="relative max-w-xl mx-auto pt-2">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search among 70+ PDF tools (e.g. merge, word, sign, ai, compress)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Navigation Pills */}
              <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All Tools ({TOOLS.length})
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name} ({TOOLS.filter((t) => t.category === cat.id).length})
                  </button>
                ))}
              </div>

              {/* Tools Grid Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Showing {filteredTools.length} tools</span>
                  {activeCategory !== 'all' && (
                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                      Category: {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                    </span>
                  )}
                </div>

                {filteredTools.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      No tools match "{searchQuery}"
                    </p>
                    <p className="text-xs text-slate-400 mb-4">
                      Try searching for 'merge', 'protect', 'convert', or 'ai'
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={() => navigateTo(`#/tool/${tool.slug}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* PromoBanner (Screenshot: "Get more with Premium" warm cream banner) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PromoBanner onGetPremium={() => setIsPremiumOpen(true)} />
            </div>

            {/* SisterAppBanner (Screenshot: "Image editing made simple with OmniIMG") */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SisterAppBanner onNavigateToImg={() => navigateTo('#/omni-img')} />
            </div>

            {/* TrustSection (Screenshot: "The PDF software trusted by millions of users" with ISO 27001, SSL) */}
            <TrustSection />
          </div>
        )}
      </main>

      {/* Comprehensive GoogleFriendlyFooter matching the user's reference screenshot */}
      <GoogleFriendlyFooter
        onNavigate={(route) => navigateTo(route)}
        onOpenLanguage={() => setIsLanguageOpen(true)}
        currentLanguage={currentLanguage}
      />

      {/* Global Modals */}
      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
      />

      <AuthModal
        isOpen={authModalConfig.isOpen}
        initialMode={authModalConfig.mode}
        onClose={() => setAuthModalConfig({ ...authModalConfig, isOpen: false })}
        onSuccess={(email) => {
          setCurrentUser(email);
        }}
      />

      <LanguageModal
        isOpen={isLanguageOpen}
        currentLanguage={currentLanguage}
        onClose={() => setIsLanguageOpen(false)}
        onSelectLanguage={(lang) => setCurrentLanguage(lang)}
      />

      <GoogleDriveModal
        isOpen={isGlobalDriveOpen}
        onClose={() => setIsGlobalDriveOpen(false)}
        mode="import"
        onSelectFile={(file) => {
          const defaultTool = TOOLS.find((t) => t.id === 'organize-pdf') || TOOLS[0];
          navigateTo(`#/tool/${defaultTool.slug}`);
        }}
      />
    </div>
  );
}
