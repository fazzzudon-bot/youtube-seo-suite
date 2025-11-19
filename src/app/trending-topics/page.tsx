"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, Flame, Clock, Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TrendingTopicsPage() {
  const [category, setCategory] = useState("all")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState<any[]>([])

  const handleFetch = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/trending-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      })
      const data = await response.json()
      setTopics(data.topics || generateMockTopics())
    } catch (error) {
      console.error("Error:", error)
      setTopics(generateMockTopics())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleFetch()
  }, [])

  const getOpportunityColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-500"
    if (score >= 60) return "bg-yellow-500/10 text-yellow-500"
    return "bg-red-500/10 text-red-500"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trending YouTube Topics</h1>
          <p className="text-muted-foreground mt-2">
            Discover What's Trending and Predict What's Coming Next
          </p>
        </div>

        {/* Category Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Find Trending Topics</CardTitle>
            <CardDescription>
              Select a category to discover trending topics and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="howto">How-To & DIY</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="finance">Finance & Business</SelectItem>
                <SelectItem value="health">Health & Fitness</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFetch} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Trending Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <Badge variant="outline">#{i + 1} Trending</Badge>
                    </div>
                    <CardTitle className="text-xl">{topic.topic}</CardTitle>
                  </div>
                  <Badge className={getOpportunityColor(topic.opportunity)}>
                    {topic.opportunity}% Opportunity
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Why It's Trending
                  </h4>
                  <p className="text-sm text-muted-foreground">{topic.reason}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Best Time to Create
                  </h4>
                  <p className="text-sm text-muted-foreground">{topic.timing}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Content Angles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {topic.angles?.map((angle: string, j: number) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {angle}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trend Tips */}
        <Card>
          <CardHeader>
            <CardTitle>How to Capitalize on Trends</CardTitle>
            <CardDescription>Best practices for trending content</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Act fast - trending topics have a short window of opportunity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Add your unique perspective to stand out from competitors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use trending keywords in your title and first 100 characters of description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Create engaging thumbnails that match the trending topic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Monitor comments and create follow-up videos based on audience interest</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function generateMockTopics() {
  return [
    {
      topic: "AI Tools for Content Creation",
      reason: "Recent breakthrough in generative AI has sparked massive interest in content creation tools. Creators are looking for ways to streamline their workflow.",
      opportunity: 92,
      timing: "Next 2-4 weeks - Peak interest period",
      angles: ["Tutorial", "Comparison", "Review", "Tips & Tricks"]
    },
    {
      topic: "Passive Income Strategies 2024",
      reason: "Economic uncertainty has driven increased searches for alternative income sources. Strong evergreen appeal with seasonal spikes.",
      opportunity: 85,
      timing: "Immediate - Consistently high demand",
      angles: ["How-To", "Case Study", "Beginner Guide", "Success Stories"]
    },
    {
      topic: "Sustainable Living Hacks",
      reason: "Growing environmental awareness and rising costs are driving interest in sustainable lifestyle changes.",
      opportunity: 78,
      timing: "Next 1-2 months - Building momentum",
      angles: ["Budget-Friendly", "DIY Projects", "Product Reviews", "Lifestyle Vlog"]
    },
    {
      topic: "Remote Work Productivity Tools",
      reason: "Hybrid work models are becoming permanent, leading to sustained interest in productivity optimization.",
      opportunity: 82,
      timing: "Immediate - Stable long-term trend",
      angles: ["Tool Reviews", "Setup Tours", "Tips & Hacks", "Comparison"]
    },
    {
      topic: "Mobile Gaming Updates",
      reason: "Major game releases and updates are driving community discussions and tutorial searches.",
      opportunity: 88,
      timing: "Next 1-3 weeks - Event-driven spike",
      angles: ["Gameplay", "Tips & Tricks", "News & Updates", "Character Guides"]
    },
    {
      topic: "Home Workout Routines",
      reason: "New Year fitness resolutions combined with gym cost concerns maintain high search volume.",
      opportunity: 75,
      timing: "Next 4-8 weeks - Seasonal peak",
      angles: ["No Equipment", "Beginner Friendly", "Quick Workouts", "Results Tracking"]
    }
  ]
}
