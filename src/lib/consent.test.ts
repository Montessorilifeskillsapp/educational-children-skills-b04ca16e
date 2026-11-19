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

describe('consent regions', () => {
  const trace = (loc: string) => vi.fn().mockResolvedValue({ ok: true, text: async () => `h=${location.hostname}\nloc=${loc}\n` });
  beforeEach(() => { localStorage.clear(); vi.resetModules(); });

  it.each(['CN', 'BR', 'IN', 'KE', 'KR', 'DE'])('asks visitors from %s before analytics', async (loc) => {
    vi.stubGlobal('fetch', trace(loc));
    const { needsAnswer, canTrack } = await import('@/lib/consent');
    expect(await needsAnswer(['analytics'])).toBe(true);
    expect(await canTrack('analytics')).toBe(false);
  });

  it('does not ask visitors from the United States', async () => {
    vi.stubGlobal('fetch', trace('US'));
    const { needsAnswer } = await import('@/lib/consent');
    expect(await needsAnswer(['analytics'])).toBe(false);
  });
});
