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

describe('Material names match the agreed names (2026-11-20)', () => {
  const all = (d: unknown) => Object.values(d as Record<string, string>).join('\n');
  it('German: Metalleinsätze', async () => {
    const de = (await import('@/i18n/lessons/de.json')).default;
    expect(all(de)).not.toMatch(/Metallene/);
  });
  it('Chinese: one name per material', () => {
    const text = all(zh);
    for (const old of ['串珠架', '嵌板地图', '砂字板', '塞根十位板', '11–19塞根板', '整十数塞根板', '水陆地貌', '水陆形态', '陆地与水域形态名称卡', '陆地与水域形态对照图']) expect(text).not.toContain(old);
    expect((zh as Record<string, string>)['Large Bead Frame']).toBe('大珠算架');
  });
  it('Spanish: barras numéricas, Kiswahili: maumbo ya chuma', () => {
    expect(all(es)).not.toMatch(/listones numéricos/);
    expect(all(sw)).not.toMatch(/chuma yanayoingizwa katika fremu/);
    expect((sw as Record<string, string>)['Would you like to work with the Metal Insets?']).toBe('Je, ungependa kufanya kazi na maumbo ya chuma?');
  });
  it('Hindi: मनकों का छोटा/बड़ा फ्रेम', async () => {
    const hi = (await import('@/i18n/lessons/hi.json')).default as Record<string, string>;
    expect(all(hi)).not.toMatch(/मनका फ्रेम/);
    expect(hi['Small Bead Frame']).toBe('मनकों का छोटा फ्रेम (Small Bead Frame)');
  });
});
