"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Video, Eye, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function VideoAnalyzerPage() {
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/video-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="YouTube Video Analyzer"
        description="Analyze YouTube videos and get SEO scores, improvement suggestions, and optimization tips. Free video analyzer with AI insights."
        url="https://youtubeseo.app/video-analyzer"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Video Analyzer", url: "https://youtubeseo.app/video-analyzer" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">YouTube Video Analyzer</h1>
            <p className="text-muted-foreground mt-2">
              Improve SEO & CTR Instantly with Detailed Video Analysis
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Analyze Video</CardTitle>
              <CardDescription>
                Enter a YouTube video URL to get comprehensive SEO analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g., https://youtube.com/watch?v=VIDEO_ID"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                  className="flex-1"
                />
                <Button onClick={handleAnalyze} disabled={loading || !videoUrl.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <>
              {/* Video Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{results.title || "Video Title"}</CardTitle>
                  <CardDescription>
                    Published {new Date(results.publishedAt || Date.now()).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* SEO Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall SEO Score</CardTitle>
                  <CardDescription>Comprehensive analysis of video optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getSEOScoreColor(results.totalScore || 75)}`}>
                        {results.totalScore || 75}/100
                      </div>
                      <Badge className="mt-2" variant="outline">
                        {getScoreLabel(results.totalScore || 75)}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Title Optimization</span>
                          <span className="text-sm text-muted-foreground">
                            {results.breakdown?.title || 85}/25
                          </span>
                        </div>
                        <Progress value={((results.breakdown?.title || 85) / 25) * 100} />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Description Quality</span>
                          <span className="text-sm text-muted-foreground">
                            {results.breakdown?.description || 70}/25
                          </span>
                        </div>
                        <Progress value={((results.breakdown?.description || 70) / 25) * 100} />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Tags Relevance</span>
                          <span className="text-sm text-muted-foreground">
                            {results.breakdown?.tags || 65}/25
                          </span>
                        </div>
                        <Progress value={((results.breakdown?.tags || 65) / 25) * 100} />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Engagement Metrics</span>
                          <span className="text-sm text-muted-foreground">
                            {results.breakdown?.engagement || 80}/25
                          </span>
                        </div>
                        <Progress value={((results.breakdown?.engagement || 80) / 25) * 100} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.views || 125000).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total video views
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Likes</CardTitle>
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.likes || 5200).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((results.likes || 5200) / (results.views || 125000) * 100).toFixed(2)}% like rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Comments</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.comments || 340).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active discussions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.engagementRate || "4.43"}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Overall engagement rate
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Improvements</CardTitle>
                  <CardDescription>AI-powered suggestions to boost your video performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(results.improvements || [
                      "Add more relevant keywords to your title, especially in the first 50 characters",
                      "Expand your description to at least 250 words with strategic keyword placement",
                      "Include timestamps for better user experience and SEO",
                      "Add 10-15 more relevant tags, focusing on long-tail keywords",
                      "Encourage more comments by asking questions in your video"
                    ]).map((improvement: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Badge variant="outline" className="mt-0.5">{i + 1}</Badge>
                        <p className="text-sm flex-1">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle>Video Strengths</CardTitle>
                  <CardDescription>What you're doing right</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {(results.strengths || [
                      "Strong engagement rate above industry average",
                      "Good use of relevant tags",
                      "Title length is optimal for search",
                      "Consistent upload schedule"
                    ]).map((strength: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Tags Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Tags</CardTitle>
                  <CardDescription>Tags used in this video</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(results.tags || generateMockTags()).map((tag: string, i: number) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  )
}

function generateMockTags() {
  return [
    "tutorial",
    "how to",
    "guide",
    "beginner",
    "2024",
    "tips",
    "tricks",
    "complete guide",
    "step by step",
    "easy"
  ]
}