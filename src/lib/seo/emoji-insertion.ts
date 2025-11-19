/**
 * Context-aware emoji insertion for YouTube titles and descriptions
 */

interface EmojiContext {
  category: string
  keywords: string[]
  emojis: string[]
  relevanceScore: number
}

const EMOJI_CONTEXTS: EmojiContext[] = [
  {
    category: "money",
    keywords: ["money", "cash", "income", "profit", "earn", "revenue", "rich", "wealthy"],
    emojis: ["💰", "💵", "💸", "🤑", "💳", "🏦"],
    relevanceScore: 0.9,
  },
  {
    category: "growth",
    keywords: ["grow", "growth", "increase", "boost", "scale", "expand"],
    emojis: ["📈", "🚀", "⬆️", "📊", "💹"],
    relevanceScore: 0.85,
  },
  {
    category: "tutorial",
    keywords: ["how to", "tutorial", "guide", "learn", "course", "teach", "lesson"],
    emojis: ["📚", "🎓", "✅", "📖", "🔍", "💡"],
    relevanceScore: 0.8,
  },
  {
    category: "tech",
    keywords: ["tech", "technology", "gadget", "phone", "computer", "app", "software"],
    emojis: ["💻", "📱", "⚡", "🔧", "🖥️", "⌨️"],
    relevanceScore: 0.8,
  },
  {
    category: "gaming",
    keywords: ["game", "gaming", "play", "gamer", "esports", "console"],
    emojis: ["🎮", "🕹️", "🎯", "👾", "🏆"],
    relevanceScore: 0.9,
  },
  {
    category: "food",
    keywords: ["food", "cook", "recipe", "eat", "restaurant", "chef", "meal"],
    emojis: ["🍕", "🍔", "🍰", "🍳", "👨‍🍳", "🥗"],
    relevanceScore: 0.85,
  },
  {
    category: "fitness",
    keywords: ["fitness", "workout", "exercise", "gym", "muscle", "health", "diet"],
    emojis: ["💪", "🏋️", "🔥", "⚡", "🏃"],
    relevanceScore: 0.9,
  },
  {
    category: "travel",
    keywords: ["travel", "trip", "vacation", "destination", "tour", "explore"],
    emojis: ["✈️", "🌍", "🗺️", "🏖️", "🎒", "🚗"],
    relevanceScore: 0.85,
  },
  {
    category: "business",
    keywords: ["business", "entrepreneur", "startup", "marketing", "sales", "strategy"],
    emojis: ["💼", "📊", "🎯", "📈", "💡", "🏢"],
    relevanceScore: 0.75,
  },
  {
    category: "success",
    keywords: ["success", "win", "achieve", "goal", "victory", "champion"],
    emojis: ["🏆", "🎯", "⭐", "🌟", "✨", "👑"],
    relevanceScore: 0.8,
  },
  {
    category: "warning",
    keywords: ["warning", "danger", "alert", "mistake", "avoid", "stop", "don't"],
    emojis: ["⚠️", "🚫", "❌", "⛔", "🛑"],
    relevanceScore: 0.9,
  },
  {
    category: "time",
    keywords: ["quick", "fast", "minute", "hour", "time", "instant", "rapid"],
    emojis: ["⏰", "⏱️", "⚡", "🚀", "💨"],
    relevanceScore: 0.75,
  },
]

export function insertEmojis(text: string, maxEmojis: number = 3): string {
  const lowerText = text.toLowerCase()
  const matchedContexts: Array<{ context: EmojiContext; matches: number }> = []

  // Find matching contexts
  for (const context of EMOJI_CONTEXTS) {
    let matches = 0
    for (const keyword of context.keywords) {
      if (lowerText.includes(keyword)) {
        matches++
      }
    }
    if (matches > 0) {
      matchedContexts.push({ context, matches })
    }
  }

  // Sort by relevance (matches * relevanceScore)
  matchedContexts.sort((a, b) => {
    const scoreA = a.matches * a.context.relevanceScore
    const scoreB = b.matches * b.context.relevanceScore
    return scoreB - scoreA
  })

  // Don't spam emojis - only add if relevance is high
  if (matchedContexts.length === 0 || matchedContexts[0].matches < 1) {
    return text
  }

  // Select top emojis
  const selectedEmojis: string[] = []
  for (const { context } of matchedContexts.slice(0, maxEmojis)) {
    // Pick random emoji from context
    const randomEmoji = context.emojis[Math.floor(Math.random() * context.emojis.length)]
    if (!selectedEmojis.includes(randomEmoji)) {
      selectedEmojis.push(randomEmoji)
    }
  }

  // Limit to maxEmojis
  const finalEmojis = selectedEmojis.slice(0, maxEmojis)

  // Add emojis strategically
  if (finalEmojis.length === 0) return text

  // Strategy 1: Add at the start if it's a strong match
  if (matchedContexts[0].matches >= 2) {
    return `${finalEmojis[0]} ${text}`
  }

  // Strategy 2: Add at the end
  return `${text} ${finalEmojis.join(" ")}`
}

export function analyzeEmojiRelevance(text: string): {
  suggestedEmojis: string[]
  relevanceScores: Array<{ emoji: string; score: number; reason: string }>
} {
  const lowerText = text.toLowerCase()
  const results: Array<{ emoji: string; score: number; reason: string }> = []

  for (const context of EMOJI_CONTEXTS) {
    let matches = 0
    const matchedKeywords: string[] = []

    for (const keyword of context.keywords) {
      if (lowerText.includes(keyword)) {
        matches++
        matchedKeywords.push(keyword)
      }
    }

    if (matches > 0) {
      for (const emoji of context.emojis) {
        results.push({
          emoji,
          score: matches * context.relevanceScore,
          reason: `Matches ${context.category} context (${matchedKeywords.join(", ")})`,
        })
      }
    }
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score)

  return {
    suggestedEmojis: results.slice(0, 5).map((r) => r.emoji),
    relevanceScores: results.slice(0, 10),
  }
}
