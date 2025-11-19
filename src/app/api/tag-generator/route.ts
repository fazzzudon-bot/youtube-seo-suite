import { NextRequest, NextResponse } from "next/server"
import { generateTags } from "@/lib/api/gemini"

export async function POST(request: NextRequest) {
  try {
    const { topic, context } = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      )
    }

    // Generate tags using Gemini AI
    const result = await generateTags(topic, context).catch(() => null)

    // If AI fails, return mock data
    if (!result || !result.tags || result.tags.length === 0) {
      return NextResponse.json({
        tags: generateMockTags(topic),
        categories: {
          short: generateMockTags(topic).slice(0, 15),
          longTail: generateMockTags(topic).slice(15, 30),
          lsi: generateMockTags(topic).slice(30, 45)
        }
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Tag generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate tags" },
      { status: 500 }
    )
  }
}

function generateMockTags(topic: string) {
  const baseWords = topic.toLowerCase().split(' ')
  const modifiers = [
    "tutorial", "guide", "tips", "tricks", "how to",
    "best", "top", "review", "2024", "beginner",
    "advanced", "complete", "ultimate", "quick", "easy",
    "step by step", "full", "detailed", "comprehensive", "professional"
  ]
  
  const tags = [
    topic,
    ...baseWords,
    ...modifiers.slice(0, 10).map(mod => `${topic} ${mod}`),
    ...modifiers.slice(10, 20).map(mod => `${mod} ${topic}`),
    ...baseWords.map(word => `${word} tutorial`),
    ...baseWords.map(word => `${word} guide`)
  ]

  return tags.slice(0, 45)
}
