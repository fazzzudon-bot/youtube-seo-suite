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
  Star,
  Quote,
  Users,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    description: "Gemini AI analyzes trends and provides strategic recommendations tailored to your content",
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    description: "Find gaps in competitor strategies and discover untapped opportunities in your niche",
  },
  {
    icon: Trophy,
    title: "Rank Faster",
    description: "Optimize every aspect of your content to rank higher on YouTube and get more views",
  },
  {
    icon: Users,
    title: "Built by Creators",
    description: "Designed by YouTubers who understand the challenges you face growing your channel",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate hours of research work with AI that does the heavy lifting for you",
  },
  {
    icon: Shield,
    title: "Always Free",
    description: "No credit card required, no hidden fees. We're committed to helping creators succeed",
  },
]

const stats = [
  { value: "500K+", label: "Videos Analyzed" },
  { value: "50K+", label: "Channels Tracked" },
  { value: "1M+", label: "Keywords Researched" },
  { value: "98%", label: "Success Rate" },
]

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Tech YouTuber",
    channel: "TechWithSarah",
    subscribers: "145K",
    rating: 5,
    review: "This tool helped me grow from 50K to 145K subscribers in just 6 months! The keyword research is incredibly accurate and the AI-powered suggestions actually work. I've tried other tools before, but nothing compares to the insights I get here.",
    date: "2 weeks ago",
  },
  {
    name: "Marcus Chen",
    role: "Gaming Creator",
    channel: "MarcusGaming",
    subscribers: "890K",
    rating: 5,
    review: "I've tried vidIQ and TubeBuddy, but this free tool gives better insights. The tag generator alone increased my CTR by 40%. Absolutely game-changing! My videos are now consistently ranking in the top 5 for my target keywords.",
    date: "1 month ago",
  },
  {
    name: "Emily Rodriguez",
    role: "Lifestyle Vlogger",
    channel: "EmilyDailyLife",
    subscribers: "320K",
    rating: 5,
    review: "The title generator is pure gold. My videos now consistently get 2-3x more views just by using the AI-suggested titles. Worth every penny... wait, it's FREE?! I can't believe how much value I'm getting without paying a dime.",
    date: "3 weeks ago",
  },
  {
    name: "David Thompson",
    role: "Educational Content",
    channel: "LearnWithDave",
    subscribers: "567K",
    rating: 5,
    review: "As someone who creates educational content, the SEO score feature helps me optimize every video. My videos now rank in the top 3 for my target keywords consistently. The competitor analysis feature saved me countless hours of manual research.",
    date: "2 months ago",
  },
  {
    name: "Priya Sharma",
    role: "Beauty & Fashion",
    channel: "PriyaBeauty",
    subscribers: "1.2M",
    rating: 5,
    review: "The trending topics finder is spot on! I've been able to create content about trends BEFORE they blow up. My channel growth went from 5K to 100K+ views per video. It's like having a crystal ball for YouTube trends.",
    date: "1 week ago",
  },
  {
    name: "Alex Rivera",
    role: "Finance YouTuber",
    channel: "MoneyMindset",
    subscribers: "430K",
    rating: 5,
    review: "I was skeptical at first, but the channel analyzer revealed gaps in my content strategy. Following the AI recommendations, I doubled my subscriber rate in 3 months. The tool pays for itself... oh wait, it's free! Best investment of time I've made.",
    date: "3 weeks ago",
  },
]

