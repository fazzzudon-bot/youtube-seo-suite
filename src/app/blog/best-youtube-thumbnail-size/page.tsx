import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleStructuredData, BreadcrumbStructuredData, HowToStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "YouTube Thumbnail Size 2024: Best Dimensions, Format & Design Tips",
  description: "Complete guide to YouTube thumbnail size in 2024. Learn the best dimensions (1280x720), format requirements, file size limits, and design best practices for maximum CTR.",
  keywords: ["youtube thumbnail size", "thumbnail dimensions", "youtube thumbnail requirements", "thumbnail best practices"],
}

export default function BlogPost() {
  return (
    <>
      <ArticleStructuredData
        title="YouTube Thumbnail Size 2024: Best Dimensions, Format & Design Tips"
        description="Complete guide to YouTube thumbnail size including dimensions, format requirements, and design best practices."
        url="https://youtubeseo.app/blog/best-youtube-thumbnail-size"
        image="https://youtubeseo.app/og-image.jpg"
        datePublished="2024-01-20"
        author="YouTube SEO Tool Team"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://youtubeseo.app" },
          { name: "Blog", url: "https://youtubeseo.app/blog" },
          { name: "YouTube Thumbnail Size Guide", url: "https://youtubeseo.app/blog/best-youtube-thumbnail-size" },
        ]}
      />
      <HowToStructuredData
        name="How to Create Perfect YouTube Thumbnails"
        description="Step-by-step guide to creating thumbnails that follow YouTube's requirements and maximize clicks"
        steps={[
          "Set canvas size to 1280x720 pixels (16:9 aspect ratio)",
          "Use high-contrast colors and large, readable text",
          "Include a clear focal point (face or main subject)",
          "Save as JPG or PNG under 2MB",
          "Test thumbnail at small sizes before uploading",
          "Upload through YouTube Studio and verify appearance"
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
                <span>January 20, 2024</span>
                <span>•</span>
                <span>12 min read</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                YouTube Thumbnail Size 2024: Best Dimensions, Format & Design Tips 🖼️
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete guide to YouTube thumbnail size in 2024. Learn the best dimensions, format requirements, file size limits, and design best practices for maximum click-through rate.
              </p>
            </div>

            <div className="my-8 p-6 bg-blue-500/10 border-2 border-blue-500/20 rounded-lg">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Quick Answer
              </p>
              <p className="text-sm mb-2">
                <strong>Best YouTube Thumbnail Size:</strong> 1280 x 720 pixels (16:9 aspect ratio)
              </p>
              <p className="text-sm mb-2">
                <strong>Formats:</strong> JPG, PNG, GIF, or BMP
              </p>
              <p className="text-sm">
                <strong>File Size:</strong> Under 2MB
              </p>
            </div>

            <h2 id="official-requirements">📐 Official YouTube Thumbnail Requirements</h2>

            <Card className="my-6">
              <CardHeader>
                <CardTitle className="text-lg">YouTube's Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Resolution: 1280 x 720 pixels</p>
                    <p className="text-sm text-muted-foreground">This is the minimum width. Higher resolutions work, but maintain 16:9 ratio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Aspect Ratio: 16:9</p>
                    <p className="text-sm text-muted-foreground">This is the most common aspect ratio on YouTube</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">File Size: Under 2MB</p>
                    <p className="text-sm text-muted-foreground">YouTube will reject thumbnails larger than 2MB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Format: JPG, PNG, GIF, or BMP</p>
                    <p className="text-sm text-muted-foreground">PNG recommended for text, JPG for photos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h2 id="why-size-matters">🎯 Why Thumbnail Size Matters</h2>

            <p>Your thumbnail appears in multiple places across YouTube, each displaying it at different sizes:</p>

            <Card className="my-6">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li><strong>Search results:</strong> 246 x 138 pixels (desktop)</li>
                  <li><strong>Suggested videos:</strong> 168 x 94 pixels</li>
                  <li><strong>Mobile feed:</strong> Variable, often 360 x 202 pixels</li>
                  <li><strong>Watch page:</strong> Varies by screen size</li>
                </ul>
              </CardContent>
            </Card>

            <p>Using 1280x720 ensures your thumbnail looks sharp everywhere while maintaining the 16:9 aspect ratio YouTube prefers.</p>

            <h2 id="design-best-practices">🎨 Thumbnail Design Best Practices</h2>

            <h3>1. Use High-Contrast Colors</h3>
            <p>Make your thumbnail pop against YouTube's white/dark backgrounds:</p>
            <ul>
              <li>Bold, vibrant colors (red, blue, yellow, orange)</li>
              <li>Dark text on light backgrounds or vice versa</li>
              <li>Avoid gray, beige, or muted tones</li>
            </ul>

            <h3>2. Add Readable Text</h3>
            <Card className="my-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">Text Guidelines:</p>
                <ul className="space-y-1 text-sm">
                  <li>✓ Use large, bold fonts (minimum 30-40pt)</li>
                  <li>✓ Keep text to 3-6 words maximum</li>
                  <li>✓ Add text outline or shadow for readability</li>
                  <li>✓ Test readability at small sizes</li>
                  <li>✗ Don't use script/decorative fonts</li>
                  <li>✗ Avoid all-caps (looks spammy)</li>
                </ul>
              </CardContent>
            </Card>

            <h3>3. Include a Face or Focal Point</h3>
            <p>Thumbnails with human faces get 30% more clicks:</p>
            <ul>
              <li>Show clear facial expressions (surprise, excitement, curiosity)</li>
              <li>Make eye contact with the camera</li>
              <li>Use close-up shots (fill 1/3 to 1/2 of thumbnail)</li>
              <li>Ensure face is well-lit and in focus</li>
            </ul>

            <h3>4. Follow the Rule of Thirds</h3>
            <p>Divide your thumbnail into a 3x3 grid:</p>
            <ul>
              <li>Place main subject at intersection points</li>
              <li>Position text in top or bottom third</li>
              <li>Leave breathing room (don't crowd elements)</li>
            </ul>

            <h2 id="common-mistakes">⚠️ Common Thumbnail Mistakes to Avoid</h2>

            <div className="grid gap-4 my-6">
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <p className="font-semibold text-red-500 mb-2">❌ Mistake #1: Clickbait That Misleads</p>
                  <p className="text-sm">Using shocking images unrelated to content damages trust and increases bounce rate.</p>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <p className="font-semibold text-red-500 mb-2">❌ Mistake #2: Too Much Text</p>
                  <p className="text-sm">Long sentences are unreadable at thumbnail size. Stick to 3-6 words max.</p>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <p className="font-semibold text-red-500 mb-2">❌ Mistake #3: Low Resolution Images</p>
                  <p className="text-sm">Blurry, pixelated thumbnails look unprofessional and reduce clicks.</p>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <p className="font-semibold text-red-500 mb-2">❌ Mistake #4: Inconsistent Branding</p>
                  <p className="text-sm">Random thumbnail styles confuse viewers. Use consistent colors, fonts, and layouts.</p>
                </CardContent>
              </Card>
            </div>

            <h2 id="tools">🛠️ Best Tools for Creating Thumbnails</h2>

            <div className="grid gap-4 my-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Canva (Recommended)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">Best for: Beginners</p>
                  <p className="text-muted-foreground">Pre-made templates, drag-and-drop editor, free tier available. Has built-in YouTube thumbnail preset.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Photoshop</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">Best for: Professionals</p>
                  <p className="text-muted-foreground">Complete control, advanced editing, layer system. Requires subscription and learning curve.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Figma</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">Best for: Teams</p>
                  <p className="text-muted-foreground">Free, browser-based, collaborative editing. Great for maintaining brand consistency.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Snappa</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="mb-2">Best for: Quick editing</p>
                  <p className="text-muted-foreground">Simple interface, YouTube thumbnail templates, built-in graphics library.</p>
                </CardContent>
              </Card>
            </div>

            <h2 id="optimization-tips">⚡ Advanced Optimization Tips</h2>

            <h3>A/B Test Your Thumbnails</h3>
            <p>YouTube now allows thumbnail A/B testing:</p>
            <ol>
              <li>Create 2-3 thumbnail variations</li>
              <li>Upload through YouTube Studio</li>
              <li>Let YouTube show different versions to viewers</li>
              <li>Choose the winner based on CTR data</li>
            </ol>

            <h3>Analyze Competitor Thumbnails</h3>
            <p>Study successful channels in your niche:</p>
            <ul>
              <li>What colors do they use?</li>
              <li>How much text do they include?</li>
              <li>What emotions do they convey?</li>
              <li>Do they use faces or graphics?</li>
            </ul>

            <h3>Mobile-First Design</h3>
            <p>70% of YouTube watch time is on mobile:</p>
            <ul>
              <li>Test thumbnails on phone screens</li>
              <li>Make text even larger for mobile</li>
              <li>Use simple compositions (fewer elements)</li>
              <li>Ensure main subject is centered</li>
            </ul>

            <h2 id="checklist">✅ Pre-Upload Thumbnail Checklist</h2>

            <Card className="my-6">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Dimensions are 1280 x 720 pixels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">File size is under 2MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Saved as JPG or PNG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Text is readable at small sizes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">High contrast colors used</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Clear focal point included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Matches video content (not misleading)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Consistent with channel branding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Tested on mobile device</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="my-12 p-8 bg-primary/5 border-2 border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Optimize Every Aspect of Your Videos</h3>
              <p className="text-muted-foreground mb-6">Great thumbnails are just the start. Use our free tools to optimize titles, tags, and descriptions too.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/title-generator">Title Generator →</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/tag-generator">Tag Generator →</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
