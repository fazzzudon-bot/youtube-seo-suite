/**
 * Gemini API Integration with Health Monitoring, Retries, and Fallback
 * Handles all AI-powered features: keyword difficulty, title generation, tag generation, etc.
 */

import { aiHealthMonitor } from '@/lib/ai/health-monitor';
import { fallbackGenerator } from '@/lib/ai/fallback-generator';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = options;
  
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
          maxDelay
        );
        console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
}

export async function callGeminiAPI(prompt: string, useFallback: boolean = true): Promise<string> {
  // Check circuit breaker
  if (!aiHealthMonitor.shouldAllowRequest()) {
    console.warn('Circuit breaker is open, using fallback generator');
    throw new Error('Circuit breaker open');
  }

  const startTime = Date.now();
  
  try {
    const response = await retryWithBackoff(async () => {
      const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gemini API error: ${res.status} - ${errorText}`);
      }

      return res;
    }, { maxRetries: 3, baseDelay: 1000 });

    const data: GeminiResponse = await response.json();
    const responseTime = Date.now() - startTime;
    
    // Record successful request
    aiHealthMonitor.recordRequest(true, responseTime);
    
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error('Gemini API Error:', error);
    
    // Record failed request
    aiHealthMonitor.recordRequest(false, responseTime, {
      timestamp: Date.now(),
      endpoint: 'gemini-api',
      error: error instanceof Error ? error.message : 'Unknown error',
      requestData: { promptLength: prompt.length },
    });
    
    throw error;
  }
}

export async function analyzeKeywordDifficulty(keyword: string, searchData?: any) {
  const prompt = `Analyze the YouTube keyword difficulty for "${keyword}". 
  ${searchData ? `Search data: ${JSON.stringify(searchData)}` : ''}
  
  Provide a JSON response with:
  - difficulty: number (0-100)
  - competition: "Low" | "Medium" | "High"
  - opportunity: number (0-100)
  - insights: string
  - relatedKeywords: string[]
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.warn('Using fallback for keyword difficulty analysis');
    return fallbackGenerator.analyzeKeywordDifficulty(keyword);
  }
}

export async function generateTitles(topic: string, style?: string) {
  const styleText = style || 'viral, emotion-based, curiosity-driven';
  const prompt = `Generate 10 YouTube video titles for the topic: "${topic}".
  
  Style: ${styleText}
  
  Requirements:
  - Mix of viral, emotional, curiosity-based titles
  - 50-70 characters each
  - Include power words
  - Add relevant emojis (1-3 per title) to increase click-through rate
  - SEO optimized
  - Emojis should be natural and match the title context
  
  Return as JSON array: { "titles": ["title1", "title2", ...] }
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { titles: [] };
  } catch (error) {
    console.warn('Using fallback for title generation');
    return { titles: fallbackGenerator.generateTitles(topic, 10) };
  }
}

export async function generateTags(topic: string, videoContext?: string) {
  const prompt = `Generate 30-50 YouTube tags for the topic: "${topic}".
  ${videoContext ? `Context: ${videoContext}` : ''}
  
  Include:
  - Short tags (1-2 words)
  - Long-tail tags (3-5 words)
  - LSI (Latent Semantic Indexing) tags
  - High CTR tags
  
  Return as JSON: { "tags": ["tag1", "tag2", ...], "categories": { "short": [], "longTail": [], "lsi": [] } }
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { tags: [], categories: {} };
  } catch (error) {
    console.warn('Using fallback for tag generation');
    return fallbackGenerator.generateTags(topic, 40);
  }
}

export async function generateDescription(title: string, tags: string[], duration?: string) {
  const prompt = `Generate a YouTube-optimized video description for:
  
  Title: "${title}"
  Tags: ${tags.slice(0, 10).join(', ')}
  ${duration ? `Duration: ${duration}` : ''}
  
  Include:
  - SEO-optimized intro paragraph with keywords
  - Chapter timestamps (if applicable)
  - Call to action
  - Social media links placeholder
  - Related tags section
  
  Return as JSON: { "description": "full description text", "chapters": ["0:00 Intro", ...] }
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { description: '', chapters: [] };
  } catch (error) {
    console.warn('Using fallback for description generation');
    return fallbackGenerator.generateDescription(title, tags);
  }
}

export async function analyzeCompetitor(channelData: any) {
  const prompt = `Analyze this YouTube channel as a competitor:
  
  ${JSON.stringify(channelData)}
  
  Provide insights on:
  - Content strategy
  - Opportunity keywords
  - Weak areas to exploit
  - Niche prediction
  - Upload frequency analysis
  - Improvement suggestions
  
  Return as JSON: {
    "strategy": string,
    "opportunityKeywords": string[],
    "weaknesses": string[],
    "niche": string,
    "suggestions": string[]
  }
  
  Only return valid JSON.`;

  const response = await callGeminiAPI(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}

export async function calculateSEOScore(videoData: any) {
  const prompt = `Calculate YouTube SEO score for this video:
  
  ${JSON.stringify(videoData)}
  
  Analyze:
  - Title optimization (0-25 points)
  - Description quality (0-25 points)
  - Tags relevance (0-25 points)
  - Engagement metrics (0-25 points)
  
  Return as JSON: {
    "totalScore": number (0-100),
    "breakdown": {
      "title": number,
      "description": number,
      "tags": number,
      "engagement": number
    },
    "improvements": string[],
    "strengths": string[]
  }
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.warn('Using fallback for SEO score calculation');
    return fallbackGenerator.generateSEOScore(videoData);
  }
}

export async function getTrendingTopics(category?: string) {
  const prompt = `Predict trending YouTube topics for ${category || 'general content'}.
  
  Provide:
  - 10 trending topics
  - Why they're trending
  - Opportunity score (0-100)
  - Best time to create content
  
  Return as JSON: {
    "topics": [
      {
        "topic": string,
        "reason": string,
        "opportunity": number,
        "timing": string
      }
    ]
  }
  
  Only return valid JSON.`;

  const response = await callGeminiAPI(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { topics: [] };
  } catch {
    return { topics: [] };
  }
}

export async function generateVideoIdeas(niche: string, competitorData?: any) {
  const prompt = `Generate 20 video ideas for the niche: "${niche}".
  ${competitorData ? `Competitor insights: ${JSON.stringify(competitorData)}` : ''}
  
  Include:
  - Trending topics
  - Evergreen content ideas
  - Competitor gaps
  - Unique angles
  
  Return as JSON: {
    "ideas": [
      {
        "title": string,
        "category": "trending" | "evergreen" | "gap" | "unique",
        "difficulty": "Easy" | "Medium" | "Hard",
        "potentialViews": string
      }
    ]
  }
  
  Only return valid JSON.`;

  try {
    const response = await callGeminiAPI(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { ideas: [] };
  } catch (error) {
    console.warn('Using fallback for video ideas generation');
    return { ideas: fallbackGenerator.generateVideoIdeas(niche, 20) };
  }
}

export async function clusterKeywords(keywords: string[]) {
  const prompt = `Cluster these YouTube keywords into related groups:
  
  ${keywords.join(', ')}
  
  Return as JSON: {
    "clusters": [
      {
        "name": string,
        "keywords": string[],
        "mainKeyword": string
      }
    ]
  }
  
  Only return valid JSON.`;

  const response = await callGeminiAPI(prompt);
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { clusters: [] };
  } catch {
    return { clusters: [] };
  }
}