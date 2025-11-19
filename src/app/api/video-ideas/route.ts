import { NextRequest, NextResponse } from "next/server"
import { generateVideoIdeas } from "@/lib/api/gemini"

export async function POST(request: NextRequest) {
  try {
    const { niche, competitorData } = await request.json()

    if (!niche) {
      return NextResponse.json(
        { error: "Niche is required" },
        { status: 400 }
      )
    }

    // Generate video ideas using Gemini AI with fallback
    let result;
    try {
      result = await generateVideoIdeas(niche, competitorData)
      
      // Validate the result
      if (!result || !result.ideas || !Array.isArray(result.ideas) || result.ideas.length === 0) {
        throw new Error('Invalid or empty response from AI')
      }
    } catch (aiError) {
      console.warn('AI generation failed, using fallback:', aiError)
      result = { ideas: generateMockIdeas(niche) }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Video ideas error:", error)
    
    // Always return valid data even on error
    const errorNiche = "your content"
    try {
      const body = await request.json()
      return NextResponse.json({
        ideas: generateMockIdeas(body.niche || errorNiche)
      })
    } catch {
      return NextResponse.json({
        ideas: generateMockIdeas(errorNiche)
      })
    }
  }
}

function generateMockIdeas(niche: string) {
  const templates = [
    { 
      title: `Complete Beginner's Guide to ${niche}`, 
      category: "evergreen" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "50K-100K",
      description: "A comprehensive guide covering all the basics for newcomers"
    },
    { 
      title: `5 ${niche} Mistakes to Avoid in 2024`, 
      category: "trending" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "30K-70K",
      description: "Common pitfalls and how to overcome them"
    },
    { 
      title: `I Tried ${niche} for 30 Days - Here's What Happened`, 
      category: "trending" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "40K-90K",
      description: "Personal journey and transformation story"
    },
    { 
      title: `Ultimate ${niche} Setup Tour 2024`, 
      category: "evergreen" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "25K-60K",
      description: "Show your complete setup and gear"
    },
    { 
      title: `${niche} vs Traditional Methods - Honest Comparison`, 
      category: "evergreen" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "35K-75K",
      description: "Side-by-side comparison of different approaches"
    },
    { 
      title: `Advanced ${niche} Techniques Nobody Talks About`, 
      category: "gap" as const, 
      difficulty: "Hard" as const, 
      potentialViews: "20K-50K",
      description: "Deep dive into expert-level strategies"
    },
    { 
      title: `${niche} on a Budget - Complete Guide`, 
      category: "evergreen" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "30K-70K",
      description: "How to get started without breaking the bank"
    },
    { 
      title: `My Daily ${niche} Routine Revealed`, 
      category: "trending" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "35K-80K",
      description: "Behind-the-scenes look at daily practices"
    },
    { 
      title: `${niche} Myths Debunked by Experts`, 
      category: "unique" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "50K-100K",
      description: "Separating fact from fiction in the industry"
    },
    { 
      title: `From Zero to Pro: ${niche} Transformation`, 
      category: "evergreen" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "40K-90K",
      description: "Complete roadmap from beginner to expert"
    },
    { 
      title: `The ONLY ${niche} Guide You'll Ever Need`, 
      category: "evergreen" as const, 
      difficulty: "Hard" as const, 
      potentialViews: "70K-150K",
      description: "All-in-one comprehensive resource"
    },
    { 
      title: `What Experts Don't Tell You About ${niche}`, 
      category: "gap" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "45K-95K",
      description: "Industry secrets and insider knowledge"
    },
    { 
      title: `Quick ${niche} Tips for Instant Results`, 
      category: "trending" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "25K-60K",
      description: "Fast actionable advice that works immediately"
    },
    { 
      title: `Comparing ALL ${niche} Options in 2024`, 
      category: "evergreen" as const, 
      difficulty: "Hard" as const, 
      potentialViews: "35K-80K",
      description: "Comprehensive comparison of all available choices"
    },
    { 
      title: `The Future of ${niche} - 2024 Predictions`, 
      category: "unique" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "40K-85K",
      description: "Expert predictions and industry trends"
    },
    { 
      title: `${niche} Problem Solved in 5 Minutes`, 
      category: "gap" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "30K-70K",
      description: "Quick solution to common challenges"
    },
    { 
      title: `10 Things I Wish I Knew Before Starting ${niche}`, 
      category: "gap" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "45K-95K",
      description: "Lessons learned from experience"
    },
    { 
      title: `${niche} Secrets the Pros Use`, 
      category: "unique" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "55K-110K",
      description: "Professional tips and hidden techniques"
    },
    { 
      title: `My ${niche} Results After 1 Year - Full Breakdown`, 
      category: "trending" as const, 
      difficulty: "Medium" as const, 
      potentialViews: "50K-100K",
      description: "Long-term results and analytics review"
    },
    { 
      title: `Is ${niche} Worth It? Honest Review 2024`, 
      category: "evergreen" as const, 
      difficulty: "Easy" as const, 
      potentialViews: "40K-85K",
      description: "Unbiased review with pros and cons"
    }
  ]

  return templates
}