/**
 * SEO Utilities and Metadata Generator
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  canonical
}: SEOMetadata) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://youtubeseo.app';
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonical || baseUrl,
      siteName: 'YouTube SEO Tool',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    alternates: {
      canonical: canonical || baseUrl
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateSoftwareApplicationSchema(tool: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: tool.price || '0',
      priceCurrency: 'USD'
    },
    operatingSystem: 'Web',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  };
}

export function generateHowToSchema(steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image || '/og-image.jpg'
  };
}

export const primaryKeywords = [
  'youtube seo tools',
  'free youtube tag generator',
  'youtube keyword research',
  'youtube seo score checker',
  'ai title generator',
  'youtube description generator',
  'trending youtube video ideas',
  'channel analyzer',
  'rank youtube videos fast'
];

export const secondaryKeywords = [
  'vidIQ alternative',
  'best youtube seo tool',
  'keyword difficulty checker',
  'long-tail youtube keywords',
  'youtube growth tool',
  'video optimization tool',
  'youtube analytics tool',
  'content strategy tool'
];
