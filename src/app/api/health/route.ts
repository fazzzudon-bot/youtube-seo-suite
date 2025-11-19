/**
 * Health Check API
 * Monitors AI service health and returns metrics
 */

import { NextResponse } from 'next/server';
import { aiHealthMonitor } from '@/lib/ai/health-monitor';

export async function GET() {
  try {
    const healthStatus = aiHealthMonitor.getHealthStatus();
    const recentErrors = aiHealthMonitor.getRecentErrors(5);

    return NextResponse.json({
      ...healthStatus,
      recentErrors,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to retrieve health status',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST endpoint to manually reset health metrics (admin use)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.action === 'reset') {
      aiHealthMonitor.reset();
      return NextResponse.json({
        success: true,
        message: 'Health metrics reset successfully',
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
