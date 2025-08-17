import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getShopItemsForSkill } from '@/data/practicalLifeShopMapping';
import { skillBasedProducts } from '@/data/skillBasedProducts';
import { montessoriMaterials } from '@/data/montessoriMaterials';
import { additionalShopItems } from '@/data/additionalShopItems';
import { toast } from 'sonner';

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: string;
  ageRange: string;
  duration: string;
  isPremium: boolean;
}

interface SkillCardWithCartProps {
  skill: Skill;
  onSelect: () => void;
  isCompleted: boolean;
  isPremium: boolean;
}

const SkillCardWithCart: React.FC<SkillCardWithCartProps> = ({
  skill,
  onSelect,
  isCompleted,
  isPremium
}) => {
  const { addToCart } = useCart();

  const getShopItemsForDisplay = (skillId: string) => {
    const itemIds = getShopItemsForSkill(skillId);
    const items: any[] = [];
    
    itemIds.forEach(itemId => {
      const skillProducts = Object.values(skillBasedProducts).flat();
      const skillProduct = skillProducts.find(product => product.id === itemId);
      
      if (skillProduct) {
        items.push(skillProduct);
      } else {
        const materialProduct = montessoriMaterials.find(material => material.id === itemId);
        if (materialProduct) {
          items.push(materialProduct);
        } else {
          const additionalProduct = additionalShopItems.find(item => item.id === itemId);
          if (additionalProduct) {
            items.push(additionalProduct);
          }
        }
      }
    });
    
    return items;
  };

  const shopItems = getShopItemsForDisplay(skill.id);
  const mainItem = shopItems[0]; // Show the first/main item for this skill

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (mainItem) {
      addToCart({
        id: mainItem.id,
        name: mainItem.name,
        price: mainItem.price,
        image: mainItem.image,
        skillId: skill.id
      });
      toast.success(`${mainItem.name} added to cart!`);
    }
  };

  const handleCardClick = () => {
    if (!skill.isPremium || isPremium) {
      onSelect();
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
        isCompleted ? 'ring-2 ring-green-500' : ''
      } ${skill.isPremium && !isPremium ? 'opacity-75' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{skill.icon}</span>
            <div>
              <CardTitle className="text-lg leading-tight">{skill.title}</CardTitle>
              {skill.isPremium && (
                <Badge variant="secondary" className="mt-1">
                  Premium
                </Badge>
              )}
            </div>
          </div>
          {isCompleted && (
            <Badge variant="default" className="bg-green-500">
              ✓ Done
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {skill.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {skill.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {skill.ageRange}
          </div>
        </div>

        {/* Shop Item Preview */}
        {mainItem && (
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Materials Available:</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{mainItem.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{mainItem.name}</p>
                <p className="text-lg font-bold text-primary">${mainItem.price}</p>
              </div>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center gap-1"
                disabled={skill.isPremium && !isPremium}
              >
                <ShoppingCart className="h-3 w-3" />
                Add to Cart
              </Button>
            </div>
            {shopItems.length > 1 && (
              <p className="text-xs text-gray-500 mt-1">
                +{shopItems.length - 1} more item{shopItems.length - 1 !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
        )}

        {(!mainItem || shopItems.length === 0) && (
          <Badge variant="outline" className="w-full justify-center">
            Click to view activity
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillCardWithCart;