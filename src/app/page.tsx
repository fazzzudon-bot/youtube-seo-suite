"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search,
  Tag,
  FileText,
  Heading,
  BarChart3,
  Video,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WebsiteStructuredData, OrganizationStructuredData, FAQStructuredData } from "@/components/structured-data"
import { FAQSection } from "@/components/faq-section"

const tools = [
  {
    title: "Keyword Research",
    description: "Find high-ranking YouTube keywords with AI-powered difficulty scores",
    icon: Search,
    href: "/keyword-research",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Tag Generator",
    description: "Generate 30-50 optimized tags including short, long-tail, and LSI tags",
    icon: Tag,
    href: "/tag-generator",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Title Generator",
    description: "Create viral, emotion-based titles that drive clicks and views",
    icon: Heading,
    href: "/title-generator",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Description Generator",
    description: "YouTube-optimized descriptions with keywords and chapter timestamps",
    icon: FileText,
    href: "/description-generator",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Channel Analyzer",
    description: "Analyze any channel without login - find opportunities and weaknesses",
    icon: BarChart3,
    href: "/channel-analyzer",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    title: "Video Analyzer",
    description: "Improve SEO & CTR instantly with detailed video analysis",
    icon: Video,
    href: "/video-analyzer",
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "Trending Topics",
    description: "Discover trending topics and predict what's coming next",
    icon: TrendingUp,
    href: "/trending-topics",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "Video Ideas",
    description: "Get personalized video ideas based on your niche and competitors",
    icon: Lightbulb,
    href: "/video-ideas",
    color: "bg-cyan-500/10 text-cyan-500",
  },
]

const features = [
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Gemini AI analyzes trends and provides strategic recommendations",
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    description: "Find gaps in competitor strategies and exploit opportunities",
  },
  {
    icon: Trophy,
    title: "Rank Faster",
    description: "Optimize every aspect of your content to rank higher on YouTube",
  },
]

const stats = [
  { value: "500K+", label: "Videos Analyzed" },
  { value: "50K+", label: "Channels Tracked" },
  { value: "1M+", label: "Keywords Researched" },
  { value: "98%", label: "Success Rate" },
]

export default function Home() {
  return (
    <>
      <WebsiteStructuredData />
      <OrganizationStructuredData />
      <FAQStructuredData 
        faqs={[
          {
            question: "What is YouTube SEO?",
            answer: "YouTube SEO is the process of optimizing your videos, channel, and playlists to rank higher in YouTube's search results. It involves keyword research, optimizing titles, descriptions, tags, and improving engagement metrics."
          },
          {
            question: "How does this YouTube SEO tool help?",
            answer: "Our AI-powered tool helps you find the best keywords, generate optimized tags, create viral titles, write SEO-friendly descriptions, and analyze your competition - all for free."
          },
          {
            question: "Is this tool really free?",
            answer: "Yes! All our core features are 100% free. No credit card required, no hidden fees. We believe in helping creators grow their channels."
          },
          {
            question: "Do I need to login to use the tools?",
            answer: "No login required! You can use all our tools immediately without creating an account. Simply visit any tool page and start optimizing."
          },
        ]}
      />
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 px-4 sm:px-6 py-12 sm:py-20 md:py-32">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge className="mb-4" variant="secondary">
                <Zap className="mr-1 h-3 w-3" />
                Free YouTube SEO Tool
              </Badge>
              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight px-2">
                Best YouTube SEO Tool for
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Keywords, Tags & Video Ranking
                </span>
              </h1>
              <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                AI-Powered Tools to Grow Your YouTube Channel Faster. Free keyword research, tag
                generator, title optimizer, and comprehensive video analytics.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/keyword-research">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Why Choose Our YouTube SEO Tool?
              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground px-4">
                The best vidIQ alternative with AI-powered insights and comprehensive analytics
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-12 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Complete YouTube SEO Toolkit
              </h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground px-4">
                Everything you need to optimize your content and grow your channel
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={tool.href}>
                    <Card className="group h-full transition-all hover:shadow-lg">
                      <CardHeader>
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${tool.color}`}>
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-base sm:text-lg">{tool.title}</CardTitle>
                        <CardDescription className="text-sm">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                          Try it free
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="border-t bg-muted/50 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Start Ranking Your Videos Today
            </h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground px-4">
              Join thousands of creators who are growing their channels with our free tools
            </p>
            <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">AI-Powered</span>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/keyword-research">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t px-4 sm:px-6 py-8 sm:py-12">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Tools</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/keyword-research" className="hover:text-foreground">Keyword Research</Link></li>
                  <li><Link href="/tag-generator" className="hover:text-foreground">Tag Generator</Link></li>
                  <li><Link href="/title-generator" className="hover:text-foreground">Title Generator</Link></li>
                  <li><Link href="/description-generator" className="hover:text-foreground">Description Generator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Analytics</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/channel-analyzer" className="hover:text-foreground">Channel Analyzer</Link></li>
                  <li><Link href="/video-analyzer" className="hover:text-foreground">Video Analyzer</Link></li>
                  <li><Link href="/trending-topics" className="hover:text-foreground">Trending Topics</Link></li>
                  <li><Link href="/video-ideas" className="hover:text-foreground">Video Ideas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Resources</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                  <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">About</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  The best free YouTube SEO tool for creators. Powered by AI to help you rank faster and grow your channel.
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} YouTube SEO Tool. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}