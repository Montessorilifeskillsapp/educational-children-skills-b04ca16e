import { act, cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InstallBanner from '@/components/InstallBanner';

describe('Install banner persistence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });
  const mount = () => render(<MemoryRouter><InstallBanner /></MemoryRouter>);

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

  it('shows again after 72 hours only when not installed', () => {
    localStorage.setItem('pwa-install-banner-dismissed', String(Date.now() - 73 * 3600000));
    mount();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('region', { name: 'Install app banner' })).toBeInTheDocument();
  });
});