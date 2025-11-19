/**
 * Dynamic SEO Metadata Generator
 * Automatically generates Google-optimized meta tags for all pages
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogType?: 'website' | 'article' | 'video.other';
  ogImage?: string;
  ogVideo?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'player';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export class MetadataGenerator {
  private baseUrl: string;
  private siteName: string;
  private defaultImage: string;
  private twitterHandle: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourseosite.com';
    this.siteName = 'YouTube SEO Tool - Best Free Video Optimization Platform';
    this.defaultImage = `${this.baseUrl}/og-image.png`;
    this.twitterHandle = '@youtubeseo';
  }

  generateMetadata(config: SEOConfig) {
    const {
      title,
      description,
      keywords = [],
      canonical,
      ogType = 'website',
      ogImage,
      ogVideo,
      twitterCard = 'summary_large_image',
      author,
      publishedTime,
      modifiedTime,
      noindex = false,
      nofollow = false,
    } = config;

    const fullTitle = title.includes('|') ? title : `${title} | ${this.siteName}`;
    const canonicalUrl = canonical || this.baseUrl;
    const imageUrl = ogImage || this.defaultImage;

    const metadata: any = {
      title: fullTitle,
      description,
      keywords: keywords.join(', '),
      authors: author ? [{ name: author }] : undefined,
      creator: this.siteName,
      publisher: this.siteName,
      robots: {
        index: !noindex,
        follow: !nofollow,
        googleBot: {
          index: !noindex,
          follow: !nofollow,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fullTitle,
        description,
        url: canonicalUrl,
        siteName: this.siteName,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type: ogType,
      },
      twitter: {
        card: twitterCard,
        title: fullTitle,
        description,
        images: [imageUrl],
        creator: this.twitterHandle,
        site: this.twitterHandle,
      },
    };

    // Add article-specific metadata
    if (ogType === 'article' && (publishedTime || modifiedTime)) {
      metadata.openGraph.publishedTime = publishedTime;
      metadata.openGraph.modifiedTime = modifiedTime;
      metadata.openGraph.authors = author ? [author] : undefined;
    }

    // Add video-specific metadata
    if (ogVideo) {
      metadata.openGraph.videos = [
        {
          url: ogVideo,
          secureUrl: ogVideo,
          type: 'video/mp4',
          width: 1280,
          height: 720,
        },
      ];
    }

    return metadata;
  }

  generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${this.baseUrl}${item.url}`,
      })),
    };
  }

  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      description: 'AI-powered YouTube SEO tool for keyword research, tag generation, title optimization, and video analytics.',
      sameAs: [
        'https://twitter.com/youtubeseo',
        'https://facebook.com/youtubeseo',
        'https://linkedin.com/company/youtubeseo',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@yourseosite.com',
      },
    };
  }

  generateWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.baseUrl,
      description: 'The best free YouTube SEO tool for creators. AI-powered keyword research, tag generator, title optimizer, and comprehensive video analytics.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/keyword-research?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  generateSoftwareApplicationSchema(toolName: string, description: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: toolName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '12450',
        bestRating: '5',
        worstRating: '1',
      },
    };
  }

  generateArticleSchema(config: {
    title: string;
    description: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
    url: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.title,
      description: config.description,
      image: config.image || this.defaultImage,
      datePublished: config.publishedTime,
      dateModified: config.modifiedTime || config.publishedTime,
      author: {
        '@type': 'Person',
        name: config.author,
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': config.url,
      },
    };
  }

  generateVideoObjectSchema(config: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: config.name,
      description: config.description,
      thumbnailUrl: config.thumbnailUrl,
      uploadDate: config.uploadDate,
      duration: config.duration,
      contentUrl: config.contentUrl,
    };
  }

  generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  generateHowToSchema(config: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string; image?: string }>;
    totalTime?: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: config.name,
      description: config.description,
      totalTime: config.totalTime,
      step: config.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image,
      })),
    };
  }
}

export const metadataGenerator = new MetadataGenerator();
