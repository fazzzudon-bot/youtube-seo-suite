/**
 * SEO Head Component
 * Provides structured data and metadata for all pages
 */

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  structuredData?: object;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  structuredData,
  noindex = false
}: SEOHeadProps) {
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      {/* Additional meta tags can be added here if needed */}
    </>
  );
}

// Organization Schema for website-wide use
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "YouTube SEO Tool",
  url: "https://youtubeseo.app",
  logo: "https://youtubeseo.app/logo.png",
  description: "AI-Powered YouTube SEO Tool to grow your channel faster",
  sameAs: [
    "https://twitter.com/youtubeseotool",
    "https://facebook.com/youtubeseotool"
  ]
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "YouTube SEO Tool",
  url: "https://youtubeseo.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://youtubeseo.app/keyword-research?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
