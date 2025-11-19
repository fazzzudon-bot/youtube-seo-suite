import { oauth2Client } from '@/lib/google-auth';
import { db } from '@/db';
import { youtubeTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { decryptToken, encryptToken } from '@/lib/token-crypto';

export async function refreshAccessToken(userId: number) {
  try {
    const tokenRecord = await db
      .select()
      .from(youtubeTokens)
      .where(eq(youtubeTokens.userId, userId))
      .limit(1);

    if (tokenRecord.length === 0 || !tokenRecord[0].refreshToken) {
      throw new Error('No refresh token found for user');
    }

    const refreshToken = decryptToken(tokenRecord[0].refreshToken);
    
    // Set credentials for refresh
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    // Refresh the access token
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to obtain new access token');
    }

    // Update stored tokens
    const now = new Date().toISOString();
    const expiresAt = credentials.expiry_date 
      ? new Date(credentials.expiry_date).toISOString()
      : new Date(Date.now() + 3600 * 1000).toISOString();

    await db
      .update(youtubeTokens)
      .set({
        accessToken: encryptToken(credentials.access_token),
        // Only update refresh token if Google returned a new one
        ...(credentials.refresh_token && {
          refreshToken: encryptToken(credentials.refresh_token),
        }),
        expiresAt,
        updatedAt: now,
      })
      .where(eq(youtubeTokens.userId, userId));

    return credentials.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw new Error('Failed to refresh YouTube access token');
  }
}

// Check if token needs refresh (5 min buffer) and return valid token
export async function getValidAccessToken(userId: number): Promise<string> {
  const tokenRecord = await db
    .select()
    .from(youtubeTokens)
    .where(eq(youtubeTokens.userId, userId))
    .limit(1);

  if (tokenRecord.length === 0) {
    throw new Error('No YouTube token found for user');
  }

  const now = Date.now();
  const expiresAt = new Date(tokenRecord[0].expiresAt).getTime();
  const refreshBuffer = 5 * 60 * 1000; // 5 minutes

  // Refresh if token expires within 5 minutes
  if (expiresAt - now < refreshBuffer) {
    return refreshAccessToken(userId);
  }

  return decryptToken(tokenRecord[0].accessToken);
}

// Check if user has connected YouTube account
export async function hasYouTubeConnection(userId: number): Promise<boolean> {
  const tokenRecord = await db
    .select()
    .from(youtubeTokens)
    .where(eq(youtubeTokens.userId, userId))
    .limit(1);

  return tokenRecord.length > 0;
}
