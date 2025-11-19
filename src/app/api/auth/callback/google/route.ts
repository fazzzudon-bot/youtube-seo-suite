import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { oauth2Client } from '@/lib/google-oauth';
import { z } from 'zod';

const CodeSchema = z.object({
  code: z.string().min(1, 'Authorization code required'),
  state: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Validate input
    const validated = CodeSchema.parse({ code, state });

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(validated.code);
    
    if (!tokens.access_token || !tokens.refresh_token) {
      throw new Error('Missing access or refresh token');
    }

    // Extract expiry time (default to 3600 seconds = 1 hour)
    const expiryDate = tokens.expiry_date || Date.now() + 3600 * 1000;

    const cookieStore = await cookies();
    
    // Store tokens in secure httpOnly cookies
    cookieStore.set('youtube_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    cookieStore.set('youtube_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    cookieStore.set('youtube_token_expiry', expiryDate.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
      path: '/',
    });

    // Redirect to dashboard
    return NextResponse.redirect(
      new URL('/dashboard?oauth=success', request.url),
      { status: 302 }
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/dashboard?oauth=error', request.url),
      { status: 302 }
    );
  }
}
