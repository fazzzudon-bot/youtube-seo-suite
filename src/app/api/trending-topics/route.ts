import { NextRequest, NextResponse } from "next/server"
import { getTrendingTopics } from "@/lib/api/gemini"
import { getTrendingVideos } from "@/lib/api/youtube"

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json()

    // Fetch trending data from both APIs
    const [youtubeData, geminiTopics] = await Promise.all([
      getTrendingVideos("US").catch(() => null),
      getTrendingTopics(category).catch(() => null)
    ])

    // Use AI-generated topics or fallback to mock data
    const topics = geminiTopics?.topics || generateMockTrending(category)

    return NextResponse.json({ topics })
  } catch (error) {
    console.error("Trending topics error:", error)
    return NextResponse.json(
      { error: "Failed to fetch trending topics" },
      { status: 500 }
    )
  }
}

function generateMockTrending(category?: string) {
  const baseTopics = [
    {
      topic: "AI Content Creation Tools",
      reason: "Recent AI breakthroughs have sparked massive interest in automation tools",
      opportunity: 92,
      timing: "Next 2-4 weeks",
      angles: ["Tutorial", "Review", "Comparison", "Tips"]
    },
    {
      topic: "Passive Income Ideas 2024",
      reason: "Economic conditions driving alternative income searches",
      opportunity: 85,
      timing: "Immediate - High demand",
      angles: ["How-To", "Case Study", "Guide", "Stories"]
    },
    {
      topic: "Productivity Hacks",
      reason: "Remote work trends maintaining strong interest",
      opportunity: 78,
      timing: "Next 1-3 months",
      angles: ["Tips", "Tools", "Routines", "Systems"]
    }
  ]

  return baseTopics
}
