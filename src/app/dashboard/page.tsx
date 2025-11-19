"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Video, 
  FileText, 
  Tag, 
  Search, 
  BarChart3,
  Sparkles,
  Target,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const tools = [
    {
      title: "Keyword Research",
      description: "Find high-ranking YouTube keywords with AI-powered difficulty scoring",
      icon: Search,
      href: "/keyword-research",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Tag Generator",
      description: "Generate 30-50 optimized tags including short, long-tail, and LSI tags",
      icon: Tag,
      href: "/tag-generator",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Title Generator",
      description: "Create viral, emotion-based, and curiosity-driven video titles",
      icon: Sparkles,
      href: "/title-generator",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      title: "Description Generator",
      description: "Generate SEO-optimized descriptions with keywords and timestamps",
      icon: FileText,
      href: "/description-generator",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      title: "Video Analyzer",
      description: "Analyze any video's SEO score and get improvement suggestions",
      icon: Video,
      href: "/video-analyzer",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      title: "Channel Analyzer",
      description: "Analyze competitor channels and discover opportunity keywords",
      icon: BarChart3,
      href: "/channel-analyzer",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20"
    },
    {
      title: "Trending Topics",
      description: "Discover trending topics and predict future content opportunities",
      icon: TrendingUp,
      href: "/trending-topics",
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-950/20"
    },
    {
      title: "Video Ideas",
      description: "Get personalized video ideas based on your niche and trending topics",
      icon: Lightbulb,
      href: "/video-ideas",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    }
  ]

  const stats = [
    {
      title: "Tools Available",
      value: "8",
      description: "AI-powered SEO tools",
      icon: Target
    },
    {
      title: "Success Rate",
      value: "95%",
      description: "User satisfaction",
      icon: TrendingUp
    },
    {
      title: "Time Saved",
      value: "10hrs",
      description: "Average per week",
      icon: Sparkles
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">YouTube SEO Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Powerful AI tools to grow your YouTube channel faster
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Available Tools</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-3`}>
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{tool.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-xs sm:text-sm">
                      Launch Tool →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Quick Tips for YouTube Growth</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Best practices to maximize your channel's performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">1</span>
                <span><strong>Research keywords first:</strong> Use our Keyword Research tool before creating content to find high-opportunity topics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">2</span>
                <span><strong>Optimize titles:</strong> Include your main keyword naturally within the first 50 characters</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">3</span>
                <span><strong>Use strategic tags:</strong> Mix short tags, long-tail keywords, and LSI tags for maximum reach</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">4</span>
                <span><strong>Write detailed descriptions:</strong> Include keywords naturally in the first 150 characters</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">5</span>
                <span><strong>Analyze competitors:</strong> Use Channel Analyzer to find gaps and opportunities in your niche</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">6</span>
                <span><strong>Stay consistent:</strong> Upload regularly and use trending topics to capitalize on viral potential</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}