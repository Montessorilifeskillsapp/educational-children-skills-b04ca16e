import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/i18n';
import ReadinessOffer from '@/components/growth/ReadinessOffer';

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), open: vi.fn() }));
vi.mock('@/hooks/useAuth', () => ({ useAuth: () => ({ user: null }) }));
vi.mock('@/contexts/SubscriptionContext', () => ({ useSubscription: () => ({ isPremium: false }) }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke: mocks.invoke } } }));
vi.mock('@/lib/consent', () => ({ readChoice: () => 'denied', onConsentChange: () => () => {} }));
afterEach(() => { cleanup(); vi.useRealTimers(); localStorage.clear(); vi.clearAllMocks(); });

describe('Readiness Guide offer', () => {
  it('keeps the confirmation and Premium link on screen after a visitor signs up, even when the new tab is blocked', async () => {
    vi.useFakeTimers();
    mocks.invoke.mockResolvedValue({ error: null });
    window.open = mocks.open.mockReturnValue(null) as unknown as typeof window.open;
    URL.createObjectURL = vi.fn(() => 'blob:guide');
    const before = window.location.href;
    render(<MemoryRouter initialEntries={['/sensorial']}><ReadinessOffer /></MemoryRouter>);
    act(() => { vi.advanceTimersByTime(20000); });
    vi.useRealTimers();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'parent@example.com' } });
    fireEvent.submit(screen.getByRole('textbox').closest('form')!);
    expect(await screen.findByRole('link', { name: /premium/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
    expect(window.location.href).toBe(before);
    expect(localStorage.getItem('readiness-offer-dismissed')).toBeTruthy();
  });

  it('stays closed for a visitor who already dismissed it', () => {
    vi.useFakeTimers();
    localStorage.setItem('readiness-offer-dismissed', '2026-11-18');
    render(<MemoryRouter initialEntries={['/sensorial']}><ReadinessOffer /></MemoryRouter>);
    act(() => { vi.advanceTimersByTime(25000); });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
