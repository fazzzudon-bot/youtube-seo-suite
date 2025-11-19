import { WebSite, Organization, SoftwareApplication, BreadcrumbList, FAQPage, HowTo } from "schema-dts"

export function generateWebsiteSchema(): WebSite {
  return {
    "@type": "WebSite",
    "@id": "https://youtubeseo.com/#website",
    url: "https://youtubeseo.com",
    name: "YouTube SEO Tool",
    description: "Best free YouTube SEO tool for keywords, tags, and video ranking. AI-powered optimization.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://youtubeseo.com/keyword-research?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateOrganizationSchema(): Organization {
  return {
    "@type": "Organization",
    "@id": "https://youtubeseo.com/#organization",
    name: "YouTube SEO Tool",
    url: "https://youtubeseo.com",
    logo: "https://youtubeseo.com/logo.png",
    sameAs: [
      "https://twitter.com/youtubeseo",
      "https://facebook.com/youtubeseo",
    ],
  }
}

export function generateSoftwareAppSchema(toolName: string, description: string): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    name: toolName,
    operatingSystem: "Web Browser",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "5000",
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: string[]
): HowTo {
  return {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  }
}

export function wrapJsonLd(data: any) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      ...data,
    }),
  }
}
