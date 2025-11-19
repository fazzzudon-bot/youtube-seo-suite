import { NextResponse } from 'next/server';

/**
 * Analytics API Endpoint
 * Tracks usage metrics and provides insights
 */

interface AnalyticsData {
  endpoint: string;
  timestamp: string;
  success: boolean;
  responseTime?: number;
  userId?: string;
}

// In-memory storage (replace with database in production)
const analyticsStore: AnalyticsData[] = [];

export async function POST(request: Request) {
  try {
    const data: AnalyticsData = await request.json();
    
    // Validate data
    if (!data.endpoint || !data.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store analytics data
    analyticsStore.push({
      ...data,
      timestamp: new Date().toISOString()
    });

    // Keep only last 1000 entries
    if (analyticsStore.length > 1000) {
      analyticsStore.shift();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to store analytics' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Calculate metrics
    const total = analyticsStore.length;
    const successful = analyticsStore.filter(a => a.success).length;
    const avgResponseTime = analyticsStore.reduce((sum, a) => sum + (a.responseTime || 0), 0) / total;

    // Group by endpoint
    const byEndpoint = analyticsStore.reduce((acc, item) => {
      acc[item.endpoint] = (acc[item.endpoint] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      total,
      successful,
      successRate: total > 0 ? (successful / total * 100).toFixed(2) : 0,
      avgResponseTime: avgResponseTime.toFixed(2),
      byEndpoint,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
