"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Heading, Copy, Check, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [style, setStyle] = useState("viral")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/title-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="Viral YouTube Title Generator"
        description="Create viral YouTube titles with AI. Generate emotion-based, curiosity-driven titles that boost CTR and views. Free title generator tool."
        url="https://youtubeseo.app/title-generator"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Title Generator", url: "https://youtubeseo.app/title-generator" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Viral YouTube Title Generator</h1>
            <p className="text-muted-foreground mt-2">
              Create Click-Worthy Titles That Drive Views and Engagement
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Titles</CardTitle>
              <CardDescription>
                Enter your video topic and select a style to generate optimized titles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Video Topic *</label>
                <Input
                  placeholder="e.g., how to start a YouTube channel"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Title Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viral">Viral & Clickbait</SelectItem>
                    <SelectItem value="emotional">Emotional & Engaging</SelectItem>
                    <SelectItem value="curiosity">Curiosity-Driven</SelectItem>
                    <SelectItem value="educational">Educational & Informative</SelectItem>
                    <SelectItem value="listicle">List-Based</SelectItem>
                    <SelectItem value="howto">How-To & Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Titles...
                  </>
                ) : (
                  <>
                    <Heading className="mr-2 h-4 w-4" />
                    Generate Titles
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Generated Titles</h2>
                <Button onClick={handleGenerate} variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>

              <div className="grid gap-4">
                {(results.titles || generateMockTitles()).map((title: string, i: number) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <p className="font-medium">{title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {title.length} characters
                          </Badge>
                          {title.length > 50 && title.length < 70 && (
                            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500">
                              Optimal Length
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => copyTitle(title, i)}
                        variant="ghost"
                        size="icon"
                      >
                        {copiedIndex === i ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Title Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Title Optimization Tips</CardTitle>
                  <CardDescription>Best practices for YouTube titles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">✅ Do's</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Keep titles between 50-70 characters</li>
                        <li>• Include target keyword in first 50 characters</li>
                        <li>• Use power words (Amazing, Ultimate, Secret)</li>
                        <li>• Create curiosity with questions</li>
                        <li>• Add numbers when possible (Top 10, 5 Ways)</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">❌ Don'ts</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Avoid clickbait that misleads viewers</li>
                        <li>• Don't use all caps (except for emphasis)</li>
                        <li>• Avoid special characters excessively</li>
                        <li>• Don't keyword stuff unnaturally</li>
                        <li>• Avoid generic, vague titles</li>
                      </ul>
                    </div>
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

function generateMockTitles() {
  return [
    "How I Grew My Channel to 100K Subscribers in 6 Months (Step-by-Step)",
    "The ULTIMATE Guide to YouTube Success in 2024 | Complete Beginner Tutorial",
    "7 Secrets YouTube Doesn't Want You to Know (Game Changer!)",
    "I Tried This YouTube Strategy for 30 Days... Here's What Happened",
    "Why 99% of YouTubers Fail (And How to Be in the 1%)",
    "The YouTube Algorithm Changed EVERYTHING - Here's How to Win",
    "Stop Making These 5 Mistakes on YouTube (Fix Them NOW)",
    "From 0 to 1M Views: My YouTube Blueprint Revealed",
    "This Simple Trick 10X My YouTube Views (No Clickbait)",
    "What I Wish I Knew Before Starting My YouTube Channel"
  ]
}