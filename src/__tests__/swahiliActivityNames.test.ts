import { describe, it, expect } from "vitest";
import sw from "@/i18n/lessons/sw.json";

const reviewed: Record<string, string> = {
  "Montessori Teeth Brushing": "Kupiga mswaki (Montessori)",
  "Getting Dressed": "Kuvaa",
  "Dressing Frame - Bows": "Fremu ya mavazi – Mafundo",
  "Metal Insets": "Maumbo ya chuma",
  "Walking the Line": "Kutembea kwenye mstari",
  'Saying "Please" and "Thank You"': "Kusema “Tafadhali” na “Asante”",
  "Celebrations & Traditions": "Sherehe na mila",
};

describe("Kiswahili activity names (review 2026-11-19)", () => {
  for (const [en, expected] of Object.entries(reviewed)) {
    it(`${en} -> ${expected}`, () => {
      expect((sw as Record<string, string>)[en]).toBe(expected);
    });
  }
  it("no Kiswahili activity name uses '&'", () => {
    const amp = Object.entries(sw as Record<string, string>).filter(
      ([en, v]) => en.includes(" & ") && v.includes("&"),
    );
    expect(amp).toEqual([]);
  });
});
