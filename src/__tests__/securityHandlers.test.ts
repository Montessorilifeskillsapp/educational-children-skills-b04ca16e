import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { z } from 'zod';
import { signupAccountAction, exactEmailPattern, canAcceptInvite } from '../../supabase/functions/_shared/identityRules';

// Execute the real handler with dependency-injected identity and database clients.
function handler(name: string, admin: unknown, extra: Record<string, unknown> = {}) {
  const source = readFileSync(`supabase/functions/${name}/index.ts`, 'utf8').replace(/^import .*$/gm, '');
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  let serve: ((request: Request) => Promise<Response>) | undefined;
  const deps = { Deno: { env: { get: () => 'test-value' }, serve: (fn: typeof serve) => { serve = fn; } }, createClient: () => admin, corsHeaders: {}, z, signupAccountAction, exactEmailPattern, ...extra };
  new Function(...Object.keys(deps), code)(...Object.values(deps));
  if (!serve) throw new Error('Handler did not register');
  return serve;
}
const request = (body: unknown) => new Request('https://test.invalid', { method: 'POST', headers: { Authorization: 'Bearer test', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
function query(result: unknown) {
  const q: Record<string, unknown> = {};
  for (const key of ['select', 'eq', 'gte', 'ilike', 'in', 'limit', 'is', 'gt', 'update', 'delete']) q[key] = vi.fn(() => q);
  q.then = (resolve: (value: unknown) => unknown) => Promise.resolve(result).then(resolve);
  q.maybeSingle = vi.fn(async () => result);
  return q;
}

describe('Actual security handler regressions', () => {
  it('repeated signup cannot replace an existing unconfirmed password', async () => {
    const updateUserById = vi.fn();
    const admin = { rpc: vi.fn(async () => ({ data: 'existing-user' })), auth: { admin: { getUserById: async () => ({ data: { user: { email_confirmed_at: null } } }), updateUserById } }, from: () => query({ count: 5 }) };
    const response = await handler('account-signup', admin)(request({ action: 'signup', email: 'owner@example.com', password: 'attacker-password' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(updateUserById).not.toHaveBeenCalled();
  });
  it('reset throttling does not reveal whether an email has an account', async () => {
    const rpc = vi.fn().mockResolvedValueOnce({ data: 'existing-user' }).mockResolvedValueOnce({ data: null });
    const serve = handler('password-reset', { rpc, from: () => query({ count: 5 }) });
    const known = await serve(request({ action: 'request', email: 'known@example.com' }));
    const unknown = await serve(request({ action: 'request', email: 'unknown@example.com' }));
    expect([known.status, unknown.status]).toEqual([200, 200]);
    expect(await known.json()).toEqual(await unknown.json());
  });
  it('account export uses escaped literal email ownership in every email-bound table', async () => {
    const queries: Record<string, ReturnType<typeof query>> = {};
    const admin = { auth: { getUser: async () => ({ data: { user: { id: 'u', email: 'a_b%@example.com', email_confirmed_at: 'now' } } }) }, from: (table: string) => { queries[table] = query({ data: [], error: null }); return queries[table]; } };
    const response = await handler('account-data', admin)(request({ action: 'export' }));
    expect(response.status).toBe(200);
    for (const table of ['leads', 'email_schedule', 'subscription_renewal_notices']) expect(queries[table].ilike).toHaveBeenCalledWith('email', 'a\\_b\\%@example.com');
  });
  it('push registration cannot transfer another account token', async () => {
    const upsert = vi.fn(async () => ({ error: null }));
    const q = query({ data: [], error: null });
    const admin = { auth: { getUser: async () => ({ data: { user: { id: 'caller' } } }) }, from: () => ({ upsert, update: q.update }) };
    const response = await handler('dashboard-data', admin)(request({ action: 'push_register', token: 'another-users-device-token', platform: 'web' }));
    expect(response.status).toBe(403);
    expect(upsert).toHaveBeenCalledWith({ user_id: 'caller', token: 'another-users-device-token', platform: 'web' }, { onConflict: 'token', ignoreDuplicates: true });
    expect(q.eq).toHaveBeenCalledWith('user_id', 'caller');
  });
  it('school portal refuses unconfirmed identities before touching invitations', async () => {
    const from = vi.fn();
    const admin = { auth: { getUser: async () => ({ data: { user: { id: 'u', email: 'staff@example.com' } } }) }, from };
    const response = await handler('school-portal', admin)(request({ action: 'me' }));
    expect(response.status).toBe(401);
    expect(from).not.toHaveBeenCalled();
  });
  it('school portal rejects wildcard-matched invitations even if returned by the database', async () => {
    const acceptSchoolInvite = vi.fn();
    const invites = query({ data: [{ id: 'i', email: 'acb@example.com', school_id: 's', role: 'school_admin' }], error: null });
    const admin = { auth: { getUser: async () => ({ data: { user: { id: 'u', email: 'a_b@example.com', email_confirmed_at: 'now' } } }) }, from: (table: string) => table === 'school_invites' ? invites : query({ data: [], error: null }) };
    const response = await handler('school-portal', admin, { Body: { safeParse: () => ({ success: true, data: { action: 'me' } }) }, canAcceptInvite, acceptSchoolInvite })(request({ action: 'me' }));
    expect(response.status).toBe(200);
    expect(invites.ilike).toHaveBeenCalledWith('email', 'a\\_b@example.com');
    expect(acceptSchoolInvite).not.toHaveBeenCalled();
  });
});