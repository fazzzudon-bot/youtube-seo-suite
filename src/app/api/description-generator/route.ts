import { NextRequest, NextResponse } from "next/server"
import { generateDescription } from "@/lib/api/gemini"

export async function POST(request: NextRequest) {
  try {
    const { title, tags, duration } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Generate description using Gemini AI
    const result = await generateDescription(title, tags || [], duration).catch(() => null)

    // If AI fails, return mock data
    if (!result || !result.description) {
      return NextResponse.json({
        description: generateMockDescription(title, tags),
        chapters: generateMockChapters()
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Description generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    )
  }
}

function generateMockDescription(title: string, tags?: string[]) {
  const tagList = tags && tags.length > 0 ? tags.slice(0, 5).join(", ") : "tutorial, guide, how to"
  
  return `${title}

In this comprehensive video, you'll learn everything you need to know about ${title.toLowerCase()}.

🎯 What You'll Learn:
• Key concepts and fundamentals
• Step-by-step practical examples
• Common mistakes to avoid
• Pro tips and best practices
• Advanced techniques for better results

📚 Timestamps:
0:00 - Introduction
2:15 - Getting Started
5:30 - Main Content
10:45 - Advanced Techniques
15:20 - Common Mistakes
18:30 - Final Tips & Conclusion

💡 Free Resources:
Download the free guide: [Your Link]
Join our community: [Your Link]

🔗 Connect With Us:
Instagram: @yourhandle
Twitter: @yourhandle
Website: yourwebsite.com

If you found this helpful, please:
• Like this video 👍
• Subscribe for more content 🔔
• Share with someone who needs this 🔄
• Drop your questions in the comments 💬

Related topics: ${tagList}

#${tags?.[0]?.replace(/\s+/g, '') || 'Tutorial'} #HowTo #Guide`
}

function generateMockChapters() {
  return [
    "0:00 - Introduction",
    "2:15 - Getting Started",
    "5:30 - Main Content",
    "10:45 - Advanced Techniques",
    "15:20 - Common Mistakes",
    "18:30 - Conclusion"
  ]
}
