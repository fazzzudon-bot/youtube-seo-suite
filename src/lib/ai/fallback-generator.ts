/**
 * Fallback AI Generator
 * Provides rule-based content generation when AI API fails
 */

export class FallbackGenerator {
  // Title templates with placeholders and emojis
  private titleTemplates = [
    "🎯 How to {action} {topic} in {year}",
    "✨ {number} Ways to {action} {topic}",
    "📚 The Ultimate Guide to {topic}",
    "🔥 {topic}: Everything You Need to Know",
    "💡 Why {topic} is Important for {audience}",
    "🚀 Master {topic} in {timeframe}",
    "⭐ {topic} Tips for Beginners",
    "🎓 Advanced {topic} Strategies",
    "🤔 The Truth About {topic}",
    "❌ Stop {mistake} - Do This Instead for {topic} ✅",
  ];

  // Tag categories for different topics
  private commonTags = {
    howTo: ["tutorial", "how to", "guide", "tips", "tricks", "beginner"],
    seo: ["seo", "optimization", "ranking", "youtube seo", "video seo", "algorithm"],
    growth: ["youtube growth", "channel growth", "get views", "get subscribers"],
    content: ["content creation", "video ideas", "content strategy"],
  };

  generateTitles(topic: string, count: number = 10): string[] {
    const year = new Date().getFullYear();
    const titles: string[] = [];
    
    const actions = ["Master", "Learn", "Improve", "Grow", "Optimize", "Boost"];
    const numbers = ["5", "7", "10", "15", "20"];
    const timeframes = ["30 Days", "One Week", "This Month", "Today"];
    const audiences = ["Beginners", "Creators", "YouTubers", "Marketers"];
    const mistakes = ["Making This Mistake", "Doing This Wrong", "Ignoring This"];

    for (let i = 0; i < count; i++) {
      const template = this.titleTemplates[i % this.titleTemplates.length];
      const title = template
        .replace("{action}", actions[i % actions.length])
        .replace("{topic}", topic)
        .replace("{year}", year.toString())
        .replace("{number}", numbers[i % numbers.length])
        .replace("{timeframe}", timeframes[i % timeframes.length])
        .replace("{audience}", audiences[i % audiences.length])
        .replace("{mistake}", mistakes[i % mistakes.length]);
      
      titles.push(title);
    }

    return titles;
  }

  generateTags(topic: string, count: number = 40): {
    tags: string[];
    categories: { short: string[]; longTail: string[]; lsi: string[] };
  } {
    const topicLower = topic.toLowerCase();
    const words = topicLower.split(" ").filter(w => w.length > 2);
    
    const tags: string[] = [];
    const short: string[] = [];
    const longTail: string[] = [];
    const lsi: string[] = [];

    // Add the main topic
    tags.push(topicLower);
    short.push(topicLower);

    // Add individual words as short tags
    words.forEach(word => {
      if (!tags.includes(word)) {
        tags.push(word);
        short.push(word);
      }
    });

    // Add common category tags
    Object.values(this.commonTags).flat().forEach(tag => {
      if (tags.length < count && !tags.includes(tag)) {
        tags.push(tag);
        short.push(tag);
      }
    });

    // Generate long-tail variations
    const longTailPrefixes = ["how to", "best", "top", "learn", "guide to", "tutorial"];
    longTailPrefixes.forEach(prefix => {
      const longTag = `${prefix} ${topicLower}`;
      if (tags.length < count && !tags.includes(longTag)) {
        tags.push(longTag);
        longTail.push(longTag);
      }
    });

    // Generate LSI keywords
    const lsiSuffixes = ["tips", "tricks", "strategies", "techniques", "methods", "guide", "tutorial", "for beginners"];
    lsiSuffixes.forEach(suffix => {
      const lsiTag = `${topicLower} ${suffix}`;
      if (tags.length < count && !tags.includes(lsiTag)) {
        tags.push(lsiTag);
        lsi.push(lsiTag);
      }
    });

    // Add year-specific tags
    const year = new Date().getFullYear();
    tags.push(`${topicLower} ${year}`);
    longTail.push(`${topicLower} ${year}`);

    return {
      tags: tags.slice(0, count),
      categories: { short, longTail, lsi },
    };
  }

  generateDescription(title: string, tags: string[]): {
    description: string;
    chapters: string[];
  } {
    const description = `
Welcome to our comprehensive guide on ${title}!

In this video, we'll cover everything you need to know about this topic. Whether you're a beginner or looking to improve your skills, this guide will help you achieve your goals.

📌 What you'll learn:
• Key concepts and fundamentals
• Step-by-step instructions
• Best practices and expert tips
• Common mistakes to avoid
• Advanced techniques

🔔 Don't forget to:
• Subscribe for more helpful content
• Like this video if you found it valuable
• Comment with your questions
• Share with others who might benefit

🏷️ Related Topics:
${tags.slice(0, 8).join(" | ")}

⏰ Timestamps:
0:00 Introduction
1:30 Getting Started
5:00 Main Content
10:00 Advanced Tips
13:00 Conclusion

Thank you for watching! Let us know in the comments what you'd like to see next.

#${tags.slice(0, 3).join(" #")}
`.trim();

    const chapters = [
      "0:00 Introduction",
      "1:30 Getting Started",
      "5:00 Main Content",
      "10:00 Advanced Tips",
      "13:00 Conclusion",
    ];

    return { description, chapters };
  }

