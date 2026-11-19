import { describe, it, expect } from 'vitest';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { aimsFor } from '@/data/activityAims';
import es from '@/i18n/lessons/es.json';
import de from '@/i18n/lessons/de.json';
import zh from '@/i18n/lessons/zh.json';

const all = curriculumSectionsForMaterials.flatMap((s) => Object.entries(s.skills as Record<string, any>));

describe('AMI aims', () => {
  it('every activity has a Direct Aim and an Indirect Aim', () => {
    const missing = all.filter(([id, k]) => { const a = aimsFor(id, k); return !a.direct.length || !a.indirect.length; }).map(([id]) => id);
    expect(missing).toEqual([]);
  });
  it('every aim reads in Spanish, German and Chinese', () => {
    const missing: string[] = [];
    for (const [id, k] of all) { const a = aimsFor(id, k); for (const s of [...a.direct, ...a.indirect]) for (const d of [es, de, zh] as Record<string, string>[]) if (!d[s.trim()]) missing.push(`${id}: ${s}`); }
    expect(missing).toEqual([]);
  });
});
