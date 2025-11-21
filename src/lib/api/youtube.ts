/**
 * YouTube Data API v3 Integration
 * Using API Key only (no OAuth)
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface YouTubeAPIParams {
  [key: string]: string | number | undefined;
}

async function youtubeAPICall(endpoint: string, params: YouTubeAPIParams) {
  const queryParams = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    ...Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined)
    ) as Record<string, string>
  });

  const url = `${YOUTUBE_API_BASE}/${endpoint}?${queryParams}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`YouTube API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw error;
  }
}

export async function getVideoDetails(videoId: string) {
  return youtubeAPICall('videos', {
    part: 'snippet,statistics,contentDetails',
    id: videoId
  });
}

export async function getChannelDetails(channelId: string) {
  return youtubeAPICall('channels', {
    part: 'snippet,statistics,contentDetails,brandingSettings',
    id: channelId
  });
}

export async function searchVideos(query: string, maxResults: number = 10) {
  return youtubeAPICall('search', {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: maxResults.toString(),
    order: 'relevance'
  });
}

export async function getVideoComments(videoId: string, maxResults: number = 100) {
  return youtubeAPICall('commentThreads', {
    part: 'snippet',
    videoId: videoId,
    maxResults: maxResults.toString(),
    order: 'relevance'
  });
}

export async function getChannelVideos(channelId: string, maxResults: number = 50) {
  try {
    // First get the uploads playlist ID
    const channelData = await getChannelDetails(channelId);
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }

    // Get videos from the uploads playlist
    return youtubeAPICall('playlistItems', {
      part: 'snippet,contentDetails',
      playlistId: uploadsPlaylistId,
      maxResults: maxResults.toString()
    });
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw error;
  }
}

export async function getTrendingVideos(regionCode: string = 'US', categoryId?: string) {
  // Use more specific search queries for better regional filtering
  const trendingQuery = categoryId 
    ? getCategoryTrendingQuery(categoryId, regionCode)
    : 'trending today popular viral';
  
  const params: YouTubeAPIParams = {
    part: 'snippet',
    q: trendingQuery,
    type: 'video',
    order: 'viewCount',
    publishedAfter: getRecentDate(7), // Last 7 days
    regionCode: regionCode,
    maxResults: '50',
    relevanceLanguage: regionCode === 'US' ? 'en' : undefined,
    safeSearch: 'moderate'
  };

  const searchResults = await youtubeAPICall('search', params);
  
  // Get detailed statistics for the videos
  if (searchResults.items && searchResults.items.length > 0) {
    const videoIds = searchResults.items.map((item: any) => item.id.videoId).join(',');
    const videoDetails = await youtubeAPICall('videos', {
      part: 'snippet,statistics',
      id: videoIds
    });
    
    // Filter out non-English content for US region
    if (regionCode === 'US' && videoDetails.items) {
      videoDetails.items = videoDetails.items.filter((video: any) => {
        const title = video.snippet.title.toLowerCase();
        const defaultLanguage = video.snippet.defaultLanguage || video.snippet.defaultAudioLanguage || 'en';
        
        // Filter out non-English content (basic check for common non-English characters)
        const hasNonLatinChars = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/.test(title);
        
        return !hasNonLatinChars && defaultLanguage.startsWith('en');
      });
    }
    
    return videoDetails;
  }
  
  return searchResults;
}

function getCategoryTrendingQuery(categoryId: string, regionCode: string = 'US'): string {
  // Add region-specific terms to improve filtering
  const regionPrefix = regionCode === 'US' ? 'USA ' : '';
  
  const categoryQueries: Record<string, string> = {
    'Technology': `${regionPrefix}tech news AI gadgets latest technology`,
    'Gaming': `${regionPrefix}gaming news esports trending`,
    'Music': `${regionPrefix}new music releases trending songs`,
    'Entertainment': `${regionPrefix}entertainment news celebrity trending`,
    'Sports': `${regionPrefix}sports highlights NBA NFL trending`,
    'Education': `${regionPrefix}educational tutorial learning trending`,
    'Science': `${regionPrefix}science news discovery space technology`,
    'News': `${regionPrefix}breaking news latest updates today`,
    'Comedy': `${regionPrefix}funny comedy viral trending`,
    'Film': `${regionPrefix}movie trailer new releases cinema`,
    'Autos': `${regionPrefix}cars automotive review technology`,
    'Travel': `${regionPrefix}travel vlog destinations guide`,
    'Pets': `${regionPrefix}pets animals funny cute viral`,
    'Howto': `${regionPrefix}how to tutorial DIY guide`
  };
  
  return categoryQueries[categoryId] || `${regionPrefix}trending today popular viral`;
}

function getRecentDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

export async function searchChannels(query: string, maxResults: number = 10) {
  return youtubeAPICall('search', {
    part: 'snippet',
    q: query,
    type: 'channel',
    maxResults: maxResults.toString()
  });
}

export async function getRelatedVideos(videoId: string, maxResults: number = 10) {
  return youtubeAPICall('search', {
    part: 'snippet',
    relatedToVideoId: videoId,
    type: 'video',
    maxResults: maxResults.toString()
  });
}

export async function estimateSearchVolume(keyword: string) {
  // Estimate search volume based on search results and video stats
  const searchResults = await searchVideos(keyword, 50);
  
  if (!searchResults.items || searchResults.items.length === 0) {
    return { volume: 0, competition: 'Low' };
  }

  // Get video IDs from search results
  const videoIds = searchResults.items.map((item: any) => item.id.videoId).join(',');
  
  // Get detailed stats for these videos
  const videoStats = await youtubeAPICall('videos', {
    part: 'statistics',
    id: videoIds
  });

  // Calculate metrics
  const totalViews = videoStats.items.reduce((sum: number, video: any) => {
    return sum + parseInt(video.statistics?.viewCount || '0');
  }, 0);

  const avgViews = totalViews / videoStats.items.length;
  const totalResults = searchResults.pageInfo?.totalResults || 0;

  // Estimate volume score (0-100)
  let volumeScore = Math.min(100, Math.floor(avgViews / 10000));
  
  // Determine competition level
  let competition = 'Low';
  if (totalResults > 10000) competition = 'High';
  else if (totalResults > 1000) competition = 'Medium';

  return {
    volume: volumeScore,
    competition,
    totalResults,
    avgViews: Math.floor(avgViews),
    topVideos: videoStats.items.slice(0, 5)
  };
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export async function extractChannelId(url: string): Promise<string | null> {
  // Direct channel ID (UC...)
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(url)) {
    return url;
  }

  // Extract from various URL formats
  const patterns = [
    /youtube\.com\/channel\/([^\/\n?#]+)/,
    /youtube\.com\/c\/([^\/\n?#]+)/,
    /youtube\.com\/@([^\/\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const identifier = match[1];
      
      // If it's already a UC ID, return it
      if (/^UC[a-zA-Z0-9_-]{22}$/.test(identifier)) {
        return identifier;
      }
      
      // For @username or custom URLs, we need to search for the channel
      try {
        const searchResult = await searchChannels(identifier, 1);
        if (searchResult.items && searchResult.items.length > 0) {
          return searchResult.items[0].id.channelId || searchResult.items[0].snippet.channelId;
        }
      } catch (error) {
        console.error('Error searching for channel:', error);
      }
    }
  }

  return null;
}

export async function getChannelIdByHandle(handle: string) {
  try {
    const cleanHandle = handle.replace('@', '');
    const searchResult = await searchChannels(cleanHandle, 1);
    
    if (searchResult.items && searchResult.items.length > 0) {
      return searchResult.items[0].id.channelId;
    }
  } catch (error) {
    console.error('Error getting channel ID by handle:', error);
  }
  return null;
}

export async function analyzeVideoEngagement(videoId: string) {
  const videoData = await getVideoDetails(videoId);
  
  if (!videoData.items || videoData.items.length === 0) {
    throw new Error('Video not found');
  }

  const video = videoData.items[0];
  const stats = video.statistics;
  
  const views = parseInt(stats.viewCount || '0');
  const likes = parseInt(stats.likeCount || '0');
  const comments = parseInt(stats.commentCount || '0');

  // Calculate engagement metrics
  const likeRate = views > 0 ? (likes / views) * 100 : 0;
  const commentRate = views > 0 ? (comments / views) * 100 : 0;
  const engagementRate = likeRate + commentRate;

  return {
    videoId,
    title: video.snippet.title,
    views,
    likes,
    comments,
    likeRate: likeRate.toFixed(2),
    commentRate: commentRate.toFixed(2),
    engagementRate: engagementRate.toFixed(2),
    publishedAt: video.snippet.publishedAt,
    tags: video.snippet.tags || [],
    description: video.snippet.description
  };
}

export async function analyzeChannelPerformance(channelId: string) {
  const channelData = await getChannelDetails(channelId);
  
  if (!channelData.items || channelData.items.length === 0) {
    throw new Error('Channel not found');
  }

  const channel = channelData.items[0];
  const stats = channel.statistics;
  
  // Get recent videos
  const recentVideos = await getChannelVideos(channelId, 20);
  
  return {
    channelId,
    title: channel.snippet.title,
    description: channel.snippet.description,
    subscribers: parseInt(stats.subscriberCount || '0'),
    totalViews: parseInt(stats.viewCount || '0'),
    totalVideos: parseInt(stats.videoCount || '0'),
    createdAt: channel.snippet.publishedAt,
    keywords: channel.brandingSettings?.channel?.keywords || '',
    recentVideos: recentVideos.items,
    avgViewsPerVideo: Math.floor(parseInt(stats.viewCount || '0') / parseInt(stats.videoCount || '1'))
  };
}