// Conversion analytics — persists events to Supabase analytics_events table.
// Anonymous users are tracked via a stable anon_id stored in localStorage so
// pre-signup funnel events can be tied to the eventual user.

import { supabase } from '@/integrations/supabase/client';

const ANON_KEY = 'mlsa_anon_id';

const getAnonId = (): string => {
  if (typeof window === 'undefined') return 'ssr';
  let id = localStorage.getItem(ANON_KEY);
  if (!id) {
    id =
      (crypto as any)?.randomUUID?.() ??
      `anon_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(ANON_KEY, id);
  }
  return id;
};

class Analytics {
  private userId: string | null = null;

  init(userId?: string | null) {
    this.userId = userId ?? null;
  }

  /**
   * Core tracker. Fire-and-forget; never blocks UI and never throws.
   */
  async track(event: string, properties: Record<string, any> = {}): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      const payload = {
        event,
        user_id: this.userId,
        anon_id: getAnonId(),
        properties,
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      };
      // Don't await — non-blocking
      void supabase.from('analytics_events').insert(payload as any);
    } catch {
      // swallow — analytics must never break the app
    }
  }

  trackPageView(page: string, title?: string) {
    return this.track('page_view', { page, title });
  }

  trackInteraction(action: string, element: string, details?: Record<string, any>) {
    return this.track('user_interaction', { action, element, ...details });
  }

  trackSkillActivity(skillId: string, action: 'start' | 'complete' | 'abandon', progress?: number) {
    return this.track(action === 'start' ? 'activity_started' : `activity_${action}`, {
      skill_id: skillId,
      progress,
    });
  }

  trackConversion(type: 'signup' | 'upgrade' | 'purchase', value?: number) {
    return this.track(type === 'signup' ? 'signup' : `conversion_${type}`, { value });
  }

  trackError(error: Error, context?: string) {
    return this.track('app_error', {
      name: error.name,
      message: error.message,
      context,
    });
  }

  trackPerformance(metric: string, value: number, unit = 'ms') {
    return this.track('performance_metric', { metric, value, unit });
  }

  startTimer(pageId: string) {
    const start = Date.now();
    return () => this.trackPerformance(`page_time_${pageId}`, Date.now() - start);
  }

  trackFeatureUsage(feature: string, _usage?: 'first_use' | 'repeated_use') {
    if (typeof window === 'undefined') return;
    const key = `feature_${feature}_used`;
    const seen = localStorage.getItem(key);
    if (!seen) {
      localStorage.setItem(key, 'true');
      return this.trackInteraction('feature_first_use', feature);
    }
    return this.trackInteraction('feature_repeated_use', feature);
  }
}

export const analytics = new Analytics();

export const useAnalytics = () => ({
  track: analytics.track.bind(analytics),
  trackPageView: analytics.trackPageView.bind(analytics),
  trackInteraction: analytics.trackInteraction.bind(analytics),
  trackSkillActivity: analytics.trackSkillActivity.bind(analytics),
  trackConversion: analytics.trackConversion.bind(analytics),
  trackError: analytics.trackError.bind(analytics),
  trackPerformance: analytics.trackPerformance.bind(analytics),
  startTimer: analytics.startTimer.bind(analytics),
  trackFeatureUsage: analytics.trackFeatureUsage.bind(analytics),
});
