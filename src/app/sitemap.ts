/**
 * Dynamic Sitemap Generator
 * Automatically generates XML sitemap for Google indexing
 */

import { MetadataRoute } from 'next';

// Blog articles metadata
const blogArticles = [
  { slug: 'youtube-seo-guide-2024', date: '2024-01-15' },
  { slug: 'youtube-algorithm-explained', date: '2024-01-12' },
  { slug: 'viral-video-title-formulas', date: '2024-01-10' },
  { slug: 'youtube-tags-best-practices', date: '2024-01-08' },
  { slug: 'grow-youtube-channel-fast', date: '2024-01-05' },
  { slug: 'youtube-thumbnail-design', date: '2024-01-03' },
  { slug: 'keyword-research-youtube', date: '2024-01-01' },
  { slug: 'youtube-analytics-guide', date: '2023-12-28' },
  { slug: 'youtube-seo-checklist-2024', date: '2024-01-18' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://youtubeseo.app';
  const currentDate = new Date().toISOString();

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/keyword-research`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tag-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/title-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/description-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/video-analyzer`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/channel-analyzer`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending-topics`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/video-ideas`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Blog article pages
  const blogPages = blogArticles.map(article => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogPages];
}