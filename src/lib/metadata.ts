/**
 * Centralized Metadata Configuration for All Pages
 */

import { Metadata } from 'next';

const baseUrl = 'https://youtubeseo.app';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    template: '%s | YouTube SEO Tool'
  },
  description: 'AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer.',
  keywords: [
    'youtube seo tools',
    'free youtube tag generator',
    'youtube keyword research',
    'youtube seo score checker',
    'ai title generator',
    'youtube description generator',
    'trending youtube video ideas',
    'channel analyzer',
    'rank youtube videos fast',
    'vidIQ alternative',
    'best youtube seo tool',
    'keyword difficulty checker',
    'long-tail youtube keywords'
  ],
  authors: [{ name: 'YouTube SEO Tool Team' }],
  creator: 'YouTube SEO Tool',
  publisher: 'YouTube SEO Tool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'YouTube SEO Tool',
    title: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    description: 'AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YouTube SEO Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best YouTube SEO Tool for Keywords, Tags & Video Ranking',
    description: 'AI-Powered YouTube SEO Tool to grow your channel faster. Free keyword research, tag generator, title optimizer, and video analyzer.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code'
  }
};

export const toolPageMetadata = {
  keywordResearch: {
    title: 'YouTube Keyword Research Tool - Find High-Ranking Keywords',
    description: 'AI-powered YouTube keyword research tool. Find low competition keywords, search volume, and difficulty scores. Free keyword analyzer for video SEO.',
    keywords: ['youtube keyword research', 'keyword difficulty', 'search volume youtube', 'keyword tool', 'seo keywords'],
    canonical: `${baseUrl}/keyword-research`
  },
  tagGenerator: {
    title: 'Free YouTube Tag Generator - 30-50 Optimized Tags Instantly',
    description: 'Generate 30-50 optimized YouTube tags instantly. Short tags, long-tail tags, and LSI keywords. AI-powered tag generator for better rankings.',
    keywords: ['youtube tag generator', 'video tags', 'free tag generator', 'youtube tags', 'tag optimization'],
    canonical: `${baseUrl}/tag-generator`
  },
  titleGenerator: {
    title: 'Viral YouTube Title Generator - AI-Powered Click-Worthy Titles',
    description: 'Create viral YouTube titles with AI. Generate emotion-based, curiosity-driven titles that boost CTR and views. Free title generator tool.',
    keywords: ['youtube title generator', 'viral titles', 'click-worthy titles', 'title ideas', 'video titles'],
    canonical: `${baseUrl}/title-generator`
  },
  descriptionGenerator: {
    title: 'YouTube Description Generator - SEO Optimized Descriptions',
    description: 'Generate SEO-optimized YouTube descriptions with keywords, timestamps, and CTAs. AI-powered description writer for better rankings.',
    keywords: ['youtube description generator', 'video description', 'seo description', 'description template'],
    canonical: `${baseUrl}/description-generator`
  },
  channelAnalyzer: {
    title: 'YouTube Channel Analyzer - Analyze Any Channel Without Login',
    description: 'Analyze any YouTube channel without login. Get subscriber count, views, engagement metrics, and competitor insights. Free channel analyzer.',
    keywords: ['youtube channel analyzer', 'channel stats', 'competitor analysis', 'channel insights', 'youtube analytics'],
    canonical: `${baseUrl}/channel-analyzer`
  },
  videoAnalyzer: {
    title: 'YouTube Video Analyzer - Improve SEO & CTR Instantly',
    description: 'Analyze YouTube videos and get SEO scores, improvement suggestions, and optimization tips. Free video analyzer with AI insights.',
    keywords: ['youtube video analyzer', 'video seo', 'seo score', 'video optimization', 'ctr improvement'],
    canonical: `${baseUrl}/video-analyzer`
  },
  trendingTopics: {
    title: 'YouTube Trending Topics Finder - Discover What\'s Trending Now',
    description: 'Find trending YouTube topics and predict what\'s coming next. AI-powered trend analysis for content creators.',
    keywords: ['trending topics', 'youtube trends', 'trending videos', 'content ideas', 'viral topics'],
    canonical: `${baseUrl}/trending-topics`
  },
  videoIdeas: {
    title: 'YouTube Video Ideas Generator - Personalized Content Ideas',
    description: 'Get personalized YouTube video ideas based on your niche and competitors. AI-powered content idea generator.',
    keywords: ['video ideas', 'content ideas', 'youtube ideas', 'video suggestions', 'content strategy'],
    canonical: `${baseUrl}/video-ideas`
  }
};

export function generateToolMetadata(tool: keyof typeof toolPageMetadata): Metadata {
  const toolMeta = toolPageMetadata[tool];
  
  return {
    ...defaultMetadata,
    title: toolMeta.title,
    description: toolMeta.description,
    keywords: toolMeta.keywords,
    alternates: {
      canonical: toolMeta.canonical
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: toolMeta.title,
      description: toolMeta.description,
      url: toolMeta.canonical
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: toolMeta.title,
      description: toolMeta.description
    }
  };
}
