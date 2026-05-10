import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Material {
  name: string;
  quantity?: string;
  essential: boolean;
  category: 'tool' | 'container' | 'supply' | 'safety';
}

interface MaterialsBundleProps {
  materials: Material[];
  activityTitle: string;
}

const MaterialsBundle: React.FC<MaterialsBundleProps> = ({ materials, activityTitle }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tool': return '🔧';
      case 'container': return '🥛';
      case 'supply': return '📦';
      case 'safety': return '🛡️';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tool': return 'bg-blue-100 text-blue-800';
      case 'container': return 'bg-green-100 text-green-800';
      case 'supply': return 'bg-primary/15 text-primary';
      case 'safety': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const essentialMaterials = materials.filter(m => m.essential);
  const optionalMaterials = materials.filter(m => !m.essential);

  return (
    <Card className="border-2 border-amber-300 mb-6 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center gap-2">
          <span className="text-xl">🧰</span> Materials Bundle for {activityTitle}
        </CardTitle>
        <p className="text-sm text-amber-700">Gather these materials before beginning the activity</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {essentialMaterials.length > 0 && (
          <div>
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <span className="text-red-500">⭐</span> Essential Materials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {essentialMaterials.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(material.category)}</span>
                    <span className="font-medium text-amber-900">{material.name}</span>
                    {material.quantity && (
                      <span className="text-sm text-amber-700">({material.quantity})</span>
                    )}
                  </div>
                  <Badge className={getCategoryColor(material.category)}>
                    {material.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {optionalMaterials.length > 0 && (
          <div>
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <span className="text-blue-500">💡</span> Optional Materials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {optionalMaterials.map((material, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(material.category)}</span>
                    <span className="font-medium text-blue-900">{material.name}</span>
                    {material.quantity && (
                      <span className="text-sm text-blue-700">({material.quantity})</span>
                    )}
                  </div>
                  <Badge className={getCategoryColor(material.category)}>
                    {material.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialsBundle;