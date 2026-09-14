import { curriculumSectionsForMaterials } from './src/data/curriculumSections';
import { getMaterialsForSkill } from './src/lib/materials';

const map = new Map<string, { displayName: string; sections: Set<string> }>();

for (const section of curriculumSectionsForMaterials) {
  for (const [skillId, skill] of Object.entries(section.skills)) {
    const materials = getMaterialsForSkill(skillId, skill.materials);
    for (const material of materials) {
      const existing = map.get(material.key);
      if (existing) {
        existing.sections.add(section.title);
      } else {
        map.set(material.key, {
          displayName: material.displayName,
          sections: new Set([section.title]),
        });
      }
    }
  }
}

const sorted = Array.from(map.entries()).sort((a, b) =>
  a[1].displayName.localeCompare(b[1].displayName, 'en', { sensitivity: 'base' })
);

const lines: string[] = [
  'Montessori Life Skills – Alphabetized Materials List',
  `Generated: ${new Date().toISOString()}`,
  `Total distinct materials: ${sorted.length}`,
  '',
];

for (const [, { displayName, sections }] of sorted) {
  const sectionList = Array.from(sections).sort().join(', ');
  lines.push(`${displayName}  |  ${sectionList}`);
}

const outputPath = '/mnt/documents/montessori-materials-alphabetized.txt';
await Bun.write(outputPath, lines.join('\n'));
console.log(`Wrote ${sorted.length} materials to ${outputPath}`);
