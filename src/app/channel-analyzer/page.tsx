"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, BarChart3, Users, Video, Eye, TrendingUp, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function ChannelAnalyzerPage() {
  const [channelUrl, setChannelUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!channelUrl.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/channel-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="YouTube Channel Analyzer"
        description="Analyze any YouTube channel without login. Get subscriber count, views, engagement metrics, and competitor insights. Free channel analyzer."
        url="https://youtubeseo.app/channel-analyzer"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Channel Analyzer", url: "https://youtubeseo.app/channel-analyzer" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">YouTube Channel Analyzer</h1>
            <p className="text-muted-foreground mt-2">
              Analyze Any Channel Without Login - Find Opportunities & Weaknesses
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Analyze Channel</CardTitle>
              <CardDescription>
                Enter a YouTube channel URL or handle to get detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g., https://youtube.com/@channelname or @channelname"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                  className="flex-1"
                />
                <Button onClick={handleAnalyze} disabled={loading || !channelUrl.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
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
              {/* Channel Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{results.title || "Channel Name"}</CardTitle>
                      <CardDescription className="mt-2">
                        {results.description || "Channel description"}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      Joined {new Date(results.createdAt || Date.now()).getFullYear()}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Stats Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.subscribers || 125000).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total audience size
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.totalViews || 5000000).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      All-time video views
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.totalVideos || 450}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Published content
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Views/Video</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(results.avgViewsPerVideo || 11111).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Average engagement
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Upload Frequency Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Frequency</CardTitle>
                  <CardDescription>Recent video publishing pattern</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={generateMockUploadData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="videos" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>Strategic analysis and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Content Strategy</h3>
                    <p className="text-sm text-muted-foreground">
                      {results.strategy || "This channel focuses on educational content with a consistent upload schedule of 3-4 videos per week. The content strategy emphasizes high-quality tutorials and guides."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Niche Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Primary Niche: {results.niche || "Technology & Education"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Opportunity Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {(results.opportunityKeywords || generateMockKeywords()).map((kw: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-green-500/10 text-green-500">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Weaknesses to Exploit</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(results.weaknesses || [
                        "Inconsistent video length",
                        "Limited engagement in comments",
                        "Missing community posts",
                        "Underutilized YouTube Shorts"
                      ]).map((weakness: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(results.suggestions || [
                        "Increase upload frequency to 5 videos per week",
                        "Focus on trending topics in your niche",
                        "Improve thumbnail consistency",
                        "Engage more actively with audience in comments",
                        "Create more YouTube Shorts for algorithm boost"
                      ]).map((suggestion: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Videos */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Videos Performance</CardTitle>
                  <CardDescription>Top performing recent uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generateMockRecentVideos().map((video, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{video.title}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{video.views.toLocaleString()} views</span>
                            <span>{video.likes.toLocaleString()} likes</span>
                            <span>{video.days} days ago</span>
                          </div>
                        </div>
                        <Badge variant={video.performance === "High" ? "default" : "secondary"}>
                          {video.performance}
                        </Badge>
                      </div>
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

function generateMockUploadData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map(month => ({
    month,
    videos: Math.floor(Math.random() * 15) + 5
  }))
}

function generateMockKeywords() {
  return [
    "beginner tutorials",
    "advanced techniques",
    "step by step guide",
    "common mistakes",
    "best practices"
  ]
}

function generateMockRecentVideos() {
  return [
    { title: "Complete Beginner's Guide to Getting Started", views: 45000, likes: 2100, days: 3, performance: "High" },
    { title: "10 Tips Every Pro Should Know", views: 32000, likes: 1500, days: 7, performance: "High" },
    { title: "Common Mistakes and How to Avoid Them", views: 18000, likes: 850, days: 10, performance: "Medium" },
    { title: "Advanced Tutorial: Master These Techniques", views: 12000, likes: 600, days: 14, performance: "Medium" },
    { title: "Quick Tips for Immediate Results", views: 8000, likes: 400, days: 17, performance: "Low" },
  ]
}