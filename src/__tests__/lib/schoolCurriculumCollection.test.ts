import { describe, expect, it } from 'vitest';
import { orderedSkills, skillLink } from '@/components/school/curriculum';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';

describe('complete school activity collection', () => {
  it.each(curriculumSectionsForMaterials)('includes every activity in $title', (section) => {
    const actual = orderedSkills().filter((skill) => skill.areaKey === section.key);
    expect(actual.map((skill) => skill.id)).toEqual(Object.keys(section.skills));
    for (const skill of actual) {
      expect(skillLink(skill)).toBe(`${section.route}?activity=${encodeURIComponent(skill.id)}&from=school`);
    }
  });

  it('retains Sound Cylinders in both Sensorial and Cultural Studies', () => {
    expect(orderedSkills().filter((skill) => skill.id === 'sound-cylinders').map((skill) => skill.areaKey))
      .toEqual(['sensorial', 'cultural']);
  });

  it.each(['saying-please-thank-you', 'offering-help'])('retains %s in Grace and Courtesy and Practical Life', (id) => {
    expect(orderedSkills().filter((skill) => skill.id === id).map((skill) => skill.areaKey))
      .toEqual(['practical-life', 'grace-courtesy']);
  });
});