const trustSignals = [
  { icon: Users, label: "50,000+ Active Users" },
  { icon: Video, label: "500K+ Videos Optimized" },
  { icon: Trophy, label: "98% Success Rate" },
  { icon: Shield, label: "100% Free Forever" },
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
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-background to-muted/20 px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:py-40">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="container relative mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="mb-6 px-4 py-2 text-sm font-medium shadow-lg" variant="secondary">
                <Sparkles className="mr-2 h-4 w-4" />
                Free YouTube SEO Tool - No Login Required
              </Badge>
              <h1 className="mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight px-2">
                Grow Your YouTube Channel
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                  With AI-Powered SEO Tools
                </span>
              </h1>
              <p className="mx-auto mb-8 sm:mb-10 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground px-4 leading-relaxed">
                Everything you need to rank higher on YouTube. Free keyword research, tag generator, 
                title optimizer, and comprehensive analytics. Built by creators, for creators.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mb-12">
                <Button size="lg" asChild className="w-full sm:w-auto text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  <Link href="/keyword-research">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base px-8 py-6">
                  <Link href="#tools">
                    View All Tools
                  </Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
                {trustSignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <signal.icon className="h-4 w-4 text-primary" />
                    <span>{signal.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 sm:mt-20 grid grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b px-4 sm:px-6 py-16 sm:py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 sm:mb-16 text-center">
              <Badge className="mb-4" variant="outline">
                <Trophy className="mr-2 h-3 w-3" />
                Why Choose Us
              </Badge>
              <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                The Best vidIQ Alternative
              </h2>
              <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground px-4 leading-relaxed">
                Powerful AI-driven insights combined with comprehensive analytics. 
                Everything you need to grow your YouTube channel, completely free.
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <feature.icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 sm:mb-16 text-center">
              <Badge className="mb-4" variant="outline">
                <Zap className="mr-2 h-3 w-3" />
                All-in-One Solution
              </Badge>
              <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Complete YouTube SEO Toolkit
              </h2>
              <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground px-4 leading-relaxed">
                From keyword research to video analytics, we've got every tool you need 
                to optimize your content and dominate YouTube search results.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={tool.href}>
                    <Card className="group h-full transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-primary/30">
                      <CardHeader>
                        <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${tool.color} transition-transform group-hover:scale-110`}>
                          <tool.icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl">{tool.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
                          Try it free
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="border-t bg-muted/30 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 sm:mb-16 text-center">
              <Badge className="mb-4" variant="secondary">
                <Star className="mr-2 h-4 w-4 fill-current" />
                Trusted by 50,000+ Creators
              </Badge>
              <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Real Results From Real Creators
              </h2>
              <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground px-4 leading-relaxed">
                See how successful YouTubers are using our free SEO tools to grow their channels 
                and get millions of views.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                              {review.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base sm:text-lg">{review.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">{review.role}</p>
                            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                              {review.subscribers} subscribers
                            </p>
                          </div>
                        </div>
                        <Quote className="h-8 w-8 text-muted-foreground/20 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        "{review.review}"
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {review.channel}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <section className="border-t bg-gradient-to-b from-muted/50 to-background px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-6" variant="secondary">
              <Sparkles className="mr-2 h-4 w-4" />
              Start Growing Today
            </Badge>
            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Ready to Rank Your Videos?
            </h2>
            <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl text-muted-foreground px-4 leading-relaxed">
              Join thousands of successful creators who are growing their channels with our free AI-powered tools. 
              No credit card required. Start optimizing your content in seconds.
            </p>
            <div className="mb-10 flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">No Credit Card Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">AI-Powered Results</span>
              </div>
            </div>
            <Button size="lg" asChild className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Link href="/keyword-research">
                Start Optimizing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t px-4 sm:px-6 py-12 sm:py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-8 sm:gap-10 grid-cols-2 lg:grid-cols-4 mb-10">
              <div className="col-span-2 lg:col-span-1">
                <h3 className="mb-4 text-lg font-bold">YouTube SEO Tool</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The best free YouTube SEO tool for creators. Powered by AI to help you rank faster and grow your channel.
                </p>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-sm sm:text-base">Tools</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/keyword-research" className="hover:text-foreground transition-colors">Keyword Research</Link></li>
                  <li><Link href="/tag-generator" className="hover:text-foreground transition-colors">Tag Generator</Link></li>
                  <li><Link href="/title-generator" className="hover:text-foreground transition-colors">Title Generator</Link></li>
                  <li><Link href="/description-generator" className="hover:text-foreground transition-colors">Description Generator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-sm sm:text-base">Analytics</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/channel-analyzer" className="hover:text-foreground transition-colors">Channel Analyzer</Link></li>
                  <li><Link href="/video-analyzer" className="hover:text-foreground transition-colors">Video Analyzer</Link></li>
                  <li><Link href="/trending-topics" className="hover:text-foreground transition-colors">Trending Topics</Link></li>
                  <li><Link href="/video-ideas" className="hover:text-foreground transition-colors">Video Ideas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-sm sm:text-base">Resources</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                  <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-xs sm:text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} YouTube SEO Tool. All rights reserved. Built with ❤️ for creators.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}