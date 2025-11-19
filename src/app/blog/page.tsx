"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, ArrowRight, Filter } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const articles = [
  {
    slug: "youtube-seo-checklist-2024",
    title: "Complete YouTube SEO Checklist 2024",
    description: "The ultimate YouTube SEO checklist for 2024. Follow these proven steps to optimize your videos for maximum views and engagement.",
    category: "SEO",
    readTime: "15 min read",
    date: "2024-01-18",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
  },
  {
    slug: "best-youtube-thumbnail-size",
    title: "YouTube Thumbnail Size 2024: Best Dimensions & Design Tips",
    description: "Complete guide to YouTube thumbnail size including dimensions (1280x720), format requirements, and design best practices for maximum CTR.",
    category: "Design",
    readTime: "12 min read",
    date: "2024-01-20",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
  },
  {
    slug: "youtube-seo-guide-2024",
    title: "Complete YouTube SEO Guide for 2024",
    description: "Master YouTube SEO with our comprehensive guide covering keywords, tags, titles, and descriptions.",
    category: "SEO",
    readTime: "15 min read",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
  },
  {
    slug: "youtube-algorithm-explained",
    title: "How the YouTube Algorithm Works in 2024",
    description: "Understand YouTube's recommendation algorithm and how to optimize your content for maximum reach.",
    category: "Algorithm",
    readTime: "12 min read",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    slug: "viral-video-title-formulas",
    title: "10 Viral Video Title Formulas That Actually Work",
    description: "Proven title formulas used by top creators to get millions of views on YouTube.",
    category: "Growth",
    readTime: "8 min read",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    slug: "youtube-tags-best-practices",
    title: "YouTube Tags: Best Practices and Common Mistakes",
    description: "Learn how to use tags effectively and avoid common mistakes that hurt your rankings.",
    category: "SEO",
    readTime: "10 min read",
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80"
  },
  {
    slug: "grow-youtube-channel-fast",
    title: "How to Grow Your YouTube Channel from 0 to 10K Subscribers",
    description: "Step-by-step strategy to grow your channel quickly and organically in 2024.",
    category: "Growth",
    readTime: "18 min read",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
  },
  {
    slug: "youtube-thumbnail-design",
    title: "Creating Click-Worthy YouTube Thumbnails",
    description: "Design principles and tools to create thumbnails that drive clicks and views.",
    category: "Design",
    readTime: "11 min read",
    date: "2024-01-03",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
  },
  {
    slug: "keyword-research-youtube",
    title: "YouTube Keyword Research: Find Low Competition Keywords",
    description: "Advanced techniques to find keywords that are easy to rank for on YouTube.",
    category: "SEO",
    readTime: "14 min read",
    date: "2024-01-01",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
  },
  {
    slug: "youtube-analytics-guide",
    title: "Understanding YouTube Analytics: Key Metrics to Track",
    description: "Learn which metrics matter and how to use analytics to grow your channel.",
    category: "Analytics",
    readTime: "13 min read",
    date: "2023-12-28",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  }
]

const categories = ["All", "SEO", "Growth", "Design", "Algorithm", "Analytics"]

const faqs = [
  {
    question: "How often should I post on YouTube to improve SEO?",
    answer: "Consistency is more important than frequency. Aim for at least 1-2 high-quality videos per week. Regular uploads signal to YouTube's algorithm that your channel is active, which can improve your rankings. However, quality should never be sacrificed for quantity."
  },
  {
    question: "What's the ideal video length for YouTube SEO?",
    answer: "While there's no perfect length, videos between 7-15 minutes tend to perform well because they allow for sufficient ad placement and good watch time. However, the content should dictate the length - don't artificially extend or cut videos. Focus on keeping viewers engaged throughout."
  },
  {
    question: "How important are tags compared to titles and descriptions?",
    answer: "Tags are less important than titles and descriptions but still valuable. They help YouTube understand your content's context. Use 30-50 tags including your target keyword, variations, and related terms. Titles and descriptions have more weight in YouTube's algorithm."
  },
  {
    question: "Can I use the same keywords for multiple videos?",
    answer: "Yes, but be strategic. You can target the same keyword from different angles (tutorials, reviews, comparisons). However, avoid creating very similar videos that compete with each other. Instead, focus on creating a content cluster around related topics."
  },
  {
    question: "How long does it take to see SEO results on YouTube?",
    answer: "SEO results typically take 1-3 months to become visible. YouTube needs time to understand your content and test it with different audiences. Continue optimizing, stay consistent, and monitor your analytics. Some videos may rank quickly, while others take longer."
  },
  {
    question: "Should I change old video titles and descriptions?",
    answer: "Yes, updating old content can improve performance. Use your analytics to identify underperforming videos, then optimize their titles, descriptions, and tags. Be careful not to change them too drastically or too frequently, as this can confuse the algorithm."
  },
  {
    question: "What's the best way to research competitor keywords?",
    answer: "Use YouTube's search suggestions, analyze successful videos in your niche, check their tags (using browser extensions), and use keyword research tools. Look for gaps in their content and opportunities to create better, more comprehensive videos on similar topics."
  },
  {
    question: "How do I optimize for YouTube's suggested videos?",
    answer: "Create content series and playlists, use consistent branding, optimize for watch time, and engage with your audience. When viewers watch multiple videos in one session, YouTube is more likely to suggest your content to similar audiences."
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            YouTube SEO Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert tips, strategies, and guides to grow your YouTube channel and rank higher in search results
          </p>
        </div>

        {/* Search & Filter */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-primary/20">
            <div className="md:flex">
              <div className="md:w-1/2 relative overflow-hidden group">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="mb-3 w-fit">✨ Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-primary transition-colors">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {filteredArticles[0].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(filteredArticles[0].date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {filteredArticles[0].readTime}
                  </div>
                  <Badge variant="outline">{filteredArticles[0].category}</Badge>
                </div>
                <Link
                  href={`/blog/${filteredArticles[0].slug}`}
                  className="inline-flex items-center text-primary hover:underline font-semibold group"
                >
                  Read Full Article
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* Results Count */}
        {filteredArticles.length > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredArticles.length - 1} {filteredArticles.length - 1 === 1 ? 'article' : 'articles'}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 1 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.slice(1).map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden border-muted hover:border-primary/50">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </CardContent>
          </Card>
        ) : null}

        {/* FAQ Section */}
        <div className="mt-16 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about YouTube SEO and growing your channel
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="py-12 text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Optimize Your YouTube Videos?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our free AI-powered tools to generate optimized titles, tags, and descriptions for your videos
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/title-generator">
                <Badge className="px-6 py-2 text-sm cursor-pointer hover:bg-primary/90 transition-colors">
                  🎯 Title Generator
                </Badge>
              </Link>
              <Link href="/tag-generator">
                <Badge className="px-6 py-2 text-sm cursor-pointer hover:bg-primary/90 transition-colors">
                  🏷️ Tag Generator
                </Badge>
              </Link>
              <Link href="/keyword-research">
                <Badge className="px-6 py-2 text-sm cursor-pointer hover:bg-primary/90 transition-colors">
                  🔍 Keyword Research
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}