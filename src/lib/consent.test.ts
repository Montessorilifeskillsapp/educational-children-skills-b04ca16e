import { describe, it, expect, vi, beforeEach } from 'vitest';

const insert = vi.fn();
vi.mock('@/integrations/supabase/client', () => ({ supabase: { from: () => ({ insert }) } }));

describe('usage records follow the visitor\'s analytics choice', () => {
  beforeEach(() => {
    localStorage.clear();
    insert.mockReset();
    vi.resetModules();
    // Region lookup unavailable (as in the preview) counts as a consent region.
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  });

  it('records nothing and creates no visitor ID after Reject all', async () => {
    const { saveChoices } = await import('@/lib/consent');
    const { analytics } = await import('@/lib/analytics');
    saveChoices({ analytics: 'denied' });
    await analytics.track('page_view');
    expect(insert).not.toHaveBeenCalled();
    expect(localStorage.getItem('mlsa_anon_id')).toBeNull();
  });

  it('records nothing before an answer where consent is required', async () => {
    const { analytics } = await import('@/lib/analytics');
    await analytics.track('page_view');
    expect(insert).not.toHaveBeenCalled();
  });

  it('records usage after Accept all', async () => {
    const { saveChoices } = await import('@/lib/consent');
    const { analytics } = await import('@/lib/analytics');
    saveChoices({ analytics: 'granted' });
    await analytics.track('page_view');
    expect(insert).toHaveBeenCalledTimes(1);
  });
});
