/**
 * AI Health Monitoring System
 * Tracks API health, errors, and provides circuit breaker functionality
 */

export interface HealthMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastSuccessTime: number | null;
  lastFailureTime: number | null;
  errorRate: number;
  isHealthy: boolean;
  circuitBreakerOpen: boolean;
}

export interface ErrorLog {
  timestamp: number;
  endpoint: string;
  error: string;
  statusCode?: number;
  requestData?: any;
}

class AIHealthMonitor {
  private metrics: HealthMetrics = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    lastSuccessTime: null,
    lastFailureTime: null,
    errorRate: 0,
    isHealthy: true,
    circuitBreakerOpen: false,
  };

  private errorLogs: ErrorLog[] = [];
  private responseTimes: number[] = [];
  private readonly MAX_ERROR_LOGS = 100;
  private readonly MAX_RESPONSE_TIMES = 50;
  private readonly ERROR_THRESHOLD = 0.5; // 50% error rate triggers circuit breaker
  private readonly CIRCUIT_BREAKER_TIMEOUT = 60000; // 1 minute
  private circuitBreakerOpenTime: number | null = null;

  recordRequest(success: boolean, responseTime: number, error?: ErrorLog) {
    this.metrics.totalRequests++;
    
    if (success) {
      this.metrics.successfulRequests++;
      this.metrics.lastSuccessTime = Date.now();
      
      // Close circuit breaker on success if open
      if (this.metrics.circuitBreakerOpen) {
        this.metrics.circuitBreakerOpen = false;
        this.circuitBreakerOpenTime = null;
      }
    } else {
      this.metrics.failedRequests++;
      this.metrics.lastFailureTime = Date.now();
      
      if (error) {
        this.errorLogs.unshift(error);
        if (this.errorLogs.length > this.MAX_ERROR_LOGS) {
          this.errorLogs.pop();
        }
      }
    }

    // Track response time
    this.responseTimes.push(responseTime);
    if (this.responseTimes.length > this.MAX_RESPONSE_TIMES) {
      this.responseTimes.shift();
    }

    // Calculate average response time
    this.metrics.averageResponseTime = 
      this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;

    // Calculate error rate
    this.metrics.errorRate = this.metrics.totalRequests > 0
      ? this.metrics.failedRequests / this.metrics.totalRequests
      : 0;

    // Check if circuit breaker should open
    if (this.metrics.errorRate >= this.ERROR_THRESHOLD && !this.metrics.circuitBreakerOpen) {
      this.openCircuitBreaker();
    }

    // Update health status
    this.metrics.isHealthy = this.metrics.errorRate < 0.3 && !this.metrics.circuitBreakerOpen;
  }

  private openCircuitBreaker() {
    this.metrics.circuitBreakerOpen = true;
    this.circuitBreakerOpenTime = Date.now();
    console.error('🔴 CIRCUIT BREAKER OPENED - AI API is experiencing high failure rate');
  }

  shouldAllowRequest(): boolean {
    // If circuit breaker is open, check if timeout has passed
    if (this.metrics.circuitBreakerOpen && this.circuitBreakerOpenTime) {
      const timeSinceOpen = Date.now() - this.circuitBreakerOpenTime;
      if (timeSinceOpen > this.CIRCUIT_BREAKER_TIMEOUT) {
        console.log('🟡 Circuit breaker timeout passed, allowing test request');
        return true; // Allow one test request
      }
      return false;
    }
    return true;
  }

  getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }

  getRecentErrors(limit: number = 10): ErrorLog[] {
    return this.errorLogs.slice(0, limit);
  }

  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    message: string;
    metrics: HealthMetrics;
  } {
    if (this.metrics.circuitBreakerOpen) {
      return {
        status: 'unhealthy',
        message: 'Circuit breaker is open due to high failure rate. Using fallback system.',
        metrics: this.metrics,
      };
    }

    if (this.metrics.errorRate > 0.3) {
      return {
        status: 'degraded',
        message: 'AI API is experiencing elevated error rates.',
        metrics: this.metrics,
      };
    }

    return {
      status: 'healthy',
      message: 'All systems operational.',
      metrics: this.metrics,
    };
  }

  reset() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      lastSuccessTime: null,
      lastFailureTime: null,
      errorRate: 0,
      isHealthy: true,
      circuitBreakerOpen: false,
    };
    this.errorLogs = [];
    this.responseTimes = [];
    this.circuitBreakerOpenTime = null;
  }
}

// Singleton instance
export const aiHealthMonitor = new AIHealthMonitor();
