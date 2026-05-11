import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

const SESSION_KEY = 'mlsa_utm_attribution';
const FIRED_KEY = 'mlsa_utm_fired';

export interface UtmAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_path: string;
  landed_at: number;
}

/** Last UTM attribution captured this session (e.g. for enriching later events). */
export const getStoredUtm = (): UtmAttribution | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmAttribution) : null;
  } catch {
    return null;
  }
};

/**
 * Captures UTM-tagged landings (e.g. from onboarding emails) and fires
 * `email_cta_landed` once per unique campaign per session. Stores the
 * attribution in sessionStorage so downstream events (subscribe_started,
 * subscribe_completed, activity_started) can be joined to the originating
 * email click in analytics queries.
 */
export const useUtmTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utm_source = params.get('utm_source') ?? undefined;
    if (!utm_source) return;

    const utm_medium = params.get('utm_medium') ?? undefined;
    const utm_campaign = params.get('utm_campaign') ?? undefined;

    const attribution: UtmAttribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      landing_path: location.pathname,
      landed_at: Date.now(),
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
    } catch {
      /* ignore */
    }

    // De-dupe per source+campaign within the session so refreshes don't
    // double-count clicks.
    const fingerprint = `${utm_source}:${utm_campaign ?? ''}:${location.pathname}`;
    let fired: string[] = [];
    try {
      fired = JSON.parse(sessionStorage.getItem(FIRED_KEY) ?? '[]');
    } catch {
      /* ignore */
    }
    if (fired.includes(fingerprint)) return;
    fired.push(fingerprint);
    try {
      sessionStorage.setItem(FIRED_KEY, JSON.stringify(fired));
    } catch {
      /* ignore */
    }

    if (utm_source === 'email') {
      analytics.track('email_cta_landed', {
        utm_source,
        utm_medium,
        utm_campaign,
        landing_path: location.pathname,
      });
    } else {
      analytics.track('utm_landed', {
        utm_source,
        utm_medium,
        utm_campaign,
        landing_path: location.pathname,
      });
    }
  }, [location.pathname, location.search]);
};
