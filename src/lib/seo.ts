export interface SEOData {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogType?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
}

/**
 * Dynamically updates document title, meta tags, and Schema.org JSON-LD structured data.
 * Keeps web crawlers (Googlebot, Bingbot) and social platforms updated with accurate content.
 */
export function updateSEO(data: SEOData): void {
  // 1. Update Title
  const siteSuffix = ' | OmniPDF Enterprise Suite';
  const fullTitle = data.title.includes('OmniPDF') ? data.title : `${data.title}${siteSuffix}`;
  document.title = fullTitle;

  // 2. Helper to set or create meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Standard Description & Keywords
  setMeta('description', data.description);
  if (data.keywords && data.keywords.length > 0) {
    setMeta('keywords', data.keywords.join(', '));
  }
  setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 4. OpenGraph Tags
  setMeta('og:title', fullTitle, true);
  setMeta('og:description', data.description, true);
  setMeta('og:type', data.ogType || 'website', true);
  setMeta('og:site_name', 'OmniPDF Suite', true);
  
  const currentUrl = window.location.href;
  setMeta('og:url', data.canonicalUrl || currentUrl, true);

  // 5. Twitter Card Tags
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', data.description);

  // 6. Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', data.canonicalUrl || currentUrl);

  // 7. Schema.org JSON-LD Structured Data
  let scriptEl = document.getElementById('omnipdf-ld-json') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'omnipdf-ld-json';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'OmniPDF Suite',
    url: window.location.origin,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description:
      'Enterprise online PDF suite with 70+ client-side tools for merging, splitting, compressing, converting, e-signing, and AI document processing.',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OmniPDF',
      url: window.location.origin,
      logo: `${window.location.origin}/logo.png`,
    },
  };

  const schemaToInject = data.structuredData
    ? Array.isArray(data.structuredData)
      ? [defaultSchema, ...data.structuredData]
      : [defaultSchema, data.structuredData]
    : defaultSchema;

  scriptEl.textContent = JSON.stringify(schemaToInject);
}
