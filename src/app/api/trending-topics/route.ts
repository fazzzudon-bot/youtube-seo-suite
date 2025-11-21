import { NextRequest, NextResponse } from "next/server"
import { getTrendingTopics } from "@/lib/api/gemini"
import { getTrendingVideos } from "@/lib/api/youtube"

// Map frontend category names to YouTube-compatible formats
function mapCategoryToYouTube(category: string): string {
  const categoryMap: Record<string, string> = {
    'all': '',
    'gaming': 'Gaming',
    'tech': 'Technology',
    'education': 'Education',
    'entertainment': 'Entertainment',
    'howto': 'Howto',
    'lifestyle': 'Travel',
    'finance': 'News',
    'health': 'Sports'
  }
  return categoryMap[category.toLowerCase()] || ''
}

export async function POST(request: NextRequest) {
  try {
    const { category, regionCode } = await request.json()
    
    // Map category properly
    const mappedCategory = mapCategoryToYouTube(category || 'all')

    // Fetch real trending videos from YouTube API with proper category
    const youtubeData = await getTrendingVideos(regionCode || "US", mappedCategory).catch((error) => {
      console.error("YouTube trending fetch error:", error)
      return null
    })

    // Extract real trending topics from YouTube data
    let topics = []
    
    if (youtubeData && youtubeData.items && youtubeData.items.length > 0) {
      // Analyze trending videos to extract topics
      const videoData = youtubeData.items.slice(0, 20).map((item: any) => ({
        title: item.snippet.title,
        views: parseInt(item.statistics?.viewCount || '0'),
        likes: parseInt(item.statistics?.likeCount || '0'),
        comments: parseInt(item.statistics?.commentCount || '0'),
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        tags: item.snippet.tags || [],
        categoryId: item.snippet.categoryId || ''
      }))

      // Get AI insights on trending topics with real data
      try {
        const geminiTopics = await getTrendingTopics(mappedCategory || category, videoData)
        topics = geminiTopics?.topics || []
      } catch (aiError) {
        console.warn("AI trending topics failed, generating from YouTube data", aiError)
      }

      // If AI fails, generate topics directly from real YouTube data
      if (topics.length === 0) {
        topics = generateTopicsFromYouTubeData(videoData, category)
      }

      // Add real trending videos as examples
      topics = topics.map((topic: any, index: number) => ({
        ...topic,
        exampleVideo: videoData[index] || null,
        dataSource: 'real-time-youtube',
        category: category,
        lastUpdated: new Date().toISOString()
      }))
    } else {
      // Fallback to category-specific mock data if YouTube API fails
      console.warn("YouTube API unavailable, using category-specific fallback data")
      topics = generateMockTrending(category)
    }

    return NextResponse.json({ 
      topics,
      category: category,
      dataSource: youtubeData ? 'youtube-api' : 'fallback',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Trending topics error:", error)
    // Return category-specific fallback data instead of error
    const { category } = await request.json().catch(() => ({ category: 'all' }))
    return NextResponse.json({ 
      topics: generateMockTrending(category),
      category: category,
      dataSource: 'fallback-error',
      timestamp: new Date().toISOString()
    })
  }
}

function generateTopicsFromYouTubeData(videos: any[], category?: string) {
  // Extract meaningful topics from real trending videos
  const topics = []
  const seenTopics = new Set<string>()
  
  for (const video of videos) {
    // Extract main topic from title (remove clickbait words)
    let topicTitle = video.title
      .replace(/[!?]+/g, '')
      .split('|')[0]
      .split('-')[0]
      .trim()
      .substring(0, 60)
    
    // Skip if we've seen similar topic
    if (seenTopics.has(topicTitle.toLowerCase())) continue
    seenTopics.add(topicTitle.toLowerCase())
    
    // Calculate engagement rate
    const engagementRate = video.views > 0 
      ? ((video.likes + video.comments) / video.views * 100).toFixed(2)
      : '0'
    
    // Determine opportunity score based on views and engagement
    const viewScore = Math.min(100, Math.floor(video.views / 100000))
    const engagementScore = parseFloat(engagementRate) * 10
    const opportunity = Math.min(95, Math.max(50, Math.floor((viewScore + engagementScore) / 2)))
    
    // Extract content angles from tags or generate defaults
    const angles = video.tags.slice(0, 4).length > 0 
      ? video.tags.slice(0, 4)
      : ['Tutorial', 'Review', 'Guide', 'Tips']
    
    topics.push({
      topic: topicTitle,
      reason: `Currently trending with ${formatViews(video.views)} views and ${engagementRate}% engagement rate`,
      opportunity,
      timing: getTimingRecommendation(video.publishedAt),
      angles,
      metrics: {
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        engagementRate: parseFloat(engagementRate)
      },
      channel: video.channelTitle,
      publishedAt: video.publishedAt
    })
    
    if (topics.length >= 10) break
  }
  
  return topics
}

function getTimingRecommendation(publishedAt: string): string {
  const publishDate = new Date(publishedAt)
  const now = new Date()
  const hoursDiff = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60)
  
  if (hoursDiff < 24) {
    return "Immediate - Trending right now!"
  } else if (hoursDiff < 72) {
    return "Next 24-48 hours - Still hot"
  } else if (hoursDiff < 168) {
    return "Next 1-2 weeks - Growing trend"
  } else {
    return "Next 2-4 weeks - Sustained interest"
  }
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

function generateMockTrending(category?: string) {
  // Category-specific fallback topics
  const categoryTopics: Record<string, any[]> = {
    gaming: [
      {
        topic: "New Game Release Gameplay & Review",
        reason: "Major AAA game launch driving massive interest in walkthroughs and first impressions",
        opportunity: 94,
        timing: "Immediate - Launch window",
        angles: ["First Impressions", "Full Gameplay", "Tips & Tricks", "Easter Eggs"]
      },
      {
        topic: "Esports Tournament Highlights",
        reason: "Major championship finals generating huge viewership and clip demand",
        opportunity: 89,
        timing: "Next 24-48 hours",
        angles: ["Best Plays", "Analysis", "Player Interviews", "Drama Breakdown"]
      },
      {
        topic: "Gaming Setup & Peripherals Review",
        reason: "Gamers upgrading setups, looking for hardware recommendations",
        opportunity: 82,
        timing: "Next 1-2 weeks",
        angles: ["Budget Setup", "High-End Builds", "Peripheral Reviews", "RGB Customization"]
      },
      {
        topic: "Indie Game Hidden Gems",
        reason: "Discovery content performing well as players seek unique experiences",
        opportunity: 76,
        timing: "Next 2-4 weeks",
        angles: ["Top 10 Lists", "Gameplay Showcase", "Developer Interviews", "Genre Guides"]
      },
      {
        topic: "Speedrun Records & Strategies",
        reason: "Competitive speedrunning community active with new record attempts",
        opportunity: 78,
        timing: "Next 1-3 weeks",
        angles: ["World Record", "Tutorial Guide", "Glitch Explanations", "Runner Reactions"]
      },
      {
        topic: "Game Mod Showcases",
        reason: "Modding community creating viral content with creative modifications",
        opportunity: 85,
        timing: "Immediate",
        angles: ["Crazy Mods", "Graphics Overhaul", "Total Conversion", "Multiplayer Mods"]
      }
    ],
    tech: [
      {
        topic: "Latest Smartphone Unboxing & Review",
        reason: "New flagship phone launches creating peak interest in comparisons and reviews",
        opportunity: 92,
        timing: "Immediate - Launch period",
        angles: ["Unboxing", "Camera Test", "vs Competition", "Value Analysis"]
      },
      {
        topic: "AI Tools for Productivity",
        reason: "AI revolution driving searches for practical automation tools",
        opportunity: 95,
        timing: "Next 1-2 weeks",
        angles: ["Tool Reviews", "Workflows", "Comparisons", "Tutorials"]
      },
      {
        topic: "Tech News & Industry Updates",
        reason: "Major tech announcements and product launches driving news content",
        opportunity: 83,
        timing: "Immediate",
        angles: ["Breaking News", "Analysis", "Predictions", "Impact Discussion"]
      },
      {
        topic: "Budget Tech Recommendations",
        reason: "Economic concerns driving interest in value-focused tech purchases",
        opportunity: 79,
        timing: "Next 2-4 weeks",
        angles: ["Best Budget Options", "Value Picks", "Hidden Gems", "Worth It Analysis"]
      },
      {
        topic: "Smart Home Setup Guides",
        reason: "Growing smart home adoption driving tutorial demand",
        opportunity: 81,
        timing: "Next 1-3 weeks",
        angles: ["Complete Setup", "Product Reviews", "Automation Ideas", "Troubleshooting"]
      },
      {
        topic: "Laptop Buying Guide 2024",
        reason: "New year driving laptop purchase decisions and research",
        opportunity: 87,
        timing: "Immediate",
        angles: ["Best for Students", "Gaming Laptops", "Professional Work", "Budget Options"]
      }
    ],
    education: [
      {
        topic: "Study Techniques That Actually Work",
        reason: "Students searching for effective learning methods as semester starts",
        opportunity: 88,
        timing: "Immediate",
        angles: ["Science-Based", "Time Management", "Note-Taking", "Exam Prep"]
      },
      {
        topic: "Career Change Guides & Tips",
        reason: "Job market shifts driving career transition interest",
        opportunity: 85,
        timing: "Next 1-2 weeks",
        angles: ["Step-by-Step", "Success Stories", "Skills Needed", "Resume Tips"]
      },
      {
        topic: "Language Learning Methods",
        reason: "New year resolutions and travel plans driving language learning",
        opportunity: 82,
        timing: "Next 2-4 weeks",
        angles: ["Beginner Guide", "Immersion Techniques", "App Reviews", "Fluency Tips"]
      },
      {
        topic: "Online Course Reviews",
        reason: "Growing online education adoption creating demand for course vetting",
        opportunity: 79,
        timing: "Next 1-3 weeks",
        angles: ["Platform Comparisons", "Course Reviews", "Worth It Analysis", "Learning Paths"]
      },
      {
        topic: "Programming Tutorials for Beginners",
        reason: "Tech job market driving coding education interest",
        opportunity: 91,
        timing: "Immediate",
        angles: ["Zero to Hero", "Project-Based", "Language Comparisons", "Career Path"]
      },
      {
        topic: "Test Prep & Exam Strategies",
        reason: "Exam season approaching driving test preparation content demand",
        opportunity: 86,
        timing: "Next 1-2 weeks",
        angles: ["Study Plans", "Practice Tests", "Last-Minute Tips", "Anxiety Management"]
      }
    ],
    entertainment: [
      {
        topic: "Movie Reviews & Analysis",
        reason: "New blockbuster releases creating buzz and discussion demand",
        opportunity: 90,
        timing: "Immediate",
        angles: ["Spoiler-Free Review", "Easter Eggs", "Ending Explained", "Cast Interviews"]
      },
      {
        topic: "Celebrity Drama & News",
        reason: "Recent celebrity events driving entertainment news searches",
        opportunity: 87,
        timing: "Next 24-48 hours",
        angles: ["Breaking News", "Timeline", "Reactions", "Analysis"]
      },
      {
        topic: "TV Series Recaps & Theories",
        reason: "Popular series finale creating discussion and theory content demand",
        opportunity: 84,
        timing: "Immediate",
        angles: ["Episode Recap", "Fan Theories", "Character Analysis", "Season Review"]
      },
      {
        topic: "Comedy Sketches & Parodies",
        reason: "Viral moments creating opportunity for comedic content",
        opportunity: 81,
        timing: "Next 1-3 days",
        angles: ["Parody", "Reaction", "Compilation", "Behind the Scenes"]
      },
      {
        topic: "Music Video Reactions",
        reason: "New music releases from major artists driving reaction content",
        opportunity: 88,
        timing: "Immediate",
        angles: ["First Listen", "Music Theory Analysis", "Lyric Breakdown", "Artist Comparison"]
      },
      {
        topic: "Award Show Highlights",
        reason: "Recent awards ceremony creating recap and analysis demand",
        opportunity: 83,
        timing: "Next 24-72 hours",
        angles: ["Best Moments", "Fashion Analysis", "Speech Highlights", "Controversy Breakdown"]
      }
    ],
    howto: [
      {
        topic: "Home Repair DIY Tutorials",
        reason: "Homeowners seeking cost-saving solutions for common repairs",
        opportunity: 86,
        timing: "Next 1-2 weeks",
        angles: ["Fix Common Issues", "Budget-Friendly", "Tool Guide", "Step-by-Step"]
      },
      {
        topic: "Cooking Recipes & Techniques",
        reason: "Home cooking trends and meal prep interest remain strong",
        opportunity: 83,
        timing: "Immediate",
        angles: ["Quick Meals", "Healthy Options", "Budget Recipes", "Restaurant Copycat"]
      },
      {
        topic: "Arts & Crafts Projects",
        reason: "Creative hobby interest and gift-making season driving craft content",
        opportunity: 78,
        timing: "Next 2-4 weeks",
        angles: ["Beginner Projects", "Upcycling", "Gift Ideas", "Room Decor"]
      },
      {
        topic: "Car Maintenance Basics",
        reason: "DIY car care interest growing with rising service costs",
        opportunity: 80,
        timing: "Next 1-3 weeks",
        angles: ["Basic Maintenance", "Troubleshooting", "Money-Saving Tips", "Tool Reviews"]
      },
      {
        topic: "Gardening & Plant Care",
        reason: "Seasonal planting and sustainable living driving gardening interest",
        opportunity: 81,
        timing: "Immediate",
        angles: ["Beginner Guide", "Indoor Plants", "Vegetable Garden", "Troubleshooting"]
      },
      {
        topic: "Photography Tutorial & Tips",
        reason: "Content creation boom driving interest in photography skills",
        opportunity: 84,
        timing: "Next 1-2 weeks",
        angles: ["Phone Photography", "Composition Tips", "Editing Tutorial", "Gear Guide"]
      }
    ],
    lifestyle: [
      {
        topic: "Travel Destination Guides",
        reason: "Travel season planning driving destination research and vlogs",
        opportunity: 89,
        timing: "Immediate",
        angles: ["Budget Travel", "Hidden Gems", "Itinerary", "Local Culture"]
      },
      {
        topic: "Minimalism & Decluttering",
        reason: "New year motivation for simplifying life and organizing spaces",
        opportunity: 82,
        timing: "Next 1-2 weeks",
        angles: ["Declutter Challenge", "Minimalist Tips", "Organization Hacks", "Before/After"]
      },
      {
        topic: "Morning Routine & Productivity",
        reason: "Self-improvement content performing well with routine optimization searches",
        opportunity: 85,
        timing: "Next 2-4 weeks",
        angles: ["Productive Routines", "Habit Building", "Time Management", "Real Routines"]
      },
      {
        topic: "Fashion Hauls & Styling",
        reason: "Seasonal fashion changes driving shopping and styling content",
        opportunity: 80,
        timing: "Immediate",
        angles: ["Try-On Haul", "Outfit Ideas", "Budget Fashion", "Trend Analysis"]
      },
      {
        topic: "Home Decor & Interior Design",
        reason: "Home improvement interest and rental decorating driving design content",
        opportunity: 83,
        timing: "Next 1-3 weeks",
        angles: ["Room Makeover", "Budget Decor", "Style Guide", "DIY Projects"]
      },
      {
        topic: "Self-Care & Wellness Routines",
        reason: "Mental health awareness driving self-care and wellness content",
        opportunity: 87,
        timing: "Immediate",
        angles: ["Self-Care Ideas", "Mental Health Tips", "Relaxation Techniques", "Product Reviews"]
      }
    ],
    finance: [
      {
        topic: "Investing for Beginners 2024",
        reason: "New year financial goals driving investment education searches",
        opportunity: 91,
        timing: "Immediate",
        angles: ["Getting Started", "Low-Risk Options", "Portfolio Building", "Common Mistakes"]
      },
      {
        topic: "Passive Income Strategies",
        reason: "Economic uncertainty driving alternative income source research",
        opportunity: 88,
        timing: "Next 1-2 weeks",
        angles: ["Side Hustles", "Online Business", "Investment Income", "Success Stories"]
      },
      {
        topic: "Budgeting & Saving Money",
        reason: "Cost of living concerns driving financial management content demand",
        opportunity: 84,
        timing: "Immediate",
        angles: ["Budget System", "Saving Challenges", "Money-Saving Tips", "Debt Payoff"]
      },
      {
        topic: "Cryptocurrency & Bitcoin Updates",
        reason: "Market movements and regulatory news driving crypto content interest",
        opportunity: 82,
        timing: "Next 24-48 hours",
        angles: ["Market Analysis", "News Update", "Beginner Guide", "Investment Strategy"]
      },
      {
        topic: "Real Estate Investment Guide",
        reason: "Property market conditions creating real estate education demand",
        opportunity: 79,
        timing: "Next 2-4 weeks",
        angles: ["First-Time Buyer", "Investment Properties", "Market Analysis", "Financing Tips"]
      },
      {
        topic: "Credit Card Rewards & Points",
        reason: "Travel reopening and reward optimization creating card comparison interest",
        opportunity: 86,
        timing: "Next 1-2 weeks",
        angles: ["Best Cards 2024", "Points Strategy", "Travel Rewards", "Card Reviews"]
      }
    ],
    health: [
      {
        topic: "Workout Routines & Exercise Plans",
        reason: "Fitness goals and gym alternatives driving workout content searches",
        opportunity: 90,
        timing: "Immediate",
        angles: ["Home Workouts", "Beginner Plans", "No Equipment", "Results Tracking"]
      },
      {
        topic: "Healthy Meal Prep Ideas",
        reason: "Health-conscious eating and time-saving driving meal prep interest",
        opportunity: 85,
        timing: "Next 1-2 weeks",
        angles: ["Weekly Prep", "High Protein", "Budget-Friendly", "Meal Containers"]
      },
      {
        topic: "Weight Loss Transformation Stories",
        reason: "Fitness motivation and realistic transformation interest remaining high",
        opportunity: 87,
        timing: "Immediate",
        angles: ["Journey Story", "Before/After", "Tips That Worked", "Mindset Shifts"]
      },
      {
        topic: "Mental Health & Mindfulness",
        reason: "Growing mental health awareness driving wellness content demand",
        opportunity: 83,
        timing: "Next 2-4 weeks",
        angles: ["Meditation Guide", "Stress Management", "Therapy Tips", "Self-Help"]
      },
      {
        topic: "Fitness Challenges & Programs",
        reason: "Community fitness challenges creating participation and motivation content",
        opportunity: 81,
        timing: "Next 1-3 weeks",
        angles: ["30-Day Challenge", "Workout Program", "Progress Updates", "Community Support"]
      },
      {
        topic: "Supplement Reviews & Advice",
        reason: "Fitness supplement interest driving product review and education content",
        opportunity: 78,
        timing: "Next 1-2 weeks",
        angles: ["Science-Based", "Product Reviews", "Do You Need It", "Budget Options"]
      }
    ]
  }

  const selectedTopics = categoryTopics[category?.toLowerCase() || 'all']
  
  if (selectedTopics) {
    return selectedTopics.map(topic => ({
      ...topic,
      dataSource: 'fallback',
      category: category,
      lastUpdated: new Date().toISOString()
    }))
  }

  // Default fallback for 'all' or unknown categories
  return [
    {
      topic: "AI Content Creation Tools 2024",
      reason: "Recent AI breakthroughs have sparked massive interest in automation tools",
      opportunity: 92,
      timing: "Next 2-4 weeks",
      angles: ["Tutorial", "Review", "Comparison", "Tips"]
    },
    {
      topic: "Passive Income Ideas 2024",
      reason: "Economic conditions driving alternative income searches",
      opportunity: 85,
      timing: "Immediate - High demand",
      angles: ["How-To", "Case Study", "Guide", "Stories"]
    },
    {
      topic: "Productivity Hacks for Remote Work",
      reason: "Remote work trends maintaining strong interest",
      opportunity: 78,
      timing: "Next 1-3 months",
      angles: ["Tips", "Tools", "Routines", "Systems"]
    },
    {
      topic: "Tech Reviews and Unboxing",
      reason: "New product launches driving search volume",
      opportunity: 88,
      timing: "Immediate",
      angles: ["Unboxing", "Review", "Comparison", "Setup"]
    },
    {
      topic: "Fitness and Wellness Trends",
      reason: "New Year resolutions and health awareness",
      opportunity: 82,
      timing: "Next 1-2 weeks",
      angles: ["Workout", "Diet", "Mental Health", "Transformation"]
    },
    {
      topic: "Personal Finance Education",
      reason: "Economic uncertainty driving financial literacy interest",
      opportunity: 80,
      timing: "Next 2-3 weeks",
      angles: ["Investing", "Budgeting", "Saving", "Crypto"]
    }
  ].map(topic => ({
    ...topic,
    dataSource: 'fallback',
    category: 'all',
    lastUpdated: new Date().toISOString()
  }))
}