import { describe, it, expect } from 'vitest';
import { exactEmailPattern, canAcceptInvite, signupAccountAction } from '../../supabase/functions/_shared/identityRules';
import { approvedProductUrl } from '../../supabase/functions/admin-material-links/urlRules';
import { canOpenActivity, FREE_STARTER_IDS } from '@/lib/activityEntitlement';

describe('Security ownership rules', () => {
  it('an existing unconfirmed signup can only resend, never replace a password', () => {
    expect(signupAccountAction(true, false)).toBe('resend');
    expect(signupAccountAction(true, true)).toBe('none');
    expect(signupAccountAction(false, false)).toBe('create');
  });
  it('email patterns preserve literal wildcard and escape characters', () => {
    expect(exactEmailPattern('a_b%\\@example.com')).toBe('a\\_b\\%\\\\@example.com');
  });
  it('a wildcard email cannot claim another staff invitation', () => {
    expect(canAcceptInvite({ email: 'a_b@example.com', email_confirmed_at: '2026-11-28' }, 'acb@example.com')).toBe(false);
  });
  it('invitation acceptance requires confirmed email ownership', () => {
    expect(canAcceptInvite({ email: 'owner@example.com' }, 'owner@example.com')).toBe(false);
    expect(canAcceptInvite({ email: 'Owner@example.com', email_confirmed_at: '2026-11-28' }, 'owner@example.com')).toBe(true);
  });
  it('server product fetches reject substring impostors and private destinations', () => {
    for (const url of ['https://amazon.evil.test/dp/1234567890', 'https://evilamazon.com/', 'http://amazon.com/', 'https://127.0.0.1/', 'https://amazon.com:8443/', 'https://user:pass@amazon.com/']) expect(approvedProductUrl(url)).toBeNull();
    expect(approvedProductUrl('https://www.amazon.com/dp/B012345678')?.hostname).toBe('www.amazon.com');
  });
  it('premium URL choices cannot bypass the free section limit', () => {
    for (const id of ['water-bodies', 'moveable-alphabet', 'brushing-teeth', 'pouring-water']) expect(canOpenActivity(id, false)).toBe(false);
    expect(canOpenActivity('water-bodies', true)).toBe(true);
  });
  it('each of nine curriculum sections retains its free starter', () => {
    expect(FREE_STARTER_IDS.size).toBe(9);
    for (const id of ['carrying-a-tray', 'knobbed-cylinders', 'number-rods', 'vocabulary-enrichment', 'land-water-forms', 'plant-parts', 'basic-drawing', 'greeting-others', 'days-of-the-week']) expect(canOpenActivity(id, false)).toBe(true);
  });
});