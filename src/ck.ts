import { getMaterialsForSkill } from '@/lib/materials';
import { classroomSetupMaterials } from '@/data/classroomSetupMaterials';
import { getMaterialImage } from '@/lib/materialImageRegistry';
const m = getMaterialsForSkill('classroom-setup-basics', classroomSetupMaterials);
for (const x of m as any[]) {
  const name = typeof x === 'string' ? x : (x.displayName ?? x.name ?? JSON.stringify(x));
  const key = typeof x === 'string' ? '' : (x.key ?? '');
  const img = getMaterialImage(name) ?? '—';
  console.log(name.padEnd(36), key.padEnd(34), img.split('/').pop());
}
