import { NextRequest, NextResponse } from "next/server"
import { analyzeCompetitor } from "@/lib/api/gemini"
import { analyzeChannelPerformance, extractChannelId } from "@/lib/api/youtube"

export async function POST(request: NextRequest) {
  try {
    const { channelUrl } = await request.json()

    if (!channelUrl) {
      return NextResponse.json(
        { error: "Channel URL is required" },
        { status: 400 }
      )
    }

    // Extract channel ID from URL
    const channelId = extractChannelId(channelUrl)
    
    if (!channelId) {
      return NextResponse.json(
        { error: "Invalid channel URL" },
        { status: 400 }
      )
    }

    // Fetch channel data from YouTube API
    const channelData = await analyzeChannelPerformance(channelId).catch(() => null)

    // Get AI insights
    const aiInsights = channelData 
      ? await analyzeCompetitor(channelData).catch(() => null)
      : null

    // Combine results
    const response = {
      ...channelData,
      strategy: aiInsights?.strategy || "Content strategy analysis unavailable",
      opportunityKeywords: aiInsights?.opportunityKeywords || [],
      weaknesses: aiInsights?.weaknesses || [],
      niche: aiInsights?.niche || "General",
      suggestions: aiInsights?.suggestions || []
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Channel analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze channel" },
      { status: 500 }
    )
  }
}
