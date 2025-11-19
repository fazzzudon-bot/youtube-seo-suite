'use server';

import {
  getChannelInfo,
  getChannelVideos,
  getTrafficSources,
  getTopVideos,
  getEngagementMetrics,
  getAudienceDemographics,
} from '@/lib/youtube/youtube-data-service';
import { hasYouTubeConnection } from '@/lib/youtube/token-refresh';
import { db } from '@/db';
import { youtubeChannels } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function checkYouTubeConnection(userId: number) {
  try {
    const isConnected = await hasYouTubeConnection(userId);
    return { connected: isConnected };
  } catch (error) {
    return { connected: false, error: 'Failed to check connection' };
  }
}

export async function fetchChannelData(userId: number) {
  try {
    const channelInfo = await getChannelInfo(userId);
    
    // Sync to database
    const now = new Date().toISOString();
    await db
      .insert(youtubeChannels)
      .values({
        userId,
        channelId: channelInfo.id || '',
        title: channelInfo.title || '',
        description: channelInfo.description || '',
        thumbnailUrl: channelInfo.thumbnailUrl || '',
        subscriberCount: channelInfo.subscriberCount,
        viewCount: channelInfo.viewCount,
        videoCount: channelInfo.videoCount,
        lastSyncedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: youtubeChannels.userId,
        set: {
          channelId: channelInfo.id || '',
          title: channelInfo.title || '',
          description: channelInfo.description || '',
          thumbnailUrl: channelInfo.thumbnailUrl || '',
          subscriberCount: channelInfo.subscriberCount,
          viewCount: channelInfo.viewCount,
          videoCount: channelInfo.videoCount,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    return { success: true, channel: channelInfo };
  } catch (error) {
    console.error('Failed to fetch channel data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch channel data' 
    };
  }
}

export async function fetchChannelVideos(
  userId: number,
  maxResults: number = 50
) {
  try {
    const data = await getChannelVideos(userId, maxResults);
    return { success: true, ...data };
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch videos',
      videos: [],
      nextPageToken: null,
    };
  }
}

export async function fetchTrafficSources(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const data = await getTrafficSources(userId, startDate, endDate);
    
    // Parse and format traffic sources
    const trafficSources = data.rows?.map((row: any[]) => ({
      source: row[0], // insightTrafficSourceType
      views: parseInt(row[1]),
      watchTime: parseInt(row[2]),
    })) || [];

    return { success: true, trafficSources, raw: data };
  } catch (error) {
    console.error('Failed to fetch traffic sources:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch traffic sources',
      trafficSources: [],
    };
  }
}

export async function fetchTopVideos(
  userId: number,
  startDate: string,
  endDate: string,
  maxResults: number = 10
) {
  try {
    const data = await getTopVideos(userId, startDate, endDate, maxResults);
    
    // Parse and format top videos
    const topVideos = data.rows?.map((row: any[]) => ({
      videoId: row[0],
      views: parseInt(row[1]),
      watchTime: parseInt(row[2]),
      avgViewDuration: parseFloat(row[3]),
      subscribersGained: parseInt(row[4]),
    })) || [];

    return { success: true, topVideos, raw: data };
  } catch (error) {
    console.error('Failed to fetch top videos:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch top videos',
      topVideos: [],
    };
  }
}

export async function fetchEngagementMetrics(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const data = await getEngagementMetrics(userId, startDate, endDate);
    
    // Parse engagement data by day
    const engagement = data.rows?.map((row: any[]) => ({
      date: row[0],
      views: parseInt(row[1]),
      likes: parseInt(row[2]),
      dislikes: parseInt(row[3] || 0),
      shares: parseInt(row[4]),
      comments: parseInt(row[5]),
      subscribersGained: parseInt(row[6]),
      subscribersLost: parseInt(row[7]),
      avgViewDuration: parseFloat(row[8]),
      avgViewPercentage: parseFloat(row[9]),
    })) || [];

    return { success: true, engagement, raw: data };
  } catch (error) {
    console.error('Failed to fetch engagement metrics:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch engagement',
      engagement: [],
    };
  }
}

export async function fetchAudienceDemographics(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const data = await getAudienceDemographics(userId, startDate, endDate);
    
    // Parse age/gender data
    const demographics = data.ageGender.rows?.map((row: any[]) => ({
      ageGroup: row[0],
      gender: row[1],
      percentage: parseFloat(row[2]),
    })) || [];

    // Parse geography data
    const geography = data.geography.rows?.map((row: any[]) => ({
      country: row[0],
      views: parseInt(row[1]),
    })) || [];

    return { success: true, demographics, geography, raw: data };
  } catch (error) {
    console.error('Failed to fetch audience demographics:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch demographics',
      demographics: [],
      geography: [],
    };
  }
}

