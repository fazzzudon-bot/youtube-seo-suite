'use server';

import { cookies } from 'next/headers';
import { oauth2Client } from '@/lib/google-oauth';

interface RefreshTokenResponse {
  accessToken: string;
  expiryDate: number;
  error?: string;
}

export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('youtube_refresh_token')?.value;

    if (!refreshToken) {
      return { 
        accessToken: '', 
        expiryDate: 0, 
        error: 'No refresh token found' 
      };
    }

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    
    if (!credentials.access_token) {
      throw new Error('Failed to refresh access token');
    }

    const expiryDate = credentials.expiry_date || Date.now() + 3600 * 1000;

    // Update cookie with new access token
    cookieStore.set('youtube_access_token', credentials.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/',
    });

    cookieStore.set('youtube_token_expiry', expiryDate.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/',
    });

    return {
      accessToken: credentials.access_token,
      expiryDate,
    };
  } catch (error) {
    console.error('Token refresh failed:', error);
    return { 
      accessToken: '', 
      expiryDate: 0, 
      error: 'Token refresh failed' 
    };
  }
}

export async function getValidAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('youtube_access_token')?.value;
  const expiry = cookieStore.get('youtube_token_expiry')?.value;

  if (!accessToken || !expiry) {
    throw new Error('No access token');
  }

  // Refresh if expiring within 5 minutes
  if (Date.now() > parseInt(expiry) - 300000) {
    const { accessToken: newToken, error } = await refreshAccessToken();
    if (error) throw new Error(error);
    return newToken;
  }

  return accessToken;
}

export async function isYouTubeConnected(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('youtube_access_token')?.value;
  const refreshToken = cookieStore.get('youtube_refresh_token')?.value;
  return !!(accessToken || refreshToken);
}

export async function disconnectYouTube(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('youtube_access_token');
  cookieStore.delete('youtube_refresh_token');
  cookieStore.delete('youtube_token_expiry');
}
