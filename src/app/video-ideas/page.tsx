"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Lightbulb, Star, TrendingUp, BookOpen, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VideoIdea {
  title: string
  category: "trending" | "evergreen" | "gap" | "unique"
  difficulty: "Easy" | "Medium" | "Hard"
  potentialViews: string
  description?: string
}

export default function VideoIdeasPage() {
  const [niche, setNiche] = useState("")
  const [loading, setLoading] = useState(false)
  const [ideas, setIdeas] = useState<VideoIdea[] | null>(null)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!niche.trim()) return

    setLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/video-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: niche.trim() }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate ideas")
      }
      
      const data = await response.json()
      setIdeas(data.ideas || [])
    } catch (err) {
      setError("Failed to generate video ideas. Please try again.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-500/10 text-green-600 dark:text-green-400"
    if (difficulty === "Medium") return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
    return "bg-red-500/10 text-red-600 dark:text-red-400"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "trending": return TrendingUp
      case "evergreen": return Star
      case "gap": return Sparkles
      case "unique": return Lightbulb
      default: return BookOpen
    }
  }

  const filterIdeas = (category: string) => {
    if (!ideas) return []
    if (category === "all") return ideas
    return ideas.filter(idea => idea.category === category)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Daily Video Ideas Generator</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Get personalized video ideas based on your niche and trending topics
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Generate Video Ideas</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Enter your niche or topic to get 20 personalized video ideas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Niche or Topic *</label>
              <Input
                placeholder="e.g., tech reviews, cooking, fitness, gaming"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                className="w-full"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !niche.trim()} 
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Ideas
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {ideas && ideas.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">20 Video Ideas for "{niche}"</h2>
              <Badge variant="outline" className="w-fit">
                Total Ideas: {ideas.length}
              </Badge>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Ideas</TabsTrigger>
                <TabsTrigger value="trending" className="text-xs sm:text-sm">Trending</TabsTrigger>
                <TabsTrigger value="evergreen" className="text-xs sm:text-sm">Evergreen</TabsTrigger>
                <TabsTrigger value="gap" className="text-xs sm:text-sm col-span-2 sm:col-span-1">Competitor Gaps</TabsTrigger>
                <TabsTrigger value="unique" className="text-xs sm:text-sm col-span-2 sm:col-span-1">Unique Angles</TabsTrigger>
              </TabsList>

              {["all", "trending", "evergreen", "gap", "unique"].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
                  {filterIdeas(tab).length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">No ideas found in this category</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filterIdeas(tab).map((idea, i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {(() => {
                                const Icon = getCategoryIcon(idea.category)
                                return <Icon className="h-4 w-4 flex-shrink-0" />
                              })()}
                              <Badge variant="outline" className="text-xs capitalize">
                                {idea.category}
                              </Badge>
                              <Badge className={`text-xs ${getDifficultyColor(idea.difficulty)}`}>
                                {idea.difficulty}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-base sm:text-lg">{idea.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Estimated views: {idea.potentialViews}
                            </p>
                            {idea.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground">{idea.description}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Content Creation Tips</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Make the most of your video ideas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Start with "Easy" difficulty ideas to build momentum and confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Mix trending topics with evergreen content for consistent growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Competitor gap ideas offer less competition and higher ranking potential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Add your unique perspective to stand out from similar content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>Create series from related ideas to keep viewers coming back</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}