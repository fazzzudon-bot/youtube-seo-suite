import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Complete YouTube SEO Checklist 2024 - Optimize Every Video",
  description: "The ultimate YouTube SEO checklist for 2024. Follow these proven steps to optimize your videos for maximum views, engagement, and channel growth.",
  keywords: ["youtube seo checklist", "video optimization", "youtube ranking", "seo checklist 2024"],
}

export default function BlogPost() {
  return (
    <>
      <ArticleStructuredData
        title="Complete YouTube SEO Checklist 2024"
        description="The ultimate YouTube SEO checklist for 2024. Follow these proven steps to optimize your videos for maximum views and engagement."
        url="https://youtubeseo.app/blog/youtube-seo-checklist-2024"
        image="https://youtubeseo.app/og-image.jpg"
        datePublished="2024-01-18"
        author="YouTube SEO Tool Team"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Blog", url: "https://youtubeseo.app/blog" },
          { name: "YouTube SEO Checklist 2024", url: "https://youtubeseo.app/blog/youtube-seo-checklist-2024" },
        ]}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>January 18, 2024</span>
                <span>•</span>
                <span>15 min read</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Complete YouTube SEO Checklist 2024 📋
              </h1>
              <p className="text-xl text-muted-foreground">
                The ultimate YouTube SEO checklist for 2024. Follow these proven steps to optimize your videos for maximum views, engagement, and channel growth.
              </p>
            </div>

            <div className="my-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-semibold mb-2">✨ Quick Summary</p>
              <p className="text-sm">This comprehensive checklist covers everything from pre-upload optimization to post-publish promotion. Bookmark this page and use it for every video you create.</p>
            </div>

            <h2 id="pre-upload">📌 Phase 1: Pre-Upload Optimization</h2>

            <Card className="my-6">
              <CardHeader>
                <CardTitle className="text-lg">Keyword Research</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Find your primary keyword</p>
                    <p className="text-sm text-muted-foreground">Use our <Link href="/keyword-research" className="text-primary hover:underline">keyword research tool</Link> to find high-volume, low-competition keywords</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Identify related keywords</p>
                    <p className="text-sm text-muted-foreground">Find 5-10 related keywords to naturally include in your content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Analyze search intent</p>
                    <p className="text-sm text-muted-foreground">Watch top-ranking videos to understand what viewers actually want</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="my-12 p-8 bg-primary/5 border-2 border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Videos?</h3>
              <p className="text-muted-foreground mb-6">Use our free AI-powered tools to implement this checklist effortlessly.</p>
              <Button asChild size="lg">
                <Link href="/keyword-research">Get Started Free →</Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
