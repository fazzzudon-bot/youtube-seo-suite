import { NextResponse } from "next/server"
import { calculateSEOScore } from "@/lib/api/gemini"
import { getYouTubeVideoData } from "@/lib/api/youtube"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { videoUrl, videoData } = body

    let data = videoData

    // If URL provided, fetch video data from YouTube
    if (videoUrl && !videoData) {
      const videoId = extractVideoId(videoUrl)
      if (!videoId) {
        return NextResponse.json(
          { error: "Invalid YouTube URL" },
          { status: 400 }
        )
      }
      data = await getYouTubeVideoData(videoId)
    }

    if (!data) {
      return NextResponse.json(
        { error: "Video data is required" },
        { status: 400 }
      )
    }

    // Calculate SEO score using Gemini AI
    const seoScore = await calculateSEOScore(data)

    // Generate line-by-line suggestions
    const suggestions = generateDetailedSuggestions(data, seoScore)

    return NextResponse.json({
      ...seoScore,
      suggestions,
      videoData: data,
    })
  } catch (error) {
    console.error("SEO Score API Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to calculate SEO score",
      },
      { status: 500 }
    )
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

function generateDetailedSuggestions(videoData: any, seoScore: any) {
  const suggestions = []

  // Title Analysis
  if (videoData.title) {
    const titleLength = videoData.title.length
    if (titleLength < 50) {
      suggestions.push({
        category: "Title",
        severity: "warning",
        issue: "Title too short",
        suggestion: "Expand your title to 50-70 characters for better SEO",
        current: `${titleLength} characters`,
        recommended: "50-70 characters",
      })
    } else if (titleLength > 70) {
      suggestions.push({
        category: "Title",
        severity: "info",
        issue: "Title might be truncated",
        suggestion: "Consider shortening to under 70 characters",
        current: `${titleLength} characters`,
        recommended: "50-70 characters",
      })
    }

    if (!/[?!]/.test(videoData.title)) {
      suggestions.push({
        category: "Title",
        severity: "info",
        issue: "No emotional trigger",
        suggestion: "Add curiosity or urgency with punctuation (? or !)",
        example: "How to Rank YouTube Videos FAST!",
      })
    }

    if (!/\d/.test(videoData.title)) {
      suggestions.push({
        category: "Title",
        severity: "info",
        issue: "No numbers",
        suggestion: "Numbers increase CTR. Try: '5 Tips to...' or '2024 Guide...'",
        example: "7 YouTube SEO Secrets That Actually Work",
      })
    }
  }

  // Description Analysis
  if (videoData.description) {
    const descLength = videoData.description.length
    if (descLength < 200) {
      suggestions.push({
        category: "Description",
        severity: "error",
        issue: "Description too short",
        suggestion: "Write at least 200 characters with keywords and chapters",
        current: `${descLength} characters`,
        recommended: "200+ characters",
      })
    }

    if (!videoData.description.toLowerCase().includes("http")) {
      suggestions.push({
        category: "Description",
        severity: "warning",
        issue: "No links",
        suggestion: "Add links to your website, social media, or related videos",
      })
    }

    if (!/\d:\d{2}/.test(videoData.description)) {
      suggestions.push({
        category: "Description",
        severity: "info",
        issue: "No timestamps",
        suggestion: "Add chapter timestamps for better user experience",
        example: "0:00 Intro\n1:30 Main Content\n5:45 Conclusion",
      })
    }
  }

  // Tags Analysis
  if (videoData.tags) {
    const tagCount = videoData.tags.length
    if (tagCount < 10) {
      suggestions.push({
        category: "Tags",
        severity: "warning",
        issue: "Not enough tags",
        suggestion: "Add more tags (30-50 recommended) with mix of short and long-tail",
        current: `${tagCount} tags`,
        recommended: "30-50 tags",
      })
    } else if (tagCount > 50) {
      suggestions.push({
        category: "Tags",
        severity: "info",
        issue: "Too many tags",
        suggestion: "Focus on 30-50 highly relevant tags instead of quantity",
        current: `${tagCount} tags`,
        recommended: "30-50 tags",
      })
    }

    const longTailTags = videoData.tags.filter((tag: string) => tag.split(" ").length >= 3)
    if (longTailTags.length < 5) {
      suggestions.push({
        category: "Tags",
        severity: "info",
        issue: "Not enough long-tail tags",
        suggestion: "Add 5-10 long-tail tags (3+ words) for niche targeting",
        example: "how to grow youtube channel fast 2024",
      })
    }
  }

  return suggestions
}
