// Analytics tracking for launch optimization

interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean;
  private userId: string | null = null;

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  // Initialize analytics with user ID
  init(userId?: string) {
    this.userId = userId || null;
    
    if (this.isEnabled) {
      // Initialize your analytics service here (GA4, Mixpanel, etc.)
      console.log('Analytics initialized for user:', this.userId);
    }
  }

  // Track page views
  trackPageView(page: string, title?: string) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'page_view',
      category: 'navigation',
      label: page,
      customParameters: {
        page_title: title,
        user_id: this.userId,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  // Track user interactions
  trackInteraction(action: string, element: string, details?: Record<string, any>) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'user_interaction',
      category: 'engagement',
      label: `${action}_${element}`,
      customParameters: {
        action,
        element,
        user_id: this.userId,
        timestamp: Date.now(),
        ...details
      }
    };

    this.sendEvent(event);
  }

  // Track skill activities
  trackSkillActivity(skillId: string, action: 'start' | 'complete' | 'abandon', progress?: number) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'skill_activity',
      category: 'learning',
      label: `${skillId}_${action}`,
      value: progress,
      customParameters: {
        skill_id: skillId,
        action,
        progress_percentage: progress,
        user_id: this.userId,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  // Track conversion events
  trackConversion(type: 'signup' | 'upgrade' | 'purchase', value?: number) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'conversion',
      category: 'business',
      label: type,
      value: value,
      customParameters: {
        conversion_type: type,
        conversion_value: value,
        user_id: this.userId,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  // Track errors for debugging
  trackError(error: Error, context?: string) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'app_error',
      category: 'technical',
      label: error.name,
      customParameters: {
        error_message: error.message,
        error_stack: error.stack,
        context,
        user_id: this.userId,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      event: 'performance_metric',
      category: 'technical',
      label: metric,
      value: value,
      customParameters: {
        metric_name: metric,
        metric_value: value,
        metric_unit: unit,
        timestamp: Date.now()
      }
    };

    this.sendEvent(event);
  }

  // Send event to analytics service
  private sendEvent(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event (Dev Mode):', event);
      return;
    }

    // Send to your analytics provider
    // Examples:
    // - Google Analytics 4: gtag('event', event.event, event.customParameters)
    // - Mixpanel: mixpanel.track(event.event, event.customParameters)
    // - Custom API: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) })
    
    console.log('Analytics Event:', event);
  }

  // Utility: Track time spent on page
  startTimer(pageId: string) {
    if (!this.isEnabled) return null;

    const startTime = Date.now();
    
    return () => {
      const timeSpent = Date.now() - startTime;
      this.trackPerformance(`page_time_${pageId}`, timeSpent);
    };
  }

  // Utility: Track feature usage
  trackFeatureUsage(feature: string, usage: 'first_use' | 'repeated_use') {
    const storageKey = `feature_${feature}_used`;
    const hasUsedBefore = localStorage.getItem(storageKey);
    
    if (!hasUsedBefore) {
      localStorage.setItem(storageKey, 'true');
      this.trackInteraction('feature_first_use', feature);
    } else {
      this.trackInteraction('feature_repeated_use', feature);
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export hook for React components
export const useAnalytics = () => {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackInteraction: analytics.trackInteraction.bind(analytics),
    trackSkillActivity: analytics.trackSkillActivity.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    startTimer: analytics.startTimer.bind(analytics),
    trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
  };
};