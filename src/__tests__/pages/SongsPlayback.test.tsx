import React, { StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SongsPage from '@/pages/SongsPage';

vi.mock('@/components/PageLayout', () => ({ default: ({ children }: { children: React.ReactNode }) => <main>{children}</main> }));
vi.mock('@/components/SEOOptimizer', () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock('@/components/AuthProvider', () => ({ useAuthContext: () => ({ user: null }) }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
vi.mock('@/hooks/useSEO', () => ({ useSEO: vi.fn() }));
vi.mock('@/lib/revenuecat', () => ({ isNativePurchaseAvailable: () => false }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke: vi.fn() } } }));
vi.mock('@/hooks/useSongsCatalog', () => ({ useSongsCatalog: () => ({
  loading: false, error: null, purchased: false,
  songs: [{ id: 'continents', title: 'Continents', description: null, sort_order: 1, duration_seconds: 55, preview_start_seconds: 0, coverUrl: null, previewUrl: 'https://example.test/preview.wav', fullUrl: null }],
}) }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('song preview playback', () => {
  it('plays the preview after StrictMode initialization and pauses on a second click', async () => {
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { configurable: true, value: false });
      return Promise.resolve();
    });
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', { configurable: true, value: true });
    });
    render(<StrictMode><MemoryRouter><SongsPage /></MemoryRouter></StrictMode>);
    fireEvent.click(screen.getByRole('button', { name: 'Play preview of Continents' }));
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    expect(document.querySelector('audio')?.getAttribute('src')).toBe('https://example.test/preview.wav');
    const before = pause.mock.calls.length;
    fireEvent.click(await screen.findByRole('button', { name: 'Pause Continents' }));
    expect(pause).toHaveBeenCalledTimes(before + 1);
  });
});