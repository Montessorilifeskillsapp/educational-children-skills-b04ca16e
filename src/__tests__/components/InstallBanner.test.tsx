import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InstallBanner from '@/components/InstallBanner';

const auth = vi.hoisted(() => ({ user: null as null | { id: string }, loading: false }));
vi.mock('@/components/AuthProvider', () => ({ useAuthContext: () => auth }));

describe('Install banner persistence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    auth.user = null;
    auth.loading = false;
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Android Chrome');
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
  const mount = (path = '/') => render(<MemoryRouter initialEntries={[path]}><InstallBanner /></MemoryRouter>);

  it('does not reopen when installation happens before the delayed banner', () => {
    mount();
    act(() => { window.dispatchEvent(new Event('appinstalled')); vi.advanceTimersByTime(2000); });
    expect(localStorage.getItem('pwa-installed')).toBe('1');
    expect(screen.queryByRole('region', { name: 'Install app banner' })).not.toBeInTheDocument();
  });

  it('remembers installation even during the dismissal cooldown', () => {
    localStorage.setItem('pwa-install-banner-dismissed', String(Date.now()));
    mount();
    act(() => window.dispatchEvent(new Event('appinstalled')));
    expect(localStorage.getItem('pwa-installed')).toBe('1');
  });

  it('remembers when opened as an installed app', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
    mount();
    expect(localStorage.getItem('pwa-installed')).toBe('1');
  });

  it('keeps an old dismissal permanent after refresh', () => {
    localStorage.setItem('pwa-install-banner-dismissed', String(Date.now() - 73 * 3600000));
    mount();
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('never shows from a refresh timer without a native prompt', () => {
    mount();
    act(() => vi.advanceTimersByTime(60000));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('dismisses permanently across remounts and later native prompts', () => {
    mount();
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.getByRole('region')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss install banner (Escape)' }));
    cleanup();
    mount();
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('hides the banner for signed-in accounts, even with the old force override', () => {
    auth.user = { id: 'teacher' };
    mount('/?forceInstallBanner=1');
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('waits for the account check', () => {
    auth.loading = true;
    mount();
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it.each(['/school', '/school/records', '/admin', '/admin/schools'])('blocks reminders on %s', path => {
    mount(path);
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('does not prompt desktop visitors', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Desktop Chrome');
    mount();
    act(() => window.dispatchEvent(new Event('beforeinstallprompt')));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
