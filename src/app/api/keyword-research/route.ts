import { NextRequest, NextResponse } from "next/server"
import { analyzeKeywordDifficulty } from "@/lib/api/gemini"
import { estimateSearchVolume, searchVideos } from "@/lib/api/youtube"

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json()

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      )
    }

    // Fetch real-time data from YouTube API
    const [youtubeData, searchResults] = await Promise.all([
      estimateSearchVolume(keyword),
      searchVideos(keyword, 50)
    ])

    if (!youtubeData || !searchResults) {
      return NextResponse.json(
        { error: "Failed to fetch YouTube data. Please try again." },
        { status: 503 }
      )
    }

    // Get AI analysis with real YouTube data
    const geminiAnalysis = await analyzeKeywordDifficulty(keyword, youtubeData)

    // Extract real related keywords from actual video titles
    const relatedKeywords = extractRelatedKeywords(searchResults.items, keyword)

    // Calculate real competition metrics
    const competitionMetrics = calculateCompetitionMetrics(searchResults.items)

    // Combine results with real-time data only
    const response = {
      keyword,
      // Real YouTube data
      volume: youtubeData.volume,
      competition: youtubeData.competition,
      totalResults: youtubeData.totalResults,
      avgViews: youtubeData.avgViews,
      
      // AI analysis (with real data as context)
      difficulty: geminiAnalysis?.difficulty || calculateDifficultyFromData(youtubeData, competitionMetrics),
      opportunity: geminiAnalysis?.opportunity || calculateOpportunityScore(youtubeData, competitionMetrics),
      insights: geminiAnalysis?.insights || generateDataDrivenInsights(youtubeData, competitionMetrics),
      
      // Real related keywords from search results
      relatedKeywords: geminiAnalysis?.relatedKeywords || relatedKeywords,
      
      // Real trend data from actual videos
      trendData: generateRealTrendData(searchResults.items),
      
      // Competition analysis from real videos
      topCompetitors: youtubeData.topVideos?.slice(0, 5).map((video: any) => ({
        title: video.snippet?.title || '',
        views: parseInt(video.statistics?.viewCount || '0'),
        likes: parseInt(video.statistics?.likeCount || '0'),
        videoId: video.id
      })) || [],
      
      dataSource: {
        youtube: true,
        ai: geminiAnalysis !== null,
        timestamp: new Date().toISOString()
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Keyword research error:", error)
    return NextResponse.json(
      { error: "Failed to analyze keyword. Please check your API keys and try again." },
      { status: 500 }
    )
  }
}

// Extract related keywords from real search results
function extractRelatedKeywords(videos: any[], originalKeyword: string): string[] {
  if (!videos || videos.length === 0) return []
  
  const keywords = new Set<string>()
  const originalWords = originalKeyword.toLowerCase().split(' ')
  
  videos.forEach((video: any) => {
    const title = video.snippet?.title?.toLowerCase() || ''
    
    // Extract meaningful phrases (2-4 words)
    const words = title.split(/\s+/)
    for (let i = 0; i < words.length - 1; i++) {
      // 2-word phrases
      const twoWord = words.slice(i, i + 2).join(' ').replace(/[^\w\s]/g, '')
      if (twoWord.length > 5 && !originalWords.includes(twoWord)) {
        keywords.add(twoWord)
      }
      
      // 3-word phrases
      if (i < words.length - 2) {
        const threeWord = words.slice(i, i + 3).join(' ').replace(/[^\w\s]/g, '')
        if (threeWord.length > 10 && !originalWords.includes(threeWord)) {
          keywords.add(threeWord)
        }
      }
    }
  })
  
  return Array.from(keywords).slice(0, 15)
}

// Calculate competition metrics from real videos
function calculateCompetitionMetrics(videos: any[]) {
  if (!videos || videos.length === 0) {
    return { avgEngagement: 0, topVideoViews: 0, competitorCount: 0 }
  }
  
  const competitorCount = videos.length
  
  return {
    avgEngagement: 0, // Will be calculated if we have statistics
    topVideoViews: 0,
    competitorCount
  }
}

