import { describe, it, expect } from 'vitest';
import hi from '@/i18n/lessons/hi.json';

const dict = hi as Record<string, string>;

// Hindi reviewer's 15 activity-name corrections (2026-11-19).
const reviewed: Record<string, string> = {
  'Montessori Teeth Brushing': 'मोंटेसरी से दाँत साफ़ करना (Montessori Teeth Brushing)',
  'Spooning Beans': 'चम्मच से राजमा स्थानांतरित करना (Spooning Beans)',
  'Polishing Mirror': 'दर्पण चमकाना (Polishing Mirror)',
  'Dressing Frame - Large Buttons': 'ड्रेसिंग फ्रेम – बड़े बटन (Dressing Frame - Large Buttons)',
  'Dressing Frame - Zipper': 'ड्रेसिंग फ्रेम – ज़िप (Dressing Frame - Zipper)',
  'Dressing Frame - Snaps': 'ड्रेसिंग फ्रेम – प्रेस बटन (Dressing Frame - Snaps)',
  'Dressing Frame - Lacing': 'ड्रेसिंग फ्रेम – फीता पिरोना (Dressing Frame - Lacing)',
  'Dressing Frame - Buckles': 'ड्रेसिंग फ्रेम – बकल (Dressing Frame - Buckles)',
  'Dressing Frame - Bows': 'ड्रेसिंग फ्रेम – बो (Dressing Frame - Bows)',
  'Watching Without Interrupting': 'बिना बाधा डाले देखना (Watching Without Interrupting)',
  'Metal Insets': 'धातु इनसेट (Metal Insets)',
  'Conversation & Discussion': 'बातचीत और चर्चा (Conversation & Discussion)',
  'Pollination & Seed Dispersal': 'परागण और बीज प्रसार (Pollination & Seed Dispersal)',
  'Saying Please and Thank You': '“कृपया” और “धन्यवाद” कहना (Saying Please and Thank You)',
  'Table Manners': 'मेज़ पर शिष्टाचार (Table Manners)',
};

describe('Hindi activity names (review 2026-11-19)', () => {
  for (const [en, expected] of Object.entries(reviewed)) {
    it(`${en}`, () => expect(dict[en]).toBe(expected));
  }

  it('calls dressing frames "ड्रेसिंग फ्रेम" in every invitation and step', () => {
    const old = Object.values(dict).filter((v) => /बंदिश(ों)? (का|के) फ्रेम/.test(v));
    expect(old).toEqual([]);
    const frameLines = Object.entries(dict).filter(([en]) => /dressing frame/i.test(en) && !/fasteners difficult/.test(en));
    for (const [, v] of frameLines) expect(v).toContain('ड्रेसिंग फ्रेम');
  });
});

describe('Hindi tidy-ups (2026-11-19)', () => {
  it('invitations speak to girls and boys: चाहोगे/चाहोगी', () => {
    const invitations = Object.entries(dict).filter(([en]) => en.startsWith('Would you like'));
    expect(invitations.length).toBeGreaterThan(200);
    const boysOnly = Object.values(dict).filter((v) => /चाहोगे(?!\/चाहोगी)/.test(v));
    expect(boysOnly).toEqual([]);
  });

  it('spells साफ़ with the nukta everywhere', () => {
    expect(Object.values(dict).filter((v) => /साफ(?!़)/.test(v))).toEqual([]);
  });

  it('older activity names also show the English name in brackets', () => {
    for (const en of ['Brushing Teeth', 'Washing Hands', 'Making Bed', 'Setting Table', 'Tying Shoes', 'Spooning']) {
      expect(dict[en].endsWith(` (${en})`)).toBe(true);
    }
  });
});
