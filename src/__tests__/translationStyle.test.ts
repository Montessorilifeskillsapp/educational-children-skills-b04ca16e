import { describe, it, expect } from 'vitest';
import es from '@/i18n/lessons/es.json';
import sw from '@/i18n/lessons/sw.json';
import zh from '@/i18n/lessons/zh.json';

const values = (d: Record<string, string>) => Object.values(d);

describe('Chinese child invitations (2026-11-20)', () => {
  it('every invitation starts with 你想', () => {
    const inv = Object.entries(zh as Record<string, string>).filter(([en]) => en.startsWith('Would you like'));
    expect(inv.length).toBeGreaterThan(0);
    expect(inv.filter(([, v]) => !v.startsWith('你想'))).toEqual([]);
  });
});

describe('Sentence case in Spanish and Kiswahili (2026-11-20)', () => {
  it('Spanish material names are lowercase mid-phrase', () => {
    const d = es as Record<string, string>;
    expect(values(d).filter((v) => /Bastidor(es)? de Vestir|Serie (Rosa|Azul|Verde)|Juegos? de la Serpiente|Mapas? Rompecabezas/.test(v))).toEqual([]);
    expect(d['Button dressing frame']).toBe('Bastidor de vestir de botones');
    expect(d['Auditory Discrimination']).toBe('Discriminación auditiva');
  });
  it('Spanish keeps area names capitalized', () => {
    expect((es as Record<string, string>)['Combining with other practical life skills']).toContain('Vida Práctica');
  });
  it('Kiswahili names use lowercase after the first word', () => {
    const d = sw as Record<string, string>;
    expect(values(d).filter((v) => /kwa Kujitegemea/.test(v))).toEqual([]);
    expect(d['Using Tongs']).toBe('Kutumia koleo');
    expect(d['Washing Hands']).toBe('Kunawa mikono');
  });
  it('Kiswahili keeps proper names capitalized', () => {
    expect((sw as Record<string, string>)['Identify the "Ring of Fire" around the Pacific']).toContain('Bahari ya Pasifiki');
  });
});