export async function getCachedChannelData(userId: number) {
  try {
    const channel = await db
      .select()
      .from(youtubeChannels)
      .where(eq(youtubeChannels.userId, userId))
      .limit(1);

    if (channel.length === 0) {
      return { success: false, error: 'No cached channel data found' };
    }

    return { success: true, channel: channel[0] };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get cached data' 
    };
  }
}

export async function generatePersonalizedRecommendations(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const [trafficData, topVideosData, engagementData] = await Promise.all([
      fetchTrafficSources(userId, startDate, endDate),
      fetchTopVideos(userId, startDate, endDate),
      fetchEngagementMetrics(userId, startDate, endDate),
    ]);

    const recommendations = [];

    // Analyze traffic sources
    if (trafficData.success && trafficData.trafficSources.length > 0) {
      const topSource = trafficData.trafficSources[0];
      const totalViews = trafficData.trafficSources.reduce((sum, s) => sum + s.views, 0);
      const sourcePercentage = (topSource.views / totalViews) * 100;

      if (sourcePercentage > 50) {
        recommendations.push({
          type: 'traffic',
          priority: 'high',
          title: `${sourcePercentage.toFixed(0)}% of traffic from ${topSource.source}`,
          description: `You're heavily reliant on ${topSource.source}. Diversify by optimizing for other sources like YouTube Search and Suggested Videos.`,
          action: 'Improve SEO and create more engaging thumbnails',
        });
      }

      // Check if YouTube Search traffic is low
      const searchTraffic = trafficData.trafficSources.find(s => 
        s.source.toLowerCase().includes('search')
      );
      if (searchTraffic && (searchTraffic.views / totalViews) < 0.15) {
        recommendations.push({
          type: 'seo',
          priority: 'high',
          title: 'Low YouTube Search Traffic',
          description: 'Only ' + ((searchTraffic.views / totalViews) * 100).toFixed(0) + '% of views from search. Optimize titles, descriptions, and tags for better discoverability.',
          action: 'Use keyword research tool to optimize metadata',
        });
      }
    }

    // Analyze engagement metrics
    if (engagementData.success && engagementData.engagement.length > 0) {
      const avgEngagement = engagementData.engagement.reduce((sum, e) => {
        const engagementRate = ((e.likes + e.comments + e.shares) / e.views) * 100;
        return sum + engagementRate;
      }, 0) / engagementData.engagement.length;

      if (avgEngagement < 5) {
        recommendations.push({
          type: 'engagement',
          priority: 'medium',
          title: 'Low Engagement Rate',
          description: `Your engagement rate is ${avgEngagement.toFixed(1)}%. Add clear CTAs, ask questions, and encourage viewers to interact.`,
          action: 'Add engaging hooks and CTAs in your videos',
        });
      }

      // Check subscriber conversion
      const totalSubsGained = engagementData.engagement.reduce((sum, e) => sum + e.subscribersGained, 0);
      const totalViews = engagementData.engagement.reduce((sum, e) => sum + e.views, 0);
      const subConversionRate = (totalSubsGained / totalViews) * 100;

      if (subConversionRate < 1) {
        recommendations.push({
          type: 'growth',
          priority: 'medium',
          title: 'Low Subscriber Conversion',
          description: `Only ${subConversionRate.toFixed(2)}% of viewers subscribe. Remind viewers to subscribe and deliver consistent value.`,
          action: 'Add subscribe reminders in your videos',
        });
      }

      // Check average view percentage
      const avgViewPercentage = engagementData.engagement.reduce((sum, e) => sum + e.avgViewPercentage, 0) / engagementData.engagement.length;

      if (avgViewPercentage < 40) {
        recommendations.push({
          type: 'retention',
          priority: 'high',
          title: 'Low Audience Retention',
          description: `Viewers watch only ${avgViewPercentage.toFixed(0)}% of your videos. Improve pacing, add pattern interrupts, and deliver value early.`,
          action: 'Analyze retention graphs and improve video structure',
        });
      }
    }

    // Analyze top videos for patterns
    if (topVideosData.success && topVideosData.topVideos.length > 0) {
      recommendations.push({
        type: 'content',
        priority: 'medium',
        title: 'Replicate Winning Content',
        description: `Your top ${topVideosData.topVideos.length} videos are performing well. Analyze what makes them successful and create similar content.`,
        action: 'Study your top videos and identify common patterns',
      });
    }

    return {
      success: true,
      recommendations,
      summary: {
        totalRecommendations: recommendations.length,
        highPriority: recommendations.filter(r => r.priority === 'high').length,
        mediumPriority: recommendations.filter(r => r.priority === 'medium').length,
      },
    };
  } catch (error) {
    console.error('Failed to generate recommendations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate recommendations',
      recommendations: [],
    };
  }
}
