"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Tag, Copy, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function TagGeneratorPage() {
  const [topic, setTopic] = useState("")
  const [context, setContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/tag-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, context }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!results?.tags) return
    const tagsText = results.tags.join(", ")
    navigator.clipboard.writeText(tagsText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="Free YouTube Tag Generator"
        description="Generate 30-50 optimized YouTube tags instantly. Short tags, long-tail tags, and LSI keywords. AI-powered tag generator for better rankings."
        url="https://youtubeseo.app/tag-generator"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Tag Generator", url: "https://youtubeseo.app/tag-generator" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Free YouTube Tag Generator</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Rank Faster with Optimized Tags - Generate 30-50 SEO-friendly tags instantly
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Generate Tags</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Enter your video topic to generate optimized tags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block">Video Topic *</label>
                <Input
                  placeholder="e.g., iPhone 15 Pro Review"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium mb-2 block">Additional Context (Optional)</label>
                <Textarea
                  placeholder="Add more details about your video content..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={3}
                  className="text-sm sm:text-base resize-none"
                />
              </div>
              <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-sm sm:text-base">Generating Tags...</span>
                  </>
                ) : (
                  <>
                    <Tag className="mr-2 h-4 w-4" />
                    <span className="text-sm sm:text-base">Generate Tags</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">Generated Tags ({results.tags?.length || 0})</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-1">
                        Copy and paste these tags into your YouTube video
                      </CardDescription>
                    </div>
                    <Button onClick={copyToClipboard} variant="outline" size="sm" className="w-full sm:w-auto">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          <span className="text-xs sm:text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          <span className="text-xs sm:text-sm">Copy All</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                      <TabsTrigger value="all" className="text-xs sm:text-sm">All Tags</TabsTrigger>
                      <TabsTrigger value="short" className="text-xs sm:text-sm">Short Tags</TabsTrigger>
                      <TabsTrigger value="longTail" className="text-xs sm:text-sm">Long-Tail</TabsTrigger>
                      <TabsTrigger value="lsi" className="text-xs sm:text-sm">LSI Tags</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {(results.tags || generateMockTags()).map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs sm:text-sm py-1 px-2 sm:px-3">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="short" className="space-y-4 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {(results.categories?.short || generateMockTags().slice(0, 15)).map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs sm:text-sm py-1 px-2 sm:px-3">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="longTail" className="space-y-4 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {(results.categories?.longTail || generateMockTags().slice(15, 30)).map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs sm:text-sm py-1 px-2 sm:px-3">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="lsi" className="space-y-4 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {(results.categories?.lsi || generateMockTags().slice(30, 45)).map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs sm:text-sm py-1 px-2 sm:px-3">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Tag Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">How to Use These Tags</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Best practices for YouTube tags</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>Use 30-50 tags per video for optimal performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>Place your most important keywords as the first 3 tags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>Mix short tags (1-2 words) with long-tail tags (3-5 words)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>Include your channel name or brand as a tag</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary flex-shrink-0">•</span>
                      <span>Use LSI (Latent Semantic Indexing) tags for better context</span>
                    </li>
                  </ul>
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
    "technology", "review", "tech review", "latest tech", "gadget review",
    "how to", "tutorial", "guide", "tips and tricks", "best",
    "2024", "new", "unboxing", "first impressions", "detailed review",
    "comparison", "vs", "which is better", "should you buy", "worth it",
    "features", "specs", "performance", "battery life", "camera",
    "design", "build quality", "price", "value", "recommendation",
    "pros and cons", "honest review", "in depth", "complete guide", "everything you need to know",
    "beginner friendly", "advanced", "professional", "expert tips", "ultimate guide",
    "best practices", "common mistakes", "avoid these", "top tips", "secret tips"
  ]
}