import { DashboardLayout } from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "How the YouTube Algorithm Works in 2024 | Complete Guide",
  description: "Understand YouTube's recommendation algorithm and how to optimize your content for maximum reach. Learn ranking factors, CTR optimization, and watch time strategies.",
  keywords: ["youtube algorithm", "youtube ranking", "recommendation system", "youtube seo", "video ranking"],
  openGraph: {
    title: "How the YouTube Algorithm Works in 2024",
    description: "Understand YouTube's recommendation algorithm and optimize your content for maximum reach",
    type: "article",
    publishedTime: "2024-01-12",
    authors: ["YouTube SEO Team"]
  }
};

const article = {
  title: "How the YouTube Algorithm Works in 2024",
  description: "Understand YouTube's recommendation algorithm and how to optimize your content for maximum reach.",
  category: "Algorithm",
  readTime: "12 min read",
  date: "2024-01-12",
  author: "YouTube SEO Team",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
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
            <h2>Understanding the YouTube Algorithm in 2024</h2>
            <p>YouTube's algorithm is one of the most sophisticated recommendation systems in the world. It determines which videos get recommended, appear in search results, and go viral. Understanding how it works is crucial for any content creator looking to grow their channel.</p>

            <h2>The Core Goal of YouTube's Algorithm</h2>
            <p>YouTube's primary objective is simple: <strong>keep users watching as long as possible</strong>. Every algorithmic decision is designed to maximize viewer satisfaction and watch time on the platform.</p>

            <h2>Key Ranking Factors</h2>
            
            <h3>1. Click-Through Rate (CTR)</h3>
            <p>CTR measures how often people click on your video after seeing the thumbnail. A high CTR signals to YouTube that your content is appealing.</p>
            <ul>
              <li><strong>Average CTR:</strong> 2-10% is typical for most channels</li>
              <li><strong>High-performing videos:</strong> Often exceed 10% CTR</li>
              <li><strong>Optimization tips:</strong> Use compelling thumbnails, clear titles, and curiosity gaps</li>
            </ul>

            <h3>2. Average View Duration (AVD)</h3>
            <p>AVD measures how long viewers watch your video on average. Higher AVD means more engaging content.</p>
            <ul>
              <li>YouTube prioritizes videos that keep viewers watching</li>
              <li>Aim for at least 50% average view duration</li>
              <li>Hook viewers in the first 15 seconds</li>
              <li>Use pattern interrupts to maintain attention</li>
            </ul>

            <h3>3. Watch Time</h3>
            <p>Total minutes watched across all viewers. This is one of the most important metrics.</p>
            <ul>
              <li>Longer videos can generate more watch time</li>
              <li>But only if viewers actually watch them</li>
              <li>Quality over quantity - engagement matters more than length</li>
            </ul>

            <h3>4. Session Time</h3>
            <p>How long viewers stay on YouTube after watching your video. Videos that lead to longer sessions are rewarded.</p>

            <h3>5. Engagement Signals</h3>
            <p>Likes, comments, shares, and subscriptions all signal content quality:</p>
            <ul>
              <li><strong>Comments:</strong> Indicate active viewer engagement</li>
              <li><strong>Likes:</strong> Show positive sentiment</li>
              <li><strong>Shares:</strong> Suggest viral potential</li>
              <li><strong>Subscribes:</strong> Indicate strong viewer interest</li>
            </ul>

            <h2>How the Algorithm Surfaces Videos</h2>

            <h3>The Homepage Feed</h3>
            <p>Personalized based on:</p>
            <ul>
              <li>Watch history</li>
              <li>Subscribed channels</li>
              <li>Performance of similar videos</li>
              <li>Viewer preferences and behaviors</li>
            </ul>

            <h3>Suggested Videos</h3>
            <p>Appears next to and after videos. Based on:</p>
            <ul>
              <li>Videos frequently watched together</li>
              <li>Similar topics and keywords</li>
              <li>Viewer watch patterns</li>
            </ul>

            <h3>Search Results</h3>
            <p>Ranking factors include:</p>
            <ul>
              <li>Keyword relevance in title, description, tags</li>
              <li>Video performance for that search term</li>
              <li>Channel authority</li>
              <li>Freshness (for news/trending topics)</li>
            </ul>

            <h2>The First 48 Hours Are Critical</h2>
            <p>When you publish a video, YouTube tests it with a small audience (subscribers and regular viewers). Based on initial performance, it decides whether to promote it further.</p>

            <h3>What YouTube Monitors:</h3>
            <ul>
              <li>CTR from impressions</li>
              <li>Average view duration</li>
              <li>Engagement rate</li>
              <li>Share velocity</li>
            </ul>

            <p>If your video performs well initially, YouTube will show it to progressively larger audiences.</p>

            <h2>Content Freshness and Upload Consistency</h2>
            <p>Regular uploads signal to YouTube that your channel is active:</p>
            <ul>
              <li>Consistent schedule builds audience expectations</li>
              <li>Recent videos get priority in search and recommendations</li>
              <li>Dormant channels receive less promotion</li>
            </ul>

            <h2>Personalization: Why Different Viewers See Different Videos</h2>
            <p>YouTube personalizes recommendations based on:</p>
            <ul>
              <li><strong>Watch history:</strong> Topics and creators you've watched</li>
              <li><strong>Search history:</strong> Keywords you've searched for</li>
              <li><strong>Engagement:</strong> Videos you've liked, commented on, or shared</li>
              <li><strong>Device and location:</strong> Mobile vs desktop, geographic preferences</li>
              <li><strong>Time of day:</strong> When you typically watch videos</li>
            </ul>

            <h2>Myths About the YouTube Algorithm</h2>

            <h3>Myth #1: You Need to Upload Daily</h3>
            <p><strong>Truth:</strong> Quality beats quantity. One great video per week is better than seven mediocre ones.</p>

            <h3>Myth #2: Longer Videos Always Rank Better</h3>
            <p><strong>Truth:</strong> Only if they maintain engagement. A 5-minute video with high retention beats a 20-minute video people abandon.</p>

            <h3>Myth #3: Keywords Are Everything</h3>
            <p><strong>Truth:</strong> Keywords help discovery, but viewer behavior determines success.</p>

            <h3>Myth #4: The Algorithm Is Against Small Channels</h3>
            <p><strong>Truth:</strong> The algorithm favors videos that resonate with audiences, regardless of channel size.</p>

            <h2>How to Optimize for the Algorithm</h2>

            <h3>1. Hook Viewers Immediately</h3>
            <ul>
              <li>First 15 seconds determine if viewers stay</li>
              <li>Tease the payoff without giving it away</li>
              <li>Cut straight to value - no long intros</li>
            </ul>

            <h3>2. Create Binge-Worthy Content</h3>
            <ul>
              <li>End videos with strong CTAs for related content</li>
              <li>Use playlists to increase session time</li>
              <li>Create series that keep viewers coming back</li>
            </ul>

            <h3>3. Master Thumbnails and Titles</h3>
            <ul>
              <li>Test different styles and analyze CTR</li>
              <li>Use contrast and bold text</li>
              <li>Create curiosity without clickbait</li>
            </ul>

            <h3>4. Encourage Engagement</h3>
            <ul>
              <li>Ask questions in your videos</li>
              <li>Respond to comments quickly</li>
              <li>Create community posts</li>
              <li>Use polls and engagement features</li>
            </ul>

            <h3>5. Analyze Your YouTube Analytics</h3>
            <p>Key metrics to monitor:</p>
            <ul>
              <li>CTR by traffic source</li>
              <li>Audience retention graphs</li>
              <li>Traffic sources (where views come from)</li>
              <li>Best performing content</li>
            </ul>

            <h2>The Future of YouTube's Algorithm</h2>
            <p>YouTube continues to evolve its algorithm with focus on:</p>
            <ul>
              <li><strong>AI-powered recommendations:</strong> More sophisticated personalization</li>
              <li><strong>Shorts integration:</strong> How Shorts affect channel growth</li>
              <li><strong>Community engagement:</strong> More weight on viewer interactions</li>
              <li><strong>Content quality:</strong> Fighting spam and low-quality content</li>
            </ul>

            <h2>Conclusion</h2>
            <p>The YouTube algorithm isn't your enemy - it's a tool that rewards creators who make content viewers love. Focus on creating valuable, engaging content that serves your audience, and the algorithm will work in your favor.</p>

            <p><strong>Key Takeaways:</strong></p>
            <ul>
              <li>Optimize for watch time and AVD, not just views</li>
              <li>The first 48 hours are critical for new videos</li>
              <li>CTR and engagement signals matter immensely</li>
              <li>Consistency builds momentum over time</li>
              <li>Audience satisfaction is the ultimate ranking factor</li>
            </ul>
          </div>
        </article>
      </DashboardLayout>
    </>
  );
}
