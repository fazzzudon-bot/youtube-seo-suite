"use client"

import { useEffect } from 'react';
import { captureWebVitals } from '@/lib/performance';

/**
 * Performance Tracker Component
 * Automatically tracks web vitals and page performance
 */

export function PerformanceTracker() {
  useEffect(() => {
    // Start capturing web vitals
    captureWebVitals();

    // Track route changes
    const handleRouteChange = () => {
      const path = window.location.pathname;
      console.log('Route changed:', path);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
