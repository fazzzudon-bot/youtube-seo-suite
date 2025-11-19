import { cookies } from 'next/headers';

interface ChannelStats {
  title: string;
  subscribers: string;
  viewCount: string;
  videoCount: string;
  channelId?: string;
}

export async function getChannelStats(): Promise<ChannelStats> {
  try {
    // Get stored access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('youtube_access_token')?.value;
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Call YouTube API directly with fetch (no googleapis library)
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch channel data');
    }

    const data = await response.json();
    const channel = data.items?.[0];

    if (!channel) {
      throw new Error('No channel found');
    }

    return {
      title: channel.snippet?.title || 'Unknown',
      subscribers: formatNumber(parseInt(channel.statistics?.subscriberCount || '0')),
      viewCount: formatNumber(parseInt(channel.statistics?.viewCount || '0')),
      videoCount: formatNumber(parseInt(channel.statistics?.videoCount || '0')),
      channelId: channel.id,
    };
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    throw error;
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