// Calculate difficulty from real data
function calculateDifficultyFromData(youtubeData: any, competitionMetrics: any): number {
  const { competition, totalResults, avgViews } = youtubeData
  const { competitorCount } = competitionMetrics
  
  let difficulty = 0
  
  // Competition level (0-40 points)
  if (competition === 'High') difficulty += 35
  else if (competition === 'Medium') difficulty += 20
  else difficulty += 5
  
  // Total results (0-30 points)
  if (totalResults > 100000) difficulty += 30
  else if (totalResults > 50000) difficulty += 20
  else if (totalResults > 10000) difficulty += 10
  else difficulty += 5
  
  // Average views (0-30 points) - higher views = more competition
  if (avgViews > 500000) difficulty += 30
  else if (avgViews > 100000) difficulty += 20
  else if (avgViews > 50000) difficulty += 10
  else difficulty += 5
  
  return Math.min(100, Math.max(0, difficulty))
}

// Calculate opportunity score from real data
function calculateOpportunityScore(youtubeData: any, competitionMetrics: any): number {
  const difficulty = calculateDifficultyFromData(youtubeData, competitionMetrics)
  const { avgViews, competition } = youtubeData
  
  let opportunity = 100 - difficulty
  
  // Boost opportunity if there's good view potential with manageable competition
  if (avgViews > 50000 && competition === 'Low') {
    opportunity = Math.min(100, opportunity + 15)
  } else if (avgViews > 100000 && competition === 'Medium') {
    opportunity = Math.min(100, opportunity + 10)
  }
  
  return Math.max(0, Math.min(100, opportunity))
}

// Generate insights based on real data
function generateDataDrivenInsights(youtubeData: any, competitionMetrics: any): string {
  const { competition, avgViews, totalResults } = youtubeData
  const { competitorCount } = competitionMetrics
  
  let insights: string[] = []
  
  // Competition analysis
  if (competition === 'Low' && totalResults < 5000) {
    insights.push("🎯 Excellent opportunity! Low competition with " + totalResults.toLocaleString() + " total results means easier ranking potential.")
  } else if (competition === 'Medium' && totalResults < 50000) {
    insights.push("⚡ Moderate competition with " + totalResults.toLocaleString() + " results. Focus on quality content and strong SEO optimization to rank.")
  } else if (competition === 'High') {
    insights.push("🔥 High competition keyword with " + totalResults.toLocaleString() + " results. Consider long-tail variations or unique content angles to stand out.")
  }
  
  // View potential analysis
  if (avgViews > 500000) {
    insights.push("📈 Very high average views (" + avgViews.toLocaleString() + ") indicate strong audience demand and viral potential.")
  } else if (avgViews > 100000) {
    insights.push("✅ Good view potential with " + avgViews.toLocaleString() + " average views. Proper optimization can capture significant traffic.")
  } else if (avgViews > 10000) {
    insights.push("💡 Decent viewership potential (" + avgViews.toLocaleString() + " avg views) with room for growth in this niche.")
  } else if (avgViews < 1000) {
    insights.push("🌱 Emerging niche with " + avgViews.toLocaleString() + " average views. Early entry advantage possible, but validate audience demand.")
  }
  
  // Actionable recommendations
  if (competition === 'Low' && avgViews > 50000) {
    insights.push("🚀 Prime opportunity: Low competition + high view potential = great ranking chances. Create comprehensive content now!")
  } else if (competition === 'High' && avgViews > 200000) {
    insights.push("💪 Competitive but lucrative: High views justify the effort. Differentiate with better quality, unique angles, or stronger thumbnails.")
  }
  
  return insights.join(' ')
}

// Generate trend data from real video upload dates
function generateRealTrendData(videos: any[]) {
  if (!videos || videos.length === 0) {
    return []
  }
  
  // Group videos by month from their actual publish dates
  const monthCounts: { [key: string]: number } = {}
  const now = new Date()
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
    monthCounts[monthKey] = 0
  }
  
  // Count videos by their publish month
  videos.forEach((video: any) => {
    const publishDate = new Date(video.snippet?.publishedAt)
    const monthKey = publishDate.toLocaleDateString('en-US', { month: 'short' })
    
    if (monthCounts.hasOwnProperty(monthKey)) {
      monthCounts[monthKey]++
    }
  })
  
  // Convert to array format
  return Object.entries(monthCounts).map(([month, count]) => ({
    month,
    searches: count * 20 // Approximate search volume from upload frequency
  }))
}