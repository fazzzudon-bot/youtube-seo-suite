import { NextRequest, NextResponse } from "next/server"
import { aiHealthMonitor } from "@/lib/ai/health-monitor"
import { callGeminiAPI } from "@/lib/api/gemini"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Check circuit breaker
    if (!aiHealthMonitor.shouldAllowRequest()) {
      return NextResponse.json({
        response: "I'm temporarily unavailable due to high error rates. Please try again in a moment. In the meantime, here are some general YouTube growth tips: Focus on creating engaging thumbnails, use SEO-optimized titles, and maintain a consistent upload schedule.",
        fallback: true,
        timestamp: new Date().toISOString(),
      })
    }

    // Build conversation context
    const conversationContext = conversationHistory
      ?.map((msg: any) => `${msg.role}: ${msg.content}`)
      .join("\n") || ""

    const systemPrompt = `You are an expert YouTube growth advisor and SEO specialist. Your goal is to help content creators grow their YouTube channels through:

- Strategic content planning and video ideas
- SEO optimization (titles, tags, descriptions, thumbnails)
- Algorithm understanding and best practices
- Audience engagement strategies
- Channel branding and positioning
- Analytics interpretation
- Monetization strategies
- Trending topics and niche selection

Provide actionable, specific advice. Be encouraging but realistic. Keep responses concise but valuable (2-4 sentences unless the user asks for detailed explanations).

Previous conversation:
${conversationContext}

User message: ${message}

Respond as a helpful YouTube growth expert:`

    try {
      const botResponse = await callGeminiAPI(systemPrompt)
      const responseTime = Date.now() - startTime

      return NextResponse.json({
        response: botResponse || "I'm here to help with your YouTube growth!",
        timestamp: new Date().toISOString(),
        responseTime,
      })
    } catch (error) {
      // Fallback response when AI fails
      const fallbackResponses: Record<string, string> = {
        views: "To get more views: 1) Create eye-catching thumbnails with bold text, 2) Use SEO-optimized titles with keywords, 3) Post consistently at the same time, 4) Engage with comments to boost algorithm ranking.",
        title: "Best title strategies: Use numbers (Top 10, 5 Ways), create curiosity gaps, include power words (Ultimate, Secret, Proven), keep it 50-70 characters, and front-load keywords.",
        trending: "Find trending topics by: 1) Using YouTube's trending tab for your niche, 2) Following industry news, 3) Analyzing competitor channels, 4) Checking Google Trends for rising queries.",
        seo: "SEO optimization tips: Use keywords in title/description/tags, create detailed descriptions (200+ words), add timestamps, use relevant hashtags, optimize thumbnail with text, and engage viewers in first 30 seconds.",
      }

      // Simple keyword matching for fallback
      const lowerMessage = message.toLowerCase()
      let fallbackResponse = "I'm having trouble connecting right now, but here's general advice: Focus on creating high-quality content, optimize your SEO (titles, tags, descriptions), and engage consistently with your audience. What specific aspect would you like to improve?"

      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          fallbackResponse = response
          break
        }
      }

      aiHealthMonitor.recordRequest(false, Date.now() - startTime, {
        timestamp: Date.now(),
        endpoint: "chatbot",
        error: error instanceof Error ? error.message : "Unknown error",
      })

      return NextResponse.json({
        response: fallbackResponse,
        fallback: true,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Chatbot API Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to get response from AI",
        response: "I'm experiencing technical difficulties. Please try again in a moment!"
      },
      { status: 500 }
    )
  }
}