import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "10 Viral Video Title Formulas That Actually Work | YouTube SEO",
  description: "Proven title formulas used by top creators to get millions of views on YouTube. Learn the exact templates that drive clicks and engagement.",
  keywords: ["viral titles", "youtube titles", "title formulas", "click-worthy titles", "video titles"],
  openGraph: {
    title: "10 Viral Video Title Formulas That Actually Work",
    description: "Proven title formulas used by top creators to get millions of views",
    type: "article",
    publishedTime: "2024-01-10",
    authors: ["YouTube SEO Team"]
  }
};

const article = {
  title: "10 Viral Video Title Formulas That Actually Work",
  description: "Proven title formulas used by top creators to get millions of views on YouTube.",
  category: "Growth",
  readTime: "8 min read",
  date: "2024-01-10",
  author: "YouTube SEO Team",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
};

export default function ArticlePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    image: article.image
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DashboardLayout>
        <article className="mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">{article.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.description}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
              <div>By {article.author}</div>
            </div>
          </div>

          <img src={article.image} alt={article.title} className="w-full rounded-lg mb-8" />

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>Your video's title is the first thing viewers see. It's the difference between millions of views and being lost in the algorithm. In this guide, I'll share 10 proven title formulas that consistently generate high click-through rates.</p>

            <h2>Why Title Formulas Work</h2>
            <p>Great titles aren't accidents - they follow patterns. Top creators use these formulas because they tap into human psychology: curiosity, emotion, and value proposition.</p>

            <h2>The 10 Viral Title Formulas</h2>

            <h3>1. The "How To" Formula</h3>
            <p><strong>Template:</strong> "How to [Achieve Desired Result] in [Timeframe]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"How to Gain 10K Subscribers in 30 Days"</li>
              <li>"How to Edit Videos Like a Pro in 5 Minutes"</li>
              <li>"How to Make $1000 on YouTube (Complete Guide)"</li>
            </ul>
            <p><strong>Why it works:</strong> Clear value proposition + specific outcome + timeframe = irresistible for viewers seeking solutions.</p>

            <h3>2. The "Number List" Formula</h3>
            <p><strong>Template:</strong> "[Number] [Ways/Tips/Secrets] to [Achieve Result]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"7 Secrets to Viral YouTube Shorts"</li>
              <li>"15 Editing Mistakes Beginners Make"</li>
              <li>"10 Ways to Beat the YouTube Algorithm"</li>
            </ul>
            <p><strong>Why it works:</strong> Numbers promise specific, digestible content. Odd numbers (especially 7) perform better than even numbers.</p>

            <h3>3. The "Before/After" Formula</h3>
            <p><strong>Template:</strong> "From [Bad Situation] to [Good Situation] in [Timeframe]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"From 0 to 100K Subscribers in 6 Months"</li>
              <li>"Broke to $10K/Month with YouTube"</li>
              <li>"Beginner to Pro Video Editor in 30 Days"</li>
            </ul>
            <p><strong>Why it works:</strong> Shows transformation and possibility. Viewers want to replicate your journey.</p>

            <h3>4. The "Question" Formula</h3>
            <p><strong>Template:</strong> "[Intriguing Question About Common Problem]?"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"Why Aren't Your Videos Getting Views?"</li>
              <li>"Is YouTube Shorts Worth It in 2024?"</li>
              <li>"What If You Could Quit Your Job?"</li>
            </ul>
            <p><strong>Why it works:</strong> Questions create curiosity gaps. Viewers click to get answers.</p>

            <h3>5. The "Mistake/Warning" Formula</h3>
            <p><strong>Template:</strong> "[Number] [Mistakes/Things] [Action] That [Negative Outcome]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"5 YouTube Mistakes Killing Your Growth"</li>
              <li>"Don't Start YouTube Until You Watch This"</li>
              <li>"7 Things Destroying Your Channel"</li>
            </ul>
            <p><strong>Why it works:</strong> Fear of missing out or making mistakes drives engagement. People want to avoid pain.</p>

            <h3>6. The "Secret/Hack" Formula</h3>
            <p><strong>Template:</strong> "The [Secret/Hack] [Authority Figure] Don't Want You to Know"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"YouTube Growth Hack Nobody Talks About"</li>
              <li>"Secret to 10x Your Views Overnight"</li>
              <li>"The Algorithm Hack Big Channels Use"</li>
            </ul>
            <p><strong>Why it works:</strong> Implies insider knowledge and exclusive information.</p>

            <h3>7. The "Ultimate Guide" Formula</h3>
            <p><strong>Template:</strong> "The Ultimate [Topic] Guide for [Target Audience]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"The Ultimate YouTube SEO Guide for Beginners"</li>
              <li>"Complete Monetization Guide (2024)"</li>
              <li>"Ultimate Camera Setup for YouTubers"</li>
            </ul>
            <p><strong>Why it works:</strong> "Ultimate" suggests comprehensive, authoritative content that covers everything.</p>

            <h3>8. The "Vs" Comparison Formula</h3>
            <p><strong>Template:</strong> "[Option A] vs [Option B]: Which is Better?"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"YouTube Shorts vs TikTok: Which Pays More?"</li>
              <li>"iPhone vs Android for YouTube"</li>
              <li>"Free vs Paid Editing Software"</li>
            </ul>
            <p><strong>Why it works:</strong> People love comparisons. Helps them make decisions.</p>

            <h3>9. The "Shocking Truth" Formula</h3>
            <p><strong>Template:</strong> "The [Shocking/Brutal/Honest] Truth About [Topic]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"The Brutal Truth About Making Money on YouTube"</li>
              <li>"What Nobody Tells You About Going Viral"</li>
              <li>"The Reality of Full-Time YouTube"</li>
            </ul>
            <p><strong>Why it works:</strong> Promises raw, unfiltered information. Appeals to viewers tired of sugarcoated content.</p>

            <h3>10. The "Current Year" Formula</h3>
            <p><strong>Template:</strong> "[Topic] in [Current Year]: [What Changed]"</p>
            <p><strong>Examples:</strong></p>
            <ul>
              <li>"YouTube SEO in 2024: Everything Changed"</li>
              <li>"Is YouTube Still Worth It in 2024?"</li>
              <li>"Best Cameras for YouTube (2024 Update)"</li>
            </ul>
            <p><strong>Why it works:</strong> Shows content is current and relevant. Viewers want latest information.</p>

            <h2>Title Optimization Tips</h2>

            <h3>Keep It Under 70 Characters</h3>
            <p>YouTube truncates longer titles. Put your keyword and hook in the first 50-60 characters.</p>

            <h3>Use Power Words</h3>
            <p>Words that trigger emotion:</p>
            <ul>
              <li>Ultimate, Complete, Proven, Secret</li>
              <li>Brutal, Honest, Raw, Real</li>
              <li>Shocking, Amazing, Insane</li>
              <li>Simple, Easy, Fast, Quick</li>
            </ul>

            <h3>Include Numbers When Possible</h3>
            <p>Numbers make titles more specific and clickable. "7 Tips" performs better than "Some Tips".</p>

            <h3>Test Brackets and Parentheses</h3>
            <p>Adding context in brackets can boost CTR:</p>
            <ul>
              <li>"YouTube SEO Guide (2024 Update)"</li>
              <li>"How I Quit My Job [My Story]"</li>
              <li>"10 Tips for Growth (Proven Methods)"</li>
            </ul>

            <h3>Match Search Intent</h3>
            <p>Your title must match what viewers expect. Don't clickbait - deliver on your promise.</p>

            <h2>Common Title Mistakes to Avoid</h2>

            <h3>❌ Being Too Vague</h3>
            <p>Bad: "Tips for YouTube"<br />Good: "7 YouTube SEO Tips That Doubled My Views"</p>

            <h3>❌ All Caps or Excessive Punctuation</h3>
            <p>Bad: "BEST VIDEO EVER!!!! MUST WATCH!!!!"<br />Good: "The Best Video Editing Tips for Beginners"</p>

            <h3>❌ Keyword Stuffing</h3>
            <p>Bad: "YouTube SEO Tips YouTube Growth YouTube Algorithm"<br />Good: "YouTube SEO Tips to Grow Your Channel Fast"</p>

            <h3>❌ Misleading Clickbait</h3>
            <p>Clickbait that doesn't deliver kills your channel's trust and retention.</p>

            <h2>How to Test Your Titles</h2>

            <ol>
              <li><strong>Ask yourself:</strong> Would I click this?</li>
              <li><strong>Check competitors:</strong> What's working in your niche?</li>
              <li><strong>Use YouTube search:</strong> See what autocomplete suggests</li>
              <li><strong>A/B test:</strong> Try different versions and compare CTR</li>
              <li><strong>Monitor analytics:</strong> CTR above 10% is excellent</li>
            </ol>

            <h2>Real Examples from Top Creators</h2>

            <p><strong>MrBeast:</strong> "$1 vs $1,000,000 Hotel Room!" (Comparison + extreme numbers)</p>
            <p><strong>Ali Abdaal:</strong> "How I Would Learn to Code (If I Could Start Over)" (Personal + hypothetical)</p>
            <p><strong>MKBHD:</strong> "iPhone 15 Pro Review: iOS 17, Action Button, Camera, and Battery Life" (Specific features)</p>

            <h2>Conclusion</h2>
            <p>These 10 formulas are your blueprint for viral titles. But remember: the best title formula is one that's authentic to your brand and delivers value to your audience.</p>

            <p><strong>Action Steps:</strong></p>
            <ol>
              <li>Save these formulas for future reference</li>
              <li>Analyze your top-performing videos - which formula did they use?</li>
              <li>Test 2-3 different title variations before publishing</li>
              <li>Track your CTR in YouTube Analytics</li>
              <li>Refine based on what works for YOUR audience</li>
            </ol>

            <p>Start using these formulas today and watch your click-through rates soar! 🚀</p>
          </div>
        </article>
      </DashboardLayout>
    </>
  );
}
