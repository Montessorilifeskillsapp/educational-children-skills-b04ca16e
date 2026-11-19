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
  it("walking-around invitation says 'mtoto mwingine'", () => {
    expect((sw as Record<string, string>)["Would you like to practice walking around someone's work?"]).toBe(
      "Je, ungependa kufanya mazoezi ya kutembea ukipita pembeni ya kazi ya mtoto mwingine?",
    );
  });
  it("dressing frame invitations write 'fremu' in lowercase", () => {
    const inv = Object.entries(sw as Record<string, string>).filter(([en]) => en.startsWith("Would you like to work with the Dressing Frame"));
    expect(inv.length).toBe(6);
    for (const [, v] of inv) expect(v.startsWith("Je, ungependa kufanya kazi na fremu ya mavazi – ")).toBe(true);
  });
});
