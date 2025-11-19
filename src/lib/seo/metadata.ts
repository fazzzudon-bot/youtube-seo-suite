import { Metadata } from "next"

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = "/og-image.png",
    noindex = false,
  } = config

  const fullTitle = `${title} | YouTube SEO Tool`
  const url = canonical || "https://youtubeseo.com"

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    robots: noindex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "YouTube SEO Tool",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@youtubeseo",
    },
    other: {
      "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  }
}

export function generateToolMetadata(toolName: string, description: string, keywords: string[]): Metadata {
  return generateSEOMetadata({
    title: `Free ${toolName}`,
    description: `${description} - AI-powered, 100% free YouTube SEO tool. No credit card required.`,
    keywords: [
      ...keywords,
      "youtube seo",
      "free youtube tools",
      "youtube optimization",
      "vidiq alternative",
      toolName.toLowerCase(),
    ],
    canonical: `/${toolName.toLowerCase().replace(/\s+/g, "-")}`,
  })
}
