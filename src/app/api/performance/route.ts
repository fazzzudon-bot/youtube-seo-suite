import { NextResponse } from 'next/server';
import { performanceMonitor } from '@/lib/performance';

/**
 * Performance Metrics API
 * Returns application performance data
 */

export async function GET() {
  try {
    const summary = performanceMonitor.getSummary();
    const slowOps = performanceMonitor.getSlowOperations(2000);

    return NextResponse.json({
      summary,
      slowOperations: slowOps.map(op => ({
        name: op.name,
        duration: `${op.value.toFixed(2)}ms`,
        timestamp: new Date(op.timestamp).toISOString(),
        metadata: op.metadata
      })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve performance metrics' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.action === 'clear') {
      performanceMonitor.clear();
      return NextResponse.json({ success: true, message: 'Performance metrics cleared' });
    }

    if (body.action === 'track' && body.name && body.value !== undefined) {
      performanceMonitor.track(body.name, body.value, body.metadata);
      return NextResponse.json({ success: true });
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
