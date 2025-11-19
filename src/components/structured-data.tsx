/**
 * Structured Data (JSON-LD) Component
 * Renders schema.org markup for better Google search appearance
 */

import Script from 'next/script';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...schema,
            }),
          }}
          strategy="beforeInteractive"
        />
      ))}
    </>
  );
}

export function WebsiteStructuredData() {
  return (
    <StructuredData
      data={{
        '@type': 'WebSite',
        '@id': 'https://youtubeseo.app/#website',
        url: 'https://youtubeseo.app',
        name: 'YouTube SEO Tool',
        description: 'Best free YouTube SEO tool for keywords, tags, and video ranking. AI-powered optimization.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://youtubeseo.app/keyword-research?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function OrganizationStructuredData() {
  return (
    <StructuredData
      data={{
        '@type': 'Organization',
        '@id': 'https://youtubeseo.app/#organization',
        name: 'YouTube SEO Tool',
        url: 'https://youtubeseo.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://youtubeseo.app/logo.png',
        },
        sameAs: [
          'https://twitter.com/youtubeseo',
          'https://facebook.com/youtubeseo',
        ],
      }}
    />
  );
}

export function SoftwareAppStructuredData({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <StructuredData
      data={{
        '@type': 'SoftwareApplication',
        name,
        operatingSystem: 'Web Browser',
        applicationCategory: 'BusinessApplication',
        url,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '5000',
        },
      }}
    />
  );
}

export function FAQStructuredData({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <StructuredData
      data={{
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function HowToStructuredData({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return (
    <StructuredData
      data={{
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          text: step,
        })),
      }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  return (
    <StructuredData
      data={{
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return (
    <StructuredData
      data={{
        '@type': 'Article',
        headline: title,
        description,
        url,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Person',
          name: author || 'YouTube SEO Tool Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'YouTube SEO Tool',
          logo: {
            '@type': 'ImageObject',
            url: 'https://youtubeseo.app/logo.png',
          },
        },
      }}
    />
  );
}