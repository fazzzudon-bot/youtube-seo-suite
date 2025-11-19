import { google } from 'googleapis';
import { getValidAccessToken } from './token-refresh';
import { oauth2Client } from '@/lib/google-auth';

const youtube = google.youtube('v3');
const youtubeAnalytics = google.youtubeAnalytics('v2');

export async function getChannelInfo(userId: number) {
  try {
    const accessToken = await getValidAccessToken(userId);
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await youtube.channels.list({
      auth: oauth2Client,
      part: ['snippet', 'statistics', 'brandingSettings', 'contentDetails'],
      mine: true,
    });

    const channel = response.data.items?.[0];
    
    if (!channel) {
      throw new Error('No channel found for this user');
    }

    return {
      id: channel.id,
      title: channel.snippet?.title,
      description: channel.snippet?.description,
      customUrl: channel.snippet?.customUrl,
      thumbnailUrl: channel.snippet?.thumbnails?.medium?.url,
      subscriberCount: parseInt(channel.statistics?.subscriberCount || '0'),
      viewCount: parseInt(channel.statistics?.viewCount || '0'),
      videoCount: parseInt(channel.statistics?.videoCount || '0'),
      keywords: channel.brandingSettings?.channel?.keywords,
      country: channel.snippet?.country,
      uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads,
    };
  } catch (error) {
    console.error('Failed to get channel info:', error);
    throw error;
  }
}

export async function getChannelVideos(
  userId: number,
  maxResults: number = 50,
  pageToken?: string
) {
  try {
    const accessToken = await getValidAccessToken(userId);
    oauth2Client.setCredentials({ access_token: accessToken });

    // First get the channel to find uploads playlist
    const channelResponse = await youtube.channels.list({
      auth: oauth2Client,
      part: ['contentDetails'],
      mine: true,
    });

    const uploadsPlaylistId =
      channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('No uploads playlist found');
    }

    // Get videos from uploads playlist
    const playlistResponse = await youtube.playlistItems.list({
      auth: oauth2Client,
      part: ['snippet', 'contentDetails'],
      playlistId: uploadsPlaylistId,
      maxResults,
      pageToken,
    });

    // Get video IDs
    const videoIds = playlistResponse.data.items
      ?.map((item) => item.contentDetails?.videoId)
      .filter(Boolean) as string[];

    if (videoIds.length === 0) {
      return { videos: [], nextPageToken: null };
    }

    // Get video statistics
    const videosResponse = await youtube.videos.list({
      auth: oauth2Client,
      part: ['statistics', 'contentDetails', 'snippet'],
      id: videoIds,
    });

    // Merge data
    const videos = videosResponse.data.items?.map((video) => ({
      id: video.id,
      title: video.snippet?.title,
      description: video.snippet?.description,
      thumbnail: video.snippet?.thumbnails?.medium?.url,
      publishedAt: video.snippet?.publishedAt,
      views: parseInt(video.statistics?.viewCount || '0'),
      likes: parseInt(video.statistics?.likeCount || '0'),
      comments: parseInt(video.statistics?.commentCount || '0'),
      duration: video.contentDetails?.duration,
      tags: video.snippet?.tags || [],
    }));

    return {
      videos: videos || [],
      nextPageToken: playlistResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error('Failed to get channel videos:', error);
    throw error;
  }
}

interface AnalyticsQuery {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  metrics: string[];
  dimensions?: string[];
  filters?: string;
  sort?: string;
  maxResults?: number;
}

export async function getChannelAnalytics(
  userId: number,
  query: AnalyticsQuery
) {
  try {
    const accessToken = await getValidAccessToken(userId);
    oauth2Client.setCredentials({ access_token: accessToken });

    // Get channel ID first
    const channelInfo = await getChannelInfo(userId);
    const channelId = channelInfo.id;

    if (!channelId) {
      throw new Error('Channel ID not found');
    }

    const response = await youtubeAnalytics.reports.query({
      auth: oauth2Client,
      ids: `channel==${channelId}`,
      startDate: query.startDate,
      endDate: query.endDate,
      metrics: query.metrics.join(','),
      dimensions: query.dimensions?.join(','),
      filters: query.filters,
      sort: query.sort,
      maxResults: query.maxResults || 200,
    });

    return {
      columnHeaders: response.data.columnHeaders,
      rows: response.data.rows,
      kind: response.data.kind,
    };
  } catch (error) {
    console.error('Failed to get channel analytics:', error);
    throw error;
  }
}

export async function getTrafficSources(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const data = await getChannelAnalytics(userId, {
      startDate,
      endDate,
      metrics: ['views', 'estimatedMinutesWatched'],
      dimensions: ['insightTrafficSourceType'],
      sort: '-views',
      maxResults: 25,
    });

    return data;
  } catch (error) {
    console.error('Failed to get traffic sources:', error);
    throw error;
  }
}

export async function getTopVideos(
  userId: number,
  startDate: string,
  endDate: string,
  maxResults: number = 10
) {
  try {
    const data = await getChannelAnalytics(userId, {
      startDate,
      endDate,
      metrics: ['views', 'estimatedMinutesWatched', 'averageViewDuration', 'subscribersGained'],
      dimensions: ['video'],
      sort: '-views',
      maxResults,
    });

    return data;
  } catch (error) {
    console.error('Failed to get top videos:', error);
    throw error;
  }
}

export async function getAudienceDemographics(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const [ageGender, geography] = await Promise.all([
      getChannelAnalytics(userId, {
        startDate,
        endDate,
        metrics: ['viewerPercentage'],
        dimensions: ['ageGroup', 'gender'],
        sort: '-viewerPercentage',
      }),
      getChannelAnalytics(userId, {
        startDate,
        endDate,
        metrics: ['views'],
        dimensions: ['country'],
        sort: '-views',
        maxResults: 10,
      }),
    ]);

    return {
      ageGender,
      geography,
    };
  } catch (error) {
    console.error('Failed to get audience demographics:', error);
    throw error;
  }
}

export async function getEngagementMetrics(
  userId: number,
  startDate: string,
  endDate: string
) {
  try {
    const data = await getChannelAnalytics(userId, {
      startDate,
      endDate,
      metrics: [
        'views',
        'likes',
        'dislikes',
        'shares',
        'comments',
        'subscribersGained',
        'subscribersLost',
        'averageViewDuration',
        'averageViewPercentage',
      ],
      dimensions: ['day'],
    });

    return data;
  } catch (error) {
    console.error('Failed to get engagement metrics:', error);
    throw error;
  }
}