  analyzeKeywordDifficulty(keyword: string): {
    difficulty: number;
    competition: "Low" | "Medium" | "High";
    opportunity: number;
    insights: string;
    relatedKeywords: string[];
  } {
    // Simple heuristic-based scoring
    const words = keyword.toLowerCase().split(" ");
    const wordCount = words.length;
    
    // Longer keywords tend to be easier
    let difficulty = Math.max(20, 100 - wordCount * 15);
    
    // Common competitive keywords
    const competitiveTerms = ["best", "top", "how to make money", "viral"];
    const hasCompetitiveTerm = competitiveTerms.some(term => 
      keyword.toLowerCase().includes(term)
    );
    
    if (hasCompetitiveTerm) difficulty += 20;
    difficulty = Math.min(100, difficulty);

    const competition = difficulty > 70 ? "High" : difficulty > 40 ? "Medium" : "Low";
    const opportunity = Math.max(10, 100 - difficulty + (wordCount * 10));

    // Generate related keywords
    const relatedKeywords = [
      `how to ${keyword}`,
      `${keyword} tutorial`,
      `${keyword} guide`,
      `best ${keyword}`,
      `${keyword} tips`,
    ];

    return {
      difficulty: Math.round(difficulty),
      competition,
      opportunity: Math.min(100, Math.round(opportunity)),
      insights: `Based on keyword analysis, "${keyword}" has ${competition.toLowerCase()} competition. ${
        wordCount > 2 
          ? "The long-tail nature of this keyword provides good opportunities." 
          : "Consider using more specific long-tail variations for better ranking."
      }`,
      relatedKeywords,
    };
  }

  generateVideoIdeas(niche: string, count: number = 20): Array<{
    title: string;
    category: "trending" | "evergreen" | "gap" | "unique";
    difficulty: "Easy" | "Medium" | "Hard";
    potentialViews: string;
  }> {
    const ideas = [];
    const categories: Array<"trending" | "evergreen" | "gap" | "unique"> = 
      ["trending", "evergreen", "gap", "unique"];
    const difficulties: Array<"Easy" | "Medium" | "Hard"> = ["Easy", "Medium", "Hard"];
    
    const templates = [
      `Top 10 ${niche} Tips for Beginners`,
      `How to Master ${niche} Fast`,
      `${niche}: Common Mistakes to Avoid`,
      `The Ultimate ${niche} Guide`,
      `${niche} Trends in ${new Date().getFullYear()}`,
      `Day in the Life: ${niche} Edition`,
      `${niche} Q&A - Your Questions Answered`,
      `${niche} Tools I Can't Live Without`,
      `Before You Start ${niche}, Watch This`,
      `${niche} Success Story`,
    ];

    for (let i = 0; i < count; i++) {
      const template = templates[i % templates.length];
      ideas.push({
        title: template,
        category: categories[i % categories.length],
        difficulty: difficulties[i % difficulties.length],
        potentialViews: `${Math.floor(Math.random() * 50) + 10}K - ${Math.floor(Math.random() * 200) + 50}K`,
      });
    }

    return ideas;
  }

  generateSEOScore(videoData: any): {
    totalScore: number;
    breakdown: {
      title: number;
      description: number;
      tags: number;
      engagement: number;
    };
    improvements: string[];
    strengths: string[];
  } {
    const breakdown = {
      title: 0,
      description: 0,
      tags: 0,
      engagement: 0,
    };

    const improvements: string[] = [];
    const strengths: string[] = [];

    // Title scoring
    const title = videoData.title || "";
    if (title.length >= 40 && title.length <= 70) {
      breakdown.title = 25;
      strengths.push("Title length is optimal");
    } else if (title.length > 0) {
      breakdown.title = 15;
      improvements.push("Adjust title length to 40-70 characters");
    } else {
      improvements.push("Add a compelling title");
    }

    // Description scoring
    const description = videoData.description || "";
    if (description.length >= 200) {
      breakdown.description = 25;
      strengths.push("Description is comprehensive");
    } else if (description.length >= 100) {
      breakdown.description = 15;
      improvements.push("Expand description with more details");
    } else {
      breakdown.description = 5;
      improvements.push("Add a detailed description (200+ characters)");
    }

    // Tags scoring
    const tags = videoData.tags || [];
    if (tags.length >= 15) {
      breakdown.tags = 25;
      strengths.push("Good number of tags");
    } else if (tags.length >= 5) {
      breakdown.tags = 15;
      improvements.push("Add more relevant tags (aim for 15-30)");
    } else {
      breakdown.tags = 5;
      improvements.push("Add relevant tags to improve discoverability");
    }

    // Engagement scoring (if data available)
    const views = videoData.viewCount || 0;
    const likes = videoData.likeCount || 0;
    const comments = videoData.commentCount || 0;
    
    if (views > 0) {
      const engagementRate = ((likes + comments) / views) * 100;
      if (engagementRate > 5) {
        breakdown.engagement = 25;
        strengths.push("Excellent engagement rate");
      } else if (engagementRate > 2) {
        breakdown.engagement = 15;
        improvements.push("Encourage more likes and comments");
      } else {
        breakdown.engagement = 8;
        improvements.push("Improve engagement with CTAs and community interaction");
      }
    } else {
      breakdown.engagement = 10;
      improvements.push("Engagement data not yet available");
    }

    const totalScore = Object.values(breakdown).reduce((a, b) => a + b, 0);

    return {
      totalScore,
      breakdown,
      improvements,
      strengths,
    };
  }
}

export const fallbackGenerator = new FallbackGenerator();