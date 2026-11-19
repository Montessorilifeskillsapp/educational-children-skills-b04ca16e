import { describe, expect, it } from 'vitest';
import { orderedSkills } from '@/components/school/curriculum';
import zh from '@/i18n/lessons/zh.json';

// Chinese titles follow the native review ("洗碗", "端托盘"), with 与/和 rather than "&".
describe('Chinese activity names', () => {
  const dict = zh as Record<string, string>;
  const names = orderedSkills().map((s) => dict[s.titleEn]);

  it('uses the reviewed wording', () => {
    expect(dict['Montessori Teeth Brushing']).toBe('蒙台梭利刷牙');
    expect(dict['Dishwashing']).toBe('洗碗');
    expect(dict['Polishing Mirror']).toBe('擦镜子');
    expect(dict['Table Setting']).toBe('摆桌子');
    expect(dict['Carrying a Tray']).toBe('端托盘');
    expect(dict['Geometric Cabinet']).toBe('几何嵌板橱');
    expect(dict['Saying Please and Thank You']).toBe('说“请”和“谢谢”');
    expect(dict['Celebrations & Traditions']).toBe('庆祝活动与传统习俗');
    expect(dict['Rolling and Unrolling a Mat']).toBe('卷起和展开工作毯');
    expect(dict['Opening and Closing Containers']).toBe('打开和关闭容器');
  });

  it('never uses "&"', () => {
    expect(names.filter((n) => n?.includes('&'))).toEqual([]);
  });
});
