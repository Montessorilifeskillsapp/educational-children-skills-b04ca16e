import React from 'react';
import { getMaterialsForSkill } from '@/lib/materials';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { MaterialBundle, resolveMaterials } from './MaterialBundle';

interface GetTheMaterialsProps {
  skillId: string;
  skillMaterials?: string[];
  /** Heading shown above the list. Kept as one heading, not two stacked ones. */
  title?: string;
}

export const GetTheMaterials: React.FC<GetTheMaterialsProps> = ({
  skillId,
  skillMaterials,
  title = "What you'll need",
}) => {
  const materials = getMaterialsForSkill(skillId, skillMaterials);
  const { byKey } = useMaterialLinks();

  if (materials.length === 0) return null;

  const resolved = resolveMaterials(materials, byKey);

  return (
    <div className="mb-6">
      <MaterialBundle
        title={title}
        materials={resolved}
      />
    </div>
  );
};

export default GetTheMaterials;
