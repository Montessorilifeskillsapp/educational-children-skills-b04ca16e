import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { montessoriTheme } from './ThemeConfig';
import ImageUploader from './ImageUploader';
import { LazyImage } from './LazyImage';

interface ProductCardProps {
  product: any;
  editMode: boolean;
  customImages: {[key: string]: string};
  onImageChange: (productId: string, imageUrl: string) => void;
  onAddToCart: (product: any) => void;
  onOpenLink?: (link: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editMode,
  customImages,
  onImageChange,
  onAddToCart,
  onOpenLink
}) => {
  return (
    <article>
      <Card className={`${montessoriTheme.card.base} h-full flex flex-col`}>
        <CardHeader className="pb-2">
          <LazyImage
            src={customImages[product.id] || product.image || '/placeholder.svg'}
            alt={`${product.name} - ${product.description || product.category}`}
            className="w-full h-48 object-cover rounded-lg"
          />
          {editMode && (
            <div className="mt-3 border-t pt-3">
              <div className="text-xs text-green-600 font-medium mb-2">✅ Edit Mode Active</div>
              <ImageUploader
                productId={product.id}
                currentImage={customImages[product.id] || product.image || '/placeholder.svg'}
                onImageChange={onImageChange}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-2">
          <Badge variant="outline" className="text-xs mb-2 w-fit">
            {product.category}
          </Badge>
          
          <CardTitle className={`text-lg mb-2 ${montessoriTheme.text.accent}`}>
            {product.name}
          </CardTitle>
          
          <p className={`text-sm ${montessoriTheme.text.muted} mb-3 flex-1`}>
            {product.description}
          </p>

          {product.author && (
            <div className="mb-3 text-sm space-y-1">
              <p><strong>Author:</strong> {product.author}</p>
              <p><strong>Pages:</strong> {product.pages}</p>
              <p><strong>Age Range:</strong> {product.ageRange}</p>
              <p><strong>Level:</strong> {product.skillLevel}</p>
            </div>
          )}

          {product.materials && (
            <div className="mb-3 text-sm space-y-1">
              <p><strong>Materials:</strong> {product.materials.slice(0, 3).join(', ')}{product.materials.length > 3 ? '...' : ''}</p>
              <p><strong>Age Range:</strong> {product.ageRange}</p>
              <p><strong>Level:</strong> {product.skillLevel}</p>
            </div>
          )}
          {product.rating && (
            <div className="flex items-center mb-3" role="img" aria-label={`${product.rating} out of 5 stars`}>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-blue-400 text-blue-400' : 'text-gray-300'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className={`ml-2 text-sm ${montessoriTheme.text.muted}`}>
                {product.rating}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price?.toFixed(2) || '0.00'}
            </span>
            <span className="text-sm text-green-600">
              {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={() => {
                // Add to cart action
                onAddToCart(product);
              }}
              className="w-full bg-primary hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              size="lg"
              aria-label={`Add ${product.name} to shopping cart`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" aria-hidden="true" />
              Add to Cart
            </Button>
            
            {product.amazonLink && onOpenLink && (
              <Button 
                onClick={() => onOpenLink(product.amazonLink)}
                variant="outline"
                className="w-full border-primary/25 text-primary hover:bg-primary/10"
                aria-label={`View ${product.name} on Amazon (opens in new tab)`}
              >
                <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                View on Amazon
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default ProductCard;