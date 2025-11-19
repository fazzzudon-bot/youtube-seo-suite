"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, FileText, Copy, Check } from "lucide-react"
import { SoftwareAppStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export default function DescriptionGeneratorPage() {
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const [duration, setDuration] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!title.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/description-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          duration 
        }),
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
    if (!results?.description) return
    navigator.clipboard.writeText(results.description)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <SoftwareAppStructuredData
        name="YouTube Description Generator"
        description="Generate SEO-optimized YouTube descriptions with keywords, timestamps, and CTAs. AI-powered description writer for better rankings."
        url="https://youtubeseo.app/description-generator"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Description Generator", url: "https://youtubeseo.app/description-generator" },
        ]}
      />
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO YouTube Description Generator</h1>
            <p className="text-muted-foreground mt-2">
              Generate YouTube-Optimized Descriptions with Keywords and Timestamps
            </p>
          </div>

          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Description</CardTitle>
              <CardDescription>
                Fill in the details to create an SEO-optimized video description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Video Title *</label>
                <Input
                  placeholder="e.g., Complete Guide to YouTube SEO"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                <Input
                  placeholder="e.g., youtube seo, seo tips, video optimization"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Video Duration (Optional)</label>
                <Input
                  placeholder="e.g., 15:30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} disabled={loading || !title.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Description...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Description
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
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Description</CardTitle>
                      <CardDescription>
                        Copy and paste this into your YouTube video description
                      </CardDescription>
                    </div>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Description
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={results.description || generateMockDescription(title)}
                    readOnly
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline">
                      {(results.description || generateMockDescription(title)).length} characters
                    </Badge>
                    {results.chapters && results.chapters.length > 0 && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        {results.chapters.length} chapters included
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Chapters */}
              {results.chapters && results.chapters.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Video Chapters</CardTitle>
                    <CardDescription>
                      Timestamp chapters for better navigation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.chapters.map((chapter: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="font-mono">{i}</Badge>
                          <span>{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Description Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Description Optimization Tips</CardTitle>
                  <CardDescription>Make your descriptions work harder</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>First 150 characters are most important (visible without "show more")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Include your main keyword in the first paragraph</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Add timestamps for videos longer than 8 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Include clear call-to-actions (subscribe, like, comment)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Add relevant links (social media, website, affiliate links)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Use 3-5 hashtags at the end (not more)</span>
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

function generateMockDescription(title: string) {
  return `${title}

In this comprehensive guide, you'll learn everything you need to know about YouTube SEO and how to optimize your videos for maximum reach and engagement.

🎯 What You'll Learn:
• Understanding YouTube's algorithm
• Keyword research strategies
• Title and thumbnail optimization
• Description and tags best practices
• Engagement optimization techniques

📚 Chapters:
0:00 - Introduction
2:15 - YouTube Algorithm Explained
5:30 - Keyword Research
8:45 - Optimizing Titles
12:00 - Creating Descriptions
15:20 - Using Tags Effectively
18:30 - Conclusion

💡 Free Resources:
Download our YouTube SEO checklist: [Link]
Join our community: [Link]

🔗 Connect With Me:
Instagram: @yourhandle
Twitter: @yourhandle
Website: yourwebsite.com

If you found this helpful, please like this video and subscribe for more YouTube growth tips!

#YouTubeSEO #VideoMarketing #YouTubeGrowth`
}