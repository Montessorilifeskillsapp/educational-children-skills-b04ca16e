import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { skillBasedProducts } from '@/data/skillBasedProducts';
import { montessoriMaterials } from '@/data/montessoriMaterials';
import { additionalShopItems } from '@/data/additionalShopItems';

interface SkillShopItemsProps {
  shopItemIds: string[];
  skillTitle: string;
}

const SkillShopItems: React.FC<SkillShopItemsProps> = ({ shopItemIds, skillTitle }) => {
  // Find products from all data sources
  const getShopItems = (itemIds: string[]) => {
    const items: any[] = [];
    
    itemIds.forEach(itemId => {
      // Check skillBasedProducts first
      const skillProducts = Object.values(skillBasedProducts).flat();
      const skillProduct = skillProducts.find(product => product.id === itemId);
      
      if (skillProduct) {
        items.push(skillProduct);
      } else {
        // Check montessoriMaterials
        const materialProduct = montessoriMaterials.find(material => material.id === itemId);
        if (materialProduct) {
          items.push(materialProduct);
        } else {
          // Check additionalShopItems
          const additionalProduct = additionalShopItems.find(item => item.id === itemId);
          if (additionalProduct) {
            items.push(additionalProduct);
          }
        }
      }
    });
    
    return items;
  };

  const shopItems = getShopItems(shopItemIds);

  if (shopItems.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Materials for {skillTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No shop items available for this skill yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Materials for {skillTitle}
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Get the authentic Montessori materials needed for this activity
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shopItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}
              <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">Age: {item.ageRange}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Level: {item.skillLevel}</span>
              </div>
              
              {item.rating && (
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${item.price}</span>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => {
                    // This would normally add to cart or navigate to product page
                    console.log('Adding to cart:', item.name);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              {item.materials && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-medium text-gray-700 mb-1">Includes:</p>
                  <p className="text-xs text-gray-600">{item.materials.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillShopItems;