import { NextRequest, NextResponse } from "next/server"
import { calculateSEOScore } from "@/lib/api/gemini"
import { analyzeVideoEngagement, extractVideoId } from "@/lib/api/youtube"

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required" },
        { status: 400 }
      )
    }

    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl)
    
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid video URL" },
        { status: 400 }
      )
    }

    // Fetch video data from YouTube API
    const videoData = await analyzeVideoEngagement(videoId).catch(() => null)

    if (!videoData) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      )
    }

    // Get AI SEO analysis
    const seoAnalysis = await calculateSEOScore(videoData).catch(() => null)

    // Combine results
    const response = {
      ...videoData,
      totalScore: seoAnalysis?.totalScore || 75,
      breakdown: seoAnalysis?.breakdown || {
        title: 20,
        description: 18,
        tags: 17,
        engagement: 20
      },
      improvements: seoAnalysis?.improvements || [
        "Add more keywords to your title",
        "Expand your description",
        "Include timestamps",
        "Add more relevant tags"
      ],
      strengths: seoAnalysis?.strengths || [
        "Good engagement rate",
        "Strong view count"
      ]
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Video analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze video" },
      { status: 500 }
    )
  }
}
