/**
 * Performance Monitoring Utility
 * Tracks API response times, user interactions, and system metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private maxMetrics = 1000;

  /**
   * Track a performance metric
   */
  track(name: string, value: number, metadata?: Record<string, any>) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      metadata
    });

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log slow operations
    if (value > 3000) {
      console.warn(`Slow operation detected: ${name} took ${value}ms`, metadata);
    }
  }

  /**
   * Measure async function execution time
   */
  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.track(name, duration, { ...metadata, success: true });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.track(name, duration, { ...metadata, success: false, error: String(error) });
      throw error;
    }
  }

  /**
   * Get average metric value
   */
  getAverage(name: string): number {
    const filtered = this.metrics.filter(m => m.name === name);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, m) => acc + m.value, 0);
    return sum / filtered.length;
  }

  /**
   * Get percentile value
   */
  getPercentile(name: string, percentile: number): number {
    const filtered = this.metrics.filter(m => m.name === name);
    if (filtered.length === 0) return 0;
    
    const sorted = filtered.map(m => m.value).sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, index)];
  }

  /**
   * Get all metrics for a specific operation
   */
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name);
    }
    return [...this.metrics];
  }

  /**
   * Get performance summary
   */
  getSummary(): Record<string, any> {
    const operations = new Set(this.metrics.map(m => m.name));
    const summary: Record<string, any> = {};

    operations.forEach(op => {
      summary[op] = {
        count: this.metrics.filter(m => m.name === op).length,
        avg: this.getAverage(op).toFixed(2),
        p50: this.getPercentile(op, 50).toFixed(2),
        p95: this.getPercentile(op, 95).toFixed(2),
        p99: this.getPercentile(op, 99).toFixed(2)
      };
    });

    return summary;
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = [];
  }

  /**
   * Track API call performance
   */
  async trackAPICall<T>(
    endpoint: string,
    method: string,
    fn: () => Promise<T>
  ): Promise<T> {
    return this.measure(`api_${method}_${endpoint}`, fn, { endpoint, method });
  }

  /**
   * Track user interaction
   */
  trackInteraction(action: string, component: string, metadata?: Record<string, any>) {
    this.track(`interaction_${component}_${action}`, 0, { action, component, ...metadata });
  }

  /**
   * Get slow operations (over 2 seconds)
   */
  getSlowOperations(threshold = 2000): PerformanceMetric[] {
    return this.metrics.filter(m => m.value > threshold);
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Browser performance metrics
export function captureWebVitals() {
  if (typeof window === 'undefined') return;

  // Capture Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        performanceMonitor.track('web_vital_lcp', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          performanceMonitor.track('web_vital_fid', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            performanceMonitor.track('web_vital_cls', clsScore);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.error('Failed to capture web vitals:', error);
    }
  }

  // Navigation timing
  if ('performance' in window && 'timing' in window.performance) {
    window.addEventListener('load', () => {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      const firstPaint = timing.responseEnd - timing.fetchStart;

      performanceMonitor.track('page_load_time', loadTime);
      performanceMonitor.track('dom_ready_time', domReady);
      performanceMonitor.track('first_paint_time', firstPaint);
    });
  }
}
