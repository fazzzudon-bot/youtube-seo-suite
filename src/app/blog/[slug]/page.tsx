import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { generateMetadata as genMeta, generateArticleSchema } from "@/lib/seo"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  
  return genMeta({
    title: `${article.title} | YouTube SEO Blog`,
    description: article.description,
    keywords: ["youtube seo", "video optimization", "youtube growth", article.category.toLowerCase()],
    canonical: `https://youtubeseo.app/blog/${params.slug}`
  })
}

function getArticle(slug: string) {
  // In a real app, this would fetch from a database or CMS
  return {
    slug,
    title: "Complete YouTube SEO Guide for 2024",
    description: "Master YouTube SEO with our comprehensive guide covering keywords, tags, titles, and descriptions.",
    category: "SEO",
    readTime: "15 min read",
    date: "2024-01-15",
    author: "YouTube SEO Team",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    content: `
      <h2>Introduction to YouTube SEO</h2>
      <p>YouTube is the world's second-largest search engine, and mastering its SEO is crucial for growing your channel. In this comprehensive guide, we'll cover everything you need to know about optimizing your videos for maximum visibility and engagement.</p>

      <h2>Understanding YouTube's Algorithm</h2>
      <p>YouTube's algorithm prioritizes videos that keep viewers on the platform longer. This means that watch time, click-through rate (CTR), and engagement are the most important ranking factors.</p>

      <h3>Key Ranking Factors:</h3>
      <ul>
        <li><strong>Watch Time:</strong> Total minutes viewers spend watching your video</li>
        <li><strong>CTR:</strong> Percentage of people who click on your video after seeing it</li>
        <li><strong>Engagement:</strong> Likes, comments, shares, and subscriptions</li>
        <li><strong>Session Time:</strong> How long viewers stay on YouTube after watching your video</li>
      </ul>

      <h2>Keyword Research for YouTube</h2>
      <p>Effective keyword research is the foundation of YouTube SEO. Here's how to find the right keywords:</p>

      <h3>1. Use YouTube's Search Suggestions</h3>
      <p>Start typing your topic in YouTube's search bar and note the auto-complete suggestions. These are popular searches that users are actively looking for.</p>

      <h3>2. Analyze Competitor Videos</h3>
      <p>Look at successful videos in your niche and identify the keywords they're targeting in their titles, descriptions, and tags.</p>

      <h3>3. Use Keyword Research Tools</h3>
      <p>Tools like our Keyword Research Tool can help you find high-volume, low-competition keywords that are easier to rank for.</p>

      <h2>Optimizing Your Video Title</h2>
      <p>Your title is one of the most important SEO elements. Here's how to create effective titles:</p>

      <ul>
        <li>Include your main keyword in the first 50 characters</li>
        <li>Keep it between 50-70 characters for optimal display</li>
        <li>Use power words to create curiosity (Ultimate, Complete, Secret, etc.)</li>
        <li>Make it descriptive and accurate to your content</li>
        <li>Consider using numbers (Top 10, 5 Ways, etc.)</li>
      </ul>

      <h2>Writing Compelling Descriptions</h2>
      <p>Your video description helps YouTube understand your content and provides value to viewers:</p>

      <h3>Description Structure:</h3>
      <ol>
        <li><strong>First 150 characters:</strong> Include your main keyword and a compelling hook</li>
        <li><strong>Detailed overview:</strong> Expand on what viewers will learn</li>
        <li><strong>Timestamps:</strong> Break down your video into chapters</li>
        <li><strong>Links:</strong> Include relevant resources and social media</li>
        <li><strong>Call-to-action:</strong> Ask viewers to subscribe and engage</li>
        <li><strong>Hashtags:</strong> Add 3-5 relevant hashtags at the end</li>
      </ol>

      <h2>Using Tags Effectively</h2>
      <p>Tags help YouTube understand your video's content and context:</p>

      <ul>
        <li>Use 30-50 tags per video</li>
        <li>Start with your exact target keyword</li>
        <li>Include variations and related terms</li>
        <li>Add broad category tags</li>
        <li>Use both short and long-tail keywords</li>
      </ul>

      <h2>Thumbnail Optimization</h2>
      <p>While not directly an SEO factor, thumbnails dramatically impact your CTR, which is crucial for rankings:</p>

      <ul>
        <li>Use high-contrast colors</li>
        <li>Include readable text (30% of thumbnail or less)</li>
        <li>Show expressive faces when relevant</li>
        <li>Maintain consistency across your channel</li>
        <li>Test different styles to see what works</li>
      </ul>

      <h2>Engagement Optimization</h2>
      <p>Encourage engagement to boost your rankings:</p>

      <ul>
        <li>Ask questions in your video</li>
        <li>Request likes and subscriptions naturally</li>
        <li>Respond to comments quickly</li>
        <li>Create community posts</li>
        <li>Use end screens and cards effectively</li>
      </ul>

      <h2>Advanced SEO Strategies</h2>
      
      <h3>Create Playlists</h3>
      <p>Organize your videos into playlists to increase watch time and help YouTube understand your content relationships.</p>

      <h3>Optimize Your Channel</h3>
      <p>Your channel's SEO matters too:</p>
      <ul>
        <li>Write a keyword-rich channel description</li>
        <li>Create a compelling channel trailer</li>
        <li>Organize sections on your channel page</li>
        <li>Add channel keywords in settings</li>
      </ul>

      <h3>Promote Your Videos</h3>
      <p>External engagement signals matter:</p>
      <ul>
        <li>Share on social media platforms</li>
        <li>Embed videos on your website/blog</li>
        <li>Collaborate with other creators</li>
        <li>Engage with your community</li>
      </ul>

      <h2>Analyzing Performance</h2>
      <p>Use YouTube Analytics to track:</p>
      <ul>
        <li>Traffic sources</li>
        <li>Audience retention</li>
        <li>Click-through rate</li>
        <li>Average view duration</li>
        <li>Top-performing videos</li>
      </ul>

      <h2>Conclusion</h2>
      <p>YouTube SEO is an ongoing process that requires consistent effort and optimization. Focus on creating high-quality content that serves your audience, and use these SEO strategies to ensure your videos get the visibility they deserve.</p>

      <p>Start implementing these techniques today, and remember to use our free tools to optimize your titles, tags, and descriptions for maximum impact!</p>
    `
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)

  // Add structured data
  const structuredData = generateArticleSchema({
    headline: article.title,
    description: article.description,
    author: article.author,
    datePublished: article.date,
    image: article.image
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DashboardLayout>
        <article className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p>
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

          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-lg mb-8"
          />

          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </DashboardLayout>
    </>
  )
}
