import { afterEach, describe, expect, it } from 'vitest';
import i18n from '@/i18n';
import { STATUS_LABEL, STATUSES } from '@/components/school/ProgressChooser';
import { ROLE_LABEL } from '@/components/school/api';

describe('School Portal labels follow the chosen language without changing stored values', () => {
  afterEach(async () => { await i18n.changeLanguage('en'); });

  it('keeps the stored status identifiers', () => {
    expect([...STATUSES]).toEqual(['presented', 'practising', 'mastered']);
  });

  it('shows German status and role labels when German is chosen', async () => {
    await i18n.changeLanguage('de');
    expect(STATUS_LABEL.mastered).toBe('Arbeitet selbstständig');
    expect(ROLE_LABEL.school_admin).toBe('Schulleitung');
  });

  it('shows American English labels by default', async () => {
    await i18n.changeLanguage('en');
    expect(STATUS_LABEL.practising).toBe('Practicing');
    expect(ROLE_LABEL.teacher).toBe('Teacher');
  });
});
