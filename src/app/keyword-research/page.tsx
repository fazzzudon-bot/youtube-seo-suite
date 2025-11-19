"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, TrendingUp, TrendingDown, Minus, Sparkles, Target, BarChart3, Zap } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function KeywordResearchPage() {
  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [animatedVolume, setAnimatedVolume] = useState(0)
  const [animatedDifficulty, setAnimatedDifficulty] = useState(0)
  const [animatedOpportunity, setAnimatedOpportunity] = useState(0)

  // Animate numbers when results change
  useEffect(() => {
    if (results) {
      const volumeTarget = results.volume || 0
      const difficultyTarget = results.difficulty || 50
      const opportunityTarget = results.opportunity || 75

      // Animate volume
      let volumeStart = 0
      const volumeInterval = setInterval(() => {
        volumeStart += volumeTarget / 30
        if (volumeStart >= volumeTarget) {
          setAnimatedVolume(volumeTarget)
          clearInterval(volumeInterval)
        } else {
          setAnimatedVolume(Math.floor(volumeStart))
        }
      }, 20)

      // Animate difficulty
      let difficultyStart = 0
      const difficultyInterval = setInterval(() => {
        difficultyStart += difficultyTarget / 30
        if (difficultyStart >= difficultyTarget) {
          setAnimatedDifficulty(difficultyTarget)
          clearInterval(difficultyInterval)
        } else {
          setAnimatedDifficulty(Math.floor(difficultyStart))
        }
      }, 20)

      // Animate opportunity
      let opportunityStart = 0
      const opportunityInterval = setInterval(() => {
        opportunityStart += opportunityTarget / 30
        if (opportunityStart >= opportunityTarget) {
          setAnimatedOpportunity(opportunityTarget)
          clearInterval(opportunityInterval)
        } else {
          setAnimatedOpportunity(Math.floor(opportunityStart))
        }
      }, 20)

      return () => {
        clearInterval(volumeInterval)
        clearInterval(difficultyInterval)
        clearInterval(opportunityInterval)
      }
    }
  }, [results])

  const handleSearch = async () => {
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/keyword-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-green-500"
    if (difficulty < 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getDifficultyBadge = (competition: string) => {
    const colors: Record<string, string> = {
      Low: "bg-green-500/10 text-green-500 border-green-500/20",
      Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      High: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return colors[competition] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="YouTube Keyword Research Tool"
        description="AI-powered YouTube keyword research tool. Find low competition keywords, search volume, and difficulty scores. Free keyword analyzer for video SEO."
        url="https://youtubeseo.app/keyword-research"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Keyword Research", url: "https://youtubeseo.app/keyword-research" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-8 pb-8">
          {/* Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl -z-10" />
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                YouTube Keyword Research Tool
              </h1>
              <p className="text-muted-foreground text-lg">
                Find High-Ranking YouTube Keywords with AI-Powered Analysis 🚀
              </p>
            </div>
          </motion.div>

          {/* Search Form with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 shadow-xl bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Search Keywords
                </CardTitle>
                <CardDescription>
                  Enter a keyword or topic to analyze its performance on YouTube
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="e.g., how to make money online"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 h-12 text-lg border-2 focus:border-primary transition-all"
                  />
                  <Button 
                    onClick={handleSearch} 
                    disabled={loading || !keyword.trim()}
                    className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results with Staggered Animation */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {/* Volume Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500/50 bg-gradient-to-br from-green-500/5 to-emerald-500/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                        Search Volume
                      </CardTitle>
                      <CardDescription>Estimated monthly searches</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                      >
                        {formatNumber(animatedVolume)}
                      </motion.div>
                      <div className="flex items-center gap-2 mt-4">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">Growing interest</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Difficulty Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-yellow-500" />
                        Keyword Difficulty
                      </CardTitle>
                      <CardDescription>How hard to rank for this keyword</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                        className={`text-5xl font-bold ${getDifficultyColor(animatedDifficulty)}`}
                      >
                        {animatedDifficulty}/100
                      </motion.div>
                      <Badge className={`mt-4 border ${getDifficultyBadge(results.competition || "Medium")}`}>
                        {results.competition || "Medium"} Competition
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Opportunity Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5 text-blue-500" />
                        Opportunity Score
                      </CardTitle>
                      <CardDescription>Potential for ranking success</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                        className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {animatedOpportunity}/100
                      </motion.div>
                      <div className="flex items-center gap-2 mt-4">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">Good opportunity</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Chart with Enhanced Styling */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border-2 shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Search Trend Analysis
                    </CardTitle>
                    <CardDescription>Interest over time for "{keyword}"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={results.trendData || generateMockTrendData()}>
                        <defs>
                          <linearGradient id="colorSearches" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="searches" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorSearches)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Insights with Animation */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="border-2 shadow-xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      AI-Powered Insights
                    </CardTitle>
                    <CardDescription>Strategic recommendations for this keyword</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          Key Insights
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {results.insights || "This keyword shows good potential for ranking. Consider creating comprehensive content that addresses user intent and includes related keywords."}
                        </p>
                      </div>
                      {results.relatedKeywords && results.relatedKeywords.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            Related Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {results.relatedKeywords.map((kw: string, i: number) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                              >
                                <Badge 
                                  variant="outline" 
                                  className="text-sm px-3 py-1 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer"
                                >
                                  {kw}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEO Tips with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  YouTube SEO Best Practices
                </CardTitle>
                <CardDescription>Tips for ranking with your target keyword</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Include your target keyword in the first 100 characters of your title",
                    "Use keyword variations naturally throughout your description",
                    "Add relevant tags including long-tail variations",
                    "Create engaging thumbnails that match search intent",
                    "Focus on watch time and engagement metrics"
                  ].map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-500/5 transition-colors"
                    >
                      <span className="text-blue-500 text-xl mt-0.5">✓</span>
                      <span className="text-sm leading-relaxed">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  )
}

function generateMockTrendData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map(month => ({
    month,
    searches: Math.floor(Math.random() * 1000) + 500
  }))
}

KeywordResearchPage.metadata = {
  title: "YouTube Keyword Research Tool - Find High-Ranking Keywords Free",
  description: "AI-powered YouTube keyword research tool. Find low competition keywords, search volume, and difficulty scores. Free keyword analyzer for video SEO."
};