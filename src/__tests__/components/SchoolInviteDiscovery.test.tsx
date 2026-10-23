import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationMenu from '@/components/NavigationMenu';

const mocks = vi.hoisted(() => ({ user: { id: 'teacher' } as { id: string } | null, call: vi.fn() }));
vi.mock('@/components/AuthProvider', () => ({ useAuthContext: () => ({ user: mocks.user }) }));
vi.mock('@/components/ThemeToggle', () => ({ default: () => null }));
vi.mock('@/components/school/api', () => ({ schoolCall: mocks.call }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { from: () => {
  const query = { select: () => query, eq: () => query, maybeSingle: async () => ({ data: null }) };
  return query;
} } }));
afterEach(() => { cleanup(); vi.clearAllMocks(); mocks.user = { id: 'teacher' }; });

describe('automatic school invitation discovery', () => {
  it('activates an invited teacher without an email click and opens the portal', async () => {
    mocks.call.mockResolvedValue({ memberships: [{ id: 'teacher-membership' }] });
    render(<MemoryRouter><NavigationMenu /></MemoryRouter>);
    await waitFor(() => expect(mocks.call).toHaveBeenCalledWith({ action: 'me' }));
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(await screen.findByRole('button', { name: 'School Administration' })).toBeInTheDocument();
  });
  it('checks again when a signed-in user opens the menu after being invited', async () => {
    mocks.call.mockResolvedValueOnce({ memberships: [] }).mockResolvedValue({ memberships: [{ id: 'new-membership' }] });
    render(<MemoryRouter><NavigationMenu /></MemoryRouter>);
    await waitFor(() => expect(mocks.call).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(await screen.findByRole('button', { name: 'School Administration' })).toBeInTheDocument();
    expect(mocks.call).toHaveBeenCalledTimes(2);
  });
  it('does not activate invitations for signed-out visitors', () => {
    mocks.user = null;
    render(<MemoryRouter><NavigationMenu /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(mocks.call).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'School Administration' })).not.toBeInTheDocument();
  });
});