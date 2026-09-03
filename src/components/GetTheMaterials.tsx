import React from 'react';
import { Package } from 'lucide-react';
import { getMaterialsForSkill } from '@/lib/materials';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { MaterialBundle, resolveMaterials } from './MaterialBundle';

interface GetTheMaterialsProps {
  skillId: string;
  skillMaterials?: string[];
}

export const GetTheMaterials: React.FC<GetTheMaterialsProps> = ({ skillId, skillMaterials }) => {
  const materials = getMaterialsForSkill(skillId, skillMaterials);
  const { byKey, loading } = useMaterialLinks();

  if (materials.length === 0) return null;

  const resolved = resolveMaterials(materials, byKey);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-semibold">Get the materials</h2>
      </div>
      <MaterialBundle
        title="Suggested materials"
        materials={resolved}
        disclosure="As an Amazon Associate we earn from qualifying purchases."
      />
    </div>
  );
};

export default GetTheMaterials;
