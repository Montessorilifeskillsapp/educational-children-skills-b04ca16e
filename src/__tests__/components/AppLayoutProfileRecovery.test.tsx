import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';

vi.mock('@/components/AuthProvider', () => ({ useAuthContext: () => ({ user: null, loading: false }) }));
vi.mock('@/contexts/SubscriptionContext', () => ({ useSubscription: () => ({ isPremium: false }) }));
vi.mock('@/contexts/ProfileContext', () => ({ useProfile: () => ({ profiles: [], activeProfile: null, isOnboarded: true, loading: false, completeOnboarding: vi.fn(), setProfiles: vi.fn(), setActiveProfile: vi.fn() }) }));
vi.mock('@/components/school/useIsSchoolStaff', () => ({ useIsSchoolStaff: () => false }));
vi.mock('@/hooks/useActivityCompletions', () => ({ useActivityCompletions: () => ({ completedSkillIds: [], logCompletion: vi.fn(), streak: 0 }) }));
vi.mock('@/components/OnboardingFlow', () => ({ default: () => <div role="form" aria-label="Child setup" /> }));

describe('Stale onboarding state', () => {
  it('opens setup rather than loading forever when the saved profile does not exist', async () => {
    window.history.replaceState({}, '', '/?view=dashboard');
    render(<MemoryRouter initialEntries={['/?view=dashboard']}><AppLayout /></MemoryRouter>);
    expect(await screen.findByRole('form', { name: 'Child setup' })).toBeInTheDocument();
    window.history.replaceState({}, '', '/');
  });
});