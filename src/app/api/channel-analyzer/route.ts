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
    const channelId = await extractChannelId(channelUrl)
    
    if (!channelId) {
      return NextResponse.json(
        { error: "Invalid channel URL. Please use a valid YouTube channel URL (e.g., youtube.com/channel/UC..., youtube.com/@username, or youtube.com/c/channelname)" },
        { status: 400 }
      )
    }

    // Fetch channel data from YouTube API
    let channelData
    try {
      channelData = await analyzeChannelPerformance(channelId)
    } catch (error: any) {
      console.error("YouTube API error:", error)
      return NextResponse.json(
        { error: `Failed to fetch channel data: ${error.message}` },
        { status: 500 }
      )
    }

    // Get AI insights
    let aiInsights
    try {
      aiInsights = await analyzeCompetitor(channelData)
    } catch (error) {
      console.warn("AI analysis failed, using basic insights:", error)
      aiInsights = null
    }

    // Combine results with fallback for AI insights
    const response = {
      ...channelData,
      strategy: aiInsights?.strategy || generateBasicStrategy(channelData),
      opportunityKeywords: aiInsights?.opportunityKeywords || generateOpportunityKeywords(channelData),
      weaknesses: aiInsights?.weaknesses || generateWeaknesses(channelData),
      niche: aiInsights?.niche || detectNiche(channelData),
      suggestions: aiInsights?.suggestions || generateSuggestions(channelData)
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error("Channel analysis error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to analyze channel" },
      { status: 500 }
    )
  }
}

function generateBasicStrategy(channelData: any): string {
  const uploadFrequency = channelData.totalVideos > 100 ? "high" : channelData.totalVideos > 50 ? "medium" : "low"
  const avgViews = channelData.avgViewsPerVideo
  
  return `This channel maintains a ${uploadFrequency} upload frequency with an average of ${formatNumber(avgViews)} views per video. ${
    avgViews > 100000 
      ? "Strong audience engagement with consistent high view counts." 
      : avgViews > 10000 
      ? "Moderate audience engagement with room for optimization." 
      : "Building audience with potential for growth through SEO and content optimization."
  }`
}

function generateOpportunityKeywords(channelData: any): string[] {
  const keywords = channelData.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
  return keywords.length > 0 
    ? keywords.slice(0, 10) 
    : ["content creation", "video tutorials", "how to", "tips and tricks", "beginner guide"]
}

function generateWeaknesses(channelData: any): string[] {
  const weaknesses = []
  
  if (channelData.avgViewsPerVideo < 10000) {
    weaknesses.push("Low average views per video - improve SEO and thumbnails")
  }
  
  if (!channelData.keywords || channelData.keywords.length < 10) {
    weaknesses.push("Limited channel keywords - add more relevant keywords")
  }
  
  if (channelData.totalVideos < 50) {
    weaknesses.push("Low video count - increase content production for better channel authority")
  }
  
  if (weaknesses.length === 0) {
    weaknesses.push("Well-optimized channel with strong metrics")
  }
  
  return weaknesses
}

function detectNiche(channelData: any): string {
  const title = channelData.title.toLowerCase()
  const description = channelData.description.toLowerCase()
  const keywords = channelData.keywords.toLowerCase()
  
  const niches = {
    'Gaming': ['game', 'gaming', 'gameplay', 'esports', 'stream'],
    'Tech': ['tech', 'technology', 'gadget', 'review', 'unbox'],
    'Education': ['tutorial', 'learn', 'education', 'course', 'teach'],
    'Entertainment': ['comedy', 'entertainment', 'funny', 'vlog', 'prank'],
    'Lifestyle': ['lifestyle', 'daily', 'vlog', 'routine', 'life'],
    'Business': ['business', 'entrepreneur', 'startup', 'marketing', 'finance'],
    'Health & Fitness': ['fitness', 'workout', 'health', 'nutrition', 'exercise'],
    'Cooking': ['cooking', 'recipe', 'food', 'chef', 'kitchen']
  }
  
  for (const [niche, terms] of Object.entries(niches)) {
    if (terms.some(term => title.includes(term) || description.includes(term) || keywords.includes(term))) {
      return niche
    }
  }
  
  return 'General Content'
}

function generateSuggestions(channelData: any): string[] {
  const suggestions = []
  
  if (channelData.avgViewsPerVideo < channelData.subscribers * 0.05) {
    suggestions.push("Improve video titles and thumbnails to increase click-through rate")
  }
  
  suggestions.push("Analyze top-performing videos and create similar content")
  suggestions.push("Optimize video descriptions with relevant keywords and timestamps")
  suggestions.push("Engage with audience through comments and community posts")
  suggestions.push("Create playlists to increase watch time and session duration")
  
  return suggestions
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}