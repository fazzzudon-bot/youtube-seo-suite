import { NextRequest, NextResponse } from "next/server"
import { generateTitles } from "@/lib/api/gemini"

export async function POST(request: NextRequest) {
  try {
    const { topic, style } = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      )
    }

    // Generate titles using Gemini AI
    const result = await generateTitles(topic, style).catch(() => null)

    // If AI fails, return mock data
    if (!result || !result.titles || result.titles.length === 0) {
      return NextResponse.json({
        titles: generateMockTitles(topic, style)
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Title generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate titles" },
      { status: 500 }
    )
  }
}

function generateMockTitles(topic: string, style?: string) {
  const templates = [
    `Complete ${topic} Guide for Beginners in 2024`,
    `How to ${topic} - Step by Step Tutorial`,
    `${topic}: Everything You Need to Know`,
    `The ULTIMATE ${topic} Guide (2024 Updated)`,
    `I Tried ${topic} for 30 Days - Here's What Happened`,
    `${topic} Explained in 10 Minutes`,
    `5 Mistakes Everyone Makes with ${topic}`,
    `Why ${topic} is ESSENTIAL in 2024`,
    `${topic} vs [Alternative] - Which is Better?`,
    `The Truth About ${topic} Nobody Tells You`
  ]

  return templates
}
